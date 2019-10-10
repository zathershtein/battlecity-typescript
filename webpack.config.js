const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevServer = process.argv.find(v => v.includes("webpack-dev-server" || "development"));

dotenv.config({
    path: isDevServer ? "../.env" : "./.env",
});

const GAME_URL = process.env.GAME_URL;
if (
    !GAME_URL ||
    GAME_URL === "http://codenjoy.com/codenjoy-contest/board/player/code@gmail.com?code=00000000000000000000"
) {
    console.error("Please, modify .env file and replace with your game url");
    process.exit(1);
}

module.exports = {
    devtool: "source-map",
    mode: "development",
    entry: __dirname + "/src/main.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                GAME_URL: JSON.stringify(GAME_URL),
            },
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            static: "./index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/,
        },
        contentBase: path.join(__dirname, "dist"),
        port: 8081,
    },
    node: {
        fs: "empty",
    },
};
