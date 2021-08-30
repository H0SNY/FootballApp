import express from 'express';
import { Teams } from '../models/teams.model.js';
import { Matches } from '../models/matches.model.js';
import { League } from '../models/league.model.js';
import { Scorers } from '../models/scorers.model.js';
import axios from 'axios';
import { Standing } from '../models/standing.model.js';
import { FOOTBALL_API_OPTIONS } from '../apiTokens.js';

export const updateRoute = express();

const sleep  = (ms) => new Promise(resolve => setTimeout(resolve , ms));



//update all teams of a all leagues

updateRoute.route('/updateteams').post(async (req , res) =>{
	try{
		if(req.headers.update_token !== process.env.UPDATE_TOKEN) throw new Error('Unauthorized Request');
		const leagues = await League.find({});
		console.log('updating teams.....');
		for(const league of leagues){
			const noSquadResponse = await axios.get(process.env.FOOTBALL_API_URI +  `/v2/competitions/${league.id}/teams`, FOOTBALL_API_OPTIONS);
			await sleep(5000);
			for(const team of noSquadResponse.data.teams){

				const squadResponse = await axios.get(process.env.FOOTBALL_API_URI + `/v2/teams/${team.id}` , FOOTBALL_API_OPTIONS);
				const dbResponse = await Teams.updateOne({leagueID : league.id , "teams.id" : team.id} , {
					"$set" : {"teams.$" : team}
				});

				await sleep(5000);
			}
			
		}
		console.log('finished updating teams')
		res.json({msg : 'Updated' , valid : true});
	}catch(err){
		console.error(err.message , 'teams.js/addsquad');
		res.json({err : err.message , msg : 'Failed To Update'});
	}
});


//update matches
updateRoute.route('/updatematches').post(async (req , res) =>{
	try{
		if(req.headers.update_token !== process.env.UPDATE_TOKEN) throw new Error('Unauthorized Request');
		
		const leagues = await League.find({});
		console.log('updating matches.....');
		for(const league of leagues){
			await sleep(3000);
			const apiResponse = await axios.get(process.env.FOOTBALL_API_URI + `/v2/competitions/${league.id}/matches` , FOOTBALL_API_OPTIONS);
			const updateResponse = await Matches.updateOne({leagueID : league.id} , {$set : {matches : apiResponse.data.matches}});
			await sleep(3000);
		}
		console.log('finished updating matches')
		res.json({msg : 'Updated' , valid : true});
	}catch(err){
		console.error(err.message , 'teams.js/addsquad');
		res.json({err : err , msg : 'Failed To Update'});
	}
});

//update scorers
updateRoute.route('/updatescorers').post(async (req , res) =>{
	try{
		if(req.headers.update_token !== process.env.UPDATE_TOKEN) throw new Error('Unauthorized Request');
		const leagues = await League.find({});
		console.log('updating scorers....')
		for(const league of leagues){
			await sleep(3000);
			const apiResponse = await axios.get(process.env.FOOTBALL_API_URI + `/v2/competitions/${league.id}/scorers`, FOOTBALL_API_OPTIONS);
			const dbResponse = await Scorers.updateOne({leagueID : league.id} , {$set : {scorers : apiResponse.data.scorers}});
			await sleep(3000);
		}
		console.log('finished updating scorers')
		res.json({msg : 'Updated' , valid : true});
	}catch(err){
		console.error(err.message , 'teams.js/addsquad');
		res.json({err : err , msg : 'Failed To Update'});
		
	}
});


//update standings
updateRoute.route('/updatestandings').post(async (req , res) =>{
	try{
		if(req.headers.update_token !== process.env.UPDATE_TOKEN) throw new Error('Unauthorized Request');
		const leagues = await League.find({});
		console.log('updating standings.....');
		for(const league of leagues){
			if(league.id === 2000) continue;
			await sleep(7000);
			const apiResponse = await axios.get(process.env.FOOTBALL_API_URI +`/v2/competitions/${league.id}/standings`, FOOTBALL_API_OPTIONS);
			const dbResponse = await Standing.updateOne({leagueID : league.id} , {$set : { standings : apiResponse.data.standings } } );
		}
		console.log('finsihed updating standings')
		res.json({msg : 'updated' , valid : true});
	}catch(err){
		console.error(err.message , 'teams.js/updatestanding');
		res.json({err : err , msg : 'Failed To Update'});

	}
});

