this.wdf = this.wdf || {}; 

(function(){
	
	var ServiceType = function(){}
	
	ServiceType.INTERNAL_SUBSCRIBE		= 'internal-subscribe'; //use between servers for boardcast
	ServiceType.INTERNAL_UNSUBSCRIBE	= 'internal-unsubscribe'; //use between servers for boardcast
	
	ServiceType.SUBSCRIBE		= 'subscribe';
	ServiceType.UNSUBSCRIBE		= 'unsubscribe'; 
	
	ServiceType.AVATAR_CONNECT		= 'avatar-connect';
	ServiceType.AVATAR_DISCONNECT	= 'avatar-disconnect';
	ServiceType.AVATAR_VALIDATION	= 'avatar-validation';
	ServiceType.GET_TABLES			= 'get-tables';
	ServiceType.GET_MP_TABLES		= 'get-mp-tables'; //internal use
	ServiceType.VIEW_TABLE			= 'view-table';
	ServiceType.LEAVE_VIEW_TABLE	= 'leave-view-table';
	ServiceType.JOIN_TABLE			= 'join-table';
	ServiceType.JOIN_MP_TABLE		= 'join-mp-table'; //internal use
	ServiceType.LEAVE_TABLE			= 'leave-table';
	ServiceType.BEGIN_GAME			= 'begin-game';
	ServiceType.AVATAR_FUND_GAME	= 'avatar-fund-game';
	ServiceType.AVATAR_CANCEL_FUND_GAME	= 'avatar-cancel-fund-game';
	ServiceType.AVATAR_MP_FUND_GAME	= 'avatar-mp-fund-game';
	ServiceType.GET_BAC_CARD_RESULT	= 'get-bac-card-result';
	ServiceType.BAC_SHUFFLE_CARD	= 'bac-shuffle-card';
	ServiceType.AVATAR_UPDATE_WINNING	= 'avatar-update-winning';
	ServiceType.COMPLETE_GAME		= 'complete-game';
	ServiceType.RESTART_GAME		= 'restart-game';
	ServiceType.HEARTBEAT			= 'heartbeat';
	ServiceType.GET_RANKING_LIST	= 'get-ranking-list';
	ServiceType.GET_PLAY_ID_LIST	= 'get-play-id-list';
	ServiceType.GET_ROUND_ID_LIST	= 'get-round-id-list';
	ServiceType.GET_BET_ID_LIST 	= 'get-bet-id-list';
	ServiceType.GET_MEMBER_WIN_POOL	= 'get-member-win-pool';
	ServiceType.GET_WIN_POOL		= 'get-win-pool';
	ServiceType.GAME_AUDIT 			= 'game-audit';
	ServiceType.GET_TABLE_SUM 		= 'get-table-sum';
	ServiceType.SEND_TABLE_MESSAGE 	= 'send-table-message';
	ServiceType.CREATE_AVATAR_TABLE = 'create-avatar-table';
	ServiceType.CREATE_MATCH_TABLE 	= 'create-match-table';
	ServiceType.REMOVE_AVATAR_TABLE = 'remove-avatar-table';
	ServiceType.GET_AVATAR_TABLE_LIST = 'get-avatar-table-list';
	ServiceType.GET_AVATAR_TABLE_ROUND_LIST = 'get-avatar-table-round-list';
	ServiceType.GET_AVATAR_TABLE_BET_LIST = 'get-avatar-table-bet-list';
	ServiceType.GET_AVATAR_TABLE_WIN_SUM = 'get-avatar-table-win-sum';
	ServiceType.EDIT_AVATAR_TABLE_MEMBER = 'edit-avatar-table-member';
	ServiceType.JOIN_SESSION = 'join-session';
	ServiceType.GET_AVATAR_INFO = 'get-avatar-info';
	ServiceType.GET_MATCHES_LIST = 'get-matches-list';
	
	//(bankerPoint table) request by table owner.
	ServiceType.AVATAR_REQUEST_SHUFFLE_CARD = 'avatar-request-shuffle-card';
	ServiceType.AVATAR_REQUEST_TABLE_REMOVE = 'avatar-request-table-remove';
	ServiceType.AVATAR_UPDATE_TABLE_FUND = 'avatar-update-table-fund';
	
	ServiceType.TABLE_STATE			= 'table-state';
	
	ServiceType.CANCEL_FUND_GAME	= 'cancel-fund-game'; 
	ServiceType.SYSTEM_UPDATE_WINNING	= 'system-update-winning'; //internal use
	ServiceType.SYSTEM_UPDATE_WIN_POOL	= 'system-update-win-pool'; //internal use
	ServiceType.SYSTEM_CLEAR_LOG	= 'system-clear-log'; //internal use
	ServiceType.SYSTEM_GET_TABLES	= 'system-get-tables'; //internal use
	ServiceType.SYSTEM_JOIN_TABLES	= 'system-join-tables'; //internal use
	ServiceType.SYSTEM_BEGIN_MP_GAME	= 'system-begin-mp-game'; //internal use
	ServiceType.SYSTEM_GET_BAC_CARD_RESULT	= 'system-get-bac-mp-card-result'; //internal use
	ServiceType.SYSTEM_UPDATE_WINNING	= 'system-update-winning'; //internal use
	ServiceType.SYSTEM_COMPLETE_GAME	= 'system-complete-game'; //internal use
	ServiceType.SYSTEM_SEND_EMAIL	= 'system-send-email'; //internal use
	ServiceType.SYSTEM_SYNC_USER	= 'system-sync-user'; //internal use
	//ServiceType.SYSTEM_CLEAR_REQUEST_LOG	= 'system-clear-request-log';
	
	ServiceType.ADMIN_USER_LIST	= 'admin-user-list';
	ServiceType.ADMIN_TABLE_LIST	= 'admin-table-list';
	ServiceType.ADMIN_KICK_USER	= 'admin-kick-user';
	
	ServiceType.SYSTEM_HEARTBEAT	= 'system-heartbeat';
    
wdf.ServiceType = ServiceType;
}());