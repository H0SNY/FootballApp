import axios from 'axios';
import express from 'express';
import { options, sleep } from '../helper.js';
import { League } from '../models/league.model.js';
import { Match } from '../models/match.model.js';
import { API_ORIGIN , UPDATE_TOKEN} from '../apiTokens.js';
export const matchRoute = express();

//getters

//get matches of a league
matchRoute.route('/').get(async (req , res) =>{
	try{
		const {leagueID} = req.query;
		const matches = await Match.find({leagueID : {$eq : leagueID}});
		res.json({valid : true , matches : matches})
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err.message , matches : null});
		
	}
	
});

//getmatches of a league in a specefic matchday
matchRoute.route('/matchday').get(async (req , res) =>{
	try{
		const {matchday , leagueID} = req.query;
		const matches = await Match.find({leagueID : leagueID , matchday : matchday });
		if(!matches || matches.length < 1) throw new Error('matches not found');

		res.json({valid : true , matches : matches});
		return;
	}catch(err){
		console.error(`${err.message} , matches.js/matchesbymatchday`);
		res.json({err : err.message , matches : null});
	}
})


//get matches of a comp by stage
matchRoute.route('/stage').get(async (req , res) =>{
	try{
		const {stage , leagueID} = req.query;
		let matches;
		if(stage === '*') matches = await Match.find({leagueID : leagueID});
		else  matches = await Match.find({leagueID : leagueID , stage : stage});
		
		if(!matches || matches.length < 1) throw new Error('matches not found');
		res.json({valid : true , matches : matches});
	}catch(err){
		console.error(`${err.message} , matches.js/matchesbystage`);
		res.json({err : err.message , matches : null});
	}
});


//get matches bt date
matchRoute.route('/date').get(async (req , res) =>{
	try{
		let {date} = req.query;
		date = new Date(date);
		date = date.toLocaleDateString();
		const matches = await Match.find({utcDate : date});
		if(!matches || matches?.length < 1) throw new Error('No Matches On This Date')

		res.status(200).json({valid : true , matches : matches})

	}catch(err){
		console.error(`${err.message} , matches.js/matchesbydate`);
		res.json({err : err.message , matches : null});
	}
});	


matchRoute.route('/team').get(async (req , res) =>{
	try{
		const {teamID} = req.query;
		const matches = await Match.find( { $or : [ { "homeTeam.id" : teamID }, {"awayTeam.id" : teamID } ] } );
		if(!matches || matches.lenght < 1) throw new Error('No Matches Available');
		res.status(200).json({valid : true , matches : matches});

	}catch(err){
		console.error(`${err.message} , matches.js/matches of a team`);
		res.json({err : err.message , matches : null});
	}
})


//setters
matchRoute.route('/update').post(async (req ,res) =>{
	try{
		const {update_token : x} = req.headers;
		if(x !== UPDATE_TOKEN){
			res.status(403).json({valid : false , err : 'Invalid Update Token'})
		}
		const leagues = await League.find({});
		console.log(`updating matches...`);
		for(const league of leagues){
			const matches = await axios.get(API_ORIGIN + `/v2/competitions/${league.id}/matches` , options);
			for(const match of matches.data.matches){
				const time = String(new Date(match.utcDate)).split(' ')[4]
				await Match.updateOne({leagueID : league.id , id : match.id } , 
					{$set : {...match , leagueID : league.id , utcDate : new Date(match.utcDate).toLocaleDateString()  , time : time} } , {upsert : true})
				}
				await sleep(3000);
			}
			
		console.log(`finished updating matches`);
		res.status(200).json({valid : true});
	}catch(err){
		res.status(403).json({err : err.message})
	}
});	