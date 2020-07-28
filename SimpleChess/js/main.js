const $document = $(document);
let player_turn = 'w'; //w - whites; b - blacks

function piece_click() {
	const piece = $(this);
	const field = piece.parent();
	const fields = $('.field');

	const field_data = field.attr('id').split('_');
	const piece_data = piece.attr('id').split('_');

	const data = {
		x: Number(field_data[0]),
		y: Number(field_data[1]),
		color: piece_data[0],
		type: piece_data[1],
	};

	if (data.color !== player_turn)
		return;

	fields.removeClass('greenBG');

	if (field.hasClass('selectedPiece')) {
		field.removeClass('selectedPiece');
	}
	else {
		fields.removeClass('selectedPiece');
		field.addClass('selectedPiece');
		select_piece(field, piece, data);
	}
}

function change_turn() {
	const fields = $('.field');
	fields.removeClass('greenBG selectedPiece');
	player_turn = player_turn === 'w' ? 'b' : 'w';

	const player_king = fields.find('#' + player_turn + '_g');
	if (player_king.length === 0) {
		alert(player_turn === 'w' ? 'Blacks win!' : 'Whites win!');
		main();
	}
}

function main() {
	$('#main-content').empty();
	player_turn = 'w';

	create_field();
	initialize_field();
	hints_toggle();
	$('.field .piece').click(piece_click);
}

$document.ready(main);