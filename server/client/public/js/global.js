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
