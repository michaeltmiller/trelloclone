// APP //
var app = require('./../index');
var db = app.get('db');

// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = {

    // REGISTER USER //
    register: function(req, res, next) {
        var user = req.body;

        // Hash the users password for security
        user.password = hashPassword(user.password);

        user.email = user.email.toLowerCase();

        db.user.user_create([user.name, user.email, user.password], function(err, user) {
            // If err, send err
            if (err) {
                console.log('Registration error: ', err);

                return res.status(500)
                    .send(err);
            }

            // Send user back without password.
            delete user.password;
            console.log(user);
            res.status(200)
                .send(user);
        });
    },



    // // READ USER //
    // read: function(req, res, next) {
    // 	// List the column names that you want the search to grab
    // 	var searchOptions = {
    // 		columns: ['id', 'name', 'email']
    // 	};
    //
    // 	db.users.find(req.query, searchOptions, function(err, users) {
    // 		if (err) {
    // 			console.log('User read error: ', err);
    //
    // 			return res.status(401)
    // 				.send(err);
    // 		}
    //
    // 		res.status(200)
    // 			.json(users);
    // 	});
    // },

    // RETURN CURRENT USER //
    me: function(req, res, next) {
        // If user isnt on the session, then return error status
        if (!req.user) {
            console.log('Current user not found');

            return res.status(401)
                .send('current user not defined');
        }

        // Remove password for security
        var user = req.user;

        delete user.password;

        // Return user
        return res.status(200)
            .json(user);
    },


    update: function(req, res, next) {
        console.log('Starting update');

        var updateUser = req.body;
        updateUser.user_id = req.user.user_id;
        db.users.save(updateUser, function(err, user) {
            if (err) {
                console.log('User update error', err);

                return res.status(401)
                    .send(err);
            }

            req.user = user;

            delete user.password;

            res.status(200)
                .json(user);
        });
    },

    addUser: function(req, res, next) {
        db.user.user_search_email([
            req.body.email
            ], function (err, results) {
                if (err) {console.log(err, 'error finding user');}
                else {
                    var newUserBoard = results[0];
                    console.log(newUserBoard);
                    db.user.user_create_user_board([
                            req.body.board_id,
                            newUserBoard.user_id
                        ], function (err, results) {
                            if (err) {console.log(err);}
                            else {
                                res.send(results);
                            }
                        });
                }
            });
    },

    createBoard: function(req, res, next) {
        console.log('Creating Board');
        db.user.user_create_board([
            req.body.name,
            req.body.description,
            req.user.user_id
        ], function(err, results) {
            if (err) {
                console.error('Error creating board', err);
                return res.send(err);
            } else {
                console.log(results);
                // db.user.user_create_board_link(results[0]);
                db.user.user_create_user_board([
                    results[0].board_id,
                    req.user.user_id
                ], function(err, results) {
                    if (err) {
                        console.error('Error creating user board', err);
                        res.send(err);
                    } else {
                        return res.send(results);
                    }
                });
            }
        });
    },

    createList: function(req, res, next) {
    	console.log('creating list');
		db.user.user_search_highest_list([req.body.board_id], function(err, results){
			if (!results[0]){
				db.user.user_create_list([
					req.body.name,
					null,
					currentBoard,
					1
					], function(err, results) {
						if (err) {console.log('error creating list');}
							else {
								console.log('created list');
								res.send(results);
							}
					});
			}
			else {
				db.user.user_create_list([
					req.body.name,
					null,
					currentBoard,
					results[0].list_position+1
					], function(err, results) {
						if (err) {console.log('error creating list');}
							else {
								console.log('created list');
								res.send(results);
							}
					});
			}
		})
    	// db.user.user_create_list([
    	// 	req.body.name,
    	// 	null,
    	// 	currentBoard
    	// 	], function(err, results) {
    	// 		if (err) {console.log('error creating list');}
    	// 			else {
    	// 				console.log('created list');
    	// 				res.send(results);
    	// 			}
    	// 	});
    },

    createCard: function(req, res, next) {
    	console.log('creating card');
    	db.user.user_search_highest_card([req.body.list_id], function(err, results) {
    	console.log(results);
    	if (!results[0]) {
    		db.user.user_create_card([
    		req.body.name,
            null,
    		'white',
    		req.body.list_id,
    		1
    		], function(err, results){
    			if (err) {console.log('error creating card');}
    			else {
    				console.log('created card');
    				res.send(results);
    			}
    		});}
    		else{
    	db.user.user_create_card([
    		req.body.name,
    		null,
    		'white',
    		req.body.list_id,
    		results[0].card_position+1
    		], function(err, results){
    			if (err) {console.log('error creating card');}
    			else {
    				console.log('created card');
    				res.send(results);
    			}
    		});}
    		
    	});
    },

    createComment : function (req, res, next) {
    	db.user.user_create_comment([
    		req.body.comment_content,
    		req.body.card_id,
    		req.user.user_id,
    		req.user.name
    		], function(err, results) {
    			if (err) {console.log('error creating comment', err);}
    			else {
    				res.send(results);
    			}
    		});
    },

    getUsers: function(req, res, next) {
        var getUsersBoard = req.params.board_id;
        db.user.user_search_users_board_id([
                getUsersBoard
            ], function(err, results) {
                if (err) {console.log(err);}
                else {
                    res.send(results);
                }  
            });
    },

    getBoards: function(req, res, next) {
        console.log('getting boards', req.user.user_id);
        var boardUser = req.user;
        db.user.user_search_board(boardUser.user_id, function(err, results) {
            if (err) { console.log('err getting boards', err); } else {
                console.log('gotboards');
                res.send(results);
            }
        });
    },

    getBoard: function(req, res, next) {
    	var getBoardId = req.params.board_id;
    	db.user.user_search_board_name([
    			getBoardId
    		], function(err, results) {
    			if (err) {console.log('error getting  board');}
    			else {
    				res.send(results);
    			}
    		});
    },

    getLists: function(req, res, next) {
        console.log('getting lists', req.params.board_id);
        currentBoard = req.params.board_id;
        db.user.user_search_list(currentBoard, function(err, results) {
            if (err) { console.log('err getting lists', err); } else {
                console.log('got lists');
                res.send(results);
            }
        });
    },

    getCards: function(req, res, next) {
    	console.log('getting cards', req.params.list_id);
    	currentList=req.params.list_id;
    	db.user.user_search_card(currentList, function(err, results) {
    		if (err) {console.log('err getting cards');}
    			else {
    				console.log('got card');
    				res.send(results);
    			}
    	});
    },

    getComments : function(req, res, next) {
    	currentCard=req.params.card_id;
    	db.user.user_search_comment([currentCard], function(err, results) {
    		if (err) { console.log('error getting comments');}
    		else {
    			res.send(results);
    		}
    	});
    },

    updateList: function(req, res, next) {
    	console.log('updating list position', req.body);
    	if (req.body.original_list_position>req.body.position) {
    	db.user.user_update_list_position([
    		req.body.position,
			req.body.original_list_position,
			req.body.board_id
    		], function(err, results){
    		if (err) {console.log('error updating list position');}
    		else {
    			db.user.user_update_list_by_id([req.body.position, req.body.list_id], function(err, results){
    				if (err){console.log('could not finish update');}
    				else{
    					console.log('user update positive');
    					res.send(results);
    				}
    			});
    		}
    	});} else {
    		db.user.user_update_list_position_neg([
    		req.body.original_list_position,
    		req.body.position,
			req.body.board_id
    		], function(err, results){
    		if (err) {console.log('error updating list position');}
    		else {
    			db.user.user_update_list_by_id_neg([req.body.position, req.body.list_id], function(err, results){
    				if (err){console.log('could not finish update');}
    				else{
    					console.log('user update negative', req.body.original_list_position, req.body.position);
    					res.send(results);
    				}
    			});
    		}
    	});

    	}
    },

    addLabel: function(req, res, next) {
        db.user.user_update_label([
                req.body.label,
                req.body.card_id
            ], function(err, results) {
                if (err) {console.log(err);}
                else {
                    res.send(results);
                }
            });
    },

    updateCards: function(req, res, next) {
    	console.log('updating cards and position', req.body);
    	if (req.body.original_list_id==req.body.list_id){
    		if (req.body.original_card_position>req.body.card_position) {
    	db.user.user_update_cards_position([
    			req.body.card_position,
    			req.body.list_id,
    			req.body.original_card_position
    		], function (err, results) {
    			if (err) {console.log('error updating cards positon');}
    			else {db.user.user_update_cards([
    					req.body.card_position,
    					req.body.list_id,
    					req.body.card_id
    				], function(err, results) {
    					if (err) {console.log('error updating card id');}
    					else {
    						res.send(results);
    					}
    				});}
    		});} else if (req.body.original_card_position<req.body.card_position) {
    		db.user.user_update_cards_position_neg([
    			req.body.original_card_position,
    			req.body.list_id,
    			req.body.card_position
    		], function (err, results) {
    			if (err) {console.log('error updating cards positon');}
    			else {db.user.user_update_cards_neg([
    					req.body.card_position,
    					req.body.list_id,
    					req.body.card_id
    				], function(err, results) {
    					if (err) {console.log('error updating card id');}
    					else {
    						console.log('updating cards neg');
    						res.send(results);
    					}
    				});}
    		});
    	}} else {

    			db.user.user_update_cards_different_list([
    				req.body.card_position,
    				req.body.list_id
    				], function(err, results) {
    					db.user.user_update_cards([
    						req.body.card_position,
    						req.body.list_id,
    						req.body.card_id
    						], function(err, results){
    							res.send(results);
    						});
    				});
    	// 		if (req.body.original_card_position>req.body.card_position) {
    	// db.user.user_update_cards_position([
    	// 		req.body.card_position,
    	// 		req.body.list_id,
    	// 		req.body.original_card_position
    	// 	], function (err, results) {
    	// 		if (err) {console.log('error updating cards positon');}
    	// 		else {db.user.user_update_cards([
    	// 				req.body.card_position,
    	// 				req.body.list_id,
    	// 				req.body.card_id
    	// 			], function(err, results) {
    	// 				if (err) {console.log('error updating card id');}
    	// 				else {
    	// 					res.send(results);
    	// 				}
    	// 			});}
    	// 	});} else if (req.body.original_card_position<req.body.card_position) {
    	// 	db.user.user_update_cards_position_neg([
    	// 		req.body.original_card_position,
    	// 		req.body.list_id,
    	// 		req.body.card_position
    	// 	], function (err, results) {
    	// 		if (err) {console.log('error updating cards positon');}
    	// 		else {db.user.user_update_cards_neg([
    	// 				req.body.card_position,
    	// 				req.body.list_id,
    	// 				req.body.card_id
    	// 			], function(err, results) {
    	// 				if (err) {console.log('error updating card id');}
    	// 				else {
    	// 					console.log('updating cards neg');
    	// 					res.send(results);
    	// 				}
    	// 			});}
    	// 	});
    	// }
    	}

    }
};
