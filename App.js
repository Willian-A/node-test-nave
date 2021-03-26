require("dotenv").config();
const app = require("./config/server");

console.log(`Production Server on ${process.env.PORT}`);
app.listen(process.env.PORT);