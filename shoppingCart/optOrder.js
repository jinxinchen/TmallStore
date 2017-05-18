$(function(){
	//单选
	$(".cartProductItemIfSelected").click(function(){
		var selectit = $(this).attr("selectit");
		if(selectit == "selectit"){
			$(this).attr("src","../img/site/cartNotSelected.png");
	        $(this).attr("selectit","false")
	        $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
		}else{
			$(this).attr("src","../img/site/cartSelected.png");
	        $(this).attr("selectit","selectit")
	        $(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
		}
		syncSelect();
		syncCreateOrderButton();
		calcCartSumPriceAndNumber();
	});
	//全选
	$(".selectAllItem").click(function(){
		var selectit = $(this).attr("selectit");
		if(selectit == "selectit"){
			$(".selectAllItem").attr("src","../img/site/cartNotSelected.png");
			$(".selectAllItem").attr("selectit","false");
			$(".cartProductItemIfSelected").each(function(){
				$(this).attr("src","../img/site/cartNotSelected.png");
	            $(this).attr("selectit","false");
	            // $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
	            $(".cartProductItemTR").css("background-color","#fff");
			});
		}else{
			$("img.selectAllItem").attr("src","../img/site/cartSelected.png");
	        $("img.selectAllItem").attr("selectit","selectit")
	        $(".cartProductItemIfSelected").each(function(){
	            $(this).attr("src","../img/site/cartSelected.png");
	            $(this).attr("selectit","selectit");
	            // $(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
	            $(".cartProductItemTR").css("background-color","#FFF8E1");
        	});      
		}
		syncCreateOrderButton();
    	calcCartSumPriceAndNumber();
	});

	// +
	$(".numberPlus").click(function(){
		var pid=$(this).attr("pid");
        var stock= $("span.orderItemStock[pid="+pid+"]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num= $(".orderItemNumberSetting[pid="+pid+"]").val();
        num++;
        if(num>stock)
            num = stock;
        $(".orderItemNumberSetting[pid="+pid+"]").val(num);
        syncPrice(pid,num,price);
    });

	// -
	$(".numberMinus").click(function(){
		var pid = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price = $(".orderItemPromotePrice[pid="+pid+"]").text();
		var num = $(".orderItemNumberSetting[pid="+pid+"]").val();
		--num;
		if(num<=0){
			num=1;
		}
		syncPrice(pid,num,price);
	});

	//直接修改数量
	$(".orderItemNumberSetting").keyup(function(){
		var pid = $(this).attr("pid");
		var stock = $(".orderItemStock[pid="+pid+"]").text();
		var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num = $(".orderItemNumberSetting[pid="+pid+"]").val();
		num = parseInt(num);
		if(isNaN(num))
			num = 1;
		if(num<=0)
			num = 1;
		if(num>stock)
			num = stock;
		syncPrice(pid,num,price);
	});

	//删除
	$(".deleteOrderItem").click(function(){
		var oiid = $(this).attr("oiid");
		var pid = $(".orderItemNumberSetting[oiid="+oiid+"]").attr("pid");
		$(".cartProductItemTR[oiid="+oiid+"]").css("display","none");
		syncPrice(pid,0,0);
	});
})
function syncPrice(pid,num,price){
	$(".orderItemNumberSetting[pid="+pid+"]").val(num);
	var cartProductItemSmallSumPrice = formatMoney(num*price);
	$(".cartProductItemSmallSumPrice[pid="+pid+"]").html("￥"+cartProductItemSmallSumPrice);
	calcCartSumPriceAndNumber();
}

function formatMoney(num){
	num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
        num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}

//判断是否有商品被选中，只要有任意商品被选中了，就把结算按钮的颜色变为天猫红，并且是可点击状态，否则就是灰色，并且无法点击
function syncCreateOrderButton(){
	var selectAny = false;
	$(".cartProductItemIfSelected").each(function(){
		if("selectit"==$(this).attr("selectit")){
            selectAny = true;
        }
	});
	if(selectAny){
		$("button.createOrderButton").css("background-color","#C40000");
        $("button.createOrderButton").removeAttr("disabled");
	}else{
		$("button.createOrderButton").css("background-color","#AAAAAA");
        $("button.createOrderButton").attr("disabled","disabled");
	}
}

//同步"全选"状态。
function syncSelect(){
	var selectAll = true;
	$(".cartProductItemIfSelected").each(function(){
		if("false" == $(this).attr("selectit")){
			selectAll = false;
		}
	});
	if(selectAll){
		$("img.selectAllItem").attr("src","../img/site/cartSelected.png");
	}else{
		$("img.selectAllItem").attr("src","../img/site/cartNotSelected.png");
	}
}

//显示被选中的商品总数，以及总价格
function calcCartSumPriceAndNumber(){
	var sum = 0;
	var totalNumber = 0;
	$(".cartProductItemIfSelected[selectit='selectit']").each(function(){
		var oiid = $(this).attr("oiid");
		var price = $(".cartProductItemSmallSumPrice[oiid="+oiid+"]").text();
		price = price.replace(/,/g,"");  //去掉全部的逗号
		price = price.replace(/￥/g,""); //去掉全部的￥
		sum += new Number(price);
		var num = $(".orderItemNumberSetting[oiid="+oiid+"]").val();
		totalNumber += new Number(num);
	});
	$(".cartSumPrice").html("￥"+formatMoney(sum));
	$(".cartTitlePrice").html("￥"+formatMoney(sum));
	$(".cartSumNumber").html(totalNumber);
}