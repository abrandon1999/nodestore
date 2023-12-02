import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const mongoConnect2 = 'mongodb://localhost/store';
const mongoConnect = 'mongodb+srv://abrandon1999:PyW6sGEAJZjVQ7pP@cluster0.edquirp.mongodb.net/';
mongoose.set('strictQuery', false);
mongoose
    .connect(mongoConnect)
    .then(() => {
        console.log('Connected to MongoDB...');
        const port = process.env.Port || 3000;
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => console.log("Couldn't connect to MongoDB...", err));

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Node_Store');
});
