import {Schema, model, Types} from 'mongoose'
import mongoose_delete from 'mongoose-delete'

const FixtureSchema = new Schema({
    home_team: {ref: 'Team', type: Types.ObjectId, default: null},
    away_team: {ref: 'Team', type: Types.ObjectId, default: null},
    match_time: {type: String, default: null},
    status: {type: String, enum: ['completed', 'pending'], default: 'pending'}
}, {
    timestamps: true
})

FixtureSchema.plugin(mongoose_delete);

FixtureSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

export default model("Fixtures", FixtureSchema);