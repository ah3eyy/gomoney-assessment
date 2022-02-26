import AdminService from '../services/admin-service';
import Joi from "joi";
import ResponseHandler from "../helpers/response-handler";

class AdminController {

    createTeam(req, res) {
        const schema = Joi.object({
            name: Joi.string().required().messages({"any.required": "Team name is required"}),
            color: Joi.string().required().messages({"any.required": "Team color is required"}),
            total_team_count: Joi.optional()
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);

        return AdminService.createTeam(req, res);
    }

    deleteTeam(req, res) {
        return AdminService.deleteTeam(req, res);
    }

    editTeam(req, res) {
        return AdminService.editTeam(req, res);
    }

    teams(req, res) {
        return AdminService.teams(req, res);
    }

    teamDetails(req, res) {
        return AdminService.teamDetails(req, res);
    }

    createFixtures(req, res) {
        const schema = Joi.object({
            home_team_id: Joi.string().required().messages({"any.required": "Team name is required"}),
            away_team_id: Joi.string().required().messages({"any.required": "Team color is required"}),
            match_time: Joi.string().required().messages({"any.required": "Match time is required"})
        });

        const validate = schema.validate(req.body);

        if (validate.error)
            return ResponseHandler.errorResponse(validate.error.details[0].message, null, res);

        return AdminService.createFixtures(req, res);
    }

    deleteFixtures(req, res) {
        return AdminService.deleteFixtures(req, res);
    }

    editFixtures(req, res) {
        return AdminService.editFixtures(req, res);
    }

    fixtures(req, res) {
        return AdminService.fixtures(req, res);
    }

    fixtureDetails(req, res) {
        return AdminService.fixtureDetails(req, res);
    }
}


export default new AdminController();