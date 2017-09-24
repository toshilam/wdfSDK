// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var CommunicationService = function() 
	{
		this.initialize();
	}
	
	CommunicationService.ADD_COMMUNICATOR = 'ac'; 				//add communicator to the subscriber list, subscriber will be notified once a notfication is received
	CommunicationService.REMOVE_COMMUNICATOR = 'rc'; 			//remove communicator from list
	//CommunicationService.GET_COMMUNICATOR = 'gc'; 			//to get target communicator
	CommunicationService.NOTIFICATION = 'csn'; 					//send notification to all communicator
	
	CommunicationService.instance = null;
	
	CommunicationService.getInstance = function()
	{
		if (CommunicationService.instance == null) 
		{
			CommunicationService.instance = new CommunicationService();
		}
		
		return CommunicationService.instance;
	}
	
	var p = CommunicationService.prototype;
	
	p._responderMap;
	
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function()
	{
		this._responderMap = {};
	}
	
	p.request = function(inRequest)
	{
		if ( !(inRequest instanceof wdf.CommServiceRequest) )
		{
			wdf.Tracer.echo('CommunicationService : unknown data type : ' + inRequest, this, 0xFF0000);
			return false;
		}
		
		// wdf.Tracer.echo('CommunicationService : requesting : ' + inRequest.type, this, 0xFF0000);
		
		var request = inRequest;
		
		switch(request.type)
		{
			case CommunicationService.ADD_COMMUNICATOR:
			{
				this._responderMap[request.communicatorID] = inRequest;
				
				wdf.Tracer.echo('CommunicationService : newly added a new communicator : ' + request.communicatorID, this, 0xFF0000);
				
				
				break;
			}
			case CommunicationService.REMOVE_COMMUNICATOR:
			{
				if (this._responderMap[request.communicatorID])
				{
					delete _responderMap[request.communicatorID]
					wdf.Tracer.echo('CommunicationService : removed a communicator : ' + request.communicatorID, this, 0xFF0000);
				}
				else
				{
					wdf.Tracer.echo('CommunicationService : no communicator found : ' + CommunicationService.REMOVE_COMMUNICATOR + ' : ' + request.communicatorID, this, 0xFF0000);
					return false;
				}
				break;
			}
			case CommunicationService.NOTIFICATION:
			{
				this.notificationHandler(request);
				break;
			}
			default:
			{
				wdf.Tracer.echo('CommunicationService : request : unknown service type ' + inRequest.type, this, 0xFF0000);
			}
		}
		
		return true;
	}
	
	p.notificationHandler = function(inRequest) 
	{
		var requesterID = inRequest.communicatorID;
		
		for (var i in this._responderMap)
		{
			var target = this._responderMap[i];
			if (target) 
			{
				if (target.communicatorID == requesterID) continue; //no need to call back to request maker
				
				if ( _.isFunction(target.requester.result) )
				{
					// wdf.Tracer.echo('CommunicationService : notificationHandler : sending request to ' + target.communicatorID, this, 0xFF0000);
					target.requester.result(inRequest);
				}
				else
				{
					wdf.Tracer.echo('CommunicationService : notificationHandler : target object has no response function avaliable :  ' + target.communicatorID, this, 0xFF0000);
				}
			}
			else
			{
				wdf.Tracer.echo('CommunicationService : notificationHandler : unable to get target object ' + this._responderMap[i], this, 0xFF0000);
			}
		}
	}
	

wdf.CommunicationService = CommunicationService;
}());
