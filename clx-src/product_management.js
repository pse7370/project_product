/************************************************
 * product_management.js
 * Created at 2022. 5. 13. 오후 3:32:31.
 *
 * @author A
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */

function onBodyInit(/* cpr.events.CEvent */ e){
	
	
}


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
	//console.log(sideTree.getItems());
	

	
}






