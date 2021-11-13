import axios from 'axios';
import express from 'express';
import { options, sleep } from '../helper.js';
import { League } from '../models/league.model.js';
import { Standing } from '../models/standings.model.js';
import { API_ORIGIN , UPDATE_TOKEN } from '../apiTokens.js';

export const standingRoute = express();

//getters
//get standings of a league
standingRoute.route('/').get(async (req , res) =>{
	try{
		const {leagueID} = req.query;
		const standings = await Standing.find({
			leagueID : {$eq : leagueID}
		});
		if(!standings || standings.length < 1) throw new Error(`standings not found`);
		res.json({valid : true , standings : standings });
	}catch(err){	
		console.error(`${err.message} , standing.js/id`);
		res.json({err : err.message , standings: null});
	}
	
});


//setters
standingRoute.route('/update').post(async (req , res) =>{
	try{
		const {update_token : x} = req.headers;
		if(x !== UPDATE_TOKEN){
			res.status(403).json({valid : false , err : 'Invalid Update Token'});
			return;
		}
		const leagues = await League.find({});
		console.log(`updating standings...`)
		for(const league of leagues){
			if(league.id === 2000) continue;
			const standings = await axios.get(API_ORIGIN + `/v2/competitions/${league.id}/standings` ,options);
			await sleep(10000);
			for(const standing of standings.data.standings){
				await Standing.updateOne({leagueID : league.id , stage : standing.stage , group : standing.group} ,{
					$set : {...standing , leagueID : league.id} }, {upsert : true}
					)
				}
			}
			console.log(`finished updating standings`)
		res.status(200).json({valid : true})
	}catch(err){
		res.status(403).json({err : err.message})
	}
})