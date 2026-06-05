import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";
import logo from "../assets/colan-logo-main.png";
import { useNavigate } from "react-router-dom";

/* ── Validators (unchanged) ─────────────────── */
function validateEmail(val) {
  if (!val.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val))
    return "Enter a valid email address.";
  return "";
}
function validatePassword(val) {
  if (!val) return "Password is required.";
  if (val.length < 6) return `At least 6 characters needed (${val.length}/6).`;
  return "";
}

/* ── Animated counter ────────────────────────── */
function AnimatedNumber({ target, duration = 1800, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{display}{suffix}</>;
}

/* ── Floating card ───────────────────────────── */
function FloatingCard({ children, delay = 0, style = {} }) {
  return (
    <div
      style={{
        animation: `floatCard 0.7s cubic-bezier(.22,1,.36,1) both`,
        animationDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Main component ──────────────────────────── */
export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [focused, setFocused] = useState({ email: false, password: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, msg) => {
    setToast({ type, title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const onChange = (field) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
    if (touched[field]) {
      const err = field === "email" ? validateEmail(val) : validatePassword(val);
      setErrors((er) => ({ ...er, [field]: err }));
    }
  };

  const onBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setFocused((f) => ({ ...f, [field]: false }));
    const err =
      field === "email"
        ? validateEmail(form[field])
        : validatePassword(form[field]);
    setErrors((er) => ({ ...er, [field]: err }));
  };

  const onFocus = (field) => () =>
    setFocused((f) => ({ ...f, [field]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const eErr = validateEmail(form.email);
    const pErr = validatePassword(form.password);
    setTouched({ email: true, password: true });
    setErrors({ email: eErr, password: pErr });
    if (eErr || pErr) {
      showToast("error", "Check your details", eErr || pErr);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    showToast("success", "Welcome back!", "Redirecting to your dashboard…");
    setTimeout(() => navigate("/sheet"), 1200);
  };

  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes floatCard {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes scanline {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes softFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: var(--target-width); }
        }
      `}</style>

      <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── LEFT (unchanged logic, minor font polish) ── */}
        <div className="w-full lg:w-[42%] bg-white flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-md">
            <img src={logo} alt="Colan" className="h-10 w-auto mb-10" />

            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-500 leading-6">
                Sign in to access your workspace and manage projects, tasks and
                timesheets.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    onBlur={onBlur("email")}
                    onFocus={onFocus("email")}
                    className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={form.password}
                    onChange={onChange("password")}
                    onBlur={onBlur("password")}
                    onFocus={onFocus("password")}
                    className="w-full h-11 pl-10 pr-12 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                {loading ? "Signing In…" : "Sign In"}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} />
              256-bit SSL Secured Connection
            </div>
          </div>
        </div>

        {/* ── RIGHT — minimalist animated panel ── */}
        <div
          className="hidden lg:flex flex-1 relative overflow-hidden"
          style={{ background: "#f8fafc", borderLeft: "1px solid #e2e8f0" }}
        >
          {/* Subtle dot grid */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.045]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#1e3a5f" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Thin scanline sweep */}
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent pointer-events-none"
            style={{ animation: "scanline 8s linear infinite" }}
          />

          {/* Accent vertical rule */}
          <div
            className="absolute left-14 top-24 bottom-24 w-px bg-slate-200"
            style={{ animation: "lineGrow 1.2s cubic-bezier(.22,1,.36,1) both", transformOrigin: "top" }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col justify-center px-20 py-16 w-full max-w-2xl mx-auto">

            {/* Label */}
            <FloatingCard delay={100}>
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-600"
                style={{ letterSpacing: "0.18em" }}
              >
                Colan Infotech · Employee Workspace
              </span>
            </FloatingCard>

            {/* Headline */}
            <FloatingCard delay={220}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.1,
                  color: "#0f172a",
                  marginTop: "1.2rem",
                  marginBottom: "1.4rem",
                }}
              >
                One platform<br />
                <em style={{ color: "#2563eb", fontStyle: "italic" }}>for everything</em><br />
                you manage.
              </h2>
            </FloatingCard>

            {/* Thin divider */}
            <FloatingCard delay={340}>
              <div
                style={{
                  height: "1px",
                  width: "48px",
                  background: "#2563eb",
                  marginBottom: "1.8rem",
                  animation: "lineGrow 0.8s 0.6s cubic-bezier(.22,1,.36,1) both",
                  transformOrigin: "left",
                }}
              />
            </FloatingCard>


            {/* Module cards — minimal line style */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { title: "Project Management", desc: "Track milestones & deliverables.", delay: 560 },
                { title: "Timesheet Tracking",  desc: "Monitor hours & productivity.",    delay: 640 },
                { title: "Quality Assurance",   desc: "Manage testing & issue flows.",    delay: 720 },
                { title: "Resource Planning",   desc: "Allocate teams & optimize load.",  delay: 800 },
              ].map(({ title, desc, delay }) => (
                <FloatingCard key={title} delay={delay}>
                  <div
                    style={{
                      padding: "16px 18px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      background: "white",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#2563eb",
                        marginBottom: "10px",
                        animation: `dotPulse 2.4s ${delay}ms ease-in-out infinite`,
                      }}
                    />
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>
                      {title}
                    </p>
                    <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </FloatingCard>
              ))}
            </div>

            {/* Live stats bar — minimal */}
            <FloatingCard delay={900}>
              <div
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "18px 22px",
                  animation: "softFloat 6s ease-in-out infinite",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>Workspace Overview</span>
                  <span
                    style={{
                      fontSize: "10px",
                      background: "#f0fdf4",
                      color: "#16a34a",
                      border: "1px solid #bbf7d0",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      fontWeight: 600,
                    }}
                  >
                    ● Live
                  </span>
                </div>

                {[
                  { label: "Completed Tasks", pct: 78 },
                  { label: "Working Hours",   pct: 62 },
                  { label: "Productivity",    pct: 94 },
                ].map(({ label, pct }, i) => (
                  <div key={label} style={{ marginBottom: i < 2 ? "10px" : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>{label}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#0f172a" }}>{pct}%</span>
                    </div>
                    <div style={{ height: "3px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          background: pct > 85 ? "#22c55e" : "#2563eb",
                          borderRadius: "10px",
                          "--target-width": `${pct}%`,
                          animation: `progressFill 1.4s ${900 + i * 150}ms cubic-bezier(.22,1,.36,1) both`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div
            style={{
              position: "fixed",
              top: "24px",
              right: "24px",
              zIndex: 9999,
              background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
              color: toast.type === "success" ? "#15803d" : "#b91c1c",
              padding: "12px 18px",
              borderRadius: "10px",
              fontSize: "13px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              animation: "fadeSlideUp 0.3s ease",
            }}
          >
            <strong>{toast.title}</strong> — {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}