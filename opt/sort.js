	////helpers


function dateToTime(d){
	return new Date(d).getTime();
}

function isFuture(d){
	if(dateToTime(d) > dateToTime('')) return true;
	return false;
}


function merge(arr1 , arr2){
	console.log(`merging : ` , arr1 , 'and : ' , arr2);
	let i = 0 , j = 0;
	let result = [];
	while(i < arr1.length && j < arr2.length){
		if(arr1[i]?.matchday >= arr2[j]?.matchday) result.push(arr1[i++]);
		else result.push(arr2[j++]);
		console.log(`result : ` , result);
	}
	
	while(i < arr1.length) result.push(arr1[i++]);
	while(j < arr2.length) result.push(arr2[j++]);
	
	console.log(`result finally : ` , result);
	return result;
}






export const sortMatchesByToday = matches =>{
	console.log(`cutting : ` , matches);
	if(matches.length <= 1) return matches;
	const n1 = Math.floor((matches.length / 2) - 1)
	const n2 = matches.length - 1;
	let arr1 = [] , arr2 = []; 
	for(let i = 0 ; i <= n1 ; i++){
		if(matches[i]?.matchday > matches[i]?.season.currentMatchday) continue;
		arr1.push(matches[i]);
	}
	for(let i = n1 + 1 ; i <= n2 ; i++){
		if(matches[i]?.matchday > matches[i]?.season.currentMatchday) continue;
		arr2.push(matches[i]);
	}

	arr1 = sortMatchesByToday(arr1);
	arr2 = sortMatchesByToday(arr2);
	return merge(arr1 , arr2);
}

