import { useState } from "react";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  ShieldCheck, CheckCircle2, AlertCircle,
} from "lucide-react";
import logo from "../assets/colan-logo-main.png";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   Inline styles — no Tailwind conflicts
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    font-family: 'Exo 2', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f0f5fb;
  }

  /* ── LEFT PANEL ── */
  .lp-left {
    flex: 0 0 52%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 48px;
    background: #060f20;
  }

  /* Geometric grid pattern */
  .lp-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(42,133,212,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(42,133,212,0.07) 1px, transparent 1px);
    background-size: 48px 48px;
    z-index: 0;
  }

  /* Deep gradient overlay */
  .lp-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(26,106,173,0.35) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(0,200,224,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 60% 10%, rgba(192,54,90,0.15) 0%, transparent 45%);
    z-index: 0;
  }

  .lp-left-content { position: relative; z-index: 1; }

  /* Floating blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.25;
    z-index: 0;
    animation: blobFloat 8s ease-in-out infinite;
  }
  .blob-1 { width: 320px; height: 320px; background: #1a6aad; top: -80px; right: -60px; animation-delay: 0s; }
  .blob-2 { width: 240px; height: 240px; background: #00c8e0; bottom: 120px; left: -60px; animation-delay: 3s; }
  .blob-3 { width: 180px; height: 180px; background: #c0365a; top: 40%; right: 10%; animation-delay: 5s; }

  @keyframes blobFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-24px) scale(1.05); }
  }

  /* Icon cluster in center of left panel */
  .lp-icon-cluster {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .lp-center-badge {
    width: 140px; height: 140px;
    border-radius: 36px;
    background: linear-gradient(135deg, rgba(26,106,173,0.5), rgba(0,200,224,0.3));
    border: 1px solid rgba(58,160,240,0.3);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 60px rgba(42,133,212,0.3), 0 0 120px rgba(0,200,224,0.1);
    animation: badgePulse 3s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 60px rgba(42,133,212,0.3), 0 0 120px rgba(0,200,224,0.1); }
    50% { box-shadow: 0 0 80px rgba(42,133,212,0.5), 0 0 160px rgba(0,200,224,0.2); }
  }

  .lp-center-logo { width: 90px; object-fit: contain; filter: brightness(1.1); }

  /* Orbiting rings */
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(42,133,212,0.15);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: ringRotate 20s linear infinite;
  }
  .ring-1 { width: 220px; height: 220px; animation-duration: 20s; }
  .ring-2 { width: 330px; height: 330px; animation-duration: 30s; animation-direction: reverse; border-color: rgba(0,200,224,0.1); }
  .ring-3 { width: 450px; height: 450px; animation-duration: 40s; border-color: rgba(192,54,90,0.08); }

  @keyframes ringRotate { to { transform: translate(-50%, -50%) rotate(360deg); } }

  /* Ring dots */
  .ring-dot {
    position: absolute;
    width: 8px; height: 8px;
    border-radius: 50%;
    top: -4px; left: 50%;
    transform: translateX(-50%);
  }
  .ring-dot-blue  { background: #3aa0f0; box-shadow: 0 0 8px #3aa0f0; }
  .ring-dot-cyan  { background: #00c8e0; box-shadow: 0 0 8px #00c8e0; }
  .ring-dot-pink  { background: #c0365a; box-shadow: 0 0 8px #c0365a; }

  /* Bottom info card */
  .lp-info-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 28px 32px;
    animation: slideUpIn 0.8s ease both;
  }

  @keyframes slideUpIn {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lp-info-title {
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 10px;
  }

  .lp-info-title span {
    background: linear-gradient(90deg, #3aa0f0, #00c8e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .lp-info-desc { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 24px; }

  .lp-features { display: flex; flex-direction: column; gap: 10px; }
  .lp-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
  }
  .lp-feature-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── RIGHT PANEL ── */
  .lp-right {
    flex: 0 0 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 32px;
    background: #f0f5fb;
    position: relative;
    overflow: hidden;
  }

  .lp-right::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,106,173,0.06) 0%, transparent 70%);
  }

  .lp-form-wrap {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    animation: slideUpIn 0.6s ease both;
  }

  /* Logo area */
  .lp-logo-wrap { margin-bottom: 32px; }
  .lp-logo-img { height: 38px; object-fit: contain; }

  /* Card */
  .lp-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(26,106,173,0.1);
    border: 1px solid rgba(26,106,173,0.08);
    position: relative;
    overflow: hidden;
  }

  .lp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #c0365a, #1a6aad, #3aa0f0, #00c8e0);
  }

  .lp-card-glow {
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(58,160,240,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Heading */
  .lp-heading { margin-bottom: 28px; }
  .lp-heading h1 { font-size: 24px; font-weight: 800; color: #0d1f33; line-height: 1.2; margin-bottom: 6px; }
  .lp-heading p { font-size: 13.5px; color: #7a96b0; line-height: 1.6; }

  /* Field */
  .lp-field { margin-bottom: 20px; }
  .lp-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #4a6080;
    margin-bottom: 8px;
  }

  .lp-input-wrap { position: relative; }

  .lp-input-icon {
    position: absolute;
    left: 14px;
    top: 50%; transform: translateY(-50%);
    transition: color 0.2s;
    pointer-events: none;
  }

  .lp-input-icon-right {
    position: absolute;
    right: 14px;
    top: 50%; transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer;
    color: #a0b4c8;
    transition: color 0.2s;
    display: flex; align-items: center;
    padding: 0;
  }
  .lp-input-icon-right:hover { color: #1a6aad; }

  .lp-input {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    border: 1.5px solid #dde6f0;
    background: #f8fafd;
    padding: 0 44px 0 44px;
    font-size: 14px;
    font-family: 'Exo 2', sans-serif;
    color: #0d1f33;
    outline: none;
    transition: all 0.2s;
  }
  .lp-input::placeholder { color: #a0b4c8; }
  .lp-input:focus {
    border-color: #1a6aad;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(26,106,173,0.1);
  }
  .lp-input.has-error {
    border-color: #e0334c;
    background: #fff8f8;
    box-shadow: 0 0 0 4px rgba(224,51,76,0.08);
  }
  .lp-input.is-valid {
    border-color: #22c55e;
    background: #f8fffe;
    box-shadow: 0 0 0 4px rgba(34,197,94,0.08);
  }

  .lp-input-status {
    position: absolute;
    right: 44px;
    top: 50%; transform: translateY(-50%);
    pointer-events: none;
  }

  /* password field: less right padding needed since eye button is there */
  .lp-input.is-password { padding-right: 80px; }
  .lp-input.is-password .lp-input-status { right: 44px; }

  /* Error message */
  .lp-error {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 7px;
    font-size: 12px;
    color: #e0334c;
    font-weight: 500;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.25s ease, opacity 0.25s ease, margin 0.25s ease;
  }
  .lp-error.visible {
    max-height: 30px;
    opacity: 1;
  }

  /* Hint — password strength bar */
  .lp-strength-wrap {
    margin-top: 8px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  .lp-strength-wrap.visible { max-height: 40px; opacity: 1; }
  .lp-strength-bar-bg {
    height: 4px;
    border-radius: 99px;
    background: #e8eef5;
    overflow: hidden;
    margin-bottom: 5px;
  }
  .lp-strength-bar {
    height: 100%;
    border-radius: 99px;
    transition: width 0.4s ease, background 0.4s ease;
  }
  .lp-strength-label { font-size: 11px; font-weight: 600; }

  /* Forgot */
  .lp-forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -8px;
    margin-bottom: 24px;
  }
  .lp-forgot {
    font-size: 12px;
    font-weight: 600;
    color: #1a6aad;
    background: none; border: none;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
  }
  .lp-forgot:hover { color: #0d4a8a; text-decoration: underline; }

  /* Submit */
  .lp-submit {
    width: 100%;
    height: 50px;
    border-radius: 13px;
    border: none;
    background: linear-gradient(135deg, #1a6aad 0%, #3aa0f0 100%);
    color: #fff;
    font-family: 'Exo 2', sans-serif;
    font-size: 14.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    position: relative;
    overflow: hidden;
    transition: all 0.25s;
    box-shadow: 0 6px 20px rgba(26,106,173,0.3);
  }
  .lp-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(26,106,173,0.4);
  }
  .lp-submit:active:not(:disabled) { transform: translateY(0); }
  .lp-submit:disabled { opacity: 0.75; cursor: not-allowed; }

  /* Shimmer on button */
  .lp-submit::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transform: skewX(-20deg);
    transition: left 0.6s ease;
  }
  .lp-submit:hover::after { left: 160%; }

  /* Spinner dots */
  .lp-dots { display: flex; gap: 5px; align-items: center; }
  .lp-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    animation: dotBounce 0.9s ease-in-out infinite;
  }
  .lp-dot:nth-child(2) { animation-delay: 0.15s; }
  .lp-dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* Toast */
  .lp-toast {
    position: fixed;
    top: 24px; right: 24px;
    z-index: 9999;
    background: #fff;
    border-radius: 14px;
    padding: 14px 18px;
    display: flex; align-items: flex-start; gap: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    border: 1px solid #eee;
    min-width: 300px; max-width: 360px;
    animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .lp-toast.error { border-left: 4px solid #e0334c; }
  .lp-toast.success { border-left: 4px solid #22c55e; }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .lp-toast-icon { flex-shrink: 0; margin-top: 1px; }
  .lp-toast-title { font-size: 13px; font-weight: 700; color: #0d1f33; margin-bottom: 2px; }
  .lp-toast-msg   { font-size: 12px; color: #6b8aaa; line-height: 1.5; }

  /* Footer */
  .lp-footer { margin-top: 24px; text-align: center; }
  .lp-ssl {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: 12px; color: #7a96b0; font-weight: 500;
    margin-bottom: 8px;
  }
  .lp-copy { font-size: 11.5px; color: #a0b4c8; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .lp-left { flex: 0 0 45%; padding: 36px; }
    .lp-right { flex: 0 0 55%; }
  }

  @media (max-width: 768px) {
    .lp-root { flex-direction: column; }
    .lp-left {
      flex: none;
      height: 220px;
      padding: 28px 24px;
      justify-content: flex-end;
    }
    .lp-icon-cluster { display: none; }
    .lp-info-title { font-size: 20px; }
    .lp-info-desc, .lp-features { display: none; }
    .lp-info-card { padding: 20px 24px; }
    .lp-right { flex: none; padding: 32px 20px 40px; align-items: flex-start; }
    .lp-card { padding: 32px 24px; }
  }

  @media (max-width: 400px) {
    .lp-card { padding: 28px 18px; border-radius: 18px; }
    .lp-heading h1 { font-size: 20px; }
  }
`;

/* ─────────────────────────────────────────
   Validation helpers
───────────────────────────────────────── */
function validateEmail(val) {
  if (!val.trim()) return "Email is required.";
  if (!val.includes("@")) return "Email must contain @.";
  // accept @gmail.com, @yahoo.com, @colan.com etc — must have @ + domain + dot + tld
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(val)) return "Enter a valid email (e.g. name@gmail.com).";
  return "";
}

function validatePassword(val) {
  if (!val) return "Password is required.";
  if (val.length < 6) return `At least 6 characters needed (${val.length}/6).`;
  return "";
}

function getStrength(val) {
  if (!val) return { pct: 0, label: "", color: "" };
  if (val.length < 6) return { pct: 25, label: "Too short", color: "#e0334c" };
  let score = 1;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  if (score <= 2) return { pct: 40, label: "Weak", color: "#f97316" };
  if (score === 3) return { pct: 65, label: "Fair", color: "#eab308" };
  if (score === 4) return { pct: 82, label: "Good", color: "#22c55e" };
  return { pct: 100, label: "Strong", color: "#16a34a" };
}

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function LoginPage() {
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ email: "", password: "" });
  const [errors,  setErrors]  = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [focused, setFocused] = useState({ email: false, password: false });
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null); // { type, title, msg }

  const showToast = (type, title, msg) => {
    setToast({ type, title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const onChange = (field) => (e) => {
    const val = e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    if (touched[field]) {
      const err = field === "email" ? validateEmail(val) : validatePassword(val);
      setErrors(er => ({ ...er, [field]: err }));
    }
  };

  const onBlur = (field) => () => {
    setTouched(t => ({ ...t, [field]: true }));
    setFocused(f => ({ ...f, [field]: false }));
    const err = field === "email" ? validateEmail(form[field]) : validatePassword(form[field]);
    setErrors(er => ({ ...er, [field]: err }));
  };

  const onFocus = (field) => () => setFocused(f => ({ ...f, [field]: true }));

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
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    showToast("success", "Welcome back!", "Redirecting to your dashboard…");
    setTimeout(() => navigate("/sheet"), 1200);
  };

  const strength = getStrength(form.password);

  const inputClass = (field) => {
    let cls = "lp-input";
    if (field === "password") cls += " is-password";
    if (touched[field] && errors[field]) cls += " has-error";
    else if (touched[field] && !errors[field] && form[field]) cls += " is-valid";
    return cls;
  };

  const iconColor = (field) => {
    if (focused[field]) return "#1a6aad";
    if (touched[field] && errors[field]) return "#e0334c";
    if (touched[field] && !errors[field] && form[field]) return "#22c55e";
    return "#a0b4c8";
  };

  return (
    <>
      <style>{css}</style>

      {/* ── Toast ── */}
      {toast && (
        <div className={`lp-toast ${toast.type}`}>
          <div className="lp-toast-icon">
            {toast.type === "error"
              ? <AlertCircle size={18} color="#e0334c" />
              : <CheckCircle2 size={18} color="#22c55e" />}
          </div>
          <div>
            <p className="lp-toast-title">{toast.title}</p>
            <p className="lp-toast-msg">{toast.msg}</p>
          </div>
        </div>
      )}

      <div className="lp-root">

        {/* ════════════ LEFT PANEL ════════════ */}
        <div className="lp-left">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />

          {/* Orbiting rings + center badge */}
          <div className="lp-icon-cluster">
            <div className="ring ring-1"><div className="ring-dot ring-dot-blue" /></div>
            <div className="ring ring-2"><div className="ring-dot ring-dot-cyan" /></div>
            <div className="ring ring-3"><div className="ring-dot ring-dot-pink" /></div>
            <div className="lp-center-badge">
              <img src={logo} alt="Colan Infotech" className="lp-center-logo" />
            </div>
          </div>

          {/* Bottom info card */}
          <div className="lp-left-content">
            <div className="lp-info-card">
              <h2 className="lp-info-title">
                Smart Work<br />
                <span>Starts Here.</span>
              </h2>
              <p className="lp-info-desc">
                One platform for timesheets, projects, tasks, and quality assurance — built for the modern enterprise.
              </p>
              <div className="lp-features">
                {[
                  { dot: "#3aa0f0", text: "Real-time timesheet tracking" },
                  { dot: "#00c8e0", text: "Integrated project management" },
                  { dot: "#5dc85d", text: "Automated approval workflows" },
                  { dot: "#c0365a", text: "QA & RFP estimation tools" },
                ].map((f, i) => (
                  <div className="lp-feature" key={i}>
                    <div className="lp-feature-dot" style={{ background: f.dot, boxShadow: `0 0 6px ${f.dot}` }} />
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ RIGHT PANEL ════════════ */}
        <div className="lp-right">
          <div className="lp-form-wrap">

            {/* Logo */}
            <div className="lp-logo-wrap">
              <img src={logo} alt="Colan Infotech" className="lp-logo-img" />
            </div>

            {/* Card */}
            <div className="lp-card">
              <div className="lp-card-glow" />

              <div className="lp-heading">
                <h1>Welcome Back 👋</h1>
                <p>Sign in to your Colan Infotech workspace.</p>
              </div>

              <form onSubmit={onSubmit} noValidate>

                {/* ── Email ── */}
                <div className="lp-field">
                  <label className="lp-label">Email Address</label>
                  <div className="lp-input-wrap">
                    <span className="lp-input-icon">
                      <Mail size={16} color={iconColor("email")} />
                    </span>
                    <input
                      className={inputClass("email")}
                      type="email"
                      placeholder="name@gmail.com"
                      value={form.email}
                      onChange={onChange("email")}
                      onFocus={onFocus("email")}
                      onBlur={onBlur("email")}
                      autoComplete="email"
                      style={{ paddingRight: touched.email && form.email ? "80px" : "44px" }}
                    />
                    {touched.email && form.email && (
                      <span className="lp-input-status">
                        {errors.email
                          ? <AlertCircle size={15} color="#e0334c" />
                          : <CheckCircle2 size={15} color="#22c55e" />}
                      </span>
                    )}
                  </div>
                  <div className={`lp-error ${touched.email && errors.email ? "visible" : ""}`}>
                    <AlertCircle size={12} />
                    {errors.email}
                  </div>
                </div>

                {/* ── Password ── */}
                <div className="lp-field">
                  <label className="lp-label">Password</label>
                  <div className="lp-input-wrap">
                    <span className="lp-input-icon">
                      <Lock size={16} color={iconColor("password")} />
                    </span>
                    <input
                      className={inputClass("password")}
                      type={showPw ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={onChange("password")}
                      onFocus={onFocus("password")}
                      onBlur={onBlur("password")}
                      autoComplete="current-password"
                    />
                    {/* Status icon — between text and eye */}
                    {touched.password && form.password && (
                      <span style={{ position: "absolute", right: "42px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                        {errors.password
                          ? <AlertCircle size={15} color="#e0334c" />
                          : <CheckCircle2 size={15} color="#22c55e" />}
                      </span>
                    )}
                    <button
                      type="button"
                      className="lp-input-icon-right"
                      onClick={() => setShowPw(v => !v)}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  <div className={`lp-strength-wrap ${form.password ? "visible" : ""}`}>
                    <div className="lp-strength-bar-bg">
                      <div
                        className="lp-strength-bar"
                        style={{ width: `${strength.pct}%`, background: strength.color }}
                      />
                    </div>
                    <span className="lp-strength-label" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>

                  <div className={`lp-error ${touched.password && errors.password ? "visible" : ""}`}>
                    <AlertCircle size={12} />
                    {errors.password}
                  </div>
                </div>

                {/* Forgot */}
                <div className="lp-forgot-row">
                  <button type="button" className="lp-forgot">Forgot Password?</button>
                </div>

                {/* Submit */}
                <button type="submit" className="lp-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="lp-dots">
                        <div className="lp-dot" />
                        <div className="lp-dot" />
                        <div className="lp-dot" />
                      </div>
                      Signing In…
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="lp-footer">
              <div className="lp-ssl">
                <ShieldCheck size={13} color="#22c55e" />
                256-bit SSL Secured Connection
              </div>
              <p className="lp-copy">
                © {new Date().getFullYear()} Colan Infotech Pvt. Ltd. All rights reserved.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}