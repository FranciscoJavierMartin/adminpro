import { connect } from 'mongoose';

export async function connectToDB() {
  try {
    await connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error on connect to database');
  }
}
