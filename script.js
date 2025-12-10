const logo = "//qzapp.qlogo.cn/qzapp/101983660/C8A28E7F8AFC9C8374469A24B2853857/100"; // 设置logo链接
// https://thirdqq.qlogo.cn/g?b=oidb&k=dN9NWDUbyRNfrbWxLen9Dw&kti=aNtVuwv-X6I&s=0
// https://hunyuan-prod-1258344703.cos.ap-guangzhou.myqcloud.com/public/60c65f222242356f810476342a09a8b7/20250223031557_2ffb8a4c71b8bce1957b9e2344683c4c1a4775ea.png?imageMogr2/thumbnail/100x

// 页面加载时执行
(function () {
	console.log("页面加载中");
	window.document.title = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }); // 设置页面标题为当前时间
	const icon = 设置元素('', 'link', document.head)[0]; // 创建link元素
	icon.rel = 'icon'; // 设置link元素的rel属性为icon
	icon.href = logo; // 设置link元素的href属性为图标链接
	var idTime = localStorage.getItem('idTime');
	if (!idTime) {
		idTime = new Date();
		localStorage.setItem('idTime', idTime);
	}
	console.log(idTime);
}());

// 页面加载完成后执行
window.addEventListener("load", function() {
	// var links = document.getElementsByTagName('a'); // 获取页面上所有的a标签
	// for (var i = 0; i < links.length; i++) { links[i].target = '_blank'; } // 设置target属性为_blank

	NetworkBackground(); // 调用加载网络背景函数

	console.log("页面加载完成");
});

/**
 * 添加全局CSS样式
 * @param {string} css - 要添加的CSS样式字符串
 * @param {HTMLElement} parent - 父元素，默认为document.head (可选)
 * @return {HTMLElement} 返回添加样式后的元素
 */
function 添加样式(css, parent = document.head) {
	console.log("添加全局样式");
	return 设置文本内容(设置元素('global-style', 'style', parent)[1], css); // 将CSS样式添加到head标签中
}

// 生成随机角度函数
function 随机角度() {
	return Math.floor(Math.random() * 360) + 'deg'; // 生成0到360之间的随机角度
}

// 生成随机颜色函数
function 随机颜色() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); // 生成随机颜色
}

// 生成随机阴影颜色函数
function 随机阴影颜色() {
	return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`; // 生成随机阴影颜色
}

/**
 * 生成随机颜色闭环序列
 * @param {number} colorCount - 需要的颜色数量（至少2个）
 * @param {number} [loop=1] - 基础循环次数
 * @returns {string} 颜色序列字符串
 * */
function 随机颜色闭环(colorCount = 5, loop = 1) {
	// 生成随机颜色数组
	var colors = Array.from({ length: colorCount }, () => 随机颜色());

	// 创建闭环序列
	var template = Array.from({ length: loop }, () => [...colors]).flat();
	var closedLoop = [...template, colors[0]];
	return closedLoop.join(', ');
}

// 添加全局CSS样式
添加样式(`
/* 设置全局CSS变量 */
:root {
	--gradient-angle: ${随机角度()}; /* 随机渐变方向 */
	--gradient-colors: ${随机颜色闭环()}; /* 随机渐变颜色 */
	--gradient-text-color: ${随机颜色闭环(5,1)}; /* 随机渐变字体颜色 */
}

/* 重置样式 */
* {
	margin: 0; /* 去除默认的边距 */
	padding: 0; /* 去除默认的填充 */
	box-sizing: border-box; /* 设置盒模型为border-box */
}

/* 设置全局样式 */
body {
	font-family: system-ui, sans-serif; /* 使用系统字体 */
	min-height: 100vh; /* 设置最小高度为视口高度 */
	display: flex; /* 使用Flex布局 */
	flex-direction: column; /* 设置主轴方向为垂直 */
	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
	overflow-x: hidden; /* 隐藏水平滚动条 */
	position: relative; /* 定位元素 */
}

/* 渐变背景 */
#gradient-bg {
	position: fixed; /* 固定定位 */
	top: 0; /* 顶部定位 */
	left: 0; /* 左侧定位 */
	width: 100%; /* 宽度为100% */
	height: 100%; /* 高度为100% */
	z-index: -2; /* 层叠顺序为-2 */
	background: linear-gradient(var(--gradient-angle), var(--gradient-colors)); /* 线性渐变背景 */
	background-size: 400% 400%; /* 背景大小为400% 400% */
	animation: gradientBG 7s ease infinite; /* 动画效果 */
}
/* 渐变背景动画 */
@keyframes gradientBG {
	0% { background-position: 0% 50%; } /* 初始位置 */
	50% { background-position: 100% 50%; } /* 中间位置 */
	100% { background-position: 0% 50%; } /* 结束位置 */
}

/* 网络背景层 */
#network-bg {
	position: fixed; /* 固定定位 */
	top: 0; /* 顶部定位 */
	left: 0; /* 左侧定位 */
	width: 100%; /* 背景层宽度为100% */
	height: 100%; /* 背景层高度为100% */
	z-index: -1; /* 背景层在页面最底层 */
	background-size: cover; /* 背景图片填充整个容器 */
	background-position: center; /* 背景图片居中 */
	opacity: 0; /* 初始时背景层透明 */
	transition: opacity 1.5s ease-in-out; /* 淡入淡出效果 */
}

/* 加载指示器 */
.loader {
	position: fixed; /* 固定在页面顶部 */
	top: 20px; /* 距离顶部20px */
	right: 20px; /* 距离右侧20px */
	display: flex; /* 垂直布局 */
	flex-direction: column;
	align-items: center;
	gap: 8px; /* 元素间距 */
	z-index: 10; /* 确保加载指示器在背景层之上 */
}

/* 加载指示器中的圆形 */
.spinner {
	width: 40px; /* 圆形大小 */
	height: 40px; /* 圆形大小 */
	border: 4px solid rgba(255, 255, 255, 0.3); /* 边框颜色 */
	border-radius: 50%; /* 圆形 */
	border-top: 4px solid #fff; /* 顶部边框颜色 */
	animation: spin 1s linear infinite; /* 旋转动画 */
}
@keyframes spin {
	0% { transform: rotate(0deg); } /* 初始旋转角度 */
	100% { transform: rotate(360deg); } /* 结束旋转角度 */
}

/* 内容区域 */
.content {
	text-align: center; /* 文本居中 */
	padding: 2.5rem; /* 内边距 */
	max-width: 800px; /* 最大宽度 */
	background: rgba(255, 255, 255, 0.2); /* 背景颜色 */
	border-radius: 20px; /* 圆角 */
	box-shadow: 0 15px 50px ${随机阴影颜色()}; /* 随机阴影颜色 */
	margin: 2rem; /* 外边距 */
	backdrop-filter: blur(1px); /* 模糊效果 */
	border: 1px solid rgba(255, 255, 255, 0.25); /* 边框颜色 */
}

/* 渐变字体 */
.bg-text, h1, .status, .loader-text, p, span, .toast, .runtime {
	background:
		-webkit-linear-gradient(-45deg, var(--gradient-text-color)); /* 使用Webkit前缀的线性渐变 */
		-moz-linear-gradient(-45deg, var(--gradient-text-color)); /* 使用Moz前缀的线性渐变 */
		-ms-linear-gradient(-45deg, var(--gradient-text-color)); /* 使用MS前缀的线性渐变 */
		-linear-gradient(-45deg, var(--gradient-text-color)); /* 使用线性渐变 */
	background-size: 200% 100%; /* 背景大小为200% 100% */
	background-clip: text; /* 背景剪切为文本 */
	-webkit-background-clip: text; /* Webkit前缀的背景剪切为文本 */
	-webkit-text-fill-color: transparent; /* Webkit前缀的文本填充为透明 */
	text-fill-color: transparent; /* 文本填充为透明 */
	color: transparent; /* 文本颜色透明 */
	animation: gradientAnimation 3s linear infinite; /* 动画效果 */
	-moz-animation: gradientAnimation 3s linear infinite; /* Moz前缀的动画效果 */
	-ms-animation: gradientAnimation 3s linear infinite; /* MS前缀的动画效果 */
	-webkit-animation: gradientAnimation 3s linear infinite; /* Webkit前缀的动画效果 */
	-webkit-background-clip: text; /* Webkit前缀的背景剪切为文本 */
	-webkit-text-fill-color: transparent; /* Webkit前缀的文本颜色透明 */
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 文本阴影效果 */
}
/* 渐变字体动画 */
@keyframes gradientAnimation {
	0% { background-position: 100% 100%; } /* 渐变开始位置 */
	100% { background-position: -100% -100%; } /* 渐变结束位置 */
}

/* 呼吸灯效果 */
.logo, .custom-loader {
	animation: 2s ease 0s infinite alternate none running pulse; /* 呼吸灯效果 */
}
@keyframes pulse {
	50% { opacity: .5; } /* 50%时透明度为0.5 */
}

p {
	font-size: 1.2rem; /* 字体大小 */
	line-height: 1.5; /* 行高 */
}

.features {
	display: flex; /* 弹性布局 */
	flex-wrap: wrap; /* 换行 */
	justify-content: center; /* 居中对齐 */
	gap: 1.5rem; /* 元素之间的间距 */
	margin: 2.5rem 0; /* 块级元素的上下间距 */
}

.feature-card {
	background: rgba(255, 255, 255, 0.2); /* 背景色 */
	padding: 1.8rem 1.5rem; /* 内间距 */
	border-radius: 16px; /* 圆角 */
	box-shadow: 0 15px 50px ${随机阴影颜色()}; /* 随机阴影颜色 */
	width: 220px; /* 宽度 */
	transition: all 0.4s ease; /* 过渡效果 */
	border: 1px solid rgba(255, 255, 255, 0.2); /* 边框 */
}
.feature-card:hover {
	transform: translateY(-10px); /* 鼠标悬停时向上移动 */
	background: rgba(255, 255, 255, 0.3); /* 鼠标悬停时背景色 */
	box-shadow: 0 15px 50px ${随机阴影颜色()}; /* 随机阴影颜色 */
}

/* 加载背景按钮样式 */
.controls {
	display: flex; /* 水平居中 */
	gap: 15px; /* 元素间距 */
	margin-top: 1.5rem; /* 间隔 */
}
.btn {
	padding: 12px 25px; /* 按钮大小 */
	border-radius: 50px; /* 按钮圆角 */
	background: rgba(255, 255, 255, 0.25); /* 按钮背景色 */
	border: none; /* 边框 */
	font-size: 1rem; /* 字体大小 */
	font-weight: 600; /* 字体加粗 */
	cursor: pointer; /* 鼠标悬停时改变样式 */
	transition: all 0.3s ease; /* 过渡效果 */
	backdrop-filter: blur(5px); /* 模糊效果 */
	border: 1px solid rgba(255, 255, 255, 0.3); /* 边框颜色 */
}
.btn:hover {
	background: rgba(255, 255, 255, 0.4); /* 鼠标悬停时的背景色 */
	transform: translateY(-3px); /* 鼠标悬停时的位移效果 */
	box-shadow: 0 15px 50px ${随机阴影颜色()}; /* 随机阴影颜色 */
}

/* 时间信息 */
.runtime {
	position: fixed; /* 固定定位 */
	bottom: 0; /* 底部对齐 */
	left: 0; /* 左侧对齐 */
	right: 0; /* 宽度全屏 */
	text-align: center; /* 文本居中 */
	z-index: 10; /* 确保在最上层 */
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.overlay {
	position: fixed; /* 固定定位 */
	top: 0; /* 顶部对齐 */
	left: 0; /* 左侧对齐 */
	right: 0; /* 右侧对齐 */
	bottom: 0; /* 底部对齐 */
	display: flex; /* 弹性布局 */
	justify-content: center; /* 居中对齐 */
	align-items: center; /* 居中对齐 */
	z-index: 1000; /* 确保在最上层 */
	opacity: 1; /* 透明度 */
	visibility: visible; /* 可见性 */
	transition: opacity 0.5s ease, visibility 0.5s 0.5s; /* 过渡效果 */
	backdrop-filter: blur(5px); /* 模糊效果 */
}

.custom-loader {
	width: 350px; /* 宽度 */
	height: 350px; /* 高度 */
	background: url('//upload-bbs.miyoushe.com/upload/2022/03/19/258229537/9c3e6fadeb3fbeac561d7962f6ea1277_1704565506932287977.png') no-repeat center center; /* 背景图片 */
	background-size: contain; /* 背景图片大小 */
}

/* 手机端样式 */
@media (max-width: 768px) {
	h1 { font-size: 2.5rem; } /* 标题字体大小 */
	.content { padding: 1.8rem; margin: 1.2rem; } /* 内容区域内边距和外边距 */
	.features { flex-direction: column; align-items: center; } /* 特性卡片垂直排列 */
}
`);


// 添加id和class
/**
 * 创建一个新元素并添加到文档中
 * @param {string} id - 要设置的元素ID (可选)
 * @param {string} tag - 要创建的元素类型 (如'div', 'span', 'p'等)
 * @param {HTMLElement} parent - 父元素，默认为document.body (可选)
 * @param {boolean} hid - 是否隐藏控制台输出 (可选)
 * @return {Array} 返回新创建的元素和ID的数组 [element, id]
 */
function 设置元素(id, tag, parent = document.body, hid = true) {
	const element = document.createElement(tag); // 根据传入的元素类型创建新元素

	if (!parent) parent = document.body
	if (!id) id = Math.random().toString(36).substr(2, 9) + '-' + Date.now(); // 如果没有传入ID，则生成一个唯一的ID

	element.id = id; // 为元素设置ID属性
	element.className = id; // 为元素设置class属性
	// element.classList.add(id); // 添加class属性
	// element.classList.remove(id); // 移除class属性
	parent.appendChild(element); // 将新创建的元素添加到文档body的末尾
	if (hid){
		console.log(`%c 已添加${tag}元素：${id}`, "color: green"); // 在控制台输出已添加元素的ID
	}
	return [element, id]; // 返回一个数组，包含新创建的元素和ID
}

// 设置文本内容
/**
 * 设置指定元素的文本内容
 * @param {string} id - 元素的ID或类名
 * @param {string} text - 要设置的文本内容 (默认为空字符串)
 * @return {HTMLElement} 返回设置文本后的元素
 */
function 设置文本内容(id, text = '') {
	// 通过ID获取元素，如果找不到则尝试通过类名获取
	const element = document.getElementById(id) || document.querySelector(`.${id}`); // 获取指定ID或类名的元素
	if (!element) {
		console.error(`%c 元素 ${id} 不存在`, "color: red"); // 如果元素不存在，则输出错误信息
		return; // 如果元素不存在，则输出错误信息并返回
	}
	element.innerHTML = text; // 将传入的文本内容设置为元素的文本内容
	return element;
}

// 页面加载中执行
document.addEventListener("DOMContentLoaded", function() {
	console.log("文档内容加载中");

	// 渐变背景
	设置元素('gradient-bg', 'div');

	// 网络背景
	设置元素('network-bg', 'div');

	// 运行时间显示
	设置元素('runtime', 'div');

	// 右上角的加载指示器
	const loader = 设置元素('loader', 'div')[0];
	设置元素('spinner', 'div', loader);
	设置文本内容(设置元素('loader-text', 'div', loader)[1], '加载背景中...');

	// 内容区域
	const content = 设置元素('content', 'div')[0];
	设置元素('logo', 'img', content)[0].src = logo; // 设置内容区域的图片
	设置文本内容(设置元素('', 'h1', content)[1], '渐变效果与背景加载');
	设置元素('hitokoto', 'p', content); // 创建一个p元素，用于显示 语录/一言
	设置文本内容(设置元素('', 'p', content)[1], '这个页面展示了渐变字体效果、渐变背景效果，并实现了优先显示网络加载背景的功能。内容区域使用<code>backdrop-filter: blur(1px)</code>实现了高级玻璃态效果。');

	const features = 设置元素('features', 'div', content)[0];
	const featureCard1 = 设置元素('feature-card', 'div', features)[0];
	设置文本内容(设置元素('', 'h3', featureCard1)[1], '渐变字体');
	设置文本内容(设置元素('', 'p', featureCard1)[1], '使用CSS渐变背景结合背景裁剪技术，创建出多彩的文本效果');
	const featureCard2 = 设置元素('feature-card', 'div', features)[0];
	设置文本内容(设置元素('', 'h3', featureCard2)[1], '渐变背景');
	设置文本内容(设置元素('', 'p', featureCard2)[1], '全屏动态渐变背景，使用CSS动画实现平滑的色彩过渡效果');
	const featureCard3 = 设置元素('feature-card', 'div', features)[0];
	设置文本内容(设置元素('', 'h3', featureCard3)[1], '网络背景');
	设置文本内容(设置元素('', 'p', featureCard3)[1], '优先加载并显示渐变背景，网络背景加载成功后平滑过渡显示');

	设置文本内容(设置元素('', 'p', content)[1], '在页面加载过程中，您会首先看到动态渐变背景，同时系统在后台加载网络图片。当图片加载完成后，会平滑过渡到网络背景。');
	设置元素('ip-info', 'p', content);

	设置元素('custom-loader', 'div', 设置元素('overlay', 'div')[0]); // 加载中

	const controls = 设置元素('controls', 'div', content)[0];
	设置文本内容(设置元素('btn', 'button', controls)[1], '加载背景').id = 'reload-btn';

	setTimeout(function() { // 关闭等待图
		const overlay = document.getElementById('overlay');
		overlay.style.opacity = 0;
		overlay.style.visibility = 'hidden';
		console.log(`关闭等待图`);
	}, 2000);

	console.log("文档内容加载完成");
});

// 加载网络背景函数
function NetworkBackground() {
	const networkBg = document.getElementById("network-bg");
	const loader = document.querySelector(".loader");
	const reloadBtn = document.getElementById("reload-btn");

	// 图片URL数组
	const imageUrls = [
		'//api.rls.ovh/adaptive',
		'//t.alcy.cc/ycy',
		'//image.anosu.top/pixiv',
		'//moe.jitsu.top/img',
		'//www.loliapi.com/acg/'
	];

	const pc = [
		'//api.mmp.cc/api/pcwallpaper?category=cartoon&type=jpg',
		'//wp.upx8.com/api.php?content=动漫',
		'//cdn.seovx.com/?mom=302',
		'//api.mtyqx.cn/tapi/random.php',
		'//api.btstu.cn/sjbz/api.php'
	]

	// 当前图片索引
	let currentImageIndex = 0;

	// 加载网络背景
	function loadNetworkBackground() {
		loader.style.display = "flex"; // 显示加载指示器

		// 选择下一张图片
		currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
		const imageUrl = imageUrls[currentImageIndex] ;
		console.log(`%c 加载网络背景：${imageUrl}`, "color: blue");

		// 创建Image对象预加载
		const img = new Image();
		img.src = imageUrl;

		// 图片加载成功时
		img.onload = function () {
			// 设置网络背景
			networkBg.style.backgroundImage = `url(${imageUrl})`;

			networkBg.style.opacity = "1";
			loader.style.display = "none";
			const overlay = document.getElementById('overlay');
			overlay.style.opacity = 0;
			overlay.style.visibility = 'hidden';
			toast("网络背景加载成功");
		};

		// 图片加载失败时
		img.onerror = function () {
			loader.style.display = "none";
			toast("网络背景加载失败");
			networkBg.style.opacity = "1";
		};
	}

	// 初始加载
	loadNetworkBackground();

	// 重新加载按钮事件
	reloadBtn.addEventListener("click", function () {
		// networkBg.style.opacity = "0"; // 隐藏网络背景
		// document.documentElement.style.setProperty('--gradient-text-color', 随机颜色闭环(5,2));
		setTimeout(loadNetworkBackground, 500);
	});
}

// 加载ip地址
async function infoIP() {
	var urls = [
		'//eth0.me',
		'//90.151.171.106/ip.php',
		'//checkip.amazonaws.com',
		'//v4.ident.me',
		'//freeze.na4u.ru/ip.php',
		'//ip.bablosoft.com',
		'//fingerprints.bablosoft.com/ip',
		'//api.ipify.org',
		'//web.realsysadm.in',
		'//ipwho.is',
		'//ip-api.com/json/?lang=zh-CN',
		'//api.ipify.org/?format=json',
		'//ip.skk.moe/simple',
		'//ping0.cc/geo/jsonp',
		'//api.ipapi.is',
		'//ipapi.co/json',
	];

	for (var url of urls) {
		try {
			console.log(`%c 加载IP信息：${url}`, "color: blue");
			var controller = new AbortController();
			var signal = controller.signal;
			// 设置超时定时器
			var timeoutId = setTimeout(() => {
				controller.abort();
			}, 10000);

			var response = await fetch(url, { signal });
			// 请求成功后清除定时器
			clearTimeout(timeoutId);

			var data = await response.text();
			var i = document.getElementById("ip-info")
			i.innerHTML = data;
			i.style.display = 'block';
			break;
		} catch (error) {
			if (error.name === 'AbortError') {
				console.warn(`%c 请求IP超时：${error.message}`, "color: orange");
			} else {
				console.error(`%c 请求IP失败：${error}`, "color: red");
			}
		}
	}
} infoIP();

async function 语录() {
	var urls = [
		'//v1.jinrishici.com/all.txt',
		'//v1.hitokoto.cn/?encode=json',
		'//api.suol.cc/v1/zs_yulu.php?type=经典',
		'//api.codelife.cc/yiyan/random?lang=cn'
	]

	for (var url of urls) {
		console.log(`%c 加载语录：${url}`, "color: blue");
		try {
			var controller = new AbortController();
			var signal = controller.signal;
			// 设置超时定时器
			var timeoutId = setTimeout(() => {
				controller.abort();
			}, 5000);

			var response = await fetch(url, { signal });
			// 请求成功后清除定时器
			clearTimeout(timeoutId);

			var data = await response.text(); // 获取响应文本
			try {
				const jsonData = JSON.parse(data); // 尝试将数据转换为 JSON
				data = jsonData.text || jsonData.hitokoto || jsonData.data?.hitokoto;
			} catch (error) {}

			设置文本内容('hitokoto', data); // 设置hitokoto元素的文本内容

			break;
		} catch (error) {
			if (error.name === 'AbortError') {
				console.warn(`%c 请求语录超时：${error.message}`, "color: orange");
			} else {
				console.error(`%c 请求语录失败：${error}`, "color: red");
			}
		}
	}
} 语录();

/**
 * 显示toast提示
 * @param {string} message - 要显示的消息
 * @param {number} duration - 显示时长，默认为3秒
 */
function toast(message, duration = 3) {
	duration = duration * 1000; // 将秒转换为毫秒
	const toast = 设置文本内容(设置元素('', 'div')[1], message); // 创建toast元素并设置文本内容
	toast.className = 'toast';
	toast.style = `
	position: fixed; /* 固定位置 */
	left: 50%; /* 水平居中 */
	bottom: 20px; /* 距离底部20px */
	transform: translateX(-50%); /* 垂直居中 */
	box-shadow: 0 15px 50px ${随机阴影颜色()}; /* 随机阴影颜色 */
	padding: 12px 25px; /* 内边距 */
	border-radius: 30px; /* 圆角 */
	font-size: 1rem; /* 字体大小 */
	transition: all 0.4s ease; /* 过渡效果 */
	backdrop-filter: blur(1.5px); /* 模糊效果 */
	display: flex; /* 水平居中 */
	align-items: center; /* 垂直居中 */
	gap: 10px; /* 元素间距 */
	z-index: 10; /* 层级 */
	`;

		// 点击立即关闭
	toast.addEventListener('click', () => {
		toast.remove();
	});

	setTimeout(() => {
		toast.remove(); // 在指定时间后移除toast元素
	}, duration + 500); // 加上500毫秒的延迟，确保动画效果完成
}

// 运行时间显示
function createUTCDate(dateString) {
	const [year, month, day] = dateString.split("-").map(Number);
	const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
	return date;
}
function formatTimeUnit(unit) {
	return unit.toString().padStart(2, "0");
}
function 运行时间() {
	const startDate = createUTCDate("2025-12-11");
	const now = new Date();

	// 计算时间差（毫秒）
	const timeDiff = now - startDate;

	// 计算各个时间单位
	const seconds = formatTimeUnit(Math.floor(timeDiff / 1000) % 60);
	const minutes = formatTimeUnit(Math.floor(timeDiff / (1000 * 60)) % 60);
	const hours = formatTimeUnit(Math.floor(timeDiff / (1000 * 60 * 60)) % 24);
	const days = formatTimeUnit(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

	// 更新完整字符串
	设置文本内容('runtime', `已运行：${days}天 ${hours}时 ${minutes}分 ${seconds}秒`);
} 运行时间(); setInterval(运行时间, 1000);

// 点击效果
function 点击动画() {
	let clickCount = 0;
	var hearts = ["❤", "你好"];
	window.onclick = function (event) {
		const heart = 设置元素('', 'div', '', false)[0];

		heart.innerHTML = hearts[clickCount];
		clickCount = (clickCount + 1) % hearts.length;
		heart.style.cssText = "position: fixed; left:-100%;";

		var 字体大小 = 15, // 字体大小
			横坐标 = event.clientX - 字体大小 / 2, // 横坐标
			纵坐标 = event.clientY - 字体大小, // 纵坐标
			颜色 = 随机颜色(), // 随机颜色
			透明度 = 1, // 透明度
			放大缩小 = 0.8; // 放大缩小

		var timer = setInterval(function () {
			if (透明度 <= 0) {
				document.body.removeChild(heart);
				clearInterval(timer);
			} else {
				heart.style.cssText = `
				font-size:16px;
				cursor: default;
				position: fixed;
				color: ${颜色};
				left: ${横坐标}px;
				top: ${纵坐标}px;
				opacity: ${透明度};
				transform:scale(${放大缩小});
				z-index: 9999;`;
				纵坐标--;
				透明度 -= 0.016;
				放大缩小 += 0.002;
			}
		}, 15)
	}
} 点击动画();
