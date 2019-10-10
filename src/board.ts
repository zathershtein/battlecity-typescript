import { LengthToXY, givePoint, Point } from "./utils";
import { elements } from "./constants";

const util = require("util");

export class Board {
    constructor(readonly board: string) {}
    contains = (a: any, obj: Object) => {
        let i = a.length;
        while (i--) {
            if (a[i].equals(obj)) return true;
        }
        return false;
    };

    sort = (all: any[]) => {
        return all.sort((pt1, pt2) => {
            return pt1.getY() * 1000 + pt1.getX() - (pt2.getY() * 1000 + pt2.getX());
        });
    };

    removeDuplicates = (all: any[]) => {
        const result = [];
        for (let index in all) {
            let point = all[index];
            if (!this.contains(result, point)) {
                result.push(point);
            }
        }
        return this.sort(result);
    };

    getBoardSize = () => Math.sqrt(this.board.length);

    boardSize = this.getBoardSize();
    xyl = new LengthToXY(this.boardSize);

    getMe = () => {
        let result = [] as Point[];
        for (const elem in elements.HERO_TANK) {
            result = result.concat(this.findAll(elements.HERO_TANK[elem]));
        }
        return result.length == 0 ? null : result[0];
    };

    findAll = (element: string) => {
        const result = [] as Point[];
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            let point = this.xyl.getXY(i);
            if (point && this.isAt(point.getX(), point.getY(), element)) {
                result.push(point);
            }
        }
        return this.sort(result);
    };

    isAt = (x: number, y: number, element: string) => {
        if (givePoint(x, y).isOutOf(this.boardSize)) {
            return false;
        }
        return this.getAt(x, y) == element;
    };

    getAt = (x: number, y: number) => {
        if (givePoint(x, y).isOutOf(this.boardSize)) {
            return elements.CONSTRUCTION.BATTLE_WALL;
        }
        return this.board.charAt(this.xyl.getLength(x, y));
    };

    getEnemies = () => {
        let result = [] as Point[];
        for (const elem in elements.RIVAL_TANK) {
            result = result.concat(this.findAll(elements.RIVAL_TANK[elem]));
        }
        for (const elem in elements.AI_TANK) {
            result = result.concat(this.findAll(elements.AI_TANK[elem]));
        }
        return result;
    };

    getBullets = () => {
        let result = [] as Point[];
        result = result.concat(this.findAll(elements.BULLET));
        return result;
    };

    isGameOver = () => this.getMe() == null;

    isBulletAt = (x: number, y: number) => {
        if (givePoint(x, y).isOutOf(this.boardSize)) {
            return false;
        }
        return this.getAt(x, y) == elements.BULLET;
    };

    boardAsString = () => {
        let result = "";
        for (let i = 0; i < this.boardSize; i++) {
            result += this.board.substring(i * this.boardSize, (i + 1) * this.boardSize);
            result += "\n";
        }
        return result;
    };

    getBarriers = () => {
        let result = [] as Point[];
        for (const elem in elements.CONSTRUCTION) {
            result = result.concat(this.findAll(elements.CONSTRUCTION[elem]));
        }
        return this.sort(result);
    };

    toString = () =>
        util.format(
            "Board:\n%s\n" + "My tank at: %s\n" + "Enemies at: %s\n" + "Bulets at: %s\n",
            this.boardAsString(),
            this.getMe(),
            this.getEnemies(),
            this.getBullets(),
        );

    isAnyOfAt = (x: number, y: number, elements: Object) => {
        if (givePoint(x, y).isOutOf(this.boardSize)) {
            return false;
        }
        for (let index in elements) {
            const element = elements[index];
            if (this.isAt(x, y, element)) {
                return true;
            }
        }
        return false;
    };

    // TODO применить этот подход в других js клиентах
    getNear = (x: number, y: number) => {
        const result = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue;
                result.push(this.getAt(x + dx, y + dy));
            }
        }
        return result;
    };

    isNear = (x: number, y: number, element: string) => this.getNear(x, y).includes(element);

    isBarrierAt = (x: number, y: number) => {
        if (givePoint(x, y).isOutOf(this.boardSize)) {
            return true;
        }
        return this.contains(this.getBarriers(), givePoint(x, y));
    };

    countNear = (x: number, y: number, element: string) => {
        return this.getNear(x, y).filter(val => val === element).length;
    };
}