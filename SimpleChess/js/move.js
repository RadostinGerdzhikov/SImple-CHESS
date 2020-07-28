function move(field_old, field_new, piece, data) {
  field_old.find('.piece').remove();
  field_new.find('.piece').remove();

  const new_coords = field_new.attr('id').split('_');
  const field_img = create_figure(new_coords[0], new_coords[1], data.color + '_' + data.type);
  field_img.click(piece_click);

  $('.field').off('click');
  change_turn();
}