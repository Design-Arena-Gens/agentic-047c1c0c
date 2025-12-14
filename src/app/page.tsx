import { GreetingExperience } from "@/components/greeting-experience";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f3f4ff] via-white to-[#fef0f5] py-16">
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/60 to-purple-200/60 blur-3xl" />
      <div className="absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-gradient-to-tr from-rose-100/50 to-white/30 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 sm:px-10">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/40 bg-white/70 p-8 text-center shadow-lg backdrop-blur sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              hi, you made it ✨
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Your personal pocket of encouragement
            </h1>
            <p className="mt-2 max-w-xl text-base text-slate-600">
              Pause for a moment. Take a breath. You deserve this gentle hello.
            </p>
          </div>
        </header>
        <GreetingExperience />
        <footer className="pb-4 pt-2 text-center text-xs text-slate-400">
          Crafted with care to greet you, wherever you are.
        </footer>
      </div>
    </div>
  );
}
