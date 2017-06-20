var $sportNav = $('#sport-nav');

var $navActive = $sportNav.find('.nav-active');
var $navIndex = $sportNav.find('#nav-index');
var $navBox = $sportNav.find('.nav-box');
var $smallNav = $sportNav.find('.small-nav');

var $navActive2 = $navActive.find('.active2');
var $sNavBox = $smallNav.find('.small-nav-box');
var $moveRight = $navBox.find('.nav-move-right');
var $moveLeft = $sportNav.find('.nav-move-left');
var $itemLeft = $navBox.find('.item-left');
var $itemRight = $navBox.find('.item-right');
var $itemThree = $navBox.find('.item-three');
var $nvaLis = $navBox.find('.nav-item li');
var $navLiAs = $navBox.find('.nav-item li a');
console.log($navLiAs.eq(1).html());
/*移动光标*/
(function () {
    $navLiAs.each(function (index, item) {
        var curLeft = $(item).offset().left + 20;
        if (index == 0) {
            $navActive2.css({width: $(item).offsetParent().width() - 8});
            $navActive.css({left: curLeft});
            $navIndex.css({width: curLeft});
        }
        $(item).on('mouseenter', function () {
            /*console.log($navLiAs.index(item));*/
            if ($navLiAs.index(item)) {
                $navLiAs.eq(0).addClass('bor-bottom');
            }
            $navActive2.stop().animate({width: $(item).offsetParent().width() - 8}, 300);
            $navActive.stop().animate({left: curLeft}, 300);
            $navIndex.stop().animate({width: curLeft}, 300);
            var index = $(item).attr('index');
            $sNavBox
                .css({display: 'none'})
                .filter('[index=' + index + ']')
                .parent()
                .stop()
                .animate({height: 44}, 200)
                .end()
                .filter('[index=' + index + ']')
                .css({display: 'block'});
            if (!($(item).attr('index'))) {
                $smallNav.stop().animate({height: 0}, 200)
            }
        });
    })
})();
/*调整位置*/
(function () {
    $smallNav.find('ul').each(function (index, item) {
        $smallNav.find('ul').eq(0).css({left: $navLiAs.eq(0).offset().left - $navActive2.width()});
        if (index) {
            var index1 = $(item).attr('index');
            $(item).css({
                left: $navLiAs.filter('[index=' + index1 + ']').offset().left + 20,
                marginLeft: -$(item).width() / 2
            })
        }
    })
})();
/*导航左右箭头*/
(function () {
    $moveLeft.on('click', function () {
        $moveRight.css({display: 'block'});
        $(this).css({display: 'none'});
        $itemLeft.animate({right: '100%'}, 100);
        $itemRight.animate({left: '130px'}, 100);
        $itemThree.animate({left: '48%'}, 100);
    })
})();



