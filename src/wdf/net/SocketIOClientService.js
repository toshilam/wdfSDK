// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var SocketIOClientService = function(/*inServiceConnection, inUserManager*/) 
	{
		this.initialize(/*inServiceConnection, inUserManager*/);
	}
	
	SocketIOClientService.HEARTBEAT_INTERVAL = 2000;
	SocketIOClientService.INTERNAL_REQ_ID = 1;
	
	var p = SocketIOClientService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._responderMap = null;
	
	p._isConnected;
	p.isConnected = function()
	{
		return this.getServiceConnection() && this._isConnected == true;
	}
	
	p._serviceConnection;//:socket.io-client
	p.getServiceConnection = function() 
	{
		return this._serviceConnection;
	}
	
	
	p.getNextInternalID = function()
	{
		return ++SocketIOClientService.INTERNAL_REQ_ID;
	}
	/*p._heartbeatTimer;
	
	p._autoHeartbeat;
	p.isAutoHeartbeat = function(inValue)
	{
		this._autoHeartbeat = inValue;
		
		var timer = this._heartbeatTimer;
		(inValue ? timer.addEventListener : timer.removeEventListener).call(this._heartbeatTimer, wdf.TimerEvent.TIMER, this._heartTimerEventHandler);
		(inValue ? timer.start : timer.stop).call(this._heartbeatTimer);
	}*/
	
	//p._userManager;// user manager that contains lists of connected users
	/*p.getUserManager = function() 
	{
		return this._userManager;
	}*/
	
	p.initialize = function(/*inServiceConnection, inUserManager*/)
	{
		this._responseHandler = _.bind(this._responseHandler, this);
		this._onConnect = _.bind(this._onConnect, this);
		this._onDisconnect = _.bind(this._onDisconnect, this);
		this._heartTimerEventHandler = _.bind(this._heartTimerEventHandler, this);
		
		this._isConnected = false;
		this._responderMap = {};
		//this._heartbeatTimer = new wdf.Timer(SocketIOClientService.HEARTBEAT_INTERVAL);
		
		//this.isAutoHeartbeat(true);
	}
	
	/**
	* sending request to connected clients
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		if( this.isConnected() )
		{
			//TODO : retry / socketIO should have tried internally
			this._serviceConnection.emit(wdf.ServiceEvent.REQUEST, inRequest);
			return true;
		}
		
		wdf.Tracer.echo('SocketIOClientService : request : no connection has been made!');
		return false;
	}
	
	/**
	* acting the same as [request], and direct call back instead of dispatching event 
	**/
	p.request2 = function(inRequest, inResponder)//:Boolean
	{
		if
		(
			this.isConnected() && 
			_.isString(inRequest.id) && 
			!this._responderMap[inRequest.id] && 
			inResponder instanceof wdf.DataHandler  
		)
		{
			this._responderMap[inRequest.id] = inResponder;
			return this.request(inRequest);
		}
		
		wdf.Tracer.echo('SocketIOClientService : request2 : unknown data!');
		return false;
	}
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		if(!this.getServiceConnection() || this._isConnected == false)
		{
			if(!rest) rest = {};
			
			if( _.isUndefined( rest['force new connection'] ) )
			{
				rest['force new connection'] = true;
			}
			
			wdf.Tracer.echo('SocketIOClientService : connect : connecting : ' + inURL);
			wdf.Tracer.echo(rest);
			
			var socket = this._serviceConnection = require('socket.io-client')(inURL, rest);
			
			socket.on(wdf.ServiceEvent.CONNECT, this._onConnect);
			socket.on(wdf.ServiceEvent.DISCONNECT, this._onDisconnect);
			socket.on(wdf.ServiceEvent.RESPONSE, this._responseHandler);
			
			return true;/*this._serviceConnection.connect(inURL, rest);*/
		}
		
		wdf.Tracer.echo('SocketIOClientService : connect : connection has already made!');
		return false;
	}
	
	p.disconnect = function()//:void
	{
		if(this.getServiceConnection() && this._isConnected == true)
		{
			this._serviceConnection.disconnect();
			this._isConnected = false;
			return true;
		}
		
		wdf.Tracer.echo('SocketIOClientService : disconnect : no connection has been made!');
		return false;
	}
	
	p._responseHandler = function(inResponse)
	{
		var Tracer = wdf.Tracer;
		//Tracer.echo('SocketIOClientService : _responseHandler :', this, Tracer.TYPE_DEBUG);
		//Tracer.echo(inResponse, this, Tracer.TYPE_DEBUG);
		
		var jsonData = null;
		try
		{
			jsonData = _.isString(inResponse) ? JSON.parse(inResponse) : inResponse;
		}
		catch(e)
		{
		}
		
		if
		(
			jsonData &&
			_.isString(jsonData.id) &&
			this._responderMap[jsonData.id] instanceof wdf.DataHandler
		)
		{
			var targetResponder = this._responderMap[jsonData.id];
			delete this._responderMap[jsonData.id];
			targetResponder.result(jsonData);
			
			//Tracer.echo('SocketIOClientService : _requestHandler : waiting for ' + Object.keys(this._responderMap).length + ' response to be executed' );
		}
		//var id = inRequest.socket.id;
		//var userVO = this._userManager.getData(id, wdf.UserManager.GROUP_NAME_ALL);
		//var request = new wdf.ExpressServiceRequest(id, inRequest, userVO);
		//var requestData = request.toJsonObject();
		//
		//if(requestData)
		//{
			this.dispatchEvent( new wdf.ServiceEvent(wdf.ServiceEvent.RESPONSE, inResponse ) );
			return;
		//}
		//
		//Tracer.echo('SocketIOClientService : _requestHandler : unknown request data!');
		//Tracer.echo(inRequest);
	}
	
	p._onConnect = function(inData)
	{
		wdf.Tracer.echo('SocketIOClientService : _onConnect : socket client connected!');
		wdf.Tracer.echo(this._serviceConnection);
		
		this._isConnected = true;
		
		this.dispatchEvent(new wdf.ServiceEvent(wdf.ServiceEvent.CONNECT_SUCCESS, inData) );
	}
	
	p._onDisconnect = function(inData)
	{
		this.dispatchEvent(new wdf.ServiceEvent(wdf.ServiceEvent.DISCONNECTED, inData) );
	}
	
	p._heartTimerEventHandler = function(e)
	{
		//TODO : request heartbeat and check has heartbeat replied, if not re-connect
	}
	
	/*p._isResponseObject = function(inResponse)
	{
		return (inResponse instanceof wdf.ServiceResponse) && (inResponse.request) && (inResponse.request.requester instanceof wdf.UserInfoVO) && (inResponse.data instanceof wdf.ResultVO)
	}*/
	
	
	

wdf.SocketIOClientService = SocketIOClientService;
}());
