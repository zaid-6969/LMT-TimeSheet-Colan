import { useState } from "react";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  ShieldCheck, CheckCircle2, AlertCircle, Image,
} from "lucide-react";
import logo from "../assets/colan-logo-main.png";
import { useNavigate } from "react-router-dom";
import mainimage from "../assets/main-image-1.jpg"

/* ─────────────────────────────────────────
   Styles
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f0f5fb;
  }

  /* ── LEFT PANEL (form) ── */
  .lp-left {
    flex: 0 0 46%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 52px;
    position: relative;
    z-index: 1;
    box-shadow: 2px 0 24px rgba(26,106,173,0.06);
  }

  .lp-form-wrap {
    width: 100%;
    max-width: 380px;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Brand */
  .lp-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 44px;
  }
  .lp-logo-img { height: 34px; object-fit: contain; }

  /* Heading */
  .lp-heading { margin-bottom: 32px; }
  .lp-heading h1 {
    font-size: 22px;
    font-weight: 700;
    color: #0d1f33;
    letter-spacing: -0.025em;
    margin-bottom: 6px;
  }
  .lp-heading p { font-size: 13.5px; color: #8a9db8; line-height: 1.65; }

  /* Field */
  .lp-field { margin-bottom: 18px; }

  .lp-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.055em;
    text-transform: uppercase;
    color: #64788c;
    margin-bottom: 7px;
  }

  .lp-input-wrap { position: relative; }

  .lp-input-icon {
    position: absolute;
    left: 13px;
    top: 50%; transform: translateY(-50%);
    pointer-events: none;
    display: flex; align-items: center;
  }

  .lp-input-eye {
    position: absolute;
    right: 12px;
    top: 50%; transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer;
    color: #a0b4c8;
    display: flex; align-items: center;
    padding: 2px;
    transition: color 0.15s;
  }
  .lp-input-eye:hover { color: #1a6aad; }

  .lp-input {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    border: 1.5px solid #e2e9f1;
    background: #f8fafd;
    padding: 0 40px;
    font-size: 13.5px;
    font-family: 'Inter', sans-serif;
    color: #0d1f33;
    outline: none;
    transition: all 0.18s;
  }
  .lp-input::placeholder { color: #b4c4d4; }
  .lp-input:focus {
    border-color: #1a6aad;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(26,106,173,0.1);
  }
  .lp-input.has-error {
    border-color: #e0334c;
    background: #fffafa;
    box-shadow: 0 0 0 3px rgba(224,51,76,0.08);
  }
  .lp-input.is-valid {
    border-color: #22c55e;
    background: #fafffc;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.07);
  }

  /* Validation status icon inside input */
  .lp-status-icon {
    position: absolute;
    right: 40px;
    top: 50%; transform: translateY(-50%);
    pointer-events: none;
  }
  .lp-status-icon.pw-only { right: 42px; }

  /* Error message */
  .lp-error {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: #e0334c;
    font-weight: 500;
    margin-top: 6px;
    overflow: hidden;
    max-height: 0; opacity: 0;
    transition: max-height 0.22s ease, opacity 0.22s ease;
  }
  .lp-error.visible { max-height: 24px; opacity: 1; }

  /* Strength bar */
  .lp-strength {
    margin-top: 7px;
    overflow: hidden;
    max-height: 0; opacity: 0;
    transition: max-height 0.25s ease, opacity 0.25s ease;
  }
  .lp-strength.visible { max-height: 36px; opacity: 1; }
  .lp-bar-bg {
    height: 3px;
    border-radius: 99px;
    background: #e8eef5;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .lp-bar { height: 100%; border-radius: 99px; transition: width 0.35s ease, background 0.35s ease; }
  .lp-bar-label { font-size: 11px; font-weight: 600; }

  /* Bottom row: remember + forgot */
  .lp-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    margin-top: -2px;
  }
  .lp-remember {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    color: #64788c;
    cursor: pointer;
    user-select: none;
  }
  .lp-remember input[type="checkbox"] {
    accent-color: #1a6aad;
    width: 14px; height: 14px;
    cursor: pointer;
  }
  .lp-forgot {
    font-size: 12px;
    font-weight: 600;
    color: #1a6aad;
    background: none; border: none;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s;
  }
  .lp-forgot:hover { color: #0d4a8a; text-decoration: underline; }

  /* Submit button */
  .lp-submit {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: none;
    background: #1a6aad;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: all 0.2s;
  }
  .lp-submit:hover:not(:disabled) {
    background: #155d9a;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(26,106,173,0.28);
  }
  .lp-submit:active:not(:disabled) { transform: translateY(0); }
  .lp-submit:disabled { opacity: 0.7; cursor: not-allowed; }

  /* Spinner dots */
  .lp-dots { display: flex; gap: 5px; align-items: center; }
  .lp-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    animation: dotBounce 0.85s ease-in-out infinite;
  }
  .lp-dot:nth-child(2) { animation-delay: 0.15s; }
  .lp-dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.65); opacity: 0.45; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* Footer */
  .lp-footer { margin-top: 28px; text-align: center; }
  .lp-ssl {
    display: flex; align-items: center; justify-content: center; gap: 5px;
    font-size: 12px; color: #a0b4c8; font-weight: 500;
    margin-bottom: 6px;
  }
  .lp-copy { font-size: 11px; color: #c0ccd8; }

  /* ── RIGHT PANEL (image placeholder) ── */
  .lp-right {
    flex: 1;
    background: #f0f5fb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle background grid */
  .lp-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(26,106,173,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,106,173,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
  }

  .lp-image-slot {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    aspect-ratio: 4/3;
    border-radius: 16px;
    border: 2px dashed #c8d8ea;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .lp-image-slot svg { color: #b0c4d8; }
  .lp-image-slot p { font-size: 13px; color: #94a8be; font-weight: 500; }

  /* Toast */
  .lp-toast {
    position: fixed;
    top: 20px; right: 20px;
    z-index: 9999;
    background: #fff;
    border-radius: 12px;
    padding: 12px 16px;
    display: flex; align-items: flex-start; gap: 10px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.1);
    border: 0.5px solid #eee;
    min-width: 280px; max-width: 320px;
    animation: toastIn 0.35s cubic-bezier(0.34,1.4,0.64,1) both;
  }
  .lp-toast.error { border-left: 3px solid #e0334c; }
  .lp-toast.success { border-left: 3px solid #22c55e; }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .lp-toast-title { font-size: 13px; font-weight: 600; color: #0d1f33; margin-bottom: 2px; }
  .lp-toast-msg   { font-size: 12px; color: #7a96b0; line-height: 1.5; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .lp-left { flex: 0 0 52%; padding: 40px 36px; }
  }

  @media (max-width: 768px) {
    .lp-root { flex-direction: column-reverse; }
    .lp-right { min-height: 200px; padding: 24px; }
    .lp-image-slot { aspect-ratio: 16/6; }
    .lp-left { flex: none; padding: 36px 24px 40px; }
  }

  @media (max-width: 400px) {
    .lp-left { padding: 28px 18px 36px; }
    .lp-heading h1 { font-size: 20px; }
  }
`;

/* ─────────────────────────────────────────
   Validation helpers
───────────────────────────────────────── */
function validateEmail(val) {
  if (!val.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return "Enter a valid email address.";
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
  if (score <= 2) return { pct: 40, label: "Weak",   color: "#f97316" };
  if (score === 3) return { pct: 65, label: "Fair",   color: "#eab308" };
  if (score === 4) return { pct: 82, label: "Good",   color: "#22c55e" };
  return              { pct: 100, label: "Strong", color: "#16a34a" };
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
  const [toast,   setToast]   = useState(null);

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

      {/* Toast */}
      {toast && (
        <div className={`lp-toast ${toast.type}`}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>
            {toast.type === "error"
              ? <AlertCircle size={16} color="#e0334c" />
              : <CheckCircle2 size={16} color="#22c55e" />}
          </div>
          <div>
            <p className="lp-toast-title">{toast.title}</p>
            <p className="lp-toast-msg">{toast.msg}</p>
          </div>
        </div>
      )}

      <div className="lp-root">

        {/* ════════ LEFT — FORM ════════ */}
        <div className="lp-left">
          <div className="lp-form-wrap">

            {/* Brand */}
            <div className="lp-brand">
              <img src={logo} alt="Colan Infotech" className="lp-logo-img" />
            </div>

            {/* Heading */}
            <div className="lp-heading">
              <h1>Welcome back </h1>
              <p>Sign in to your Colan Infotech workspace.</p>
            </div>

            <form onSubmit={onSubmit} noValidate>

              {/* Email */}
              <div className="lp-field">
                <label className="lp-label">Email address</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <Mail size={15} color={iconColor("email")} />
                  </span>
                  <input
                    className={inputClass("email")}
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={onChange("email")}
                    onFocus={onFocus("email")}
                    onBlur={onBlur("email")}
                    autoComplete="email"
                    style={{ paddingRight: touched.email && form.email ? "72px" : "40px" }}
                  />
                  {touched.email && form.email && (
                    <span className="lp-status-icon">
                      {errors.email
                        ? <AlertCircle size={14} color="#e0334c" />
                        : <CheckCircle2 size={14} color="#22c55e" />}
                    </span>
                  )}
                </div>
                <div className={`lp-error ${touched.email && errors.email ? "visible" : ""}`}>
                  <AlertCircle size={11} />
                  {errors.email}
                </div>
              </div>

              {/* Password */}
              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <Lock size={15} color={iconColor("password")} />
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
                    style={{ paddingRight: "76px" }}
                  />
                  {touched.password && form.password && (
                    <span className="lp-status-icon pw-only">
                      {errors.password
                        ? <AlertCircle size={14} color="#e0334c" />
                        : <CheckCircle2 size={14} color="#22c55e" />}
                    </span>
                  )}
                  <button
                    type="button"
                    className="lp-input-eye"
                    onClick={() => setShowPw(v => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {/* Strength bar */}
                <div className={`lp-strength ${form.password ? "visible" : ""}`}>
                  <div className="lp-bar-bg">
                    <div className="lp-bar" style={{ width: `${strength.pct}%`, background: strength.color }} />
                  </div>
                  <span className="lp-bar-label" style={{ color: strength.color }}>{strength.label}</span>
                </div>

                <div className={`lp-error ${touched.password && errors.password ? "visible" : ""}`}>
                  <AlertCircle size={11} />
                  {errors.password}
                </div>
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
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="lp-footer">
              <div className="lp-ssl">
                <ShieldCheck size={12} color="#22c55e" />
                256-bit SSL Secured Connection
              </div>
              <p className="lp-copy">© {new Date().getFullYear()} Colan Infotech Pvt. Ltd. All rights reserved.</p>
            </div>

          </div>
        </div>

        {/* ════════ RIGHT — IMAGE AREA ════════ */}
        <div className="lp-right">
          <img src={mainimage} alt="" />
        </div>

      </div>
    </>
  );
}