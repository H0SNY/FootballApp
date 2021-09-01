import mongoose from 'mongoose';

const {Schema , model} = mongoose;

const standingSchema = new Schema({
	leagueID : Number ,
	stage : String , 
	type : String , 
	group : String, 
	table : [{
		position : Number , 
		team : {
			id : Number , 
			name : String ,
			crestUrl : String , 
		} , 
		playedGames : Number , 
		form : String , 
		won : Number , 
		draw : Number , 
		lost : Number , 
		points : Number , 
		goalsFor : Number ,
		goalsAgainst : Number ,
		goalsDifference : Number
	}]
});

export const Standing = model('standings' , standingSchema);