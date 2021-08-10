import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { leagueRoute } from './routes/league.js';
import { teamRoute } from './routes/team.js';
import { standingRoute } from './routes/standing.js';
import {matchesRoute} from './routes/matches.js'
import { scorersRoute } from './routes/scorers.js';
import { teamsRoute } from './routes/teams.js';
import { updateRoute } from './routes/update.js';

let corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//function to start mongodb connection
const startConncection = async(uri) =>{
	try{
		await mongoose.connect(uri , {useCreateIndex : true , useNewUrlParser : true , useUnifiedTopology : true})
		console.log(`Connected`);
	}catch(err){
		console.error(`${err.message} server.js/startConnection`)
	}

}

const uri = `mongodb+srv://H0SNY:HANY@test.tag54.mongodb.net/football?retryWrites=true&w=majority`;
const port =  8080;


try{
	const app = express();
	app.use(express.urlencoded({extended : true}));
	app.use(express.json());
	app.use(cors({
		origin : ['http://footballapp.us-east-2.elasticbeanstalk.com' , 'http://localhost:3000']
	}));
	startConncection(uri);
	app.get('/' , function(req , res){
		res.send('Hello There');
	});
	app.use('/league' , leagueRoute);
	app.use('/team' , teamRoute);
	app.use('/standing' , standingRoute);
	app.use('/matches' , matchesRoute);
	app.use('/scorers' , scorersRoute);
	app.use('/teams' , teamsRoute);
	app.use('/update' , updateRoute);

	app.listen(port , () => console.log(`Listening on ${port}`))

	
}catch(err){
	console.error(`${err.message} server.js`);
}