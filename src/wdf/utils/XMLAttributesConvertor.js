// namespace:
this.wdf = this.wdf || {}; 
( function() {
	
	
	var XMLAttributesConvertor = function() 
	{
		throw "XMLAttributesConvertor cannot be instantiated.";
	}
	
	XMLAttributesConvertor.assetManager = null;
	
	XMLAttributesConvertor.handle= function(inDisplayObject, inAttributeName, inAttributeValue, inStage)
	{
		var mcBG = null;
		var targetValue = null;
		
		switch(inAttributeName)
		{
			case 'Class':
			{
				
				break;
			}
			case 'id':
			{
				inDisplayObject.name = inAttributeValue;
				// if (inDisplayObject is IApplicationDisplayObject) IApplicationDisplayObject(inDisplayObject).id = String(inAttributeValue);
				break;
			}
			case 'x':
			{
				inDisplayObject.x = Number(XMLAttributesConvertor.positionHandler(inAttributeValue, inDisplayObject, inStage));
				break;
			}
			case 'y':
			{
				inDisplayObject.y = Number(XMLAttributesConvertor.positionHandler(inAttributeValue, inDisplayObject, inStage));
				break;
			}
			// case 'width':
			// {
				// inDisplayObject.width = Number(sizeHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			// case 'height':
			// {
				// inDisplayObject.height = Number(sizeHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			case 'alpha':
			{
				inDisplayObject.alpha = Number(inAttributeValue);
				break;
			}
			case 'bgWidth':
			{
				mcBG = inDisplayObject['bg'];
				if(mcBG)
				{
					targetValue = Number( this.sizeHandler(inAttributeValue, inDisplayObject, inStage) );
					wdf.Container.setWidth(mcBG, targetValue);
					// if(mcBG.setWidth)
					// {
						// mcBG.setWidth( targetValue );
					// }
					// else
					// {
						// wdf.Container.prototype.setWidth.call(mcBG, targetValue);
					// }
				}
				break;
			}
			case 'bgHeight':
			{
				mcBG = inDisplayObject['bg'];
				if(mcBG)
				{
					targetValue = Number( this.sizeHandler(inAttributeValue, inDisplayObject, inStage) );
					wdf.Container.setHeight(mcBG, targetValue);
					// if(mcBG.setHeight)
					// {
						// mcBG.setHeight( targetValue );
					// }
					// else
					// {
						// wdf.Container.prototype.setHeight.call(mcBG, targetValue);
					// }
					
				}
				break;
			}
			case 'bgAlpha':
			{
				mcBG = inDisplayObject['bg'];
				if(mcBG)
				{
					mcBG.alpha = Number(inAttributeValue);
				}
				break;
			}
			// case 'bgFID':
			// {
				// if (inDisplayObject['bg'] is MovieClip)
				// {
					// MovieClip(inDisplayObject['bg']).gotoAndStop(int(inAttributeValue));
				// }
				// break;
			// }
			case 'txtText':
			{
				if (inDisplayObject['txt'])
				{
					inDisplayObject['txt'].text = String(inAttributeValue);
				}
				
				break;
			}
			case 'text':
			{
				if (inDisplayObject['text'])
				{
					inDisplayObject.text = String(inAttributeValue);
					break;
				}
				// else
				// {
					// Tracer.echo('---- not label and text button : ' + inDisplayObject,  null, 0xff0000);
				// }
			}
			// case 'tooltip':
			// {
				// if (inDisplayObject is ApplicationDisplayObject)
				// {
					// (inDisplayObject as ApplicationDisplayObject).tooltip = textHandler(String(inAttributeValue));
				// }
				// break;
			// }
			// case 'txtX':
			// {
				// inDisplayObject['txt'].x = Number(sizeHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			// case 'txtY':
			// {
				// inDisplayObject['txt'].y = Number(sizeHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			// case 'txtAutoSize':
			// {
				// TextField(inDisplayObject['txt']).autoSize = String(txtAutoSizeHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			// case 'txtColor':
			// {
				// TextField(inDisplayObject['txt']).textColor = uint(txtColorHandler(String(inAttributeValue), inDisplayObject, inStage));
				// break;
			// }
			
			case 'textObj':
			{
				var json = JSON.parse(inAttributeValue);
				var arrValue = json[inAttributeName];
				if(_.isArray(arrValue))
				{
					var numItem = arrValue.length;
					for(var i = 0; i < numItem; i++)
					{
						var targetValue = arrValue[i];
						if(targetValue)
						{
							var targetClass = targetValue.Class; 
							var strParentClass = targetValue.pClass;
							if(targetClass && XMLAttributesConvertor.assetManager.hasData(targetClass))
							{
								var targetObj = XMLAttributesConvertor.assetManager.getData(targetClass, wdf.Tools.getPackageObjByString(strParentClass));
								if(targetObj)
								{
									inDisplayObject.addApplicationChild(targetObj, targetValue, false);
								}
							} 
							else
							{
								wdf.Tracer.echo('XMLAttributesConvertor : textObj : no such data found in assetManager!');
							}
						}
						else
						{
							wdf.Tracer.echo('XMLAttributesConvertor : textObj : unable to retrieve data!');
						}
					}
				}
			}
			default:
			{
				try
				{
					inDisplayObject[inAttributeName] = inAttributeValue;
				}
				catch (e)
				{
					wdf.Tracer.echo('XMLAttributesConvertor : handle : unable to set attribute : ' + inDisplayObject + ' : ' + inAttributeName + " : " + inAttributeValue);
				}
			}
		}
		return inDisplayObject;
	}
	
	
	XMLAttributesConvertor.positionHandler = function(inValue, inDisplayObject, inStage)
	{
		if(inStage && inStage.canvas)
		{
			var stageWidth = inStage.stageWidth;
			var stageHeight = inStage.stageHeight;
			var width = wdf.Container.getWidth(inDisplayObject);
			var height = wdf.Container.getHeight(inDisplayObject);
			
			switch(inValue)
			{
				case 'RIGHT': return stageWidth - width;
				case 'LEFT' : return 0;
				case 'TOP' : return 0;
				case 'BOTTOM' : return stageHeight - height;
				case 'CENTER' : return stageWidth - width >> 1;
				// default:
				// {
					// //Tracer.echo('XMLAttributesConvertor : positionHandler : no value matched : ' + inValue);
// 					
				// }
			}
		}
		
		return inValue;
		
	}
	
	
	XMLAttributesConvertor.sizeHandler = function(inValue, inDisplayObject, inStage)
		{
			switch(inValue)
			{
				case 'stageWidth': return inStage.stageWidth;
				case 'stageHeight' : return inStage.stageHeight;
				default:
				{
					//Tracer.echo('XMLAttributesConvertor : sizeHandler : no value matched : ' + inValue);
					return inValue;
				}
				
			}
			
		}
	

wdf.XMLAttributesConvertor = XMLAttributesConvertor;
}());
