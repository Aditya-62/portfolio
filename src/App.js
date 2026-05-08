import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import profileImg from "./profile.jpg.webp";
import certInternship  from "./Internship Completion Certificate – DIGISAMAKSH Private Limited (IT Intern, June–August 2025).jpeg";
import certUiPath      from "./Certificate of Participation – Build Smarter, Scalable AI Agents with UiPath (GeeksforGeeks + UiPath Workshop).jpeg";
import certDocker      from "./Certificate of Participation – Fundamentals of Docker & Kubernetes (Scaler Masterclass).png";
import certMLOps       from "./Certificate of Participation – ML Ops Fundamentals Building, Deploying, and Scaling AI Solutions (Scaler Masterclass).png";
import certVBYLD       from "./Certificate of Participation – Viksit Bharat Young Leaders Dialogue (VBYLD) 2026 Quiz (Ministry of Youth Affairs & Sports).png";
import certSDE         from "./Certificate of Participation – What Does It Take to Become a Microsoft SDE (Scaler Masterclass).png";
import ReactGA from "react-ga4";
import emailjs from "@emailjs/browser";
import CountryCodePicker from "./CountryCodePicker";
import CustomCursor from "./CustomCursor";
import Loader from "./Loader";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import WhatsAppButton from "./WhatsAppButton";

// ── Google Analytics init ──
// Replace with your GA4 Measurement ID from analytics.google.com
const GA_ID = "G-XXXXXXXXXX";
ReactGA.initialize(GA_ID);

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -18;
    const rotateY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  18;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };
  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

/* ── Typewriter ── */
function Typewriter({ words }) {
  const [index, setIndex]     = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[index % words.length];
    const id = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1600);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIndex(i => i + 1); }
      }
    }, deleting ? 55 : 95);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);
  return <span className="gold-text font-bold">{text}<span className="cursor" style={{color:"#f59e0b"}}>|</span></span>;
}

/* ── Skills ── */
const skills = [
  { name: "React.js",   icon: "⚛️", color: "from-violet-500 to-blue-500" },
  { name: "Angular",    icon: "🅰️", color: "from-red-500 to-rose-600" },
  { name: "Node.js",    icon: "🟢", color: "from-emerald-500 to-green-600" },
  { name: "Express.js", icon: "🚀", color: "from-slate-500 to-slate-700" },
  { name: "AWS",        icon: "☁️", color: "from-amber-400 to-orange-500" },
  { name: "Azure",      icon: "🔷", color: "from-blue-500 to-indigo-600" },
  { name: "MongoDB",    icon: "🍃", color: "from-green-500 to-teal-600" },
  { name: "DynamoDB",   icon: "⚡", color: "from-yellow-400 to-amber-500" },
  { name: "MySQL",      icon: "🐬", color: "from-blue-400 to-cyan-500" },
  { name: "HTML5",      icon: "🌐", color: "from-orange-500 to-red-500" },
  { name: "CSS3",       icon: "🎨", color: "from-blue-400 to-violet-500" },
  { name: "JavaScript", icon: "💛", color: "from-yellow-400 to-amber-500" },
  { name: "GitHub",     icon: "🐙", color: "from-slate-500 to-slate-700" },
  { name: "VS Code",    icon: "💙", color: "from-blue-500 to-indigo-600" },
  { name: "Postman",    icon: "📮", color: "from-orange-400 to-red-500" },
  { name: "Python",     icon: "🐍", color: "from-yellow-400 to-blue-500" },
];

/* ── Projects ── */
const projects = [
  {
    title: "Smart File Storage System",
    desc: "Secure cloud-based file storage with chunk upload and zero-knowledge encryption using AWS S3, DynamoDB and KMS.",
    tags: ["AWS S3", "DynamoDB", "KMS", "Node.js"],
    gradient: "from-violet-600/30 via-indigo-500/20 to-blue-600/30",
    icon: "🗄️",
    github: "https://github.com/Aditya-62",
    live: "",
  },
  {
    title: "AI Based GD Platform",
    desc: "Real-time AI powered group discussion platform with machine learning analysis and responsive frontend UI.",
    tags: ["React.js", "Python", "ML", "WebSocket"],
    gradient: "from-amber-500/25 via-orange-400/15 to-rose-500/25",
    icon: "🤖",
    github: "https://github.com/Aditya-62",
    live: "",
  },
  {
    title: "Interactive Course Dashboard",
    desc: "Feature-rich e-learning dashboard with course progress tracking, video lessons, quizzes and student analytics.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    gradient: "from-emerald-500/25 via-teal-500/15 to-cyan-600/25",
    icon: "📚",
    github: "https://github.com/Aditya-62",
    live: "",
  },
  {
    title: "Movie Ticket Booking",
    desc: "Online movie ticket booking platform with seat selection, show timings, payment integration and booking history.",
    tags: ["React.js", "Node.js", "MySQL", "Express.js"],
    gradient: "from-rose-500/25 via-pink-500/15 to-fuchsia-600/25",
    icon: "🎬",
    github: "https://github.com/Aditya-62",
    live: "",
  },
];

export default function App() {

  const formRef    = useRef(null);
  const [formStatus, setFormStatus] = useState("idle");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Track page view on load
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    emailjs.sendForm(
      "YOUR_SERVICE_ID",   // replace after EmailJS setup
      "YOUR_TEMPLATE_ID",  // replace after EmailJS setup
      formRef.current,
      "YOUR_PUBLIC_KEY"    // replace after EmailJS setup
    )
    .then(() => {
      setFormStatus("success");
      formRef.current.reset();
      ReactGA.event({ category: "Contact", action: "submit", label: "Form Success" });
      setTimeout(() => setFormStatus("idle"), 4000);
    })
    .catch(() => {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    });
  };

  return (
    <div className="bg-[#04070f] text-white overflow-hidden noise">
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppButton />

      {/* ── Ambient orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[15%]  w-[700px] h-[700px] bg-violet-700/10 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] bg-amber-500/8  blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/6 blur-[130px] rounded-full"></div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#04070f]/70 border-b border-violet-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-sm font-black glow-pulse shadow-lg">A</div>
            <span className="text-base sm:text-lg font-black animated-gradient">Aditya Pratap Singh</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["Home","About","Skills","Projects","Experience","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-slate-400 hover:text-white transition-colors duration-200">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/Aditya_Resume.pdf" download className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-violet-500/30 text-violet-300 hover:border-amber-400/60 hover:text-amber-300 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Resume
            </a>
            <a href="#contact" onClick={() => ReactGA.event({ category:"CTA", action:"click", label:"Navbar Hire Me" })} className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-violet-500/20">
              Hire Me ✦
            </a>
            {/* Hamburger */}
            <button onClick={() => setMobileMenu(m => !m)} className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl border border-violet-500/20 hover:border-violet-500/40 transition-all">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenu ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenu ? "opacity-0" : ""}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-3 border-t border-violet-500/10 bg-[#04070f]/95">
            {["Home","About","Skills","Projects","Experience","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium border-b border-white/5">{item}</a>
            ))}
            <a href="/Aditya_Resume.pdf" download className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 dot-grid">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["p1","p2","p3","p4","p5","p6"].map(p => <div key={p} className={`particle ${p}`}></div>)}
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10 w-full">

          {/* LEFT */}
          <div>
            <div className="fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-sm font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for opportunities
            </div>

            <h1 className="fade-in-up delay-1 text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-5">
              Hi, I'm
              <span className="block animated-gradient mt-1">Aditya Pratap</span>
              <span className="block animated-gradient">Singh</span>
            </h1>

            <p className="fade-in-up delay-2 text-xl text-slate-400 mb-3 font-medium h-8">
              <Typewriter words={["Cloud Developer", "Full Stack Developer", "AWS Enthusiast", "Problem Solver"]} />
            </p>

            <p className="fade-in-up delay-3 text-slate-500 text-base leading-relaxed max-w-lg mb-10 mt-4">
              Motivated CS undergraduate passionate about full-stack development,
              cloud computing, and building scalable user-centric applications.
            </p>

            <div className="fade-in-up delay-4 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#projects" className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 text-sm">
                View Projects
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              <a href="#contact" className="px-6 py-3 rounded-2xl border border-violet-500/30 font-semibold hover:border-amber-400/60 hover:bg-amber-400/5 hover:text-amber-300 transition duration-300 text-sm text-center">
                Contact Me
              </a>
              <a href="/Aditya_Resume.pdf" download className="px-6 py-3 rounded-2xl border border-emerald-500/30 text-emerald-400 font-semibold hover:border-emerald-400/60 hover:bg-emerald-400/5 transition duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download CV
              </a>
            </div>

            {/* Stats */}
            <div className="fade-in-up delay-4 flex gap-6 sm:gap-10 mt-12 pt-8 border-t border-violet-500/15">
              {[["2+","Years Learning"],["5+","Projects Built"],["3+","Certifications"]].map(([n,l]) => (
                <div key={l}>
                  <p className="text-2xl font-black gold-text">{n}</p>
                  <p className="text-slate-500 text-sm mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Card */}
          <div className="flex justify-center mt-10 md:mt-0">
            <TiltCard className="relative w-full max-w-[340px] rounded-[32px] bg-white/[0.04] backdrop-blur-2xl border border-violet-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-transparent to-amber-500/5 pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"></div>

              <div className="p-8 tilt-card-inner">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-violet-500/40 glow-pulse">
                    <img src={profileImg} alt="Aditya" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#04070f] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-1">Aditya Pratap Singh</h2>
                <p className="text-violet-400 text-sm font-semibold mb-6">Cloud & Full Stack Developer</p>

                <div className="space-y-4">
                  {[
                    { label:"AWS Cloud", pct:"90%", color:"from-violet-500 to-indigo-500" },
                    { label:"React.js",  pct:"85%", color:"from-amber-400 to-orange-500" },
                    { label:"Node.js",   pct:"80%", color:"from-blue-500 to-indigo-500" },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300 font-medium">{label}</span>
                        <span className="text-slate-500">{pct}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className={`progress-bar h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: pct }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {["AWS","React","Node.js","MongoDB"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-medium border border-violet-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs">
          <span>scroll down</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-violet-400 animate-bounce"></div>
          </div>
        </div>

      </section>

      <div className="gradient-divider"></div>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12 sm:mb-20">
            <p className="text-violet-400 text-xs font-bold tracking-[4px] uppercase mb-4">Who I Am</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">About Me</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            <TiltCard className="rounded-3xl bg-white/[0.03] border border-violet-500/15 p-6 sm:p-10 backdrop-blur-sm">
              <div className="tilt-card-inner">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                    <img src={profileImg} alt="Aditya Pratap Singh" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-400 border-2 border-[#04070f] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-300 animate-pulse"></div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-xs font-black">✦</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Aditya Pratap Singh</h3>
                <p className="text-slate-400 leading-relaxed mb-5">
                  Hello! I'm from Muzaffarpur, Bihar, currently pursuing B.Tech in Computer Science & Engineering.
                  I have a strong passion for cloud technologies, scalable systems, and full-stack development.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  I enjoy solving real-world problems through technology and continuously improving my technical
                  and problem-solving skills. Always eager to learn and build impactful solutions.
                </p>
                <div className="flex gap-3 mt-8">
                  <a href="/Aditya_Resume.pdf" download className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold hover:bg-violet-500/20 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Resume
                  </a>
                  <a href="/Adityapr_cv.pdf" download className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold hover:bg-amber-500/20 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    CV
                  </a>
                </div>
              </div>
            </TiltCard>

            <div className="space-y-4">
              {[
                { icon:"🎓", label:"Education",  value:"B.Tech CSE — Centurion University Of Technology And Management" },
                { icon:"📍", label:"Location",   value:"Muzaffarpur, Bihar, India" },
                { icon:"💼", label:"Experience", value:"Web Developer Intern @ DIGISAMAKSH" },
                { icon:"📧", label:"Email",      value:"sadityapratap369@gmail.com" },
                { icon:"📱", label:"Phone",      value:"+91 8228855067" },
                { icon:"🎯", label:"Focus",      value:"Cloud Computing & Full Stack Dev" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-violet-500/10 hover:border-amber-400/30 hover:bg-amber-400/[0.03] transition duration-300 group">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">{label}</p>
                    <p className="text-slate-300 font-medium group-hover:text-amber-300 transition-colors duration-200 text-sm break-words">{value}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= EDUCATION ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12 sm:mb-20">
            <p className="text-amber-400 text-xs font-bold tracking-[4px] uppercase mb-4">My Background</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">Education</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { degree:"B.Tech CSE",    icon:"🎓", school:"Centurion University, Odisha",    year:"2023 – 2027",   detail:"CGPA: 7.81 / 10",    grad:"from-violet-600/15 to-indigo-600/15", border:"border-violet-500/25" },
              { degree:"Intermediate",  icon:"📚", school:"Kendriya Vidyalaya Sangathan",    year:"Completed 2023",detail:"Muzaffarpur, Bihar",   grad:"from-amber-500/15 to-orange-500/15",  border:"border-amber-500/25" },
              { degree:"Matriculation", icon:"🏫", school:"Kendriya Vidyalaya Sangathan",    year:"Completed 2021",detail:"Muzaffarpur, Bihar",   grad:"from-blue-600/15 to-indigo-600/15",   border:"border-blue-500/25" },
            ].map(({ degree, icon, school, year, detail, grad, border }) => (
              <TiltCard key={degree} className={`p-8 rounded-3xl bg-gradient-to-br ${grad} border ${border} backdrop-blur-sm`}>
                <div className="tilt-card-inner">
                  <div className="text-4xl mb-5">{icon}</div>
                  <h3 className="text-xl font-bold mb-3">{degree}</h3>
                  <p className="text-slate-300 font-medium mb-1">{school}</p>
                  <p className="text-slate-500 text-sm mb-2">{year}</p>
                  <p className="text-amber-400 text-sm font-semibold">{detail}</p>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12 sm:mb-20">
            <p className="text-violet-400 text-xs font-bold tracking-[4px] uppercase mb-4">What I Know</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">Skills</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
            {skills.map(({ name, icon, color }) => (
              <div key={name} className="skill-badge p-5 rounded-2xl bg-white/[0.03] border border-violet-500/10 text-center cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                  {icon}
                </div>
                <p className="font-semibold text-sm text-slate-300">{name}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12 sm:mb-20">
            <p className="text-amber-400 text-xs font-bold tracking-[4px] uppercase mb-4">My Journey</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">Experience</h2>
          </div>
          <TiltCard className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-violet-600/8 to-amber-500/5 border border-violet-500/20 backdrop-blur-sm">
            <div className="tilt-card-inner">

              <div className="flex items-start gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-violet-500/20">
                  💼
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Web Developer Intern</h3>
                  <p className="text-violet-400 font-semibold">DIGISAMAKSH</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-500 text-sm">June 2025 – Aug 2025</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Built a full-stack web application using Angular and Node.js with RESTful APIs.",
                  "Improved user engagement by 30% and reduced page load time by 40% through optimization.",
                  "Collaborated with cross-functional teams to improve UI responsiveness and accessibility.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="timeline-dot mt-1.5"></div>
                    <p className="text-slate-400 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {["Angular","Node.js","REST APIs","UI/UX","Performance"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold border border-violet-500/20">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </TiltCard>

        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= CERTIFICATIONS ================= */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-amber-400 text-xs font-bold tracking-[4px] uppercase mb-3">Achievements</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Certifications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-amber-400 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm">Click on any certificate to view it</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[["10", "Total"], ["6", "Technical"], ["4", "Participation"]].map(([n, l]) => (
              <div key={l} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-violet-500/10">
                <p className="text-2xl font-black gold-text">{n}</p>
                <p className="text-slate-500 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {[
              { name: "IT Internship Completion",        org: "DIGISAMAKSH Pvt. Ltd.",             date: "June – Aug 2025", type: "Internship", color: "violet", src: certInternship, isPdf: false },
              { name: "AWS Cloud Technical Essentials",  org: "Coursera × Amazon Web Services",     date: "2025",           type: "Cloud",      color: "orange", src: "/cert-aws.pdf",      isPdf: true  },
              { name: "Angular Course Completion",       org: "Infosys Springboard",                date: "2026",           type: "Frontend",   color: "red",    src: "/cert-angular.pdf",  isPdf: true  },
              { name: "GeeksforGeeks CUTM Training",     org: "GeeksforGeeks (16-week Program)",    date: "2025",           type: "Training",   color: "green",  src: "/cert-gfg.pdf",      isPdf: true  },
              { name: "Mastering Web3",                  org: "UNICI Institute for the Future",     date: "2026",           type: "Blockchain", color: "amber",  src: "/cert-web3.pdf",     isPdf: true  },
              { name: "AI Agents with UiPath",           org: "GeeksforGeeks × UiPath Workshop",    date: "2025",           type: "AI / ML",    color: "blue",   src: certUiPath,         isPdf: false },
              { name: "Docker & Kubernetes",             org: "Scaler Masterclass",                 date: "2025",           type: "DevOps",     color: "cyan",   src: certDocker,         isPdf: false },
              { name: "ML Ops Fundamentals",             org: "Scaler Masterclass",                 date: "2025",           type: "AI / ML",    color: "purple", src: certMLOps,          isPdf: false },
              { name: "Microsoft SDE Masterclass",       org: "Scaler Masterclass",                 date: "2025",           type: "Career",     color: "indigo", src: certSDE,            isPdf: false },
              { name: "Viksit Bharat Young Leaders",     org: "Ministry of Youth Affairs & Sports", date: "2025",           type: "Leadership", color: "emerald",src: certVBYLD,          isPdf: false },
            ].map(({ name, org, date, type, color, src, isPdf }, i) => {
              const colorMap = {
                violet:  { text: "text-violet-400",  border: "border-violet-500/25",  bg: "bg-violet-500/10",  glow: "group-hover:shadow-violet-500/20"  },
                orange:  { text: "text-orange-400",  border: "border-orange-500/25",  bg: "bg-orange-500/10",  glow: "group-hover:shadow-orange-500/20"  },
                red:     { text: "text-red-400",     border: "border-red-500/25",     bg: "bg-red-500/10",     glow: "group-hover:shadow-red-500/20"     },
                green:   { text: "text-green-400",   border: "border-green-500/25",   bg: "bg-green-500/10",   glow: "group-hover:shadow-green-500/20"   },
                amber:   { text: "text-amber-400",   border: "border-amber-500/25",   bg: "bg-amber-500/10",   glow: "group-hover:shadow-amber-500/20"   },
                blue:    { text: "text-blue-400",    border: "border-blue-500/25",    bg: "bg-blue-500/10",    glow: "group-hover:shadow-blue-500/20"    },
                cyan:    { text: "text-cyan-400",    border: "border-cyan-500/25",    bg: "bg-cyan-500/10",    glow: "group-hover:shadow-cyan-500/20"    },
                purple:  { text: "text-purple-400",  border: "border-purple-500/25",  bg: "bg-purple-500/10",  glow: "group-hover:shadow-purple-500/20"  },
                indigo:  { text: "text-indigo-400",  border: "border-indigo-500/25",  bg: "bg-indigo-500/10",  glow: "group-hover:shadow-indigo-500/20"  },
                emerald: { text: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/10", glow: "group-hover:shadow-emerald-500/20" },
              };
              const c = colorMap[color];
              return (
                <div
                  key={name}
                  onClick={() => window.open(src, "_blank")}
                  className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/25 hover:bg-white/[0.05] hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  {/* Number */}
                  <div className={`w-8 h-8 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xs font-black ${c.text}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    {isPdf
                      ? <svg className={`w-4 h-4 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      : <svg className={`w-4 h-4 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm sm:text-base truncate transition-colors duration-200 group-hover:${c.text}`}>{name}</p>
                    <p className="text-slate-600 text-xs mt-0.5 truncate">{org}</p>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className={`hidden sm:block px-2.5 py-1 rounded-lg text-xs font-bold border ${c.bg} ${c.border} ${c.text}`}>{type}</span>
                    <span className="text-slate-600 text-xs font-medium">{date}</span>
                    <div className={`w-7 h-7 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200`}>
                      <svg className={`w-3.5 h-3.5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= CODING PROFILES ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <p className="text-violet-400 text-xs font-bold tracking-[4px] uppercase mb-4">Coding Activity</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">Coding Profiles</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { platform:"LeetCode",   handle:"@aditya_pratap",  problems:"150+", rating:"1400+", icon:"🟨", color:"from-yellow-500/15 to-orange-500/15", border:"border-yellow-500/25", url:"https://leetcode.com" },
              { platform:"HackerRank", handle:"@sadityapratap",  problems:"200+", rating:"5★",    icon:"🟩", color:"from-green-500/15 to-emerald-500/15", border:"border-green-500/25",  url:"https://hackerrank.com" },
              { platform:"GitHub",     handle:"@Aditya-62",      problems:"10+",  rating:"Repos", icon:"⬛", color:"from-slate-500/15 to-gray-500/15",   border:"border-slate-500/25",  url:"https://github.com/Aditya-62" },
            ].map(({ platform, handle, problems, rating, icon, color, border, url }) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className={`block p-7 rounded-3xl bg-gradient-to-br ${color} border ${border} backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 hover:shadow-lg`}>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-1">{platform}</h3>
                <p className="text-slate-400 text-sm mb-4">{handle}</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-2xl font-black text-white">{problems}</p>
                    <p className="text-slate-500 text-xs">Problems</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-amber-400">{rating}</p>
                    <p className="text-slate-500 text-xs">Rating</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12 sm:mb-20">
            <p className="text-violet-400 text-xs font-bold tracking-[4px] uppercase mb-4">What I've Built</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-16">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
            {projects.map(({ title, desc, tags, gradient, icon, github, live }) => (
              <div key={title} className="project-card rounded-3xl bg-white/[0.03] border border-violet-500/15 overflow-hidden group">
                <div className={`h-52 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-25 group-hover:opacity-45 group-hover:scale-110 transition duration-500">{icon}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04070f]/90 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-amber-300 transition-colors duration-300">{title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-5">{desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold border border-violet-500/20">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {github && (
                      <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:border-violet-500/40 hover:text-white transition-all duration-200">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        Code
                      </a>
                    )}
                    {live && (
                      <a href={live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold hover:bg-violet-500/20 transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="gradient-divider"></div>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12 sm:mb-16">
            <p className="text-amber-400 text-xs font-bold tracking-[4px] uppercase mb-4">Get In Touch</p>
            <h2 className="text-4xl sm:text-5xl font-black section-title mb-8">Contact Me</h2>
            <p className="text-slate-500 text-base sm:text-lg mt-10">Let's build something amazing together.</p>
          </div>
          <TiltCard className="p-5 sm:p-10 rounded-3xl bg-white/[0.03] border border-violet-500/15 backdrop-blur-sm">
            <div className="tilt-card-inner">

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text"  name="from_name"  placeholder="Your Name"  required className="contact-input w-full px-4 py-3 rounded-2xl placeholder-slate-700 text-sm" />
                  <input type="email" name="from_email" placeholder="Your Email" required className="contact-input w-full px-4 py-3 rounded-2xl placeholder-slate-700 text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="contact-input flex items-center rounded-2xl overflow-hidden">
                    <CountryCodePicker onChange={setCountryCode} />
                    <input type="tel" name="from_phone" placeholder="Phone Number" maxLength={15} onInput={e => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 15)} className="w-full px-3 py-3 bg-transparent outline-none placeholder-slate-700 text-white text-sm" />
                    <input type="hidden" name="country_code" value={countryCode} />
                  </div>
                  <input type="text" name="subject" placeholder="Subject" required className="contact-input w-full px-4 py-3 rounded-2xl placeholder-slate-700 text-sm" />
                </div>
                <textarea name="message" rows="4" placeholder="Your Message" required className="contact-input w-full px-4 py-3 rounded-2xl placeholder-slate-700 resize-none text-sm"></textarea>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-amber-500 font-semibold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  {formStatus === "sending" ? "Sending..." : "Send Message ✦"}
                </button>

                {formStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <span className="text-xl">✅</span>
                    <p className="font-medium">Message sent! I'll get back to you soon.</p>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                    <span className="text-xl">❌</span>
                    <p className="font-medium">Something went wrong. Please try again.</p>
                  </div>
                )}

              </form>

            </div>
          </TiltCard>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 px-6 border-t border-violet-500/10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-sm font-black">A</div>
            <span className="font-bold animated-gradient">Aditya Pratap Singh</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/Aditya-62",          label: "GitHub",    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
              { href: "www.linkedin.com/in/saditya369",     label: "LinkedIn",  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { href: "https://instagram.com/your-username",       label: "Instagram", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
              { href: "https://facebook.com/your-username",        label: "Facebook",  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
            ].map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/5 border border-violet-500/15 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                {svg}
              </a>
            ))}
          </div>

          <p className="text-slate-700 text-sm">© 2026 Aditya Pratap Singh</p>

        </div>
      </footer>

    </div>
  );
}
