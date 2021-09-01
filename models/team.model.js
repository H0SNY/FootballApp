import mongoose from 'mongoose';

const {Schema , model} = mongoose;

const teamSchema = new Schema({
	id : {
		type : Number , 
		required : [true , 'id is required'] , 
		unique : [true , 'id must be unique']
	} , 
	area : {
		id : Number , 
		name : String
	} , 
	activeCompetitions : [{
		id : Number , 
		area : {
			id : Number , 
			name : String , 
		} , 
		name : String , 
		code : String ,
		
	}] , 
	name: String,
	shortName: String,
	tla: String,
	crestUrl: String,
	address : String,
	phone: String,
	website: String,
	email: String,
	founded: Number,
	clubColors: String,
	venue: String ,
	squad: [{
		id : Number , 
		name : String , 
		position : String , 
		dateOfBirth : String , 
		countryOfBirth : String , 
		nationality : String , 
		shirtNumber : Number , 
		role : String
	}],
});

export const Team = model('teams' , teamSchema);