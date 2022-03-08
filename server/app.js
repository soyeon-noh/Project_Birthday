import express from "express";
const app = express();

/** cors 설정 */
const whiteURL = ["http://localhost:3000"];
const corsOption = {
  origin: (origin, callback) => {
    const isWhiteURL = whiteURL.indexOf(origin) !== -1;
    callback(null, isWhiteURL);
  },
  credentials: true,
};
app.use(cors(corsOption));

/** router */
app.get("/", (req, res, next) => {
  console.log("get");
});
app.listen(8080);

// IP 컴퓨터 당 하나
// Port 컴퓨터 당 여러개
