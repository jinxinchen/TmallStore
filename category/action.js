function showProductsAsideCategorys(cid){
	$(".eachCategory[cid="+cid+"]").css("background-color","white");
	$(".eachCategory[cid="+cid+"] a").css("color","#000");
	$(".productsAsideCategorys[cid="+cid+"]").show();	
}
function hideProductsAsideCategorys(cid){
	$(".eachCategory[cid="+cid+"]").css("background-color","#e2e2e3");
	$(".eachCategory[cid="+cid+"] a").css("color","#000");
	$(".productsAsideCategorys[cid="+cid+"]").hide();
}
$(function(){
	$(".eachCategory").mouseenter(function(){
		var cid = $(this).attr("cid");
		showProductsAsideCategorys(cid);
	});
	$(".eachCategory").mouseleave(function(){
		var cid = $(this).attr("cid");
        hideProductsAsideCategorys(cid);
	});
	$(".productsAsideCategorys").mouseenter(function(){
    	var cid = $(this).attr("cid");
    	showProductsAsideCategorys(cid);
    });
    $(".productsAsideCategorys").mouseleave(function(){
    	var cid = $(this).attr("cid");
    	hideProductsAsideCategorys(cid);
    });
    $(".productsAsideCategorys div.row a").each(function(){
        var v = Math.round(Math.random() *6);
        if(v == 1)
            $(this).css("color","#87CEFA");
    });
});
