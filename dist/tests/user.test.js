"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const url = 'http://localhost:3000/api/';
const requestU = (0, supertest_1.default)(url);
let token;
let teamId;
describe('run simle test', () => {
    it('it should return tes', () => {
        expect(true).toBe(true);
    });
    it('create user account api', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestU.post('auth/create-user-account')
            .send({
            email: 'user@gomoney.com',
            password: 'test',
            full_name: 'Abiodun Olanlokun'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('message');
        console.log(res.body);
    }));
    it('login user account api', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestU.post('auth/login-user-account')
            .send({
            'email': 'user@gomoney.com',
            'password': 'test'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        token = res.body.data.token;
    }));
    it('Fetch all teams', () => __awaiter(void 0, void 0, void 0, function* () {
        const testTeamList = yield requestU.get('user/all-teams')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(testTeamList.statusCode).toEqual(200);
        expect(testTeamList.body).toHaveProperty('data');
        expect(testTeamList.body.data.teams.length).toBeGreaterThanOrEqual(0);
        teamId = testTeamList.body.data.teams[0]._id;
    }));
    it('Fetch teams details', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestU.get(`user/team-details/${teamId}`)
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    }));
    it('Completed Features', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestU.get('user/completed-fixtures')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.teams.length).toBeGreaterThanOrEqual(0);
    }));
    it('Pending Features', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestU.get('user/pending-fixtures')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.teams.length).toBeGreaterThanOrEqual(0);
    }));
});
//# sourceMappingURL=user.test.js.map