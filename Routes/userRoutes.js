import { Router } from "express";
import userController from '../controllers/userController.js'

const router = Router();
//USERS
//Create a survey response
router.post('/createSurvey', userController.createSurvey);
//Get surveys by ownerID
router.get('/MySurveys', userController.getMySurveys)
//Delete a survey by ID
router.delete('/MySurveys/:id', userController.deleteMySurvey)
//Get a survey by id
router.get('/MySurveys/:id', userController.getMySurveyByID)
//Edit survey configurations
router.patch('/MySurveys/:id', userController.updateMySurveyByID)
export default router;