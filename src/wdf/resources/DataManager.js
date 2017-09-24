// namespace:
this.wdf = this.wdf || {}; 
( function() {

	
	var DataManager = function(inID) 
	{
		this.initialize(inID);
	}
	
	var p = DataManager.prototype;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._objAssets;
	p._id;
	
	p._lastAddedAssetID;
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inID)
	{
		this._id = inID || 'DataManager';
		this._objAssets = {};
		this._lastAddedAssetID = '';
	}
	
	p.addAsset = function(inAsset, inAssetID)
	{
		//if (this._objAssets[inAssetID] == undefined)
		if ( !this._objAssets[inAssetID] )
		{
			this._lastAddedAssetID = inAssetID;
			this._objAssets[inAssetID] = inAsset;
			wdf.Tracer.echo(this + ' : addAsset : ' + inAssetID, this, 0xff0000);
			return true;
		}
		
		wdf.Tracer.echo('DataManager : addAsset : asset exists : ' + inAssetID, this, 0xff0000);
		return false;
	}
	
	p.getAsset = function(inAssetID)
	{
		return this._objAssets[inAssetID];
	}
	
	p.hasAsset = function(inAssetID)
	{
		return this._objAssets[inAssetID] != undefined;
	}
	
	p.getData = function(inDataID,  inAssetID)
	{
		return null;
	}
	
	p.hasData = function(inDataID,  inLoaderInfoID)
	{
		return false;
	}
	
	p.removeAsset = function(inAssetID)
	{
		if (this.hasAsset(inAssetID))
		{
			delete this._objAssets[inAssetID];
			return true;
		}
		
		return false;
	}
	
	p.toString = function()
	{
		return "[object DataManager]";
	}
	

wdf.DataManager = DataManager;
}());
