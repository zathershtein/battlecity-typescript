export function printBoardOnTextArea(data: string) {
    const textarea = <HTMLTextAreaElement>document.getElementById("board");
    if (!textarea) return;

    const size = data.split("\n")[0].length;
    const htmlTextArea = textarea;
    htmlTextArea.cols = size;
    htmlTextArea.rows = size + 1;
    htmlTextArea.value = data;
}

const cache = [] as string[];

export function printLogOnTextArea(data: string) {
    const textarea = <HTMLInputElement>document.getElementById("log-area");
    const addToEnd = <HTMLInputElement>document.getElementById("add-to-end");
    if (!textarea) return;
    if (addToEnd.checked) {
        cache.push(data);
        if (cache.length > 30) {
            cache.shift();
        }
    } else {
        cache.unshift(data);
        if (cache.length > 30) {
            cache.pop();
        }
    }

    let all = "";
    for (let i in cache) {
        const data = cache[i];
        all = all + "\n" + data;
    }
    textarea.value = all;
}

export function logging(board: string) {
    // console.log(board);
    if (!!printBoardOnTextArea) {
        printLogOnTextArea(board);
    }
}

// export function requireMe(string: string) {
//     if (string == "util") {
//         return {
//             // thanks to http://stackoverflow.com/a/4673436
//             format: function(format: string) {
//                 var args = Array.prototype.slice.call(arguments, 1);
//                 var number = -1;
//                 return format.replace(/%s/g, function(match) {
//                     number++;
//                     return typeof args[number] != "undefined" ? args[number] : match;
//                 });
//             },
//         };
//     } else if (string == "ws") {
//         return function(uri: string) {
//             var socket = new WebSocket(uri);
//             return {
//                 on: function(name: string, callback: (this: any, ev: Event) => any) {
//                     if (name == "open") {
//                         socket.onopen = callback;
//                     } else if (name == "close") {
//                         socket.onclose = callback;
//                     } else if (name == "error") {
//                         socket.onerror = callback;
//                     }
//                     if (name == "message") {
//                         socket.onmessage = function(message) {
//                             callback(message.data);
//                         };
//                     }
//                 },
//                 send: function(message: string) {
//                     socket.send(message);
//                 },
//             };
//         };
//     }
// }
