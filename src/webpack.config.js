const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',  // Main entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output JavaScript bundle
    },
    module: {
        rules: [
            // Handling CSS files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Handling image files (e.g., Icon.png, Icon.ico)
            {
                test: /\.(png|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/', // Store images in assets folder
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            fs: require.resolve('browserify-fs'),
            buffer: require.resolve("buffer/"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/")
        },
    },
    plugins: [
        // Inject HTML template
        new HtmlWebpackPlugin({
            template: './index.html',  // Update to reflect the location of index.html
        }),
    ],
    node: {
        __dirname: false, // Keep Node.js path resolution
    },
    mode: 'production'
};
