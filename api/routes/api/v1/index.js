const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
require('models/Place');
const Place=mongoose.model('places');


//Get all places info
router.get('/places', async (req, res)=> {
    const filter={};
    const places= await Place.find(filter);
    console.log(places)
    res.json(places);
  });


//Get a specific number of places
router.get('/places/specific/:num', async (req, res)=> {
    const num=req.params.num;
    const filter={};
    const places= await Place.find(filter).limit(num);
    console.log(places)
    res.json(places);
  });


//Get all places that have a specific city
router.get('/places/city/:city', async(req, res)=>{
    city=req.params.city;
    console.log(city);
    const filter={"city": city};
    const regExpression=new RegExp(city, 'i');
    const regexFilter={"city": {$regex:regExpression}};
    const places=await Place.find(regexFilter);
    console.log(places);
    res.json(places);
});






module.exports=router;