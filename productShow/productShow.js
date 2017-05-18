$(function(){
	//看图
	$("img.smallImage").mouseenter(function(){
		var bigImageURL = $(this).attr("bigImageURL");
        $("img.bigImg").attr("src",bigImageURL);
	});

	/*在大图片加载好之后，根据每个小图片的bigImageURL ，创建一个Image对象，然后把这个image对象的src属性，设置为bigImageURL。 当这个img对象加载完毕之后，再放到被隐藏的div.img4load中，从而达到预加载的效果。*/
	$("img.bigImg").load(function(){
		$("img.smallImage").each(function(){
			var bigImageURL = $(this).attr("bigImageURL");
			img = new Image();
			img.src = bigImageURL;
			img.onload = function(){
				$("div.img4load").append($(img));
			}
		})
	})

	//调数量
	var stock = 66;
	$(".productNumberSetting").keyup(function(){
		var num = $(".productNumberSetting").val();
		num = parseInt(num);
		if(isNaN(num)){
			num = 1;
		}
		if(num<0){
			num = 1;
		}
		if(num>stock){
			num = stock;
		}
		$(".productNumberSetting").val(num);
	});

	$(".increaseNumber").click(function(){
		var num = $(".productNumberSetting").val();
		num++;
		if(num>stock){
			num = stock;
		}
		$(".productNumberSetting").val(num);
	});
	
	 $(".decreaseNumber").click(function(){
        var num= $(".productNumberSetting").val();
        --num;
        if(num<=0)
            num=1;
        $(".productNumberSetting").val(num);
    });
})