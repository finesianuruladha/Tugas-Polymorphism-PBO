// Kelas dasar Kapal (Tetap sama)
class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
        this.namaNahkoda = namaNahkoda;
        this.hariBerlayar = hariBerlayar;
        this.jamBerlayar = jamBerlayar;
    }
    
    infokapal() {
        return `Kapal ini bernama ${this.nama} yang berjenis ${this.jenis} 
        dengan kapasitas ${this.kapasitas} memiliki dimensi ${this.panjang} x ${this.lebar}.
        Nahkoda kapal: ${this.namaNahkoda}. Kapal berlayar pada hari ${this.hariBerlayar} pukul ${this.jamBerlayar}.`;
    }

    hitungLuas() {
        return this.panjang * this.lebar;
    }

    hitungKecepatan(jarak, waktu) {
        return (jarak / waktu).toFixed(2);
    }

    hitungBahanBakar(jarak) {
        const konsumsiPerKm = 0.5;
        return (jarak * konsumsiPerKm).toFixed(2);
    }
}

// Kelas 1: Kapal Cargo (Subclass dari Kapal)
class KapalCargo extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar, kapasitasKargo) {
        super(nama, "Cargo", kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar);
        this.kapasitasKargo = kapasitasKargo;
    }

    hitungBahanBakar(jarak) {
        const konsumsiPerKm = 1.2; // Bahan bakar lebih besar untuk kapal kargo
        return (jarak * konsumsiPerKm).toFixed(2);
    }

    infokapal() {
        return `${super.infokapal()} Kapasitas kargo: ${this.kapasitasKargo} ton.`;
    }
}

// Kelas 2: Kapal Pesiar (Subclass dari Kapal)
class KapalPesiar extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar, fasilitas) {
        super(nama, "Pesiar", kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar);
        this.fasilitas = fasilitas;
    }

    infokapal() {
        return `${super.infokapal()} Fasilitas yang tersedia: ${this.fasilitas.join(", ")}.`;
    }

    hitungBahanBakar(jarak) {
        const konsumsiPerKm = 0.8;
        return (jarak * konsumsiPerKm).toFixed(2);
    }
}

// Kelas 3: Kapal Penangkap Ikan (Subclass dari Kapal)
class KapalPenangkapIkan extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar, kapasitasIkan) {
        super(nama, "Penangkap Ikan", kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar);
        this.kapasitasIkan = kapasitasIkan;
    }

    infokapal() {
        return `${super.infokapal()} Kapasitas penyimpanan ikan: ${this.kapasitasIkan} ton.`;
    }

    hitungBahanBakar(jarak) {
        const konsumsiPerKm = 0.6; // Kapal penangkap ikan mengkonsumsi sedikit lebih banyak bahan bakar
        return (jarak * konsumsiPerKm).toFixed(2);
    }
}

// Definisi kelas InfoTiket harus ada sebelum kelas KapalPenumpangVIP
class InfoTiket extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, jumlahTiket, namaNahkoda, hariBerlayar, jamBerlayar) {
        super(nama, jenis, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar);
        this.jumlahTiket = jumlahTiket;
    }

    tiketTersedia(tiketYangDiminta) {
        return this.jumlahTiket >= tiketYangDiminta;
    }

    jualTiket(tiketYangDijual) {
        if (this.tiketTersedia(tiketYangDijual)) {
            this.jumlahTiket -= tiketYangDijual;
            return `Tiket terjual: ${tiketYangDijual}. Tiket tersisa: ${this.formatJumlahTiket(this.jumlahTiket)}.`;
        } else {
            return `Tiket tidak cukup tersedia! Tersisa: ${this.formatJumlahTiket(this.jumlahTiket)}.`;
        }
    }

    infoTiket() {
        return `${this.infokapal()} Jumlah Tiket Tersedia: ${this.formatJumlahTiket(this.jumlahTiket)}.`;
    }

    tambahTiket(jumlah) {
        this.jumlahTiket += jumlah;
        return `Jumlah tiket berhasil ditambah. Tiket sekarang: ${this.formatJumlahTiket(this.jumlahTiket)}.`;
    }

    formatJumlahTiket(jumlah) {
        return jumlah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Kelas 4: Kapal Penumpang VIP (Subclass dari InfoTiket) - SATU kali saja
class KapalPenumpangVIP extends InfoTiket {
    constructor(nama, kapasitas, panjang, lebar, jumlahTiket, namaNahkoda, hariBerlayar, jamBerlayar, layananVIP) {
        super(nama, "Penumpang VIP", kapasitas, panjang, lebar, jumlahTiket, namaNahkoda, hariBerlayar, jamBerlayar);
        this.layananVIP = layananVIP;
    }

    infokapal() {
        return `${super.infokapal()} Layanan VIP: ${this.layananVIP}.`;
    }

    hitungBahanBakar(jarak) {
        const konsumsiPerKm = 0.7;
        return (jarak * konsumsiPerKm).toFixed(2);
    }
}

// Kelas 5: Kapal Barang Ekspres (Subclass dari Kapal Cargo)
class KapalBarangEkspres extends KapalCargo {
    constructor(nama, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar, kapasitasKargo, kecepatanEkspres) {
        super(nama, kapasitas, panjang, lebar, namaNahkoda, hariBerlayar, jamBerlayar, kapasitasKargo);
        this.kecepatanEkspres = kecepatanEkspres;
    }

    hitungKecepatan(jarak, waktu) {
        const kecepatanTambahan = 5; // Kapal ekspres lebih cepat
        return (jarak / waktu + kecepatanTambahan).toFixed(2);
    }

    infokapal() {
        return `${super.infokapal()} Kecepatan tambahan ekspres: ${this.kecepatanEkspres} km/jam.`;
    }
}

// Contoh penggunaan polymorphism
let kapalList = [
    new KapalCargo("Kargo Nusantara", 3000, 150, 40, "Ali", "Senin", "08:00", 100),
    new KapalPesiar("Luxury Cruise", 500, 250, 70, "Rahmat", "Jumat", "10:00", ["Kolam Renang", "Restoran Mewah"]),
    new KapalPenangkapIkan("Nelayan Makmur", 200, 100, 25, "Ujang", "Rabu", "06:00", 50),
    new KapalPenumpangVIP("Royal Express", 200, 150, 50, 100, "Siti", "Sabtu", "14:00", "Lounge VIP, Makanan Gratis"),
    new KapalBarangEkspres("Ekspres Kargo", 1000, 120, 30, "Joko", "Minggu", "07:00", 200, 20)
];

kapalList.forEach(kapal => {
    console.log(kapal.infokapal());
    console.log(`Bahan bakar untuk 100 km: ${kapal.hitungBahanBakar(100)} liter`);
    console.log(`Kecepatan kapal: ${kapal.hitungKecepatan(100, 2)} km/jam`);
});
