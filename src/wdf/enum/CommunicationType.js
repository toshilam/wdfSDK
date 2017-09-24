this.wdf = this.wdf || {}; 

(function(){
	
	var CommunicationType = function(){}
	
    CommunicationType.USER_DATA_INITIALIZED = 'userDataInitialized';
    CommunicationType.APP_DATA_INITIALIZED = 'appDataInitialized';
    CommunicationType.DOWNLOADING = 'downloading';
    CommunicationType.DOWNLOADED = 'downloaded';
    
wdf.CommunicationType = CommunicationType;
}());