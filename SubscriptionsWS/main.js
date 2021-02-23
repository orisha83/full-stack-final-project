const express = require('express');
var cors = require('cors')

const moviesRouter = require('./Routers/moviesRouter');
const membersRouter = require('./Routers/membersRouter');
const subscriptionsRouter = require('./Routers/subscriptionsRouter');
const membersBL = require('./BL/membersBL')
const moviesBL = require('./BL/moviesBL')


var app = express();

require('./configs/database')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.listen(8000);

//app.listen(8000, "127.0.0.1", function() {
    //membersBL.getMembersFromWSToDB()
    //moviesBL.getMoviesFromWSToDB()
//  });
