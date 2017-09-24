this.wdf = this.wdf||{};

(function() {

	var UserEvent = function(type, inTargetDisplayObject, inData) 
	{
		this.initialize(type, inTargetDisplayObject, inData);
	}
	
	UserEvent.AVATAR_LEAVE_TABLE = 'avatarLeaveTable';
	
	var p = UserEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	p._userVO;
	p.getUserVO = function(){ return this._userVO; }
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inTargetDisplayObject, inData) 
	{
		this.ApplicatoinEvent_initialize(type, inTargetDisplayObject, inData);
		this._userVO = inTargetDisplayObject;
	}

	p.clone = function() 
	{
		return new wdf.UserEvent(this.type, this.targetDisplayObject, this.data);
	}

	p.toString = function() 
	{
		return "[UserEvent (type="+this.type+" userVO="+this.targetDisplayObject+" data="+this.data+")]";
	}

wdf.UserEvent = UserEvent;
}());