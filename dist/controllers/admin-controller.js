"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_service_1 = __importDefault(require("../services/admin-service"));
const joi_1 = __importDefault(require("joi"));
const response_handler_1 = __importDefault(require("../helpers/response-handler"));
class AdminController {
    createTeam(req, res) {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required().messages({ "any.required": "Team name is required" }),
            color: joi_1.default.string().required().messages({ "any.required": "Team color is required" }),
            total_team_count: joi_1.default.optional()
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return admin_service_1.default.createTeam(req, res);
    }
    deleteTeam(req, res) {
        return admin_service_1.default.deleteTeam(req, res);
    }
    editTeam(req, res) {
        return admin_service_1.default.editTeam(req, res);
    }
    teams(req, res) {
        return admin_service_1.default.teams(req, res);
    }
    teamDetails(req, res) {
        return admin_service_1.default.teamDetails(req, res);
    }
    createFixtures(req, res) {
        const schema = joi_1.default.object({
            home_team_id: joi_1.default.string().required().messages({ "any.required": "Team name is required" }),
            away_team_id: joi_1.default.string().required().messages({ "any.required": "Team color is required" }),
            match_time: joi_1.default.string().required().messages({ "any.required": "Match time is required" })
        });
        const validate = schema.validate(req.body);
        if (validate.error)
            return response_handler_1.default.errorResponse(validate.error.details[0].message, null, res);
        return admin_service_1.default.createFixtures(req, res);
    }
    deleteFixtures(req, res) {
        return admin_service_1.default.deleteFixtures(req, res);
    }
    editFixtures(req, res) {
        return admin_service_1.default.editFixtures(req, res);
    }
    fixtures(req, res) {
        return admin_service_1.default.fixtures(req, res);
    }
    fixtureDetails(req, res) {
        return admin_service_1.default.fixtureDetails(req, res);
    }
}
exports.default = new AdminController();
//# sourceMappingURL=admin-controller.js.map