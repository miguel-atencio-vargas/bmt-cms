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

$('#js-menuMovil').magnificPopup({
	delegate: 'a',
	removalDelay: 500,
	callbacks: {
		beforeOpen: function() {
			this.st.mainClass = this.st.el.attr('data-effect');
		}
	}
});


// Funcion para cerrar el popup (cualquier elemento que tenga la clase .close).
$('.close').click( function(e){
	$.magnificPopup.close();
});
