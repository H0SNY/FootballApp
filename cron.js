import axios from 'axios';
import cron from 'node-cron'
import { UPDATE_TOKEN } from './apiTokens.js';
const origin = "https://radiant-plains-66499.herokuapp.com/"
export function updateTeams(){
	return ( cron.schedule('0 * * * *' , async function(){
			 await axios.post(origin, null ,{
			headers : {
				'update_token' : UPDATE_TOKEN
			}
		});
		
	}))
}
export function updateScorers(){
	return(cron.schedule('10 * * * *' , async function(){
			 await axios.post(origin , null , {
			headers : {
				'update_token' : UPDATE_TOKEN
			}
		});
		
	}))
}
export function updateMatches(){
	return(cron.schedule('20 * * * *' , async function(){
		 await axios.post(origin , null , {
		headers : {
			'update_token' : UPDATE_TOKEN
		}
	});
	
}))

}
export function updateStandings(){
	return(cron.schedule('30 * * * *' , async function(){
			await axios.post(origin ,null , {
			headers : {
				'update_token' :UPDATE_TOKEN
			}
		});
		
	}))

}