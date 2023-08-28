import  express  from "express";
import userRouter from './routes/user.js';
import db from "./db/index.js";
import 'reflect-metadata';
import {userValidationMiddleware, loggerMiddleware} from "./middlewares/users.js";
const app = express();
const PORT = 3000;

app.use(express.json());
// app.use(loggerMiddleware);
// app.use(userValidationMiddleware);

app.use('/register', userRouter)

// app.use((err:any, req:any, res:any, next:any) => {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
// })
app.listen(PORT, () => {
    // logger(`App is listening on port ${PORT}`)
    console.log(`App is llistening on port ${PORT}`);
    db.initialize();
});
export default app;