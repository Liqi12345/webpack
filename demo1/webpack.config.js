const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
const minicss = require('mini-css-extract-plugin')
var website = {
	path:'http://192.168.1.104:8080/'
}
module.exports = {
	entry:{
		entry:'./src/main.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js',
		publicPath:website.path

	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
		            {
		            	loader: minicss.loader,
		            	options: {
			               publicPath: '../'
			            }
			        },
		          	"css-loader"
				]
			},
			{
				test:/\.(png|jpg|gif)/,
				use:[{
					loader:'url-loader',
					options:{
						limit:50000,
						name:'image/[name].[hash:7].[ext]',

					}
				}]
			},
			{
				test:/\.(htm|html)$/i,
    			use:['html-withimg-loader']
			}
		]
	},
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.104',
		compress:true,
		port:8080
	},
	plugins:[
		
		new htmlplugin({
			title:'test李琪',
			template:'./src/index.html',
			filename:'asset/index.html',
			minify:{
				// collapseWhitespace: true,
				// removeComments: true,
				// removeRedundantAttributes: true,
				// removeScriptTypeAttributes: true,
				// removeStyleLinkTypeAttributes: true,
				// useShortDoctype: true
				// removeAttributeQuotes
			},
			hash:true,

		}),
		new minicss({
			filename:'css/[name].css', 
		}),
		new uglify()
	]
}