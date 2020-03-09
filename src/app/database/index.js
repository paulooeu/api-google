import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
       useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
  }
}
export default new Database();
