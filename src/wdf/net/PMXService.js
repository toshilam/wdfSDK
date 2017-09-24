// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var PMXService = function(inPMX) 
	{
		this.initialize(inPMX);
	}
	
	var p = PMXService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._isConnected = false;
	//p._serviceConnection;//:pmx
	p.getServiceConnection = function() 
	{
		return this._connection;
	}
	
	p.BaseService_initialize = p.initialize;
	p.initialize = function(inPMX)
	{
		var conn = inPMX || require('pmx');
		this.BaseService_initialize(conn);
		this._isConnected = false;
	}
	
	/**
	* sending request to pmx monitor
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		if(!this._isConnected)
		{
			wdf.Tracer.echo('PMXService : request : pmx is not connected!');
			return false;
		}
		
		if( !(inRequest instanceof wdf.ServiceRequest) || !wdf.Tools.hasValue(inRequest.type) || !wdf.Tools.hasValue(inRequest.data) )
		{
			wdf.Tracer.echo('PMXService : request : unknown request data : ' + inRequest);
			return false;
		}
		
		var pmx = this._connection;
		if(!pmx || !_.isFunction(pmx.emit))
		{
			wdf.Tracer.echo('PMXService : request : pmx is not initialized!');
			return false;
		}
		
		pmx.emit(inRequest.type, inRequest.data);
		return true;
	}
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		var config = rest || 	{
									  http          : true, // HTTP routes logging (default: true)
									  ignore_routes : [/*/socket\.io/, /notFound/*/], // Ignore http routes with this pattern (Default: [])
									  errors        : true, // Exceptions loggin (default: true)
									  custom_probes : true, // Custom probes (default: true)
									  network       : true, // Traffic usage monitoring (default: false)
									  ports         : true  // Shows which ports your app is listening on (default: false)
								}
		
		this._connection.init(config);
		return this._isConnected = true;
	}
	
	p.disconnect = function()//:void
	{
		//this._serviceConnection.disconnect();
	}
	
	
	

wdf.PMXService = PMXService;
}());
