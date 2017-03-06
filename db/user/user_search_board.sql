SELECT *
FROM board
JOIN user_board
	ON board.board_id = user_board.board_id
JOIN users
	ON user_board.user_id = users.user_id
WHERE users.user_id = $1;

-- SELECT * FROM Track
-- JOIN PlaylistTrack
-- 	ON Track.TrackId = PlayListTrack.TrackId
-- JOIN Playlist
-- 	ON PlayListTrack.PlaylistId = Playlist.PlaylistId
-- WHERE Playlist.Name ="TV Shows"