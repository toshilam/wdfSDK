this.wdf = this.wdf || {}; 

(function(){
	
	
	var GameMPTableVO = function(inTableID, inTableName, inTemplateTableID, inVirtualTableID)
	{
		this.initialize(inTableID, inTableName, inTemplateTableID, inVirtualTableID);
	}
	
	var p = GameMPTableVO.prototype = Object.create( wdf.GameTableVO.prototype);
	
	p.templateTableID = 0;
	p.virtualTableID = 0;
	
	
	p.GameTableVO_initialize = p.initialize;
	p.initialize = function(inTableID, inTableName, inTemplateTableID, inVirtualTableID)
	{
		this.GameTableVO_initialize(inTableID, inTableName);
		this.templateTableID = inTemplateTableID;
		this.virtualTableID = inVirtualTableID;
	}
	
	p.toString = function()
	{
		return "[Object GameMPTableVO( " + this.id + " )]";
	}
	
	
wdf.GameMPTableVO = GameMPTableVO;
}());
