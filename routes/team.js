import axios from 'axios';
import express from 'express';
import { options } from '../apiTokens.js';

export const teamRoute = express();


//route to get a specific team
//returns an object containing the team
teamRoute.route('/').get(async (req , res) =>{
	try{
		const id = req.query.id;
		console.log(id);
		const team = await axios(`https://api.football-data.org/v2/teams/${id}` , options);
		console.log(team)
		res.json(team.data);
	}catch(err){
		try{
			throw new Error(`${err.message} ,failed to fetch team`);

		}catch(err){
			console.log(`${err.message} , team.js/`);
		}
	}

});