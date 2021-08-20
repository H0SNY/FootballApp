import axios from 'axios';
import cron from 'node-cron'

export function updateTeams(){
	return ( cron.schedule('0 * * * *' , async function(){
		const res = await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/update/updateteams', null ,{
			headers : {
				'update_token' : process.env.update_token
			}
		});
		console.log(res);
		
	}))
}
export function updateScorers(){
	return(cron.schedule('0 * * * *' , async function(){
		const res = await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/update/updatescorers' , null , {
			headers : {
				'update_token' : process.env.update_token
			}
		});
		console.log(res);
		
	}))
}
export function updateMatches(){
	return(cron.schedule('0 * * * *' , async function(){
	const res = await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/update/updatematches' , null , {
		headers : {
			'update_token' : process.env.update_token
		}
	});
	console.log(res);
	
}))

}
export function updateStandings(){
	return(cron.schedule('0 * * * *' , async function(){
		const res = await axios.post('http://h0sny.us-east-2.elasticbeanstalk.com/update/updatestandings' ,null , {
			headers : {
				'update_token' : process.env.update_token
			}
		});
		console.log(res);
		
	}))

}