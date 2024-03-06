import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshPlugin from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader =  {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
     }

    const svgrLoader =  {
        test: /\.svg$/i,
        use: [
            { 
                loader: '@svgr/webpack', 
                options: { 
                    icon: true,
                    svgConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                } 
            }
        ],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader =  {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }

      const tsLoader =  {   
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshPlugin()].filter(Boolean),
              }),
            }
          }
        ]
      }

      const babelLoader = buildBabelLoader({ mode: options.mode });

    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgrLoader
    ]
}