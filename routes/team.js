import axios from 'axios';
import express from 'express';
import { options, sleep } from '../helper.js';
import { League } from '../models/league.model.js';
import { Team } from '../models/team.model.js';

export const teamRoute = express();

//getters

//get team by id
teamRoute.route('/').get(async (req , res) =>{
	try{
		const {teamID} = req.query;
		const team = await Team.findOne({id : teamID});
		if(!team) throw new Error(`team not found`)
		res.json({team : team});
	}catch(err){
		console.error(err.message , 'team.js/getteam');
		res.json({err : err.message});
	}

});



//setters
teamRoute.route('/update').post(async (req , res) =>{
	try{
		const {update_token} = req.headers;
		if(update_token !== process.env.UPDATE_TOKEN){
			res.status(403).json({valid : false , err : 'Invalid Update Token'});
			return;
		}
		const leagues = await League.find({});
		console.log(`updating teams...`)
		for(const league of leagues){
			const teams = await axios.get(process.env.API_ORIGIN + `/v2/competitions/${league.id}/teams` , options);
			await sleep(3000)
			for(const team of teams.data.teams){
				await sleep(8000);
				const fullTeam = await axios.get(process.env.API_ORIGIN + `/v2/teams/${team.id}` , options);
				const res = await Team.updateOne({id : team.id} , {$set : {...fullTeam.data}} , {upsert : true});
			}
		}
		
		console.log(`finished updating teams`)
		res.status(200).json({valid : true})
	}catch(err){
		res.status(403).json({err : err.message})
	}
})
