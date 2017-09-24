
( function() {

	
	var DataHandler = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = DataHandler.prototype = Object.create( wdf.BaseService.prototype);
	
	//p._connection = null;
	p._currRequest = null;
	p._serviceType = null;
	p._requestData = null; //the data that sent from client side.
	p._userInfoVO = null;
	
	p.getServiceType = function()
	{
		return this._serviceType;
	}
	
	p.getRequest = function()
	{
		return this._currRequest;
	}
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inServiceConnection)
	{
		/*if(!(inServiceConnection instanceof wdf.MySQLServiceConnection))
		{
			throw 'DataHandler : initialize : unknown connection!';
		}*/
		
		this._connection = inServiceConnection;
	}
	
	p.getResultVO = function(inCode, inData, inID, inUniqueID)
	{
		var id = inID ? inID :  this._requestData && this._requestData.id ? this._requestData.id : '';
		var uniqueID = inUniqueID ? inUniqueID :  this._requestData && this._requestData.uniqueID ? this._requestData.uniqueID : '';
		return new wdf.ResultVO(id, this._serviceType, inCode, inData,  uniqueID);
	}
	
	p.request = function(inRequest)
	{
		if(inRequest instanceof wdf.ExpressServiceRequest)
		{
			try
			{
				//var socketRequest = inRequest.data;
				this._requestData =  inRequest.toJsonObject();//JSON.parse(socketRequest.data);
				//console.log(callstack());
				wdf.Tracer.echo(this + ' : request : ' + this._requestData, this, wdf.Tracer.TYPE_DEBUG);
			}
			catch(e)
			{
				wdf.Tracer.echo(this + ' : request : unable to convert client data to data object!', this, wdf.Tracer.TYPE_ERROR);
			}
		}
		
		this._currRequest = inRequest;
		this._userInfoVO = inRequest.requester;
		
		var connection = this._connection;
		
		if( connection && connection.isConnected() )
		{
			//wdf.Tracer.echo( 'DataHandler : request : ' + this._serviceType );
			return this._execute(inRequest);
		}
		
		wdf.Tracer.echo( 'DataHandler : request : no connection is  available!', this, wdf.Tracer.TYPE_DEBUG );
		return false;
	}
	
	p.result = function(inResponse)
	{
		if(inResponse instanceof wdf.ServiceResponse)
		{
			var request = inResponse.request;
			var data = inResponse.data;
			
			inResponse.data = this.getResultVO(  wdf.ServicesErrorID.NONE, data);
			
			if(_.isFunction(request.result))
			{
				request.result(inResponse);
			}
			
			this._dispatchResult
			( 
				//new wdf.ServiceEvent
				//(
					wdf.ServiceEvent.RESPONSE, 
					inResponse/*{response:'fail', error:'game_round_id did not exists'}*/
				//) 
			);
		}
		else
		{
			wdf.Tracer.echo(this + ' : result : unknown data object : ' + inResponse);
		}
	}
	
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
	}
	
	p._execute = function(inRequest)
	{
		return false;
	};
	
	
	p._dispatchResult = function(inType, inResponse, inDelayInterval)
	{
		
		inDelayInterval = _.isNumber(inDelayInterval) /*&& inDelayInterval > 0*/ ? Math.floor( inDelayInterval ) : 0;
		//console.log(callstack());
		//wdf.Tracer.echo('DataHandler : _dispatchResult : inDelayInterval : ' + inDelayInterval, this, wdf.Tracer.TYPE_WARN);
		var that = this;
		
		setTimeout
		(
			function()
			{
				inResponse.request = that._currRequest;
				that.dispatchEvent( new wdf.ServiceEvent( inType, inResponse ) );
			}, 
			inDelayInterval
		);
		
	}
	
	
	p.toString = function()
	{
		return "[object DataHandler]";
	}
	

wdf.DataHandler = DataHandler;
}());