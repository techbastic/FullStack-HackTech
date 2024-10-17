const express = require("express");

import { login, register } from "../controllers/userController";

const userRouter = express.Router();


userRouter.post("/signup",register);
userRouter.post("/sigin",login);

module.exports = userRouter;

