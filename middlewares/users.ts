import express from 'express';
import 'reflect-metadata';
import db from '../db/index.js';

const loggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const logMessage = `[${new Date().toLocaleString()}] [${req.method}] ${req.path}`;
    console.log(logMessage);
    res.locals.logMessage = logMessage;
    next();
    //[17-07-2023:6:36:12] [GET] /todo/task/123456
  }

const userValidationMiddleware = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const values = ['userName', 'password'];
    const user = req.body;
    const errorList = [];
    values.forEach(key => {
        if(!user[key]) {
            return errorList.push(`${key} is Required!`);
        }
    });
    
    if(user.password.length < 8) {
        errorList.push('Password should cotain at least 8 characters!');
    }
    if(errorList.length) {
        res.status(400).send(errorList);
    }
    else {
        next();
    }
}

export {userValidationMiddleware,
    loggerMiddleware
};