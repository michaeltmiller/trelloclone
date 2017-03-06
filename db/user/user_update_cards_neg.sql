UPDATE card SET card_position = ($1), list_id = $2
WHERE card_id = $3;