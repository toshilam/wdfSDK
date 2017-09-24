_ = require('underscore');
require('node-easel');
puremvc = require("npmvc");
mysql = require("mysql");
crypto = require('crypto');
//expressIO = require('express.io')();
chance = new require('chance')();
request = require('request');
colors = require('colors/safe');
callstack = require('callstack');

wdf = {};

var classes = [
	
	'wdf/Config',
	
	'wdf/utils/String',
	'wdf/utils/Array',
	'wdf/utils/PackageBuilder',
	'wdf/utils/Timer',
	'wdf/utils/Tools',
	'wdf/utils/Tracer',
	'wdf/utils/XMLAttributesConvertor',
	
	'wdf/data/VO',
	'wdf/data/VOList',
	'wdf/data/AlerterVO',
	'wdf/data/DisplayObjectVO',
	'wdf/data/MySQLConfigVO',
	'wdf/data/ResultVO',
	'wdf/data/SetupVO',
	'wdf/data/UserInfoVO',
	'wdf/data/UserVOList',
	'wdf/data/QueueVO',
	'wdf/data/QueueVOList',
	'wdf/data/GameTableVO',
	'wdf/data/GameMPTableVO',
	'wdf/data/FundGameVO',
	
	'wdf/data/service/UserVOService',
	
	'wdf/display/ModuleMain',
	'wdf/display/GameTable',
	
	'wdf/enum/AMFServicesErrorID',
	'wdf/enum/AssetLibID',
	'wdf/enum/CommunicationType',
	'wdf/enum/MessageID',
	'wdf/enum/ServiceID',
	'wdf/enum/ServicesErrorID',
	'wdf/enum/ServiceType',
	'wdf/enum/DataID',
	'wdf/enum/VOID',
	
	'wdf/events/ApplicationEvent',
	'wdf/events/ButtonEvent',
	'wdf/events/FileEvent',
	'wdf/events/ServiceEvent',
	'wdf/events/TimerEvent',
	'wdf/events/VOEvent',
	'wdf/events/GameTableEvent',
	'wdf/events/SystemEvent',
	'wdf/events/UserEvent',
	
	'wdf/net/BaseService',
	'wdf/net/DataHandler',
	'wdf/net/ServiceRequest',
	'wdf/net/RemoteService',
	'wdf/net/ServiceConnection',
	'wdf/net/MySQLDataHandler',
	'wdf/net/MySQLServiceConnection',
	'wdf/net/MySQLServiceRequest',
	'wdf/net/PMXService',
	'wdf/net/ServiceResponse',
	'wdf/net/CommServiceRequest',
	'wdf/net/CommunicationService',
	'wdf/net/ExpressIOService',
	'wdf/net/ExpressServiceRequest',
	'wdf/net/SocketIOClientService',
	'wdf/net/HTTPRequestService',
	'wdf/net/HTTPServiceRequest',
	'wdf/net/HTTPDataHandler',
	'wdf/net/EmailService',
	'wdf/net/EmailServiceRequest',
	
	'wdf/puremvc/AppMediator',
	'wdf/puremvc/AppProxy',
	
	'wdf/resources/DataManager',
	'wdf/resources/AssetManager',
	'wdf/resources/ServiceManager',
	'wdf/resources/SettingManager',
	'wdf/resources/SoundManager',
	'wdf/resources/UserManager',
	'wdf/resources/VOManager',
	'wdf/resources/XMLManager',
	'wdf/resources/QueueManager'
	
];

for (var i = 0; i < classes.length; i++) {
	var path = classes[i];
	var name = path.split('/').pop();
	//console.log(require('./' + path + '.js'));
	require('./' + path + '.js');//[name];
};

