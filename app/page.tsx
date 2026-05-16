"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "motion/react";
import Image from "next/image";
import { ChevronDown, ExternalLink, Mail } from "lucide-react";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import DecryptedText from "./lib/Decrypt";
import Particles from "./lib/Particles";

const skills = [
  { name: "Python", desc: "Primary ML & backend language" },
  { name: "TypeScript", desc: "Frontend & full-stack development" },
  { name: "React / Next.js", desc: "Modern web applications" },
  { name: "PyTorch", desc: "Deep learning & model training" },
  { name: "Computer Vision", desc: "Semantic segmentation & image analysis" },
  { name: "Machine Learning", desc: "Supervised & unsupervised methods" },
  { name: "Full Stack", desc: "End-to-end product development" },
  { name: "SQL", desc: "Database design & optimization" },
  { name: "Node.js", desc: "Server-side JavaScript" },
  { name: "Semantic Segmentation", desc: "Pixel-level image classification" },
];

const work = [
  {
    company: "Arrowz",
    role: "Software Engineer",
    type: "Mental Health Startup",
    description:
      "Revamped backend ML implementation and launched a revenue model for an accessible mental health platform.",
    tags: ["Python", "ML", "Backend", "Revenue"],
  },
  {
    company: "Nonprofit Data Initiative",
    role: "Data Engineer",
    type: "Local Organization",
    description:
      "Delivered thousands of datasets to hundreds of parishes and schools, improving data accessibility for educational institutions across the region.",
    tags: ["Data Engineering", "ETL", "SQL", "Analytics"],
  },
  {
    company: "Sky Observation ML",
    role: "ML Research Engineer",
    type: "South Africa × Western Sydney University",
    description:
      "Implemented prototype unsupervised semantic segmentation models for astronomical sky observation data in collaboration with WSU researchers.",
    tags: ["PyTorch", "Semantic Segmentation", "Research", "Computer Vision"],
  },
  {
    company: "Vanderbilt Digital Lab",
    role: "Research Engineer",
    type: "Vanderbilt University",
    description:
      "Trained few-shot semantic segmentation models on antique stereoscopic images from university archives, enabling VR-based historical viewing experiences.",
    tags: ["Few-Shot Learning", "PyTorch", "VR", "Archival Research"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function SkillBadge({ name, desc }: { name: string; desc: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full text-gray-300 cursor-default hover:bg-white/20 hover:border-white/30 transition-all select-none">
          {name}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-[100] bg-gray-950/95 backdrop-blur-md border border-white/10 text-gray-300 text-xs rounded-lg px-3 py-2 shadow-xl"
          sideOffset={6}
        >
          {desc}
          <Tooltip.Arrow className="fill-gray-950" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function Page() {
  return (
    <Tooltip.Provider delayDuration={300}>
      {/* Fixed particle background */}
      <div className="fixed inset-0 z-0">
        <Particles
          className=""
          particleColors={["#ffffff", "#a5b4fc"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-semibold tracking-widest text-sm">
            AT
          </span>
          <div className="flex gap-6 text-sm text-gray-400">
            {["Intro", "Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section
          id="intro"
          className="scroll-mt-16 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 py-20 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              <DecryptedText
                text="Alexander Tomack"
                speed={80}
                sequential={true}
                animateOn="view"
                revealDirection="start"
                maxIterations={20}
                characters="ABCD1234!?"
                className="text-white"
                parentClassName=""
                encryptedClassName="text-indigo-400/60"
              />
            </h1>

            <div className="text-gray-400 text-lg space-y-1">
              <p>
                <DecryptedText
                  text="CS & Econ · Vanderbilt University"
                  speed={60}
                  sequential={true}
                  animateOn="view"
                  revealDirection="start"
                  maxIterations={10}
                  characters="ABCD1234!?"
                  className="text-gray-400"
                  parentClassName=""
                  encryptedClassName="text-indigo-400/40"
                />
              </p>
              <p>
                <DecryptedText
                  text="Full Stack & ML Engineer"
                  speed={60}
                  sequential={true}
                  animateOn="view"
                  revealDirection="start"
                  maxIterations={10}
                  characters="ABCD1234!?"
                  className="text-gray-400"
                  parentClassName=""
                  encryptedClassName="text-indigo-400/40"
                />
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-xl">
              {skills.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/aetomack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium transition-all"
              >
                <GithubIcon size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/alex-tomack/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium transition-all"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="text-gray-600" size={22} />
          </motion.div>
        </section>

        {/* Philosophy */}
        <section className="px-6 pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard className="text-center">
              <p className="text-gray-300 italic text-lg">
                "Good code, for good people, for good purpose."
              </p>
            </GlassCard>
          </motion.div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-16 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              Work
            </motion.h2>

            <div className="grid gap-5 md:grid-cols-2">
              {work.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <GlassCard className="h-full flex flex-col gap-3 hover:bg-white/10 transition-colors duration-300">
                    <div>
                      <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-1">
                        {exp.type}
                      </p>
                      <h3 className="text-base font-semibold text-white">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-gray-500">{exp.role}</p>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed flex-1">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 text-center"
            >
              <GlassCard className="inline-block">
                <p className="text-gray-400 text-sm">
                  Most of my work lives in private repos.{" "}
                  <a
                    href="https://github.com/aetomack"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
                  >
                    GitHub <ExternalLink size={11} />
                  </a>{" "}
                  — reach out and I'm happy to discuss it.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-16 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              About
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0 mx-auto md:mx-0">
                    <Image
                      src="/images/bwheadshot.jpg"
                      alt="Alex Tomack"
                      width={192}
                      height={192}
                      className="rounded-2xl object-cover border border-white/10 grayscale"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      I'm a software engineer with a strong belief that writing
                      good code starts with understanding why it's written. I'm
                      driven by clarity of purpose — informed by the bigger
                      picture of what we're building, who it serves, and how
                      each line of code contributes to that mission.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      I'm fascinated by machine learning methods and low-level
                      programming. As AI permeates every layer of our lives,
                      understanding the science matters — both as an engineer
                      and as a citizen.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Beyond engineering, I'm an avid musician, actor, painter,
                      and photographer. I've performed on stage for the past
                      decade in plays and musicals, starred in student films,
                      and my photography has been displayed at Vanderbilt's expo
                      for the arts in Chicago.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 py-20 px-6">
          <div className="max-w-lg mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              Contact
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard>
                <form
                  method="POST"
                  action="../send_email.php"
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs text-gray-400 font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs text-gray-400 font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs text-gray-400 font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      placeholder="What's on your mind?"
                      className="bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-indigo-600/70 hover:bg-indigo-600 border border-indigo-500/30 rounded-lg text-white text-sm font-medium transition-all"
                    >
                      Send Message
                    </button>
                    <button
                      type="reset"
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-gray-300 text-sm transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-5 border-t border-white/10 flex justify-center">
                  <a
                    href="mailto:atomack315@gmail.com"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                  >
                    <Mail size={14} /> atomack315@gmail.com
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-8 border-t border-white/5 text-center">
        <p className="text-gray-700 text-sm">© 2025 Alexander Tomack</p>
      </footer>
    </Tooltip.Provider>
  );
}
