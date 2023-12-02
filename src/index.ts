import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Node_Store');
});

const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
