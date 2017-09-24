this.wdf = this.wdf || {}; 

(function(){
	
	var ResultVO = function(inID, inService, inCode, inResult, inUniqueID)
	{
		this.initialize(inID, inService, inCode, inResult, inUniqueID);
	}
	
	var p = ResultVO.prototype = Object.create( wdf.VO.prototype);
	
	p.service;
	p.code;
	p.result;
	p.uniqueID; //this unique created by ServiceConnection, and returned by server
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inService, inCode, inResult, inUniqueID)
	{
		this.VO_initialize(inID);
		this.service = inService;
		this.code = inCode;
		this.result = inResult;
		this.uniqueID = inUniqueID;
	}
	
	p.toString = function()
	{
		return "[Object ResultVO( {0}, {1}, {2} )]".format([this.service, this.code, this.result]);
	}
	
	
wdf.ResultVO = ResultVO;
}());
