import axios from 'axios';
import express from 'express';
import {  FOOTBALL_API_OPTIONS } from '../apiTokens.js';
import { Teams } from '../models/teams.model.js';

export const teamRoute = express();


//get team by id
teamRoute.route('/').get(async (req , res) =>{
	try{
		const {leagueID , teamID} = req.query;
		console.log('league id : ' , leagueID , 'team id : ' , teamID);
		const teams = await Teams.findOne({leagueID : leagueID});
		console.log('First League Teams Found : ' , teams[0]);
		let myTeam;
		for(const team of teams.teams){
			if(Number(team.id) === Number(teamID)){
				myTeam = team;
				break;
			}
		} 


		console.log('Found team : ' , myTeam)
		res.json({team : myTeam});
	}catch(err){
		console.error(err.message , 'team.js/getteam');
		res.json({err : err , msg : 'Failed To Find Team'});
	}

});