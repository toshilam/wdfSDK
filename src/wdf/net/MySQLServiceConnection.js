// namespace:
this.wdf = this.wdf || {}; 
( function() {

	/**
	* inConnection will be created once the method 'connect' is called!
	*/
	var MySQLServiceConnection = function(inConnection) 
	{
		this.initialize(inConnection);
	}
	
	var p = MySQLServiceConnection.prototype = Object.create( wdf.ServiceConnection.prototype);
	
	p.ServiceConnection_initialize = p.initialize;
	p.initialize = function(inConnection)
	{
		this.ServiceConnection_initialize(inConnection);
	}
	
	p.ServiceConnection_connect  = p.connect;
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		if(!(rest instanceof wdf.MySQLConfigVO))
		{
			wdf.Tracer.echo('MySQLServiceConnection : connect : no config is provided!', this);
			return false;
		}
		//TODO
		//handle connect itself
		wdf.Tracer.echo('MySQLServiceConnection : connect : connecting : ' + rest.host, this);
		
		var pool = mysql.createPool({
			host     : rest.host,
			user     : rest.user,
			password : rest.password,
			database : rest.database
		});
		
		if(!pool)
		{
			wdf.Tracer.echo('MySQLServiceConnection : connect : failed creating pool!', this);
			return false;
		}
		
		this._nc = pool;
		this._isConnected = true;
		this.dispatchEvent(new wdf.ServiceEvent(wdf.ServiceEvent.CONNECT_SUCCESS));
		return true;
	}
	
	p.ServiceConnection_disconnect = p.disconnect;
	p.disconnect = function()//:void
	{
		//TODO
		//handle disconnect itself
		if (this._nc) 
		{
			this._nc = null;
		}
		
		this._isConnected = false;
		this.dispatchEvent(new wdf.ServiceEvent(wdf.ServiceEvent.DISCONNECTED));
	}
	
	
	p.isConnected = function()//:Boolean
	{
		return this._isConnected;
	}
	
	
	/**
	* inRequest : type = not used, data = sql statement, requester = callback function
	*/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		var Tracer = wdf.Tracer;
		var ServiceEvent = wdf.ServiceEvent;
		var self = this;
		
		if (!this.isConnected())
		{
			Tracer.echo('MySQLServiceConnection : calling : server is not connected yet!', this, 0xFF0000);
			return false;
		}
		
		if(!(inRequest instanceof wdf.ServiceRequest))
		{
			Tracer.echo('MySQLServiceConnection : calling : unknwon data type!', this, 0xFF0000);
			return false;
		}
		
		if ( !_.isFunction(inRequest.requester.result) || !_.isFunction(inRequest.requester.fault) )
		{
			Tracer.echo('MySQLServiceConnection : missing responder! ', this, 0xFF0000);
			return false;
		}
		
		Tracer.echo('MySQLServiceConnection : calling : ' + inRequest.type, this, 0xFF0000);
		
		
		//add an unique id into data object for identifying request when server call back
		var uniqueID = wdf.ServiceConnection.getUniqueID();
		//if (inRequest.data == null)
		//{
			//inRequest.data = {};
		//}
		
		//inRequest.data[wdf.ServiceConnection.UNIQUE_ID_PN] = uniqueID;
		
		//to store request for calling back later
		//this._responderMap[uniqueID] = inRequest;
		
		//this._remoteCall(inRequest.type, inRequest.data);
		this._nc.getConnection(function(err, connection) 
		{
			var response = new wdf.ServiceResponse(inRequest, null);
			
			if(connection)
			{
				connection.query( inRequest.sqlStatement, inRequest.escapeValue ,function(err, result) 
				{
					connection.release();
					
					if(result)
					{
						//inRequest.requester.result(response);
						//self.dispatchEvent(new ServiceEvent(ServiceEvent.RESPONSE, response));
						response.data = result;
						self._dispatchServiceEvent(ServiceEvent.RESPONSE, response);
						
						return;
					}
					
					response.data = err;
					self._dispatchServiceEvent(ServiceEvent.FAULT, response);
				});
				
				
				return;
			}
			
			//inRequest.requester.fault(response);
			//self.dispatchEvent(new ServiceEvent(ServiceEvent.FAULT, response));
			response.data = err;
			self._dispatchServiceEvent(ServiceEvent.FAULT, response);
			
		});
		
		
		return true;
	}
	
	p._dispatchServiceEvent = function(inType, inResponse)
	{
		if(inResponse)
		{
			if(inResponse.request.requester && _.isFunction(inResponse.request.requester.result) && _.isFunction(inResponse.request.requester.fault))
			{
				inResponse.request.requester[inType == wdf.ServiceEvent.RESPONSE ? 'result' : 'fault'](inResponse);
			}
			
			this.dispatchEvent(new wdf.ServiceEvent(inType, inResponse));
			return;
		}
		
		Tracer.echo('MySQLServiceConnection : _dispatchServiceEvent : unknown response data', this, 0xFF0000);
	}
	
	p._remoteCall = function(inServiceType/*:String*/, inData/*:Object*/)//:void
	{
		Tracer.echo('MySQLServiceConnection : _remoteCall : called disabled function!', this, 0xFF0000);
	}
	
	p.result = function(data/*:Object*/)//:void 
	{
		Tracer.echo('MySQLServiceConnection : result : called disabled function!', this, 0xFF0000);
	}
	
	p.fault = function(info/*:Object*/)//:void 
	{
		Tracer.echo('MySQLServiceConnection : fault : called disabled function!', this, 0xFF0000);
	}
	

wdf.MySQLServiceConnection = MySQLServiceConnection;
}());
