this.wdf = this.wdf || {}; 

(function(){
	
	
	var GameTableVO = function(inTableID, inTableName, inRoundID, inShoeID, inTableCard, inOutcome, inWinningInfo)
	{
		this.initialize(inTableID, inTableName, inRoundID, inShoeID, inTableCard, inOutcome, inWinningInfo);
	}
	
	var p = GameTableVO.prototype = new wdf.VO;
	
	p.tableName;
	p.roundID;
	p.roundName;
	p.shoeID;
	p.cards;
	p.outcome;
	p.winningInfo;
	p.numShuffled;
	
	p._arrHisotry; //raw data from server
	p.rawCardResult; //raw data from server
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inTableID, inTableName, inRoundID, inShoeID, inTableCard, inOutcome, inWinningInfo)
	{
		this.VO_initialize(inTableID);
		this.tableName = inTableName;
		this.roundID = inRoundID;
		this.shoeID = inShoeID;
		this.cards = inTableCard;
		this.outcome = inOutcome;
		this.winningInfo = inWinningInfo;
		this.numShuffled = 0;
		
		this.rawCardResult = null;
		this._arrHisotry = [];
	}
	
	p.getHistory = function(){return this._arrHisotry;}
	p.setHistory = function(inData, inIsAppend)
	{
		if(!_.isArray(inData))
		{
			wdf.Tracer.echo('GameTableVO : setHistory : unknown data object!' + inData, this, wdf.Tracer.TYPE_ERROR );
			return false;
		}
		
		if(inIsAppend === true)
		{
			if(_.isArray(inData))
			{
				var numItem = inData.length;
				for(var i = 0; i < numItem; i++)
				{
					this._arrHisotry.push(inData[i]);
				}
			}
			else
			{
				this._arrHisotry.push(inData);
			}
			
		}
		else
		{
			this._arrHisotry = inData;
		}
		
		return true;
	}
	
	p.toString = function()
	{
		return "[Object GameTableVO( " + this.id + " )]";
	}
	
	
wdf.GameTableVO = GameTableVO;
}());
