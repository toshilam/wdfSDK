this.wdf = this.wdf || {}; 

(function(){
	
	var VO = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = VO.prototype;
	
	p.id = null;
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p.initialize = function(inID)
	{
		this.id = inID;
	}
	
	p.clear = function() 
	{
		
	}
	
	p.clone = function() 
	{
		return null;
	}
	
	p.toInfoString = function()
	{
		return wdf.Tools.objectToString(this);
	}
	
	p.toInfoObject = function()
	{
		return {id:this.id};
	}
	
	p.dispatchChangeEvent = function(inPropertyName, inValue)
	{
		this.dispatchEvent(new wdf.VOEvent(wdf.VOEvent.VALUE_CHANGED, null, this, inPropertyName, inValue));
	} 
	
wdf.VO = VO;
}());
