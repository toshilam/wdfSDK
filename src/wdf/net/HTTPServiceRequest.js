// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var HTTPServiceRequest = function(inType, inData, inRequester, inHost, inShareSecretKey, inSalt) 
	{
		var Tools = wdf.Tools;
		
		this.host = inHost;
		this.initialize(inType, inData, inRequester);
		
		this.shareSecretKey = Tools.hasValue(inShareSecretKey) ? inShareSecretKey : wdf.Config.GAMING_SHARE_SECRET;
		this.salt = Tools.hasValue(inSalt) ? inSalt : Tools.getRandomString(6);
	}
	
	HTTPServiceRequest.TYPE_POST = 'post';
	HTTPServiceRequest.TYPE_GET = 'get';
	
	var p = HTTPServiceRequest.prototype = Object.create( wdf.ExpressServiceRequest.prototype);
	
	
	p.host = '';
	p.shareSecretKey = '';
	p.salt = '';
	
	p.toString = function()
	{
		return "[object HTTPRequestServiceRequest (" + this.host + " )]";
	}
	
	p.toHashString = function( isArray )
	{
		var querystring = require('querystring'); 
		
		var Tools = wdf.Tools;
		var result =  [];
        var jsonData = Tools.hasValue(this.data) && !_.isString(this.data) ? JSON.stringify(this.data) : '';
		
		result['data'] = Tools.base64(jsonData);
		result['salt'] = this.salt;
        result['hash'] = Tools.md5(this.shareSecretKey + result['data'] + result['salt']);
		
		//wdf.Tracer.echo( querystring.stringify(result));
		
		return isArray === true ? result : querystring.stringify(result);
	}
	
	

wdf.HTTPServiceRequest = HTTPServiceRequest;
}());
