const {diary} = require('../lib/client.js');

class diaryController{
    async getAllDiary(req, res){
        const { userId } = res.locals
        if(!userId){
            res.json(dataResponse(null, null, 500));
        }
        try {
            let tempDiary = await diary.findMany({
                where: {
                    user_id: userId
                }
            })
            if(!newUser){
                res.json(dataResponse(null, 'No review for this user exists', 404));
            }
            res.json(dataResponse(tempDiary, null, 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async createDiary(req, res){
        const {userId} = res.locals;
        if(!userId){
            return res.json(dataResponse(null, "Invalid Request", 404));
        }
        try {
             await diary.create({
                data: req.body,
                where: {
                    guide_id: guideId
                }
            })
            res.json(dataResponse(null, "Comment added", 201));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async updateDiary(req, res){
        const {diaryId} = req.params;
        const {userId} = res.locals;
        if(!reviewId || !userId){
            return res.json(dataResponse(null, null, 403));
        }
        try {
            await diary.update({
                data: req.body,
                where: {
                    diary_id: diaryId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment updated", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async deleteDiary(req, res){
        const {diaryId} = req.params;
        const {userId} = res.locals;
        if(!reviewId || !userId){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await diary.delete({
                where: {
                    diary_id_id: diaryId,
                    user_id: userId
                }
            })
            res.json(dataResponse(null, "Comment deleted", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

}


module.exports = diaryController;