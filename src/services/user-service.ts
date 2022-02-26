import {Request, Response} from "express";
import TeamSchema from "../database/models/teams";
import ResponseHandler from "../helpers/response-handler";
import FixtureSchema from "../database/models/fixtures";

class UserService {

    async allTeams(req: Request, res: Response) {
        try {

            let page_number: any = req.query.page_number || 1;

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

    async teamDetails(req: Request, res: Response) {
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

    async completedFixtures(req: Request, res: Response) {
        try {

            let page_number: any = req.query.page_number || 1;

            let skip = (page_number - 1) * 30;

            let fixtures = await FixtureSchema.aggregate([
                {
                    $match: {'status': 'completed'}
                },
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

    async pendingFixtures(req: Request, res: Response) {
        try {

            let page_number: any = req.query.page_number || 1;

            let skip = (page_number - 1) * 30;

            let fixtures = await FixtureSchema.aggregate([
                {
                    $match: {'status': 'pending'}
                },
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

    async searchFixtures(req: Request, res: Response) {

        try {
            let page_number = <any>req.query.page_number || 1;

            let skip = (page_number - 1) * 30;

            let {start_date, end_date, search_term} = req.query;
            //    start date and end date : search based on fixtures that match date fall between specified dates


            // search_term : search fixture based on the team
            let pipeline = <any>[
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
                    $unwind: {
                        path: "$home_team",
                        preserveNullAndEmptyArrays: true
                    },
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
                    $unwind: {
                        path: "$away_team",
                        preserveNullAndEmptyArrays: true
                    },
                },
                {
                    $addFields: {
                        'away_name': '$away_team.name',
                        'home_name': '$home_team.name'
                    }
                },
                {
                    '$facet': {
                        metadata: [{$count: "total"}, {$addFields: {page: page_number}}],
                        data: [{$skip: skip}, {$limit: 30}]
                    }
                }
            ]

            // check for match date
            if (start_date && end_date)
                pipeline = [...pipeline, {
                    $match: {
                        match_date: {$gte: start_date, $lte: end_date}
                    }
                }];


            // search by name
            if (search_term) {
                // search by home
                let search = {
                    $match: {
                        // $or : [
                        //     {'home_team.name': {$ne: search_term}},
                        //     {'away_team.name': {$ne: search_term}}
                        // ]

                        // $expr: {
                        //     $eq: [
                        //         'home_name',
                        //         search_term
                        //     ]
                        // }
                        // 'away_name' : search_term
                        'home_name': search_term
                    }
                }
                pipeline = [...pipeline, search]
            }
            let fixtures = await FixtureSchema.aggregate(pipeline);

            let data = {
                fixtures
            }

            return ResponseHandler.successResponse('Search Fixtures', data, res);
        } catch (e) {
            console.log(e);
            return ResponseHandler.errorResponse('An error occurred fetching fixtures', null, res, 500);
        }

    }
}

export default new UserService();