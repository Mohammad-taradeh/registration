import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'reg',
    entities: [User],
    synchronize: true,
    logging: true
});
const initialize = () => {
    dataSource.initialize().then(() => {
        console.log("Connected to DB!");
    }).catch(err => {
        console.error('Failed to connect to DB: ' + err);
    });
};
export default { initialize, dataSource };
