import mongoose from 'mongoose';

const {Schema , model} = mongoose;

const leagueSchema = new Schema({
	id : {
		type : Number , 
		unique : [true , 'id must be unique'] , 
		required : [true , 'id is required']
	} ,
	area : {
		id : Number , 
		name : String , 
		countryCode : String , 
		ensignUrl : String
	} , 

	name : String , 
	code : String , 
	emblemUrl : String , 
	logo : String ,
	currentSeason : {
		id : Number , 
		startDate : String , 
		endDate : String , 
		currentMatchday : Number , 
		winner : {}
	} , 

})

export const League = model('leagues' , leagueSchema);