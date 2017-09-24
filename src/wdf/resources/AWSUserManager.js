// namespace:
this.wdf = this.wdf || {}; 
( function() {

	/**
	* A AWSUserManager class that help managing groups of users (socket connection)
	*/
	var AWSUserManager = function() 
	{
		this.initialize();
	}
	
	//UserManager.GROUP_NAME_ALL = 'gAll';
	//
	//UserManager.autoCreateGroup = true;
	
	var p = AWSUserManager.prototype = Object.create( wdf.UserManager.prototype);
	
	p.memcache = null;
	
	/**
	 * @property UserManager_initialize
	 * @type Function
	 * @private
	 **/
	p.UserManager_initialize = p.initialize;
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function()
	{
		this.UserManager_initialize();
		
		this.memcached = new require('memcached')(wdf.Config.AWS_MEMCACHE_ENDPOINT);
	}
	
	
	p.UserManager_addAsset = p.addAsset;
	/**
	 * 
	 * @param	inUserVO - a connected user that wrapped by a UserVO
	 * @param	inGroupID - ID of a group that user belong to
	 */
	p.addAsset = function(inUserList, inGroupID)
	{
		if( !(inUserList instanceof wdf.UserVOList) )
		{
			wdf.Tracer.echo('AWSUserManager : addAsset : unknown data : ' + inUserList, this, 0xff0000);
			return false; // this.UserManager_addAsset(inAsset, inAssetID);
		}
		if ( this._objAssets[inGroupID] )
		{
			wdf.Tracer.echo('AWSUserManager : addAsset : vo list already exist ' + inGroupID, this, 0xff0000);
			return false; // this.UserManager_addAsset(inAsset, inAssetID);
		}
		
		inGroupID = inGroupID || wdf.UserManager.GROUP_NAME_ALL;
		this._lastAddedAssetID = inGroupID;
		this._objAssets[inGroupID] = inUserList;
		wdf.Tracer.echo('AWSUserManager : addAsset : added group ' + inGroupID, this, 0xff0000);
		return true;
		
		
	}
	
	p.UserManager_getAsset = p.getAsset;
	/**
	 * To get a groups of connected user
	 * @param	inGroupID
	 * @return an object contains a groups of users
	*/ 
	p.getAsset = function(inGroupID)
	{
		if ( !this._objAssets[inGroupID] && wdf.UserManager.autoCreateGroup === true )
		{
			this.addAsset( new wdf.UserVOList(inGroupID), inGroupID);
		}
		
		return this._objAssets[inGroupID];
	}
	
	
	p.UserManager_getData = p.getData;
	/**
	 * 
	 * @param	inUserID - targeted user id
	 * @param	inGroupID -
	 * @return a user vo
	 */
	p.getData = function(inUserID, inGroupID)
	{
		return this.getAsset(inGroupID).getVOByID(inUserID);
	}
	
	/**
	 * 
	 * @param	inUserID - targeted user id
	 * @param	inGroupID -
	 * @return true if found
	 */
	p.hasData = function(inUserID,  inGroupID)
	{
		return (this.getData(inUserID, inGroupID) instanceof wdf.UserVO);
	}
	
	p.toString = function()
	{
		return "[object AWSUserManager]";
	}

wdf.AWSUserManager = AWSUserManager;
}());
