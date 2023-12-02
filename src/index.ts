import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import products from './routes/product';

const app = express();
app.use(bodyParser.json());
app.use('/api/product', products);
mongoose.set('strictQuery', false);
mongoose
    .connect(`${config.get('MONGO_URL')}`, {
        user: `${config.get('MONGO_USER')}`,
        pass: `${config.get('MONGO_PASS')}`
    })
    .then(() => {
        console.log(`Connected to ${config.get('MONGO_LOC')}...`);
        const port = process.env.Port || 3000;
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => console.log("Couldn't connect to MongoDB...", err));

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Node_Store');
});
