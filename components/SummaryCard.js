export default function SummaryCard({ label, value, icon, tone }) {
  return (
    <article className="summary-card">
      <div className={`summary-icon ${tone}`}>
        {icon}
      </div>

      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
    </article>
  );
}
