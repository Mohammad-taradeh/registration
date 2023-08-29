# User Registration API using TypeORM and Express.js

Welcome to the User Registration API project! This simple API allows users to register by providing a username and password. Follow the steps below to set up and use the API.

## Table of Contents

- [Project Setup](#project-setup)
- [Defining the User Entity](#defining-the-user-entity)
- [Creating a Database Connection](#creating-a-database-connection)
- [Implementing the Registration Route](#implementing-the-registration-route)
- [Testing the API](#testing-the-api)

## Project Setup

1. **Initialize Project**: Start by initializing a new Node.js project in your preferred directory.
   ```bash
   npm init -y
   ```

2. **Install Packages**: Install the required packages: express, TypeORM, and MySQL.
   ```bash
   npm install express typeorm mysql
   ```

## Defining the User Entity

1. **Create Entity**: Define a User entity using TypeORM decorators. This entity will have properties like `id`, `username`, and `password`.

2. **Example User Entity**:
   ```typescript
   import {
     Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
   BeforeInsert,
    } from "typeorm";
    import bcrypt from "bcrypt";
    import { Hash } from "crypto";
    @Entity()
    export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
     userName: string;

    @BeforeInsert()
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }
    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
      })
     createdAt: Date;
    }
     export default User;
   ```

## Creating a Database Connection

Set up a connection to the database using TypeORM. You can do this in your `app.js` or main file.

```typescript
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'reg',
  entities: [ User],
  synchronize: true,
  logging: true
});

const initialize = () => {
  dataSource.initialize().then(() => {
    console.log("Connected to DB!");
  }).catch(err => {
    console.error('Failed to connect to DB: ' + err);
  })
}

export default { initialize, dataSource };
```

## Implementing the Registration Route

1. **Create Registration Route**: Set up an Express route that accepts POST requests at `/register`.

2. **Example Route Implementation**:
   ```typescript
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
   ```

## Testing the API

Use a tool like Postman to test the registration endpoint:

- **Method**: POST
- **URL**: `http://localhost:3000/register`
- **Body**: JSON with `username` and `password` fields

Upon successful registration, you will receive a response indicating that the user was registered successfully.

That's it! You've created a simple API using TypeORM and Express.js to handle user registration. Feel free to build upon this foundation to add more features and enhance the functionality of your API. Happy coding!
