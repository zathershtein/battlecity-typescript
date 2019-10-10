import { printBoardOnTextArea, logging } from "./logger";
import { Board } from "./board";
import { DirectionSolver } from "./main";
import { commands } from "./constants";

export class LengthToXY {
    constructor(readonly boardSize: number) {}
    private inversionY = (y: number) => this.boardSize - 1 - y;
    private inversionX = (x: number) => x;
    getXY = (length: number) => {
        if (length == -1) {
            return null;
        }
        const x = this.inversionX(length % this.boardSize);
        const y = this.inversionY(Math.trunc(length / this.boardSize));
        return new Point(x, y);
    };

    getLength = (x: number, y: number) => {
        const xx = this.inversionX(x);
        const yy = this.inversionY(y);
        return yy * this.boardSize + xx;
    };
}

export interface IPoint {
    isEquals?: (o: any) => boolean;
    toString?: () => string;
    isOutOf?: (size: number) => boolean;
    getX?: () => number;
    getY?: () => number;
    moveTo?: (direction: any) => Point;
}

export class Point implements IPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    isEquals = (o: any) => o.getX() == this.x && o.getY() == this.y;
    toString = () => "[" + this.x + "," + this.y + "]";
    isOutOf = (boardSize: number) => this.x >= boardSize || this.y >= boardSize || this.x < 0 || this.y < 0;
    getX = () => this.x;
    getY = () => this.y;
    moveTo = (direction: any) => givePoint(direction.changeX(this.x), direction.changeY(this.y));
}

function getDirection(index: number, dx: number, dy: number, name: string) {
    const changeX = (x: number) => x + dx;
    const changeY = (y: number) => y + dy;
    const change = (point: Point) => point.moveTo(point);
    const toString = () => name;

    // const inverted = () => {
    //     switch (this) {
    //         case direction.UP:
    //             return direction.DOWN;
    //         case direction.DOWN:
    //             return direction.UP;
    //         case direction.LEFT:
    //             return direction.RIGHT;
    //         case direction.RIGHT:
    //             return direction.LEFT;
    //         default:
    //             return direction.STOP;
    //     }
    // };

    return {
        changeX: changeX,
        changeY: changeY,
        change: change,
        // inverted: inverted,
        toString: toString,
        getIndex: function() {
            return index;
        },
    };
}

const direction = {
    UP: getDirection(2, 0, 1, commands.UP), // you can move
    DOWN: getDirection(3, 0, -1, commands.DOWN),
    LEFT: getDirection(0, -1, 0, commands.LEFT),
    RIGHT: getDirection(1, 1, 0, commands.RIGHT),
    ACT: getDirection(4, 0, 0, commands.ACT), // fire
    STOP: getDirection(5, 0, 0, commands.STOP), // stay
    values: () => {
        return [
            direction.UP,
            direction.DOWN,
            direction.LEFT,
            direction.RIGHT,
            // direction.DRILL_LEFT,
            // direction.DRILL_RIGHT,
            direction.STOP,
        ];
    },
};

const printArray = function(array: number[]) {
    const result = [];
    for (const index in array) {
        const element = array[index];
        result.push(element.toString());
    }
    return "[" + result + "]";
};

function getValueOf(index: number) {
    const directions = direction.values();
    for (let i in directions) {
        let direction = directions[i];
        if (direction.getIndex() == index) {
            return direction;
        }
    }
    return direction.STOP;
}

export const givePoint = (x: number, y: number) => new Point(x, y);

export function processBoard(boardString: string) {
    const board = new Board(boardString);
    if (!!printBoardOnTextArea) {
        printBoardOnTextArea(board.boardAsString());
    }

    let logMessage = board + "\n\n";
    const answer = new DirectionSolver(board).get().toString();
    logMessage += "Answer: " + answer + "\n";
    logMessage += "-----------------------------------\n";

    logging(logMessage);
    return answer;
}

export function getTarget(me: Point | null, enemies: Point[]) {
    if (!me) return null;
    const target = new Point(enemies[0].x, enemies[0].y);
    enemies.forEach(val => {
        const currDist = Math.abs(target.x - me.getX()) + Math.abs(target.y - me.getY());
        const nextDist = Math.abs(val.getX() - me.getX()) + Math.abs(val.getY() - me.getY());
        if (currDist > nextDist) {
            target.x = val.getX();
            target.y = val.getY();
        }
    });
    return target;
}
