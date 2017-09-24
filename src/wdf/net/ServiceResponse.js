// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var ServiceResponse = function(inRequest, inData) 
	{
		this.initialize(inRequest, inData);
	}
	
	var p = ServiceResponse.prototype;
	
	p.request;
	p.data;
	
	
	p.initialize = function(inRequest, inData)
	{
		this.request = inRequest;
		this.data = inData;
	}
	
	p.toString = function()
	{
		return "[object ServiceResponse]";
	}
	
	p.toInfoString = function()
	{
		return wdf.Tools.objectToString(this);
	}

wdf.ServiceResponse = ServiceResponse;
}());
