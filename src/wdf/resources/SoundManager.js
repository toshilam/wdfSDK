this.wdf = this.wdf || {}; 
( function() {

	
	var SoundManager = function() 
	{
		this.initialize();
	}
	
	SoundManager.PREFIX_SOUND_ID = 'Snd';
	
	var p = SoundManager.prototype = Object.create( wdf.DataManager.prototype);
	
	// p._soundService = null;
	
	p.DataManager_initialize = p.initialize;
	p.initialize = function()
	{
		this.DataManager_initialize();
		// this._soundService = wdf.SoundService.getInstance();
	}
	
	p.DataManager_addAsset = p.addAsset;
	p.addAsset = function(inAsset, inAssetID)
	{
		// if (inAsset instanceof wdf.DataManager)
		// {
			// _soundService.assetManager = inAsset as IDataManager;
			// return true;
		// }
// 		
		// Tracer.echo('SoundManager : addAsset : asset exists : ' + inAssetID, this, 0xff0000);
		// return false;
		return this.DataManager_addAsset(inAsset, inAssetID);
	}
	
	p.DataManager_getAsset = p.getAsset;
	p.getAsset = function(inLoaderInfoID)
	{
		return this.DataManager_getAsset(inLoaderInfoID);
	}
	
	
	p.DataManager_getData = p.getData;
	p.getData = function(inDataID,  inLoaderInfoID)
	{
		// if (!this._soundService || !(inRequest instanceof wdf.SoundRequest))
		// {
			// wdf.Tracer.echo('SoundManager : getData : no asset found/unknown request type : '  + inRequest, this, 0xff0000);
			// return null;
		// }
// 		
		// return this._soundService.request(inRequest, inAssetID);
	}
	
	p.playSound = function(inDataID/*:Array*/, inAssetID/*:String*/, inVolumeLevel/*:Number = -1*/, inStartTime/*:Number = 0*/, inLoops/*:int = 0*/)//:*
	{
		// return this.getData(new wdf.SoundRequest(wdf.SoundRequest.SOUND_PLAY, inDataID, inStartTime, inLoops, null, inVolumeLevel), inAssetID);
		if(_.isArray(inDataID) && inDataID.length)
		{
			var currentID = inDataID.splice(0, 1)[0];
			var sound = createjs.Sound.play(currentID);
			
			if(inDataID.length)
			{
				var that = this;
				sound.addEventListener("complete", function(e){
					that.playSound(inDataID);
				});
			}
			
		}
	}
	
	p.hasData = function(inDataID,  inLoaderInfoID)
	{
		return false;
		
	}
	
	p.toString = function()
	{
		return "[object SoundManager]";
	}

wdf.SoundManager = SoundManager;
}());
