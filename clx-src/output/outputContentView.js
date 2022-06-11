/************************************************
 * outputContentView.js
 * Created at 2022. 6. 6. 오후 1:45:09.
 *
 * @author PSE
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	app.lookup("output_id").setValue("output_id", app.getHost().initValue.output_id); 
	console.log("output_id : " + app.lookup("output_id").getValue("output_id"));
	
	app.lookup("getOutputContent").send();
	console.log("getOutputContent 서브미션 실행");
	
}


/*
 * getOutputContent 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetOutputContentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getOutputContent = e.control;
	
	app.lookup("productName").redraw();
	app.lookup("outputType").redraw();
	app.lookup("writeDate").redraw();
	app.lookup("outputTitle").redraw();
	app.lookup("outputContent").redraw();
	
	var attachmentList = app.lookup("attachmentList");
	var i
	for(i = 0; i < attachmentList.getRowCount(); i++) {
		var fileName = attachmentList.getValue(i, "real_file_name");
		var fileSize = attachmentList.getValue(i, "file_size");
		var save_path = attachmentList.getValue(i, "save_path")
		app.lookup("file_upload").addUploadedFile(
			{
				name : fileName, 
				size : fileSize, 
				properties : {rowIndex : i}
			}
		);
	}
	
	app.lookup("title_name").setValue("product_name", app.lookup("product").getValue("product_name"));
	app.lookup("title_name").setValue("output_title", app.lookup("product_output").getValue("output_title"));
	
}


/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var embeddedApp = app.getHost();
	
	cpr.core.App.load("output/modifyOutput", function(loadedApp){
		if(loadedApp){
			embeddedApp.initValue = {
				output_id : app.lookup("output_id").getValue("output_id")
			}
    		embeddedApp.app = loadedApp;	    		
  		}
	});
	
}


/*
 * (다운로드)파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 전송 버튼에 대한 구현이 필요합니다.
 */
function onFile_uploadSendbuttonClick(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var file_upload = e.control;
	console.log("download");
	

	var checkedFiles = file_upload.getSelection();
	var downloadFileList = app.lookup("downloadFileList");
	var attachmentList = app.lookup("attachmentList");
	var file = app.lookup("file");
	
	var i;
	var fileIndex;
	var fileName;
	var savePath;
	
	for(i = 0; i < checkedFiles.length; i++){
		fileIndex = file_upload.getIndex(checkedFiles[i]);
		fileName = attachmentList.getValue(fileIndex, "real_file_name");
		savePath = attachmentList.getValue(fileIndex, "save_path");
		
		downloadFileList.addRowData(
			{
				"file_name" : fileName,
				"save_path" : savePath
			}
		);
		
	} // end for
	
	 app.lookup("downloadAttachmentList").send();
	
	
}


/*
 * downloadAttachmentList 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDownloadAttachmentListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var downloadAttachmentList = e.control;
	console.log("압축 파일 삭제");
	app.lookup("deleteZipFile").send();
	
}


/*
 * 파일 업로드에서 download-click 이벤트 발생 시 호출.
 * 파일을 다운받는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 다운로드 버튼에 대한 구현이 필요합니다.
 */
function onFile_uploadDownloadClick(/* cpr.events.CUploadedFileEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var file_upload = e.control;
	
	var clickFile = e.uploadedFile;
	var clickFileName = clickFile.name;
	console.log("clickFileName : " + clickFileName);
	app.lookup("file").setValue("file_name", clickFileName);
	
	var savePath = app.lookup("attachmentList").getValue(clickFile.getProperty("rowIndex"), "save_path");
	
	app.lookup("file").setValue("save_path", savePath);
	/*
	var savePath = clickFile.getProperty("savePath");	
	app.lookup("file").setValue("save_path", savePath);
	*/
	
	//app.lookup("downloadAttachment").action = "/productMangement/downloadAttachment?" + clickFileName;
	app.lookup("downloadAttachment").send();
	
}



/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var output_id = app.lookup("output_id").getValue("output_id");
	
	app.lookup("deleteOutput").action = "/productMangement/deleteOutput?" + output_id;

	app.lookup("deleteOutput").send();
	console.log("deleteOutput 서브미션 실행");
	
}

/*
 * deleteOutput 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDeleteOutputSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var deleteOutput = e.control;
	
	app.getRootAppInstance().dialogManager.getDialogByName("outputContentView").close(1);
	
}






