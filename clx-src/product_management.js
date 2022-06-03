/************************************************
 * product_management.js
 * Created at 2022. 5. 13. 오후 3:32:31.
 *
 * @author A
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 트리 메뉴 구성을 위한 정보 가져오기
	app.lookup("getSideMenu").send();
	console.log("getSideMenu 서브 미션 실행");
}


/*
 * 서브미션(getSideMenu)에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetSideMenuSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_getSideMenu = e.control;
	var sideTree = app.lookup("sideTree");
	
	
	var sideMenuList = app.lookup("sideMenuList");
	console.log("데이터 셋 : " + sideMenuList.getRowCount());
	console.log(sideMenuList);
	/*
	for(var i = 0; i < sideMenuList.getRowCount(); i++){
		sideTree.addItem(new cpr.controls.TreeItem(sideMenuList.getValue(i, "label"), sideMenuList.getValue(i, "value"), sideMenuList.getValue(i, "parent")));
	}
	
	sideTree.setItemSet(sideMenuList, {label:"label", value:"value", icon:null, parentValue:"parent"});	
	*/	
	sideTree.redraw();
	
	console.log("getSideMenu 서브 미션 완료");
	console.log(sideTree.getItems());
	
}

/*
 * "제품 등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dialogManager.openDialog("addProduct", "addProduct", {width : 760, height : 700}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.headerTitle = "제품 등록";
			console.log(dialog.app.id);
			/*
			dialog.style.css("border","solid 1px #555555");
			dialog.style.css("border-radius","10px");
			dialog.style.body.css("background-color", "white");
			dialog.style.header.css("background-color", "#008000");
			dialog.style.header.css("color", "white");
			dialog.style.header.css("font-size", "12pt");			
			*/
			dialog.addEventListener("close", function(e){
				// 이곳에서 원하는 동작 처리
				//window.location.reload();
			});
		});
	}).then(function(returnValue){
			if (returnValue == 1){
				//window.location.reload();
				app.lookup("getSideMenu").send();
				console.log("getSideMenu 서브 미션 실행");
			}
		});
	

	
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onSideTreeItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var sideTree = e.control;
	var clickValue = sideTree.value;
	var clickLable = sideTree.text;
	var clickRow = sideTree.getIndexByValue(clickValue);

	console.log("클릭한 값 : " + clickValue);
	console.log("클릭한 라벨 : " + clickLable);
	console.log("클락한 rowIndex : " + clickRow);

	
	var sideMenu = app.lookup("sideTree");
	var sideMenuDataSet = sideTree.dataSet;
	var clickParent = sideMenuDataSet.getValue(clickRow, "parent");
	var clickProduct_id = sideMenuDataSet.getValue(clickRow, "product_id");
	console.log("parent 컬럼 값 : " + clickParent);
	console.log("clickProduct_id : " + clickProduct_id);
	
	app.setAppProperty("product_id", clickProduct_id);
	//app.setAppProperty("product_type", clickParent);
	
	var embeddedApp = app.lookup("content_view");
	
	//embeddedApp.setAppProperty("product_id", clickProduct_id);
	
	
	if(clickParent == "출입통제기"){		
		cpr.core.App.load("deviceDetailView", function(loadedApp){
			if(loadedApp){
				
	    		embeddedApp.app = loadedApp;	    		
	  		}
		});
	}
	
	if(clickParent == "SW"){
		cpr.core.App.load("swDetailView", function(loadedApp){
			if(loadedApp){
	    		embeddedApp.app = loadedApp;
	  		}
		});
	}
	
	

}	


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	//var product_type = app.getAppProperty("product_type");
	var product_id = app.getAppProperty("product_id");
	
	//console.log("앱 인스턴스 product type / " + product_type);
	console.log("앱 인스턴스  product id / " + product_id);
	
	// 현재 실행되고 있는 모든 앱 가져오기
	var vaRunningAppInstances =  cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
	
	vaRunningAppInstances.forEach(function(appInstance){

		if (appInstance.app.id == "deviceDetailView"){
			appInstance.close();
			appInstance.run();	
		}
		
		if (appInstance.app.id == "swDetailView"){
			appInstance.close();
			appInstance.run();	
		}
	
	});
	
	
	
}
