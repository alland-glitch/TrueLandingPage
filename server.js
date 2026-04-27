const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Folder utama project
const baseDir = __dirname;

// API untuk ambil daftar folder
app.get("/api/websites", (req, res) => {
  const folders = fs.readdirSync(baseDir, { withFileTypes: true });

  const websites = folders
    .filter(dir => dir.isDirectory() && dir.name !== "node_modules")
    .map(dir => {
      const filePath = path.join(baseDir, dir.name, "index.html");
      if (fs.existsSync(filePath)) {
        return {
          name: dir.name,
          path: `${dir.name}/index.html`
        };
      }
    })
    .filter(Boolean);

  res.json(websites);
});

// serve static file
app.use(express.static(baseDir));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
