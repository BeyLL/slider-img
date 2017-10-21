/**
 * Created by "zhangHeng" on 2017/10/21 0021.
 */
$(function () {
    var $banner = $('#banner');
    var $oDiv = $('#banner').children('.select');
    var $left = $('#banner').children('.left');
    var $right = $('#banner').children('.right');
    var $oUl = $('#banner').children('ul');
    var $oImgs = $oDiv.children('img');
    var $oLis = $oUl.children('li');
    var distance = parseFloat($oDiv.css('left'));//这个是图片盒子的left定位
    // console.log(distance);
    var boxW = parseFloat($oDiv.css('width'));
    // console.log(boxW)
    var con = boxW;
    var step = 0;  //这个是记录的第几张图片
    // console.log(boxW);
    var temp = 0;
    temp = setInterval(move, 3000);
    var timer = 0;


    //实现轮播,到达最后一张图片的代码
    function move() {
        // boxW -= 790;
        distance -= 790;
        step++;
        $oLis.each(function () {
            if ($(this).index() === step) {
                $(this).attr('class', 'active');
                $(this).siblings().attr('class', '')
            }
        });

        $oDiv.animate({left: distance}, 'fast');
        if (step === 3) {
            clearInterval(timer);
            clearInterval(temp);
            setTimeout(function () {
                $oDiv.animate({left: 0}, 'fast');
            }, 3000);

            setTimeout(init, 3000)
        }
    }


    //这个是到达最后一张图片的时候所有做的事情
    function init() {
        step = 0;
        if (step === 0) {
            $oLis.first().attr('class', 'active');
            $oLis.first().siblings().attr('class', '')
        }
        boxW = con;
        distance = 0;
        timer++;
        timer = setInterval(move, 3000);
    }

    $banner.mouseover(function () {
        clearInterval(temp);
        clearInterval(timer);

    });
    $banner.mouseleave(function () {
        temp++;
        clearInterval(temp);
        distance = parseFloat($(this).css('left'));
        temp = setInterval(move, 3000)

    });
    //操作的是左侧按钮
    $left.click(function () {
        distance = parseFloat($oDiv.css('left'));
        if (distance === 0) {
            distance = -boxW + 790;
            step = $oLis.length-1;
            $oLis.last().attr('class','active');
            $oLis.last().siblings().attr('class','')

        } else if (distance < 0) {
            distance += 790;
            step--;
            $oLis.each(function(){
                if($(this).index()===step){
                    $(this).attr('class','active');
                    $(this).siblings().attr('class','')
                }
            })
        }

        $oDiv.animate({left: distance}, 'fast');

    });

    //这个是控制右侧的按钮
    $right.click(function () {
        distance = parseFloat($oDiv.css('left'));
        if (distance === -boxW + 790) {
            distance = 0;
            step=0;
            $oLis.first().attr('class','active');
            $oLis.first().siblings().attr('class','')
        } else if (distance <= 0) {
            distance -= 790;
            step++;
            $oLis.each(function(){
                if($(this).index()===step){
                    $(this).attr('class','active');
                    $(this).siblings().attr('class','')
                }

            })
        }
        $oDiv.animate({left: distance}, 'fast')
    });
    //点击分页器
    $oLis.each(function(){
        $(this).click(function(){
            $(this).attr('class','active');
            $(this).siblings().attr('class','');
           step = $(this).index();


        })
    })
});