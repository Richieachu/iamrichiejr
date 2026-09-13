"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type VideoItem =
  | { title: string; isLocal: true; src: string }
  | { title: string; isLocal: false; embedUrl: string };

export default function Home() {
  // ====== QUICK EDITS ======
  const accent = "#C68642";
  const firstText = "Richie Jr";
  const secondText = "A Video Editor";

  const calendlyUrl = "https://calendly.com/iamrichiejr/30min";

  const socials = {
    instagram: "https://www.instagram.com/iamrichiejr",
    tiktok: "https://www.tiktok.com/@iamrichiejr",
    x: "https://x.com/iamrichiejr?s=21",
    whatsapp:
      "https:///2348121193461?text=Hi%20Richie%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20work%20with%20you.",
  };

  // ====== VIDEO PORTFOLIO (5 VIMEO VIDEOS) ======
  const videos: VideoItem[] = useMemo(
    () => [
      {
        title: "Gym Edit",
        isLocal: false,
        embedUrl:
          "https://player.vimeo.com/video/1225892959?h=d0e031604f",
      },
      {
        title: "Talking Head Edit",
        isLocal: false,
        embedUrl:
          "https://player.vimeo.com/video/1225894186?h=899cc781b1",
      },
      {
        title: "Storytelling Edit",
        isLocal: false,
        embedUrl:
          "https://player.vimeo.com/video/1225897793?h=d3e48de945",
      },
      {
        title: "Vlog Edit",
        isLocal: false,
        embedUrl:
          "https://player.vimeo.com/video/1225895416?h=7ed3ccb33c",
      },
      {
        title: "Cinematic Storytelling",
        isLocal: false,
        embedUrl:
          "https://player.vimeo.com/video/1225910562?h=7b93ba7ad3",
      },
    ],
    []
  );

  // ====== REVIEWS ======
  const reviews = useMemo(() => [], []);

  // ====== WORKFLOW ======
  const workflowItems = useMemo(
    () => [
      {
        key: "plan",
        label: "PLAN",
        body: `To ensure we’re all aligned in expectations and creative direction, I’ll have you or your client fill out a Google Form with everything I’ll need to know as the editor to achieve the greatest result with as few revisions as possible.

You can do this on your own time or we can go over it together on a call.

Before beginning the edit, you will upload all footage and content necessary for the edit and receive an invoice for payment.`,
      },
      {
        key: "edit",
        label: "EDIT",
        body: `I’ll create a cinematic edit based on your needs, goals, and vision.

This will include selecting, sequencing, and color grading clips, enhancing raw audio, and adding music, sound design, transitions, effects, brand graphics, and text as needed.`,
      },
      {
        key: "revise",
        label: "REVISE",
        body: `The deliverables will be uploaded to Google Drive where time stamped comments can be added for any requested changes to achieve your vision. The final version will be delivered with a download option.

Two rounds of revisions are included in my rates.`,
      },
    ],
    []
  );

  const [workflowActive, setWorkflowActive] = useState<string | null>(null);

  // ====== NAV ======
  const navItems = useMemo(
    () => [
      { label: "VIDEOS", href: "#videos" },
      { label: "ABOUT ME", href: "#about" },
    ],
    []
  );

  // ====== TYPEWRITER ======
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<
    "typingFirst" | "deletingFirst" | "typingSecond"
  >("typingFirst");

  // ====== ABOUT TAB ======
  const [aboutTab, setAboutTab] = useState<"skills" | "gear">("skills");

  // ====== CALENDLY MODAL ======
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typingFirst") {
      if (text.length < firstText.length) {
        timeout = setTimeout(
          () => setText(firstText.slice(0, text.length + 1)),
          70
        );
      } else {
        timeout = setTimeout(() => setPhase("deletingFirst"), 500);
      }
    } else if (phase === "deletingFirst") {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText((prev) => prev.slice(0, -1)),
          45
        );
      } else {
        setPhase("typingSecond");
      }
    } else if (phase === "typingSecond") {
      if (text.length < secondText.length) {
        timeout = setTimeout(
          () => setText(secondText.slice(0, text.length + 1)),
          70
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, firstText, secondText]);

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    if (!calOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [calOpen]);

  const cursorHidden =
    phase === "typingSecond" && text.length === secondText.length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-200 hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SocialIcon
              label="Instagram"
              href={socials.instagram}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
                  <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  <path d="M17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                </svg>
              }
            />

            <SocialIcon
              label="TikTok"
              href={socials.tiktok}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M9 3v10.5a3.5 3.5 0 1 1-3-3.465V7.5a6 6 0 1 0 6 6V9.09a8.002 8.002 0 0 0 4 1.16V7.25a4.001 4.001 0 0 1-4-4V3H9z" />
                </svg>
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: accent }}
            >
              Hello, I&apos;m
            </p>

            <h1 className="mt-2 text-5xl sm:text-7xl font-black tracking-tight">
              {text}
              <span
                className={`${
                  cursorHidden ? "opacity-0" : "opacity-40"
                }`}
              >
                |
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-300">
              I help creators turn raw footage into premium high retention
              content for youtube, instagram and tiktok.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#videos"
                className="rounded-full px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: accent }}
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="rounded-full px-6 py-3 text-sm font-semibold ring-2 ring-white/20 hover:ring-white/40 transition"
              >
                Start a Project
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full blur-2xl opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(198,134,66,0.55), rgba(0,0,0,0))",
                }}
              />

              <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] overflow-hidden rounded-full ring-4 ring-white/10">
                <Image
                  src="/image.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div
                className="pointer-events-none absolute -inset-1 rounded-full ring-2"
                style={{ borderColor: accent, borderWidth: 3 }}
              />
            </div>
          </div>
        </div>

        {/* ================= VIDEO PORTFOLIO ================= */}
        <section id="videos" className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              RECENT{" "}
              <span style={{ color: accent }}>
                VIDEOS I&apos;VE EDITED
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videos.map((v, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-video">
                  {v.isLocal ? (
                    <video
                      className="absolute inset-0 h-full w-full"
                      src={v.src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={v.embedUrl}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-semibold text-neutral-200">
                    {v.title}
                  </p>

                 
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="mt-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mt-1 text-sm text-neutral-400"></p>

              <div className="mt-10 space-y-4 text-sm"></div>
            </div>

            <div>
              <ul className="mt-8 space-y-3 text-sm text-neutral-300"></ul>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                About <span style={{ color: accent }}>Me</span>
              </h2>

              <p className="mt-6 max-w-xl text-neutral-300 leading-relaxed">
                I’m Richie Jr, a Video editor and Creative storyteller.
                <br />
                <br />
                I specialize in creating high quality, engaging content for social media platforms like youtube, Instagram and Tiktok. I have a keen eye for detail and passion for storytelling and i am dedicated to helping creators bring their vision to life.
                <br />
                <br />
                I am always looking for new ways to make every edit feel intentional while keeping the personality of the person or brand at the center.
              </p>

              <div className="mt-10 border-b border-white/10">
                <div className="flex items-center gap-8">
                  <button
                    type="button"
                    onClick={() => setAboutTab("skills")}
                    className="pb-3 text-sm font-semibold tracking-wide transition"
                    style={{
                      color: aboutTab === "skills" ? accent : undefined,
                    }}
                  >
                    SKILLS
                    <div
                      className="mt-3 h-[2px] w-full"
                      style={{
                        backgroundColor:
                          aboutTab === "skills" ? accent : "transparent",
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setAboutTab("gear")}
                    className="pb-3 text-sm font-semibold tracking-wide transition"
                    style={{
                      color: aboutTab === "gear" ? accent : undefined,
                    }}
                  >
                    GEAR & TECH
                    <div
                      className="mt-3 h-[2px] w-full"
                      style={{
                        backgroundColor:
                          aboutTab === "gear" ? accent : "transparent",
                      }}
                    />
                  </button>
                </div>
              </div>

              {aboutTab === "skills" ? (
                <ul className="mt-6 grid grid-cols-2 gap-y-2 text-neutral-200">
                  <li>CapCut</li>
                  <li>Adobe Premiere Pro</li>
                  <li>DaVinci Resolve</li>
                  <li>Color Grading</li>
                  <li>Sound Design</li>
                </ul>
              ) : (
                <div className="mt-6 space-y-4">
                  {/* COMPUTER */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      COMPUTER
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>
                        <span className="text-neutral-400">Computer:</span>{" "}
                        MacBook Pro (2019)
                      </li>
                      <li>
                        <span className="text-neutral-400">Processor:</span>{" "}
                        2.8 GHz Quad-Core Intel Core i7
                      </li>
                      <li>
                        <span className="text-neutral-400">Memory:</span> 16 GB
                        2133 MHz LPDDR3
                      </li>
                      <li>
                        <span className="text-neutral-400">Graphics:</span>{" "}
                        Intel Iris Plus Graphics 655 (1536 MB)
                      </li>
                      <li>
                        <span className="text-neutral-400">Display:</span>{" "}
                        13.3-inch Retina (2560 × 1600)
                      </li>
                      <li>
                        <span className="text-neutral-400">OS:</span> macOS
                        Sequoia 15.7.3
                      </li>
                    </ul>
                  </div>

                  {/* VIDEO EDITING SOFTWARE */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      VIDEO EDITING SOFTWARE
                    </p>

                    <ul className="mt-4 grid grid-cols-1 gap-y-2 text-sm text-neutral-200">
                      <li>DaVinci Resolve Studio 20.3</li>
                      <li>CapCut Pro</li>
                    </ul>
                  </div>

                  {/* MUSIC & SOUND DESIGN */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      MUSIC & SOUND DESIGN
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>Musicbed</li>
                      <li>Elevenlabs</li>
                    </ul>
                  </div>

                  {/* FILE SHARING */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      FILE SHARING
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>Google Drive — 2 TB</li>
                    </ul>
                  </div>

                  {/* PROJECT MANAGEMENT */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      PROJECT MANAGEMENT
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>Google Calendar</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div id="experience">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight"></h2>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Let&apos;s <span style={{ color: accent }}>Connect</span>
              </h2>

              <p className="mt-5 max-w-xl text-neutral-300 leading-relaxed">
                I&apos;m currently open to new opportunities and
                collaborations. If you have a project in mind or simply want to
                connect, feel free to reach out.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <SocialCircle
                  label="Instagram"
                  href={socials.instagram}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="currentColor"
                    >
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
                      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0-6z" />
                      <path d="M17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                    </svg>
                  }
                />

                <SocialIcon
                  label="TikTok"
                  href={socials.tiktok}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M9 3v10.5a3.5 3.5 0 1 1-3-3.465V7.5a6 6 0 1 0 6 6V9.09a8.002 8.002 0 0 0 4 1.16V7.25a4.001 4.001 0 0 1-4-4V3H9z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Calendly card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-neutral-200">
                    Book a 30 minutes call
                  </p>
                  <p className="mt-2 text-sm text-neutral-400"></p>
                </div>

                <button
                  type="button"
                  onClick={() => setCalOpen(true)}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Schedule with Calendly
                </button>

                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center text-sm text-neutral-300 underline underline-offset-4 hover:text-white"
                >
                  Or open in a new tab
                </a>
              </div>
            </div>
          </div>

          {/* WORKFLOW */}
          <section className="mt-20">
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
              <div className="text-center">
                <p className="text-sm italic tracking-wide text-neutral-300">
                  workflow
                </p>
                <div className="mx-auto mt-6 h-px w-2/3 bg-white/15" />
              </div>

              <div className="mt-8 divide-y divide-white/15">
                {workflowItems.map((item) => (
                  <WorkflowRow
                    key={item.key}
                    label={item.label}
                    active={workflowActive === item.key}
                    onEnter={() => setWorkflowActive(item.key)}
                    onLeave={() => setWorkflowActive(null)}
                    onToggle={() =>
                      setWorkflowActive((prev) =>
                        prev === item.key ? null : item.key
                      )
                    }
                    body={item.body}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section
            id="reviews"
            className="mt-24 border-t border-white/10 pt-16"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight"></h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {reviews.map((r, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7"
                >
                  <blockquote className="text-lg sm:text-xl leading-relaxed text-neutral-100">
                    <span className="opacity-90">“</span>
                    <span className="text-neutral-200">{r.quote}</span>
                    <span className="opacity-90">”</span>
                  </blockquote>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-semibold text-neutral-100">
                        {r.name}
                      </p>
                      <p className="text-neutral-400">{r.title}</p>
                    </div>

                    <div
                      className="h-10 w-10 rounded-full ring-1 ring-white/10"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(198,134,66,0.35), rgba(255,255,255,0.02))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-16 border-t border-white/10 pt-10 flex items-center justify-between text-sm text-neutral-400"></footer>
        </section>
      </main>

      {/* Calendly Modal */}
      {calOpen && (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4"
          onMouseDown={() => setCalOpen(false)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-neutral-100">
                Schedule a call
              </p>

              <button
                type="button"
                onClick={() => setCalOpen(false)}
                className="rounded-lg px-3 py-1 text-sm text-neutral-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="relative h-[70vh] w-full">
              <iframe
                src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                title="Calendly Scheduling"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-4xl sm:text-5xl font-black tracking-tight">
          {number}
        </p>
        <p className="mt-1 text-sm text-neutral-300">{label}</p>
      </div>
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="text-neutral-300">{label}</span>
      <span className="text-neutral-200 font-medium">{value}</span>
    </div>
  );
}

function WorkflowRow({
  label,
  body,
  active,
  onEnter,
  onLeave,
  onToggle,
}: {
  label: string;
  body: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="py-5" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={active}
      >
        <span className="text-sm font-semibold tracking-[0.25em] text-neutral-100">
          {label}
        </span>

        <span className="text-neutral-300 text-xl leading-none select-none">
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          active
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-neutral-300 whitespace-pre-line">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-neutral-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition"
      target="_blank"
      rel="noreferrer"
    >
      {icon}
    </a>
  );
}

function SocialCircle({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-100 hover:bg-white/10 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.03)] transition"
    >
      <span className="text-neutral-100">{icon}</span>
    </a>
  );
}

function ExperienceItem({
  role,
  company,
  type,
  period,
}: {
  role: string;
  company: string;
  type: string;
  period: string;
}) {
  return (
    <div className="flex items-start justify-between border-b border-white/10 pb-4">
      <div>
        <p className="font-semibold text-neutral-100">{role}</p>
        <p className="text-sm text-neutral-400">{company}</p>
      </div>

      <div className="text-right">
        <p className="text-sm text-neutral-300">{type}</p>
        <p className="text-xs text-neutral-500">{period}</p>
      </div>
    </div>
  );
}