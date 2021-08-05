import mongoose from "mongoose";

const matchesSchema = mongoose.Schema({
	leagueID : Number , 
	matches : []
});

export const Matches = mongoose.model('matches' , matchesSchema);