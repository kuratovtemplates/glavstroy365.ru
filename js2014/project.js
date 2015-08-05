
$(document).ready(function() {
	//select
	$('.selectpicker').selectpicker();

	$('#Select-cat_list-div ul.dropdown-menu.selectpicker li').on('click', function () {
    	var selectedValue = $($('select.selectpicker option')[$(this).attr('rel')]).val();
    	console.log(selectedValue);
    	switch (selectedValue) {
		   	case 'Дома':
		      window.location.replace("http://glavstroy365.ru/projects/doma/");
		      //$('#search-form').attr('action', 'http://glavstroy365.ru/projects/doma/');
		      //$('#categoryField').val('doma');
		      break
		   	case 'Бани':
		      window.location.replace("http://glavstroy365.ru/projects/bani/");
		      //$('#search-form').attr('action', 'http://glavstroy365.ru/projects/bani/');
		      //$('#categoryField').val('bani');
		      break
		    case '':
		      window.location.replace("http://glavstroy365.ru/projects/");
		      $('#search-form').attr('action', 'http://glavstroy365.ru/projects/');
		      //$('#categoryField').val('');
		      break

		   default:
		      window.location.replace("http://glavstroy365.ru/projects/");
		      $('#search-form').attr('action', 'http://glavstroy365.ru/projects/');
		      //$('#categoryField').val('bani');
		      break
		}
	});

	
	//Table Sort
	//Add parsers for digit+letters
	$.tablesorter.addParser({ 
	    // set a unique id 
	    id: 'days', 
	    is: function(s) { 
	        // return false so this parser is not auto detected 
	        return false; 
	    }, 
	    format: function(s) { 
	        // format your data for normalization 
	        return parseInt(s,10);
	    }, 
	    // set type, either numeric or text 
	    type: 'numeric' 
	});

	//Add parsers for digit+letters
	$.tablesorter.addParser({ 
	    // set a unique id 
	    id: 'price', 
	    is: function(s) { 
	        // return false so this parser is not auto detected 
	        return false; 
	    }, 
	    format: function(s) { 
	        // format your data for normalization 
	        return parseInt(s,10);
	    }, 
	    // set type, either numeric or text 
	    type: 'numeric' 
	});


	$("#tableRequests").tablesorter({
		headers: { 
            0: {sorter: false}, 
            1: {sorter: false}, 
            2: {sorter: false}, 
            3: {sorter: false}, 
            4: { sorter: "price"}, 
            5: { sorter: false}, 
        },
		sortList: [[4,0]] 
	}); 
	//Table Sort



	$("span.simplecheckbox").click(function(){
		var count = $("#compareLink span").text();
		if ($(this).hasClass("checked")) {
			var hreflink= $("#compareLink").attr("href");
			count++;
			hreflink += $(this).data("requestid")+"|";
			$("#compareLink").attr("href", hreflink);
		} else {
			var hreflink = $("#compareLink").attr("href");
			count--;
			hreflink=hreflink.replace($(this).data("requestid")+"|","");
			$("#compareLink").attr("href", hreflink); 
		}
		$("#compareLink span").text(count);
		$('span.simplecheckbox').popover('destroy')
		if (count>1){
			if ($(this).hasClass("checked")) {
				$(this).popover({
					html: true,
					content: 'Выбрано '+count+' предложения. <a href="'+hreflink+'">Сравнить</a>',
					placement: 'left'
				}).popover('toggle');
			}
		}
	});


	/*Clear cache modal window*/
	$('body').on('hidden.bs.modal', '.modal', function () {
	    $(this).removeData('bs.modal');
	});
	/*Clear cache modal window*/

	$("#thumbs").mCustomScrollbar({
                    scrollButtons:{enable:true},
                    axis:"x",
                    advanced:{autoExpandHorizontalScroll:true},
                    theme:"dark-thick",
                    scrollbarPosition:"outside"
    });


	$("li.thumbnail").click(function(e){
         e.preventDefault();
        $("li.thumbnail").removeClass("active");
        $(this).addClass("active");
        $("#bigmama a").attr( "href", $(this).data("urlfull") ) ;
        /*$("#bigmama img").attr( "src", $(this).data("url") ) ;*/
        var imgsrc = $(this).data("url");
        $("#bigmama img").fadeOut(300, function() {
            $("#bigmama img").attr('src', imgsrc);
        })
        .fadeIn(300);
   });

	/*PRICES*/
	$("#averagePrice").text(function(e){
		var avgPrice =0;
		var sumPrice =0;
		var arrPrice =[];
		$("#tableRequests").find("tr[data-price]").each(function(i){
			if( !isNaN($(this).data("price")) && $(this).data("price")!="")
			{
				sumPrice += parseInt($(this).data("price"), 10);
				arrPrice.push(parseInt($(this).data("price"), 10));
			}
		});
		avgPrice = sumPrice/arrPrice.length>>0;
		arrPrice.sort(function(a, b){return a-b});
		$("#lowestPrice").text(arrPrice[0]);
		$("#highestPrice").text(arrPrice[arrPrice.length-1]);
		return avgPrice+" руб.";
	});

	
	$("#averageTime").text(function(e){
		var avgTime =0;
		var sumTime =0;
		var arrTime =[];
		$("#tableRequests").find("tr[data-time]").each(function(i){
			if( !isNaN($(this).data("time")) && $(this).data("time")!="")
			{
				sumTime += parseInt($(this).data("time"), 10);
				arrTime.push(parseInt($(this).data("time"), 10));
			}
		});
		avgTime = sumTime/arrTime.length>>0;
		arrTime.sort(function(a, b){return a-b});
		return avgTime;
	});
});