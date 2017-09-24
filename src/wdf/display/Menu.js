this.wdf = this.wdf || {}; 

(function() {
	
	var Menu = function()
	{
		this.initialize();
	}
	
	Menu.LAYOUT_HORIZONTAL = 'h';
	Menu.LAYOUT_VERTICAL = 'v';
	Menu.LAYOUT_DISTANCE = 10;
		
	var p = Menu.prototype = new wdf.Container();
	
	p.itemList = null;
	p.initPoint = null;//:Point;
	p.layoutType = null;
	p.layoutDistance = null;
	
	p.Container2_initialize = p.initialize;
	p.initialize = function() 
	{
		this.Container2_initialize();
		
		this.itemList = [];
		this.initPoint = new createjs.Point();
		this.layoutType = Menu.LAYOUT_HORIZONTAL;
		this.layoutDistance = Menu.LAYOUT_DISTANCE;
	}
	
	p.Container2_destroyDisplayObject = p.destroyDisplayObject;
	p.destroyDisplayObject = function()//:void 
	{
		this.Container2_destroyDisplayObject();
		this.itemList.length = 0;
	}
	
	p.Container2_addApplicationChild = p.addApplicationChild;
	p.addApplicationChild = function(inApplicationDisplayObject, inSettingSource, autoShowPage)//:IApplicationDisplayObject 
	{
		/*if (!(inApplicationDisplayObject is IButton))
		{
			Tracer.echo(name + ' : Menu : addApplicationChild : unknown object type : ' + inApplicationDisplayObject, this, 0xff0000);
			return null;
		}*/
		
		this.itemList.push( this.Container2_addApplicationChild(inApplicationDisplayObject, inSettingSource, autoShowPage) );
		
		this.setLayout(this.layoutType, this.layoutDistance);
		return inApplicationDisplayObject;
	}
	
	p.addApplicationChildAt = function(inApplicationDisplayObject, inSettingSource, inIndex, autoShowPage)//:IApplicationDisplayObject 
	{
		wdf.Tracer.echo(this.name + ' : Menu : addApplicationChildAt : call disabled function : ' + inObject, this, 0xff0000);
		return null;
	}
	
	p.Container2_removeApplicationChild = p.removeApplicationChild;
	p.removeApplicationChild = function(inApplicationDisplayObject, autoClosePage)//:void 
	{
		this.Container2_removeApplicationChild(inApplicationDisplayObject, autoClosePage);
		var index = this.itemList.indexOf(inApplicationDisplayObject);
		if(index != -1)
		{
			this.itemList.splice(index, 1)[0];
		}
		
	}
	
	p.setLayout = function(inLayout /*= LAYOUT_HORIZONTAL*/, inDistance/*:int = LAYOUT_DISTANCE*/, inInitPoint/*:Point = null*/)//:void
	{
		if (inLayout != Menu.LAYOUT_VERTICAL && inLayout != Menu.LAYOUT_HORIZONTAL)
		{
			wdf.Tracer.echo(name + " : Menu : setLayout : unknown layout type : " + inLayout, this, 0xff0000);
			return;
		}
		
		if (inInitPoint) this._initPoint = inInitPoint;
		this.layoutType = inLayout;
		this.layoutDistance = inDistance;
		
		this._setPosition();
	}
	
	p._setPosition = function()//:void
	{
		var layoutType = this.layoutType;
		var LAYOUT_HORIZONTAL = Menu.LAYOUT_HORIZONTAL;
		var layoutDistance = this.layoutDistance;
		var initPoint = this._initPoint || {x:0,y:0};
		var echo = wdf.Tracer.echo;
		var xy = (layoutType == LAYOUT_HORIZONTAL) ? 'x' : 'y';
		var xy2 = (layoutType == LAYOUT_HORIZONTAL) ? 'y' : 'x';
		var wh = (layoutType == LAYOUT_HORIZONTAL) ? 'Width' : 'Height';
		
		var itemList = this.itemList;
		var numItem = this.itemList.length;
		for (var i = 0; i < numItem; i++)
		{
			var b = itemList[i];// as ApplicationDisplayObject;
			
			if (b)
			{
				if (i)
				{
					var targetItem = itemList[i - 1];// as ApplicationDisplayObject;
					b[xy] = targetItem[xy] + wdf.Container['get' + wh](targetItem) + layoutDistance;
				}
				else
				{
					b[xy] = initPoint[xy];
				}
				
				b[xy2] = initPoint[xy2];
			}
			else
			{
				echo(this.name + ' : setPosition : unable to get object/unknown object type : ' + itemList[i], this, 0xff0000);
				continue;
			}
			
			echo(this.name + ' : setPosition : ' + b.name + ' : x :' + b.x + ', y :' + b.y/* + ', width : ' + b.width + ', height : ' + b.height*/);
		}
	}
	
	p.removeAllButton = function()
	{
		var itemList = this.itemList;
		if (itemList.length)
		{
			
			while(itemList.length)
			{
				this.removeApplicationChild(itemList.pop(), false)
			}
			
			
		}
	}
	
	p.disable = function()//:void
	{
		this.setMenuItem(false);
	}
	
	p.enable = function()//:void
	{
		this.setMenuItem(true);
	}
	
	p.setMenuItem = function(inIsEnable)
	{
		var itemList = this.itemList;
		var numItem = itemList.length;
		if (numItem)
		{
			for (var i = 0; i < numItem; i++)
			{
				var b = subDisplayObjectList[i];// as Button;
				b.mouseEnabled = inIsEnable;
			}
			
		}
	}
	
	p.toString = function() {
		return "[wdf.Menu (name=" + this.name + ")]";
	}

wdf.Menu = Menu;
}());