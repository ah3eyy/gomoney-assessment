import {Schema, model} from 'mongoose'
import mongoose_delete from 'mongoose-delete'

const TeamSchema = new Schema({
    name: {type: String, default: null},
    color: {type: String, default: null},
    total_team_count: {type: String, default: null},
}, {
    timestamps: true
})

TeamSchema.plugin(mongoose_delete);

TeamSchema.index({name: 'text', color: 'text'});

TeamSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

export default model("Team", TeamSchema);