"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    return res.status(200).json(products);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_1.default.findById(productId);
    if (!product)
        return res.status(404).send('Product not found');
    return res.status(200).send(product);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    const productObj = new product_1.default({
        name,
        description,
        price
    });
    const product = yield productObj.save();
    return res.status(201).send(product);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_1.default.findById(productId);
    if (!product)
        return res.status(404).send('Product not found');
    const { name, description, price } = req.body;
    product.set({
        name,
        description,
        price
    });
    const productUpdated = yield product.save();
    return res.status(200).json(productUpdated);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_1.default.findById(productId);
    if (!product)
        return res.status(404).send('Product not found');
    const deletedProduct = yield product_1.default.deleteOne({
        _id: productId
    });
    return res.status(200).json(deletedProduct);
}));
exports.default = router;
