const express = require('express');


const diaryController = require('../controller/diaryController.js');

const diaryRouter = express.Router();

const diary = new diaryController();

//pass diaryid as id
diaryRouter.get('/',diary.getAllDiary)


//pass diaryId as id 
diaryRouter.post('/', diary.getAllDiary)

//pass diaryId as id
diaryRouter.patch('/:id', diary.updateDiary)

//pass diaryId as id
diaryRouter.delete('/:id', diary.deleteDiary)

module.exports = diaryRouter;
