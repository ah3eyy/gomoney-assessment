import express from "express";
import UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/all-teams', UserController.allTeams);
router.get('/team-details/:team_id', UserController.teamDetails);
router.get('/completed-fixtures', UserController.completedFixtures);
router.get('/pending-fixtures', UserController.pendingFixtures);
router.get('/search-fixtures', UserController.searchFixtures);


export {router as UserRouter};