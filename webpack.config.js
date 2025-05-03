/**
 * We use webpack as our main module bundler
 * You can easily modify, add or improve the configurations as your needs
 * For more information, read the docs here: https://webpack.js.org/
 */


// Import only necessary packages
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// Import plugins here
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackMessages = require('webpack-messages');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Our variables, path, etc
const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const { name: appName } = require('./package.json');

/**
 * Function to get our SCSS and JavaScript file entries
 * 
 * @returns {Object} entries - Generated entries 
 */
const getEntryFiles = () => {
  /** Our main entries */
  const entries = {
    'assets/css/styles.bundle': path.resolve(srcPath, 'assets/scss/styles.scss'),
    'assets/js/scripts.bundle': path.resolve(srcPath, 'assets/js/scripts.js'),
  };

  /** Generate entries for page styles separately inside `src/assets/scss/pages` directory */
  (glob.sync(srcPath + '/assets/scss/pages/**/!(_)*.scss') || []).forEach(file => {
    const output = file.replace(/.*scss\/(.*?)\.scss$/ig, 'assets/css/$1');
    entries[output] = path.resolve(srcPath, file.replace(/.*scss\/(.*?)$/ig, 'assets/scss/$1'));
  });

  /** Generate entries for all javascript files inside `src/assets/jss`, including files in each folder */
  (glob.sync(srcPath + '/assets/js/**/!(_)*.js') || []).forEach(file => {
    const output = file.replace(/.*js\/(.*?)\.js$/ig, 'assets/js/$1');
    if (output === 'assets/js/scripts') return;

    entries[output] = path.resolve(srcPath, file.replace(/.*js\/(.*?)$/ig, 'assets/js/$1'));
  });

  return entries;
}

/**
 * Function to get our HTML file entries
 * 
 * @returns {Object} entries - Genareted entries
 */
const getHTMLEntries = () => {
  /** HTML entries */
  const entries = [];

  /** Geenerate entries of HTML files */
  (glob.sync(srcPath + '/**/!(_)*.html') || []).forEach(file => {
    const output = file.replace(/.*src\/(.*?)$/ig, '$1');
    /** Exclude partials */
    if (output.includes('partials/')) return;
    entries.push(output);
  })

  return entries;
}

module.exports = {
  /** Enable optimizations for production build or just development mode */
  mode: isProduction ? 'production' : 'development',
  /** Get all entry files */
  entry: getEntryFiles(),
  /** Our main output path */
  output: {
    path: distPath,
    filename: '[name].js',
    assetModuleFilename: 'media/bundle/[hash][ext][query]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          /** We're using `MiniCssExtractPlugin.loader` (first item of this array) to extract CSS into separate files
           * But you can use second method by injecting a `<style>` tag without load the css in `<link>` tag with style-loader (second item of this array)
           * And styling will by applied by JavaScript and you must import your style in JavaScript file
           * If you want to use the second method, you should remove `MiniCssExtractPlugin.loader` (first item of this array) and uncomment the next item
           * For more information, read the docs here: https://webpack.js.org/loaders/style-loader
           */
          MiniCssExtractPlugin.loader,
          // {
          //   /** Adds CSS to the DOM by injecting a `<style>` tag */
          //   loader: 'style-loader'
          // },
          {
            /** Interprets `@import` and `url()` like `import/require()` and will resolve them */
            loader: 'css-loader',
            options: {
              /** Set false to prevent following urls to fonts and images */
              url: false
            }
          },
          {
            /** Loader for webpack to process CSS with PostCSS */
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ]
              }
            }
          },
          {
            /** This webpack loader allows you to have a distributed set SCSS files and assets co-located with those SCSS files */
            loader: 'resolve-url-loader',
          },
          {
            /** Loads a SASS/SCSS file and compiles it to CSS */
            loader: 'sass-loader',
            options: {
              /** Important to enable sourceMap due to follow instruction from `resolve-url-loader` */
              sourceMap: true,
              /** Enable to show SassWarning */
              warnRuleAsWarning: false,
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        /** Use Hanldebars loader */
        loader: "handlebars-loader",
        options: {
          /** Our Handlebars runtime */
          runtime: path.resolve(__dirname, 'helpers/handlebars.js'),
          precompileOptions: {
            /** Need to be disabled because of an error when using custom helper */
            knownHelpersOnly: false,
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      /** Create aliases for jQuery */
      jquery: path.resolve(__dirname, 'node_modules/jquery/src/jquery'),
    },
    // Attempt to resolve these extensions in order
    extensions: ['.js', '.scss'],
  },
  optimization: {
    /** Enable minimizer for production build only */
    minimize: isProduction,
    minimizer: [
      /** Use terser to minify/minimize JavaScript */
      new TerserJSPlugin({
        minify: TerserJSPlugin.uglifyJsMinify
      }),
      /** Use CssMinizerPlugin to optimize and minify CSS */
      new CssMinimizerPlugin(),
    ],
  },
  /** Define our plugins */
  plugins: [
    /** Use FixStyleOnlyEntriesPlugin plugin to remove bundled js files from css files
     * Disabled for development mode because of an error
     * If you know about the reason of error, you can call me and help me to improve the script
     */
    isProduction && new FixStyleOnlyEntriesPlugin(),
    /** Use MiniCssExtractPlugin to extract CSS into separate files */
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    /** Beautifully format webpack messages */
    new WebpackMessages({
      name: appName,
      logger: str => console.log(`>> ${str}`)
    }),
    /** Use CopyWebpackPlugin to copy necessary files from sources directory */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(srcPath, 'assets/media'),
          to: path.resolve(distPath, 'assets/media'),
          noErrorOnMissing: true
        },
        {
          from: path.resolve(srcPath, 'assets/plugins'),
          to: path.resolve(distPath, 'assets/plugins'),
          noErrorOnMissing: true
        }
      ]
    }),
    /** Generate our HTML files */
    ...getHTMLEntries().map((entry) => (
      new HtmlWebpackPlugin({
        template: path.resolve(srcPath, entry),
        filename: entry,
        inject: false
      })
    ))
  ].filter(plugin => plugin),
  /** Run the dev server on `dist` directory, so you don't need external dev server or live server */
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true
  },
  /** Caching the build files generated to improve the build speed in development */
  cache: !isProduction,
  /** Source mapping to enhance the debugging process */
  devtool: !isProduction && 'source-map',
  performance: {
    /** Disable warnings hint */
    hints: false,
  },
  /** What bundle information gets displayed */
  stats: isProduction ? 'errors-warnings' : 'errors-only',
}