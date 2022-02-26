import TeamSchema from "../database/models/teams";
import ResponseHandler from '../helpers/response-handler'
import FixtureSchema from "../database/models/fixtures";
import {Schema, model,  Types} from 'mongoose'


class AdminService {

    async createTeam(req, res) {
        try {
            let {name, color, total_team_count} = req.body;
            let newTeam = new TeamSchema();
            newTeam.name = name;
            newTeam.color = color;
            newTeam.total_team_count = total_team_count || 0;
            await newTeam.save();
            return ResponseHandler.successResponse('Team created successfully', {team: newTeam}, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred creating account at the moment', null, res, 500);
        }
    }

    async deleteTeam(req, res) {
        try {
            let team_id = req.params.team_id;

            // soft delete would come in handy
            await TeamSchema.deleteOne({_id: team_id});

            // delete fixtures
            await FixtureSchema.deleteMany({team: team_id});

            return ResponseHandler.successResponse('Team deleted successfully', null, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred deleting team at the moment', null, res, 500);
        }
    }

    async editTeam(req, res) {
        try {
            let {name, color, total_team_count, team_id} = req.body;

            let team = await TeamSchema.findOne({_id: team_id});

            if (!team)
                return ResponseHandler.errorResponse('Invalid team id provided', null, res);

            if (name) team.name = name;
            if (color) team.color = color;
            if (total_team_count) team.total_team_count = total_team_count;
            await team.save();

            return ResponseHandler.successResponse('Team updated successfully', {team}, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred editing team at the moment', null, res, 500);
        }
    }

    async teams(req, res) {
        try {

            let page_number = req.query.page_number || 1;

            let skip = (page_number - 1) * 30;

            let pipeline = <any>[
                {
                    '$sort': {'createdAt': -1}
                },
                {
                    '$facet': {
                        metadata: [{$count: "total"}, {$addFields: {page: page_number}}],
                        data: [{$skip: skip}, {$limit: 30}]
                    }
                }
            ];

            let {name, start_date, end_date} = req.query;

            //  filter by name
            // performing regex search with aggregate would have been better but that function not allowed on mu current atlas tier
            if (name)
                pipeline = [{
                    $match: {
                        $text: {
                            $search: name
                        }
                    }
                }, ...pipeline]

            if (start_date && end_date)
                pipeline = [...pipeline, {
                    $match: {
                        createdAt: {$gte: start_date, $lte: end_date}
                    }
                }]

            let teams = await TeamSchema.aggregate(pipeline);

            return ResponseHandler.successResponse('All teams', {teams: teams}, res);

        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred fetching team record at the moment', null, res, 500);
        }
    }

    async teamDetails(req, res) {
        try {
            let team_id = req.params.team_id;

            let team = await TeamSchema.findOne({_id: team_id});

            if (!team)
                return ResponseHandler.errorResponse('Invalid team id provided', null, res);

            let fixtures = await FixtureSchema.find({
                $or: [
                    {home_team: team_id},
                    {away_team: team_id}
                ]
            });

            let data = {team, fixtures}

            return ResponseHandler.successResponse('Team details', data, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred fetching current team', null, res);
        }
    }

    async createFixtures(req, res) {
        try {

            let {home_team_id, away_team_id, match_time} = req.body;

            // check if each team are a valid team
            let homeTeamCheck = await TeamSchema.findOne({_id: home_team_id});

            if (!homeTeamCheck)
                return ResponseHandler.errorResponse('Home team not a valid team', null, res);

            let awayTeamCheck = await TeamSchema.findOne({_id: away_team_id});

            if (!awayTeamCheck)
                return ResponseHandler.errorResponse('Away team not a valid team', null, res);

            let newFixtures = new FixtureSchema();
            newFixtures.home_team = home_team_id;
            newFixtures.away_team = away_team_id;
            newFixtures.match_time = match_time;
            await newFixtures.save();

            return ResponseHandler.successResponse('Fixtures created successfully', {fixture: newFixtures}, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred creating fixtures', null, res);
        }
    }

    async deleteFixtures(req, res) {
        try {
            let fixture_id = req.body.fixture_id;

            // delete fixtures
            await FixtureSchema.deleteOne({_id: fixture_id});

            return ResponseHandler.successResponse('Fixture deleted successfully', null, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred deleting fixture at the moment', null, res, 500);
        }
    }

    async editFixtures(req, res) {
        try {

            let {fixture_id, match_time} = req.body;

            let fixture = await FixtureSchema.findOne({_id: fixture_id});
            if (!fixture)
                return ResponseHandler.errorResponse('No fixture for the id provided', null, res);

            // only match time can be updated
            if (match_time) fixture.match_time = match_time;
            await fixture.save();

            return ResponseHandler.successResponse('Fixtures updated successfully', {fixture}, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred updating fixtures', null, res);
        }
    }

    async fixtures(req, res) {
        try {

            let page_number = req.query.page_number || 1;

            let skip = (page_number - 1) * 30;

            let {start_date, end_date} = req.query;

            let query = {};

            if (start_date)
                query['match_time'] = {$gte: start_date, $lte: end_date}


            let fixtures = await FixtureSchema.aggregate([
                {
                    '$sort': {'createdAt': -1}
                },
                {
                    $lookup: {
                        from: 'teams',
                        localField: 'home_team',
                        foreignField: '_id',
                        as: 'home_team'
                    },
                },
                {
                    $unwind: "$home_team",
                },
                {
                    $lookup: {
                        from: 'teams',
                        localField: 'away_team',
                        foreignField: '_id',
                        as: 'away_team'
                    },
                },
                {
                    $unwind: "$away_team",
                },
                {
                    '$facet': {
                        metadata: [{$count: "total"}, {$addFields: {page: page_number}}],
                        data: [{$skip: skip}, {$limit: 30}]
                    }
                }
            ]);


            return ResponseHandler.successResponse('All fixtures', {fixtures}, res);
        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred fetching team record at the moment', null, res, 500);
        }
    }

    async fixtureDetails(req, res) {
        try {
            let fixture_id = req.params.fixture_id;

            let fixtures = await FixtureSchema.findOne({_id: fixture_id}).populate('away_team').populate('home_team');

            if (!fixtures)
                return ResponseHandler.errorResponse('Invalid fixture id provided', null, res);

            let data = {fixtures}

            return ResponseHandler.successResponse('Team details', data, res);

        } catch (e) {
            return ResponseHandler.errorResponse('An error occurred fetching fixture record at the moment', null, res, 500);
        }
    }
}

export default new AdminService();