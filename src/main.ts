import * as dotenv from "dotenv";
import { wsConnect } from "./api/websocket";
import { Board } from "./board";

dotenv.config();
const url = process.env.GAME_URL;

export const bulletSpeed = 2;

const resUrl = url
    ? url
          .replace("http", "ws")
          .replace("board/player/", "ws?user=")
          .replace("?code=", "&code=")
    : "";

wsConnect(resUrl);

export class DirectionSolver {
    constructor(readonly board: Board) {}
    get = () => {
        const me = this.board.getMe();
        const enemies = this.board.getEnemies();
        const barriers = this.board.getBarriers();

        // TODO your code here

        return "ACT";
    };
}
