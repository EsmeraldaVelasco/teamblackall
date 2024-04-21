const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PlaceSchema=new Schema({
    name:{
        type:String,
        required:true
        
    },
    price_level:{
        type:Number,
        required:true

    },
    rating:{
        type:Number,
        required:true

    }, 
    city:{
        type:String,
        required:true

    }
});

mongoose.model('places', PlaceSchema);