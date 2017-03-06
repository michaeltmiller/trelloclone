UPDATE list SET list_position=($1)+1
WHERE list_id=$2;