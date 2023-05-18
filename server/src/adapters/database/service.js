const sql = require('mssql');

const {
  secrets
}= require('../../../secrets');

const dbConfig = secrets.loadDbSecrets()

const connectDB = async (tryCount) => {
  console.log("Hello! :)")
  try {
    await sql.connect(dbConfig)
      
  } catch (error) {
    console.log("Hewwo! :3 " + error)
    if (tryCount >= 3) {
      console.log('Error: ', error);
      throw error;
    }
    connectDB(tryCount + 1);
  }
}

module.exports = {
  query: async (statement) => {
    await connectDB(0);
    const request = new sql.Request();
    return request.query(statement)
  }
}