/*----------------------------------------------------------------------------*
	$Magnific PopUp
*----------------------------------------------------------------------------*/
document.addEventListener("turbolinks:load", function() {
	$('#js-menuMovil').magnificPopup({
		delegate: 'a',
		type: 'inline',
		removalDelay: 500,
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = 'mfp-zoom-in'
			}
		}
	});
	$('.close').click( function(e){
		$.magnificPopup.close();
	});
})


function showPass(){
	let tipo = document.getElementById('password')
	let icon = document.getElementById('eye-1')
	if(tipo.type == 'password'){
		tipo.type = 'text'
		icon.setAttribute('class', 'icon-eye-blocked2')
	}else{
		tipo.type = 'password'
		icon.setAttribute('class', 'icon-eye2')
	}
}
function showConfirm(){
	let tipo = document.getElementById('confirm')
	let icon = document.getElementById('eye-2')
	if(tipo.type == 'password'){
		tipo.type = 'text'
		icon.setAttribute('class', 'icon-eye-blocked2')
	}else{
		tipo.type = 'password'
		icon.setAttribute('class', 'icon-eye2')
	}
}
function showCode(){
	let tipo = document.getElementById('code')
	let icon = document.getElementById('eye-3')
	if(tipo.type == 'password'){
		tipo.type = 'text'
		icon.setAttribute('class', 'icon-eye-blocked2')
	}else{
		tipo.type = 'password'
		icon.setAttribute('class', 'icon-eye2')
	}
}
