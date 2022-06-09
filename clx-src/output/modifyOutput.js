/************************************************
 * modifyOutput.js
 * Created at 2022. 6. 6. 오후 2:48:59.
 *
 * @author PSE
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	var outputID = app.getHost().initValue.output_id;
	
	app.lookup("output_id").setValue("output_id", outputID);
	app.lookup("getOutputContent").send();
	console.log("getOutputContent 서브미션 실행");
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetOutputContentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getOutputContent = e.control;
	
	app.lookup("productName").redraw();
	app.lookup("input_outputType").redraw();
	app.lookup("input_outputTitle").redraw();
	app.lookup("outputContent").redraw();
	
	
	
	var attachmentList = app.lookup("attachmentList");
	var i
	for(i = 0; i < attachmentList.getRowCount(); i++) {
		var fileName = attachmentList.getValue(i, "real_file_name");
		var fileSize = attachmentList.getValue(i, "file_size");
		var save_path = attachmentList.getValue(i, "save_path")
		
		app.lookup("file_upload").addFile({
				name : fileName, 
				size : fileSize, 
				properties : {svaePath : save_path}
			}, false);
		
		/*
		app.lookup("file_upload").addUploadedFile(
			{
				name : fileName, 
				size : fileSize, 
				properties : {svaePath : save_path}
			}
		);
		*/ 
	}
	
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
	
	var attachmentList = app.lookup("attachmentList");
	var files = app.lookup("file_upload").getFiles();
	

	
	app.lookup("modifyOutput").send();
	console.log("modifyOutput 서브미션 실행");
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onModifyOutputSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var modifyOutput = e.control;
	
	cpr.core.App.load("output/outputContentView", function(loadedApp){
			if(loadedApp){
	    		app.getHost().app = loadedApp;
	  		}
		});
	//app.close();
	
}


/*
 * 파일 업로드에서 add-file 이벤트 발생 시 호출.
 * 파일 추가 후 발생하는 이벤트입니다.
 */
function onFile_uploadAddFile(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var file_upload = e.control;
	
	console.log("추가된 파일들 : " + e.files);
	
	var files = e.files;
	var i;
	for(i = 0; i < files.length; i++){
		app.lookup("modifyOutput").addFileParameter("file" + i, files[i]);
	}
	
}


/*
 * 파일 업로드에서 remove-before-file 이벤트 발생 시 호출.
 * 파일을 삭제 하기 전에 발생하는 이벤트 입니다. event.preventDefault()를 하면 파일을 삭제하지 않습니다.
 */
function onFile_uploadRemoveBeforeFile(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var file_upload = e.control;
	console.log("삭제될 파일들 : " + e.files);
	
	var files = e.files;
	var i;
	for(i = 0; i < files.length; i++){
		if(files[i].type != File){
			app.lookup("deleteFileList").addRowData(
				{
					"delete_file_name" : files[i].name
				}
			);
		}else{
			app.lookup("modifyOutput").removeFileParameters(files[i].name);
		}
		
	}
	

	
	
}
