/************************************************
 * addDevice.js
 * Created at 2022. 5. 25. 오후 1:03:39.
 *
 * @author A
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 제품명 inputBox에 커서 위치
	app.lookup("input_productName").focus();
	
	// 통신 방식 그리드 1행 추가
	app.lookup("communication").insertRow(1, true);
	
}


/*
 * 담당개발자 "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var grid_developer = app.lookup("grid_developer");
	var insertRow = grid_developer.insertRow(1, true);
	// + 버튼 클릭시 그리드 행 추가
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
	var product_image = app.lookup("product_image");
	
	var addDevice = app.lookup("addDevice");
	// 업로드한 파일 정보 서브미션에 저장
	if (product_image.file != null){
		addDevice.addFileParameter("deviceImage", product_image.file);
		console.log("출입통제기 이미지 파일명 :" + product_image.file);
		console.log("출입통제기 파일 타입" + product_image.file.type);
	}
	
	var product = app.lookup("product");
	
	product.setValue("product_type", "출입통제기");
	
	var authenticationList = app.lookup("authenticationList")
	var authenticationDetailList = app.lookup("authenticationDetailList")
	
	console.log(authenticationList.getRowCount());
	console.log(authenticationList.getRowData(0));
	
	/*
	for(i = 0; i < authenticationList.getRowCount(); i++){
		authenticationDetailList.clear();
		authenticationDetailList.addRowData({
												 "auth_type": authenticationList.getValue(i, "auth_type"), 
												 "auth_method": "1:1",
												 "max_users": authenticationList.getValue(i, "one_to_one_max_user"),
												 "max_templates": authenticationList.getValue(i, "one_to_one_max_template")	
											},
											{
												"auth_type": authenticationList.getValue(i+1, "auth_type"), 
												 "auth_method": "1:N",
												 "max_users": authenticationList.getValue(i+1, "one_to_many_max_user"),
												 "max_templates": authenticationList.getValue(i+1, "one_to_many_max_template"),
											});
			console.log(authenticationDetailList.getRowData(i));	
			console.log(authenticationDetailList.getRowData(i+1));							
	}
	* 	*/
	
	
	addDevice.send();
}


/* 출입통제기 제품 등록 성공 후
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onAddDeviceSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var addDevice = e.control;
	
	var resultCode = app.lookup("result").getOriginalValue("resultCode");
	
	var returnValue; 
	if(resultCode == "ok"){
		returnValue = 1;
		app.close(returnValue);
		
	}
	
}
