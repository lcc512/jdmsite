
window.onload=function () {
	// 初始化页面功能
	// 搜索
	search();
	// 轮播图
	banner();
	// 倒计时
	downTime();

}
var search=function () {
	// 页面初始化的时候，距离顶部0，透明度为0
	// 当页面滚动，滚动距离越大，越不透明
	// 超过轮播图距离，保持不变

	var search = document.querySelector('.jd-search-box');
	var banner = document.querySelector('.jd-banner');
	var height = banner.offsetHeight;//获取元素高度
	
	// 监听滚动事件,以滚动就触发
	window.onscroll=function(){
		console.log('0');
		// 获取当前页面滚动的距离
		var top=document.body.scrollTop;//谷歌
		// var top=document.documentElement.scrollTop;//IE
		var opacity= 0;

		if(top>height){
			// 滚动的距离超过了轮播图
			opacity=0.85;
		}
		else{
			// 滚动的距离未超过了轮播图，透明度变化
			opacity = 0.85*(top/height);
		}
		// 设置透明度
		search.style.backgroundColor='rgba(242,48,48,'+opacity+')';
	}


}
var banner=function () {
	
	// 下面的小点也相应的点亮（改变当前样式）
	// 可以手指滑动滚动，（touch事件 监听触摸点坐标改变距离，做位移）
	//且滑动不到一半时回退原来位置，（过渡，位移）
	// 当滑动距离够，跳转上一张or跳转下一张（判断方向，过渡，位移）



	var banner = document.querySelector('.jd-banner');
	// 轮播图宽度
	var width=banner.offsetWidth;
	// 轮播图片容器
	var imageBox=banner.querySelector('ul:first-child');
	var pointBox=banner.querySelector('ul:last-child');
	// 所有的点
	var points=pointBox.querySelectorAll('li');
	
	// 自动滚动，无缝（定时器，过渡，位移）

	// 提取公用的方法
	var addTransition=function(){
		imageBox.style.transition='all 0.2s';
		imageBox.style.webkitTransition='all 0.2s';
	}
	var removeTransition=function(){
		imageBox.style.transition='none';
		imageBox.style.webkitTransition='none';
	}
	var setTranslateX=function(translateX){
		imageBox.style.transform='translateX('+translateX+'px)';//移当前屏幕的宽度
		imageBox.style.webkitTransform='translateX('+translateX+'px)';
	}




	var index = 1;
	var timer= setInterval(function(){
		
		index++;
		// 过渡
		addTransition();
		// 位移
		setTranslateX(-index*width);
		
	},1000);

	// 监听过渡动画结束的这个时间点，过渡事件结束
	imageBox.addEventListener('transitionend',function () {
		if(index>=9){
			// 瞬间定位到第一张
			index=1;
			// 清除过渡,然后定位
			removeTransition();
			setTranslateX(-index*width);
		}
	});
}
var downTime=function () {
	
}