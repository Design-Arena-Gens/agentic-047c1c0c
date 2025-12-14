"use client";

import { useEffect, useMemo, useState } from "react";

const compliments = [
  "You're doing better than you think.",
  "Today is a wonderful day to begin something new.",
  "Your curiosity is your superpower.",
  "It's okay to pause, breathe, and enjoy this moment.",
  "Small steps forward still count as progress.",
  "The world is brighter because you're in it.",
  "Your ideas matter—share them boldly.",
];

const gradients = [
  "from-sky-400/30 via-fuchsia-300/30 to-amber-300/30",
  "from-emerald-300/30 via-cyan-300/30 to-indigo-300/30",
  "from-rose-300/30 via-violet-300/30 to-sky-300/30",
];

const transitionDelays = ["delay-0", "delay-150", "delay-300", "delay-500"];

type Mood = "cosmic" | "serene" | "sunrise";

const moodSettings: Record<
  Mood,
  {
    label: string;
    gradient: string;
    accent: string;
    description: string;
  }
> = {
  cosmic: {
    label: "Cosmic Glow",
    gradient: "from-slate-900 via-purple-900 to-slate-900",
    accent: "text-purple-300",
    description: "Wrap the moment in deep night energy and shining stars.",
  },
  serene: {
    label: "Calm Breeze",
    gradient: "from-sky-100 via-cyan-100 to-emerald-100",
    accent: "text-cyan-600",
    description: "Lean into a mellow palette inspired by quiet mornings.",
  },
  sunrise: {
    label: "Golden Sunrise",
    gradient: "from-amber-100 via-rose-100 to-pink-200",
    accent: "text-amber-600",
    description:
      "Invite soft sunlight indoors with a warm and hopeful gradient.",
  },
};

function getGreeting(now: Date) {
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Hello night owl";
}

function getPartOfDay(now: Date) {
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) return "a fresh start";
  if (hour >= 12 && hour < 17) return "a spark of inspiration";
  if (hour >= 17 && hour < 22) return "a pocket of calm";
  return "a quiet, reflective pause";
}

export function GreetingExperience() {
  const [now, setNow] = useState(() => new Date());
  const [currentCompliment, setCurrentCompliment] = useState(
    () => compliments[Math.floor(Math.random() * compliments.length)],
  );
  const [mood, setMood] = useState<Mood>("sunrise");
  const [glowIndex, setGlowIndex] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => {
      setNow(new Date());
    }, 1000);

    const shimmer = setInterval(() => {
      setGlowIndex((previous) => (previous + 1) % gradients.length);
    }, 6000);

    return () => {
      clearInterval(ticker);
      clearInterval(shimmer);
    };
  }, []);

  const formattedTime = useMemo(() => {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);
  }, [now]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(now);
  }, [now]);

  const handleRefreshCompliment = () => {
    const next = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(next === currentCompliment ? `${next}!` : next);
  };

  const handleMoodChange = (nextMood: Mood) => {
    setMood(nextMood);
  };

  const accentColor = moodSettings[mood].accent;

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-10 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/60 sm:min-h-[70vh]">
      <div
        className={`pointer-events-none absolute inset-0 -z-10 animate-pulse bg-gradient-to-br ${moodSettings[mood].gradient}`}
      />
      <div className="absolute inset-1 -z-10 rounded-[26px] bg-white/70 backdrop-blur" />

      <div className="flex w-full flex-col items-center gap-8 text-center sm:items-start sm:text-left">
        <span className={`text-sm uppercase tracking-[0.4em] ${accentColor}`}>
          {formattedDate}
        </span>

        <div className="space-y-3">
          <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">
            {getGreeting(now)}, friend.
          </h1>
          <p className="text-balance text-lg leading-relaxed text-slate-600 sm:text-xl">
            You&apos;ve arrived at a gentle corner of the web built to offer{" "}
            <strong className={accentColor}>{getPartOfDay(now)}</strong>{" "}
            whenever you need it.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 text-left">
            <span className="text-xs uppercase tracking-widest text-slate-400">
              The moment right now
            </span>
            <div className="flex flex-col">
              <span className={`text-3xl font-medium ${accentColor}`}>
                {formattedTime}
              </span>
              <p className="text-sm text-slate-500">
                Time keeps flowing—take one mindful breath.
              </p>
            </div>
          </div>

          <button
            onClick={handleRefreshCompliment}
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-white/0 to-white/20 opacity-0 transition-opacity duration-[600ms] hover:opacity-100" />
            Refresh encouragement
          </button>
        </div>

        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 text-left shadow-lg">
          <div className="pointer-events-none absolute -inset-x-20 bottom-0 h-48 bg-gradient-to-t from-slate-100 via-white/0 to-transparent" />
          <p className="relative text-lg font-medium text-slate-800 sm:text-xl">
            “{currentCompliment}”
          </p>
        </div>

        <div className="grid w-full gap-4 rounded-2xl border border-white/30 bg-white/70 p-6 shadow-inner sm:grid-cols-3">
          {(Object.entries(moodSettings) as [Mood, (typeof moodSettings)[Mood]][]).map(
            ([moodKey, settings], index) => (
              <button
                key={moodKey}
                onClick={() => handleMoodChange(moodKey)}
                className={`group relative flex h-full flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/70 p-4 text-left transition-all duration-500 hover:-translate-y-1 ${
                  mood === moodKey
                    ? "ring-2 ring-offset-2 ring-slate-900 ring-offset-white"
                    : ""
                }`}
              >
                <span
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    mood === moodKey ? accentColor : "text-slate-500"
                  }`}
                >
                  {settings.label}
                </span>
                <p className="text-sm leading-relaxed text-slate-500">
                  {settings.description}
                </p>
                <span
                  className={`mt-auto h-2 w-full rounded-full bg-gradient-to-r ${gradients[index % gradients.length]}`}
                />
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 sm:gap-6">
        {["Savor a slow sip of water.", "Send a kind message to someone.", "Step outside for a breath of air.", "Write one thing you're grateful for."].map(
          (suggestion, index) => (
            <div
              key={suggestion}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-5 text-left shadow-md transition duration-500 hover:-translate-y-1"
            >
              <div
                className={`pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${gradients[(glowIndex + index) % gradients.length]} opacity-0 transition-opacity duration-700 ${transitionDelays[index % transitionDelays.length]} group-hover:opacity-60`}
              />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Micro-action
                </span>
                <p className="mt-3 text-base font-medium text-slate-700 sm:text-lg">
                  {suggestion}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
