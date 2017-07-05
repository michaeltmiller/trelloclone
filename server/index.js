// EXTERNAL MODULES //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
// CONFIG //
const config = require('./config');

// EXPRESS //
const app = module.exports = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

// MASSIVE //
const massiveUri = config.MASSIVE_URI;
const massiveServer = massive.connectSync({
    connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var dbSetup = require('./services/dbSetup');
dbSetup.run();

// CONTROLLERS //
var UserCtrl = require('./controllers/UserCtrl');

// SERVICES //
var passport = require('./services/passport');

// POLICIES //
var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401)
        .send();
    return next();
};

// Session and passport //
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints //
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/me'
}));
app.get('/api/logout', function(req, res, next) {
    req.logout();
    return res.status(200)
        .send('logged out');
});

// User Endpoints //
app.post('/api/register', UserCtrl.register);
// app.get('/api/user', UserCtrl.read);
app.get('/api/me', isAuthed, UserCtrl.me);
app.put('/api/user/current', isAuthed, UserCtrl.update);
app.post('/api/board', isAuthed, UserCtrl.createBoard);
app.get('/api/board/:board_id', isAuthed, UserCtrl.getBoard);
app.get('/api/boards', isAuthed, UserCtrl.getBoards);
app.get('/api/lists/:board_id', isAuthed, UserCtrl.getLists);
app.post('/api/list', isAuthed, UserCtrl.createList);
app.get('/api/cards/:list_id', isAuthed, UserCtrl.getCards);
app.post('/api/card', isAuthed, UserCtrl.createCard);
app.put('/api/list', isAuthed, UserCtrl.updateList);
app.put('/api/cards', isAuthed, UserCtrl.updateCards);
app.get('/api/comments/:card_id', isAuthed, UserCtrl.getComments);
app.post('/api/comment', isAuthed, UserCtrl.createComment);
app.post('/api/user', isAuthed, UserCtrl.addUser);
app.get('/api/users/:board_id', isAuthed, UserCtrl.getUsers);
app.post('/api/label', isAuthed, UserCtrl.addLabel);

// CONNECTIONS //
var port = config.PORT;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
