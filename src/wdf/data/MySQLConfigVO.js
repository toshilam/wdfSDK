this.wdf = this.wdf || {}; 

(function(){
	
	var MySQLConfigVO = function
	(
		inID,
		inHost,
		inUser,
		inPassword,
		inDatabase
	)
	{
		this.initialize(inID, inHost, inUser, inPassword, inDatabase);
	}
	
	var p = MySQLConfigVO.prototype = Object.create( wdf.VO.prototype);
	
	p.host;
	p.user;
	p.password;
	p.database;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inHost, inUser, inPassword, inDatabase)
	{
		this.VO_initialize(inID);
		
		this.host = inHost;
		this.user = inUser;
		this.password = inPassword;
		this.database = inDatabase;
		
	}
	
	p.clone = function()
	{
		return new wdf.MySQLConfigVO(this.id, this.host, this.user, this.password, this.database);
	}
	
	p.toString = function()
	{
		return "[object MySQLConfigVO(id=" + this.id  + "]";
	}
	
	
wdf.MySQLConfigVO = MySQLConfigVO;
}());
