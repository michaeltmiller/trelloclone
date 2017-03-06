UPDATE list SET list_position = list_position - 1
WHERE list_position >= $1 AND list_position <= $2;
