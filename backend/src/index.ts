import express from 'express';
import { config } from 'dotenv';
import { connectToDB } from './database/config';
import cors from 'cors';
import { userRoutes } from 'routes';

config();

const app = express();

app.use(cors());

connectToDB();

app.use('/api/users', userRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
