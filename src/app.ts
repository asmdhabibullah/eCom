import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'package.breezebd.com';
import { signinUserRouter } from './routers/signin';
import { activeUserRouter } from './routers/activeUsers';
import { signoutUserRouter } from './routers/signout';
import { signupUserRouter } from './routers/signup';
import { confirmOrder } from './routers/handleOrder';
import { getOrders } from './routers/getOrder';
// import { updateUserRouter } from './routers/updateUser';
// import { deleteUserRouter } from './routers/delete';
// import { createBook } from './routers/createBook';
// import { getBooks } from './routers/getBooks';
// import { returnBook } from './routers/returnBook';
// import { updateLibrary } from './routers/updateLibraryToBook';
// import { takeBook } from './routers/takeBook';
// import { userTakenBooks } from './routers/userTakenBooks';
// import { getBook } from './routers/getBook';
require("dotenv").config()

const app = express();

app.set('trust proxy', true);

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(json());

app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

// console.log("Running");
// Routing
// User
app.use(signinUserRouter);
app.use(activeUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);
// app.use(updateUserRouter);
// app.use(deleteUserRouter);

// Order
app.use(getOrders);
app.use(confirmOrder);

app.all('*', async (req, res) => {
    console.log("Error handaling for all routers.");
    throw new NotFoundError();
});

// app.use(errorHandler);

export { app };