import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import studentApiRoutes from './routes/student.routes.js';
import studentViewRoutes from './routes/student.view.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// view engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// connect to DB
connectDB();

// routes
app.use('/students', studentApiRoutes);
app.use('/view/students', studentViewRoutes);

app.get('/', (req, res) => res.redirect('/view/students'));

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
