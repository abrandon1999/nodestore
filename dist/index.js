"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./routes/product"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/product', product_1.default);
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(`${config_1.default.get('MONGO_URL')}`, {
    user: `${config_1.default.get('MONGO_USER')}`,
    pass: `${config_1.default.get('MONGO_PASS')}`
})
    .then(() => {
    console.log(`Connected to ${config_1.default.get('MONGO_LOC')}...`);
    const port = process.env.Port || 3000;
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
})
    .catch((err) => console.log("Couldn't connect to MongoDB...", err));
app.get('/', (req, res) => {
    return res.send('Hello Node_Store');
});
