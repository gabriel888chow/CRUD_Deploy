// import express from 'express';
// import { getAuthCodeUrl } from '';
// import { createApiResponse } from '';
// // const express = require ('express');
// // const getAuthCodeUrl  = require('../../../utilities/polyusso');
// // const createApiResponse = require('../../../models/model');

// const router = express.Router();

// router.post('/', async (req, res, next) => {
//     try {
//         const originUrl = !!req.body?.originUrl ? String(req.body?.originUrl) : "/";

//         return res.status(200).send(createApiResponse(null, { url: await getAuthCodeUrl(originUrl) }));
//     } catch (err) {
//         console.log(`Unknown error cought from /polyusso/loginurl: ${err}`);
//         return next(err);
//     }
// });

// export default router;