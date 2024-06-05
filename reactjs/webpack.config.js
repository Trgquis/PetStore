const path = require("path");

module.exports = {
    entry: "./src/app.js", // Adjust this according to your entry point
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        fallback: {
            path: require.resolve("path-browserify"),
            os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify"),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Adjust this according to your file types
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/, // Adjust this according to your file types
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
    },
};
