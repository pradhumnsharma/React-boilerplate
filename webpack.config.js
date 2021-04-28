const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'application.bundle.[chunkhash].js'
    },
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart: {
                scripts: ['echo "===> Starting packing with WEBPACK 5"'],
                blocking: true,
                parallel: false
            },
            onBuildEnd: {
                scripts: ['echo "Webpack End"'],
                blocking: false,
                parallel: true
            }
        }),
        new HtmlWebpackPlugin({ title: 'Output Management', template: path.resolve(__dirname, 'public', 'index.html') }),
        new MiniCssExtractPlugin({
            filename: 'application.bundle.[chunkhash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                exclude: /node_modules|build/,
                loader: 'eslint-loader',
            },
            {
                test: /\.(css|scss)$/,
                include: [path.resolve(__dirname, 'src/styles')],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                auto: true,
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.svg$/,
                include: [path.resolve(__dirname, 'src/assets/images')],
                use: ['@svgr/webpack'],
              },
            {
                test: /\.(png|jpe?g|gif|webm|mp4)$/,
                loader: "file-loader",
                options: {
                    context: "src/assets/images",
                    name: "[path][name].[ext]",
                    outputPath: "img"
                }
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                include: [path.resolve(__dirname, 'src/assets/fonts')],
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
};