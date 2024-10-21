import app from "./app.js";
import connectTODatabase from "./db/connect.js";

const PORT = process.env.PORT || 8000;

connectTODatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`started Sever at port ${PORT}...😎`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
