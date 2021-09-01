import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { leagueRoute } from './routes/league.js';
import { teamRoute } from './routes/team.js';
import { standingRoute } from './routes/standing.js';
import {matchRoute} from './routes/match.js'
import { scorersRoute } from './routes/scorers.js';
import {updateMatches , updateStandings , updateScorers , updateTeams} from './cron.js';
dotenv.config();
updateStandings();
updateTeams();
updateScorers();
updateMatches();


//function to start mongodb connection
const startConncection = async(uri) =>{
	try{
		await mongoose.connect(uri , {useCreateIndex : true , useNewUrlParser : true , useUnifiedTopology : true , autoIndex : false})
		console.log(`Connected`);
	}catch(err){
		console.error(`${err.message} server.js/startConnection`)
	}

}

const uri = process.env.DB_URI;
const port =  process.env.PORT || 8080;


try{
	const app = express();
	app.use(express.urlencoded({extended : true}));
	app.use(express.json());
	app.use(cors({
		origin : ['http://footballapp.us-east-2.elasticbeanstalk.com']
	}));
	startConncection(uri);
	app.get('/' , function(req , res){
		res.send('Hello There');
	});
	app.use('/league' , leagueRoute);
	app.use('/team' , teamRoute);
	app.use('/standing' , standingRoute);
	app.use('/match' , matchRoute);
	app.use('/scorers' , scorersRoute);

	app.listen(port , () => console.log(`Listening on ${port}`))

	
}catch(err){
	console.error(`${err.message} server.js`);
}