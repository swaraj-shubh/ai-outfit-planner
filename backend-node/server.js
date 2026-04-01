import app from "./src/app.js";
import connectDB from "./src/database/mongo.js";
import { PORT } from "./src/config/config.js";

connectDB();
// apply cors

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});