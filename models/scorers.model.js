import mongoose from 'mongoose';

const scorersSchema = mongoose.Schema({
	leagueID : Number , 
	scorers : []
});

export const Scorers = mongoose.model('scorers' , scorersSchema);