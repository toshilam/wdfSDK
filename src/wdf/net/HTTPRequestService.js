// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var HTTPRequestService = function(/*inPMX*/) 
	{
		this.initialize(/*inPMX*/);
	}
	
	var p = HTTPRequestService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._isConnected = false;
	//p._serviceConnection;//:pmx
	p.getServiceConnection = function() 
	{
		return this._connection;
	}
	
	p.BaseService_initialize = p.initialize;
	p.initialize = function(/*inPMX*/)
	{
		var conn = require('request');
		this.BaseService_initialize(conn);
		this._isConnected = true;
	}
	
	p.isConnected = function()
	{
		return this._isConnected;
	}
	
	/**
	* sending request to pmx monitor
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		var Tracer = wdf.Tracer;
		
		if(!this._isConnected)
		{
			wdf.Tracer.echo('HTTPRequestService : request : service is not connected!', this, Tracer.TYPE_ERROR);
			return false;
		}
		
		if
		(
			!(inRequest instanceof wdf.HTTPServiceRequest) || 
			!inRequest.requester || 
			!_.isFunction(inRequest.requester.result) || 
			!wdf.Tools.hasValue(inRequest.host) || 
			!wdf.Tools.hasValue(inRequest.data) 
		)
		{
			wdf.Tracer.echo('HTTPRequestService : request : unknown request data : ' + inRequest, this, Tracer.TYPE_ERROR);
			try
			{
				wdf.Tracer.echo(!(inRequest instanceof wdf.HTTPServiceRequest), this, Tracer.TYPE_ERROR);
				wdf.Tracer.echo(!inRequest.requester, this, Tracer.TYPE_ERROR);
				wdf.Tracer.echo(!_.isFunction(inRequest.requester.result), this, Tracer.TYPE_ERROR);
				wdf.Tracer.echo(!wdf.Tools.hasValue(inRequest.host), this, Tracer.TYPE_ERROR);
				wdf.Tracer.echo(!wdf.Tools.hasValue(inRequest.data), this, Tracer.TYPE_ERROR);
				console.log(inRequest);
			}catch(e){}
			
			return false;
		}
		
		var request = this._connection;
		if(!request || !_.isFunction(request.post))
		{
			wdf.Tracer.echo('HTTPRequestService : request : request is not initialized!', this, Tracer.TYPE_ERROR);
			return false;
		}
		
		var url = inRequest.host 
		var requestData = wdf.Tools.isProduction() ? inRequest.toHashString(inRequest.type == wdf.HTTPServiceRequest.TYPE_POST) : inRequest.type == wdf.HTTPServiceRequest.TYPE_POST ? {data:inRequest.data} : ('data=' + JSON.stringify( inRequest.data ));
		//var requestData = inRequest.toHashString(inRequest.type == wdf.HTTPServiceRequest.TYPE_POST);
		
		
		wdf.Tracer.echo('HTTPRequestService : request : requesting to : (' +inRequest.type+ ') ' + url, this, Tracer.TYPE_DEBUG);
		console.log(requestData);
		
		
		if(inRequest.type == wdf.HTTPServiceRequest.TYPE_POST)
		{
			
			request.post
			(
				{
					url:url, 
					form:requestData
				}, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		else
		{
			request
			(
				url +  '?' + requestData, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		
		
		
		
		return true;
	}
	
	/*p.connect = function(inURL/, rest)//:Boolean
	{
		
	}*/
	
	/*p.disconnect = function()//:void
	{
		//this._serviceConnection.disconnect();
	}*/
	
	
	

wdf.HTTPRequestService = HTTPRequestService;
}());
