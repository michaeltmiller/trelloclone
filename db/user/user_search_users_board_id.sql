SELECT 
  name, email
  FROM
  users
  JOIN user_board
  ON user_board.user_id=users.user_id
  WHERE board_id = $1;