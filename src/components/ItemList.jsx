import ItemCard from "./ItemCard";

export default function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada data presensi mahasiswa yang terdaftar.</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="list-header">
        <h3>Daftar Presensi Mahasiswa</h3>
        <span className="count-tag">{items.length} Data</span>
      </div>
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </div>
    </div>
  );
}