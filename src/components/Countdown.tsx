import React, { useState, useEffect } from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";

interface CountdownProps {
  targetDateStr: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDateStr }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isPassed: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  if (timeRemaining.isPassed) {
    return (
      <div className="bg-gradient-to-r from-[#C9911D] via-[#e6a827] to-[#C9911D] text-slate-900 rounded-2xl p-6 text-center shadow-lg border border-amber-300">
        <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-950" />
          <span>Trip Status</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-slate-900">
          🌅 Trip Day Has Arrived!
        </h2>
        <p className="text-sm font-semibold text-slate-800 mt-1">
          Enjoy Lake Kariba, Siavonga! October 2, 2026 is here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0B4F6C]/90 to-[#123648] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#C9911D]/30 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#C9911D]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        
        {/* Header Label */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9911D]/20 border border-[#C9911D]/40 flex items-center justify-center text-amber-300 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Departure Countdown
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-cyan-200 bg-white/10 px-2 py-0.5 rounded-md">
                <Calendar className="w-3 h-3" /> Oct 2, 2026
              </span>
            </div>
            <p className="text-xs text-cyan-100/70">
              Siavonga, Lake Kariba Zambia
            </p>
          </div>
        </div>

        {/* Live Timer Badges */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          
          <div className="bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-2 rounded-xl border border-white/15 min-w-[60px]">
            <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
              {String(timeRemaining.days).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-cyan-100/80 tracking-wider">
              Days
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-2 rounded-xl border border-white/15 min-w-[60px]">
            <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
              {String(timeRemaining.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-cyan-100/80 tracking-wider">
              Hours
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-2 rounded-xl border border-white/15 min-w-[60px]">
            <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
              {String(timeRemaining.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-cyan-100/80 tracking-wider">
              Mins
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-2 rounded-xl border border-white/15 min-w-[60px]">
            <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
              {String(timeRemaining.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-cyan-100/80 tracking-wider">
              Secs
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
