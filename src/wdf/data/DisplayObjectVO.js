this.wdf = this.wdf || {}; 

(function(){
	
	var DisplayObjectVO = function(inID, inDisplayObject, inSettingXML, inData)
	{
		this.initialize(inID, inDisplayObject, inSettingXML, inData);
	}
	
	var p = DisplayObjectVO.prototype = Object.create( wdf.VO.prototype);
	
	p.data = null;
	p.settingXML = null;
	p.displayObject = null;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inDisplayObject, inSettingXML, inData)
	{
		this.VO_initialize(inID);
		this.data = inData;
		this.settingXML = inSettingXML;
		this.displayObject = inDisplayObject;
	}
	
	p.clear = function() 
	{
		this.data = null;
		this.settingXML = null;
		this.displayObject = null;
	}
	
	p.clone = function() 
	{
		return new wdf.DisplayObjectVO(this.id, this.displayObject, this.settingXML, this.data);
	}
	
	
wdf.DisplayObjectVO = DisplayObjectVO;
}());
