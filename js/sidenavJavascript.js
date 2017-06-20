var $sideNav = $('#side-nav');
var $sideNavLis = $sideNav.find('li:lt(11)');
$sideNavLis.each(function (index, item) {
    $(item).on('click',function () {
        $(item).siblings('li').removeClass('active').end().addClass('active')
    });
    $(item).on('mouseover', function () {
        $(this).find('span').addClass('side-img-hover').css({display:'inline'})
    });
    $(item).on('mouseout',function () {
        $(this).find('span').removeClass('side-img-hover').css({display:'none'})
    })
});

