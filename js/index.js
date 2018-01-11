window.onload = function () {
    // 初始化页面功能
    // 搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();

};
var search = function () {
    // 页面初始化的时候，距离顶部0，透明度为0
    // 当页面滚动，滚动距离越大，越不透明
    // 超过轮播图距离，保持不变

    var search = document.querySelector('.jd-search-box');
    var banner = document.querySelector('.jd-banner');
    var height = banner.offsetHeight; //获取轮播图元素高度

    // 监听滚动事件,一滚动就触发
    window.onscroll = function () {
        console.log('1');
        // 获取当前页面滚动的距离
        var top = document.body.scrollTop; //谷歌
        // var top=document.documentElement.scrollTop;//IE
        var opacity = 0;

        if (top > height) {
            // 滚动的距离超过了轮播图
            opacity = 0.85;
        } else {
            // 滚动的距离未超过了轮播图，透明度变化
            opacity = 0.85 * (top / height);
        }
        // 设置透明度
        search.style.backgroundColor = 'rgba(242,48,48,' + opacity + ')';
    }


};
// 轮播图滚动
var banner = function () {

    var banner = document.querySelector('.jd-banner');
    // 轮播图宽度
    var width = banner.offsetWidth;
    // 轮播图片容器
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    // 所有的点
    var points = pointBox.querySelectorAll('li');

    // 自动滚动，无缝（定时器，过渡，位移）

    // 提取公用的方法
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)'; //移当前屏幕的宽度
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };

    var index = 1;
    var timer = setInterval(function () {

        index++;
        // 过渡
        addTransition();
        // 位移
        setTranslateX(-index * width);


    }, 3000);

    // 监听 过渡动画结束的这个时间点，过渡事件结束
    // 'transitionend' 过渡结束调用的事件
    // animationend 动画结束事件
    imageBox.addEventListener('transitionend', function () {
        // 无缝自动滚动
        if (index >= 9) {
            // 瞬间定位到第一张
            index = 1;
            // 需要瞬间定位，所以清除 过渡动画
            // 清除过渡,然后定位
            removeTransition();
            setTranslateX(-index * width);
        }
        // 手指滑动
        else if (index <= 0) {

            index = 8;
            removeTransition();
            setTranslateX(-index * width);

        }
        setPoint();
    });

    // 下面的小点也相应的点亮（改变当前样式）
    var setPoint = function () {
        // 小点都把变实心的样式去了，
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        // 需要加的
        points[index - 1].classList.add('now');
    };

    // 可以手指滑动滚动，（touch事件 监听触摸点坐标改变距离，做位移）
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    imageBox.addEventListener('touchstart', function (e) {
        // 记录开始的位置
        console.log(e);
        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        // 将要计算的定位
        var translateX = -index * width + distanceX;
        removeTransition();
        setTranslateX(translateX);

        isMove = true;
        // 清除定时器
        clearInterval(timer);
    });
    imageBox.addEventListener('touchend', function (e) {

        // 滑动事件结束之后判断滑动距离
        if (isMove) {
            //且滑动不到一半时回退原来位置，（过渡，位移）
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            }
            // 当滑动距离够，跳转上一张or跳转下一张（判断方向，过渡，位移）
            else {
                addTransition();

                if (distanceX > 0) {
                    index--;

                } else if (distanceX < 0) {
                    index++;

                }
                setTranslateX(-index * width);
            }
        }
        // 严谨，先清除定时器，再加上定时器
        timer = setInterval(function () {

            index++;
            // 过渡
            addTransition();
            // 位移
            setTranslateX(-index * width);


        }, 3000);

        // 重置参数
        startX = 0;
        distanceX = 0;
        isMove = false;

    });


};


var downTime = function () {

    // var time = 11 * 60 * 60;

    var time = 11;

    var skTime = document.querySelector('.sk-time');

    var spans = skTime.querySelectorAll('span');

    var hour = Math.floor(time / 3600);

    var minute = Math.floor(time % 3600 / 60);

    var second = time % 60;


    var timer = setInterval(function () {


        hour = Math.floor(time / 3600);

        minute = Math.floor(time % 3600 / 60);

        second = time % 60;

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = hour % 10;

        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = minute % 10;

        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = second % 10;

        time--;

        if (time < 0) {
            clearInterval(timer);
            skTime.style.backgroundColor = "red";
        }


    }, 1000);


};