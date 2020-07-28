function collision_check(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return {
      collision: false,
      allowed: false,
      piece: null,
    }
  }

  const piece = $(`.field#${x}_${y} .piece`);

  if (piece.length) {
    const piece_data = piece.attr('id').split('_');

    const data = {
      color: piece_data[0],
      type: piece_data[1],
    };

    return {
      collision: true,
      allowed: player_turn !== data.color,
      piece: piece,
    }
  }

  return {
    collision: false,
    allowed: true,
    piece: null,
  }
}