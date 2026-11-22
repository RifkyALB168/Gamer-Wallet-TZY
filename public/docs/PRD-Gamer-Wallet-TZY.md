# PRD Gamer Wallet TZY — Tugas Besar II

Diperbarui 21 November 2026. Audit memakai `origin/main` commit `56ab1ba` setelah fetch dari GitHub.

## Keputusan tim

- Keenam anggota sudah menyetujui pembagian tugas di PRD ini.
- Tenggat pengumpulan akhir adalah **20 Desember 2026**.
- Styling frontend menggunakan **Tailwind CSS**, meneruskan stack frontend UTS.
- **Deployment production wajib selesai sebelum pengumpulan.** Frontend di Vercel, backend di Render, dan database di Neon PostgreSQL. Sertakan link frontend, API, dan Swagger serta bukti alur utama berjalan di production.

## Tujuan dan ruang lingkup

Gamer Wallet TZY membantu gamer PC Indonesia membandingkan harga dalam rupiah, menyimpan game yang diincar, merencanakan tabungan, dan menemukan giveaway aktif. Versi akhir mempertahankan frontend UTS (React, Vite, Tailwind, React Router) dan menambahkan backend REST, akun, penyimpanan PostgreSQL, serta bantuan LLM pada fitur yang relevan. Pengunjung tetap dapat membuka katalog, Detail Game, dan Game Gratis tanpa login. Login diperlukan untuk menyimpan data pribadi dan memakai bantuan LLM.

Versi akhir mencakup Home, Cari Game, Detail Game, Game Gratis, Wishlist, Budget Planner, Kontak/Tentang, dan 404, serta Register, Login, dan pengaturan profil. Pembelian tetap terjadi di toko melalui tautan resmi dari penyedia data. Pembayaran, notifikasi harga, dan integrasi akun toko berada di luar lingkup.

## Audit terhadap spesifikasi pengumpulan

Spesifikasi membagi nilai menjadi **20% kelompok** (Git, laporan, integrasi) dan **80% individu** (Git, backend, frontend, testing, keamanan, optimasi, deployment, dan integrasi LLM). Checklist individu mencantumkan REST, CRUD lewat Prisma, validasi DTO dan sanitasi, error handling, testing, serta implementasi fitur LLM. Checklist kelompok mencantumkan autentikasi dan otorisasi JWT, Swagger/OpenAPI, CORS dan variabel lingkungan, optimasi, deployment production, serta integrasi LLM.

| Aspek | Kondisi di repo saat audit | Yang diperlukan untuk pengumpulan |
| --- | --- | --- |
| Git kelompok dan individu | Riwayat commit dan pull request tersedia. Wishlist dan integrasi Detail Game sudah masuk lewat PR #8. | Lanjutkan PR per modul dan petakan commit/PR ke kontribusi individu di laporan. |
| Frontend UTS | Semua route utama dan 404 sudah terdaftar. Cari Game dan Detail Game memakai CheapShark. Game Gratis memakai GamerPower lewat proxy. Wishlist dan nominal tabungan memakai `localStorage`. Home masih memakai deal mock, daftar giveaway statis, dan kurs tetap. Budget Planner masih memakai game mock. Form Kontak mensimulasikan pengiriman. | Pertahankan tampilan. Hubungkan Home ke data aktual, Budget ke Wishlist akun, Kontak ke backend, dan fitur simpan ke API terautentikasi. |
| REST, backend, dan database | Ada proxy GamerPower di Vite dan fungsi serverless Vercel. Belum ada backend aplikasi, Prisma, migrasi, atau PostgreSQL. | Buat REST API NestJS, schema Prisma, migrasi Neon, serta satu resource CRUD milik masing-masing anggota. |
| Validasi, sanitasi, error | Ada validasi UI dan beberapa loading/error state. Belum ada DTO, validasi server, dan format error backend bersama. | Terapkan validasi DTO global, sanitasi sesuai field, dan penanganan HTTP error. Lengkapi loading, empty, error, dan retry pada alur baru. |
| Autentikasi, otorisasi, dan keamanan | Belum ada akun, JWT, atau pemeriksaan kepemilikan data. | Register/login JWT, guard, pemeriksaan kepemilikan di server, peran admin untuk tiket, hashing password, rate limit, dan CORS allowlist. |
| Testing dan hasil cek awal | Belum ada Jest/Vitest atau suite tes di repo. `npm run build` berhasil di checkout lokal. `npm run lint` melaporkan 6 masalah yang sudah ada di About, Footer, dan NotFound. | Tambah Jest untuk backend dan uji alur terintegrasi. Bersihkan lint yang ada sebelum pengumpulan. |
| Dokumentasi API dan laporan | `API-SPEC.md` kosong, README masih template Vite, dan `RUBRIK-Penilaian.md` berisi checklist QA frontend. | Sediakan Swagger/OpenAPI yang sesuai implementasi, README setup/deploy, serta laporan kelompok dan bukti individu yang merujuk spesifikasi final. |
| Optimasi | Pencarian sudah memakai debounce, kurs memiliki cache, dan proxy GamerPower memiliki header cache. | Ukur baseline dan hasil akhir. Tambahkan cache serta timeout untuk data publik, pagination dan indeks DB untuk daftar akun, dan optimasi frontend berdasarkan pengukuran. |
| Deployment | Proxy production Vercel ada di kode. URL production dan status deploy belum terverifikasi dalam audit repo ini. | Deploy frontend di Vercel, backend di Render, database di Neon, lalu verifikasi alur dari domain production. |
| LLM | Belum ada provider, endpoint, atau alur UI LLM. | Satu integrasi provider di backend dan satu fitur LLM yang dipakai dari UI untuk setiap anggota. |

## Kriteria penerimaan produk

| Area | Perilaku yang harus bisa didemokan |
| --- | --- |
| Akun dan Home | Pengguna dapat mendaftar, login, membuka profil, serta mengubah preferensi. Home menampilkan deal dan giveaway dari API. Kegagalan satu feed tidak mengosongkan bagian lain. Pengguna yang login dapat meminta ringkasan Home dari LLM. |
| Cari Game | Pencarian berdasarkan judul, filter harga dan toko, debounce, dan empty state tetap bekerja. Pengguna login bisa membuat, membuka, mengubah, dan menghapus preset pencarian. LLM dapat menerjemahkan kalimat pencarian ke filter yang bisa diperiksa sebelum diterapkan. |
| Detail Game dan Wishlist | Detail menampilkan harga normal/diskon antar toko dalam rupiah, diurutkan dari termurah, serta rekor harga terendah jika tersedia. Tambah/hapus Wishlist berfungsi dari Cari Game dan Detail Game. Halaman Wishlist menampilkan daftar milik akun, total perkiraan rupiah, dan edit catatan. User bisa meminta bantuan memilih prioritas dari daftar tersebut. Grafik bulanan hanya tampil jika datanya tersedia. |
| Game Gratis | Giveaway aktif dapat difilter berdasarkan platform dan tipe. Pengguna login dapat menyimpan giveaway dan memperbarui status bookmark atau menghapusnya. LLM menyusun shortlist dari giveaway aktif yang dikirim server. Atribusi GamerPower tetap ada. |
| Budget Planner | Total dihitung dari item Wishlist milik akun, dengan input nominal bulanan bilangan bulat positif. Estimasi adalah pembulatan ke atas dari total rupiah dibagi nominal bulanan. Wishlist kosong menghasilkan 0 bulan. Pengguna dapat menyimpan, membaca, mengubah, dan menghapus rencana. LLM menjelaskan hasil hitung aplikasi. |
| Kontak/Tentang | Info tim dan sumber data tetap publik. Form untuk pengguna login menyimpan tiket. Pemilik dapat melihat tiketnya dan mengubah atau menghapus tiket yang belum diproses. Admin dapat meninjau dan memperbarui status. LLM menyarankan draf dari kategori dan pilihan masalah, lalu pengguna dapat menyunting sebelum mengirim. |

Tampilan mendukung HP dan laptop, fokus keyboard terlihat, dan field tetap punya label serta pesan error. Harga rupiah diberi label perkiraan dan tanggal kurs bila tersedia. Data akun tetap ada saat pengguna keluar, masuk kembali, atau memakai perangkat lain. Untuk data UTS di `localStorage`, sediakan impor atas tindakan pengguna setelah login pada perangkat lama, dengan pencegahan duplikat Wishlist. Isi browser tidak langsung dikaitkan dengan akun yang baru masuk.

## Arsitektur dan kontrak bersama

- **Frontend:** pertahankan `src/` dan build Vite di root. Gunakan klien API bersama dengan `VITE_API_BASE_URL`, penanganan sesi, dan pesan error yang konsisten.
- **Backend:** gunakan Node.js, NestJS + TypeScript, Prisma + Neon PostgreSQL, JWT, dan Jest. Taruh backend di `server/` agar deploy frontend dan backend bisa dipisah di repo yang sama. Paparkan REST di `/api/v1` dan Swagger/OpenAPI di `/docs`. Sediakan endpoint health check yang tidak membuka detail internal.
- **Data publik:** backend menyediakan adapter CheapShark, GamerPower, dan Frankfurter. Pindahkan pemanggilan halaman secara bertahap ke backend. Gunakan timeout dan cache berbatas waktu untuk respons publik. Pertahankan logika fallback UI saat provider gagal dan dokumentasikan kapan proxy GamerPower lama bisa dilepas.
- **Data akun:** model utama `User`, `PlayerProfile`, `WishlistItem`, `SearchPreset`, `BudgetPlan`, `GiveawayBookmark`, dan `ContactTicket`. Setiap resource pribadi terkait `userId`. Gunakan constraint unik untuk profil per user, wishlist per game per user, dan bookmark per giveaway per user. Simpan harga snapshot Wishlist dalam USD; konversi saat tampil. Simpan nominal budget sebagai rupiah bulat.
- **REST:** gunakan `POST` untuk membuat (201), `GET` untuk membaca (200), `PATCH` untuk mengubah (200), dan `DELETE` untuk menghapus (204). Untuk kegagalan gunakan 400 input tidak valid, 401 sesi tidak valid, 403 akses admin ditolak, 404 resource tidak ditemukan atau bukan milik peminta, dan 409 untuk konflik seperti duplikasi. Gunakan 429 saat batas permintaan tercapai dan status 5xx yang sesuai untuk kegagalan upstream. Error memakai format bersama `{ code, message, details? }`.
- **Validasi dan otorisasi:** DTO memvalidasi tipe, batas panjang, angka, enum, dan query. Terapkan allowlist field, rapikan input teks, tolak properti asing, dan render konten sebagai teks. Hash password, tetapkan masa berlaku JWT, dan verifikasi JWT lewat guard untuk endpoint pribadi. Ambil identitas dari token, bukan body permintaan. Role admin hanya ditetapkan lewat prosedur backend. Gunakan query Prisma berbasis pemilik dan jangan log token, password, atau input kontak.
- **LLM:** mulai dengan Groq melalui satu service backend yang dipakai semua modul, dengan model yang dapat disetel lewat environment. Tiap fitur punya input dan format keluaran terdefinisi, tombol pemicu di UI, penanganan timeout/error, serta validasi keluaran. Batasi jumlah data dan permintaan per akun. Kirim hanya data yang diperlukan, tanpa email, password, token, catatan pribadi, atau isi tiket. Angka, harga, rekomendasi yang merujuk ID, dan tautan tetap bersumber dari data aplikasi. Aksi simpan, kirim, dan ubah data tetap memerlukan tindakan pengguna. CRUD tetap berfungsi saat provider LLM gagal.
- **Deployment:** Vercel untuk frontend dan rewrite SPA, Render Web Service untuk backend, Neon untuk PostgreSQL. Simpan `DATABASE_URL`, `JWT_SECRET`, dan `GROQ_API_KEY` di Render. Tambahkan `.env.example` tanpa nilai rahasia dan pastikan file `.env` nyata diabaikan Git. Batasi CORS ke origin frontend yang disetujui dan jalankan migrasi Prisma saat rilis sebelum aplikasi menerima traffic.

## Pembagian tugas untuk pengumpulan akhir

Setiap anggota memiliki satu alur CRUD lengkap yang digunakan dari frontend, satu fitur LLM yang bisa didemokan, dan tanggung jawab kelompok. Penugasan melanjutkan kepemilikan fitur saat UTS.

| Anggota | Backend dan CRUD Prisma | Frontend dan fitur LLM individu | Tanggung jawab kelompok dan bukti utama |
| --- | --- | --- | --- |
| **Rifky** | `WishlistItem` di `/wishlist-items`: tambah game, baca daftar/item, edit catatan, hapus. Validasi ID game, cegah duplikasi, dan batasi akses ke pemilik. | Migrasikan Wishlist dan tombol simpan di Detail/Cari Game. Buat bantuan prioritas pembelian dari harga yang tersedia, lewat `POST /wishlist-items/ai/priorities`. | Koordinasi dan review PR, susun demo integrasi, cek duplikasi dan akses lintas akun. |
| **Affan** | `SearchPreset` di `/search-presets`: simpan, baca, ubah, hapus preset filter milik akun. Rawat adapter CheapShark untuk pencarian, daftar toko, dan detail. | Hubungkan CRUD preset ke Cari Game. Buat filter dari kalimat pengguna lewat `POST /search-presets/ai/filters` dengan validasi rentang harga dan toko yang tersedia. | Ukur dampak debounce dan cache katalog terhadap jumlah request. Uji filter invalid serta kegagalan CheapShark. |
| **Raken** | `PlayerProfile` di `/profiles`: buat, baca, ubah, hapus profil game milik akun. Bangun kerangka NestJS, JWT, guard, dan konfigurasi CORS. | Buat Register, Login, pengaturan profil, dan Home dengan data API. Buat ringkasan deal/giveaway dari data Home lewat `POST /profiles/ai/home-summary`. | Deploy Render dan Vercel, atur environment serta rewrite SPA, dan dokumentasikan verifikasi login serta route production. |
| **Ibnu** | `BudgetPlan` di `/budget-plans`: buat, baca, ubah, hapus rencana milik akun. Hitung estimasi dari Wishlist dan kurs yang konsisten. | Sambungkan Budget Planner ke Wishlist akun dan rencana tersimpan. Buat penjelasan hasil simulasi lewat `POST /budget-plans/ai/explain` dari angka hitung server. | Siapkan Neon dan migrasi Prisma bersama Raken. Uji pembulatan, wishlist kosong, nominal invalid, dan ukur cache kurs. |
| **Fattan** | `GiveawayBookmark` di `/giveaway-bookmarks`: simpan, baca, ubah status (misalnya diincar/diklaim), hapus. Pindahkan akses GamerPower ke backend. | Hubungkan bookmark ke Game Gratis. Buat rekomendasi giveaway lewat `POST /giveaway-bookmarks/ai/picks`, hanya dari item yang masih aktif dan sesuai platform. | Siapkan service LLM bersama dan konfigurasi provider di Render bersama Raken. Uji kegagalan GamerPower/LLM, dan ukur cache feed. |
| **Rosa** | `ContactTicket` di `/contact-tickets`: buat dan baca tiket, ubah atau hapus tiket milik sendiri sebelum diproses. Tambah akses admin untuk tinjau dan ubah status. | Hubungkan Kontak ke tiket tersimpan dan tampilkan status. Buat asisten draf lewat `POST /contact-tickets/ai/draft` dari pilihan kategori dan masalah tanpa mengirim isi pesan pribadi. | Rawat Swagger/OpenAPI, README, dan laporan. Pimpin QA responsif dan aksesibilitas, perbaiki lint awal, serta uji status tiket dan batas akses admin. |

Path di tabel relatif terhadap `/api/v1`. Setiap pemilik modul mendokumentasikan endpoint-nya di Swagger dan menjalankan tes modulnya pada alamat production. Anggota yang memegang deployment bersama mencatat konfigurasi infrastrukturnya di README.

## Milestone dan dependensi

1. **Fondasi bersama.** Raken menyiapkan NestJS, registrasi/login, guard, format error, dan CORS. Ibnu dan Raken menyiapkan schema awal, Neon, dan migrasi. Fattan menyiapkan kontrak service LLM, Rosa menyiapkan struktur OpenAPI serta laporan, dan Rifky mengoordinasi kesepakatan kontrak sebelum modul bergantung satu sama lain.
2. **Fitur per anggota.** Tiap pemilik mengerjakan schema & migrasi, REST CRUD, validasi, otorisasi, UI, dan satu fitur LLM. Kerjakan tes dengan mock untuk provider eksternal. Review dan gabungkan migrasi secara berurutan untuk mengurangi konflik di schema bersama.
3. **Integrasi.** Rangkai Cari Game → Detail Game → Wishlist → Budget Planner. Uji alur kedua akun dengan data terpisah, muat ulang halaman, serta kegagalan provider. Jalankan build, lint, dan tes. Ukur optimasi sebelum dan sesudah dengan kondisi yang sama.
4. **Rilis dan pengumpulan paling lambat 20 Desember 2026.** Jalankan migrasi production, deploy Render dan Vercel, lalu verifikasi Swagger, health check, login, CRUD, dan LLM dari UI production. Lengkapi README dan laporan dengan hasil yang benar-benar diuji.

## Bukti yang harus dikumpulkan

**Kelompok (20%).** Link repo serta riwayat PR, laporan berisi pembagian kerja dan integrasi tiap modul, link frontend/backend/Swagger, bukti migrasi database dan alur production tanpa membocorkan kredensial, serta hasil build, lint, tes, dan pengukuran optimasi. Dalami QA UI dengan checklist `RUBRIK-Penilaian.md` yang sudah ada.

**Individu (80%).** Per anggota, cantumkan link commit/PR, penjelasan resource CRUD dan UI-nya, hasil tes Jest, contoh 400/401/403 atau 404 yang relevan, bukti satu optimasi yang terukur, dan screenshot/demo fitur LLM yang berjalan di production. Pengujian modul minimal mencakup CRUD berhasil, input salah, pengunjung tanpa sesi, akses lintas akun, serta keluaran LLM valid dan kegagalan provider dengan mock. Screenshot/API output yang dipakai sebagai bukti harus memakai akun dan data demo.

Pertahankan kebiasaan proyek memakai branch per fitur dan review anggota lain sebelum merge. Minimal tiga commit bermakna per anggota dan 15 commit total tetap menjadi target internal dari PRD lama. Konfirmasi format laporan resmi dan kanal pengumpulan saat panduan kelas tersedia.
