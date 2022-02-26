import request from "supertest";
import jest from 'jest';

const url = 'http://localhost:3000/api/';

const requestU = request(url);
let token;
let teamId;

describe('run simle test', () => {

    it('create user account api', async () => {
        const res = await requestU.post('auth/create-user-account')
            .send({
                email: 'user@gomoney.com',
                password: 'test',
                full_name: 'Abiodun Olanlokun'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('message')
        console.log(res.body);
    })

    it('login user account api', async () => {
        const res = await requestU.post('auth/login-user-account')
            .send({
                'email': 'user@gomoney.com',
                'password': 'test'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        token = res.body.data.token;
    })

    it('Fetch all teams', async () => {
        const testTeamList = await requestU.get('user/all-teams')
            .send()
            .set('Authorization', `Bearer ${token}`)
        expect(testTeamList.statusCode).toEqual(200)
        expect(testTeamList.body).toHaveProperty('data')
        expect(testTeamList.body.data.teams.data.length).toBeGreaterThanOrEqual(0)
        teamId = testTeamList.body.data.teams.data[0]._id;
    })


    it('Fetch teams details', async () => {
        const res = await requestU.get(`user/team-details/${teamId}`)
            .send()
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })

    it('Completed Features', async () => {
        const res = await requestU.get('user/completed-fixtures')
            .send()
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })

    it('Pending Features', async () => {
        const res = await requestU.get('user/pending-fixtures')
            .send()
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })
})