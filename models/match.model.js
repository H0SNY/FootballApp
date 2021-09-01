import mongoose from 'mongoose';

const {Schema , model} = mongoose;

const matchSchema = new Schema({
	id : {
		type : Number , 
		required : [true , 'id is required'] ,
		unique : [true , 'id must be unique']
	} , 

	leagueID : Number ,
	season : {} , 
	utcDate : String , 
	time : String ,
	status : String , 
	matchday : Number , 
	stage : String , 
	group : String , 
	score : {
		winner : String, 
		duration : String ,
		fullTime : {
			homeTeam : Number , 
			awayTeam : Number
		} , 
		halfTime : {
			homeTeam : Number , 
			awayTeam : Number
		} , 
		extraTime : {
			homeTeam : Number , 
			awayTeam : Number
		} , 
	} , 

	homeTeam : {
		id : Number , 
		name : String
	} ,
	awayTeam : {
		id : Number , 
		name : String
	} , 
	referees : [{
		id : Number , 
		name : String , 
		role : String , 
		nationality : String
	}]
});

export const Match = model('matches' , matchSchema);