import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";
import { app } from "./src/app.js";

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
