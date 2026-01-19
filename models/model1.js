import mongoose from 'mongoose';
const DataSchema=new mongoose.Schema({
    name:{type:String},
    phone:{type:Number},
    image:{type:String},
    user_id:{type:String}
})
export default mongoose.models.datas||mongoose.model('datas',DataSchema)