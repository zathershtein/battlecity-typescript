export const elements = {
    NONE: " ",
    BANG: "Ѡ",
    BULLET: "•",
    DESTROYED: " ",

    CONSTRUCTION: {
        BATTLE_WALL: "☼",
        ENTIRE_WALL: "╬",
        DESTROYED_DOWN: "╩",
        DESTROYED_UP: "╦",
        DESTROYED_LEFT: "╠",
        DESTROYED_RIGHT: "╣",

        DESTROYED_DOWN_TWICE: "╨",
        DESTROYED_UP_TWICE: "╥",
        DESTROYED_LEFT_TWICE: "╞",
        DESTROYED_RIGHT_TWICE: "╡",

        DESTROYED_LEFT_RIGHT: "│",
        DESTROYED_UP_DOWN: "─",

        DESTROYED_UP_LEFT: "┌",
        DESTROYED_RIGHT_UP: "┐",
        DESTROYED_DOWN_LEFT: "└",
        DESTROYED_DOWN_RIGHT: "┘",
    },

    HERO_TANK: {
        UP: "▲",
        RIGHT: "►",
        DOWN: "▼",
        LEFT: "◄",
    },
    RIVAL_TANK: {
        UP: "˄",
        RIGHT: "˃",
        DOWN: "˅",
        LEFT: "˂",
    },
    AI_TANK: {
        UP: "?",
        RIGHT: "»",
        DOWN: "¿",
        LEFT: "«",
    },
};

export const commands = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    ACT: "ACT",
    STOP: "STOP",
};
