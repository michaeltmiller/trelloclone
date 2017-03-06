INSERT INTO board 
(title, description, owner_id)
VALUES 
($1, $2, $3)
RETURNING *;

-- INSERT INTO user_board
-- (board_id, user_id)
-- VALUES
-- ($4, $5);

