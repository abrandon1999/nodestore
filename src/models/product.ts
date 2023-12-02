import mongoose from 'mongoose';

export interface ProductI {
    name: String;
    description: String;
    price: Number;
}
const productSchema = new mongoose.Schema<ProductI>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
});

const ProductModel = mongoose.model<ProductI>('Product', productSchema);
export default ProductModel;
