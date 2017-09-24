
( function() {

	
	var HTTPDataHandler = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = HTTPDataHandler.prototype = Object.create( wdf.DataHandler.prototype);
	
	
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	
	p.DataHandler_initialize = p.initialize;
	p.initialize = function(inServiceConnection)
	{
		
		this.DataHandler_initialize( inServiceConnection );
	}
	
	/*p._execute = function(inRequest)
	{
		return inRequest.requester instanceof wdf.UserInfoVO;
	}*/
	
	p.DataHandler_request = p.request;
	p.request = function(inRequest)
	{
		
		return this.DataHandler_request(inRequest);
	}
	
	p.DataHandler_result = p.result;
	//override
	p.result = function(inResponseJsonString)
	{
		wdf.Tracer.echo(this._serviceType + ' : result : ');
		wdf.Tracer.echo(inResponseJsonString);
		
		try
		{
			var responseObj = _.isString(inResponseJsonString) ? JSON.parse(inResponseJsonString) : inResponseJsonString;
		}
		catch(e)
		{
			return false;
		}
		
		return responseObj;
	}
	
	p.DataHandler_fault = p.fault;
	//override
	p.fault = function(inResponseString)
	{
		wdf.Tracer.echo(this._serviceType + ' : fault : ');
		wdf.Tracer.echo(inResponseString);
		
		this._dispatchResult
		( 
			wdf.ServiceEvent.RESPONSE, 
			new wdf.ServiceResponse( this._currRequest, this.getResultVO( wdf.ServicesErrorID.JSON_EXCEPTION, inResponseString))
		);
	}
	
	
	p.toString = function()
	{
		return "[object HTTPDataHandler]";
	}
	

wdf.HTTPDataHandler = HTTPDataHandler;
}());