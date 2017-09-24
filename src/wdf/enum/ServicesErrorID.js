this.wdf = this.wdf || {}; 

(function(){
	
	var ServicesErrorID = function(){}
	
    ServicesErrorID.NONE = '0';
    ServicesErrorID.PARAMETER_EMPTY = '1';
    ServicesErrorID.PARAMETER_MISSING = '2';
    ServicesErrorID.PARAMETER_ERROR = '3';
    ServicesErrorID.TOKEN_EXPIRED = '4';
    ServicesErrorID.TOKEN_NOT_FOUND = '5';
    ServicesErrorID.NOT_IN_USE = '6';
	
    ServicesErrorID.DB_CONNECTION_ERROR = '20';
    ServicesErrorID.DB_INSERT_ERROR = '21';
    ServicesErrorID.DB_UPDATE_ERROR = '22';
    ServicesErrorID.DB_RECORD_NOT_FOUND = '23';
    ServicesErrorID.DB_RECORD_EXISTS = '24';
	
    ServicesErrorID.JSON_EXCEPTION = '30';
    ServicesErrorID.JSON_GENERAL_ERROR = '31';
    ServicesErrorID.JSON_METHOD_NAME_ERROR = '32';
    ServicesErrorID.JSON_PARAMETER_EMPTY = '33';
    ServicesErrorID.JSON_PARAMETER_MISSING = '34';
    ServicesErrorID.JSON_REQUEST_ID_DUPLICATED = '35';
    ServicesErrorID.JSON_REQUEST_ID_ERROR = '36';
    ServicesErrorID.JSON_KEY_NOT_FOUND = '37';
	
	//internal error
	ServicesErrorID.JOIN_TABLE_ALREADY_JOINED = '1901';
	ServicesErrorID.JOIN_TABLE_INTERNAL_ERROR = '1902';
	ServicesErrorID.JOIN_TABLE_NO_AVAILABLE = '1903';
	ServicesErrorID.JOIN_TABLE_NO_SEAT = '1904';
	ServicesErrorID.JOIN_TABLE_PLAY_ID_ERROR = '1905';
	ServicesErrorID.JOIN_TABLE_OWNER_NOT_ALLOWED = '1906';
	ServicesErrorID.JOIN_TABLE_NOT_INVITED = '1907';
	ServicesErrorID.SHUFFLE_CARD_NO_JOINED_TABLE = '1911';
	ServicesErrorID.FUND_GAME_STATE_ERROR = '1931';
	ServicesErrorID.FUND_GAME_ALREADY_MADE = '1932';
	ServicesErrorID.LEAVE_GAME_DATA_MISMATCH = '1941';
	ServicesErrorID.GET_CARD_RESULT_ERROR = '1951';
	ServicesErrorID.COMPLETE_GAME_ERROR = '1961'; //have imcomplete bets
	ServicesErrorID.COMPLETE_GAME_ALREADY_COMPLETED = '1962';
	ServicesErrorID.UPDATE_WINNING_DATA_MISMATCH = '1970';
	ServicesErrorID.UPDATE_WINNING_NOT_FUNDED = '1971';
	ServicesErrorID.UPDATE_WINNING_FAIL = '1972';
	ServicesErrorID.VIEW_TABLE_NOT_TABLE_AVAILABLE = '1980';
	ServicesErrorID.VIEW_TABLE_ALREADY_JOINED = '1981';
	ServicesErrorID.INTERNAL_DATA_ERROR = '1990';
	ServicesErrorID.PERMISSION_DENIED = '1991';
	ServicesErrorID.CREATE_TABLE_FAIL = '2010';
    
wdf.ServicesErrorID = ServicesErrorID;
}());