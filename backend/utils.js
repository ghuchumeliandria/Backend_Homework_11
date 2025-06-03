const fs = require("fs/promises");

const ReadFile = async (filepath, status) => {
  if (!filepath) return res.status(400).json({ error: "file not found" });

  const readData = await fs.readFile(filepath, "utf-8");

  return status ? JSON.parse(readData) : readData;
};

const WriteFile = async (filePath, data) => {
  if (!filePath) return;
  await fs.writeFile(filePath, data);
};

module.exports = { WriteFile, ReadFile };
