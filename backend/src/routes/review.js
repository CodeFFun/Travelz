const express = require('express');

const reviewController = require('../controller/reviewController.js')

const reviewRouter = express.Router();

const review = new reviewController();

//pass eventId as id
reviewRouter.get('/:id',review.getAllReview)

//pass eventId as id 
reviewRouter.post('/:id', review.createReview)

//pass reviewId as id
reviewRouter.patch('/:id', review.updateReview)

//pass reviewId as id
reviewRouter.delete('/:id', review.deleteReview)

module.exports = reviewRouter;
