/************************************************
 * modifyCustomizing.js
 * Created at 2022. 6. 6. 오전 2:50:20.
 *
 * @author PSE
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var product_id = app.getHost().initValue.product_id;
	var product_name = app.getHost().initValue.product_name;
	
	app.lookup("product_id").setValue("product_id", product_id);
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
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var grid_customizing = app.lookup("grid_customizing");
	grid_customizing.row
	var insertRow = grid_customizing.insertRowData(grid_customizing.getRowCount(), true);
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
	
	var product_customizingList = app.lookup("product_customizingList");
	var delete_customizing = app.lookup("delete_customizing");
	var grid_customizing = app.lookup("grid_customizing");
	grid_customizing.showDeletedRow = false;
	
	var girdEndRowIndex = grid_customizing.getViewingEndRowIndex();
	var product_customizingEndRowIndex = product_customizingList.getRowCount() - 1;
	
	var checkedRow = grid_customizing.getCheckRowIndices();
	// 체크한 열이 없을 경우
	if(checkedRow.length == 0 || checkedRow == null){
		// 새로 추가 한 열을 삭제할 경우
		if(girdEndRowIndex > product_customizingEndRowIndex) {
			grid_customizing.deleteRow(girdEndRowIndex);
			// 제일 마지막 행 삭제
		}else { // 기존 열을 삭제할 경우
			delete_customizing.addRowData(
				{
					"delete_customizing_id" : product_customizingList.getValue(girdEndRowIndex, "customizing_id")
				}
			)
			product_customizingList.deleteRow(girdEndRowIndex);
			grid_customizing.deleteRow(girdEndRowIndex);
		} // end else
			
	} // end if checkedRow
	else { // 체크한 열이 있을 경우
		var i
		for( i = 0; i < checkedRow.length; i++){
			delete_customizing.addRowData(
				{
					"delete_customizing_id" : product_customizingList.getValue(checkedRow[i], "customizing_id")
				}
			)
			grid_customizing.deleteRow(checkedRow[i]);
		} // end for
	}
	
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
	
	app.lookup("modifyCustomizing").send();
	console.log("modifyCustomizing 서브미션 실행");
	
	
}


/*
 * modifyCustomizing 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onModifyCustomizingSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var modifyCustomizing = e.control;
	
	cpr.core.App.load("customizing/customizingManagement", function(loadedApp){
			if(loadedApp){
	    		app.getHost().app = loadedApp;
	  		}
		});
	
}

