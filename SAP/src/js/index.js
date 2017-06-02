//轮播图
var mySwiper = new Swiper('.swiper-container01', {
    autoplay: 5000, //可选选项，自动滑动
    speed: 300,
    slidesPerView: 3,
    slidesPerGroup: 3,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    spaceBetween : 20,
})
//轮播图
var mySwiper = new Swiper('.swiper-container02', {
    autoplay: 5000, //可选选项，自动滑动
    speed: 400,
    slidesPerView: 2,
    slidesPerGroup: 2,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    spaceBetween : 20,
})

//轮播图
var mySwiper = new Swiper('.swiper-container03', {
    autoplay: 5000, //可选选项，自动滑动
    speed: 600,
    slidesPerView: 2,
    slidesPerGroup: 2,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    spaceBetween : 20,
})

// 视频设置
$(".playBtn").each(function(idx,ele){
    $(ele).click(function(){
        $("video").each(function(idx,ele){
            if(!ele.paused){
                $(ele).removeAttr("controls");
                ele.load();
                $(ele).siblings(".playBtn").fadeIn();
            }
        });
        $(this).siblings("video")[0].play();
        $(this).fadeOut();
        $(this).siblings("video").attr("controls","controls");
    });
});

// 返回按钮设置
$(window).scroll(()=> {
        if (document.body.scrollTop > 200) {
            $("#GoTop").fadeIn("slow");
        } else {
            $("#GoTop").fadeOut("normal");
        }
});
$("#GoTop").click(function(){
    $("html,body").animate({scrollTop: 0},500); 
});