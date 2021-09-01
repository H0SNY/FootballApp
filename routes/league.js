import express from 'express';
import axios from 'axios';
import { League } from '../models/league.model.js';
import { options } from '../helper.js';




export const leagueRoute = express();

//getters
//get a league by id
leagueRoute.route('/').get(async (req , res) =>{
	try{
		let {leagueID} = req.query;
		const league = await League.findOne({id : {$eq : leagueID}});
		res.json({valid : true , league : league});
	}catch(err){
		console.error(` ${err.message} , league route by id`);
		res.json({err : err.message , league : null});
		
	}
});


leagueRoute.route('/all').get(async (req , res) =>{
	try{
		const leagues = await League.find({});
		res.json({ leagues : leagues});
	}catch(err){
		console.error(`failed to fetch leagues ,  ${err.message}`);
		res.json({err : err.message , leagues : null});
		
	}	
});	





//setters
leagueRoute.route('/update').post(async (req, res) =>{
	try{
		const {update_token} = req.headers;
		if(update_token !== process.env.UPDATE_TOKEN){
			res.status(403).json({valid : false , err : 'Invalid Update Token'})
		}
		const leagues = await axios.get(process.env.API_ORIGIN + '/v2/competitions/' ,options );
		for(const league of leagues.data.competitions){
			if(league.plan === "TIER_ONE"){
				const l = await League.findOne({id : league.id});
				let logo = '';
				if(l) logo = l.logo;
				const res = await League.updateOne({id : league.id} , {$set : {...league , logo : logo}} , {upsert : true})
			}
		}
		res.status(200).json({valid : true})
	}catch(err){
		res.status(403).json({valid : false , err : err.message})
	}
})