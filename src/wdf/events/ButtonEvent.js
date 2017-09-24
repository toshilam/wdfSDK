this.wdf = this.wdf||{};

(function() {

	var ButtonEvent = function(type, inTargetDisplayObject, inData) 
	{
		this.initialize(type, inTargetDisplayObject, inData);
	}
	
	ButtonEvent.NAME = 'ButtonEvent';
	ButtonEvent.CLICK = 'bclick';
	ButtonEvent.OVER = 'bover';
	ButtonEvent.OUT = 'bout';
	ButtonEvent.UP = 'bup';
	ButtonEvent.DOWN = 'bdown';
	
	var p = ButtonEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	p.targetButton;
	p.event; //orginal event / mouse event
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inTargetDisplayObject, inData, inEvent) 
	{
		this.ApplicatoinEvent_initialize(type, inTargetDisplayObject, inData);
		this.targetButton = inTargetDisplayObject;
		this.event = inEvent;
	}

	p.clone = function() 
	{
		return new wdf.ButtonEvent(this.type, this.targetDisplayObject, this.data);
	}

	p.toString = function() 
	{
		return "[ButtonEvent (type="+this.type+" targetButton="+this.targetDisplayObject+" data="+this.data+")]";
	}

wdf.ButtonEvent = ButtonEvent;
}());