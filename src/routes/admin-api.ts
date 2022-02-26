import express from "express";
import AdminController from '../controllers/admin-controller'

const router = express.Router();

router.post('/create-team', AdminController.createTeam);
router.delete('/delete-team/:team_id', AdminController.deleteTeam);
router.put('/edit-teams', AdminController.editTeam);
router.get('/teams', AdminController.teams);
router.get('/team-details/:team_id', AdminController.teamDetails);
router.post('/create-fixtures', AdminController.createFixtures);
router.delete('/delete-fixtures/:fixture_id', AdminController.deleteFixtures);
router.put('/edit-fixtures', AdminController.editFixtures);
router.get('/fixtures', AdminController.fixtures);
router.get('/fixture-details/:fixture_id', AdminController.fixtureDetails);


export {router as AdminRouter};