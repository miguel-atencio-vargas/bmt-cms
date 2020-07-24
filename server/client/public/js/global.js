/*----------------------------------------------------------------------------*
	$Magnific PopUp
*----------------------------------------------------------------------------*/
// $(document).on('page:change', function(){
// 	$('#js-menuMovil').magnificPopup({
// 		delegate: 'a',
// 		removalDelay: 500,
// 		callbacks: {
// 			beforeOpen: function() {
// 				this.st.mainClass = this.st.el.attr('data-effect');
// 			}
// 		}
// 	});
// });
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
