const express = require('express');

const { Serverconfig ,logger } = require('./config');

const app = express();

const router = require('./routers');

app.use('/api', router);

app.listen(Serverconfig.PORT, () => {
    console.log(`Server is up and Runing on ${Serverconfig.PORT}`);
    //logger.info("Server is up successfully");
});
