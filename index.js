import express from 'express';
import authRouter from './routes/auth.js';
import cors from 'cors';
import config from './config/app.js';
import SocketLoader from './loaders/socket.js';
import bookRoute from './routes/books.js';
import orderRoute from './routes/order.js';
import authorRoute from './routes/author.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static("public"));
app.use(authRouter);
app.use(bookRoute);
app.use(orderRoute);
app.use(authorRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(config.APP_PORT, () => {
    console.log(`Server Activated On Port ${config.APP_PORT}`);
});

export const orderSocket = new SocketLoader(app, 3001, '/order');