// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var RemoteService = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	var p = RemoteService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._serviceConnection;//:IServiceConnection;
	p.getServiceConnection = function() 
	{
		return this._serviceConnection;
	}
	
	p.initialize = function(inServiceConnection)
	{
		if(!(inServiceConnection instanceof wdf.ServiceConnection))
		{
			throw 'RemoteService : unknown data type : ' + inServiceConnection;
		}
		
		this._serviceConnection = inServiceConnection;
	}
	
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		return this._serviceConnection.request(inRequest);
	}
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		return this._serviceConnection.connect(inURL, rest);
	}
	
	p.disconnect = function()//:void
	{
		this._serviceConnection.disconnect();
	}

wdf.RemoteService = RemoteService;
}());
