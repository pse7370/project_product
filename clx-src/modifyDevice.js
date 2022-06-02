/************************************************
 * modifyDevice.js
 * Created at 2022. 5. 31. 오후 7:12:37.
 *
 * @author A
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("product_id").setValue("product_id", app.getHost().initValue.product_id);
	console.log(app.lookup("product_id").getValue("product_id"));
	
	if(app.lookup("product_id").getValue("product_id") != 0){
		app.lookup("getDeviceContent").send();
		console.log("getDeviceContent 서브미션 실행");
	}
	
}


/*
 * 담당 롤을 클릭할 때 발생하는 이벤트.
 * 개발자 "+" 버튼에서 click 이벤트 발생 시 호출.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var grid_developer = app.lookup("grid_developer");
	var insertRow = grid_developer.insertRow(1, true);
	// + 버튼 클릭시 그리드 행 추가
	
}


/*
 * getDeviceContent 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetDeviceContentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getDeviceContent = e.control;
	
	app.lookup("productImage").value = app.lookup("product").getValue("save_image_name");
	
	app.lookup("input_productName").redraw();
	app.lookup("input_productVersion").redraw();
	app.lookup("width").redraw();
	app.lookup("height").redraw();
	app.lookup("depth").redraw();
	app.lookup("input_server").redraw();
	app.lookup("selectWi_fi").value = app.lookup("product_device").getValue("wi_fi");
	app.lookup("input_other").redraw();
	app.lookup("input_IpRatings").redraw();
	app.lookup("explanation").redraw();		
	
	var authenticationList = app.lookup("authenticationList");
	var i;
	var j;
	var auth_types = ["카드", "지문", "얼굴", "홍채"]; // 인증 방식은 카드, 지문, 얼굴, 홍채 총 4가지
	//var dataSetAuthLength = app.lookup("authenticationList").getRowCount();
	var beforeModifyAuthTypes = app.lookup("authenticationList").getColumnData("auth_type");
	console.log("beforeModifyAuthTypes : " + beforeModifyAuthTypes);
		// 수정하기 전 기존 데이터에 있던 인증 방식은 auth_types에서 제외
		// 기존에 가지고 있지 않은 인증 방식 값들이 어떤 것인지 가져오기 위한 과정	
		for(i = 0; i < beforeModifyAuthTypes.length; i++){

			switch(beforeModifyAuthTypes[i]){
				case "카드" :
					auth_types[0] = "";
					break;
				case "지문" :
					auth_types[1] = "";
					break;
				case "얼굴" :
					auth_types[2] = "";
					break;
				case "홍채" :
					auth_types[3] = "";
					break;			
			}
			
		} // end for j

	
	console.log("auth_types : " + auth_types);
	// 그리드에 표시된 수정 전 기존 데이터의 체크박스 체크하기
	app.lookup("authentication").checkAllRow();
	
	// 기존에 가지고 있던 인증 타입에 없는 인증 타입을  카드, 기준, 얼굴, 홍채 순으로 정렬해 추가하기.
	for(i = 0; i < 4; i++){
		//authenticationList.addRowData({"auth_type" : auth_types[i]});
		if(auth_types[i] != ""){
			switch(auth_types[i]){
				case "카드" :
					app.lookup("authentication").insertRowData(0, false, {"auth_type" : auth_types[i]}, false);
					break;
				case "지문" :
					app.lookup("authentication").insertRowData(1, false, {"auth_type" : auth_types[i]}, false);
					break;
				case "얼굴" :
					app.lookup("authentication").insertRowData(2, false, {"auth_type" : auth_types[i]}, false);
					break;
				case "홍채" :
					app.lookup("authentication").insertRowData(3, false, {"auth_type" : auth_types[i]}, false);
					break;
			}			
			
		}			
	}
	
	
	
	
}


/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var product_image = app.lookup("productImage");
	if (product_image.file != null){
		app.lookup("modifyDevice").addFileParameter("deviceImage", product_image.file);
		console.log("출입통제기 이미지 파일명 :" + product_image.file);
		console.log("출입통제기 파일 타입" + product_image.file.type);
	}
	
	app.lookup("modifyDevice").send();
	console.log("modifyDevice 서브미션 실행"); 
	
}
