import mongoose from 'mongoose'

const authorsSchema = mongoose.Schema({
    authorId: { type: String, required: false, default:''},
    name: { type: String, required: false, default:''},
})

const s2FieldsOfStudySchema = mongoose.Schema({
    category: { type:String, required: false, default: ''},
    source: { type: String, required: false, default: ''},
})

const bucketSchema = mongoose.Schema(
{
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    paperId: {
        type:String,
        required: true,
    },
    title: {
        type:String,
        required: true,
        default:''
    },
    authors: [authorsSchema],
    journal: {
        name: { type: String, required: false, default:''},
        pages: { type: String, required: false, default:''},
        volume: { type: String, required: false, default:''},
    },
    publicationDate: {
        type:String,
        required: false,
        default:''
    },
    publicationTypes: {
        type:Array,
        required: false,
        default:[]
    },
    fieldsOfStudy: {
        type:Array,
        required: false,
        default:[]
    },
    abstract: {
        type:String,
        required: false,
        default:''
    },
    url:{
        type:String,
        required: false,
        default:''
    },
    year:{
        type:Number,
        required: false,
        default:0
    },
    s2FieldsOfStudy:[s2FieldsOfStudySchema],
}, {
    timestamps: true
})

const Bucket = mongoose.model('Bucket', bucketSchema)
export default Bucket