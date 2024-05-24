import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import { exec } from "node:child_process";
import util from "node:util";
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const cmd = util.promisify(exec);

app.get("/express_backend", (req: Request, res: Response) => {
  const reqMusic = Object.keys(req.query)[0];

  const callBackendAPI = async () => {
    const id = await getId(reqMusic);
    // res.json({
    //     "id": id,
    //     "query": true
    // });
    console.log(id);
    res.status(200).send(id);
  };
  try {
    callBackendAPI();
  } catch (err) {
    res.status(200).send(err);
  }
});

async function getId(reqMusic: string) {
  console.log(reqMusic);
  const { stdout } = await cmd(`yt-dlp "ytsearch1:${reqMusic}" --get-id`);

  const allIdPlaylist = stdout.split("\n");
  // console.log(allIdPlaylist);
  return allIdPlaylist[0];
}

ViteExpress.listen(app, +PORT, () =>
  console.log("Server is listening on port 5000...")
);
