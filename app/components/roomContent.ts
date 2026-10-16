// Everything the room says lives here. Click an object in the room → its entry opens in the panel.
// Source of truth for roles and numbers: public/Alexander_Tomack.pdf.

export type RoomItemId =
  | "whiteboard"
  | "laptop"
  | "corkboard"
  | "easel"
  | "guitar"
  | "playbill"
  | "rack"
  | "camera"
  | "box";

export type RoomItem = {
  /** Shown in the status line as "Look at {label}". */
  label: string;
  kicker: string;
  title: string;
  body: string[];
  image?: { src: string; alt: string; caption?: string };
  entries?: { heading: string; meta?: string; text: string }[];
  links?: { label: string; href: string }[];
};

export const RESUME_HREF = "/Alexander_Tomack.pdf";
export const PORTRAIT_SRC = "/pixelme-sm.jpg";
export const INSTAGRAM_HREF = "https://www.instagram.com/alexanderetoma/";

export const ROOM_ITEMS: Record<RoomItemId, RoomItem> = {
  whiteboard: {
    label: "the whiteboard",
    kicker: "How I work",
    title: "Start with the person, then the problem.",
    body: [
      "I do my best engineering on the customer's side of the table: sitting with the people who'll actually use the thing, learning how their day really goes, and turning that into software that fits it.",
      "That's the forward-deployed job as I see it. Part engineer, part translator, part host.",
    ],
    entries: [
      {
        heading: "Listen first",
        text: "Years of front-of-house taught me to hear what someone needs before they finish asking. I bring that to discovery calls and keep asking “why” until the real problem shows up.",
      },
      {
        heading: "Scope to what ships",
        text: "Turn a big ask into something useful this week. At Arrowz that meant three GPT-backed prototypes put in front of real users, then shipping the one they preferred.",
      },
      {
        heading: "Build alongside",
        text: "Prototype in the open, demo early, and let feedback steer instead of a spec written in isolation.",
      },
      {
        heading: "Leave it better",
        text: "Automation, docs, and handoffs so the team owns it after I've moved on, like the weekly analytics pipeline that saved the Diocese of Greensburg 100+ hours.",
      },
    ],
  },

  laptop: {
    label: "the laptop",
    kicker: "What I build",
    title: "Full-stack, close to the user.",
    body: [
      "I'm comfortable anywhere between the database and the button someone clicks, and I like work where the distance between the two is short.",
      "This room, for instance, is hand-drawn SVG in Next.js, React, and TypeScript.",
    ],
    entries: [
      {
        heading: "AI products",
        meta: "Claude agentic flows · OpenAI · LangChain · FastAPI",
        text: "Co-founded Lynx, a cofounder-discovery platform built on Claude-based agents. At Arrowz, moving from LangChain to direct OpenAI calls cut response times 39%. Reworking the prompts lifted engagement 26% and weekly retention 32% across 1k+ users.",
      },
      {
        heading: "Full-stack web & auth",
        meta: "Next.js · TypeScript · Clerk · Convex · Vercel",
        text: "End-to-end accounts for several user types: an onboarding wizard, and route guards that read JWT claims in middleware with zero database round-trips. Webhooks are rejected unless the Svix signature checks out.",
      },
      {
        heading: "Infrastructure & edge devices",
        meta: "Python · Django · FastAPI · PostgreSQL · Docker · Keycloak",
        text: "At XTraffic, built a secure pipeline linking dozens of remote devices over Tailscale and nginx. A FastAPI proxy cut manual SSH configuration by ~90%, and OAuth 2.0 role-based access protected the client dashboard.",
      },
      {
        heading: "Machine learning & vision",
        meta: "PyTorch · TensorFlow · OpenCV · GCP",
        text: "Built a sky-visibility CNN (95% accurate at night) at Neurabuild in Cape Town. At Vanderbilt, benchmarked few-shot segmentation models and found ways to cut inference time 22%.",
      },
      {
        heading: "Automation for real organizations",
        meta: "Python · pandas · Lighthouse",
        text: "Analytics and accessibility tooling for 97 parishes and 12 school districts: ADA compliance up 20% across 11k+ pages.",
      },
    ],
    links: [
      { label: "Résumé", href: RESUME_HREF },
      { label: "Source for this site", href: "https://github.com/aetomack/aetomack.github.io" },
    ],
  },

  corkboard: {
    label: "the corkboard",
    kicker: "Where I've been",
    title: "Engineering, with people in the room.",
    body: [
      "I've built software and I've worked the front door of members' clubs, sometimes in the same year. Each one makes me better at the other: hospitality taught me to read people fast, and engineering lets me fix what I hear.",
    ],
    entries: [
      {
        heading: "Founder · Madras",
        meta: "San Francisco · Aug 2026 – Present",
        text: "Something new for artists.",
      },
      {
        heading: "Member Services · SHACK15",
        meta: "San Francisco · May 2026 – Present",
        text: "First point of contact for 2,000+ members. I remember the details that make care personal, resolve conflicts quickly, and run event check-in.",
      },
      {
        heading: "Full Stack AI Engineer & Co-founder · Lynx",
        meta: "Nov 2025 – Aug 2026",
        text: "Built the platform, the brand, and the pitch. Cold outreach to 50 students, alumni, professors and investors brought in 2 angels as mentors in two weeks. We pitched for the Hult Prize to Nashville founders and angels.",
      },
      {
        heading: "Club Receptionist · Soho House",
        meta: "Nashville · Nov 2025 – Aug 2026",
        text: "Thousands of high-profile members and guests. I worked across F&B, Membership, and Hotel teams, and the house earned a 97% front-of-house satisfaction rating and a 2nd Michelin Key.",
      },
      {
        heading: "Full Stack Engineer · XTraffic & Arrowz",
        meta: "Contract · Jun 2025 – Jan 2026",
        text: "Edge-device infrastructure for a traffic-data client, and LLM features for a mobile app's 1k+ users.",
      },
      {
        heading: "Applied ML Researcher · Vanderbilt University",
        meta: "Nashville · Jan – Mar 2025",
        text: "Scraped museum image data and benchmarked few-shot segmentation models on hand-labelled data.",
      },
      {
        heading: "Backend Engineer · Diocese of Greensburg",
        meta: "Pennsylvania · Aug 2023 – Aug 2024",
        text: "Websites, analytics, and accessibility for 100+ parishes and schools, most of them run by non-technical staff.",
      },
      {
        heading: "Machine Learning Intern · Neurabuild",
        meta: "Cape Town · Jul – Aug 2023",
        text: "Computer vision for portable astronomical observatories.",
      },
      {
        heading: "B.S. Economics, minor in Computer Science",
        meta: "Vanderbilt University",
        text: "Econ for how people decide, CS for building the thing.",
      },
    ],
    links: [
      { label: "Résumé (PDF)", href: RESUME_HREF },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alex-tomack/" },
    ],
  },

  easel: {
    label: "the easel",
    kicker: "Artist",
    title: "I make things by hand, too.",
    body: [
      "Making art is where I practice patience and taste: knowing when something is finished, and when it isn't.",
      "It's the same instinct I bring to interfaces. Every line in this room was drawn by hand, just in code.",
      "I'm now building Madras, something new for artists.",
    ],
    image: {
      src: PORTRAIT_SRC,
      alt: "Pixel-art portrait of Alex: long curly hair, round glasses, and a mustache, in a white tee and jeans, lounging on a bench above the San Francisco Bay.",
      caption: "On the easel: me, pixelated, above the Bay.",
    },
    links: [{ label: "Madras", href: "https://www.wearmadras.com" }],
  },

  guitar: {
    label: "the guitar",
    kicker: "Musician",
    title: "Playing well with others.",
    body: [
      "Music taught me to listen harder than I play. A good band is a good team: everyone hears the whole song, not just their part.",
    ],
  },

  playbill: {
    label: "the playbill",
    kicker: "Actor",
    title: "Reading the room is a skill.",
    body: [
      "On stage you learn to stay present, take direction, and make the person across from you look good. Improv is collaboration with no time to prepare.",
      "All of that carries straight over to a customer call that goes off-script.",
    ],
  },

  rack: {
    label: "the clothing rack",
    kicker: "Fashion",
    title: "Details, and how they make people feel.",
    body: [
      "I like clothes for the same reason I like good software: craft, fit, and the small choices that make someone feel considered.",
      "Style is just design you get to wear.",
    ],
    links: [{ label: "Fits on Instagram", href: INSTAGRAM_HREF }],
  },

  camera: {
    label: "the camera",
    kicker: "Content creator",
    title: "Behind the lens, and in front of it.",
    body: [
      "I shoot fashion and videography for my Instagram. I do the styling, filming, and editing myself.",
      "Making content is a fast feedback loop with real people: you post it, and within an hour you know whether it landed. It's the same instinct as shipping a demo and watching someone use it.",
    ],
    links: [{ label: "Instagram · @alexanderetoma", href: INSTAGRAM_HREF }],
  },

  box: {
    label: "a box I haven't unpacked",
    kicker: "Still unpacking",
    title: "Let's talk.",
    body: [
      "I'm in San Francisco and looking for forward-deployed engineering roles, where the job is half building and half being in the room with the people it's for.",
      "I'm still moving in, so there are more rooms to come. In the meantime, here's where to find me.",
    ],
    links: [
      { label: "Email", href: "mailto:atomack315@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alex-tomack/" },
      { label: "Instagram", href: INSTAGRAM_HREF },
      { label: "Résumé", href: RESUME_HREF },
      { label: "GitHub", href: "https://github.com/aetomack" },
    ],
  },
};
