const { google } = require("googleapis");
const fs = require("fs");

// Fungsi untuk mengunggah file ke Google Drive
async function uploadFileToDrive(file, fileName) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./src/config/apikey.json",
    scopes: "https://www.googleapis.com/auth/drive.file",
  });

  const drive = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: fileName, // Nama file yang ingin Anda gunakan di Google Drive
    parents: ["1PMvK0Xhg5FVsEIIT4LJJuYoe660GjXt1"], // ID folder tempat Anda ingin menyimpan file
  };

  const media = {
    mimeType: "application/octet-stream",
    body: fs.createReadStream(file.path), // Menggunakan fs untuk membaca file
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "webViewLink, id", // Mengambil webViewLink (URL) dan id file
    });

    // Menghapus file lokal setelah diunggah
    fs.unlinkSync(file.path);

    return response.data.webViewLink; // Mengembalikan URL file
  } catch (error) {
    console.error("Gagal mengunggah file ke Google Drive:", error);
    throw error;
  }
}

// Fungsi untuk menghapus file dari Google Drive berdasarkan ID file
async function deleteFileFromDrive(fileId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./src/config/apikey.json",
    scopes: "https://www.googleapis.com/auth/drive.file",
  });

  const drive = google.drive({ version: "v3", auth });

  try {
    await drive.files.delete({ fileId });
  } catch (error) {
    console.error("Gagal menghapus dari Google Drive:", error);
    throw error;
  }
}

module.exports = { uploadFileToDrive, deleteFileFromDrive };
