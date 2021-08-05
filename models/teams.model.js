import mongoose from 'mongoose';

const teamsSchema = mongoose.Schema({
	leagueID : Number , 
	teams : []
});

export const Teams = mongoose.model('teams' , teamsSchema);