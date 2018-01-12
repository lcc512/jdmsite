window.onload = function () {
    // 左侧滑动
    iscrollLeft();
    iscrollRight();
    // rightSwipe();
    // 右侧滑动
    leftClick();
};

// 原始方法
// var leftSwipe = function() {

//     // 实现上下的滑动
//     var parentBox = document.querySelector('.cate-left');

//     var childBox = parentBox.querySelector('ul');

//     var startY = 0;
//     var distanceY = 0;
//     // 上一次滑动到哪个位置，这一次从哪个位置开始。
//     var currentY = 0;

//     childBox.addEventListener('touchstart', function(e) {
//         startY = e.touches[0].clientY;
//     });

//     childBox.addEventListener('touchmove', function(e) {


//         var moveY = e.touches[0].clientY;
//         distanceY = moveY - startY;


//         var translateY = currentY + distanceY;


//         childBox.style.transform = 'translateY(' + translateY + 'px)';
//         childBox.style.webkitTransform = 'tranlateY(' + translateY + 'px)'


//     });
//     childBox.addEventListener('touchend', function(e) {

//         currentY = currentY + distanceY;


//     });

// };
// 使用iscroll 插件
// 在谷歌的模拟器下失效
var iscrollLeft = function () {

    new IScroll(document.querySelector('.cate-left'));

};
var iscrollRight = function () {

    new IScroll(document.querySelector('.cate-right'));


};


var leftClick = function () {
    var itemli = document.querySelectorAll(".cate-left ul li");

    for (var i = 0; i < itemli.length; i++) {
        itemli[i].onclick = function () {

            for (var i = 0; i < itemli.length; i++) {

                itemli[i].classList.remove("now");

            }

            this.classList.add("now");
        }
    }

};