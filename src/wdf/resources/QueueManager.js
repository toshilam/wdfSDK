// namespace:
this.wdf = this.wdf || {}; 
( function() {

	/**
	* A QueueManager class that help managing groups of users (socket connection)
	*/
	var QueueManager = function() 
	{
		this.initialize();
	}
	
	QueueManager.autoRequest = true;
	
	var p = QueueManager.prototype = Object.create( wdf.DataManager.prototype);
	
	
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
	p.initialize = function()
	{
		this.DataManager_initialize();
		this._serviceEventHandler = _.bind(this._serviceEventHandler, this);
	}
	
	
	p.DataManager_addAsset = p.addAsset;
	p.addAsset = function(inVO, inGroupID)
	{
		if( !(inVO instanceof wdf.QueueVO) || !wdf.Tools.hasValue(inGroupID) )
		{
			wdf.Tracer.echo('QueueManager : addAsset : unknown data : ' + inVO, this, 0xff0000);
			return false; // this.DataManager_addAsset(inAsset, inAssetID);
		}
		
		var targetQueueVOList = this._objAssets[inGroupID];
		if ( !(targetQueueVOList instanceof wdf.QueueVOList) )
		{
			targetQueueVOList = this._objAssets[inGroupID] = new wdf.QueueVOList(inGroupID);
		}
		
		wdf.Tracer.echo('QueueManager : addAsset : currently ' + targetQueueVOList.length()  + ' task in QueueList!', this, wdf.Tracer.TYPE_DEBUG);
		
		if( targetQueueVOList.addVO(inVO) != -1 )
		{
			wdf.Tracer.echo('QueueManager : addAsset : added a task to group : ' + inGroupID, this, wdf.Tracer.TYPE_DEBUG);
			
			
			if(QueueManager.autoRequest)
			{
				return this.request(inGroupID);
			}
			
			return true;
		}
		
		wdf.Tracer.echo('QueueManager : addAsset : failed adding task to a group : ' + inGroupID, this, wdf.Tracer.TYPE_ERROR);
		return false;
	}
	
	p.request = function(inGroupID)
	{
		var queueVOList = this.getAsset(inGroupID);
		
		if(queueVOList instanceof wdf.QueueVOList && queueVOList.length())
		{
			if(!queueVOList.isBusy)
			{
				var queueVO = queueVOList.removeVOByIndex(0);
				if(queueVO instanceof wdf.QueueVO)
				{
					wdf.Tracer.echo('QueueManager : request : executing a task : ' + queueVO.service, this, wdf.Tracer.TYPE_DEBUG);
					
					queueVOList.isBusy = true;
					
					queueVO.service.on(wdf.ServiceEvent.RESPONSE, this._serviceEventHandler, null, true, queueVO);
					queueVO.service.on(wdf.ServiceEvent.FAULT, this._serviceEventHandler, null, true, queueVO);
					//queueVO.service.addEventListener(wdf.ServiceEvent.RESPONSE, this._serviceEventHandler);
					//queueVO.service.addEventListener(wdf.ServiceEvent.FAULT, this._serviceEventHandler);
					
					return queueVO.service.request(queueVO.data);
					
					//return true;
				}
			}
			else
			{
				wdf.Tracer.echo('QueueManager : request : queueList is busy, service will be requested once finished executing previous service!', this, wdf.Tracer.TYPE_DEBUG);
			}
			
		}
		
		return false;
	}
	
	p._serviceEventHandler = function(e, inData)
	{
		wdf.Tracer.echo('QueueManager : _serviceEventHandler : ' + inData.groupID, this, wdf.Tracer.TYPE_DEBUG);
		//wdf.Tracer.echo(e);
		//e.target.removeEventListener(wdf.ServiceEvent.RESPONSE, this._serviceEventHandler);
		//e.target.removeEventListener(wdf.ServiceEvent.FAULT, this._serviceEventHandler);
		this.dispatchEvent(e);
		
		if(inData instanceof wdf.QueueVO)
		{
			var queueVOList = this.getAsset(inData.groupID);
			if(queueVOList)
			{
				queueVOList.isBusy = false;
				
				if(queueVOList.length())
				{
					this.request(inData.groupID);
				}
				else
				{
					this.removeAsset(inData.groupID);
				}
			}
			
		}
		
		
	}
	
	p.DataManager_getAsset = p.getAsset;
	p.getAsset = function(inGroupID)
	{	
		return this.DataManager_getAsset(inGroupID);
	}
	
	
	p.DataManager_getData = p.getData;
	p.getData = function(inID, inGroupID)
	{
		return null;
		
	}
	
	p.hasData = function(inID,  inGroupID)
	{
		return this.getData(inID, inGroupID);
	}
	
	p.toString = function()
	{
		return "[object QueueManager]";
	}

wdf.QueueManager = QueueManager;
}());
