 //npm install --save-dev style-loader css-loader file-loader
 const path = require('path')
 let HtmlWebpackPlugin = require('html-webpack-plugin');// npm install --save-dev html-webpack-plugin
 module.exports = {
  // mode:'development',//打包后的代码在开发环境中，打包后的代码不会被压缩
  entry: './src/index.js',//打包的入口文件
  //打包之后文件的输的地址
  output:{
      filename:'bundle.js',//打包之后的名字
      path:path.resolve(__dirname,'dist')//path必须是个绝对路经 根路径创建一个dist目录
  },
  //为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题 就是在dist目录创建一个index.html文件
  plugins:[
    new HtmlWebpackPlugin()
  ],
  //处理非js之外的文件
  module:{
      rules:[
            {
            test:/\.gif$/,//匹配gif结尾
            use:[
                  {	
                    loader:'url-loader',
                      options:{//在使用url-loader时可以进行的配置
                      limit:8192,//小于8k将图片解析成base64，大于8k则处理成图片
                      name:'[name],[hash:8].[ext]',//设计打包后文件的名字，hash值与文件格式
                    }
                  }
              ]
            },
          {
              test:/\.css$/,//匹配到css结尾
              //use从右到左，从下到上执行
              use:[
                  'style-loader',
                  'css-loader'
              ]
          },{
              test:/\.(png|svg|jpg|gif)$/,
              use:[
                  'file-loader'
              ]
          }
      ]
  }
}

//webpack根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的loader。
