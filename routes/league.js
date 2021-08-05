import express from 'express';
import {League} from '../models/league.model.js';

export const leagueRoute = express();





//get a league by id
leagueRoute.route('/').get(async (req , res) =>{
	try{
		let id = req.query.id;
		const league = await League.findOne({id : {$eq : id}});
		res.json({league : league});
		console.log(`${id} fetched succesfully , get league by id`);
		
	}catch(err){
		console.error(` ${err.message} , league route by id`);
		res.json({err : err , league : null});
		
	}
});


//post to db
leagueRoute.route('/add').post(async (req , res) =>{
	try{
		let {league} = req.query;
		league = JSON.parse(league); //json string ===> league object
		const l = new League(league);
		const response = await l.save((err , le) =>{
			if(err)throw new Error(err);
			res.json({msg : 'Document Updated'});
		});
	}catch(err){
		console.error(`${err.message} , league.js/add`);
		res.json({err : err , msg : 'Failed To Update Document'});
	}
});


leagueRoute.route('/all').get(async (req , res) =>{
	try{
		const leagues = await League.find({});
		res.json({ leagues : leagues});
		console.log(`fetched succesfully , league.js/all`);
		
	}catch(err){
		console.error(`failed to fetch leagues ,  ${err.message}`);
		res.json({err : err , leagues : null});
		
	}	
});	





