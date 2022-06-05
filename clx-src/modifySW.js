/************************************************
 * modifySW.js
 * Created at 2022. 6. 2. 오후 11:25:13.
 *
 * @author PSE
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("product_id").setValue("product_id", app.getHost().initValue.product_id);
	console.log(app.lookup("product_id").getValue("product_id"));
	
	if(app.lookup("product_id").getValue("product_id") != 0){
		app.lookup("getSWcontent").send();
		console.log("getSWcontent 서브미션 실행");
	}
}

/*
 * getSWcontent 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetSWcontentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getSWcontent = e.control;
	app.lookup("productImage").value = app.lookup("product").getValue("save_image_namee");
	
	app.lookup("input_productName").redraw();
	app.lookup("input_productVersion").redraw();
	app.lookup("input_simultaneous").numberValue = app.lookup("product_sw").getValue("simultaneous");
	app.lookup("explanation").redraw();
	
	var gridDB = app.lookup("grid_DB");
	var availableDB = app.lookup("product_sw").getValue("available_db");
	
	// 1 : Oracle,  10 : MySQL,  100 : MS-SQL,  1000 : MariaDB
	switch(availableDB){
		case 1 :
			gridDB.setCheckRowIndex(0, true);
			// "Oracle"
			break;
		case 2 :
			gridDB.setCheckRowIndex(1, true);
			// "MySQL"
			break;
		case 3 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(1, true);
			// "Oracle / MySQL"
			break;				
		case 4 :
			gridDB.setCheckRowIndex(2, true);
			// "MS-SQL"
			break;
		case 5 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(2, true);
			// "MS-SQL / Oracle"
			break;
		case 6 :
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(2, true);
			// "MySQL / MS-SQL"
			break;
		case 7 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(2, true);
			// "Oracle / MySQL / MS-SQL"
			break;
		case 8 :
			gridDB.setCheckRowIndex(3, true);
			// "MariaDB"
			break;
		case 9 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(3, true);
			// "Oracle / MariaDB"
			break;
		case 10 :
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(3, true);
			// "MySQL / MariaDB"
			break;
		case 11 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(3, true);
			// "Oracle / MySQL / MariaDB"
			break;
		case 12 :
			gridDB.setCheckRowIndex(2, true);
			gridDB.setCheckRowIndex(3, true);		
			// "MS-SQL / MariaDB"
			break;
		case 13 :
			gridDB.setCheckRowIndex(0, true);
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(3, true);
			// "Oracle / MS-SQL / MariaDB"
			break;
		case 14 :
			gridDB.setCheckRowIndex(1, true);
			gridDB.setCheckRowIndex(2, true);
			gridDB.setCheckRowIndex(3, true);
			// "MySQL / MS-SQL / MariaDB"
			break;
		case 15 :
			gridDB.checkAllRow();
			// "Oracle / MySQL / MS-SQL / MariaDB"
			break;																
	}
	
	
	var checkBoxOS = app.lookup("checkBox_os");
	var availableOS = app.lookup("product_sw").getValue("available_os");
	
	// 1 : Window,  10 : Linux,  100 : Unix,  1000 : Mac
	switch(availableOS){
		case 1 :
			checkBoxOS.selectItem(0);
			// "Window"
			break;
		case 2 :
			checkBoxOS.selectItem(1);
			// "Linux"
			break;
		case 3 :
			checkBoxOS.selectItems([0, 1]);
			// "Window / Linux"
			break;				
		case 4 :
			checkBoxOS.selectItem(2);
			// "Unix"
			break;
		case 5 :
			checkBoxOS.selectItems([0, 2]);
			// "Window / Unix"
			break;
		case 6 :
			checkBoxOS.selectItems([1, 2]);
			// "Linux / Unix"
			break;
		case 7 :
			checkBoxOS.selectItems([0, 1, 2]);
			// "Window / Linux / Unix"
			break;
		case 8 :
			checkBoxOS.selectItem(3);
			// "Mac"
			break;
		case 9 :
			checkBoxOS.selectItems([0, 3]);
			// "Window / Mac"
			break;
		case 10 :
			checkBoxOS.selectItems([1, 3]);
			// "Linux / Mac"
			break;
		case 11 :
			checkBoxOS.selectItems([0, 1, 3]);
			// "Window / Linux / Mac"
			break;
		case 12 :
			checkBoxOS.selectItems([2, 3]);
			// "Unix / Mac"
			break;
		case 13 :
			checkBoxOS.selectItems([0, 2, 3]);
			// "Window / Unix / Mac"
			break;
		case 14 :
			checkBoxOS.selectItems([1, 2, 3]);
			// "Linux / Unix / Mac"
			break;
		case 15 :
			checkBoxOS.selectAllItems();
			// "Window / Linux / Unix / Mac"
			break;																
	}
	
}


/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
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
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var gridDeveloper = app.lookup("grid_developer");
	gridDeveloper.showDeletedRow = false;
	
	gridDeveloper.deleteRow(gridDeveloper.getViewingEndRowIndex());
	// 제일 마지막 행 삭제
}


/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var product_image = app.lookup("productImage");
	if (product_image.file != null){
		app.lookup("modifySW").addFileParameter("SWimage", product_image.file);
		console.log("SW 이미지 파일명 :" + product_image.file);
		console.log("SW 파일 타입" + product_image.file.type);
	}
	
	// 선택한 DB 값의 행 인덱스 값들 가져오기
	var selectDBindices = app.lookup("grid_DB").getCheckRowIndices();
	console.log("selectDBindices : " + selectDBindices);
	
	var product_sw = app.lookup("product_sw");
	
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
	
	
	app.lookup("modifySW").send();
	console.log("modifySW 서브미션 실행"); 
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onModifySWSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var modifySW = e.control;
	
	var embeddedApp = app.getHost();
	
	cpr.core.App.load("swDetailView", function(loadedApp){
		if(loadedApp){
			
    		embeddedApp.app = loadedApp;	    		
  		}
	});
	
}
