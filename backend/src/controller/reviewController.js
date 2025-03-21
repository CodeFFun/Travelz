const {review} = require('../lib/client.js');

class reviewController{
    async getAllReview(req, res){
        const { guideId } = req.params
        if(!guideId){
            res.json(dataResponse(null, null, 500));
        }
        try {
            let tempReview = await review.findMany({
                where: {
                    guide_id: guideId
                }
            })
            if(!newUser){
                res.json(dataResponse(null, 'No review for this user exists', 404));
            }
            res.json(dataResponse(tempReview, null, 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async createReview(req, res){
        const {guideId} = req.params;
        const {rating, comment} = req.body;
        const {userId} = res.locals;
        if(!guideId || !userId){
            return res.json(dataResponse(null, "Invalid Request", 404));
        }
        if(!userId || !rating || !comment){
            return res.json(dataResponse(null, "All field are required", 403));
        }
        try {
             await review.create({
                data: {
                    user_id: userId,
                    guide_id: eventId,
                    review_rating: rating,
                    review_content: comment
                },
                where: {
                    guide_id: guideId
                }
            })
            res.json(dataResponse(null, "Comment added", 201));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async updateReview(req, res){
        const {reviewId} = req.params;
        const {userId} = res.locals;
        if(!reviewId || !userId){
            return res.json(dataResponse(null, null, 403));
        }
        try {
            await review.update({
                data: req.body,
                where: {
                    review_id: reviewId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment updated", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async deleteReview(req, res){
        const {reviewId} = req.params;
        const {userId} = res.locals;
        if(!reviewId || !userId){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await review.delete({
                where: {
                    review_id: reviewId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment deleted", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

}


module.exports = reviewController;