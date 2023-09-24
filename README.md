
# WS_LABTIF
Web Service Laboratorium Teknik Informatika UNPAS merupakan sebuah layanan yang dibangun untuk membantu proses manajemen praktikum di Universitas Pasundan khususnya pada prodi Teknik Informatika. 

### :pushpin: Fitur
- **Pendaftaran**: Memungkinkan mahasiswa untuk mendaftar dan mengelola data pendaftaran mereka.
- **Penjadwalan**: Memungkinkan laboran untuk membuat jadwal piket asisten sesuai dengan jadwal praktikum yang ada.
- **Kehadiran**: Memungkinkan pencatatan kehadiran asisten pada setiap pertemuan praktikum dan pelaporan kehadiran.
- **Penilaian**: Memungkinkan pencatatan nilai praktikan yang berkaitan dengan tugas praktikum.

### :pushpin: Dibangun dengan
- Node.js
- Express.js
- MySQL
- Sequelize
- JWT

### :pushpin:Dokumentasi API :rocket:
https://documenter.getpostman.com/view/18343779/2s93z3gRGU

### :pushpin: Cloud Server :cloud:
***Akses Web Service***<br>
Web service hanya dapat digunakan oleh laboran dan mahasiswa Teknik Informatika Universitas Pasundan. Dapat diakses melalui tautan berikut: https://api-staging-labtif.cyclic.cloud

### :pushpin: Local Server :computer:

***Persiapan Awal***<br>
- Git: </br>
Pastikan Anda telah menginstal Git pada sistem Anda. Anda dapat mengunduhnya disini [link download](https://git-scm.com/downloads)
- Node.js dan npm:</br>
Pastikan Node.js dan npm (Node Package Manager) terinstal pada sistem Anda. Anda dapat mengunduhnya disini [link download](https://nodejs.org/en)
- XAMPP:</br>
Instal XAMPP atau tools serupa yang menyediakan server MySQL. Anda dapat mengunduhnya disini [link download](https://www.apachefriends.org/index.html)

***Instalasi***</br>
1. Clone repository
`git clone https://github.com/tsaniawarda2/WS_LABTIF.git`

2. Masuk ke direktori
`cd WS_LABTIF`

3. Instal dependensi
`npm i` atau `npm install`

4. Konfigurasi Database</br>
   Buat database dengan nama 'labtif'

6. Jalankan Migrasi:
Migrasi digunakan untuk membuat tabel dalam database Anda
`npx sequelize db:migrate`

***Menjalankan Web Service***<br>
Setelah Anda mengikuti langkah-langkah di atas, Anda siap untuk menjalankan proyek Anda dengan perintah berikut:
`npm run dev`
