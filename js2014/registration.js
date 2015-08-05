
function addClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}
  
function removeClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}


function UpdateCheckboxes(regions){
	var str = regions;
	var arr_regions = str.split(", "); 
	for (var i = 0; i <= arr_regions.length-1; i++) {
	  var nameregion = arr_regions[i];
		var span_item = document.querySelector("[data-regionname='"+nameregion+"']");
		addClass(span_item.parentNode, "checked");
		if ($(span_item.parentNode).find(".regioncheckboxgroup").length != 0){
			$(span_item.parentNode).find(".subregions").addClass('in');
		}
	}
}


$(document).ready(function() {

	$('input[rel="tooltip"],a[rel="tooltip"]').tooltip({
		'trigger':'focus', 
		'title': $(this).data("title")
	});


function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

function minus(myArray,toRemove) {
  for( var i =myArray.length - 1; i>=0; i--){
	  for( var j=0; j<toRemove.length; j++){
	    if(myArray[i] === toRemove[j]){
	      myArray.splice(i, 1);
	    }
	  }
	}
    return myArray;
};

	//region functions
	$(".regioncheckboxgroup li span").click(function(){
	  var arr_checked = [];
	  var arr_values = [];
	  if ($("[name='regions_company']").val().length > 0)
	  {
	  arr_values = $("[name='regions_company']").val().split(", ");
	  }
	  
	  $(this).parent().toggleClass('checked');
	  var parent_chacked =  $(this).parent().hasClass('checked');

	  $(this).parent().children( "div.collapse" ).collapse('show');
	  arr_checked.push($(this).data("regionname"));
	  
	  $(this).parent().children( "div" ).find("li").each(function(){
	  	if (parent_chacked) {
	  		$(this).addClass('checked');
	  	} else {
	  		$(this).removeClass('checked');
	  	}
	  	arr_checked.push($(this).children("span").data("regionname"));
	  });

		var arr_newvalues = [];

	  if (parent_chacked) {
	  	if ($(this).parents().eq(4).hasClass('regioncheckboxgroup'))
	  	{
		  	$(this).parents().eq(3).addClass('checked');
		  	arr_checked.push($(this).parents().eq(3).find("span").data("regionname"));
	  	}
	  	arr_newvalues = arrayUnique(arr_values.concat(arr_checked));
	  } else {
			if ($(this).parents().eq(4).hasClass('regioncheckboxgroup'))
	  	{
				if(!$(this).parent().siblings().hasClass('checked')) {
	  			$(this).parents().eq(3).removeClass('checked');
		  		arr_checked.push($(this).parents().eq(3).find("span").data("regionname"));
				}
			}
			arr_newvalues = minus(arr_values, arr_checked);
	  }


	  var subli = arr_newvalues.join(", ");
		$("[name='regions_company']").val(subli);
		console.log($("[name='regions_company']").val());
	  
	});

	$("#RegionsOn").click(function(){
		$(".regions").collapse('show');
		$("[name='regions_company']").val("");
		$(".selected-regions span").empty();
	});
	$("#RegionsOff").click(function(){
		if($(".regions").is(':visible')){
			$(".regions").collapse('hide');
			$("[name='regions_company']").val("Домашний регион");	
			$(".selected-regions span").append("<i>Домашний регион, </i>");
			$(".regioncheckboxgroup li").each(function(){
				if($(this).hasClass('checked')) {
					$(this).toggleClass('checked');
				} 
			});
		}
	});

	

	//select function
	$(function(e){
	  $("#UlOwnerSelect li a").click(function(e){
	    e.preventDefault();
	    $("#OwnerSelect").text($(this).text());
	    $("#OwnerSelect").val($(this).text());
	    $("[name='company_owner']").val($(this).text());
	  });

	  $("#UlFormSelect li a").click(function(e){
	    e.preventDefault();
	    $("#FormSelect").text($(this).text());
	    $("#FormSelect").val($(this).text());
	    $("[name='company_form']").val($(this).text());
	  });
	});
	
	//add phone function
	$(function(e) {
	  var InputsWrapper   = $("#InputsWrapper"); //Input boxes wrapper ID
	  var AddButton       = $("#AddPhone"); //Add button ID

	  
	  $(AddButton).click(function (e)  //on add input button click
	  {
	      $(InputsWrapper).children(":hidden").first().show();
	  return false;
	  });
	  $("body").on("click",".removeclass", function(e){ 
	      $(this).parent('div').hide(); 
	      $(this).prev('input').val("");
	  return false;
	  });
	});
  
/******/
});