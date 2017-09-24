this.wdf = this.wdf || {}; 

(function(){
	
	var UserVOService = function()
	{
		throw 'UserVOService cannot be instantiated.';
	}
	
	UserVOService.hasError = function(inData/*:Object*/)//:Boolean
	{
		return !(inData instanceof wdf.ResultVO) || String(inData.code) != wdf.ServicesErrorID.NONE;
	}
	
	
wdf.UserVOService = UserVOService;
}());
