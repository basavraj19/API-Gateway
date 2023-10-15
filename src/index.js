const express = require('express');

const { rateLimit }=require('express-rate-limit');

const { createProxyMiddleware }=require('http-proxy-middleware');

const { Serverconfig ,logger } = require('./config');

const app = express();

const router = require('./routers');
const serverConfig = require('./config/server-config');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
});

app.use('/api',limiter, router);

app.use('/flightsService', createProxyMiddleware({ target: Serverconfig.FLIGHT_SERVICE, changeOrigin: true , pathRewrite: {'^/flightsService' : '/'}}));

app.use('/bookingService', createProxyMiddleware({ target: serverConfig.BOOKING_SERVICE, changeOrigin: true , pathRewrite: {'^/bookingService' : '/'}}));

app.listen(Serverconfig.PORT, () => {
    console.log(`Server is up and Runing on ${Serverconfig.PORT}`);
    //logger.info("Server is up successfully");
});
