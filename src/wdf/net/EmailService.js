// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var EmailService = function() 
	{
		this.initialize();
	}
	
	var p = EmailService.prototype = Object.create( wdf.BaseService.prototype);
	
	p._isConnected = false;
	p._transporter = null;
	p.getServiceConnection = function() 
	{
		return this._connection; //nodemailer
	}
	
	p.BaseService_initialize = p.initialize;
	p.initialize = function()
	{
		this.BaseService_initialize( require('nodemailer') );
		this._isConnected = false;
	}
	
	/**
	* sending request to pmx monitor
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		if(!this._isConnected)
		{
			wdf.Tracer.echo('EmailService : request : pmx is not connected!');
			return false;
		}
		
		if( !(inRequest instanceof wdf.EmailServiceRequest) /*|| !wdf.Tools.hasValue(inRequest.type) || !wdf.Tools.hasValue(inRequest.data)*/ )
		{
			wdf.Tracer.echo('EmailService : request : unknown request data : ' + inRequest, this, wdf.Tracer.TYPE_ERROR);
			return false;
		}
		
		
		
		var mailOptions = inRequest.toOptionObject(); /*{
			from: 'toshilam@wonderfulworld.com', // sender address 
			to: 'toshi.lam@wonderfulworld.com, toshilam@hotmail.com, toshi.lam@toshi.hk, toshi.lam@toprfa.com', // list of receivers 
			subject: 'Hello', // Subject line 
			text: 'Hello world', // plaintext body 
			html: '<b>Hello world</b>' // html body 
		};*/

		this._transporter.sendMail(mailOptions, function(error, info){
			if(error)
			{
				wdf.Tracer.echo(error);
				return;
			}
			
			wdf.Tracer.echo('EmailService : request : Message sent: ' + info.response, this, wdf.Tracer.TYPE_DEBUG);
			wdf.Tracer.echo(info, this, wdf.Tracer.TYPE_DEBUG);
		 
		});
		
		return true;
	}
	
	p.connect = function(inUser/*:String*/, inPassword/*:Object = null*/)//:Boolean
	{
		this._transporter = this.getServiceConnection().createTransport({
			service: 'Gmail',
			auth: {
				user: inUser,
				pass: inPassword
			}
		});
		
		return this._transporter ? this._isConnected = true : false;
	}
	
	p.disconnect = function()//:void
	{
		this._transporter = null;
		this._isConnected =false;
	}
	
	
	

wdf.EmailService = EmailService;
}());
