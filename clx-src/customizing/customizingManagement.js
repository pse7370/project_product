/************************************************
 * customizingMangement.js
 * Created at 2022. 6. 3. 오전 12:03:57.
 *
 * @author PSE
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var product_id = app.getRootAppInstance().getAppProperty("product_id"); // 부모화면 데이터 셋
	console.log("product_id : " + product_id);
	
	var dataProduct_id = app.lookup("product_id");
	dataProduct_id.setValue("product_id", Number(product_id));
	console.log(dataProduct_id.getValue("product_id"));
	
	app.lookup("getCustomizingList").send();
	console.log("getCustomizingList 서브미션 실행");
	
}

/*
 * getCustomizingList 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetCustomizingListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getCustomizingList = e.control;
	
	app.lookup("productName").redraw();
	
	app.lookup("grid_customizing").redraw();
	
}



/*
 * "추가/수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var embeddedApp = app.getHost();
	
	cpr.core.App.load("customizing/modifyCustomizing", function(loadedApp){
		if(loadedApp){
			embeddedApp.initValue = {
				"product_id" : app.lookup("product_id").getValue("product_id")
			}
    		embeddedApp.app = loadedApp;	    		
  		}
	});
	
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
	
	var customizingList = app.lookup("grid_customizing");
	customizingList.showDeletedRow = false;
	var checkedRow = customizingList.getCheckRowIndices();
	
	console.log("checkedRow : " + checkedRow);
	
	var data_customizingList = app.lookup("product_customizingList");
	
	var i
	var actionURL = "/productMangement/deleteCustomizing";
	for(i = 0; i < checkedRow.length; i++){
		
		//actionURL += "?" + app.lookup("product_customizingList").getValue(checkedRow[i], "customizing_id");		
		var customizing_id = app.lookup("product_customizingList").getValue(checkedRow[i], "customizing_id");
		console.log(customizing_id);
		app.lookup("customizing_id").addRowData({"customizing_id" : app.lookup("product_customizingList").getValue(checkedRow[i], "customizing_id")});
		console.log("customizing_id : " + app.lookup("customizing_id").getValue(i, "customizing_id"));
		
		data_customizingList.deleteRow(checkedRow[i]);
	}
	
	/*
	console.log(actionURL);
	app.lookup("deleteCustomizing").action = actionURL;
	*/
	
	app.lookup("deleteCustomizing").send();
	console.log("deleteCustomizing 서브미션 실행");
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDeleteCustomizingSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var deleteCustomizing = e.control;
	
	app.lookup("getCustomizingList").send();
	
}
