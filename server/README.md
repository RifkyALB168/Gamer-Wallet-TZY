# Gamer Wallet TZY API

## Menjalankan backend

1. Dari folder `server/`, jalankan `npm ci`.
2. Salin `.env.example` ke `.env`. Isi `DATABASE_URL` dengan URL database PostgreSQL pengembangan dan `JWT_SECRET` dengan secret acak minimal 32 byte.
3. Jalankan `npm run db:migrate`, lalu `npm run build` dan `npm start`.

API tersedia di `http://localhost:3000/api/v1` dengan port default. Gunakan database pengembangan yang kosong untuk migrasi pertama.

## Wishlist

Setiap request memakai `Authorization: Bearer <access-token>`. Layanan login tim bisa mengimpor `AuthModule` dan memakai `JwtService.signAsync({ sub: user.id })` untuk menerbitkan token. Konfigurasi bersama memakai HS256, issuer `gamer-wallet-tzy-api`, audience `gamer-wallet-tzy-web`, dan masa berlaku 15 menit. Guard memeriksa token, UUID akun pada `sub`, dan keberadaan akun pada setiap request.

| Method dan path | Body | Respons berhasil |
| --- | --- | --- |
| `POST /wishlist-items` | `{"gameId":"150036","note":"Tunggu diskon"}` (catatan opsional) | 201 dan item baru |
| `GET /wishlist-items` | | 200 dan daftar item |
| `GET /wishlist-items/:id` | | 200 dan satu item |
| `PATCH /wishlist-items/:id` | `{"note":"Prioritas"}` (`""` mengosongkan catatan) | 200 dan item setelah diubah |
| `DELETE /wishlist-items/:id` | | 204 |

`:id` adalah UUID item wishlist, sedangkan `gameId` adalah ID CheapShark dalam bentuk string. Server mengambil judul, sampul, dan harga termurah dalam USD dari CheapShark saat item dibuat. Catatan disimpan sebagai teks dengan panjang maksimal 500 karakter.

Request di luar kontrak menghasilkan 400. Token yang hilang, tidak valid, kedaluwarsa, atau mengacu ke akun yang sudah dihapus menghasilkan 401. Item yang tidak ada atau milik akun lain sama-sama menghasilkan 404. Query hanya memakai ID akun dari token. Respons daftar dan detail dikirim dengan `Cache-Control: private, no-store`.

Penambahan game yang sama dua kali pada satu akun menghasilkan 409. Saat CheapShark gagal, penambahan menghasilkan 502 dan item tidak tersimpan.

## Integrasi frontend

Jalankan backend di port 3000, lalu jalankan `npm run dev` dari root repo. Vite meneruskan `/api/v1` ke backend. Di production, atur `VITE_API_BASE_URL` ke URL API yang berakhiran `/api/v1` dan izinkan origin frontend pada konfigurasi CORS backend.

Setelah login berhasil, panggil `setAccessToken(accessToken)` dari `src/services/authSession.js`. Panggil `clearAccessToken()` saat logout. Frontend menyimpan access token di `sessionStorage` untuk tab tersebut, membuang daftar lama saat sesi berubah, dan kembali ke status belum login saat API mengembalikan 401.

Impor Wishlist lama dimulai dari tombol **Impor** pada halaman Wishlist setelah login. Hanya ID game CheapShark yang dikirim ke server. Daftar lama di browser tetap tersedia, dan server mencegah game yang sama masuk dua kali dalam satu akun.
