import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from 'config';
const app = express();

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
interface ProductI {
    name: String;
    description: String;
    price: Number;
}
const productSchema = new mongoose.Schema<ProductI>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
});

const productModel = mongoose.model<ProductI>('Product', productSchema);
app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Node_Store');
});

app.get('/api/product', async (req: Request, res: Response) => {
    const products = await productModel.find();
    return res.status(200).json(products);
});
