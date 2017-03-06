UPDATE card SET card_position = card_position - 1 
WHERE card_position >= $1 AND card_position <= $3 AND list_id = $2;