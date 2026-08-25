export default function SectionDivider() {
  return (
    <div className="relative bg-ink py-10">
      <div className="divider-ornament mx-auto max-w-7xl px-6">
        <svg width="26" height="26" viewBox="0 0 24 24" className="text-gold/70">
          <path
            d="M12 1l2.4 4.9L20 6l-3.5 4.2 1.2 5.6L12 13.8 6.3 15.8l1.2-5.6L4 6l5.6-.1z M12 5l-1.6 3.3-3.6.1 2.3 2.7-.8 3.6L12 17l1.7-1.2-.8-3.6 2.3-2.7-3.6-.1z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
