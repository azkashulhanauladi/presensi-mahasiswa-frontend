import { useState } from "react";

export default function ItemForm({ onAddItem }) {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [kelas, setKelas] = useState("");
  const [status, setStatus] = useState("Hadir");

  // State untuk kontrol Modal Konfirmasi Simpan
  const [showConfirm, setShowConfirm] = useState(false);

  // Memicu modal saat form disubmit
  const handleSubmitTrigger = (e) => {
    e.preventDefault();
    if (!nim || !nama) return;
    setShowConfirm(true);
  };

  // Eksekusi penambahan data setelah dikonfirmasi "Ya, Simpan"
  const handleConfirmSave = () => {
    onAddItem({
      id: Date.now(),
      nim,
      nama,
      prodi: prodi || "Rekayasa Perangkat Lunak",
      kelas: kelas || "SE-0801",
      status,
    });
    setNim("");
    setNama("");
    setProdi("");
    setKelas("");
    setShowConfirm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmitTrigger} className="item-form">
        <div className="form-header">
          <h3>Input Data Presensi</h3>
          <span>Isi formulir di bawah ini dengan benar</span>
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label>NIM</label>
            <input 
              type="text" 
              value={nim} 
              onChange={(e) => setNim(e.target.value)} 
              placeholder="Masukkan NIM..."
            />
          </div>

          <div className="form-group">
            <label>NAMA MAHASISWA</label>
            <input 
              type="text" 
              value={nama} 
              onChange={(e) => setNama(e.target.value)} 
              placeholder="Masukkan Nama Lengkap..."
            />
          </div>

          <div className="form-group">
            <label>PROGRAM STUDI</label>
            <input 
              type="text" 
              value={prodi} 
              onChange={(e) => setProdi(e.target.value)} 
              placeholder="Contoh: Rekayasa Perangkat Lunak"
            />
          </div>

          <div className="form-group">
            <label>KELAS</label>
            <input 
              type="text" 
              value={kelas} 
              onChange={(e) => setKelas(e.target.value)} 
              placeholder="Contoh: SE-0801"
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>STATUS KEHADIRAN</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpha">Alpha</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Simpan Data Presensi
        </button>
      </form>

      {/* Modal Pop-up Konfirmasi Simpan Data */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Konfirmasi Simpan</h3>
            <p>Apakah Anda yakin data presensi mahasiswa ini sudah benar dan ingin disimpan?</p>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-confirm-save" 
                onClick={handleConfirmSave}
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}