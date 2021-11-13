import axios from 'axios';
import cron from 'node-cron'
import { UPDATE_TOKEN } from './apiTokens';
export function updateTeams(){
	return ( cron.schedule('0 * * * *' , async function(){
			 await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/team/update', null ,{
			headers : {
				'update_token' : UPDATE_TOKEN
			}
		});
		
	}))
}
export function updateScorers(){
	return(cron.schedule('10 * * * *' , async function(){
			 await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/scorers/update' , null , {
			headers : {
				'update_token' : UPDATE_TOKEN
			}
		});
		
	}))
}
export function updateMatches(){
	return(cron.schedule('20 * * * *' , async function(){
		 await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/match/update' , null , {
		headers : {
			'update_token' : UPDATE_TOKEN
		}
	});
	
}))

}
export function updateStandings(){
	return(cron.schedule('30 * * * *' , async function(){
			await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/standing/update' ,null , {
			headers : {
				'update_token' :UPDATE_TOKEN
			}
		});
		
	}))

}