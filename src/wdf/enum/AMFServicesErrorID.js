this.wdf = this.wdf || {}; 

(function(){
	
	var AMFServicesErrorID = function(){}
	
    AMFServicesErrorID.NONE = '0';
		
	/**
	 * DB error
	 */
	AMFServicesErrorID.USER_LOGIN_FAIL = '500';
	
	/**
	 * DB error
	 */
	AMFServicesErrorID.DB_GET_DATA = '1000';
	
	/**
	 * DB error inserting data
	 */
	AMFServicesErrorID.DB_INSERT_DATA = '1001';
	
	/**
	 * invalid data
	 */
	AMFServicesErrorID.INVALID_DATA = '2000';
	
	/**
	 * error creating data
	 */
	AMFServicesErrorID.CREATE_DATA = '2001';
	
	/**
	 * missing data
	 */
	AMFServicesErrorID.MISS_DATA = '2002';
	
	/**
	 * duplicated data
	 */
	AMFServicesErrorID.DUPLICATE_DATA = '2003';
	
	AMFServicesErrorID.E2100 = '2100';
	AMFServicesErrorID.E2101 = '2101';
	AMFServicesErrorID.E2102 = '2102';
	
	/**
	 * error sending email
	 */
	AMFServicesErrorID.EMAIL_SEND_FAIL = '3000';
	
	/**
	 * paypal error from 4000
	 */
	AMFServicesErrorID.PAYPAL_VERIFY_ACC_STATUS_FAIL = '4000';
    
wdf.AMFServicesErrorID = AMFServicesErrorID;
}());