//屏幕宽度
var screenWidth = $(window).width();
// 聊天框高度
var chatHeight = $(".content .chat_banner").height();
//live_tab栏切换
$(".live_tab .item").on("click",function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	// 聊天框展示 隐藏
	if(index == 0){
		$(".content .chat_banner").css({
			"display": "block"
		});
	}else{
		$(".content .chat_banner").css({
			"display": "none"
		});
	}
	
	$(".content .content_box").animate({
		left:-index*screenWidth
	},"fast");
});

