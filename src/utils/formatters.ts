import { Attendee, AttendeeWithStatus, PaymentStatus, TripType } from "../types";
import { COST_TABLE } from "../data/costTable";

/**
 * Formats a numerical amount as Zambian Kwacha (e.g. K21,109.00 or -K1,200.00).
 */
export function formatKwacha(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return isNegative ? `-K${formatted}` : `K${formatted}`;
}

/**
 * Calculates current funding goal stats based on confirmed headcount and active trip type.
 */
export function calculateTripMetrics(attendees: Attendee[], activeTripType: TripType) {
  const confirmedAttendees = attendees.filter((a) => a.confirmed);
  const confirmedHeadcount = confirmedAttendees.length;

  // Clamped headcount between 15 and 24 for COST_TABLE lookup
  const clampedHeadcount = Math.max(15, Math.min(24, confirmedHeadcount));
  const activeCostTier = COST_TABLE[activeTripType][clampedHeadcount];

  const goalTotal = activeCostTier.total;
  const perPersonTarget = activeCostTier.perPerson;

  // Total funds raised from ALL attendees (or confirmed ones)
  const totalRaised = attendees.reduce((sum, a) => sum + (a.amountPaid || 0), 0);
  const confirmedRaised = confirmedAttendees.reduce((sum, a) => sum + (a.amountPaid || 0), 0);

  const surplusOrShortfall = totalRaised - goalTotal;
  const isViable = confirmedHeadcount >= 15;
  const isFull = confirmedHeadcount >= 24;

  const neededForMin = isViable ? 0 : 15 - confirmedHeadcount;
  const neededForCap = isFull ? 0 : 24 - confirmedHeadcount;

  // Enhance attendee data with status and balance
  const attendeesWithStatus: AttendeeWithStatus[] = attendees.map((a) => {
    let status: PaymentStatus = "unpaid";
    if (a.amountPaid >= perPersonTarget) {
      status = "fully_paid";
    } else if (a.amountPaid > 0) {
      status = "partially_paid";
    }

    const balanceDue = Math.max(0, perPersonTarget - a.amountPaid);

    return {
      ...a,
      status,
      targetAmount: perPersonTarget,
      balanceDue
    };
  });

  const fullyPaidCount = attendeesWithStatus.filter((a) => a.status === "fully_paid").length;
  const partiallyPaidCount = attendeesWithStatus.filter((a) => a.status === "partially_paid").length;
  const unpaidCount = attendeesWithStatus.filter((a) => a.status === "unpaid").length;

  const progressPercentage = isViable ? Math.min(100, Math.round((totalRaised / goalTotal) * 1000) / 10) : Math.round((confirmedHeadcount / 15) * 100);

  return {
    confirmedHeadcount,
    clampedHeadcount,
    goalTotal,
    perPersonTarget,
    totalRaised,
    confirmedRaised,
    surplusOrShortfall,
    isViable,
    isFull,
    neededForMin,
    neededForCap,
    progressPercentage,
    fullyPaidCount,
    partiallyPaidCount,
    unpaidCount,
    attendeesWithStatus
  };
}

/**
 * Generates plain text executive summary report formatted for pasting straight into Google Docs.
 */
export function generatePlainTextReport(
  attendees: Attendee[],
  activeTripType: TripType,
  tripDateStr: string
): string {
  const metrics = calculateTripMetrics(attendees, activeTripType);
  const dateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const tripOptionLabel = activeTripType === "1D1N" ? "1 Day 1 Night (1D1N)" : "2 Days 1 Night (2D1N)";

  let headcountStatus = "";
  if (metrics.isFull) {
    headcountStatus = "Maximum capacity reached (24 / 24 attendees).";
  } else if (metrics.isViable) {
    headcountStatus = `Viable trip (${metrics.confirmedHeadcount} confirmed). ${metrics.neededForCap} seats available to hit 24 max.`;
  } else {
    headcountStatus = `NOT YET VIABLE. ${metrics.neededForMin} more confirmation(s) needed to hit 15 minimum.`;
  }

  let financialStatusStr = "";
  if (metrics.surplusOrShortfall >= 0) {
    financialStatusStr = `SURPLUS of ${formatKwacha(metrics.surplusOrShortfall)} over target goal.`;
  } else {
    financialStatusStr = `SHORTFALL of ${formatKwacha(Math.abs(metrics.surplusOrShortfall))} remaining to meet goal.`;
  }

  const outstandingAttendees = metrics.attendeesWithStatus.filter(
    (a) => a.status !== "fully_paid"
  );

  let outstandingLines = "";
  if (outstandingAttendees.length === 0) {
    outstandingLines = "• All registered attendees are fully paid up!";
  } else {
    outstandingLines = outstandingAttendees
      .map(
        (a) =>
          `• ${a.name} (${a.confirmed ? "Confirmed" : "Unconfirmed"}) - Paid: ${formatKwacha(
            a.amountPaid
          )} | Balance Due: ${formatKwacha(a.balanceDue)} | Status: ${
            a.status === "partially_paid" ? "Partial" : "Unpaid"
          }`
      )
      .join("\n");
  }

  return `=====================================================
SIAVONGA TRIP TRACKER - EXECUTIVE REPORT
Trip Date: October 2, 2026
Selected Package: ${tripOptionLabel}
Report Date: ${dateFormatted}
=====================================================

1. HEADCOUNT & TRIP VIABILITY
-----------------------------------------------------
• Confirmed Attendees: ${metrics.confirmedHeadcount} / 24 (Minimum: 15)
• Total Registered: ${attendees.length}
• Viability Status: ${headcountStatus}

2. FINANCIAL SUMMARY (Zambian Kwacha)
-----------------------------------------------------
• Active Cost Target per Person: ${formatKwacha(metrics.perPersonTarget)}
• Dynamic Funding Goal (${metrics.clampedHeadcount} headcount): ${formatKwacha(metrics.goalTotal)}
• Total Funds Raised to Date: ${formatKwacha(metrics.totalRaised)}
• Goal Progress: ${metrics.progressPercentage}%
• Surplus / Shortfall Status: ${financialStatusStr}

3. PAYMENT BREAKDOWN
-----------------------------------------------------
• Fully Paid Attendees: ${metrics.fullyPaidCount}
• Partially Paid Attendees: ${metrics.partiallyPaidCount}
• Unpaid Attendees: ${metrics.unpaidCount}

4. ATTENDEES WITH OUTSTANDING BALANCES
-----------------------------------------------------
${outstandingLines}

=====================================================
Generated via Siavonga Trip Tracker Live Dashboard
=====================================================`;
}
