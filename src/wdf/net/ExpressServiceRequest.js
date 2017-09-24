// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var ExpressServiceRequest = function(inType, inData, inRequester) 
	{
		this.initialize(inType, inData, inRequester);
	}
	
	var p = ExpressServiceRequest.prototype = Object.create( wdf.ServiceRequest.prototype);
	
	
	
	/*p.ServiceRequest_initialize = p.initialize;
	p.initialize = function(inType, inData, inRequester)
	{
		this.ServiceRequest_initialize(inType, inData, inRequester)
		
	}*/
	
	p.toJsonObject = function()
	{
		try
		{
			if( !this._jsonData && !_.isUndefined(this.data) && !_.isUndefined(this.data.data) ) 
			{
				this._jsonData = _.isString(this.data.data) ? JSON.parse(this.data.data) : this.data.data;
			}
			
			return this._jsonData;
		}
		catch(e)
		{
			wdf.Tracer.echo('ServiceRequest : toJsonObject : ' + e);
			wdf.Tracer.echo(this.data);
		}
		
		return {};
	}
	
	p.toString = function()
	{
		return "[object ExpressServiceRequest (" + this.type + " )]";
	}
	
	/*p.cloneAsBoardcastRequest = function()
	{
		var requestData = this.toJsonObject();
	}*/
	

wdf.ExpressServiceRequest = ExpressServiceRequest;
}());
