import {Request, Response} from "express";
import UserService from '../services/user-service';

class UserController {

    async allTeams(req: Request, res: Response) {
        return UserService.allTeams(req, res);
    }

    async teamDetails(req: Request, res: Response) {
     return UserService.teamDetails(req, res);
    }

    async completedFixtures(req: Request, res: Response) {
      return UserService.completedFixtures(req, res);
    }

    async pendingFixtures(req: Request, res: Response) {
        return UserService.pendingFixtures(req, res);
    }

    async searchFixtures(req: Request, res: Response) {
        return UserService.searchFixtures(req, res);
    }

}

export default new UserController();