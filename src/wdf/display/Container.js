
this.wdf = this.wdf || {}; 

(function() {

	var Container = function() 
	{
	  this.initialize();
	}
	
	Container.assetManager = null;
	Container.stage = null;
	Container.orientation = null;
	
	Container.isPortrait = function()
	{
		var config = wdf.Config;
		var orientation = wdf.Container.orientation;
		return config && orientation == config.SCREEN_TYPE_PORTRAIT;
	}
	
	Container.getWidth = function(inData)
	{
		var width = 0;
		var nominalBounds = inData.nominalBounds;
		var scaleX = inData.scaleX;
		if(nominalBounds)
		{
			width = nominalBounds.width * scaleX;
		}
		
		return width;
	}
	
	Container.setWidth = function(inData, inValue)
	{
		var nominalBounds = inData.nominalBounds;
		if(nominalBounds)
		{
			//TODO may wrong as object may initially scaled up/down
			inData.scaleX = wdf.Tools.getTargetScale(inValue, nominalBounds.width);
			// nominalBounds.width = inValue;
			// alert('scaleX : ' + this.scaleX + ', width : ' + this.nominalBounds.width);
		}
	}
	
	Container.getHeight = function(inData)
	{
		var height = 0;
		var nominalBounds = inData.nominalBounds;
		var scaleY = inData.scaleY;
		if(nominalBounds)
		{
			height = nominalBounds.height * scaleY;
		}
		
		return height;
	}
	
	Container.setHeight = function(inData, inValue)
	{
		var nominalBounds = inData.nominalBounds;
		if(nominalBounds)
		{
			//TODO may wrong as object may initially scaled up/down
			inData.scaleY = wdf.Tools.getTargetScale(inValue, nominalBounds.height);
			// nominalBounds.height = inValue;
			// alert('scaleY : ' + this.scaleY + ', height : ' + this.nominalBounds.height);
		}
	}
	
	Container.getContentWidthHeight = function()
	{
		var config = wdf.Config;
		var orientation = wdf.Container.orientation;
		var isIPad = wdf.Tools.isIPad() === true || wdf.Tools.isPC() === true;
		var width = orientation == config.SCREEN_TYPE_PORTRAIT ? isIPad ? config.SCREEN_PORTRAIT_W_IPAD : config.SCREEN_PORTRAIT_W : isIPad ? config.SCREEN_LANDSCAPE_W_IPAD : config.SCREEN_LANDSCAPE_W; 
		var height = orientation == config.SCREEN_TYPE_PORTRAIT ? isIPad ? config.SCREEN_PORTRAIT_H_IPAD : config.SCREEN_PORTRAIT_H : isIPad ? config.SCREEN_LANDSCAPE_H_IPAD : config.SCREEN_LANDSCAPE_H; 
		
		return new createjs.Point(width, height);
	}
	
	/*Container.getBounds = function(obj) 
	{
		var bounds={x:Infinity,y:Infinity,width:0,height:0};
		
		if ( obj instanceof createjs.Container || obj instanceof wdf.Container ) 
		{
			var children = obj.children, l=children.length, cbounds, c;
			for ( c = 0; c < l; c++ ) {
				cbounds = getBounds(children[c]);
				if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
				if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
				if ( cbounds.width > bounds.width ) bounds.width = cbounds.width;
				if ( cbounds.height > bounds.height ) bounds.height = cbounds.height;
			}
		} 
		else
		{
			var gp,gp2,gp3,gp4,imgr;
			if ( obj instanceof createjs.Bitmap ) 
			{
				imgr = obj.image;
			} 
			else if ( obj instanceof createjs.BitmapAnimation ) 
			{
				if ( obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image )
					imgr = obj.spriteSheet.getFrame(obj.currentFrame).rect;
				else
					return bounds;
			} 
			else 
			{
				return bounds;
			}
	
			gp = obj.localToGlobal(0,0);
			gp2 = obj.localToGlobal(imgr.width,imgr.height);
			gp3 = obj.localToGlobal(imgr.width,0);
			gp4 = obj.localToGlobal(0,imgr.height);
	
			bounds.x = Math.min(Math.min(Math.min(gp.x,gp2.x),gp3.x),gp4.x);
			bounds.y = Math.min(Math.min(Math.min(gp.y,gp2.y),gp3.y),gp4.y);
			bounds.width = Math.max(Math.max(Math.max(gp.x,gp2.x),gp3.x),gp4.x) - bounds.x;
			bounds.height = Math.max(Math.max(Math.max(gp.y,gp2.y),gp3.y),gp4.y) - bounds.y;
		}
	
		return bounds;
	}*/
	
	// var p = Container.prototype = new createjs.Container();
	var p = Container.prototype = new createjs.MovieClip();
	
	/** 
	 * @property _XMLSetting
	 * @type XML
	 * @protected 
	 **/
	p._XMLSetting = null;
	p._isClosed = false;
	
	p.getXMLSetting = function()
	{
		return this._XMLSetting;
	}
	
	p.getIsClosed = function()
	{
		return this._isClosed;
	}
	
	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 **/
	p.wdfContainer_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	*/
	p.initialize = function() 
	{
		var that = this;
		
		this.wdfContainer_initialize();
		// this._pageClosedHandler = _.bind(this._pageClosedHandler, this);
// 		
		// var numItem = this.children.length;
		// if (numItem)
		// {
			// for (var i = 0; i < numItem; i++)
			// {
				// var target = this.getChildAt(i);
				// if(target && (target instanceof createjs.DisplayObject))
				// {
					// target.x = target.y = target.regX = target.regY = 0;
				// }
// 				
			// }
		// }
		
		//Remved : no event can be dispatched from child object
		// this.addEventListener('click', function(e){
			// that.dispatchEvent(new wdf.ButtonEvent(wdf.ButtonEvent.CLICK, that, null, e));
		// });
	}
	
	p.Container_addChild = p.addChild;
	// p.addChild = function(child) {
		// var o = this.Container_addChild(child);
		// // throw(this.name + ' : addChild : call disabled function!');
		// this._update();
		// return o;
	// }

	p.Container_addChildAt = p.addChildAt;
	// p.addChildAt = function(child, index) {
		// var o = this.Container_addChildAt(child, index);
		// // throw(this.name + ' : addChildAt : call disabled function!');
		// this._update();
		// return null;
	// }

	p.Container_removeChild = p.removeChild;
	// p.removeChild = function(child) 
	// {
		// throw(this.name + ' : removeChild : call disabled function!');
		// return null;
	// }

	p.Container_removeChildAt = p.removeChildAt;
	// p.removeChildAt = function(index) 
	// {
		// var isRemoved = this.Container_removeChildAt(index)
		// this._update();
		// // throw(this.name + ' : removeChildAt : call disabled function!');
		// return isRemoved;
	// }
	
	p.Container_removeAllChildren = p.removeAllChildren;
	// p.removeAllChildren = function() 
	// {
		// this.Container_removeAllChildren();
		// this._update();
	// }
	
	
	p.getContentWidthHeight = function()
	{
		return wdf.Container.getContentWidthHeight();
	}
	
	
	p.setIsClosed = function(inValue/*:Boolean*/)//:void 
	{ 
		//if (_isClosed == inValue) return;
		var ApplicationEvent = wdf.ApplicationEvent;
		this._isClosed = inValue;
		var type = (this._isClosed) ? ApplicationEvent.PAGE_CLOSED : ApplicationEvent.PAGE_SHOW;
		//Tracer.echo(name + ' : setIsClosed : dispatching event : ' + type, this, 0xff0000);
		this.dispatchEvent(new wdf.ApplicationEvent(type, this));
	}
	
	p.initDisplayObject= function(inSettingSource)
	{
		var that = this;
		
		this._pageClosedHandler = _.bind(this._pageClosedHandler, this);
		
		// var numItem = this.children.length;
		// if (numItem)
		// {
			// for (var i = 0; i < numItem; i++)
			// {
				// var target = this.getChildAt(i);
				// if(target && (target instanceof createjs.DisplayObject))
				// {
					// target.x = target.y = target.regX = target.regY = 0;
				// }
// 				
			// }
		// }
		this._XMLSetting = inSettingSource;
		this.initDisplayObjectPosition();
	}
	
	p.destroyDisplayObject = function()
	{
		if (this.children && this.children.length)
		{
			while (this.children.length)
			{
				this.removeApplicationChild( this.children.pop(), false);
			}
		}
	}
	
	p.addApplicationChild = function(inApplicationDisplayObject, inSettingSource, autoShowPage)
	{
		if (!inApplicationDisplayObject || !(inApplicationDisplayObject instanceof wdf.Container)) 
		{
			throw(this.name + ' : addApplicationChild : null object!');
			return null;
		}
		
		var o = this.Container_addChild(inApplicationDisplayObject);
		this.initApplicationChild(o, inSettingSource, autoShowPage); 
		
		return o;
	}
	
	p.addApplicationChildAt = function(inApplicationDisplayObject, inSettingSource, inIndex, autoShowPage)
	{
		if (!inApplicationDisplayObject || !(inApplicationDisplayObject instanceof wdf.Container) )
		{
			throw(this.name + ' : addApplicationChildAt : null object!');
			return null;
		}
		var o = this.Container_addChildAt(inApplicationDisplayObject, inIndex);
		this.initApplicationChild(o, inSettingSource, autoShowPage); 
		
		return o;
	}
	
	p.initApplicationChild = function(inApplicationDisplayObject, inSettingSource, autoShowPage)
	{
		inApplicationDisplayObject.initDisplayObject(inSettingSource);
		this.dispatchEvent(new wdf.ApplicationEvent(wdf.ApplicationEvent.CHILD_ADDED, inApplicationDisplayObject));
		
		if (autoShowPage) 
		{
			inApplicationDisplayObject.showPage();
		}
		/*else
		{
			setIsClosed(false);
		}*/
		
		this._update();
	}
	
	p._update = function()
	{
		if(wdf.Container.stage)
		{
			// wdf.Tracer.echo('UPDATE!!!');
			wdf.Container.stage.update();
		}
	}
	
	p.removeApplicationChild = function(inApplicationDisplayObject, autoClosePage)
	{
		if ( !this.contains(inApplicationDisplayObject) ) 
		{
			wdf.Tracer.echo(this.name + ' : removeApplicationChild : object is not contained : ' + inApplicationDisplayObject);
			return;
		}
		
		if (autoClosePage) 
		{
			if(!inApplicationDisplayObject.getIsClosed())
			{
				inApplicationDisplayObject.addEventListener(wdf.ApplicationEvent.PAGE_CLOSED, this._pageClosedHandler);
				inApplicationDisplayObject.closePage();
				
				return;
			}
		}
		
		this._pageClosedHandler(new wdf.ApplicationEvent(wdf.ApplicationEvent.PAGE_CLOSED, inApplicationDisplayObject));
	}
	
	p._pageClosedHandler = function(e)
	{
		if(e && e.targetDisplayObject)
		{
			var targetDisplayObject = e.targetDisplayObject;
			
			targetDisplayObject.removeEventListener(wdf.ApplicationEvent.PAGE_CLOSED, this._pageClosedHandler);
			
			if (typeof targetDisplayObject.destroyDisplayObject == 'function')
			{
				targetDisplayObject.destroyDisplayObject();
			}
			
			if (this.contains( targetDisplayObject ) )
			{
				this.Container_removeChild(targetDisplayObject);
				this._update();
				this.dispatchEvent(new wdf.ApplicationEvent(wdf.ApplicationEvent.CHILD_REMOVED, targetDisplayObject));
			}
			else
			{
				wdf.Tracer.echo(this.name + ' : _pageClosedHandler : object is not contained : ' + targetDisplayObject);
			}
			
			
		}
		else
		{
			wdf.Tracer.echo(this.name + ' : _pageClosedHandler : targetDisplayObject not found : ' + e.targetDisplayObject);
		}
	}
	
	p.initDisplayObjectPosition = function(inException)
	{
		var that = this;
		var objSetting = wdf.Tools.isJQueryObj(this._XMLSetting) ? this._XMLSetting.get(0) : this._XMLSetting;
		
		if (objSetting)
		{
			var hasException = inException && inException.length;
			var numException = hasException ? inException.length : 0;
			var data = null;
			
			var isXML = $.isXMLDoc(objSetting);
			if(isXML)
			{
				data = objSetting.attributes;
			}
			else //if (_.isObject(objSetting))
			{
				data = objSetting;
			}
			
			$.each(data, function(i, val){
			    // attributes[val.name] = val.value;
			    
			    var process = true;
			    var attrValue = null;
			    var attrName = null;
			    
			    if(isXML)
			    {
			    	attrValue = val.value;
					attrName = val.name;
			    }
				else
				{
					attrValue = val;
					attrName = i;
				}
				
				
				// wdf.Tracer.echo(that + ' : initDisplayObjectPosition : ' + attrName + ' : ' + attrValue);
				
				if (hasException)
				{
					for (var j = 0; j < numException; j++)
					{
						if (inException[j] == attrName)
						{
							process = false;
							break;
						}
					}
					
				}
				
				if (process)
				{
					wdf.XMLAttributesConvertor.handle(that, attrName, attrValue, wdf.Container.stage);
				}
			});
			
		}
		else
		{
			// wdf.Tracer.echo(this + ' : initDisplayObjectPosition : unknown data type : ' + objSetting);
		}
		
	}
	
	p.onStageResize = function()
	{
		this.initDisplayObjectPosition( ['id', 'txtText', 'text', 'Class', 'pClass', 'textObj'] );
		
		//Tracer.echo(this.name + ' : onStageResize : x : ' + x + ', y :' + y, this, 0x335577);
		
		var numItem = this.children.length;
		if (numItem)
		{
			for (var i = 0; i < numItem; i++)
			{
				var target = this.getChildAt(i);
				if(target && target.onStageResize)
				{
					target.onStageResize();
				}
				
			}
		}
		
	}
	
	p.closePage = function(inObjTweenerEffect)
	{
		// wdf.Tracer.echo(this.name + ' closePage !', this, 0x336677);
		var that = this;
		
		if (inObjTweenerEffect != null) 
		{
			if (_.isFunction(inObjTweenerEffect.onComplete))
			{
				var targetFunc = inObjTweenerEffect.onComplete;
				
				inObjTweenerEffect.onComplete = function()
				{
					targetFunc();
					that.setIsClosed(true);
				}
			}
			else
			{
				inObjTweenerEffect.onComplete = function()	{ that.setIsClosed(true); }
			}
		}
		else
		{
			inObjTweenerEffect = { alpha:0, time:1, transition:createjs.Ease.none, onComplete:function() { that.setIsClosed(true); } };
		}
		
		wdf.Tween.add(this, inObjTweenerEffect);
		
		// var targetTweenEffect = inObjTweenerEffect ? inObjTweenerEffect : {alpha:1};
		// var targetDuration = inDuration ? inDuration : 1000;
		// var targetTransition = inTransition ? inTransition : createjs.Tween.Ease.none;
		// createjs.Tween.get(this).to(targetTweenEffect, targetDuration, targetTransition).call(function(){
			// that._isClosed = true;
			// that.visible = false;
			// that.dispatchEvent(new wdf.ApplicatoinEvent(wdf.ApplicationEvent.PAGE_CLOSED, that));
		// });
	}
	
	p.showPage = function(inObjTweenerEffect)
	{
		//Tracer.echo(this.name + ' showPage !', this, 0x336677);
		
		if (inObjTweenerEffect != null) 
		{
			if (_.isFunction(inObjTweenerEffect.onComplete))
			{
				var targetFunc = inObjTweenerEffect.onComplete;
				
				inObjTweenerEffect.onComplete = function()
				{
					targetFunc();
					setIsClosed(false);
				}
			}
			else
			{
				inObjTweenerEffect.onComplete = function()	{ setIsClosed(false); }
			}
		}
		else
		{
			inObjTweenerEffect = { alpha:1, time:1, transition:createjs.Ease.none, onComplete:function() { that.setIsClosed(false); } };
		}
		
		this.alpha = 0;
		wdf.Tween.add(this, inObjTweenerEffect);
		
		// var that = this;
		// var targetTweenEffect = inObjTweenerEffect ? inObjTweenerEffect : {alpha:1};
		// var targetDuration = inDuration ? inDuration : 1000;
		// var targetTransition = inTransition ? inTransition : createjs.Tween.Ease.none;
		// createjs.Tween.get(this).to(targetTweenEffect, targetDuration, targetTransition).call(function(){
			// that._isClosed = false;
			// that.visible = true;
			// that.dispatchEvent(new wdf.ApplicatoinEvent(wdf.ApplicationEvent.PAGE_SHOW, that));
		// });
		
		// wdf.Tween.add(this, {})
	}
	
	p.toString = function() {
		return "[wdf.Container (name=" + this.name + ")]";
	}

wdf.Container = Container;
}());