import mongoose from 'mongoose';

const standingSchema = mongoose.Schema({
	leagueID : Number , 
	standings : [{}]
}
);

export const Standing = mongoose.model('standings' , standingSchema);