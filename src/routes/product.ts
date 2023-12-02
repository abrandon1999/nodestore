import express, { Request, Response } from 'express';
import ProductModel, { ProductI } from '../models/product';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    return res.status(200).json(products);
});
router.get('/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    return res.status(200).send(product);
});
router.post('/', async (req: Request, res: Response) => {
    const { name, description, price } = req.body as ProductI;
    const productObj = new ProductModel({
        name,
        description,
        price
    });
    const product = await productObj.save();
    return res.status(201).send(product);
});

router.put('/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    const { name, description, price } = req.body as ProductI;
    product.set({
        name,
        description,
        price
    });
    const productUpdated = await product.save();
    return res.status(200).json(productUpdated);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    const deletedProduct = await ProductModel.deleteOne({
        _id: productId
    });
    return res.status(200).json(deletedProduct);
});

export default router;
