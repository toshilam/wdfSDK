this.wdf = this.wdf||{};

(function() {

	var FileEvent = function(type, inLoader, inURL, inFileType, inFileID, inData) 
	{
		this.initialize(type, inLoader, inURL, inFileType, inFileID, inData);
	}
	
	FileEvent.NAME = 'FileEvent';
	FileEvent.COMPLETE = 'Complete';
	FileEvent.COMPLETE_ALL_FILE = 'CompleteAllFile';
	FileEvent.UPLOAD = 'upload';
	FileEvent.DOWNLOAD = 'download';
	FileEvent.SIZE_OVER = 'sizeOver';
	FileEvent.NUM_FILE_OVER = 'numFileOver';
	FileEvent.IO_ERROR = 'ioError';
	
	
	
	var p = FileEvent.prototype = Object.create( wdf.ApplicationEvent.prototype);
	
	p.fileURL;
	p.fileType;
	p.fileID;
	p.loader;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inLoader, inURL, inFileType, inFileID, inData) 
	{
		this.ApplicatoinEvent_initialize(type, null, inData);
		this.loader = inLoader;
		this.fileURL = inURL;
		this.fileType = inFileType;
		this.fileID = inFileID;
		// _data = inData;
	}

	p.clone = function() 
	{
		return new wdf.FileEvent(this.type, this.loader, this.fileURL, this.fileType, this.fileID, this._data);
	}

	p.toString = function() 
	{
		return "[FileEvent (type="+this.type+" fileURL="+this.fileURL+" fileType="+this.fileType+" data="+this.data+ ")]";
	}

wdf.FileEvent = FileEvent;
}());