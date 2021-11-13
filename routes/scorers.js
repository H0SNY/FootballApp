import axios from 'axios';
import express from 'express';
import { options, sleep } from '../helper.js';
import { League } from '../models/league.model.js';
import { Scorers } from '../models/scorers.model.js';
import { API_ORIGIN , UPDATE_TOKEN } from '../apiTokens.js';
export const scorersRoute = express();

//getters
//get goal scorers of a league
scorersRoute.route('/').get(async (req , res) =>{
	try{
		const {leagueID} = req.query;
		const scorers = await Scorers.findOne({leagueID : {$eq : leagueID}});
		res.json({valid : true ,scorers : scorers.scorers})
	}catch(err){
		console.error(` ${err.message} , scorers.js/get`);
		res.json({err : err.message , scorers : null});
	}
	
});



//setters
scorersRoute.route('/update').post(async (req , res) =>{
	try{
		const {update_token : x} = req.headers;
		if(x !== UPDATE_TOKEN){
			res.status(403).json({valid : false , err : 'Invalid Update Token'});
			return;
		}
		const leagues = await League.find({});
		console.log(`updating scorers...`);
		for(const league of leagues){
			const scorers = await axios.get(API_ORIGIN + `/v2/competitions/${league.id}/scorers` , options);
			const res = await Scorers.updateOne({leagueID : league.id} , {$set : {leagueID : league.id , scorers : scorers.data.scorers}}
				 , {upsert : true});
				 await sleep(5000);
		}
		console.log(`finished updating scorers`);
		res.status(200).json({valid : true})
	}catch(err){
		res.status(403).json({err : err.message})
	}
})