// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var EmailServiceRequest = function(inType, inData, inRequester) 
	{
		this.initialize(inType, inData, inRequester);
	}
	
	var p = EmailServiceRequest.prototype = Object.create( wdf.ServiceRequest.prototype);
	
	
	
	p.ServiceRequest_initialize = p.initialize;
	p.initialize = function(inType, inData, inRequester)
	{
		
		if
		(
			inData && 
			!_.isUndefined(inData['from']) && 
			!_.isUndefined(inData['to']) && 
			!_.isUndefined(inData['subject']) && 
			!_.isUndefined(inData['text']) && 
			!_.isUndefined(inData['html']) 
		)
		{
			this.ServiceRequest_initialize(inType, inData, inRequester);
			return;
		}
		
		throw 'EmailServiceRequest : initialize : unknown data ojbect!';
		
	}
	
	p.toOptionObject = function()
	{
		return this.toJsonObject();
	}
	
	p.toJsonObject = function()
	{
		return this.data;
	}
	
	p.toString = function()
	{
		try
		{
			return "[object EmailServiceRequest (" + this.toOptionObject()['subject'] + " )]";
		}
		catch(e)
		{
			
		}
		
		return "[object EmailServiceRequest (" + this.type + " )]";
	}
	

wdf.EmailServiceRequest = EmailServiceRequest;
}());
