import express from "express";
import { User } from "../db/entity/User.js";
import {userValidationMiddleware, loggerMiddleware} from "../middlewares/users.js";
const router = express.Router();

router.post("/", userValidationMiddleware);

router.post("/", async (req, res) => {
  try {
    const user = new User();
    user.userName = req.body.userName;
    user.password = req.body.password;
    await user.save();
    res.status(201).send("User Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});
export default router;
