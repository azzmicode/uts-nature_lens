const form = document.getElementById("photoForm");
const journal = document.getElementById("journal");

function tampilkanJournal(data) {
    let imageElement = "";
    if (data.fotoDataUrl) {
        imageElement = `<img src="${data.fotoDataUrl}" alt="Preview Fotografi" class="journal-preview">`;
    }

    journal.innerHTML = `
        <h2>📖 Jurnal Fotografi</h2>
        
        <div class="journal-card">
            <p><strong>👤 Nama :</strong> ${data.nama}</p>
            <p><strong>📧 Email :</strong> ${data.email}</p>
            <p><strong>📷 Jenis Fotografi :</strong> ${data.jenis}</p>
            <p><strong>📅 Tanggal Foto :</strong> ${data.tanggal}</p>
            <p><strong>🖼️ Nama File :</strong> ${data.namaFile}</p>
            
            ${imageElement}
            
            <div class="journal-story">
                <strong>📝 Cerita Pengalaman:</strong><br><br>
                ${data.komentar}
            </div>
        </div>

        <br>
        <p style="color: #16a34a; font-weight: bold;">
            ✅ Cerita berhasil disimpan pada browser.
        </p>
        <br>

        <button class="btn-danger" id="hapusData">
            Hapus Cerita
        </button>
    `;

    const tombolHapus = document.getElementById("hapusData");
    tombolHapus.addEventListener("click", function () {
        localStorage.removeItem("photoData");
        form.reset();
        form.style.display = "flex";
        journal.innerHTML = `
            <h2>📖 Jurnal Fotografi</h2>
            <p class="empty">
                Belum ada cerita fotografi yang dibagikan,
                silahkan isi formulir diatas terlebih dulu.
            </p>
        `;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("foto");
    let namaFile = "-";
    let fotoDataUrl = "";

    const simpanDanTampilkan = () => {
        const data = {
            nama: document.getElementById("nama").value,
            email: document.getElementById("email").value,
            jenis: document.getElementById("jenis").value,
            tanggal: document.getElementById("tanggal").value,
            komentar: document.getElementById("komentar").value,
            izin: document.getElementById("izin").checked,
            namaFile: namaFile,
            fotoDataUrl: fotoDataUrl
        };

        localStorage.setItem("photoData", JSON.stringify(data));
        form.style.display = "none";
        tampilkanJournal(data);
    };

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        namaFile = file.name;

        const reader = new FileReader();
        reader.onload = function (event) {
            fotoDataUrl = event.target.result;
            simpanDanTampilkan();
        };
        reader.readAsDataURL(file);
    } else {
        simpanDanTampilkan();
    }
});

window.onload = function () {
    const data = localStorage.getItem("photoData");
    if (data) {
        form.style.display = "none";
        tampilkanJournal(JSON.parse(data));
    }
};