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
	
	console.log(authenticationList.getRowCount());
	
	var authenGrid = app.lookup("authentication");
	console.log("checkedRow : " + authenGrid.getCheckRowIndices());
	
	var checkedRow = authenGrid.getCheckRowIndices();
	
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
