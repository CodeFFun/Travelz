const express = require('express');
const upload = require('../lib/image.js');


const diaryController = require('../controller/diaryController.js');

const diaryRouter = express.Router();

const diary = new diaryController();

//pass diaryid as id
diaryRouter.get('/',diary.getAllDiary)


//pass diaryId as id 
diaryRouter.post('/',upload.single("diary_image"), diary.createDiary)

//pass diaryId as id
diaryRouter.patch('/:diaryId', upload.single("diary_image"),diary.updateDiary)

//pass diaryId as id
diaryRouter.delete('/:diaryId', diary.deleteDiary)

module.exports = diaryRouter;
