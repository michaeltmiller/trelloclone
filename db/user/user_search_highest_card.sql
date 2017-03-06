SELECT card_position
FROM card
WHERE list_id=$1
ORDER BY card_position DESC
LIMIT 1;
