$(function(){
	$(".rightMenu span").mouseenter(function(){
		var left = $(this).position().left;
		var top = $(this).position().top;
		var width = $(this).css("width");
		var destLeft = parseInt(left) + parseInt(width)/2;
        $("#catear").css("left",destLeft);
        $("#catear").css("top",top+30);
        $("#catear").fadeIn(500);
	});
	$(".rightMenu span").mouseleave(function(){
		$("#catear").hide();
	});
})