// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var CommServiceRequest = function(inCommID, inCommType, inType, inData, inRequester) 
	{
		this.initialize(inCommID, inCommType, inType, inData, inRequester);
	}
	
	var p = CommServiceRequest.prototype = Object.create( wdf.ServiceRequest.prototype);
	
	p.communicatorID;
	p.communicationType;
	
	
	p.ServiceRequest_initialize = p.initialize;
	p.initialize = function(inCommID, inCommType, inType, inData, inRequester)
	{
		this.ServiceRequest_initialize(inType, inData, inRequester)
		
		this.communicatorID = inCommID;
		this.communicationType = inCommType;
	}
	
	
	

wdf.CommServiceRequest = CommServiceRequest;
}());
