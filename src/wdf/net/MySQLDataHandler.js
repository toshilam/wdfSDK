
( function() {

	
	var MySQLDataHandler = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = MySQLDataHandler.prototype = Object.create( wdf.DataHandler.prototype);
	
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	
	p._DataHandler_initialize = p.initialize;
	p.initialize = function(inServiceConnection)
	{
		/*if(!(inServiceConnection instanceof wdf.MySQLServiceConnection))
		{
			throw 'MySQLDataHandler : initialize : unknown connection!';
		}*/
		
		this._DataHandler_initialize( inServiceConnection );
	}
	
	
	
	/*p._DataService_fault = p.fault;
	p.fault = function(inResponse)
	{
		if(inResponse instanceof wdf.ServiceResponse)
		{
			var err = inResponse.data;
			inResponse.data = this.getResultVO( wdf.ServicesErrorID.DB_CONNECTION_ERROR, err ); //{response: 'fail', error: err};
			
			if(_.isFunction(inResponse.request.fault))
			{
				inResponse.request.fault(inResponse);
			}
			
			this._dispatchResult( wdf.ServiceEvent.FAULT, inResponse );
		
		}
		else
		{
			wdf.Tracer.echo(this + ' : fault : unknown data object : ' + inResponse);
		}
	}*/
	
	
	
	p.toString = function()
	{
		return "[object MySQLDataHandler]";
	}
	

wdf.MySQLDataHandler = MySQLDataHandler;
}());