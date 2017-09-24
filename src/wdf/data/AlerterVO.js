this.wdf = this.wdf || {}; 

(function(){
	
	var AlerterVO = function(inID, inType, inInput, inData, inTitle, inMessage, inXMLSetting)
	{
		this.initialize(inID, inType, inInput, inData, inTitle, inMessage, inXMLSetting);
	}
	
	var p = AlerterVO.prototype = Object.create( wdf.VO.prototype );
	
	p.type = '';
	//can be input by user, (e.g. MessagerYesNoAlerter input will be 'yes' or 'no')
	p.input = '';
	//anything can be assigned, normally assign the target object which will be informed once user made tge confirmation.
	//p.targetObject:Object;
	
	p.data = null;
	p.title = '';
	p.message = '';
	p.XMLSetting = null;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inType, inInput, inData, inTitle, inMessage, inXMLSetting)
	{
		this.VO_initialize( inID );
		
		this.type = inType;
		this.input = inInput;
		this.data = inData;
		this.title = inTitle;
		this.message = inMessage;
		this.XMLSetting = inXMLSetting;
	}
	
	p.clear = function() 
	{
		this.type = '';
		this.input = '';
		this.data = null;
		this.title = '';
		this.message = '';
		this.XMLSetting = null;
	}
	
	p.clone = function() 
	{
		return null;
	}
	
	
wdf.AlerterVO = AlerterVO;
}());
