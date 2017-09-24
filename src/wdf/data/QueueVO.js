this.wdf = this.wdf || {}; 

(function(){
	
	var QueueVO = function(inID, inService, inData, inGroupID)
	{
		this.initialize(inID, inService, inData, inGroupID);
	}
	
	var p = QueueVO.prototype = Object.create( wdf.VO.prototype);
	
	p.service;
	p.data;
	p.groupID;
	p.numTried;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inService, inData, inGroupID)
	{
		if(!(inService instanceof wdf.BaseService))
		{
			throw new Error('QueueVO : initialize : unknown data Object : ' + inService);
		}
		
		
		this.VO_initialize(inID);
		this.service = inService;
		this.data = inData;
		this.groupID = inGroupID;
		this.numTried = 0;
	}
	
	
	p.toString = function()
	{
		return "[Object QueueVO( " + this.id + " )]";
	}
	
	
wdf.QueueVO = QueueVO;
}());
