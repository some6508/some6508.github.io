## 文件

****

|	文件名	|下载链接|加速下载|
| :----: | :----: | :----: |
| 极域Trainer.rar | [raw](https://github.com/some6508/some6508.github.io/raw/master/极域Trainer.rar) | [ghproxy](https://mirror.ghproxy.com/https://github.com/some6508/some6508.github.io/raw/master/极域Trainer.rar) |

****

## 定时关机
### 请把以下代码以bat脚本运行

````
@echo off
set /p m=请输入多少分钟关机: 
if "%m%" == "0" (
	echo 取消定时关机
	shutdown /a
) else (
	set /a s=%m% * 60
	echo 将在 %m% 分钟后关机
	shutdown /s /t %s%
)
pause
````

****

