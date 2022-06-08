/************************************************
 * outputManagement.js
 * Created at 2022. 6. 6. 오전 11:24:55.
 *
 * @author PSE
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//app.lookup("searchIcon").src = "./image/search.png";
	app.lookup("searchCondition").selectItem(0, true);
	
	
	var product_id = app.getRootAppInstance().getAppProperty("product_id"); // 부모화면 데이터 셋
	console.log("product_id : " + product_id);
	
	var dataProduct_id = app.lookup("product_id");
	dataProduct_id.setValue("product_id", Number(product_id));
	console.log(dataProduct_id.getValue("product_id"));
	
	app.lookup("pageNum").setValue("pageNum", 1);
	
	app.lookup("getOutputList").send();
	console.log("getOutputList 서브미션 실행");
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetOutputListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getOutputList = e.control;
	var totalRowCount = app.lookup("totalOutputCount").getValue("totalOutputCount");
	console.log("totalRowCount : " + totalRowCount);
	app.lookup("pageIndexer").init(totalRowCount);
	app.lookup("pageIndexer").pageRowCount = 15;
	app.lookup("pageIndexer").viewPageCount = 5;
	

	app.lookup("pageIndexer").redraw();
	app.lookup("grid_output").redraw();
	
}


/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrid_outputCellClick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grid_output = e.control;
	
	if(e.cellIndex != 0){ // 체크박스 클릭시 창이 열리는 것을 방지하기 위한 처리
		
		var clickRowIndex = e.rowIndex
		console.log("clickRowIndex : " + clickRowIndex);
		var output_id = app.lookup("product_outputList").getValue(clickRowIndex, "output_id");
		console.log(output_id);
		
		app.getRootAppInstance().dialogManager.openDialog("output/outputContentView", "outputContentView", {width : 760, height : 700}, function(dialog){
			dialog.ready(function(dialogApp){
				// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
				dialog.headerTitle = "산출물 조회";
				console.log(dialog.app.id);
				dialogApp.initValue = {
					"output_id" : output_id
				};

			});
		}).then(function(returnValue){
				if (returnValue == 1){
					app.lookup("getOutputList").send();
					console.log("getOutputList 서브미션 실행");					
				}
			});
			
	} // end if
}

function sendGetOutputListSubmit(){
	app.lookup("getOutputList").send();
}


/*
 * "산출물 등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getRootAppInstance().dialogManager.openDialog("output/wirteOutput", "wirteOutput", {width : 760, height : 700}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.headerTitle = "산출물 등록";
			console.log(dialog.app.id);
		});
	}).then(function(returnValue){
			if (returnValue == 1){
				//window.location.reload();
				app.getHost().callAppMethod(sendGetOutputListSubmit());
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
	
	var checkIndeices = app.lookup("grid_output").getCheckRowIndices();
	var i
	var baseURL = "/productMangement/deleteOutput";
	for(i = 0; i < checkIndeices.length; i++) {
		var deleteOutputId = "?" + app.lookup("product_outputList").getValue(i, "output_id");
		baseURL += deleteOutputId;
	}
	
	app.lookup("deleteOutput").action = baseURL
	console.log(baseURL);

	app.lookup("deleteOutput").send();
	console.log("deleteOutput 서브미션 실행");
	
}


/*
 * deleteOutput 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDeleteOutputSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var deleteOutput = e.control;
	
	app.lookup("getOutputList").send();
	console.log("getOutputList 서브미션 실행");
	
}


/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexerSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndexer = e.control;

	console.log("currentPageIndex : " + pageIndexer.currentPageIndex);
	
	app.lookup("pageNum").setValue("pageNum", pageIndexer.currentPageIndex);
	
	app.lookup("getOutputList").send();
	console.log("getOutputList 서브미션 실행");
}


/*
 * 검색 조건 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onSearchConditionSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var searchCondition = e.control;
	
	var selectSearchCondition = searchCondition.value;
	console.log("selectSearchCondition : " + selectSearchCondition);
	
	app.lookup("search").setValue("searchCondition", selectSearchCondition);
	
}

/*
 * 돋보기 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onSearchIconClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var searchIcon = e.control;
	
	var searchWord = app.lookup("input_searchWord").value
	
	app.lookup("search").setValue("searchText", searchWord);
	app.lookup("getSearchOutputList").send();
	console.log("getSearchOutputList 서브미션 실행");
	
}


/*
 * getSearchOutputList 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetSearchOutputListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getSearchOutputList = e.control;
	
	var totalRowCount = app.lookup("totalOutputCount").getValue("totalOutputCount");
	console.log("totalRowCount : " + totalRowCount);
	app.lookup("pageIndexer").init(totalRowCount);
	app.lookup("pageIndexer").pageRowCount = 15;
	app.lookup("pageIndexer").viewPageCount = 5;
	

	app.lookup("pageIndexer").redraw();
	app.lookup("grid_output").redraw();
	
}


