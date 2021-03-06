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
	
	app.lookup("select_wi_fi").selectItem(1);
	
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
	var insertRow = grid_developer.insertRow(grid_developer.getViewingEndRowIndex(), true);
	// + 버튼 클릭시 그리드 행 추가
}


/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var gridDeveloper = app.lookup("grid_developer");
	gridDeveloper.showDeletedRow = false;
	
	var endRowIndex = gridDeveloper.getViewingEndRowIndex();
	
		
	var developerList = app.lookup("developerList");
	console.log(developerList.getColumnData("employees_number"));

	var result = developerList.deleteRow(endRowIndex);
	console.log(result);
		
	gridDeveloper.deleteRow(endRowIndex);
	// 제일 마지막 행 삭제
	
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
	
	console.log(authenticationList.getRowCount());
	
	var authenGrid = app.lookup("authentication");
	console.log("checkedRow : " + authenGrid.getCheckRowIndices());
	
	var checkedRow = authenGrid.getCheckRowIndices();
	
	var i;
	for(i = 0; i < 4; i++){
		if(authenGrid.isCheckedRow(i) == false){
			authenticationList.realDeleteRow(i);
		}
	}
	
	var ip_ratings = app.lookup("product_device").getValue("ip_ratings");
	if(ip_ratings == null || ip_ratings == "") {
		app.lookup("product_device").setValue("ip_ratings", "X");
	}
	
	var width = app.lookup("product_device").getValue("width");
	if(width == null || width == 0){
		app.lookup("product_device").setValue("width", 0);
	}
	
	var height = app.lookup("product_device").getValue("height");
	if(height == null || height == 0){
		app.lookup("product_device").setValue("height", 0);
	}
	
	var depth = app.lookup("product_device").getValue("depth");
	if(depth == null || depth == 0){
		app.lookup("product_device").setValue("depth", 0);
	}
	
	
	
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
	console.log(window.status);
	
	var resultCode = app.lookup("result").getValue("resultCode");
	console.log(resultCode);
	app.setAppProperty("resultCode", resultCode);
	
	app.getRootAppInstance().dialogManager.getDialogByName("addProduct").close(1);
	
	/*
	if(resultCode == 1){
		app.getRootAppInstance().dialogManager.getDialogByName("addProduct").close();
	}else {
		alert("상품 등록 실패");
	}
	*/
	
	//app.getRootAppInstance().dialogManager.getDialogByName("addProduct").close();
	//app.getRootAppInstance()는 최상위 앱 호출
	
}


/*
 * 제품명 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onInput_productNameValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var input_productName = e.control;
	
	app.lookup("product_name").setValue("product_name", app.lookup("input_productName").value);
	
	app.lookup("checkProductName").send();
	
}


/*
 * checkProductName 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onCheckProductNameSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var checkProductName = e.control;
	
	var resultCode = app.lookup("result").getValue("resultCode");
	console.log("resultCode : " + resultCode);
	
	if(resultCode != 1){
		alert("동일한 제품명은 사용할 수 없습니다. 다시 작성해 주세요.");
		app.lookup("input_productName").clear();
		app.lookup("input_productName").focus();
	}
	
}
