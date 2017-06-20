var $content1 = $('#content1');
var $bannerBg0 = $content1.find('.banner-bg0');
var $smallScrImg = $content1.find('.smallpics ul');
var $titleList = $content1.find('.title .titleList');


var $smallImgLis = null;
var $imgs1 = null;
var $imgs2 = null;
var $titleLis = null;
var data = null;
function getData() {
    $.ajax({
        type: 'get',
        url: 'data/data.json',
        async: false,
        cache: false,
        dataType: 'json',
        success: function (res) {
            res.code === 0 ? data = res.src : void 0;
        }
    });
}
function bindData() {
    if (data && data.length) {
        var strImg1 = '', strImg2 = '', strLi = '';
        $.each(data, function (index, item) {
            strImg1 += '<a><img src="" real="' + item.src1 + '"></a>';
            strImg2 += '<li><img src="" real="' + item.src2 + '"></li>';
            strLi += index === 0 ? '<li class="select"><h3><a href="javascript:;">' + data[0].title + '</a></h3></li>' : '<li><h3><a href="javascript:;">' + item.title + '</a></h3></li>';
        });
        $bannerBg0.html(strImg1);
        $smallScrImg.html(strImg2);
        $titleList.html(strLi);
    }
}
function checkImg() {
    $imgs1 = $bannerBg0.find('a img');
    $imgs2 = $smallScrImg.find('li img');
    $smallImgLis = $smallScrImg.find('li');
    $titleLis = $titleList.find('li');
    $imgs1.each(function (index, item) {
        var $tempImg = $('<img>');
        $tempImg.prop('src', $(item).attr('real'));
        $tempImg.on('load', function () {
            $(item).prop('src', $(this).prop('src'));
            if (index === 0) {
                $(item)
                    .css('zIndex', 1)
                    .stop()
                    .animate({opacity: 1}, 300);
            }
        })
    });
    $imgs2.each(function (index, item) {
        var $tempImg = $('<img>');
        $tempImg.prop('src', $(item).attr('real'));
        $tempImg.on('load', function () {
            $(item)
                .prop('src', $(this).prop('src'))
                .stop()
                .animate({opacity: 1}, 300);
            if (index === 0) {
                $smallImgLis
                    .eq(0)
                    .css('bottom', '0');
            }

        })
    })
}

var index = 0;
var timer = window.setInterval(autoMove, 3000);
function autoMove() {
    index++;
    if (index === data.length) {
        index = 0;
    }
    setImg();
}
function setImg() {
    $imgs1.each(function (imgIndex1, item1) {
        $smallImgLis.each(function (indexLi, Li) {
            indexLi === index ? $(Li).css('bottom', '0') : $(Li).css('bottom', '-15px');
        });
        $titleLis.each(function (titleIndex, titleitem) {
            titleIndex === index ? $(titleitem).addClass('select') : $(titleitem).removeClass('select');
        });
        if (imgIndex1 === index) {
            $(item1).css({opacity: 1, zIndex: 1});
            /* .stop()
             .animate({opacity: 1},100, function () {
             $(this).parent().siblings().find('img').stop().animate({opacity:0},100);
             })*/
        } else {
            $(item1).css({zIndex: 0, opacity: 0})
        }
    });
}
function mousemove() {
    $smallScrImg.on('mouseover', function () {
        window.clearInterval(timer);
    }).on('mouseout', function () {
        timer = window.setInterval(autoMove, 3000);
    })
}
function focusAlign() {
    $imgs2.each(function (indexImg, item) {
        $(item).on('mouseenter', function () {
            index = indexImg;
            setImg();
        })
    })
}
window.init = function () {
    getData();
    bindData();
    checkImg();
    focusAlign();
    mousemove();
};
init();
