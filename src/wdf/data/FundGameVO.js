this.wdf = this.wdf || {}; 

(function(){
	
	var FundGameVO = function(inID, inData, inSeatIndex, inThirdPartyID, inDeviceID, inPlayID)
	{
		this.initialize(inID, inData, inSeatIndex, inThirdPartyID, inDeviceID, inPlayID);
	}
	
	var p = FundGameVO.prototype = Object.create( wdf.VO.prototype);
	
	p.data;
	p.seatIndex;
	p.thirdPartyID;
	p.deviceID; 
	p.playID; 
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inData, inSeatIndex, inThirdPartyID, inDeviceID, inPlayID)
	{
		this.VO_initialize(inID);
		this.data = inData;
		this.seatIndex = inSeatIndex;
		this.thirdPartyID = inThirdPartyID;
		this.deviceID = inDeviceID; 
		this.playID = inPlayID; 
	}
	
	
	
	p.toString = function()
	{
		return "[Object FundGameVO( " + this.inID + " )]";
	}
	
	
wdf.FundGameVO = FundGameVO;
}());
