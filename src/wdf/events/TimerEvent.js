this.wdf = this.wdf||{};

(function() {

	var TimerEvent = function(type/*, inServiceResponse, inData*/) 
	{
	  this.initialize(type/*, inServiceResponse, inData*/);
	}
	
	TimerEvent.TIMER = 'timer';
	TimerEvent.TIMER_COMPLETE = 'timerComplete';
	
	var p = TimerEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type/*, inServiceResponse, inData*/) 
	{
		this.ApplicatoinEvent_initialize(type, null, null);
		
	}

	p.clone = function() 
	{
		return new wdf.TimerEvent(this.type/*, this._response, this._result*/);
	}

	p.toString = function() {
		return "[TimerEvent (type="+this.type/*+" response=" + this._response + " data="+this._result*/ + ")]";
	}

wdf.TimerEvent = TimerEvent;
}());