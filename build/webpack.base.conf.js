'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const SpritesmithPlugin = require('webpack-spritesmith')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/sprite'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, '../static/images/generated-sprite.png'),
        css: [
          [
            path.resolve(__dirname, '../src/assets/css/sprite.css'), {
            format: 'function_based_template'
          }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: "../../../static/images/generated-sprite.png"
      },
      customTemplates: {
        function_based_template: function(data) {
          const shared = '.icon {display:inline-block; background-image: url(I); }'.replace('I', data.sprites[0].image)
          // 注意：此处默认图标使用的是二倍图
          const perSprite = data.sprites.map(function(sprite) {
            // background-size: SWpx SHpx;
            return '.icon-N.icon { width: Wpx; height: Hpx;background-position: X Y;background-size: SWpx SHpx;}'.replace(/N/g, sprite.name).replace(/SW/g, data.spritesheet.width / 2).replace(/SH/g, data.spritesheet.height / 2).replace(/W/g, sprite.width / 2).replace(/H/g, sprite.height / 2).replace(/X/g, ((sprite.x / 2) / (data.spritesheet.width / 2 - sprite.width / 2) * 100) + '%').replace(/Y/g, ((sprite.y / 2) / (data.spritesheet.height / 2 - sprite.height / 2) * 100) + '%')
          }).join('\n')
          return shared + '\n' + perSprite
        }
      }
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
