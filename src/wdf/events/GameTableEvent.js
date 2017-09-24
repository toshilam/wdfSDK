this.wdf = this.wdf||{};

(function() {

	var GameTableEvent = function(type, inState, inCurrCount, inrepeatCount, inTable, inData) 
	{
	  this.initialize(type, inState, inCurrCount, inrepeatCount, inTable, inData);
	}
	
	GameTableEvent.TICK = 'tick';
	GameTableEvent.IDLE_TIMEOUT = 'idleTimeout'; //a period of time has no player
	GameTableEvent.STATE_CHANGE = 'stateChange';
	GameTableEvent.CARD_RESULT = 'cardResult';
	GameTableEvent.PENDING_REMOVED = 'pendingRemoved'; //fund game pending removed
	GameTableEvent.REMOVE_TABLE_USER = 'removeTableUser'; //a user is being kick out of a table
	GameTableEvent.SHUFFLE_CARD = 'shuffleCard';
	
	GameTableEvent.MATCH_TABLE_BEGIN = 'matchTableBegin'; //match table is ready for playing 
	
	var p = GameTableEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	p.state = '';
	p.currCount = 0;
	p.repeatCount = 0;
	p.UTCTimestamp = 0;
	p.data;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inState, inCurrCount, inrepeatCount, inTable, inData) 
	{
		this.ApplicatoinEvent_initialize(type, inTable, null);
		this.state = inState;
		this.currCount = inCurrCount;
		this.repeatCount = inrepeatCount;
		this.data = inData;
		
		var d = new Date();
		this.UTCTimestamp = Math.floor( (d.getTime() + d.getTimezoneOffset()*60*1000)/1000 );
	}
	
	p.getTable = function()
	{
		return this.targetDisplayObject;
	}

	p.getInfo = function()
	{
		var data = {};
		data['tableName'] = this.getTable().getDealerID();
		data['state'] = this.state;
		data['currCount'] = this.currCount;
		data['repeatCount'] = this.repeatCount;
		data['UTCTimestamp'] = this.UTCTimestamp;
		
		return data;
	}
	
	p.clone = function() 
	{
		return new wdf.GameTableEvent(this.type, this.state, this.currCount, this.repeatCount);
	}
	
	p.toString = function() 
	{
		return "[GameTableEvent (type="+ this.type + ", tableName="+ this.getTable().getDealerID() + ", state="+ this.state+ ", currCount="+ this.currCount+ ", repeatCount="+ this.repeatCount + ")]";
	}

wdf.GameTableEvent = GameTableEvent;
}());