function sendRequest(urls, max, callback) {
	var arr,result=[],len=urls.length
	arr=urls.splice(0,max)
	function doNext(res){
		result.push(res)
		var url=urls.shift()
		if(url) fetch(url).then(doNext,doNext)
		else if(result.length===len) callback(result)
	}
	arr.map(v=>fetch(v).then(doNext,doNext))
}
sendRequest(["1.json","2.json","3.json"],2,console.log)