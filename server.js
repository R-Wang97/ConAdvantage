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

userRouter.route('/delete').delete(function(httpRequest, httpResponse) {
    // TODO
});

const floorPlanRouter = express.Router({mergeParams: true});

const roomRouter = express.Router({mergeParams: true});

const printoutRouter = express.Router({mergeParams: true});

const analyticsRouter = express.Router({mergeParams: true});
// TODO

const landlordRouter = express.Router({mergeParams: true});
landlordRouter.use('/floorplan', floorPlanRouter);
landlordRouter.use('/room', roomRouter);
landlordRouter.use('/printout', printoutRouter);
landlordRouter.use('/analytics', analyticsRouter);

const reportRouter = express.Router({mergeParams: true});

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/landlord', landlordRouter);
apiRouter.use('/:id', reportRouter);

app.use('/api', apiRouter);
app.use('/', express.static(`${__dirname}/public`));

const port = config.ServerPort;
const server = app.listen(port); // eslint-ignore no-unused-vars
console.log(`Listening on port ${port}`);
