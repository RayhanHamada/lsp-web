import cors from 'cors';
import express from 'express';
import { router } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
