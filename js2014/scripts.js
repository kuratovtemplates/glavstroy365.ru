
$(document).ready(function() {


	/*Clear cache modal window*/
	$('body').on('hidden.bs.modal', '.modal', function () {
	    $(this).removeData('bs.modal');
	});
	/*Clear cache modal window*/
	
//jQuery.noConflict();
	//select
	if ($(".selectpicker")[0]){
		$('.selectpicker').selectpicker();
	}

	if ($("[rel='tooltip']")[0]){
		$('[rel="tooltip"]').tooltip({
			'trigger':'hover', 
			'title': $(this).data("title")
		});
	}

		$('i').tooltip({
			'trigger':'hover', 
			'title': $(this).data("title")
		});

	$('a[data-hover=dropdown]').click(function(){
		window.location.href = $(this).attr('href');
	});

	$("#ulradioButton li").click(function(e){
	  e.preventDefault();
	  $("input#requset_users_typebuilding").val($(this).data("value"));
	  $("#ulradioButton li").each(function(){$(this).removeClass( "activeradio" )});
	  $(this).addClass( "activeradio" );
	});

	$(".radiogroup li").click(function(e){
	  e.preventDefault();
	  $(this).parent().children().each(function(){$(this).removeClass( "checked" )});
	  $(this).addClass( "checked" );
	});


	$(".checkboxgroup li, span.simplecheckbox").click(function(){
	  $(this).toggleClass('checked')
	});

	$(".checkboxgroup li").click(function(){
		if( $(this).hasClass('checked') ){
			$(this).children("input").eq(0).val($(this).data("value"));
		} else {
			$(this).children("input").eq(0).val("");
		}
	});

	$("[name='my-checkbox']").bootstrapSwitch();
	$('.label-toggle-switch').on('click', function(e, data) {
		 e.preventDefault();
    $('#switch-change').bootstrapSwitch('toggleState');
	});
	$('#switch-change').on('switchChange', function (e, data) {
  	var $element = $(data.el),
  	    value = data.value;
  	$(".label-toggle-switch").removeClass("label-dis");
  	if (value) {
  		$('#inputSquare').prop("disabled", true);
  		$('#inputSquare').val("");
  		$("#inputLength").prop("disabled", false);
  		$("#inputWidth").prop("disabled", false);
  		$(".gabarity").removeClass("disabled");
  		$(".area").addClass("disabled");
  		$("label:contains('Габариты строения')").addClass("label-dis");
  	} else {
  		$("#inputSquare").prop("disabled", false);
  		$("#inputLength").prop("disabled", true);
  		$('#inputLength').val("");
  		$("#inputWidth").prop("disabled", true);
  		$('#inputWidth').val("");
  		$(".gabarity").addClass("disabled");
  		$(".area").removeClass("disabled");
  		$("label:contains('Площадь')").addClass("label-dis");
  	}
  	
	});
	
	$(function(){

	  $("#ULbiudjhetselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_price").val($(this).data("value"));
	    $("#biudjhetselect").text($(this).text());
	    $("#biudjhetselect").val($(this).text());
	  });
	  $("#ULmaterialselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_material").val($(this).data("value"));
	    $("#materialselect").html($(this).html());
	    $("#materialselect").val($(this).text());
	    if ($(this).text() == "Каркасный вариант") {
	    	$("#tolshsten").hide();
	    	$("#tolshuteplenija").show();
	    	$("input#requset_users_walls").val("");
	    	$("input#requset_users_tolshuteplenija").val($("#ULtolshinaUtselect li > a").first().data("value"));
/*	    }
	    else if ($(this).text() == "Бревно") {
	    	$("#diametr").hide();
	    	$("#tolshuteplenija").show();
	    	$("input#requset_users_walls").val("");
	    	$("input#requset_users_tolshuteplenija").val($("#ULdiametrselect li > a").first().data("value"));*/
	    } else {
	    	$("#tolshsten").show();
	    	$("#tolshuteplenija").hide();
	    	$("input#requset_users_tolshuteplenija").val("");
	    	$("input#requset_users_walls").val($("#ULtolshinaselect li > a").first().data("value"));
	    }
	  });
	  $("#ULtolshinaselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_walls").val($(this).data("value"));
	    $("#tolshinaselect").html($(this).html());
	    $("#tolshinaselect").val($(this).text());
	  });
/*	  $("#ULdiametrselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_walls").val($(this).data("value"));
	    $("#diametrselect").html($(this).html());
	    $("#diametrselect").val($(this).text());
	  });*/
	  $("#ULtolshinaUtselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_tolshuteplenija").val($(this).data("value"));
	    $("#tolshinaUtselect").html($(this).html());
	    $("#tolshinaUtselect").val($(this).text());
	  });
	  $("#ULetazhnostselect li a").click(function(e){
	    e.preventDefault();
	    $("input#requset_users_floors").val($(this).data("value"));
	    $("#etazhnostselect").html($(this).html());
	    $("#etazhnostselect").val($(this).text());
	  });
	});                
/*
  $("#projects-main-gallery > li").mouseenter(function() {
    $(this).addClass("hovered");
  }).mouseleave(function() {
    $(this).removeClass("hovered");
  });
*/
  $("#results").on( "mouseenter", "li", function() {
  	$(this).addClass("hovered");
  }).on("mouseleave", "li", function() {
	$(this).removeClass("hovered");
  });

  
  if ($("#projects-main-gallery").length > 0) {
    $("#projects-main-gallery > li > a.main-img").fancybox();
    $("#projects-main-gallery > li .images a").not(".more").fancybox();
  }

  if ($(".fancybox-thumb").length > 0) {
    $(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});
  }

/******/

/******/


});