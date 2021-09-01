import mongoose from 'mongoose';

const {Schema , model} = mongoose;

const scorersSchema = new Schema({
	leagueID : {
		type : Number , 
		unique : [true , 'league id must be unique']
	} , 
	scorers : [{
			player: {
			id: Number,
			name: String,
			firstName: String,
			lastName: String,
			dateOfBirth: String,
			countryOfBirth: String,
			nationality: String,
			position: String,
			shirtNumber: Number,
			lastUpdated: String
		      },
		      team: {
			id: Number,
			name: String
		      },
		      numberOfGoals: Number
	}]
});

export const Scorers = model('scorers' , scorersSchema);