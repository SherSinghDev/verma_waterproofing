/**

	Abstract : Ajax Page Js File
	File : dz.ajax.js
	#CSS attributes: 
		.dzForm : Form class for ajax submission. 
		.dzFormMsg  : Div Class| Show Form validation error/success message on ajax form submission
		
	#Javascript Variable
	.dzRes : ajax request result variable
	.dzFormAction : Form action variable
	.dzFormData : Form serialize data variable

**/



function contactForm() {
	window.verifyRecaptchaCallback = function (response) {
		$('input[data-recaptcha]').val(response).trigger('change');
	}

	window.expiredRecaptchaCallback = function () {
		$('input[data-recaptcha]').val("").trigger('change');
	}
	'use strict';
	var msgDiv;

	$(".dzForm").on('submit', function (e) {
		e.preventDefault();	//STOP default action
		$('.dzFormMsg').html('<div class="gen alert alert-success">Submitting..</div>');
		let form = e.target
		let data = {
			name: form.name.value,
			email: form.email.value,
			phone: form.phone.value,
			subject: form.subject.value,
			message: form.message.value,
		}
		emailjs.send('service_oxpshjl', 'template_xm45sov', data).then(
			(response) => {
				setTimeout(() => {
					$('.dzFormMsg .alert').hide(1000);
					e.target.reset()
				}, 1000);
			},
			(error) => {
				console.log('FAILED...', error);
			},
		);

	});


	/* This function is for mail champ subscription START*/
	$(".dzSubscribe").on('submit', function (e) {
		e.preventDefault();	//STOP default action
		var thisForm = $(this);
		var dzFormAction = thisForm.attr('action');
		var dzFormData = thisForm.serialize();
		thisForm.addClass('dz-ajax-overlay');

		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
			success: function (dzRes) {
				thisForm.removeClass('dz-ajax-overlay');
				if (dzRes.status == 1) {
					msgDiv = '<div class="gen alert alert-success">' + dzRes.msg + '</div>';
				}
				if (dzRes.status == 0) {
					msgDiv = '<div class="err alert alert-danger">' + dzRes.msg + '</div>';
				}
				$('.dzSubscribeMsg').html(msgDiv);

				setTimeout(function () {
					$('.dzSubscribeMsg .alert').hide(1000);
				}, 10000);

				$('.dzSubscribe')[0].reset();
			}
		})
	});

	/* This function is for mail champ subscription END*/
}

jQuery(document).ready(function () {
	'use strict';
	contactForm();
})