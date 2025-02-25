const {diary} = require('../lib/client.js');
const dataResponse = require('../lib/dataResponse.js');

class diaryController{
    async getAllDiary(req, res){
        const { id } = res.locals
        if(!id){
            res.json(dataResponse(null, null, 500));
        }
        try {
            let tempDiary = await diary.findMany({
                where: {
                    user_id: id
                }
            })
            if(!tempDiary){
                res.json(dataResponse(null, 'No review for this user exists', 404));
            }
            res.json(dataResponse(tempDiary, null, 200));
        } catch (error) {
            console.log(error.message)
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async createDiary(req, res){
        const {id} = res.locals;
        let diary_image =req.file.filename;
        if(!id){
            return res.json(dataResponse(null, "Invalid Request", 404));
        }
        try {
             await diary.create({
                data: {...req.body, diary_image, user_id:id},
            })
            res.json(dataResponse(null, "Comment added", 201));
        } catch (error) {
            console.log(error.message);
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async updateDiary(req, res){
        const {diaryId} = req.params;
        const {id} = res.locals;
        let diary_image = req.file.filename;
        if(!diaryId || !id){
            return res.json(dataResponse(null, null, 403));
        }
        try {
            await diary.update({
                data: {...req.body, diary_image},
                where: {
                    diary_id: diaryId,
                }
            })
            res.json(dataResponse(null, "Diary updated", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async deleteDiary(req, res){
        const {diaryId} = req.params;
        const {id} = res.locals;
        if(!diaryId || !id){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await diary.delete({
                where: {
                    diary_id: diaryId,
                }
            })
            res.json(dataResponse(null, "Diary deleted", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

}


module.exports = diaryController;