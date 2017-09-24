// namespace:
this.wdf = this.wdf || {}; 
( function() {
	
	
	var PackageBuilder = function() 
	{
		throw "PackageBuilder cannot be instantiated.";
	}
	
	var p = PackageBuilder.prototype = new Object();
	
	/**
	* @param inOriginalUserVO : original requester
	* @param inService : type of service
	* @param inData : request data
	* @param inIsInternal : is internal call for user
	* @param inIsSystem : is internal system call for system itself
	**/
	PackageBuilder.expressRequest = function(inOriginalUserVO, inService, inData, inIsInternal, inIsSystem)
	{
		if(inOriginalUserVO instanceof wdf.UserInfoVO)
		{
			var DataID = wdf.DataID;
			var requestData = inData || {};
			requestData[DataID.SERVICE] = inService;
			requestData[DataID.USER_VO] = {id:inOriginalUserVO.id};
			requestData[DataID.EXTRA_VO] = {internal:inIsInternal === true};
			requestData[DataID.EXTRA_VO].system = inIsSystem === true;
			
			return {data:requestData};
		}
		
		return false;
	}
	
	PackageBuilder.expressResponse = function(inUserVO, inRequestData, inID, inService, inCode, inData, inUniqueID)
	{
		return new wdf.ServiceResponse
		(
			new wdf.ExpressServiceRequest(inService, inRequestData, inUserVO), 
			new wdf.ResultVO(inID, inService, inCode, inData, inUniqueID) 
		);
	}
	
	PackageBuilder.getBroadcastData = function(inData, inService, inUserList)
	{
		if( inData && _.isArray(inUserList) )
		{
			var DataID = wdf.DataID;
			
			var objDataInfo = inData[DataID.EXTRA_VO];
			if(!objDataInfo) objDataInfo = {};
			
			objDataInfo[DataID.EXTRA_USER_LIST] = /*_.isArray(objDataInfo[DataID.EXTRA_USER_LIST]) ? objDataInfo[DataID.EXTRA_USER_LIST] :*/ [];
			
			var numItem = inUserList.length;
			for(var i = 0; i < numItem; i++)
			{
				try
				{
					objDataInfo[DataID.EXTRA_USER_LIST].push({ id:inUserList[i].id });
				}
				catch(e){}
			}
			
			inData[DataID.SERVICE] = inService;
			inData[DataID.EXTRA_VO] = objDataInfo;
			
			return inData;
		}
		
		return null;
	}
	
	PackageBuilder.getBroadcastUserList = function(inData, inAutoRemove)
	{
		var DataID = wdf.DataID;
		
		try
		{
			var result = inData[DataID.EXTRA_VO][DataID.EXTRA_USER_LIST];
			if(inAutoRemove === true) delete inData[DataID.EXTRA_VO][DataID.EXTRA_USER_LIST];
			
			return result;
		}
		catch(e){}
		
		return null;
	}
	
	PackageBuilder.isInternalRequest = function(inData)
	{
		return inData && inData[wdf.DataID.EXTRA_VO] && inData[wdf.DataID.EXTRA_VO].internal === true;
	}
	
	PackageBuilder.isSystemRequest = function(inData)
	{
		return inData && inData[wdf.DataID.EXTRA_VO] && inData[wdf.DataID.EXTRA_VO].system === true;
	}
	
	PackageBuilder.getRequestUniqueID = function(inData, inPrefix)
	{
		return (_.isString(inPrefix) && inPrefix.length ? inPrefix : 's_') + inData + '.' + new Date().getTime();
	}

wdf.PackageBuilder = PackageBuilder;
}());
