import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Summary from "./components/Summary";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("presensi_mahasiswa");
    if (savedItems) return JSON.parse(savedItems);
    return [
      { 
        id: 1, 
        nim: "103122400030", 
        nama: "Khosy AlBuchary",
        prodi: "Rekayasa Perangkat Lunak",
        kelas: "SE-0801",
        status: "Hadir"
      },
      { 
        id: 2, 
        nim: "10312240006", 
        nama: "Azka Shulhan A.",
        prodi: "Rekayasa Perangkat Lunak",
        kelas: "SE-0801",
        status: "Izin"
      },
    ];
  });

  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  
  // State untuk menyimpan ID data yang akan dihapus (untuk Modal Konfirmasi)
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("presensi_mahasiswa", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Memicu modal konfirmasi keluar
  const handleRequestDelete = (id) => {
    setDeleteId(id);
  };

  // Eksekusi penghapusan jika tombol "Yakin" diklik
  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // Batal hapus
  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus = filter === "Semua" || item.status === filter;
    const matchesSearch = 
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container">
      <Header />
      <Summary items={items} />
      <ItemForm onAddItem={handleAddItem} />

      <div className="control-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Cari Nama atau NIM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-container-box">
          <span className="filter-title">Filter Status:</span>
          <div className="filter-pills-group">
            {["Semua", "Hadir", "Izin", "Sakit", "Alpha"].map((status) => (
              <button
                key={status}
                type="button"
                className={`pill-btn ${filter === status ? "active" : ""}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ItemList items={filteredItems} onDeleteItem={handleRequestDelete} />

      {/* Modal Konfirmasi Hapus Data */}
      {deleteId !== null && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus data presensi ini?</p>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={handleCancelDelete}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-confirm-delete" 
                onClick={handleConfirmDelete}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}