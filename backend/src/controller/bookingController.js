const {booking} = require('../lib/client.js');
const dataResponse = require('../lib/dataResponse.js');

class bookingController{
    async getAllBooking(req, res){
        const { id } = res.locals
        if(!id){
            res.json(dataResponse(null, null, 500));
        }
        try {
            let tempReview = await booking.findMany({
                where: {
                    user_id: id
                },
                include:{
                    guide: true,
                    user: true
                }
            })
            if(!tempReview){
                res.json(dataResponse(null, 'No review for this user exists', 404));
            }
            res.json(dataResponse(tempReview, null, 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async bookingExists(req,res,next){
        const {guideId} = req.params;
        let {booking_date} = req.body;
        const {id} = res.locals;

        if(!guideId ||!id){
            return res.json(dataResponse(null, "Invalid Request", 404));
        }
        if(!id || !booking_date){
            return res.json(dataResponse(null, "All field are required", 403));
        }
        try{
            const existingBooking = await booking.findFirst({
                where: {
                    user_id: id,
                    guide_id: guideId
                }
            });

            if (existingBooking && existingBooking.status !== "COMPLETED") {
                return res.json(dataResponse(null, "Booking already exists and is not completed", 409));
            }else{
                next();
            }
        }catch(e){
            console.log(e)
        }
    }

    async createBooking(req, res){
        const {guideId} = req.params;
        let {booking_date} = req.body;
        const {id} = res.locals;
        try {
             await booking.create({
                data: {
                    booking_date,
                    guide_id: guideId,
                    user_id: id
                },
            })
            res.json(dataResponse(null, "Booking created", 201));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async updateBooking(req, res){
        const {bookingId} = req.params;
        const {userId} = res.locals;
        if(!bookingId || !userId){
            return res.json(dataResponse(null, null, 403));
        }
        try {
            await booking.update({
                data: req.body,
                where: {
                    booking_id: bookingId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment updated", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async deleteBooking(req, res){
        const {bookingId} = req.params;
        const {userId} = res.locals;
        if(!reviewId || !userId){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await booking.delete({
                where: {
                    booking_id: bookingId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment deleted", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

}


module.exports = bookingController;