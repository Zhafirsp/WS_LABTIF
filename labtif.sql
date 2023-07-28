-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Jul 2023 pada 10.44
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `labtif`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `asistens`
--

CREATE TABLE `asistens` (
  `asisten_id` varchar(11) NOT NULL,
  `nim` varchar(11) NOT NULL,
  `nama_asisten` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `golongan` enum('A','B','C') DEFAULT NULL,
  `periode` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `asistens`
--

INSERT INTO `asistens` (`asisten_id`, `nim`, `nama_asisten`, `email`, `no_hp`, `golongan`, `periode`, `created_at`, `updated_at`) VALUES
('AS22001', '0405088305', ' RYAN ADHITYA NUGRAHA ', 'ranugraha@telkomuniversity.ac.id', NULL, 'C', '2022', '2023-07-26 15:13:42', '2023-07-26 15:13:42'),
('AS22002', '0405096701', ' SALI ALAS MAJAPAHIT S.ST, M.Kom', 'sali@unpas.ac.id', NULL, 'C', '2022', '2023-07-26 16:43:53', '2023-07-26 16:43:53'),
('AS23002', '0404058001', ' AAN ALBONE ', NULL, NULL, 'C', '2023', '2023-07-26 16:32:21', '2023-07-26 16:32:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dosens`
--

CREATE TABLE `dosens` (
  `dosen_nip` varchar(11) NOT NULL,
  `nama_dosen` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jenis_pegawai` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `dosens`
--

INSERT INTO `dosens` (`dosen_nip`, `nama_dosen`, `email`, `jenis_pegawai`, `image_url`, `created_at`, `updated_at`) VALUES
('0402088504', ' FAJAR DARMAWAN, ST., M.KOM ', 'fajar.2885@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0404048901', ' ASEP SOMANTRI ST.,MT', 'somantri89@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0404058001', ' AAN ALBONE ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0405088305', ' RYAN ADHITYA NUGRAHA ', 'ranugraha@telkomuniversity.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0405096701', ' SALI ALAS MAJAPAHIT S.ST, M.Kom', 'sali@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0405106601', ' IR. ARIEF HENDRAWAN, MT. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0409047403', ' IMAM SAPUAN, S.SI. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0410028503', ' MUHAMMAD AL MAKKY, S.KOM., MT. ', 'malmakky@telkomuniversity.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0412106802', 'DR. IR LEONY LIDYA MT', 'leony.lidya@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0415028501', ' FERRY MULYANTO ST., M.KOM', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0418045401', ' IR. R. DJUNAEDY SAKAM, MT. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0418128701', ' MUHAMMAD TIRTA MULIA ST., MT.', 'mtirtamulia@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0421047801', ' MELLIA LIYANTHY ST., MT', 'liyanthy@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0421128501', ' DODDY FERDIANSYAH ST., MT', 'doddy@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0422086701', ' IR. IWAN KURNIAWAN, MT. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0423088302', ' ERIK ST.,M.Kom', 'erik.doank@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0424057201', 'DR AYI PURBASARI ST., MT', 'pbasari.ayi@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0424068803', ' IVAN NUGRAHA ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0425048801', ' SITA DEWI PRAHASTINI ', 'sitadewi@yahoo.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0425098502', ' R. SANDHIKA GALIH AMALGA. ST., MT', 'sandhikagalih@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0426048801', ' IRMA WIBIYANTI, S.KOM., MM. ', 'irma26wibiyanti@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0427017007', ' CACA EMILE SUPRIANA S.SI., MT.', 'caca.e.supriana@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0427067501', ' SANDRA ISLAMA PUTRA. S.Si., M.Kom', 'cimohay@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0427078402', ' RITA RIJAYANTI ST., MT.', 'sister.rita.rijayanti@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0427098402', ' HENDRA KOMARA S.T., M.T.', 'sister.hendra.komara@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0428018502', ' ANGGORO ARI NURCAHYO. ST.,M.KOM ', 'anggoro.an@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0428067006', ' SAMSUN HIDAYAT ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0429018502', ' ADE SUKENDAR ST.,MT', 'ade.sukendar@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0429068605', ' HANDOKO SUPENO ST., MT.', 'hanupas@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0430048803', ' WANDA GUSDYA PURNAMA ST., MT', 'wanda.gusdya@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0430109006', ' MIFTAHUL FADLI MUTTAQIN S.T.,M.T.', 'miftahulfadli@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0431087101', 'Dr RIRIN DWI AGUSTIN ST. MT', 'ririn_dwia@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('0431128702', ' Nana Sujana ST,. M.KOM', 'sukses.nana@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.101.21', 'IR. AGUS HEXAGRAHA ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.101.75', 'DR. IR LEONY LIDYA MT', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.101.76', ' IR. ARIEF HENDRAWAN, MT. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.103.30', ' AAN ALBONE,ST.,M.TI. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.103.31', ' SALI ALAS MAJAPAHIT, S.ST., M.KOM. S.ST, M.Kom', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.103.33', 'DR AYI PURBASARI ST., MT', 'pbasari.ayi@unpas.ac.id', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.90', ' IR. COMALUDDIN TARSIM, M.SI. ', 'comaluddin@yahoo.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.94', ' SHANTI HERLIANI ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.96', ' R. SANDHIKA GALIH AMALGA. ST., MT', 'sandhikagalih@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.97', ' ANGGORO ARI NURCAHYO. ST.,M.KOM ', 'anggoro.an@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.98', ' HENDRA KOMARA S.T., M.T.', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.104.99', ' RITA RIJAYANTI ST., MT.', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.00', ' ERIK ST.,M.Kom', 'erik.doank@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.27', ' IR. IWAN KURNIAWAN, MT. ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.51', ' FERRY MULYANTO ST., M.KOM', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.52', ' FAJAR DARMAWAN, ST., M.KOM ', 'fajar.2885@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.53', ' DODDY FERDIANSYAH ST., MT', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.105.54', ' ADE SUKENDAR ST.,MT', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.106.37', ' WANDA GUSDYA PURNAMA ST., MT', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.108.16', ' HANDOKO SUPENO ST., MT.', 'hanupas@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('151.108.73', ' ASEP SOMANTRI ST.,MT ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('9904009250', ' SHANTI HERLIANI ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('9904019435', ' IR. COMALUDDIN TARSIM, M.SI. ', 'comaluddin@yahoo.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('9990107353', ' R DJUNAEDY SAKAM ', NULL, 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF397', ' MOCH. ILHAM ANUGRAH, ST., M.ENG. ', 'surelna.ilham@gmail.com', 'Dosen', NULL, '2023-07-26 09:40:08', '2023-07-26 09:40:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `informasis`
--

CREATE TABLE `informasis` (
  `info_id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `dokumen` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `tanggal_publish` datetime NOT NULL,
  `is_publish` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwalpikets`
--

CREATE TABLE `jadwalpikets` (
  `piket_id` int(11) NOT NULL,
  `praktik_id` int(11) NOT NULL,
  `asisten_id` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwalpraktiks`
--

CREATE TABLE `jadwalpraktiks` (
  `praktik_id` int(11) NOT NULL,
  `periode` varchar(11) DEFAULT NULL,
  `pertemuan` int(11) DEFAULT NULL,
  `hari` varchar(255) DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `kode_mk` varchar(11) NOT NULL,
  `kelas_id` int(11) DEFAULT NULL,
  `dosen_nip` varchar(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kehadirans`
--

CREATE TABLE `kehadirans` (
  `absen_id` int(11) NOT NULL,
  `asisten_id` varchar(11) NOT NULL,
  `nama_asisten` varchar(255) NOT NULL,
  `piket_id` int(11) NOT NULL,
  `status` enum('Hadir','Izin','Alpha') NOT NULL,
  `pengganti_id` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `kelas_id` int(11) NOT NULL,
  `nama_kelas` varchar(255) DEFAULT NULL,
  `nama_ruang` varchar(255) DEFAULT NULL,
  `kapasitas` int(11) DEFAULT NULL,
  `kode_mk` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`kelas_id`, `nama_kelas`, `nama_ruang`, `kapasitas`, `kode_mk`, `created_at`, `updated_at`) VALUES
(358549, '01', ' - ', 40, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358568, '01', ' - ', 51, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358569, '02', ' - ', 44, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358570, '03', ' - ', 56, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358571, '01', ' - ', 51, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358572, '02', ' - ', 42, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358573, '03', ' - ', 57, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358574, '04', ' - ', 69, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358575, '01', ' - ', 65, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358576, '02', ' - ', 65, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358577, '03', ' - ', 71, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(358578, '04', ' - ', 74, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(430549, '12', ' - ', 100, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(430550, '12', ' - ', 100, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431090, '01', ' - ', 43, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431091, '01', ' - ', 40, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431098, '01', ' - ', 39, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431099, '01', ' - ', 38, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431100, '01', ' - ', 42, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431101, '01', ' - ', 38, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431120, '02', ' - ', 47, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431127, '02', ' - ', 36, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431128, '02', ' - ', 35, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431129, '02', ' - ', 37, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431130, '02', ' - ', 35, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431146, '03', ' - ', 47, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431153, '03', ' - ', 38, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431154, '03', ' - ', 41, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431155, '03', ' - ', 39, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431156, '03', ' - ', 36, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431169, '04', ' - ', 100, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431176, '04', ' - ', 100, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431177, '04', ' - ', 100, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431178, '04', ' - ', 100, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431179, '04', ' - ', 100, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431211, '11', ' - ', 25, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(431218, '11', ' - ', 25, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434445, NULL, ' - ', 40, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434446, NULL, ' - ', 40, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434447, NULL, ' - ', 40, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434795, '10', ' - ', 40, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434802, NULL, ' - ', 40, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434803, NULL, ' - ', 40, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434804, NULL, ' - ', 40, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434805, NULL, ' - ', 40, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(434806, NULL, ' - ', 40, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(436716, '01', ' - ', 45, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(436720, '01', ' - ', 45, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(436728, '01', ' - ', 45, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(437004, 'A', 'SB601 - Lab IF SB 601', 45, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(437005, 'A', 'SB601 - Lab IF SB 601', 45, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(437016, 'A', 'SB601 - Lab IF SB 601', 49, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(437017, 'A', 'SB602 - Lab IF SB 602', 45, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(437018, 'A', 'SB601 - Lab IF SB 601', 45, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451083, 'B', 'SB601 - Lab IF SB 601', 45, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451084, 'C', 'SB601 - Lab IF SB 601', 45, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451085, 'B', 'SB601 - Lab IF SB 601', 45, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451086, 'C', 'SB601 - Lab IF SB 601', 45, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451098, 'B', 'SB601 - Lab IF SB 601', 45, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451099, 'C', 'SB601 - Lab IF SB 601', 45, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(451100, 'B', 'SB602 - Lab IF SB 602', 45, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(462968, 'K', ' - ', 50, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(462971, 'K', ' - ', 50, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(462972, 'K', ' - ', 50, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(465453, 'L', ' - ', 50, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(465456, 'L', ' - ', 50, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469756, 'A', 'SB602 - Lab IF SB 602', 45, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469760, 'A', 'SB601 - Lab IF SB 601', 45, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469768, 'A', 'SB602 - Lab IF SB 602', 45, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469776, 'A', 'SB603 - Lab IF SB 603', 45, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469779, 'A', 'SB602 - Lab IF SB 602', 45, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(469782, 'A', 'SB601 - Lab IF SB 601', 45, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470862, 'B', 'SB602 - Lab IF SB 602', 45, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470863, 'C', 'SB602 - Lab IF SB 602', 45, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470864, 'D', 'SB602 - Lab IF SB 602', 45, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470866, 'B', 'SB601 - Lab IF SB 601', 45, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470867, 'C', 'SB601 - Lab IF SB 601', 45, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470868, 'D', 'SB601 - Lab IF SB 601', 45, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470890, 'B', 'SB602 - Lab IF SB 602', 45, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470891, 'C', 'SB602 - Lab IF SB 602', 45, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470893, 'B', 'SB602 - Lab IF SB 602', 45, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470894, 'C', 'SB602 - Lab IF SB 602', 45, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470895, 'D', 'SB602 - Lab IF SB 602', 45, 'IF21W0608', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470897, 'B', 'SB601 - Lab IF SB 601', 45, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470898, 'C', 'SB601 - Lab IF SB 601', 45, 'IF21W0609', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470900, 'B', 'SB603 - Lab IF SB 603', 45, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(470901, 'C', 'SB603 - Lab IF SB 603', 45, 'IF21W0610', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(471728, '1', ' - ', 20, 'IF21W0607', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(471977, 'L', ' - ', 30, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(472484, 'A', ' - ', 1000, 'IF21W0307', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(472486, 'A', ' - ', 1000, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(472490, 'A', ' - ', 1000, 'IF21W0506', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(472491, 'A', ' - ', 1000, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(472501, 'A', ' - ', 1000, 'IF21W0507', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(473155, 'P', ' - ', 50, 'IF21W0408', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(473559, 'A', ' - ', 200, 'IF21W0508', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(473574, 'A', ' - ', 200, 'IF21W0308', '2023-07-26 09:40:09', '2023-07-26 09:40:09'),
(473953, 'P', ' - ', 50, 'IF21W0407', '2023-07-26 09:40:09', '2023-07-26 09:40:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `krs`
--

CREATE TABLE `krs` (
  `krs_id` int(11) NOT NULL,
  `periode` varchar(11) DEFAULT NULL,
  `kode_mk` varchar(11) NOT NULL,
  `nama_kelas` varchar(255) DEFAULT NULL,
  `nim` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laborans`
--

CREATE TABLE `laborans` (
  `nip` varchar(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_laboran` varchar(255) NOT NULL,
  `jenis_pegawai` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `laborans`
--

INSERT INTO `laborans` (`nip`, `user_id`, `nama_laboran`, `jenis_pegawai`, `created_at`, `updated_at`) VALUES
('IF397', 58, 'Juju', 'Laboran', '2023-07-26 18:15:40', '2023-07-26 18:15:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswas`
--

CREATE TABLE `mahasiswas` (
  `nim` varchar(11) NOT NULL,
  `nama_mahasiswa` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mahasiswas`
--

INSERT INTO `mahasiswas` (`nim`, `nama_mahasiswa`, `email`, `user_id`, `created_at`, `updated_at`) VALUES
('0402088504', ' FAJAR DARMAWAN, ST., M.KOM ', 'fajar.2885@gmail.com', 1, '2023-07-26 09:40:07', '2023-07-26 09:40:19'),
('0404048901', ' ASEP SOMANTRI ST.,MT', 'somantri89@gmail.com', 2, '2023-07-26 09:40:07', '2023-07-26 09:40:20'),
('0404058001', ' AAN ALBONE ', NULL, 3, '2023-07-26 09:40:07', '2023-07-26 09:40:20'),
('0405088305', ' RYAN ADHITYA NUGRAHA ', 'ranugraha@telkomuniversity.ac.id', 4, '2023-07-26 09:40:07', '2023-07-26 09:40:20'),
('0405096701', ' SALI ALAS MAJAPAHIT S.ST, M.Kom', 'sali@unpas.ac.id', 5, '2023-07-26 09:40:07', '2023-07-26 09:40:21'),
('0405106601', ' IR. ARIEF HENDRAWAN, MT. ', NULL, 6, '2023-07-26 09:40:07', '2023-07-26 09:40:21'),
('0409047403', ' IMAM SAPUAN, S.SI. ', NULL, 7, '2023-07-26 09:40:07', '2023-07-26 09:40:22'),
('0410028503', ' MUHAMMAD AL MAKKY, S.KOM., MT. ', 'malmakky@telkomuniversity.ac.id', 8, '2023-07-26 09:40:07', '2023-07-26 09:40:22'),
('0412106802', 'DR. IR LEONY LIDYA MT', 'leony.lidya@unpas.ac.id', 9, '2023-07-26 09:40:07', '2023-07-26 09:40:22'),
('0415028501', ' FERRY MULYANTO ST., M.KOM', NULL, 10, '2023-07-26 09:40:07', '2023-07-26 09:40:23'),
('0418045401', ' IR. R. DJUNAEDY SAKAM, MT. ', NULL, 11, '2023-07-26 09:40:07', '2023-07-26 09:40:23'),
('0418128701', ' MUHAMMAD TIRTA MULIA ST., MT.', 'mtirtamulia@gmail.com', 12, '2023-07-26 09:40:07', '2023-07-26 09:40:23'),
('0421047801', ' MELLIA LIYANTHY ST., MT', 'liyanthy@unpas.ac.id', 13, '2023-07-26 09:40:07', '2023-07-26 09:40:24'),
('0421128501', ' DODDY FERDIANSYAH ST., MT', 'doddy@unpas.ac.id', 14, '2023-07-26 09:40:07', '2023-07-26 09:40:24'),
('0422086701', ' IR. IWAN KURNIAWAN, MT. ', NULL, 15, '2023-07-26 09:40:07', '2023-07-26 09:40:24'),
('0423088302', ' ERIK ST.,M.Kom', 'erik.doank@gmail.com', 16, '2023-07-26 09:40:07', '2023-07-26 09:40:25'),
('0424057201', 'DR AYI PURBASARI ST., MT', 'pbasari.ayi@unpas.ac.id', 17, '2023-07-26 09:40:07', '2023-07-26 09:40:25'),
('0424068803', ' IVAN NUGRAHA ', NULL, 18, '2023-07-26 09:40:07', '2023-07-26 09:40:26'),
('0425048801', ' SITA DEWI PRAHASTINI ', 'sitadewi@yahoo.com', 19, '2023-07-26 09:40:07', '2023-07-26 09:40:26'),
('0425098502', ' R. SANDHIKA GALIH AMALGA. ST., MT', 'sandhikagalih@gmail.com', 20, '2023-07-26 09:40:07', '2023-07-26 09:40:26'),
('0426048801', ' IRMA WIBIYANTI, S.KOM., MM. ', 'irma26wibiyanti@gmail.com', 21, '2023-07-26 09:40:07', '2023-07-26 09:40:27'),
('0427017007', ' CACA EMILE SUPRIANA S.SI., MT.', 'caca.e.supriana@unpas.ac.id', 22, '2023-07-26 09:40:07', '2023-07-26 09:40:27'),
('0427067501', ' SANDRA ISLAMA PUTRA. S.Si., M.Kom', 'cimohay@gmail.com', 23, '2023-07-26 09:40:07', '2023-07-26 09:40:27'),
('0427078402', ' RITA RIJAYANTI ST., MT.', 'sister.rita.rijayanti@unpas.ac.id', 24, '2023-07-26 09:40:07', '2023-07-26 09:40:28'),
('0427098402', ' HENDRA KOMARA S.T., M.T.', 'sister.hendra.komara@unpas.ac.id', 25, '2023-07-26 09:40:07', '2023-07-26 09:40:28'),
('0428018502', ' ANGGORO ARI NURCAHYO. ST.,M.KOM ', 'anggoro.an@gmail.com', 26, '2023-07-26 09:40:07', '2023-07-26 09:40:28'),
('0428067006', ' SAMSUN HIDAYAT ', NULL, 27, '2023-07-26 09:40:07', '2023-07-26 09:40:29'),
('0429018502', ' ADE SUKENDAR ST.,MT', 'ade.sukendar@unpas.ac.id', 28, '2023-07-26 09:40:07', '2023-07-26 09:40:29'),
('0429068605', ' HANDOKO SUPENO ST., MT.', 'hanupas@gmail.com', 29, '2023-07-26 09:40:07', '2023-07-26 09:40:29'),
('0430048803', ' WANDA GUSDYA PURNAMA ST., MT', 'wanda.gusdya@unpas.ac.id', 30, '2023-07-26 09:40:07', '2023-07-26 09:40:30'),
('0430109006', ' MIFTAHUL FADLI MUTTAQIN S.T.,M.T.', 'miftahulfadli@unpas.ac.id', 31, '2023-07-26 09:40:07', '2023-07-26 09:40:30'),
('0431087101', 'Dr RIRIN DWI AGUSTIN ST. MT', 'ririn_dwia@unpas.ac.id', 32, '2023-07-26 09:40:07', '2023-07-26 09:40:30'),
('0431128702', ' Nana Sujana ST,. M.KOM', 'sukses.nana@gmail.com', 33, '2023-07-26 09:40:07', '2023-07-26 09:40:31'),
('151.101.21', 'IR. AGUS HEXAGRAHA ', NULL, 34, '2023-07-26 09:40:07', '2023-07-26 09:40:31'),
('151.101.75', 'DR. IR LEONY LIDYA MT', NULL, 35, '2023-07-26 09:40:07', '2023-07-26 09:40:32'),
('151.101.76', ' IR. ARIEF HENDRAWAN, MT. ', NULL, 36, '2023-07-26 09:40:07', '2023-07-26 09:40:32'),
('151.103.30', ' AAN ALBONE,ST.,M.TI. ', NULL, 37, '2023-07-26 09:40:07', '2023-07-26 09:40:32'),
('151.103.31', ' SALI ALAS MAJAPAHIT, S.ST., M.KOM. S.ST, M.Kom', NULL, 38, '2023-07-26 09:40:07', '2023-07-26 09:40:33'),
('151.103.33', 'DR AYI PURBASARI ST., MT', 'pbasari.ayi@unpas.ac.id', 39, '2023-07-26 09:40:07', '2023-07-26 09:40:33'),
('151.104.90', ' IR. COMALUDDIN TARSIM, M.SI. ', 'comaluddin@yahoo.com', 40, '2023-07-26 09:40:07', '2023-07-26 09:40:33'),
('151.104.94', ' SHANTI HERLIANI ', NULL, 41, '2023-07-26 09:40:07', '2023-07-26 09:40:34'),
('151.104.96', ' R. SANDHIKA GALIH AMALGA. ST., MT', 'sandhikagalih@gmail.com', 42, '2023-07-26 09:40:07', '2023-07-26 09:40:34'),
('151.104.97', ' ANGGORO ARI NURCAHYO. ST.,M.KOM ', 'anggoro.an@gmail.com', 43, '2023-07-26 09:40:07', '2023-07-26 09:40:35'),
('151.104.98', ' HENDRA KOMARA S.T., M.T.', NULL, 44, '2023-07-26 09:40:07', '2023-07-26 09:40:35'),
('151.104.99', ' RITA RIJAYANTI ST., MT.', NULL, 45, '2023-07-26 09:40:07', '2023-07-26 09:40:35'),
('151.105.00', ' ERIK ST.,M.Kom', 'erik.doank@gmail.com', 46, '2023-07-26 09:40:07', '2023-07-26 09:40:36'),
('151.105.27', ' IR. IWAN KURNIAWAN, MT. ', NULL, 47, '2023-07-26 09:40:07', '2023-07-26 09:40:36'),
('151.105.51', ' FERRY MULYANTO ST., M.KOM', NULL, 48, '2023-07-26 09:40:07', '2023-07-26 09:40:36'),
('151.105.52', ' FAJAR DARMAWAN, ST., M.KOM ', 'fajar.2885@gmail.com', 49, '2023-07-26 09:40:07', '2023-07-26 09:40:37'),
('151.105.53', ' DODDY FERDIANSYAH ST., MT', NULL, 50, '2023-07-26 09:40:07', '2023-07-26 09:40:37'),
('151.105.54', ' ADE SUKENDAR ST.,MT', NULL, 51, '2023-07-26 09:40:07', '2023-07-26 09:40:37'),
('151.106.37', ' WANDA GUSDYA PURNAMA ST., MT', NULL, 52, '2023-07-26 09:40:07', '2023-07-26 09:40:38'),
('151.108.16', ' HANDOKO SUPENO ST., MT.', 'hanupas@gmail.com', 53, '2023-07-26 09:40:07', '2023-07-26 09:40:38'),
('151.108.73', ' ASEP SOMANTRI ST.,MT ', NULL, 54, '2023-07-26 09:40:07', '2023-07-26 09:40:38'),
('9904009250', ' SHANTI HERLIANI ', NULL, 55, '2023-07-26 09:40:07', '2023-07-26 09:40:39'),
('9904019435', ' IR. COMALUDDIN TARSIM, M.SI. ', 'comaluddin@yahoo.com', 56, '2023-07-26 09:40:07', '2023-07-26 09:40:39'),
('9990107353', ' R DJUNAEDY SAKAM ', NULL, 57, '2023-07-26 09:40:07', '2023-07-26 09:40:40'),
('IF397', ' MOCH. ILHAM ANUGRAH, ST., M.ENG. ', 'surelna.ilham@gmail.com', 58, '2023-07-26 09:40:07', '2023-07-26 09:40:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `matkuls`
--

CREATE TABLE `matkuls` (
  `kode_mk` varchar(11) NOT NULL,
  `nama_mk` varchar(255) NOT NULL,
  `kurikulum` varchar(255) NOT NULL,
  `sks_mk` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `matkuls`
--

INSERT INTO `matkuls` (`kode_mk`, `nama_mk`, `kurikulum`, `sks_mk`, `created_at`, `updated_at`) VALUES
('IF21W0307', 'Praktikum Basis Data', '221', 2, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0308', 'Praktikum Infrastruktur', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0407', 'Praktikum Multimedia', '221', 2, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0408', 'Praktikum Pemograman I', '221', 2, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0506', 'Praktikum Web', '221', 2, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0507', 'Praktikum Sistem Beorientasi Objek', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0508', 'Praktikum Pemograman II', '221', 2, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0607', 'Praktikum Pemograman Game', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0608', 'Praktikum Pemograman Mobile', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0609', 'Praktikum Manajemen Proyek', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08'),
('IF21W0610', 'Praktikum Internet of Things', '221', 1, '2023-07-26 09:40:08', '2023-07-26 09:40:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftarans`
--

CREATE TABLE `pendaftarans` (
  `daftar_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `tanggal_daftar` datetime NOT NULL,
  `nim` varchar(11) NOT NULL,
  `nama_mahasiswa` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `file_syarat` varchar(255) DEFAULT NULL,
  `status` enum('Diterima','Menunggu','Ditolak') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pendaftarans`
--

INSERT INTO `pendaftarans` (`daftar_id`, `program_id`, `tanggal_daftar`, `nim`, `nama_mahasiswa`, `email`, `no_hp`, `file_syarat`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, '2023-07-26 15:10:26', '0405088305', ' RYAN ADHITYA NUGRAHA ', 'ranugraha@telkomuniversity.ac.id', NULL, 'ada URL ceritanya', 'Diterima', '2023-07-26 15:10:26', '2023-07-26 15:12:07'),
(3, 1, '2023-07-26 15:15:41', '0405096701', ' SALI ALAS MAJAPAHIT S.ST, M.Kom', 'sali@unpas.ac.id', NULL, 'ada URL ceritanya', 'Diterima', '2023-07-26 15:15:41', '2023-07-26 15:16:12'),
(4, 2, '2023-07-26 15:18:45', '0404058001', ' AAN ALBONE ', NULL, NULL, 'ada URL ceritanya', 'Diterima', '2023-07-26 15:18:45', '2023-07-26 15:18:53'),
(5, 1, '2023-07-26 16:45:37', '0404048901', ' ASEP SOMANTRI ST.,MT', 'somantri89@gmail.com', NULL, 'ada URL ceritanya', 'Diterima', '2023-07-26 16:45:37', '2023-07-26 16:45:53'),
(6, 2, '2023-07-27 04:05:34', '0412106802', 'DR. IR LEONY LIDYA MT', 'leony.lidya@unpas.ac.id', NULL, 'ada URL ceritanya', 'Diterima', '2023-07-27 04:05:34', '2023-07-28 08:39:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penilaians`
--

CREATE TABLE `penilaians` (
  `nilai_id` int(11) NOT NULL,
  `krs_id` int(11) NOT NULL,
  `tugas_ke` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `programs`
--

CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL,
  `periode` varchar(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `batas_waktu` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `programs`
--

INSERT INTO `programs` (`program_id`, `periode`, `judul`, `deskripsi`, `batas_waktu`, `created_at`, `updated_at`) VALUES
(1, '2022', 'Pendaftaran periode 20221', 'Updload persyaratan dibawah ini', '2023-07-30 17:00:00', '2023-07-26 09:41:22', '2023-07-26 09:41:22'),
(2, '2023', 'Pendaftaran periode 20221', 'Updload persyaratan dibawah ini', '2023-07-30 17:00:00', '2023-07-26 15:15:14', '2023-07-26 15:15:14'),
(4, '2024', 'Pendaftaran periode 20241', 'Updload persyaratan dibawah ini', '2023-07-31 16:59:59', '2023-07-28 06:38:21', '2023-07-28 06:38:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230716204535-create-user.js'),
('20230716205634-create-mahasiswa.js'),
('20230716210247-create-laboran.js'),
('20230718062215-create-asisten.js'),
('20230718184840-create-dosen.js'),
('20230718185105-create-matkul.js'),
('20230718185656-create-kelas.js'),
('20230718190555-create-jadwal-praktik.js'),
('20230718191634-create-krs.js'),
('20230718193010-create-program.js'),
('20230718193411-create-pendaftaran.js'),
('20230718200015-create-jadwal-piket.js'),
('20230718200455-create-kehadiran.js'),
('20230718201639-create-penilaian.js'),
('20230718203650-add-fk-userID-in-Laboran.js'),
('20230718203713-add-fk-userID-in-Mahasiswa.js'),
('20230718204433-add-fk-NIM-in-Asisten.js'),
('20230718204509-add-fk-programID-in-Pendaftaran.js'),
('20230718204522-add-fk-NIM-in-Pendaftaran.js'),
('20230718222337-add-fk-kodeMK-in-Kelas.js'),
('20230718222348-add-fk-kodeMK-in-JadwalPraktik.js'),
('20230719053643-add-fk-dosenNIP-in-JadwalPraktik.js'),
('20230719054332-add-fk-kelasID-in-JadwalPraktik.js'),
('20230719090104-add-fk-praktikID-in-JadwalPiket.js'),
('20230719090316-add-fk-asistenID-in-JadwalPiket.js'),
('20230719091442-add-fk-asistenID-in-Kehadiran.js'),
('20230719091648-add-fk-piketID-in-Kehadiran.js'),
('20230719092552-add-fk-NIM-in-KRS.js'),
('20230719092842-add-fk-kodeMK-in-KRS.js'),
('20230719094329-add-fk-krsID-in-Penilaian.js'),
('20230728073544-create-informasi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `role` enum('Laboran','Asisten','Mahasiswa') NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `no_hp`, `image_url`, `role`, `access_token`, `created_at`, `updated_at`) VALUES
(1, '0402088504', '$2b$10$6SUsKUdDu5I8lpVVL/G9xuLxLwXSjCdjxxCUSfANouGa4woL.IgRS', 'fajar.2885@gmail.com', NULL, NULL, 'Mahasiswa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjA0MDIwODg1MDQiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwNDMwNTI0LCJleHAiOjE2OTA1MTY5MjR9.tH1E-MKV2oixvxt-kH5c1Fgou3xejZh-7mlL2ce89mM', '2023-07-26 09:40:19', '2023-07-27 04:02:04'),
(2, '0404048901', '$2b$10$tSHdAAZUKlfm20/8MfriqObmzc8DEcdYscLrFYhsfgO0RUTeUlkOW', 'somantri89@gmail.com', NULL, NULL, 'Asisten', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6IjA0MDQwNDg5MDEiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwNDMwNjEyLCJleHAiOjE2OTA1MTcwMTJ9.AzIvZ1Quc90zK1zPl2bvIpk8o37TIiRXCgytvUefCVc', '2023-07-26 09:40:19', '2023-07-27 04:03:32'),
(3, '0404058001', '$2b$10$0GnJnjrMP/jiPrcBzu9Mt.mFFCvcxGJkdgRqXjwqJmUnAAS1Q/KcO', NULL, NULL, NULL, 'Asisten', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6IjA0MDQwNTgwMDEiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwMzg0NzExLCJleHAiOjE2OTA0NzExMTF9.nnDse9oinlO1KZrpaqIn1E6z5-W4IHnVBMgoQCAvq3s', '2023-07-26 09:40:20', '2023-07-26 15:18:53'),
(4, '0405088305', '$2b$10$QFeQb72IccQHj6VOFUGJPODW6FeYhgn3bytx/xBCvGxc8ih02bpAe', 'ranugraha@telkomuniversity.ac.id', NULL, NULL, 'Asisten', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6IjA0MDUwODgzMDUiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwMzg0MjE0LCJleHAiOjE2OTA0NzA2MTR9.0NXTrKmrgTM-7-l_lK8t7X7fb8i9stCXf5DPOJDrcDE', '2023-07-26 09:40:20', '2023-07-26 15:12:07'),
(5, '0405096701', '$2b$10$8H1sHKo6lZdYGvfxXfQKbeqPWY22EExLZv1lTAdv6iVOEm8nso6h.', 'sali@unpas.ac.id', NULL, NULL, 'Asisten', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6IjA0MDUwOTY3MDEiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwMzg0NDk3LCJleHAiOjE2OTA0NzA4OTd9.ma5DbLXy5NtTmDAVPcqNrZLtq27UwcNYqg7rDrEbD7s', '2023-07-26 09:40:20', '2023-07-26 15:16:12'),
(6, '0405106601', '$2b$10$0398Q9L1oOCxB/cHHPa5EO5z.ltsbo54lRQ3Xea8XymsWfxaYU6FG', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:21', '2023-07-26 09:40:21'),
(7, '0409047403', '$2b$10$8Dh9RGclRWLlIEgDLeus0epIQw6lFA/ArRhMGBG4qiGIODLRVacSC', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:21', '2023-07-26 09:40:21'),
(8, '0410028503', '$2b$10$1ga6JFM5stJTeAB/7DQCjedEIWnDoUHI3wAIPQK7KCq9erB1W/II.', 'malmakky@telkomuniversity.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:22', '2023-07-26 09:40:22'),
(9, '0412106802', '$2b$10$XE2BRtpJCWOnwhNN3C/IHeAZYaLL0q2mTiY4QtzKgzqINcA18PZS6', 'leony.lidya@unpas.ac.id', NULL, NULL, 'Asisten', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6IjA0MTIxMDY4MDIiLCJyb2xlIjoiTWFoYXNpc3dhIiwiaWF0IjoxNjkwNTI3NDk2LCJleHAiOjE2OTA2MTM4OTZ9.ynAE0CygPOr6H-_KW8T1UuNgCJjlapSp28UJjVqfEOA', '2023-07-26 09:40:22', '2023-07-28 08:39:09'),
(10, '0415028501', '$2b$10$dvCmXMND8W94LF.UQ6JN2uKA0wHu0ad9V0jOQaXCrjiz1wRkazcOK', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:22', '2023-07-26 09:40:22'),
(11, '0418045401', '$2b$10$hgnuMhNfGGEnovgrm6J.u.KEJSdlbRGRYPfjWXQgeKBKKYQjWreIa', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:23', '2023-07-26 09:40:23'),
(12, '0418128701', '$2b$10$fGm25q7XgWM2rXTfW6QtG.oPeyJxa2MOZE0TTVOPpmcby7PIbrJpO', 'mtirtamulia@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:23', '2023-07-26 09:40:23'),
(13, '0421047801', '$2b$10$Bb4b/5UBrgSqQ4u5jNBZUuCfmLJXi.ZP/6vt1IJD8Jn6fad/4hcsG', 'liyanthy@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:23', '2023-07-26 09:40:23'),
(14, '0421128501', '$2b$10$weZQDywj.GfdY8sbS9e7Ve2YqCrqd1eMxigX0wfUIHx2eMVS4DaJW', 'doddy@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:24', '2023-07-26 09:40:24'),
(15, '0422086701', '$2b$10$S2uUrbIEqZ3ioFR5bMKN8eCxshwALqFEvX.X9KtDx1paN0C6eqSK2', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:24', '2023-07-26 09:40:24'),
(16, '0423088302', '$2b$10$SCdaj4RWXRiUM8cnVfUmzurGmQhRrWZylmKl11KQFjhfRHxXEPJmS', 'erik.doank@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:24', '2023-07-26 09:40:24'),
(17, '0424057201', '$2b$10$4E.Ae2lJ2.x27eoAgYUTKu3Up2ip4reF4EQc98vNG5xSpR.udeQ6K', 'pbasari.ayi@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:25', '2023-07-26 09:40:25'),
(18, '0424068803', '$2b$10$rjXnkiZrSWR0qn4H1WaKa.X5.e4eM0x0USoz2FiWfItEDCwX2SSP6', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:25', '2023-07-26 09:40:25'),
(19, '0425048801', '$2b$10$EIe7Xd/sawxdOsWjA4LqseNi7v3gDCYUks3s7vJS/IB0F10TrIRZq', 'sitadewi@yahoo.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:26', '2023-07-26 09:40:26'),
(20, '0425098502', '$2b$10$n9VkWvQTBN6tvbF9.zd5LORAnFSkSvHt/CZxxKNtj/F37l4E/56.W', 'sandhikagalih@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:26', '2023-07-26 09:40:26'),
(21, '0426048801', '$2b$10$rOY9y0FyNuYBGOE2WGqbRuGZd3CaoAp8FUQrLrKHS/DCO2FfPAl3i', 'irma26wibiyanti@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:26', '2023-07-26 09:40:26'),
(22, '0427017007', '$2b$10$dg9EcZ9YS1DjJTqu5AK0o.bLYYg18hTgZgPhVNf2RfzkFwFhpONTW', 'caca.e.supriana@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:27', '2023-07-26 09:40:27'),
(23, '0427067501', '$2b$10$9EnDRl1fZT3W1gZA38CUkeVRBrFxc5xOeEAIvkEF4RB3Y95PWKMUa', 'cimohay@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:27', '2023-07-26 09:40:27'),
(24, '0427078402', '$2b$10$3xthhEUiisysblHJwhkKLeYsSVAkESzrscdMtxGayWAMnS4gprau6', 'sister.rita.rijayanti@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:27', '2023-07-26 09:40:27'),
(25, '0427098402', '$2b$10$pz7rPtjqkaLTl3vGbFxtgePMvd3U16wk7QSh6G8WnGuVFF80ax1Tu', 'sister.hendra.komara@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:28', '2023-07-26 09:40:28'),
(26, '0428018502', '$2b$10$k8eYyE/6LqzBWfzYXsjsF.DBrpPyk3E6ySW/XyuhjSZGrWbUWveLa', 'anggoro.an@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:28', '2023-07-26 09:40:28'),
(27, '0428067006', '$2b$10$YOuyQiv6DnVHCkP3cZ1zs.SLnnIMrec3/OShBHjJsK58mTzEcmbge', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:28', '2023-07-26 09:40:28'),
(28, '0429018502', '$2b$10$jpKXiW6naRj5Aagvh7kdjeRUeCwtj15zOzy.fH.XlwlTrGMsr4DRa', 'ade.sukendar@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:29', '2023-07-26 09:40:29'),
(29, '0429068605', '$2b$10$dKeuMLNsTsYxBPBg2.CvIOkC1rsuxY1dyavcTGGd7Jg58nuI8vZGm', 'hanupas@gmail.com', NULL, NULL, 'Mahasiswa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOSwidXNlcm5hbWUiOiIwNDI5MDY4NjA1Iiwicm9sZSI6Ik1haGFzaXN3YSIsImlhdCI6MTY5MDM5NTY1NSwiZXhwIjoxNjkwNDgyMDU1fQ.3gpw2NVTYt2kuEVn0ovXaSMmkuuSfrjB48Ga69tE9OI', '2023-07-26 09:40:29', '2023-07-26 18:20:55'),
(30, '0430048803', '$2b$10$J6rzrPaRMJ1AJMN/JXpVGewwVzl8xEbL8wSXIL86S116lUi7VTdGC', 'wanda.gusdya@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:29', '2023-07-26 09:40:29'),
(31, '0430109006', '$2b$10$KkTXG84MpLtOf0SDUefIUeQo.LJ1kq34jPsE3qe3C68ZxtesYi3TO', 'miftahulfadli@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:30', '2023-07-26 09:40:30'),
(32, '0431087101', '$2b$10$fo4iNFmvBMWn4rj0OEMa.OSmDBhidYWXDyhx6jbUQgXxhKdzTDRIe', 'ririn_dwia@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:30', '2023-07-26 09:40:30'),
(33, '0431128702', '$2b$10$C8NI96b5R49iPklmXlRwmes5vg1z0vPR77ooELwqL9WevsEmAYqV2', 'sukses.nana@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:30', '2023-07-26 09:40:30'),
(34, '151.101.21', '$2b$10$KJ0hneNgLv6ws.4zE2EZs.uDcvjjEv.aGt1DDgSoGmVmEniU4.w2i', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:31', '2023-07-26 09:40:31'),
(35, '151.101.75', '$2b$10$1jaiTAKlb9rBoQQgaUVR2eVZfsORgVonswAE.3YPfpFuY.tBbb9Iy', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:31', '2023-07-26 09:40:31'),
(36, '151.101.76', '$2b$10$xWpDDWPiHwhVR7BUPwKjCOY/L2CdHvCuToCnngyFs99palKFvZ89q', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:32', '2023-07-26 09:40:32'),
(37, '151.103.30', '$2b$10$9GtDxmYcxgiY8PgkLS7Z1e252.hCwGW0CAlh3COH5vDl121sEPG3.', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:32', '2023-07-26 09:40:32'),
(38, '151.103.31', '$2b$10$.wa4A0vAg7owdyjARwNcbuiTsidQKjGvka0jb7F.EAe6ikImOiOe2', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:32', '2023-07-26 09:40:32'),
(39, '151.103.33', '$2b$10$TALFv6U6vZSdv4JvwFLG7uuNNPvMt6xLNuDeJD937.N8fgefpKpBa', 'pbasari.ayi@unpas.ac.id', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:33', '2023-07-26 09:40:33'),
(40, '151.104.90', '$2b$10$Hchqha8F3hmYoi8dtvVTVOEWsldW0ea2laa78ttUEamoNRNfIeniS', 'comaluddin@yahoo.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:33', '2023-07-26 09:40:33'),
(41, '151.104.94', '$2b$10$w6ZD5ggrrdyuPO07bjjVxuS3xrZYXvonzmuJfWor8fSw3EKJPlHr6', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:33', '2023-07-26 09:40:33'),
(42, '151.104.96', '$2b$10$vb3huOOMe/MZRkCgteg3.O5Vtz795cYMymEgHpkYkj.r8vbuIynQC', 'sandhikagalih@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:34', '2023-07-26 09:40:34'),
(43, '151.104.97', '$2b$10$0Nh3HGBo140nxGyM1TicUegIpPT56bK2FAzx8Zg1ERs8UiQtNNZBS', 'anggoro.an@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:34', '2023-07-26 09:40:34'),
(44, '151.104.98', '$2b$10$Ni4SqicMgFDtXZ0dY/8CceP.J3fKkTP4knwqHqOkmlA/bTllf.iC6', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:35', '2023-07-26 09:40:35'),
(45, '151.104.99', '$2b$10$SWRUKTH7Xf//x2KpWXkjFODGmAhT4qkT8ZliIfXY35JTNozaJcCce', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:35', '2023-07-26 09:40:35'),
(46, '151.105.00', '$2b$10$CU6u0.BbyxHwBY7KgkM7VeQGguHw5UZCmgXLpBx28HHA7dQVBpjou', 'erik.doank@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:35', '2023-07-26 09:40:35'),
(47, '151.105.27', '$2b$10$lTjxRCkm.VS7N.eiQczG9uQzI98LYXOJJYPqO853QJaPOhmVjShOe', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:36', '2023-07-26 09:40:36'),
(48, '151.105.51', '$2b$10$ctJmXtGSa4t8GXYRctdpMeTspVXI6.hpMSUrAT9FlMRT1gc.m3FfW', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:36', '2023-07-26 09:40:36'),
(49, '151.105.52', '$2b$10$9IlTiibO.BRE6RBMu4rQP.tx2qcq8CCZeyqhG4NNW/Hl8DjpzLqDm', 'fajar.2885@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:36', '2023-07-26 09:40:36'),
(50, '151.105.53', '$2b$10$V84qO6yfMNt6odk0XGv0SO0XahAZ3LS7jLeTiEpp/JIMsGVvrVR46', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:37', '2023-07-26 09:40:37'),
(51, '151.105.54', '$2b$10$ibeEYCtZtv4NV/FfX.G2LeaSUPdIEULotTcYkoXSmz5Gw1L0r1WIC', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:37', '2023-07-26 09:40:37'),
(52, '151.106.37', '$2b$10$ogbqOsBep7lE0X1lNi8jdeAO/hHuxzbO1AGn0T2Vb/AYxF3hOb3yC', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:37', '2023-07-26 09:40:37'),
(53, '151.108.16', '$2b$10$YIwEg1hJxi/ppQvkPvTAHunc0a/YOQpl/CjJbZVLCdT2kZAbffIoq', 'hanupas@gmail.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:38', '2023-07-26 09:40:38'),
(54, '151.108.73', '$2b$10$UILw45maa.Kqar/k87iYO.g/Uva8TKARmHPfgXXi8KYJhpe5qlWGi', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:38', '2023-07-26 09:40:38'),
(55, '9904009250', '$2b$10$vd1PlVF4Z7N07GhFRPt7nOdTuMqBDxBm.Y0Nz93hUlnA0f0rNepbO', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:38', '2023-07-26 09:40:38'),
(56, '9904019435', '$2b$10$GssWUDd5Gs7zPFa1wWwMkuf33mCSZGnXXpz4HG5iIH2n0KZhdFU76', 'comaluddin@yahoo.com', NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:39', '2023-07-26 09:40:39'),
(57, '9990107353', '$2b$10$zZ26A5ZziHFFSLTIzLafq.6RzRAdwTDpJO9lyZ.8CAzY3XZdZZx.u', NULL, NULL, NULL, 'Mahasiswa', NULL, '2023-07-26 09:40:39', '2023-07-26 09:40:39'),
(58, 'IF397', '$2b$10$JED0FC9./sMFndKRr4PV3OuaxZ9F.8dc9M6Dv/FejFjk6R1t597Hu', 'surelna.ilham@gmail.com', NULL, NULL, 'Laboran', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1OCwidXNlcm5hbWUiOiJJRjM5NyIsInJvbGUiOiJMYWJvcmFuIiwiaWF0IjoxNjkwNTMwODc5LCJleHAiOjE2OTA2MTcyNzl9.NFNVatn4RRnr7D5_MijUGd5IDc-8GBG-2jff3qY8Foc', '2023-07-26 09:40:40', '2023-07-28 07:54:39');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `asistens`
--
ALTER TABLE `asistens`
  ADD PRIMARY KEY (`asisten_id`),
  ADD UNIQUE KEY `asisten_id` (`asisten_id`),
  ADD KEY `fk-NIM-in-Asisten` (`nim`);

--
-- Indeks untuk tabel `dosens`
--
ALTER TABLE `dosens`
  ADD PRIMARY KEY (`dosen_nip`);

--
-- Indeks untuk tabel `informasis`
--
ALTER TABLE `informasis`
  ADD PRIMARY KEY (`info_id`);

--
-- Indeks untuk tabel `jadwalpikets`
--
ALTER TABLE `jadwalpikets`
  ADD PRIMARY KEY (`piket_id`),
  ADD KEY `fk-praktikID-in-JadwalPiket` (`praktik_id`),
  ADD KEY `fk-asistenID-in-JadwalPiket` (`asisten_id`);

--
-- Indeks untuk tabel `jadwalpraktiks`
--
ALTER TABLE `jadwalpraktiks`
  ADD PRIMARY KEY (`praktik_id`),
  ADD KEY `fk_kodeMK_in_JadwalPraktik` (`kode_mk`),
  ADD KEY `fk-dosenNIP-in-JadwalPraktik` (`dosen_nip`),
  ADD KEY `fk-kelasID-in-JadwalPraktik` (`kelas_id`);

--
-- Indeks untuk tabel `kehadirans`
--
ALTER TABLE `kehadirans`
  ADD PRIMARY KEY (`absen_id`),
  ADD KEY `fk-asistenID-in-Kehadiran` (`asisten_id`),
  ADD KEY `fk-piketID-in-Kehadiran` (`piket_id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`kelas_id`),
  ADD UNIQUE KEY `kelas_id` (`kelas_id`),
  ADD KEY `fk_kodeMK_in_Kelas` (`kode_mk`);

--
-- Indeks untuk tabel `krs`
--
ALTER TABLE `krs`
  ADD PRIMARY KEY (`krs_id`),
  ADD KEY `fk-NIM-in-KRS` (`nim`),
  ADD KEY `fk-kodeMK-in-KRS` (`kode_mk`);

--
-- Indeks untuk tabel `laborans`
--
ALTER TABLE `laborans`
  ADD PRIMARY KEY (`nip`),
  ADD UNIQUE KEY `nip` (`nip`),
  ADD KEY `fk-userID-in-Laboran` (`user_id`);

--
-- Indeks untuk tabel `mahasiswas`
--
ALTER TABLE `mahasiswas`
  ADD PRIMARY KEY (`nim`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD KEY `fk-userID-in-Mahasiswa` (`user_id`);

--
-- Indeks untuk tabel `matkuls`
--
ALTER TABLE `matkuls`
  ADD PRIMARY KEY (`kode_mk`),
  ADD UNIQUE KEY `kode_mk` (`kode_mk`);

--
-- Indeks untuk tabel `pendaftarans`
--
ALTER TABLE `pendaftarans`
  ADD PRIMARY KEY (`daftar_id`),
  ADD KEY `fk_programID_in_Pendaftaran` (`program_id`),
  ADD KEY `fk_NIM_in_Pendaftaran` (`nim`);

--
-- Indeks untuk tabel `penilaians`
--
ALTER TABLE `penilaians`
  ADD PRIMARY KEY (`nilai_id`),
  ADD KEY `fk-krsID-in-Penilaian` (`krs_id`);

--
-- Indeks untuk tabel `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`),
  ADD UNIQUE KEY `periode` (`periode`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `informasis`
--
ALTER TABLE `informasis`
  MODIFY `info_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jadwalpikets`
--
ALTER TABLE `jadwalpikets`
  MODIFY `piket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kehadirans`
--
ALTER TABLE `kehadirans`
  MODIFY `absen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `krs`
--
ALTER TABLE `krs`
  MODIFY `krs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pendaftarans`
--
ALTER TABLE `pendaftarans`
  MODIFY `daftar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `penilaians`
--
ALTER TABLE `penilaians`
  MODIFY `nilai_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `asistens`
--
ALTER TABLE `asistens`
  ADD CONSTRAINT `fk-NIM-in-Asisten` FOREIGN KEY (`nim`) REFERENCES `mahasiswas` (`nim`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jadwalpikets`
--
ALTER TABLE `jadwalpikets`
  ADD CONSTRAINT `fk-asistenID-in-JadwalPiket` FOREIGN KEY (`asisten_id`) REFERENCES `asistens` (`asisten_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk-praktikID-in-JadwalPiket` FOREIGN KEY (`praktik_id`) REFERENCES `jadwalpraktiks` (`praktik_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jadwalpraktiks`
--
ALTER TABLE `jadwalpraktiks`
  ADD CONSTRAINT `fk-dosenNIP-in-JadwalPraktik` FOREIGN KEY (`dosen_nip`) REFERENCES `dosens` (`dosen_nip`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk-kelasID-in-JadwalPraktik` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kodeMK_in_JadwalPraktik` FOREIGN KEY (`kode_mk`) REFERENCES `matkuls` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kehadirans`
--
ALTER TABLE `kehadirans`
  ADD CONSTRAINT `fk-asistenID-in-Kehadiran` FOREIGN KEY (`asisten_id`) REFERENCES `asistens` (`asisten_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk-piketID-in-Kehadiran` FOREIGN KEY (`piket_id`) REFERENCES `jadwalpikets` (`piket_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `fk_kodeMK_in_Kelas` FOREIGN KEY (`kode_mk`) REFERENCES `matkuls` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `krs`
--
ALTER TABLE `krs`
  ADD CONSTRAINT `fk-NIM-in-KRS` FOREIGN KEY (`nim`) REFERENCES `mahasiswas` (`nim`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk-kodeMK-in-KRS` FOREIGN KEY (`kode_mk`) REFERENCES `matkuls` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `laborans`
--
ALTER TABLE `laborans`
  ADD CONSTRAINT `fk-userID-in-Laboran` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `mahasiswas`
--
ALTER TABLE `mahasiswas`
  ADD CONSTRAINT `fk-userID-in-Mahasiswa` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pendaftarans`
--
ALTER TABLE `pendaftarans`
  ADD CONSTRAINT `fk_NIM_in_Pendaftaran` FOREIGN KEY (`nim`) REFERENCES `mahasiswas` (`nim`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_programID_in_Pendaftaran` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penilaians`
--
ALTER TABLE `penilaians`
  ADD CONSTRAINT `fk-krsID-in-Penilaian` FOREIGN KEY (`krs_id`) REFERENCES `krs` (`krs_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
