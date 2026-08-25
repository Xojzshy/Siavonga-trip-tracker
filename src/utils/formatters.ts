import { Attendee, AttendeeWithStatus, CategoryBreakdown, PaymentStatus, TripType } from "../types";
import { COST_TABLE } from "../data/costTable";

/**
 * Formats a numerical amount as Zambian Kwacha (e.g. K21,725.00 or -K1,200.00).
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
 * Computes category breakdown for a package and group size (15-24).
 */
export function getCategoryBreakdown(tripType: TripType, groupSize: number): CategoryBreakdown {
  const clampedSize = Math.max(15, Math.min(24, groupSize));
  const tier = COST_TABLE[tripType][clampedSize];
  const total = tier.total;

  if (tripType === "1D1N") {
    const transport = 3500; // Fixed hire cost (fuel/tolls sponsor-covered)
    const accommodation = 8050; // Group lodge allocation
    const foodCatering = Math.round(clampedSize * 290);
    const activities = Math.round(clampedSize * 120);
    const contingency = Math.max(0, total - (transport + accommodation + foodCatering + activities));

    return {
      accommodation,
      transport,
      foodCatering,
      activities,
      contingency,
      total
    };
  } else {
    const transport = 7000; // Fixed hire cost (fuel sponsored)
    const accommodation = 8300; // Group lodge overnight allocation
    const foodCatering = Math.round(clampedSize * 383.35);
    const activities = Math.round(clampedSize * 136.65);
    const contingency = Math.max(0, total - (transport + accommodation + foodCatering + activities));

    return {
      accommodation,
      transport,
      foodCatering,
      activities,
      contingency,
      total
    };
  }
}

/**
 * Calculates current funding goal stats based on confirmed headcount, selected group size, and active trip type.
 */
export function calculateTripMetrics(
  attendees: Attendee[],
  activeTripType: TripType,
  overrideGroupSize?: number
) {
  const confirmedAttendees = attendees.filter((a) => a.confirmed);
  const confirmedHeadcount = confirmedAttendees.length;

  // Use override group size if set, otherwise fallback to confirmed headcount clamped 15-24
  const targetGroupSize = overrideGroupSize && overrideGroupSize >= 15 && overrideGroupSize <= 24
    ? overrideGroupSize
    : Math.max(15, Math.min(24, confirmedHeadcount || 20));

  const clampedHeadcount = Math.max(15, Math.min(24, targetGroupSize));
  const activeCostTier = COST_TABLE[activeTripType][clampedHeadcount];

  const goalTotal = activeCostTier.total;
  const perPersonTarget = activeCostTier.perPerson;
  const categoryBreakdown = getCategoryBreakdown(activeTripType, clampedHeadcount);

  // Total funds raised from ALL attendees
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

  const progressPercentage = Math.min(100, Math.round((totalRaised / goalTotal) * 1000) / 10);

  return {
    confirmedHeadcount,
    clampedHeadcount,
    targetGroupSize: clampedHeadcount,
    goalTotal,
    perPersonTarget,
    categoryBreakdown,
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
