// namespace:
this.wdf = this.wdf || {}; 
( function() {

	/**
	* A UserManager class that help managing groups of users (socket connection)
	*/
	var UserManager = function(inID) 
	{
		this.initialize(inID);
	}
	
	UserManager.GROUP_NAME_ALL = 'gAll';
	
	UserManager.autoCreateGroup = true;
	
	var p = UserManager.prototype = Object.create( wdf.DataManager.prototype);
	
	
	/**
	 * @property DataManager_initialize
	 * @type Function
	 * @private
	 **/
	p.DataManager_initialize = p.initialize;
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inID)
	{
		this.DataManager_initialize(inID);
	}
	
	
	p.DataManager_addAsset = p.addAsset;
	/**
	 * 
	 * @param	inUserVO - a connected user that wrapped by a UserVO
	 * @param	inGroupID - ID of a group that user belong to
	 */
	p.addAsset = function(inUserList, inGroupID)
	{
		if( !(inUserList instanceof wdf.UserVOList) )
		{
			wdf.Tracer.echo('UserManager({0}) : addAsset : unknown data : '.format([this._id]) + inUserList, this, 0xff0000);
			return false; // this.DataManager_addAsset(inAsset, inAssetID);
		}
		if ( this._objAssets[inGroupID] )
		{
			wdf.Tracer.echo('UserManager({0}) : addAsset : vo list already exist '.format([this._id]) + inGroupID, this, 0xff0000);
			return false; // this.DataManager_addAsset(inAsset, inAssetID);
		}
		
		inGroupID = inGroupID || wdf.UserManager.GROUP_NAME_ALL;
		this._lastAddedAssetID = inGroupID;
		this._objAssets[inGroupID] = inUserList;
		wdf.Tracer.echo('UserManager({0}) : addAsset : added group '.format([this._id]) + inGroupID, this, 0xff0000);
		return true;
		
		
	}
	
	p.DataManager_getAsset = p.getAsset;
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
	
	
	p.DataManager_getData = p.getData;
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
		return "[object UserManager({0})]".format([this._id]);
	}

wdf.UserManager = UserManager;
}());
