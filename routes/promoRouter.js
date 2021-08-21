const express = require('express');
const bodyParser = require('body-parser');
const { raw } = require('body-parser');

const mongoose = require('mongoose');
const Promotion = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next) => {
        Promotion.find({})
            .then((promot) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promot);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then((promotion) => {
                console.log('promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported');
    })
    .delete((req, res, next) => {
        Promotion.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promoId)
            .then((promote) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promote);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("Post operation not supported on /promotions/" + req.params.promoId);
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        },
            { new: true }
        )
            .find({})
            .then((promotions) => {
                res.statusCode200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Promotion.findByIdAndRemove(req.params.id)
            .then((resp) => {
                res.statusCode(200);
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = promoRouter;