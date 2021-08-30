import express from 'express';
import { Matches } from '../models/matches.model.js';

export const matchesRoute = express();

//get matches of a league
matchesRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		const matches = await Matches.findOne({leagueID : {$eq : id}});
		res.json({valid : true , matches : matches.matches})
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err.message , matches : null});
		
	}
	
});

//getmatches of a league in a specefic matchday
matchesRoute.route('/matchday').get(async (req , res) =>{
	try{
		const {matchday , leagueID} = req.query;
		let result = [];
		
		const matches = await Matches.findOne({leagueID : leagueID});
		if(!matches || matches.length < 1) throw new Error('matches not found');

		
		for(const match of matches.matches)
			if(Number(match.matchday) === Number(matchday)) result.push(match);
				
		res.json({valid : true , matches : result});
		return;
	}catch(err){
		console.error(`${err.message} , matches.js/matchesbymatchday`);
		res.json({err : err.message , matches : null});
		
	}
})


matchesRoute.route('/stage').get(async (req , res) =>{
	try{
		const {stage , leagueID} = req.query;
		let result = [];
		
		const matches = await Matches.findOne({leagueID : leagueID});
		if(!matches || matches.length < 1) throw new Error('matches not found');

		if(stage === '*'){
			res.json({valid : true , matches : matches.matches});
			return;
		}

		else {
			for(const match of matches.matches)
				if(match.stage === stage) result.push(match);
			
			res.json({valid : true , matches : result});
			return;
		}
	}catch(err){
		console.error(`${err.message} , matches.js/matchesbystage`);
		res.json({err : err.message , matches : null});
	}
});

matchesRoute.route('/date').get(async (req , res) =>{
	try{
		let {date} = req.query;
		date = date.split(' ');
		date = date.slice(0 , 3);
		const matchesData = await Matches.find({});
		if(!matchesData || matchesData?.length < 1) throw new Error('Something Went Wrong')
		const arr = [];
		for(const leagueMatches of matchesData){
			for(const match of leagueMatches.matches){
				let matchDate = new Date(match.utcDate);
				matchDate = String(matchDate)
				matchDate = matchDate.split(' ');
				matchDate = matchDate.slice(0 , 3);
				let i = 0 , valid = true;
				while(i < 3){
					if(matchDate[i] !== date[i]){
						valid = false;
						break;
					}
					i++;
				}
				if(valid) arr.push(match);
			}
		}

		res.status(200).json({valid : true , matches : arr})

	}catch(err){
		console.error(`${err.message} , matches.js/matchesbydate`);
		res.json({err : err.message , matches : null});
	}
});	