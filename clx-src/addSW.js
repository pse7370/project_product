/************************************************
 * addSW.js
 * Created at 2022. 5. 29. 오전 1:35:06.
 *
 * @author PSE
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("input_productName").focus();
}

/*
 * 담당 개발자 "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
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
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var product_image = app.lookup("product_image");
	
	var addSW = app.lookup("addSW");
	// 업로드한 파일 정보 서브미션에 저장
	if (product_image.file != null){
		addSW.addFileParameter("SWimage", product_image.file);
		console.log("출입통제기 이미지 파일명 :" + product_image.file);
		console.log("출입통제기 파일 타입" + product_image.file.type);
	}
	
	var product = app.lookup("product");
	
	product.setValue("product_type", "SW");
	
	var product_sw = app.lookup("product_sw");
	
	// 선택한 DB 값의 행 인덱스 값들 가져오기
	var selectDBindices = app.lookup("grid_DB").getCheckRowIndices();
	console.log("selectDBindices : " + selectDBindices);
	
	var i;
	var selectDBVaules = 0;
	var dbDateSet = app.lookup("available_dbList");
	for(i = 0; i < selectDBindices.length; i++) {
		// 가져온 인덱스 값으로 선택한 DB의 설정된 2진수 값을 모두 더한다. (available_dbList 데이터셋 확인)
		selectDBVaules += dbDateSet.getValue(selectDBindices[i], "db_binary_numbers");
	}
	console.log("selectDBVaules : " + selectDBVaules);
	
	// 더한 2진수 값을 10진수로 변환, prodect_sw 데이터 맵에 넣기
	var decimalDBvalue = parseInt(selectDBVaules, 2);
	console.log("decimalDBvalue : " + decimalDBvalue);
	
	product_sw.setValue("available_db", decimalDBvalue);
	
	// 선택한 OS 값들 가져오기
	var selectOSvalues = app.lookup("checkBox_os").values;
	console.log("selectOSvalues : " + selectOSvalues);
	
	var osValue = 0;
	for(i = 0; i < selectOSvalues.length; i++){
		// 선택한 os의 설정된 2진수 값을 모두 더한다. (available_osList 데이터셋 확인)
		osValue += Number(selectOSvalues[i]);
	}
	
	console.log("osValue : " + osValue);
	// 더한 2진수 값을 10진수로 변환, prodect_sw 데이터 맵에 넣기
	var decimalOSvalue = parseInt(osValue, 2);
	console.log("decimalOSvalue : " + decimalOSvalue);
	
	product_sw.setValue("available_os", decimalOSvalue);
	
	app.lookup("addSW").send();
	console.log("addSW 서브미션 실행");
	
}

/*
 * addSW 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onAddSWSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var addSW = e.control;
	
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
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
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
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
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
