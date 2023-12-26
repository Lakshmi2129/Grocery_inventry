

var path = window.location.href;
$('.navbar ul li a').each(function () {
	if (this.href === path) {
		$(".navbar ul li").removeClass("active-nav")
		$(this).addClass('active-nav');

	}
});
$('.navbar-small ul li a').each(function () {
	if (this.href === path) {
		$(".navbar-small ul li i").removeClass("active-nav-sm")
		$(this).addClass('active-nav-sm');

	}
});
// Side Navbar


// Settings Page

$(".st").hide()
$(".st").first().show()

$(".settings-nav li").on('click', function () {
	$(".settings-nav li").removeClass()
	$(this).addClass("settings-active")
	var att = $(this).attr('id')
	$(".st").hide()
	$(`#${att}-pg`).fadeIn('slow')

})


// Tooltip Enable

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})


// Top Navigation Bar
$(".side-nav").toggle()

$("#menu-icon").click(function () {
	//$(".logo-responsive").toggleClass('logo-responsive-active')
	$(".side-nav").toggle('fast')
	$(".side-nav-sm").toggle()
	$(".content").toggleClass('content-responsive')
})

$(".mdi-bell").click(function () {
	$(".user-profile-content").hide()
	$.post('error_api', { 'read': 'True', 'start': 0, 'length': 10, 'draw': 1 }, (res) => {

	})
	$(".notification-wrap").toggleClass('notify-active')


})
$(".user-profile-content").hide()
$(".user-link").click(function () {
	$(".notification-wrap").removeClass('notify-active')
	$(".user-profile-content").toggle("fast")
})




$('.ripple').on('click', function () {
	$(this).find(".ripple_wave").remove();
	$(this).append("<span class='ripple_wave'></span>").delay(500).queue(function (next) {
		$(".ripple_wave").remove();
		next();
	});
});



$("#dashboard_theme input").on("change", function () {
	var theme = $('input[name="theme"]:checked', "#dashboard_theme").val()
	if (theme == "static/css/main/dark.css") {
		$('body').addClass('dark')
		$("#theme-pref").attr('href', "static/css/main/dark.css")
		$("#lt_logo").attr('src', 'static/images/logo/logo.png')
		$("#lt_logo").css('background', '#fff');
		window.localStorage.removeItem('theme');
		localStorage.setItem('theme', "static/css/main/dark.css")
	}
	else {
		$('body').removeClass('dark')
		$("#theme-pref").attr('href', "static/css/main/light.css")
		$("#lt_logo").attr('src', 'static/images/logo/logo.png')
		$("#lt_logo").css('background', '');
		window.localStorage.removeItem('theme');
		localStorage.setItem('theme', "static/css/main/light.css")
	}
})

$("#dashboard_theme").on("submit", function (event) {
	event.preventDefault();
	var formValues = $(this).serialize();
	$.post('ui-data', formValues, (res) => {
		window.localStorage.removeItem('theme');
		localStorage.setItem('theme', res.value)
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Changed Successfully',
			showConfirmButton: false,
			timer: 1500
		})


	})
})


// Profile creation start 
$("#profile-form").on("submit", (event) => {
	var data = 'display_id='+$('#display_id').val()+"&email="+$('#email').val();	

	$.put('email_update', data, function (res) {
		if(res.res == "Success"){
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Changed Successfully',
				showConfirmButton: false,
				timer: 1500
			})
		}
	});
})


// Profile creation End  

// $.get('access_list', (res) => {
// 	// const resVal = res.slice(1, -1);
// 	var arr = res.split(',');
// 	var option_list = ''

// 	$(".navbar-small ul li a, .navbar ul li a").each(function (index) {
// 		const menu = ($(this).attr('href')).split('/');
// 		if (menu[1] == "" || menu[1] == null) {
// 			$(this).html();
// 		}
// 		else if (arr.includes(menu[1]) == false) {
// 			$(this).parent().closest("li").remove();
// 			// $(this).parent().empty();
// 		}
// 	});

// 	option_list += `<select class="selectpicker form-control w-100" name="user_role" id="user_role" multiple
// 	aria-label="Default select example" data-live-search="true">`
// 	arr.map(function(val){
// 		option_list += `<option value="${capitalizeFirstLetter(val)}">${capitalizeFirstLetter(val)}</option>`
// 	});
// 	option_list += `</select>`

// 	setTimeout(() => {
		
// 		$('.user_role').html(option_list)	
// 	}, 500);
// });


// Date Picker Shift Wise Dynamic Filter
// const dateFilter = () => {
// 	var result = {}
// 	$.ajax({
// 		url: "shift_filter",
// 		async: false,
// 		success: function (res) {
// 			end_date = res['end_date']
// 			yesterday_yt =  moment(moment(end_date).subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"))

// 			start_date = res['date_filter']

// 			return $.each(start_date, (key, val) => {
// 				if(key == "Yesterday"){
// 					result[key] = [moment(val), yesterday_yt]
// 				} else{
// 					result[key] = [moment(val), moment(end_date)]
// 				}
// 			})
// 		}
// 	})
// 	return result
// }

// Custom Ajax
const customeAJAX = async(url,type,data) =>{

	return  await $.ajax({
		type:type,
		url: url,
		data:data,
		cache: false,
		success: function(data){
		   return data
		},
		error: function (data) {
		   throw data;
		}
  
	  });
  
  
}