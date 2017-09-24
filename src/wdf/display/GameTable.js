
( function() {

	
	var GameTable = function(inTableID, inTableName, inType) 
	{
		this.initialize(inTableID, inTableName, inType);
	}
	
	GameTable.TYPE_BAC_SP = 'sp'; 
	GameTable.TYPE_BAC_MP = 'mp';
	GameTable.TYPE_BAC_AVATAR_SP = 'avatarsp';
	GameTable.TYPE_BAC_AVATAR_MP = 'avatarmp';
	GameTable.TYPE_BAC_MATCH_SP = 'matchsp';
	GameTable.TYPE_BAC_MATCH_MP = 'matchmp';
	GameTable.TYPE_BAC_MY_AVATAR_MP = 'my-avatarmp'; //used for get-table
	
	//matched with BD game_table type
	GameTable.TABLE_TYPE_PUBLIC = 'PUBLIC1'; //member point system table
	GameTable.TABLE_TYPE_PRIVATE = 'PRIVATE'; //banker point avatar table
	GameTable.TABLE_TYPE_MATCH = 'MATCH'; //match point operator table
	
	GameTable.SESSION_TYPE_ALL = 'all'; //internal use, get all tables
	GameTable.SESSION_TYPE_MEMBER = 'memberPoint.v1';
	GameTable.SESSION_TYPE_BANKER = 'bankerPoint';
	GameTable.SESSION_TYPE_MATCH = 'matchPoint';
	
	GameTable.NAME_TYPE_MEMBER = 'table';
	GameTable.NAME_TYPE_BANKER = 'avatartable';
	GameTable.NAME_TYPE_MATCH = 'matchtable';
	
	GameTable.MEMBER_STATUS_ACTIVE = 'ACTIVE';
	GameTable.MEMBER_STATUS_INACTIVE = 'INACTIVE';
	
	GameTable.STATUS_ACTIVE = 'ACTIVE';
	GameTable.STATUS_DELETED = 'DELETED';
	
	GameTable.STATE_BEGIN = 0;
	GameTable.STATE_SHUFFLE = 1;
	GameTable.STATE_SHUFFLED = 2;
	GameTable.STATE_COUNTING_DOWN = 3;
	GameTable.STATE_COUNTING_DOWN_BUFFER = 4;
	GameTable.STATE_DEAL = 5; //get card result
	GameTable.STATE_DEALING = 6; 
	//GameTable.STATE_WIN = 7; 
	//GameTable.STATE_WINNING = 8; 
	GameTable.STATE_COMPLETE = 7;
	GameTable.STATE_COMPLETED = 8;
	
	GameTable.DURATION_COUNTING_DOWN = 5;
	GameTable.DURATION_COUNTING_DOWN_BUFFER = 0;
	GameTable.DURATION_DEALING = 10;
	GameTable.DURATION_COMPLETE = 10;
	
	var p = GameTable.prototype// = new Object();
	
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._tableVO = null;
	p._currState = -1;
	p._type = '';
	p._sessionType = '';
	p._tableType = '';
	p._objError = null;
	//list of funded game history (including failed/successed ones)
	//p._objFundGameResultData = null;
	
	//list of successfully funded game 
	p._objFundGameData = null;
	p.getFundGameData = function(){ return this._objFundGameData; }
	
	//p._tableName = '';
	p.getTableName = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.tableName : ''; }
	//p._tableID = -1;
	p.getTableID = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.id : ''; }
	//p._currRoundID = -1;
	p.getRoundID = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.roundID : ''; }
	p.getRoundName = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.roundName : ''; }
	
	p.getNumShuffled = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.numShuffled : 0; }
	p.setNumShuffled = function(inValue)
	{
		if(this._tableVO instanceof wdf.GameTableVO && _.isNumber(inValue) )
		{
			this._tableVO.numShuffled = inValue;
			return true;
		}
		
		return false;
	}
	
	//p._currShoeID = -1;
	p.getShoeID = function(){ return this._tableVO instanceof wdf.GameTableVO ? this._tableVO.shoeID : ''; }
	p.setShoeID = function(inShoeID)
	{
		if( wdf.Tools.hasValue(inShoeID) )
		{
			this._tableVO.shoeID = inShoeID;
			return true;
		}
		
		return false;
	}
	
	p._minMax = null;
	p.getMinMax = function(){ return this._minMax; }
	p.setMinMax = function(inMin,inMax)
	{
		if(_.isNumber(inMin) && _.isNumber(inMax))
		{
			this._minMax[0] = inMin;
			this._minMax[1] = inMax;
			return true;
		}
		
		return false;
	}
	
	p._colorID = -1;
	p.getColorID = function(){ return this._colorID; }
	p.setColorID = function(inData)
	{
		if( inData )
		{
			this._colorID = inData;
			return true;
		}
		
		return false;
	}
	
	p._productID = -1;
	p.getProductID = function(){ return this._productID; }
	p.setProductID = function(inData)
	{
		if( inData )
		{
			this._productID = inData;
			return true;
		}
		
		return false;
	}
	
	p.getHistory = function(){ return null; }
	p.setHistory = function(inHistory)
	{
		//to be implemented by chird
		
		return false;
	}
	
	p._userList = null;
	
	p._pendingFundList = null;
	p.getpendingFundList = function(){ return this._pendingFundList; }
	
	p._durationCountDown = -1;
	p._durationCountDownBuffer = -1;
	p._durationDealing = -1;
	p._durationComplete = -1;
	
	p._arrPools = null; //pool info from server
	p.getPools = function(){ return this._arrPools; }
	p.setPools = function(inData)
	{
		if( !_.isArray(inData) || !inData.length )
		{
			wdf.Tracer.echo('GameTable : setPools : unknown data!');
			return false;
		}
		
		this._arrPools = inData;
		return true;
	}
	
	
	
	//to be set by GetBacCardResult //
	p.isWaitingCardResult = false;
	p._isCompletedGame = false;
	
	p._isDestoryed = false;
	p.isDestoryed = function()
	{
		return this._isDestoryed;
	}
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inTableID, inTableName/*, inType*/)
	{
		if(!inTableID || !inTableName /*|| !inType*/)
		{
			return false;
		}
		this._isDestoryed = false;
		this._tableVO = new wdf.GameTableVO(inTableID, inTableName);
		
		this._productID = wdf.Config.GAMING_WW_PRODUCT_ID;
		this._type = /*inType ||*/ GameTable.TYPE_BAC_SP;
		this._sessionType = GameTable.SESSION_TYPE_MEMBER;
		this._minMax = [];
		this._objFundGameData = {};
		this._objError = {};
		//this._objFundGameResultData = {};
		this._pendingFundList = {};
		
		this._userList = new wdf.UserVOList(inTableID);
		
		this.setTableStateDuration
		(
			GameTable.DURATION_COUNTING_DOWN, 
			GameTable.DURATION_COUNTING_DOWN_BUFFER, 
			GameTable.DURATION_DEALING, 
			GameTable.DURATION_COMPLETE
		);
		
		return true;
	}
	
	p.destory = function()
	{
		wdf.Tracer.echo('GameTable : destory : ' + this, this, wdf.Tracer.TYPE_ERROR);
		this._tableVO.clear();
		//this._tableVO = null;
		
		this._objFundGameData = {};
		this._objError = {};
		this._pendingFundList = {};
		this._minMax = [];
		this._userList.clear();
		//this._userList = null;
		this._isDestoryed = true;
	}
	
	p.getInfo = function(inServiceType)
	{
		//to be implemented in child class
	}
	
	p.getType = function()
	{
		//sp, mp, avatarsp, avatarmp
		return this._type;
	}
	
	//to be override by child class
	p.getTableSessionType = function()
	{
		//memberPoint, bankerPoint, matchPoint
		return GameTable.SESSION_TYPE_MEMBER;
	}
	
	p.getSessionType = function()
	{
		//memberPoint, bankerPoint, matchPoint.xxx
		return this._sessionType;
	}
	
	p.getTableType = function()
	{
		//public, private
		//to be orrived by child
		return this._tableType;
	}
	
	p.setTableStateDuration = function(inCountDown, inCountDownBuffer, inDealing, inComplete)
	{
		this._durationCountDown = inCountDown;
		this._durationCountDownBuffer = inCountDownBuffer;
		this._durationDealing = inDealing;
		this._durationComplete = inComplete;
	}
	
	p.getUserList = function(){ return this._userList; }
	
	p.hasPlayer = function()
	{
		return this.getUserList().length() > 0;
	}
	
	p.hasJoined = function(inUserInfoVO)
	{
		return inUserInfoVO instanceof wdf.UserInfoVO && this.getUserList().toArray().indexOf(inUserInfoVO) != -1;
	}
	
	p.joinTable = function(inUserInfoVO)
	{
		if( inUserInfoVO instanceof wdf.UserInfoVO )
		{
			var index = this.getUserList().addVO(inUserInfoVO);
			if(index != -1)
			{
				//if( !_.isArray(this._objFundGameData[inUserInfoVO.id]) )
				//{
					//always create new array
					this._objFundGameData[inUserInfoVO.id] = [];
				//}
				return index;
			}
			
			
		}
		
		return -1;
	}
	
	p.leaveTable = function(inUserInfoVO)
	{
		if( inUserInfoVO && (inUserInfoVO instanceof wdf.UserInfoVO) && this.getUserList().removeVOByID(inUserInfoVO.id) )
		{
			//no need to clear data, will be cleared when begin game
			return true;
		}
		
		return false;
	}
	
	
	
	//p.setRoundID = function(inRoundID)
	p.beginGame = function(inRoundID, inRoundName)
	{
		//if(_.isNumber(inRoundID))
		//if(wdf.Tools.hasValue(inRoundID))
		{
			this.isWaitingCardResult = false;
			this._isCompletedGame = false;
			this._objFundGameData = {};
			this._objError = {};
			this._pendingFundList = {};
			//this._objFundGameResultData = {};
			this._tableVO.roundID = Number(inRoundID);
			this._tableVO.roundName = inRoundName;
			
			this._tableVO.cards = null;
			this._tableVO.outcome = null;
			this._tableVO.winningInfo = null;
			this._tableVO.rawCardResult = null;
			
			return true;
		}
		
		return false;
	}
	
	p.hasError = function(inService)
	{
		return !!( _.isArray(this._objError[inService]) && this._objError[inService].length);
	}
	
	p.addError = function(inService, inData)
	{
		if( !inService || !inData )
		{
			wdf.Tracer.echo('GameTable : addError : unknown data object : ' + this.getRoundID());
			return false;
		}
		
		if( !_.isArray(this._objError[inService]) )
		{
			this._objError[inService] = [];
		}
		wdf.Tracer.echo('GameTable : addError : added : ' + inService + ', for round : ' + this.getRoundID());
		this._objError[inService].push(inData);
		return true;
		
	}
	
	p.getError = function(inService)
	{
		return this._objError[inService];
	}
	
	p.hasFundedGame = function(inUserVO)
	{
		return !!(inUserVO instanceof wdf.UserInfoVO && _.isArray(this._objFundGameData[inUserVO.id]) && this._objFundGameData[inUserVO.id].length);
	}
	
	p.addFundGame = function(inUserVO, inData)
	{
		if
		(
			!(inUserVO instanceof wdf.UserInfoVO) || 
			!inData || 
			(
				this._type != GameTable.TYPE_BAC_MP &&
				this._type != GameTable.TYPE_BAC_AVATAR_MP &&
				this._type != GameTable.TYPE_BAC_MATCH_MP &&
				this.hasFundedGame(inUserVO)
			)
		)
		{
			wdf.Tracer.echo('GameTable : addFundGame : fail game has already been funded! roundID : ' + this.getRoundID());
			return false;
		}
		/*else if( !_.isArray(this._objFundGameData[inUserVO.id]) )
		{
			wdf.Tracer.echo('GameTable : addFundGame : no user data found : ' + this.getRoundID() + ' (' + inUserVO.id + ')' );
			return false;
		}*/
		if( !_.isArray(this._objFundGameData[inUserVO.id]) )
		{
			this._objFundGameData[inUserVO.id] = [];
		}
		
		if( !_.isArray(this._pendingFundList[inUserVO.id]) )
		{
			this._pendingFundList[inUserVO.id] = [];
		}
			
		this._objFundGameData[inUserVO.id].push(inData);
		this._pendingFundList[inUserVO.id].push(inData);
		
		return true;
		
	}
	
	//remove pending fundGame data
	p.confirmFundGame = function(inUserVO, inData)
	{
		var objPending = this._removePending(inUserVO, inData);
		
		if(!objPending)
		{
			wdf.Tracer.echo('GameTable : confirmFundGame : fail removing pending : ' + inData, this, wdf.Tracer.TYPE_ERROR);
		}
		else
		{
			wdf.Tracer.echo('GameTable : confirmFundGame : success : user '+ inUserVO.id +' num pending ' + this._pendingFundList[inUserVO.id].length + ' left!', this, wdf.Tracer.TYPE_WARN);
		}
		
		
		
		return objPending;
		
	}
	
	p.getConfirmedFundGameByVO = function(inUserVO)
	{
		var arrConfirmedData = [];
		
		if(inUserVO instanceof wdf.UserInfoVO)
		{
			var targetPendingArray = this._pendingFundList[inUserVO.id];
			var targetFundGameArray = this._objFundGameData[inUserVO.id];
			
			var numItem = _.isArray(targetFundGameArray) && _.isArray(targetPendingArray) ? targetFundGameArray.length : 0;
			for(var i = 0; i < numItem; i++)
			{
				var targetFundGame = targetFundGameArray[i];
				if(targetFundGame && targetPendingArray.indexOf(targetFundGame) == -1)
				{
					arrConfirmedData.push(targetFundGame);
				}
			}
		}
		
		return arrConfirmedData;
	}
	
	p.getNumFundGame = function(inUserID)
	{
		if(inUserID)
		{
			return _.isArray(this._objFundGameData[inUserID]) ? this._objFundGameData[inUserID].length : 0;
		}
		
		var numFundGame = 0;
		
		for(targetIndex in this._objFundGameData)
		{
			var arrUserFundGame = this._objFundGameData[targetIndex];
			numFundGame += _.isArray(arrUserFundGame) ? arrUserFundGame.length : 0;
		}
		
		return numFundGame;
	}
	
	p.removeFundGame = function(inUserVO, inData)
	{
		if( !(inUserVO instanceof wdf.UserInfoVO) || !inData || !_.isArray(this._objFundGameData[inUserVO.id]) )
		{
			wdf.Tracer.echo('GameTable : removeFundGame : unknown data object!');
			return false;
		}
		
		//can be fail as pending may have removed before
		this._removePending(inUserVO, inData);
		
		var targetFundGameArray = this._objFundGameData[inUserVO.id];
		var indexFundGame = targetFundGameArray.indexOf(inData);
		
		return indexFundGame == -1 ? false : targetFundGameArray.splice(indexFundGame, 1)[0];
		
	}
	
	p._removePending = function(inUserVO, inData)
	{
		if( !(inUserVO instanceof wdf.UserInfoVO) || !inData || !_.isArray(this._pendingFundList[inUserVO.id]) )
		{
			wdf.Tracer.echo('GameTable : removePending : unknown data object!');
			return false;
		}
		
		
		
		var targetPendingArray = this._pendingFundList[inUserVO.id];
		var indexPending = targetPendingArray.indexOf(inData);
		
		var targetObject = indexPending == -1 ? false : targetPendingArray.splice(indexPending, 1)[0];
		
		this.dispatchEvent( new wdf.GameTableEvent(wdf.GameTableEvent.PENDING_REMOVED, -1, -1, -1, this, targetObject) );
		return targetObject;
	}
	
	p.hasPending = function()
	{
		var hasPendingFundGame = false;
		
		try
		{
			for(var targetIndex in this._pendingFundList)
			{
				var arrPending = this._pendingFundList[targetIndex];
				
				if(arrPending.length)
				{
					hasPendingFundGame = true;
					break;
				}
			}
		}
		catch(e)
		{
		}
		
		
		return hasPendingFundGame;
	}
	
	p.hasCardResult = function()
	{
		return !!(this._tableVO && this._tableVO.cards && this._tableVO.outcome);
	}
	
	p.getCardResult = function(){return this._tableVO.rawCardResult;}
	//p.setCardResult = function(inResultObj)
	p.cardResult = function(inResultObj, inRawCardResult)
	{
		if
		(
			inRawCardResult && 
			inResultObj && 
			inResultObj.cards && 
			inResultObj.outcome && 
			//!_.isUndefined(inResultObj.winningInfo) && 
			String(inResultObj.roundID) == this.getRoundID()
		)
		{
			this._tableVO.cards = inResultObj.cards;
			this._tableVO.outcome = inResultObj.outcome;
			this._tableVO.rawCardResult = inRawCardResult;
			
			
			this.dispatchEvent( new wdf.GameTableEvent(wdf.GameTableEvent.CARD_RESULT) );
			return true;
		}
		
		wdf.Tracer.echo('GameTable : cardResult : fail setting : roundID : ' + this.getRoundID());
		wdf.Tracer.echo(inResultObj);
		return false;
	}
	
	p.updateWinning = function(inResultObj)
	{
		if
		(
			inResultObj && 
			inResultObj.bets && 
			String(inResultObj.roundID) == this.getRoundID()
		)
		{
			//TODO : check each bet object? be sure each item has successfully updated?
			this._tableVO.winningInfo = inResultObj;
			
			//this.dispatchEvent( new wdf.GameTableEvent(wdf.GameTableEvent.CARD_RESULT) );
			return true;
		}
		
		wdf.Tracer.echo('GameTable : updateWinning : failed : roundID : ' + this.getRoundID() );
		wdf.Tracer.echo(inResultObj);
		return false;
	}
	
	p.getWinningInfo = function()
	{
		return this._tableVO.winningInfo;
	}
	
	p.isCompletedGame = function(inRoundID)
	{
		return this._isCompletedGame && inRoundID == this.getRoundID();
	}
	
	p.completeGame = function(inRoundID)
	{
		if(inRoundID == this.getRoundID() )
		{
			this._isCompletedGame = true;
			return true;
		}
		
		return false;
	}
	
	//to be overrided by child class
	p.restartGame = function(inData)
	{
		return true;
	}
	
	//p.getState = function(){return this._currState;}
	/*p.setState = function(inState)
	{
		switch(inState)
		{
			case GameTable.STATE_BEGIN:
			case GameTable.STATE_SHUFFLING:
			case GameTable.STATE_COUNTING_DOWN:
			case GameTable.STATE_COUNTING_DOWN_BUFFER:
			case GameTable.STATE_DEALING:
			case GameTable.STATE_COMPLETE:
			{
				this._currState = inState;
				this.reset();
				this.start();
				return true;
			}
		}
		
		return false;
	}*/
	
	/*p.getDurationByState = function(inState)
	{
		switch(inState)
		{
			//case GameTable.STATE_BEGIN:						return 0;
			//case GameTable.STATE_SHUFFLING:					return 0;
			case GameTable.STATE_COUNTING_DOWN:				return GameTable.DURATION_COUNTING_DOWN;
			case GameTable.STATE_COUNTING_DOWN_BUFFER:		return GameTable.DURATION_COUNTING_DOWN_BUFFER;
			case GameTable.STATE_DEALING:					return GameTable.DURATION_DEALING;
			case GameTable.STATE_COMPLETE:					return GameTable.DURATION_COMPLETE;
		}
		
		
		wdf.Tracer.echo('GameTable : getDurationByState : unknown state!');
		return -1;
	}*/
	
	
	
	p.toString = function()
	{
		return "[object GameTable (id=" + this._tableVO.id  + ", name=" + this._tableVO.tableName + "]";
	}
	

wdf.GameTable = GameTable;
}());