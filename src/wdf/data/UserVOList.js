this.wdf = this.wdf || {}; 

(function(){
	
	var UserVOList = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = UserVOList.prototype = Object.create( wdf.VOList.prototype);
	
	p.VOList_initialize = p.initialize;
	p.initialize = function(inID)
	{
		this.VOList_initialize(inID);
		
	}
	
	/*p.clone = function() 
	{
		var nVOList = new wdf.UserVOList(this.id);
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			var vo = this.arrVO[i];
			if (vo)
			{
				nVOList.addVO( vo.clone() );
			}
		}
		
		return nVOList;
	}*/
	
	p.VOList_addVO = p.addVO;
	p.addVO = function(inVO)
	{
		if (!inVO || !(inVO instanceof wdf.UserInfoVO))
		{
			wdf.Tracer.echo('UserVOList : addVO : unknown data type : ' + inVO);
			return -1;
		}
		
		var numItem = this.arrVO.length;
		for(var i = 0; i < numItem; i++)
		{
			var targetVO = this.arrVO[i];
			if(targetVO.id == inVO.id)
			{
				wdf.Tracer.echo('UserVOList : addVO : UserInfoVO exist!!');
				return i;
			}
		}
		
		return this.VOList_addVO(inVO);
	}
	
	p.getVOsByThirdPartyID = function(inID)
	{
		if(!wdf.Tools.hasValue(inID))
		{
			return false;
		}
		
		
		var numItem = this.arrVO.length;
		var arrResult = [];
		
		//loop through the list as a user may logged with device at the same time.
		for (var i = 0; i < numItem; i++)
		{
			var targetVO = this.arrVO[i];
			if(targetVO instanceof wdf.UserInfoVO)
			{
				if(targetVO.getThirdPartyID() == inID)
				{
					arrResult.push(targetVO);
				}
			}
		}
		
		return arrResult;
	}
	
	
	p.toInfoObjectList = function(inDeepLevel)
	{
		var arrResult = [];
		var numItem = this.arrVO.length;
		for(var i = 0; i < numItem; i++)
		{
			//try
			//{
				arrResult.push(this.arrVO[i].toInfoObject(_.isNumber(inDeepLevel) ? inDeepLevel : -1));
			//}catch(e){}
		}
		return arrResult;
	}
	
	
	p.toString = function()
	{
		return  "[object UserVOList(id=" + this.id  + ", numVO=" + this.arrVO.length + ")]";
	}
	
	
wdf.UserVOList = UserVOList;
}());
