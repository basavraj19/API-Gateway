const express = require('express');

const { rateLimit }=require('express-rate-limit');

const { createProxyMiddleware }=require('http-proxy-middleware');

const { Serverconfig ,logger } = require('./config');

const { UserMiddlware }=require('./middlewares');

const app = express();

const router = require('./routers');

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 2 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
});

app.use('/api',limiter, router);

app.use('/flightService', UserMiddlware.checkAuthorization, createProxyMiddleware({ target: Serverconfig.FLIGHT_SERVICE, changeOrigin: true , pathRewrite: {'^/flightService' : '/'}}));

app.use('/bookingService', UserMiddlware.checkAuthorization, createProxyMiddleware({ target: Serverconfig.BOOKING_SERVICE, changeOrigin: true , pathRewrite: {'^/bookingService' : '/'}}));

app.listen(Serverconfig.PORT, async () => {
    console.log(`Server is up and Runing on ${Serverconfig.PORT}`);
	console.log('statrted');
    //logger.info("Server is up successfully");
});
