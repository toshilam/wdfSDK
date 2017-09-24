this.wdf = this.wdf||{};

(function() {

	var SystemEvent = function(type, inData) 
	{
		this.initialize(type, inData);
	}
	
	SystemEvent.NAME = 'SystemEvent';
	
	SystemEvent.EXIT = 'exit';
	SystemEvent.SIGINT = 'SIGINT'; //catches ctrl+c event
	SystemEvent.UNCAUGHT_EXCEPTION = 'uncaughtException'; //catches uncaught exceptions
	
	var p = SystemEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inData) 
	{
		this.ApplicatoinEvent_initialize(type, null, inData);
	}

	p.clone = function() 
	{
		return new wdf.SystemEvent(this.type, this.data);
	}

	p.toString = function() 
	{
		return "[SystemEvent (type="+this.type+ " data="+this.data+")]";
	}

wdf.SystemEvent = SystemEvent;
}());