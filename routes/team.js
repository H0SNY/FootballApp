import express from 'express';
import { Teams } from '../models/teams.model.js';

export const teamRoute = express();


//get team by id
teamRoute.route('/').get(async (req , res) =>{
	try{
		const {leagueID , teamID} = req.query;
		const teams = await Teams.findOne({leagueID : leagueID});
		let myTeam;
		for(const team of teams.teams){
			if(Number(team.id) === Number(teamID)){
				myTeam = team;
				break;
			}
		} 
		res.json({team : myTeam});
	}catch(err){
		console.error(err.message , 'team.js/getteam');
		res.json({err : err , msg : 'Failed To Find Team'});
	}

});


//get team picture
teamRoute.route('/img').get(async (req , res) =>{
	try{
		const {leagueID , teamID} = req.query;
		let img;

		//if league is not specified
		if(!Number(leagueID)){
			const teams = await Teams.find({});
			let valid = false;
			for(const leagueTeams of teams){
				for(const team of leagueTeams.teams){
					if(team.id === Number(teamID)){
						img = team.crestUrl;
						valid = true;
						break;
					}
				}
				if(valid) break;
			}
			res.status(200).json({valid : true , img : img});
			return;
		}

		//if league is specefied
		else{
			const teams = await Teams.findOne({leagueID : leagueID});
			if(!teams) throw new Error('Team Not Found');
			for(const team of teams.teams){
				if(Number(team.id) === Number(teamID)){
				img = team.crestUrl;
				break;
				}
			}
			res.status(200).json({valid : true , img : img})
		}
		
	}catch(err){
		console.error(err.message , 'team.js/img');
		res.json({err : err.message , msg : 'Failed To Find Img'});
	}
});