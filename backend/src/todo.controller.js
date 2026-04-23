import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, "todos.json");

export const readTodo = async () => {
  try {
    return await fs.readJSON(FILE_PATH);
  } catch (err) {
    return [];
  }
};

export const writeTodo = async (data) => {
  try {
    console.log("Writing to:", FILE_PATH);

    await fs.writeJSON(FILE_PATH, data, { spaces: 2 });
    console.log("Data written successfully");
  } catch (err) {
    console.error("unable to write todo", err.message);
  }
};
