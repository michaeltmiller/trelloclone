SELECT list_position
FROM list
WHERE board_id=$1
ORDER BY list_position DESC
LIMIT 1;
