const passwordValidate = (str) => {
	var pattern = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
	);

	if (pattern.test(str)) {
		return true
	} else {
		return false;
	}
}

const capitalizeFirstLetter = (string) => {
	if(typeof string === 'string' && string != ''){
		return string.replace(/^./, string[0].toUpperCase()).trim().replace(/_/g,' ');
	} else{
		return string
	}
	// return string.trim().replace(/_/g,' ').toLocaleUpperCase();
	// return string.charAt(0).toUpperCase() + string.slice(1).replaceAll('_', ' ');
}

 const blockSpecialChar = (e) => {
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

function containsSpecialChars(str) {
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(str);
}
$("html, body").scroll(function(e){
	if (!$(e.target).hasClass('daterangepicker')) {
		if($('.daterangepicker').css('display') == 'block')
		$('.daterangepicker ').hide();
	  }	
})

function hideModal(id) {
    $(`#${id}`).removeClass("in");
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
    $(`#${id}`).hide();
}

$('#home_breadcrump').attr('href',window.location.origin);
$('.navbar ul li a').each(function(){
	if($(this).attr('href') == window.location.pathname) {
		$('#current_page').text($(this).text());
	}

})