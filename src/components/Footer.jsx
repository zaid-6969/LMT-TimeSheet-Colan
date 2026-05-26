export default function Footer() {
  return (
    <footer
      className="
        w-full
        border-t
        border-slate-200
        bg-white
        px-6
        md:px-8
        py-2
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-3
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            © 2026
          </p>

          <span className="text-slate-300">
            |
          </span>

          <p
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            Colan Infotech
          </p>

          <span className="text-slate-300">
            |
          </span>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Employee Management Portal
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            items-center
            gap-5
          "
        >
          <button
            className="
              text-sm
              text-slate-500
              hover:text-blue-600
              transition-all
            "
          >
            Privacy Policy
          </button>

          <button
            className="
              text-sm
              text-slate-500
              hover:text-blue-600
              transition-all
            "
          >
            Terms
          </button>

          <button
            className="
              text-sm
              text-slate-500
              hover:text-blue-600
              transition-all
            "
          >
            Support
          </button>
        </div>
      </div>
    </footer>
  );
}