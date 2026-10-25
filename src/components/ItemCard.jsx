export default function ItemCard({ item, onDeleteItem }) {
  const statusClass = item.status.toLowerCase();

  return (
    <div className="item-card">
      <div className="item-details">
        <h4 className="student-name">{item.nama}</h4>
        <div className="student-meta">
          <span>NIM: {item.nim}</span>
          <span className="dot">•</span>
          <span>Prodi: {item.prodi}</span>
          <span className="dot">•</span>
          <span>Kelas: {item.kelas}</span>
        </div>
      </div>
      
      <div className="item-actions">
        <span className={`status-badge ${statusClass}`}>
          {item.status}
        </span>
        <button 
          type="button"
          className="btn-delete" 
          onClick={() => onDeleteItem(item.id)}
          title="Hapus Presensi"
        >
          ✕
        </button>
      </div>
    </div>
  );
}