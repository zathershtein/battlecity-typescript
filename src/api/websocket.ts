import { processBoard } from "../utils";

export function wsConnect(url: string) {
    const ws = new WebSocket(url);
    ws.onopen = (event: Event) => {
        console.log("Web socket is opened on URL", url);
    };

    ws.onmessage = (msg: MessageEvent) => {
        const pattern = new RegExp(/^board=(.*)$/);
        const parameters = msg.data.match(pattern);
        const boardString = parameters ? parameters[1] : "";
        const answer = processBoard(boardString);
        ws.send(answer);
    };

    ws.onclose = () => {
        console.log("Web socket is closed");
        setTimeout(() => {
            wsConnect(url);
        }, 5000);
    };
}
