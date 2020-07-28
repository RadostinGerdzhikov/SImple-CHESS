function select_piece(field, piece, data) {
  const possible_moves = get_possible_moves(field, piece, data);

  console.log(possible_moves);

  if (possible_moves) {
    for (const field_id of possible_moves) {
      const field_new = $('.field#' + field_id);
      field_new.addClass('greenBG');

      field_new.click(function () {
        move(field, field_new, piece, data);
      });
    }
  }
}

function get_possible_moves(field, piece, data) {
  switch (data.type) {
    case 'p':
      return select_piece_p(field, piece, data);
    case 'k':
      return select_piece_k(field, piece, data);
    case 't':
      return select_piece_t(field, piece, data);
    case 'o':
      return select_piece_o(field, piece, data);
    case 'q':
      return select_piece_q(field, piece, data);
    case 'g':
      return select_piece_g(field, piece, data);
    default:
      break;
  }
}

function select_piece_p(field, piece, data) {
  const possible_moves = [];

  if (data.color === 'w') {
    let check = collision_check(data.x, data.y - 1);

    if (!check.piece && check.allowed) {
      possible_moves.push(data.x + '_' + (data.y - 1));

      if (data.y === 6) {
        check = collision_check(data.x, data.y - 2);

        if (!check.piece) {
          possible_moves.push(data.x + '_' + (data.y - 2));
        }
      }
    }

    check = collision_check(data.x + 1, data.y - 1);
    if (check.allowed && check.collision) {
      possible_moves.push((data.x + 1) + '_' + (data.y - 1));
    }

    check = collision_check(data.x - 1, data.y - 1);
    if (check.allowed && check.collision) {
      possible_moves.push((data.x - 1) + '_' + (data.y - 1));
    }
  }
  else if (data.color === 'b') {
    let check = collision_check(data.x, data.y + 1);

    if (!check.piece && check.allowed) {
      possible_moves.push(data.x + '_' + (data.y + 1));

      if (data.y === 1) {
        check = collision_check(data.x, data.y + 2);

        if (!check.piece) {
          possible_moves.push(data.x + '_' + (data.y + 2));
        }
      }
    }

    check = collision_check(data.x + 1, data.y + 1);
    if (check.allowed && check.collision) {
      possible_moves.push((data.x + 1) + '_' + (data.y + 1));
    }

    check = collision_check(data.x - 1, data.y + 1);
    if (check.allowed && check.collision) {
      possible_moves.push((data.x - 1) + '_' + (data.y + 1));
    }
  }

  return possible_moves;
}

function select_piece_k(field, piece, data) {
  const possible_moves = [];

  // Check vertical.
  let check = collision_check(data.x + 1, data.y + 2);
  if (check.allowed) {
    possible_moves.push((data.x + 1) + '_' + (data.y + 2));
  }

  check = collision_check(data.x - 1, data.y + 2);
  if (check.allowed) {
    possible_moves.push((data.x - 1) + '_' + (data.y + 2));
  }

  check = collision_check(data.x + 1, data.y - 2);
  if (check.allowed) {
    possible_moves.push((data.x + 1) + '_' + (data.y - 2));
  }

  check = collision_check(data.x - 1, data.y - 2);
  if (check.allowed) {
    possible_moves.push((data.x - 1) + '_' + (data.y - 2));
  }

  // Check horizontal.
  check = collision_check(data.x + 2, data.y + 1);
  if (check.allowed) {
    possible_moves.push((data.x + 2) + '_' + (data.y + 1));
  }

  check = collision_check(data.x - 2, data.y + 1);
  if (check.allowed) {
    possible_moves.push((data.x - 2) + '_' + (data.y + 1));
  }

  check = collision_check(data.x + 2, data.y - 1);
  if (check.allowed) {
    possible_moves.push((data.x + 2) + '_' + (data.y - 1));
  }

  check = collision_check(data.x - 2, data.y - 1);
  if (check.allowed) {
    possible_moves.push((data.x - 2) + '_' + (data.y - 1));
  }

  return possible_moves;
}

function select_piece_t(field, piece, data) {
  const possible_moves = [];

  // Up.
  for (let i = data.y - 1; i >= 0; i--) {
    const check = collision_check(data.x, i);

    if (check.allowed) {
      possible_moves.push(data.x + '_' + i);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }
  }

  // Down.
  for (let i = data.y + 1; i <= 7; i++) {
    const check = collision_check(data.x, i);

    if (check.allowed) {
      possible_moves.push(data.x + '_' + i);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }
  }

  // Right.
  for (let i = data.x + 1; i <= 7; i++) {
    const check = collision_check(i, data.y);

    if (check.allowed) {
      possible_moves.push(i + '_' + data.y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }
  }

  // Up.
  for (let i = data.x - 1; i >= 0; i--) {
    const check = collision_check(i, data.y);

    if (check.allowed) {
      possible_moves.push(i + '_' + data.y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }
  }

  return possible_moves;
}

function select_piece_o(field, piece, data) {
  const possible_moves = [];
  let x, y;

  // Up - Right.
  x = data.x + 1;
  y = data.y - 1;
  while (x <= 7 && y >= 0) {
    const check = collision_check(x, y);

    if (check.allowed) {
      possible_moves.push(x + '_' + y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }

    x++;
    y--;
  }

  // Up - Left.
  x = data.x - 1;
  y = data.y - 1;
  while (x >= 0 && y >= 0) {
    const check = collision_check(x, y);

    if (check.allowed) {
      possible_moves.push(x + '_' + y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }

    x--;
    y--;
  }

  // Down - Right.
  x = data.x + 1;
  y = data.y + 1;
  while (x <= 7 && y <= 7) {
    const check = collision_check(x, y);

    if (check.allowed) {
      possible_moves.push(x + '_' + y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }

    x++;
    y++;
  }

  // Down - Left.
  x = data.x - 1;
  y = data.y + 1;
  while (x >= 0 && y <= 7) {
    const check = collision_check(x, y);

    if (check.allowed) {
      possible_moves.push(x + '_' + y);

      if (check.piece) {
        break;
      }
    }
    else {
      break;
    }

    x--;
    y++;
  }

  return possible_moves;
}

function select_piece_q(field, piece, data) {
  const possible_collisions_1 = select_piece_t(field, piece, data);
  const possible_collisions_2 = select_piece_o(field, piece, data);

  return possible_collisions_1.concat(possible_collisions_2);
}

function select_piece_g(field, piece, data) {
  const possible_moves = [];
  let check;

  // Up.
  check = collision_check(data.x, data.y - 1);
  if (check.allowed) {
    possible_moves.push(data.x + '_' + (data.y - 1));
  }

  // Down.
  check = collision_check(data.x, data.y + 1);
  if (check.allowed) {
    possible_moves.push(data.x + '_' + (data.y + 1));
  }

  // Right.
  check = collision_check(data.x + 1, data.y);
  if (check.allowed) {
    possible_moves.push((data.x + 1) + '_' + data.y);
  }

  // Left.
  check = collision_check(data.x - 1, data.y);
  if (check.allowed) {
    possible_moves.push((data.x - 1) + '_' + data.y);
  }

  // Up - Right.
  check = collision_check(data.x + 1, data.y - 1);
  if (check.allowed) {
    possible_moves.push((data.x + 1) + '_' + (data.y - 1));
  }

  // Up - Left.
  check = collision_check(data.x - 1, data.y - 1);
  if (check.allowed) {
    possible_moves.push((data.x - 1) + '_' + (data.y - 1));
  }

  // Down - Right.
  check = collision_check(data.x + 1, data.y + 1);
  if (check.allowed) {
    possible_moves.push((data.x + 1) + '_' + (data.y + 1));
  }

  // Down - Left.
  check = collision_check(data.x - 1, data.y + 1);
  if (check.allowed) {
    possible_moves.push((data.x - 1) + '_' + (data.y + 1));
  }

  return possible_moves;
}