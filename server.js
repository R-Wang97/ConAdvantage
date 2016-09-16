const express = require('express');
const fs = require('fs');

const app = express();
const configFile = 'config/config.json';
const config = JSON.parse(
    fs.readFileSync(configFile)
);

const userRouter = express.Router({mergeParams: true});
userRouter.route('/create').post(function(httpRequest, httpResponse) {
    // TODO
});

userRouter.route('/login').post(function(httpRequest, httpResponse) {
    // TODO
});

userRouter.route('/logout').post(function(httpRequest, httpResponse) {
    // TODO
});

userRouter.route('/delete').post(function(httpRequest, httpResponse) {
    // TODO
});

const floorPlanRouter = express.Router({mergeParams: true});
floorPlanRouter.route('/add').post(function(httpRequest, httpResponse) {
    // TODO
});

floorPlanRouter.route('/delete').post(function(httpRequest, httpResponse) {
    // TODO
});

floorPlanRouter.route('/list').post(function(httpRequest, httpResponse) {
    // TODO
});

floorPlanRouter.route('/show').post(function(httpRequest, httpResponse) {
    // TODO
});

const roomRouter = express.Router({mergeParams: true});
roomRouter.route('/generate').post(function(httpRequest, httpResponse) {
    // TODO
});

roomRouter.route('/list').post(function(httpRequest, httpResponse) {
    // TODO
});

roomRouter.route('/:id/get').post(function(httpRequest, httpResponse) {
    // TODO
});

roomRouter.route('/:id/delete').post(function(httpRequest, httpResponse) {
    // TODO
});

const printoutRouter = express.Router({mergeParams: true});
printoutRouter.route('/room/:id').post(function(httpRequest, httpResponse) {
    // TODO
});

printoutRouter.route('/report').post(function(httpRequest, httpResponse) {
    // TODO
});

printoutRouter.route('/report/:id').post(function(httpRequest, httpResponse) {
    // TODO
});

const analyticsRouter = express.Router({mergeParams: true});
// TODO

const landlordRouter = express.Router({mergeParams: true});
landlordRouter.use('/floorplan', floorPlanRouter);
landlordRouter.use('/room', roomRouter);
landlordRouter.use('/printout', printoutRouter);
landlordRouter.use('/analytics', analyticsRouter);

const reportRouter = express.Router({mergeParams: true});
reportRouter.route('/').get(function(httpRequest, httpResponse) {
    // TODO
});

reportRouter.route('/update').post(function(httpRequest, httpResponse) {
    // TODO
});

reportRouter.route('/submit').post(function(httpRequest, httpResponse) {
    // TODO
});

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/landlord', landlordRouter);
apiRouter.use('/:id', reportRouter);

app.use('/api', apiRouter);
app.use('/', express.static(`${__dirname}/public`));

const port = config.ServerPort;
const server = app.listen(port); // eslint-ignore no-unused-vars
console.log(`Listening on port ${port}`);
