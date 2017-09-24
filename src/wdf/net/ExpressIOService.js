// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var ExpressIOService = function(inServiceConnection, inUserManager) 
	{
		this.initialize(inServiceConnection, inUserManager);
	}
	
	ExpressIOService.EXPRESS = require('express');
	
	var p = ExpressIOService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._http;
	p._io;
	p._serviceConnection;//:express
	p.getServiceConnection = function() 
	{
		return this._serviceConnection; //express
	}
	
	p._userManager;// user manager that contains lists of connected users
	p.getUserManager = function() 
	{
		return this._userManager;
	}
	
	p.initialize = function(inServiceConnection, inUserManager)
	{
		var userManager = this._userManager = inUserManager || new wdf.UserManager('express');
		
		if(!userManager.hasAsset(wdf.UserManager.GROUP_NAME_ALL))
		{
			userManager.addAsset( new wdf.UserVOList(wdf.UserManager.GROUP_NAME_ALL), wdf.UserManager.GROUP_NAME_ALL);
		}
		
		var appExpress = this._serviceConnection = inServiceConnection || ExpressIOService.EXPRESS();
		var http = this._http = require('http').Server(appExpress);
		var io = this._io = require('socket.io')(http);
		var bodyParser = require('body-parser');
		
		appExpress.use( bodyParser.json() );       // to support JSON-encoded bodies
		appExpress.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		})); 
		//var conn = this._serviceConnection = inServiceConnection || expressIO;
		//conn.http().io();
		
		//To be set by module itself.
		//conn.listen(wdf.AppGame.GameConfig.EXPRESS_IO_PORT);
		
		this._requestHandler = _.bind(this._requestHandler, this);
		this._onConnect = _.bind(this._onConnect, this);
		this._onDisconnect = _.bind(this._onDisconnect, this);
		
		//io.route('request', this._requestHandler);
		io.on('connection', this._onConnect);
		//conn.io.sockets.on('disconnect', this._onDisconnect);
	}
	
	/**
	* sending request to connected clients
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		return /*this._serviceConnection.request(inRequest);*/
	}
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		return true;/*this._serviceConnection.connect(inURL, rest);*/
	}
	
	p.disconnect = function()//:void
	{
		//this._serviceConnection.disconnect();
	}
	
	p.listen = function(inValue)
	{
		this._http.listen(inValue);
	}
	
	p._requestHandler = function(inRequest, inUserVO)
	{
		wdf.Tracer.echo('ExpressIOService : _requestHandler : ');
		wdf.Tracer.echo(inRequest);
		
		//try
		//{
			//var id = inRequest.socket.id;
			var id = inUserVO.socketIO.id;
			//var userVO = this._userManager.getData(id, wdf.UserManager.GROUP_NAME_ALL);
			var userVO = inUserVO;
			var request = new wdf.ExpressServiceRequest(id, inRequest, userVO);
			var requestData = request.toJsonObject();
			
			if(requestData)
			{
				this.dispatchEvent( new wdf.ServiceEvent(wdf.ServiceEvent.REQUEST, request ) );
				return;
			}
			/*if( !_.isUndefined(requestData.service) && requestData.service == wdf.ApplicationEvent.SUBSCRIBE && !_.isString(requestData.groupName) && requestData.groupName.length )
			{
				this.addGroup( requestData.groupName, inRequest.socket );
			}*/
			
			wdf.Tracer.echo('ExpressIOService : _requestHandler : unknown request data!', this, wdf.Tracer.TYPE_WARN);
			wdf.Tracer.echo(inRequest);
			
		//}
		//catch(e)
		//{
			//wdf.Tracer.echo('ExpressIOService : _requestHandler : fail creating serviceRequest! ');
			//wdf.Tracer.echo(e);
		//}
	}
	
	p._onConnect = function(inSocketClient)
	{
		wdf.Tracer.echo('ExpressIOService : _onConnect : ' + inSocketClient.id, this, wdf.Tracer.TYPE_WARN);
		//wdf.Tracer.echo(inSocketClient.handshake.address.address);
		
		if(inSocketClient && inSocketClient.id)
		{
			var that = this;
			var userVO = this.addGroup(wdf.UserManager.GROUP_NAME_ALL, inSocketClient);
			
			if(userVO instanceof wdf.UserInfoVO)
			{
				this.dispatchEvent( new wdf.ServiceEvent(wdf.ServiceEvent.CONNECT_SUCCESS, userVO ) );
				
				inSocketClient.on('disconnect', function(){ that._onDisconnect(userVO); } );
				inSocketClient.on('request', function(inRequestData){ that._requestHandler({data:inRequestData}, userVO); });
			}
			else
			{
				//TODO failed adding group
			}
		}
		else
		{
			wdf.Tracer.echo('ExpressIOService : _onConnect : unknown socket object!', this, wdf.Tracer.TYPE_WARN);
		}
	}
	
	p._onDisconnect = function(inUserVO)
	{
		wdf.Tracer.echo('ExpressIOService :  _onDisconnect : ' + inUserVO.id, this, wdf.Tracer.TYPE_WARN);
		console.log(inUserVO);
		
		if(inUserVO instanceof wdf.UserInfoVO)
		{
			try
			{
				var groupName = inUserVO.getGroupName();
				
				//wdf.Tracer.echo('ExpressIOService :  _onDisconnect : remove vo id : ' + inUserVO.id + ' : from group : ' + groupName, this, wdf.Tracer.TYPE_WARN );
				
				if(groupName != wdf.UserManager.GROUP_NAME_ALL) this.removeGroup(groupName, inUserVO.socketIO);
				
				//remove user from GROUP_NAME_ALL always be the last, as groupName will be reset to GROUP_NAME_ALL
				this.removeGroup(wdf.UserManager.GROUP_NAME_ALL, inUserVO.socketIO);
				
				this.dispatchEvent( new wdf.ServiceEvent(wdf.ServiceEvent.DISCONNECTED, inUserVO ) );
				wdf.Tracer.echo('ExpressIOService :  _onDisconnect : removed vo id : ' + inUserVO.id + ' : from group : ' + groupName, this, wdf.Tracer.TYPE_WARN );
			}
			catch(e)
			{
				wdf.Tracer.echo('ExpressIOService :  _onDisconnect : fail removing vo id : ' + inUserVO.id + ' : from group : ' + groupName, this, wdf.Tracer.TYPE_WARN );
				wdf.Tracer.echo(e, this, wdf.Tracer.TYPE_WARN);
			}
			
		}
		else
		{
			wdf.Tracer.echo('ExpressIOService :  _onDisconnect : unknown data Object!' );
			wdf.Tracer.echo(inUserVO);
		}
		
		
	}
	
	p._isResponseObject = function(inResponse)
	{
		return (inResponse instanceof wdf.ServiceResponse) && (inResponse.request) && (inResponse.request.requester instanceof wdf.UserInfoVO) && (inResponse.data instanceof wdf.ResultVO)
	}
	
	p.broadcast = function(inResponse, inGroupName)
	{
		if(this._isResponseObject(inResponse))
		{
			var userVOList = this._userManager.getAsset(inGroupName);
			
			wdf.Tracer.echo('ExpressIOService : broadcast : ', this, wdf.Tracer.TYPE_WARN);
			wdf.Tracer.echo(userVOList, this, wdf.Tracer.TYPE_WARN);
			
			if(userVOList instanceof wdf.UserVOList)
			{
				var numItem = userVOList.length();
				for(var i = 0; i < numItem; i++)
				{
					var userVO = userVOList.getVO(i);
					if(userVO)
					{
						wdf.Tracer.echo('------------------------------------------------------------', this, wdf.Tracer.TYPE_WARN);
						wdf.Tracer.echo('ExpressIOService : broadcast : broadcasting to ' + userVO.id, this, wdf.Tracer.TYPE_WARN);
						wdf.Tracer.echo('------------------------------------------------------------', this, wdf.Tracer.TYPE_WARN);
						
						inResponse.request.requester = userVO;
						this.response(inResponse);
					}
				}
				
				return true;
			}
		}
		else
		{
			wdf.Tracer.echo('ExpressIOService : broadcast : unknown data object!', this, wdf.Tracer.TYPE_WARN);
			console.log(inResponse);
		}
		
		return false;
	}
	
	p.response = function(inResponse)
	{
		//wdf.Tracer.echo(inResponse instanceof wdf.ServiceResponse);
		//wdf.Tracer.echo(inResponse.request);
		//wdf.Tracer.echo(inResponse.request.requester instanceof wdf.UserInfoVO);
		//wdf.Tracer.echo(inResponse.data instanceof wdf.ResultVO);
		
		if( this._isResponseObject(inResponse) )
		{
			var response = inResponse; //ServiceResponse
			var request = response.request; //ServiceRequest
			var requester = request.requester; //UserInfoVO
			var resultVO = response.data; //ResultVO
			
			try
			{
				var jsonData = JSON.stringify(resultVO);
				//wdf.Tracer.echo('------ ExpressIOService : response ------', this, wdf.Tracer.TYPE_HELP);
				//wdf.Tracer.echo(jsonData, this, wdf.Tracer.TYPE_HELP);
				//wdf.Tracer.echo(new Date().getTime(), this, wdf.Tracer.TYPE_HELP);
				
				requester.socketIO.emit('response', jsonData);
				return true;
			}
			catch(e)
			{
				wdf.Tracer.echo('ExpressIOService : response : failed sending response to back to client : ' + e, this, wdf.Tracer.TYPE_WARN);
			}
		}
		else
		{
			wdf.Tracer.echo('ExpressIOService : response : unknown data object!', this, wdf.Tracer.TYPE_WARN);
		}
		
		return false;
	}
	
	p.addGroup = function(inGroupName, inSocketClient)
	{
		var Tracer = wdf.Tracer;
		
		if
		(
			!wdf.Tools.hasValue(inGroupName) || 
			!inSocketClient || 
			!wdf.Tools.hasValue(inSocketClient.id)
		)
		{
			Tracer.echo('ExpressIOService : addGroup : unknown data object!', this, Tracer.TYPE_WARN);
			return false;
		}
		
		
		var userManager = this._userManager;
		
		if(/*inGroupName != wdf.UserManager.GROUP_NAME_ALL &&*/ !userManager.hasAsset(inGroupName))
		{
			userManager.addAsset( new wdf.UserVOList(inGroupName), inGroupName);
		}
		
		var userVO = userManager.getData(inSocketClient.id, inGroupName);
		
		if(userVO)
		{
			wdf.Tracer.echo('ExpressIOService : addGroup : user already in group nothing else need to be done : ' +inSocketClient.id+ ' group : ' + inGroupName, this, wdf.Tracer.TYPE_WARN);
			
			return userVO;
		}
		
		
		if(inGroupName == wdf.UserManager.GROUP_NAME_ALL)
		{
			userVO = new wdf.UserInfoVO(inSocketClient.id, null, null, null, null, inSocketClient, wdf.UserManager.GROUP_NAME_ALL);
		}
		else
		{
			userVO = userManager.getData(inSocketClient.id, wdf.UserManager.GROUP_NAME_ALL);
			if(!(userVO instanceof wdf.UserInfoVO))
			{
				Tracer.echo('ExpressIOService : addGroup : failed adding user to group!', this, Tracer.TYPE_WARN);
				return false;
			}
			
			//remove user from previously joined group
			var currGroupName = userVO.getGroupName();
			if(wdf.Tools.hasValue(currGroupName) && currGroupName != wdf.UserManager.GROUP_NAME_ALL && currGroupName != inGroupName)
			{
				this.removeGroup(currGroupName, userVO.socketIO);
			}
		}
		
		userVO.setGroupName(inGroupName);
		this._userManager.getAsset(inGroupName).addVO( userVO );
		Tracer.echo('ExpressIOService : addGroup : adding ' + inSocketClient.id + ' into ' + inGroupName, this, Tracer.TYPE_DEBUG);
		console.log(callstack());
		return userVO;
		
		/*if(!userVO)
		{
			if(inGroupName == wdf.UserManager.GROUP_NAME_ALL)
			{
				userVO = new wdf.UserInfoVO(inSocketClient.id, null, null, null, null, inSocketClient, wdf.UserManager.GROUP_NAME_ALL);
			}
			else
			{
				userVO = userManager.getData(inSocketClient.id, wdf.UserManager.GROUP_NAME_ALL);
				if(!(userVO instanceof wdf.UserInfoVO))
				{
					Tracer.echo('ExpressIOService : addGroup : failed adding user to group!', this, Tracer.TYPE_WARN);
					return false;
				}
			}
			
			this._userManager.getAsset(inGroupName).addVO( userVO );
		}
		else
		{
			//remove user from previously joined group
			var currGroupName = userVO.getGroupName();
			if(wdf.Tools.hasValue(currGroupName) && currGroupName != wdf.UserManager.GROUP_NAME_ALL)
			{
				this.removeGroup(currGroupName, userVO.socketIO);
			}
		}
		
		userVO.setGroupName(inGroupName);
		Tracer.echo('ExpressIOService : addGroup : adding ' + inSocketClient.id + ' into ' + inGroupName, this, Tracer.TYPE_DEBUG);
		return userVO;*/
	}
	
	p.removeGroup = function(inGroupName, inSocketClient)
	{
		var Tracer = wdf.Tracer;
		
		if
		(
			!wdf.Tools.hasValue(inGroupName) || 
			!inSocketClient || 
			!wdf.Tools.hasValue(inSocketClient.id)
		)
		{
			Tracer.echo('ExpressIOService : removeGroup : unknown data object!', this, Tracer.TYPE_WARN);
			return false;
		}
		
		wdf.Tracer.echo('ExpressIOService :  removeGroup : removing user : ' + inSocketClient.id + ' : from group : ' + inGroupName, this, wdf.Tracer.TYPE_WARN );
		
		var userManager = this._userManager;
		var userVOList = userManager.getAsset(inGroupName);
		
		if(userVOList instanceof wdf.UserVOList)
		{
			var userVO = userVOList.removeVOByID(inSocketClient.id);
			
			if(!userVOList.length)
			{
				userManager.removeAsset(inGroupName);
			}
			
			//after removing user from a group reset back to GROUP_NAME_ALL
			//TODO : if remove GROUP_NAME_ALL group call before, the actual join group will be lost. disable it?
			if(userVO instanceof wdf.UserInfoVO)
			{
				userVO.setGroupName(wdf.UserManager.GROUP_NAME_ALL);
				return userVO;
			}
			
			
		}
		
		Tracer.echo('ExpressIOService : removeGroup : no user found!', this, Tracer.TYPE_WARN);
		return false;
	}
	
	

wdf.ExpressIOService = ExpressIOService;
}());
