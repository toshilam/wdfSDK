this.wdf = this.wdf || {}; 

(function(){
	"use strict";
	
	var Config = function(){}
	
	/*if(!wdfConfig)
	{
		throw 'Config : wdfConfig : is not defined';
	}*/
	
	Config.MODULE_ID_ROUTER = 'wdf.AppGame.router';
	Config.MODULE_ID_BBAC = 'wdf.AppGame.bbac';
	Config.MODULE_ID_GAME_MANAGER = 'wdf.AppGame.gameManager';
	Config.MODULE_ID_ADMIN = 'wdf.AppGame.admin'; //admin page
	
	Config.GAMING_SHARE_SECRET = '';
	
    Config.IS_TEST_MODE = false;
    Config.AWS_MEMCACHE_ENDPOINT = '';
	
	Config.APPLICATION_TITLE = 'wdf';
	
	Config.PF_CODE_WEB = 'web';
	Config.PF_CODE_HTML5 = 'html5';
	
	
	
	Config.LANG_CODE_EN = 'en_us';
	Config.LANG_CODE_CHS = 'zh_cn';
	Config.LANG_CODE_CHT = 'zh_hk';
	
	Config.CURRENCY_HKD = 'HKD';
	


wdf.Config = Config;
}());