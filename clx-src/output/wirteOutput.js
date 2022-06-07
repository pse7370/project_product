/************************************************
 * wirteOutput.js
 * Created at 2022. 6. 6. 오후 1:48:19.
 *
 * @author PSE
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var product_id = app.getRootAppInstance().getAppProperty("product_id"); // 부모화면 데이터 셋
	var product_name = app.getRootAppInstance().getAppProperty("product_name");
	console.log("product_id : " + product_id);
	console.log("product_name : " + product_name);
	
	var dataProduct_output = app.lookup("product_output");
	dataProduct_output.setValue("product_id", Number(product_id));
	console.log(dataProduct_output.getValue("product_id"));
	
	app.lookup("product").setValue("product_name", product_name);
	
	app.lookup("productName").redraw();
	
}


/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var files = app.lookup("file_upload").getFiles();
	if(files.length > 0){
		var i
		for(i = 0; i < files.length; i++){
			app.lookup("addOutput").addFileParameter("file" + i, files[i]);
			console.log("file" + i + " : " + files[i]);
		}
		//app.lookup("addOutput").setFileParameters("attachment", files);
		//console.log(files);
	}
	
	var today = moment().format("YYYY-MM-DD");
	console.log(today);
	app.lookup("product_output").setValue("write_date", today);
	
	app.lookup("addOutput").send();
	console.log("addOutput 서브미션 실행");
	
}

/*
 * addOutput 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onAddOutputSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var addOutput = e.control;
	
	console.log(app.lookup("resultCode").getValue("resultCode"));
	
	app.getRootAppInstance().dialogManager.getDialogByName("wirteOutput").close(1);
	
	
}
