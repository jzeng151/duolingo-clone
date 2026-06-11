import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

/* ─── Data ──────────────────────────────────────────────────────────── */

const ministries = [
  {
    title: "Men's Ministry",
    description:
      "Building men of purpose, integrity, and authentic faith who lead with strength and humility.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
  },
  {
    title: "Women's Ministry",
    description:
      "Empowering women to walk boldly in their identity, calling, and God-given potential.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "ICC Students",
    description:
      "A dynamic space for teens and college students to encounter faith and build lifelong community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Children's Ministry",
    description:
      "Nurturing the faith of children ages 0–12 through joyful, age-appropriate teaching and care.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Young Adults",
    description:
      "A thriving community for adults in their 20s & 30s navigating life, career, and faith together.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Community Outreach",
    description:
      "Serving Houston through food drives, charity events, and partnerships that transform lives.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const events = [
  {
    day:   "22",
    month: "JUN",
    year:  "2026",
    type:  "Weekly Service",
    title: "Sunday Celebration Service",
    description:
      "Join thousands as we worship together, receive the Word, and experience the presence of God.",
    time:     "10:00 AM & 12:00 PM",
    location: "Main Auditorium",
    gradient: "from-midnight via-navy to-midnight-800",
    cta:      "Learn More",
  },
  {
    day:   "25",
    month: "JUN",
    year:  "2026",
    type:  "Prayer Night",
    title: "Corporate Prayer & Fasting Night",
    description:
      "An evening of powerful intercession, worship, and seeking God together as a church family.",
    time:     "7:00 PM – 9:00 PM",
    location: "Main Auditorium",
    gradient: "from-midnight-800 via-midnight to-navy",
    cta:      "Register Free",
  },
  {
    day:   "28",
    month: "JUN",
    year:  "2026",
    type:  "Outreach",
    title: "ICC Houston Community Day",
    description:
      "A day of serving our city — food distribution, free resources, and love in action for Houston.",
    time:     "9:00 AM – 2:00 PM",
    location: "Memorial Park, Houston",
    gradient: "from-navy via-midnight-800 to-midnight",
    cta:      "Volunteer Now",
  },
];

const sermons = [
  {
    series:   "Foundations of Faith",
    title:    "The God Who Provides",
    speaker:  "Senior Pastor",
    date:     "June 15, 2026",
    duration: "52 min",
    gradient: "from-midnight to-midnight-800",
  },
  {
    series:   "Foundations of Faith",
    title:    "Faith Over Fear",
    speaker:  "Senior Pastor",
    date:     "June 8, 2026",
    duration: "48 min",
    gradient: "from-midnight-800 to-navy",
  },
  {
    series:   "Knowing Your Calling",
    title:    "Walking in Purpose",
    speaker:  "Associate Pastor",
    date:     "June 1, 2026",
    duration: "44 min",
    gradient: "from-navy to-midnight",
  },
];

const stats = [
  { value: "8+",    label: "Years of Ministry"   },
  { value: "3k+",   label: "Church Family"        },
  { value: "50+",   label: "Baptisms This Year"   },
  { value: "12",    label: "Active Ministries"    },
];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-inter)" }}>
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-midnight"
      >
        {/* Layered gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(200,168,75,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_20%,rgba(30,58,95,0.5),transparent)]" />

        {/* Decorative cross — right edge, very faint */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-[0.025]">
          <svg viewBox="0 0 200 500" fill="white" className="h-full w-auto ml-auto">
            <rect x="85" y="0"  width="30" height="500" />
            <rect x="0"  y="130" width="200" height="30" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 py-28 sm:py-36">
          <div
            className="max-w-3xl"
            style={{ animation: "fade-up 0.8s ease-out 0.1s both" }}
          >
            {/* Location badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/20 bg-gold/8 px-4 py-1.5 mb-8">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-gold"
                style={{ animation: "pulse-soft 2s ease-in-out infinite" }}
              />
              <span className="text-gold text-sm font-medium tracking-wide">
                Houston, Texas · Est. 2018
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-semibold text-white leading-[0.92] mb-8 tracking-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Where Faith
              <br />
              <span className="italic text-gold">Meets</span>
              <br />
              Community.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/55 max-w-md mb-10 leading-relaxed">
              A vibrant, multicultural church family in the heart of Houston.
              Discover purpose, belonging, and authentic faith.
            </p>

            {/* Service time pills */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12 text-sm text-white/45">
              <div className="flex items-center gap-2.5">
                <div className="w-0.5 h-4 rounded-full bg-gold/70" />
                <span>Sundays · 10:00 AM &amp; 12:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-0.5 h-4 rounded-full bg-gold/70" />
                <span>Wednesday Prayer · 7:00 PM</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#visit"
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-midnight hover:bg-gold-dark active:scale-95 transition-all duration-200 shadow-xl shadow-gold/20"
              >
                Plan Your Visit
              </a>
              <a
                href="#sermons"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-all duration-200 backdrop-blur-sm"
              >
                Watch Live
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/25">
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICE TIMES STRIP
      ══════════════════════════════════════════ */}
      <div className="bg-gold">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 text-midnight">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sunday Services: 10:00 AM &amp; 12:00 PM
            </div>
            <div className="hidden sm:block w-px h-4 bg-midnight/20" />
            <div className="flex items-center gap-3 text-sm font-semibold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Wednesday Prayer: 7:00 PM
            </div>
            <div className="hidden sm:block w-px h-4 bg-midnight/20" />
            <div className="flex items-center gap-3 text-sm font-semibold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Houston, Texas
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left — text */}
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
                Our Story
              </p>
              <h2
                className="text-4xl lg:text-5xl font-semibold text-midnight leading-tight mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                A Church That Feels
                <br />
                <span className="italic">Like Home</span>
              </h2>
              <p className="text-steel text-lg leading-relaxed mb-6">
                ICC Houston is a branch of the International Christian Centre
                family — a network of churches united by a passion to see lives
                transformed through the power of the Gospel.
              </p>
              <p className="text-steel text-lg leading-relaxed mb-10">
                Since 2018, we have been building a community where everyone
                belongs — regardless of background, nationality, or season of
                life. We believe church should be a place of encounter,
                healing, and authentic community.
              </p>

              {/* Gold pull-quote line */}
              <blockquote className="border-l-2 border-gold pl-5 mb-10">
                <p
                  className="text-2xl text-midnight font-medium italic leading-snug"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  "We exist to connect people to God and to one another."
                </p>
              </blockquote>

              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-full border-2 border-midnight bg-transparent px-6 py-3 text-sm font-semibold text-midnight hover:bg-midnight hover:text-white transition-all duration-200"
              >
                Plan Your First Visit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-3xl border border-cream bg-cream p-8 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/8 hover:-translate-y-1 transition-all duration-300"
                >
                  <p
                    className="text-5xl font-semibold text-gold mb-2 leading-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-steel uppercase tracking-widest leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}

              {/* Bottom image placeholder */}
              <div className="col-span-2 rounded-3xl h-40 bg-gradient-to-br from-midnight to-navy flex items-end p-6 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 200 160" fill="white" className="w-full h-full">
                    <rect x="90" y="0"  width="20" height="160" />
                    <rect x="0"  y="55" width="200" height="20" />
                  </svg>
                </div>
                <p className="relative text-gold text-xs uppercase tracking-[0.3em] font-medium">
                  ICC Houston · Houston, Texas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MINISTRIES
      ══════════════════════════════════════════ */}
      <section id="ministries" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
              Get Involved
            </p>
            <h2
              className="text-4xl lg:text-5xl font-semibold text-midnight leading-tight mb-5"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Ministries for Every
              <br />
              <span className="italic">Season of Life</span>
            </h2>
            <p className="text-steel text-lg leading-relaxed">
              Whether you are 2 or 92, there is a place for you at ICC Houston.
              Our ministries exist to help you grow, connect, and serve.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => (
              <article
                key={ministry.title}
                className="group relative rounded-3xl border border-cream bg-warm-white p-8 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/8 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Gold top-line on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-3xl" />

                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-pale text-gold group-hover:bg-gold group-hover:text-midnight transition-colors duration-300">
                  {ministry.icon}
                </div>

                {/* Content */}
                <h3
                  className="text-2xl font-semibold text-midnight mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {ministry.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed mb-6">
                  {ministry.description}
                </p>

                <a
                  href="#connect"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:gap-3 transition-all duration-200"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTS
      ══════════════════════════════════════════ */}
      <section id="events" className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
                What&apos;s On
              </p>
              <h2
                className="text-4xl lg:text-5xl font-semibold text-midnight leading-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Upcoming Events
              </h2>
            </div>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 text-sm font-semibold text-midnight/60 hover:text-gold transition-colors shrink-0"
            >
              View All Events
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event.title}
                className="group rounded-3xl overflow-hidden border border-cream hover:shadow-xl hover:shadow-midnight/8 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${event.gradient} overflow-hidden`}
                >
                  {/* Date badge */}
                  <div className="absolute top-4 left-4 flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg w-14 h-14">
                    <p className="text-lg font-bold text-midnight leading-none">{event.day}</p>
                    <p className="text-[10px] uppercase tracking-widest text-steel font-semibold">{event.month}</p>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block rounded-full bg-gold/20 border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-gold">
                      {event.type}
                    </span>
                  </div>

                  {/* Subtle cross */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <svg viewBox="0 0 60 80" fill="white" className="w-12 h-12">
                      <rect x="25" y="0"  width="10" height="80" />
                      <rect x="0"  y="22" width="60" height="10" />
                    </svg>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-warm-white p-6">
                  <h3
                    className="text-xl font-semibold text-midnight mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Meta */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-xs text-steel/70">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-steel/70">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  <a
                    href="#connect"
                    className="inline-flex items-center justify-center w-full rounded-full bg-midnight px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy group-hover:bg-gold group-hover:text-midnight transition-all duration-300"
                  >
                    {event.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERMONS
      ══════════════════════════════════════════ */}
      <section id="sermons" className="bg-midnight py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
                Messages
              </p>
              <h2
                className="text-4xl lg:text-5xl font-semibold text-white leading-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Recent Sermons
              </h2>
            </div>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-gold transition-colors shrink-0"
            >
              Full Sermon Library
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((sermon, i) => (
              <article
                key={sermon.title}
                className="group rounded-3xl overflow-hidden border border-white/8 hover:border-gold/30 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className={`relative h-40 bg-gradient-to-br ${sermon.gradient}`}>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/0 border-2 border-gold/40 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-gold group-hover:text-midnight transition-colors duration-300 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-lg bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white/80">
                      {sermon.duration}
                    </span>
                  </div>

                  {/* New badge for latest */}
                  {i === 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold text-midnight uppercase tracking-wider">
                        Latest
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="bg-midnight-800 p-6">
                  <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
                    {sermon.series}
                  </p>
                  <h3
                    className="text-xl font-semibold text-white mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {sermon.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-white/40 mb-5">
                    <span>{sermon.speaker}</span>
                    <span>{sermon.date}</span>
                  </div>

                  <a
                    href="#connect"
                    className="inline-flex items-center justify-center w-full gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold hover:text-midnight hover:border-gold transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Watch Now
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section id="gallery" className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
              Life at ICC Houston
            </p>
            <h2
              className="text-4xl lg:text-5xl font-semibold text-midnight leading-tight mb-5"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Moments That
              <br />
              <span className="italic">Matter</span>
            </h2>
            <p className="text-steel text-lg leading-relaxed">
              A glimpse into our community — the worship, the fellowship,
              and the love that defines ICC Houston.
            </p>
          </div>

          <Gallery />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VISIT / CONNECT
      ══════════════════════════════════════════ */}
      <section id="visit" className="bg-midnight py-24 lg:py-32 relative overflow-hidden">
        {/* Background gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(200,168,75,0.08),transparent)]" />

        {/* Decorative cross */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <svg viewBox="0 0 200 280" fill="white" className="w-64 h-64">
            <rect x="85" y="0"  width="30" height="280" />
            <rect x="0"  y="80" width="200" height="30" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — CTA */}
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4">
                Join Us
              </p>
              <h2
                className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                We&apos;d Love to
                <br />
                <span className="italic text-gold">Meet You</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10">
                Whether you are brand new to faith or returning after years away,
                ICC Houston is a place where you are welcomed, loved, and
                celebrated — exactly as you are.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#connect"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-midnight hover:bg-gold-dark active:scale-95 transition-all duration-200 shadow-xl shadow-gold/20"
                >
                  Plan Your Visit
                </a>
                <a
                  href="tel:+1-000-000-0000"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </div>

            {/* Right — Info cards */}
            <div className="space-y-4" id="connect">

              {/* Address */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm hover:border-gold/25 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-1">Location</p>
                    <p className="text-white font-medium">Houston, Texas</p>
                    <p className="text-white/45 text-sm mt-1">Address available upon registration</p>
                  </div>
                </div>
              </div>

              {/* Service Times */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm hover:border-gold/25 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">Service Times</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-8">
                        <span className="text-white/60">Sunday First Service</span>
                        <span className="text-white font-medium">10:00 AM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-white/60">Sunday Second Service</span>
                        <span className="text-white font-medium">12:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-white/60">Wednesday Prayer</span>
                        <span className="text-white font-medium">7:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm hover:border-gold/25 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-1">Get in Touch</p>
                    <p className="text-white font-medium">info@icchouston.org</p>
                    <p className="text-white/45 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-midnight-900 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Main footer content */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-midnight text-xs font-bold tracking-wide shrink-0">
                  ICC
                </div>
                <div className="leading-none">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-0.5">
                    International Christian Centre
                  </p>
                  <p
                    className="text-white font-semibold text-xl leading-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Houston
                  </p>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                A community of faith, purpose, and love in the heart of Houston, Texas.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {["Facebook", "Instagram", "YouTube"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    aria-label={platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-gold/40 hover:text-gold transition-all duration-200"
                  >
                    <span className="text-xs font-bold">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-5">
                Quick Links
              </p>
              <ul className="space-y-3">
                {["About Us", "Ministries", "Events", "Sermons", "Gallery", "Give Online"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-5">
                Ministries
              </p>
              <ul className="space-y-3">
                {["Men's Ministry", "Women's Ministry", "ICC Students", "Children's Ministry", "Young Adults", "Outreach"].map((item) => (
                  <li key={item}>
                    <a
                      href="#ministries"
                      className="text-white/40 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times */}
            <div>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-5">
                Service Times
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Sunday Services</p>
                  <p className="text-white/40 text-sm">10:00 AM &amp; 12:00 PM</p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Wednesday Prayer</p>
                  <p className="text-white/40 text-sm">7:00 PM</p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Location</p>
                  <p className="text-white/40 text-sm">Houston, Texas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
            <p>© 2026 ICC Houston. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
