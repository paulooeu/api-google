require('dotenv').config();

module.exports = {
  dialect: 'mssql',
  host: process.env.DB_HORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
