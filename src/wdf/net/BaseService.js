// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var BaseService = function(inConnection) 
	{
		this.initialize(inConnection);
	}
	
	var p = BaseService.prototype;
	
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._connection = null;
	
	p.initialize = function(inConnection)
	{
		this._connection = inConnection;
	}
	
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		if(this._connection && _.isFunction(this._connection.connect))
		{
			return this._connection.connect(inURL, rest);
		}
		
		return false;
	}
	
	p.disconnect = function()//:void
	{
		if(this._connection && _.isFunction(this._connection.disconnect))
		{
			return this._connection.disconnect();
		}
		
		return false;
	}
	
	
	
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		
		return false;
	}
	
	
	

wdf.BaseService = BaseService;
}());
