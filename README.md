#### 运行项目
 1. cd 到项目目录下
 2. 首次运行需执行 ` npm install 或者 cnpm install` 下载依赖
 3. 依赖下载完成之后，执行 ` npm run dev` 运行项目
 4. 出现该提示，表明项目运行成功：

	```
	App running at:
	  Local:   http://localhost:8080/ 
	  Network: http://10.10.39.236:8080/
	```

 5. 项目运行成功后，即可通过 `Local（仅限本机访问）` 或者 `Network（局域网内访问）` 后的地址访问该项目

#### 打包项目
 1. cd 到项目目录下
 2. 首次运行需执行 ` npm install 或者 cnpm install` 下载依赖
 3. 依赖下载完成之后，执行 ` npm run build` 打包项目
 4. 出现该提示，表明项目打包成功：

	```
	 DONE  Build complete. The dist directory is ready to be deployed.
	 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
	```
	
 5. 项目打包成功后，打包的项目默认会存放到项目的 `dist`目录下
