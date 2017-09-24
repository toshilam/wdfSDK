this.wdf = this.wdf || {}; 

(function(){
	
	var UserInfoVO = function( inID, inCurrency, inCashBal, inBonusBal, inToken, inSocketIO, inGroupName )
	{
		this.initialize(inID, inCurrency, inCashBal, inBonusBal, inToken, inSocketIO, inGroupName);
	}
	
	var p = UserInfoVO.prototype = Object.create( wdf.VO.prototype);
	
	p.socketIO = null; //express io socket
	
	p._ip = null;
	p.getIP = function() 
	{
		if(!this._ip)
		{
			try{ this._ip = this.socketIO.handshake.address.address; } 
			catch(e){ this._ip = '0.0.0.0'; }
		}
		
		return this._ip; 
	}
	
	p._groupName = ''; //which group belonging to
	p.getGroupName = function() { return this._groupName; }
	p.setGroupName = function(value)
	{
		this._groupName = value;
		this.dispatchChangeEvent('groupName', value);
	}
	
	
	
	//p.isDemo = true;
	p.currency = null;
	p.bonusBal = 0; //The bonus balance of the player in his base currency in cents
	p._token = '';
	p.getToken = function() { return this._token; }
	p.setToken = function(value)
	{
		this._token = value;
		this.dispatchChangeEvent('token', value);
	}
	
	p._avatarToken = '';
	p.getAvatarToken = function() { return this._avatarToken; }
	p.setAvatarToken = function(value)
	{
		this._avatarToken = value;
		this.dispatchChangeEvent('avatarToken', value);
	}
	
	p._cashBal = 0; // The cash balance of the player in his base currency in cents.
	p.getCashBal = function() {return this._cashBal;}
	p.setCashBal = function(value)
	{
		this._cashBal = value;
		this.dispatchChangeEvent('cashBal', value);
	}
	
	p.getThirdPartyID = function()
	{
		return this.get('thirdPartyID');
	}
	
	p.getAvailableTable = function(inType){ return this.get(inType); }
	p.setAvailableTable = function(inType, inData){ return this.set(inType, inData); }
	
	p._properties = null; //an object contains all additional setting via setter
	p.set = function(inKey, inData)
	{
		this._properties[inKey] = inData;
	}
	
	p.get = function(inKey)
	{
		return this._properties[inKey];
	}
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inCurrency, inCashBal, inBonusBal, inToken, inSocketIO, inGroupName)
	{
		if(!inSocketIO)
		{
			throw 'UserInfoVO : initialize : no socket object is provided!';
		}
		
		this.VO_initialize(inID);
		
		this.currency = inCurrency;
		this._cashBal = inCashBal;
		this.bonusBal = inBonusBal;
		this.token = inToken;
		//this.isDemo = inIsDemo;
		this.socketIO = inSocketIO;
		this._groupName = inGroupName;
		
		this._properties = {};
	}
	
	p.isLogged = function()
	{
		return _.isString(this._token) && _.isString(this._avatarToken) && this._token.length && this._avatarToken.length;
	}
	
	p.clear = function()
	{
		this.currency = null;
		
		this.bonusBal = this._cashBal = 0;
		this.token = this._avatarToken = this.groupName = '';
		//this.isDemo = true;
		this.socketIO = null;
		this.ip = null;
		
		this._properties = null;
	}
	
	p.clone = function()
	{
		return new wdf.UserInfoVO(this.id, this.currency, this._cashBal, this.bonusBal, this.token, this.socketIO, this._groupName);
	}
	
	p.toInfoObject = function(inDeepLevel)
	{
		/*var info = {};
		for(var key in this)
		{
			var data = null;
			
			if(_.isFunction(this[key]))
			{
				continue;
			}
			else if(_.isObject(this[key]))
			{
				data  = this[key].toString();
			}
			else
			{
				data = this[key];
			}
			
			
			info[key] = data;
		}*/
		
		//return wdf.Tools.clone(this);
		return wdf.Tools.cloneWithLevel(this, _.isNumber(inDeepLevel) ? inDeepLevel : -1);
	}
	
	p.toString = function()
	{
		return "[object UserInfoVO (id=" + this.id  + ")]";
	}
	
	
	
	
wdf.UserInfoVO = UserInfoVO;
}());
