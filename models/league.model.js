import mongoose from 'mongoose';


const leagueSchema = mongoose.Schema({
	id : {
		type : Number , 
		required : true , 
		unique : true
	} , 

	country : {
		type : String , 
		required : true , 
		trim : true
	} , 

	logo : {
		type : String , 
	} ,

	name : {
		type : String , 
		required : true , 
	} ,
	currentSeasonStart : {
		type : String , 
	} , 
	currentSeasonEnd : {
		type : String , 

	} , 
	standings : [Object] ,

	matches :  [Object],

	scorers :  [Object]
});

export const League = mongoose.model('leagues' , leagueSchema);