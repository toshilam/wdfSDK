this.wdf = this.wdf || {}; 

(function(){
	
	var AssetLibID = function(){}
	
    AssetLibID.APP_HEADER = 'AppHeader';
	AssetLibID.APP_FOOTER = 'AppFooter';
	AssetLibID.APP_GAME = 'AppGame';
	
	/* asset */
	AssetLibID.AST_COMMON = 'assetCommon';
	AssetLibID.AST_HEADER = 'assetHeader';
	AssetLibID.AST_FOOTER = 'assetFooter';
	AssetLibID.AST_GAME = 'assetGame';
	
	/* xml */
	AssetLibID.XML_CONFIG = 'xmlConfig';
	AssetLibID.XML_COMMON = 'xmlCommon';
	AssetLibID.XML_LANG_COMMON = 'langCommon';
	AssetLibID.XML_GAME = 'xmlGame';

wdf.AssetLibID = AssetLibID;
}());