this.wdf = this.wdf || {}; 

(function(){
	
	var QueueVOList = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = QueueVOList.prototype = Object.create( wdf.VOList.prototype);
	
	p.isBusy;
	
	p.VOList_initialize = p.initialize;
	p.initialize = function(inID)
	{
		this.VOList_initialize(inID);
		this.isBusy = false;
	}
	
	p.VOList_addVO = p.addVO;
	p.addVO = function(inVO)
	{
		if (!inVO || !(inVO instanceof wdf.QueueVO))
		{
			wdf.Tracer.echo('QueueVOList : addVO : unknown data type : ' + inVO);
			return -1;
		}
		
		return this.VOList_addVO(inVO);
	}
	
	
	p.getVOIndexByService = function(inService)
	{
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			var targetService = this.arrVO[i].service;
			if (targetService && _.isFunction( targetService.getServiceType ) && targetService.getServiceType() == inService) 
			{
				return i;
			}
		}
		
		return -1;
	}
	
	
	
	p.toString = function()
	{
		return  "[object QueueVOList(id=" + this.id  + ")]";
	}
	
	
wdf.QueueVOList = QueueVOList;
}());
