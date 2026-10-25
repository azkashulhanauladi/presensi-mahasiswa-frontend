export default function Summary({ items }) {
  const total = items.length;
  const hadir = items.filter((item) => item.status === "Hadir").length;
  const izin = items.filter((item) => item.status === "Izin").length;
  const sakit = items.filter((item) => item.status === "Sakit").length;
  const alpha = items.filter((item) => item.status === "Alpha").length;

  const percentage = total > 0 ? ((hadir / total) * 100).toFixed(1) : 0;

  return (
    <div className="summary-wrapper">
      <div className="summary-grid">
        <div className="stat-card total">
          <span className="stat-title">Total Mahasiswa</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-card hadir">
          <span className="stat-title">Hadir</span>
          <span className="stat-value">{hadir}</span>
        </div>
        <div className="stat-card izin">
          <span className="stat-title">Izin</span>
          <span className="stat-value">{izin}</span>
        </div>
        <div className="stat-card sakit">
          <span className="stat-title">Sakit</span>
          <span className="stat-value">{sakit}</span>
        </div>
        <div className="stat-card alpha">
          <span className="stat-title">Alpha</span>
          <span className="stat-value">{alpha}</span>
        </div>
      </div>

      <div className="percentage-card">
        <div className="percentage-info">
          <span className="percentage-title">Tingkat Kehadiran Kelas</span>
          <span className="percentage-sub">Persentase mahasiswa berstatus Hadir</span>
        </div>
        <div className="percentage-value">{percentage}%</div>
      </div>
    </div>
  );
}