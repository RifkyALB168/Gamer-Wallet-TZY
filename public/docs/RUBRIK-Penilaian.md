# Pengecekan akhir: responsif dan aksesibilitas (Rosa)

Jalankan untuk SEMUA 7 halaman + 404 setelah semua fitur ter-merge.

## Responsif (DevTools device toolbar)
- [ ] 360px, 768px, 1024px, 1440px: tidak ada scroll horizontal
- [ ] Navbar tetap bisa dipakai di HP
- [ ] Kartu game, tabel harga, dan form tidak terpotong
- [ ] Teks terbaca tanpa zoom di HP

## Keyboard
- [ ] Tab melewati semua tautan, tombol, dan field sesuai urutan visual
- [ ] Fokus selalu terlihat
- [ ] Form bisa dikirim dengan Enter
- [ ] Tidak ada focus trap

## Aksesibilitas dasar
- [ ] Satu `<h1>` per halaman, urutan heading tidak loncat
- [ ] Landmark: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Setiap input punya `<label>`
- [ ] Pesan error form terbaca (role="alert") dan fokus pindah ke field error pertama
- [ ] Semua `<img>` punya `alt` (dekoratif: `alt=""`)
- [ ] Kontras teks cukup (cek dengan Lighthouse)
- [ ] Tautan eksternal memberi tahu "buka di tab baru"

## Lain-lain
- [ ] Console browser bersih di setiap halaman
- [ ] Skeleton, error state, dan tombol coba lagi tampil saat API dimatikan (DevTools > Network > Offline)
- [ ] Atribusi GamerPower muncul di footer semua halaman
- [ ] Skor Lighthouse Accessibility minimal 90
