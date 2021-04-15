import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import { connectToDB } from 'database/config';
import cors from 'cors';
import { userRoutes, hospitalRoutes, doctorRoutes, searchRouter } from 'routes';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

connectToDB();

app.use('/api/users', userRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/search', searchRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
