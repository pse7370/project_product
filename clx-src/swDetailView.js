/************************************************
 * swDetailView.js
 * Created at 2022. 5. 29. 오후 11:55:56.
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
	
	app.lookup("getSWcontent").send();
	console.log("getSWcontent 서브미션 실행");
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetSWcontentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getSWcontent = e.control;
	
	var product = app.lookup("product");
	

	app.lookup("productImage").src = "/static/SWimage/" + product.getValue("save_image_name");
	app.lookup("productName").redraw();
	app.lookup("productVersion").redraw();
	app.lookup("simultaneous").redraw();
	app.lookup("explanation").redraw();
	app.lookup("grid_developer").redraw();
	
	
	var dbDecimalNum = app.lookup("product_sw").getValue("available_db");
	var osDecimalNum = app.lookup("product_sw").getValue("available_os");
	
	/*
	var dbBinaryNum = dbDecimalNum.toString(2);
	var osBinaryNum = osDecimalNum.toString(2);
	*/
	
	var availableDB = app.lookup("availableDB");
	
	var db = ""
	
	// 1 : Oracle,  10 : MySQL,  100 : MS-SQL,  1000 : MariaDB
	switch(dbDecimalNum){
		case 1 :
			db = "Oracle"
			break;
		case 2 :
			db = "MySQL"
			break;
		case 3 :
			db = "Oracle / MySQL"
			break;				
		case 4 :
			db = "MS-SQL"
			break;
		case 5 :
			db = "Oracle / MS-SQL"
			break;
		case 6 :
			db = "MySQL / MS-SQL"
			break;
		case 7 :
			db = "Oracle / MySQL / MS-SQL"
			break;
		case 8 :
			db = "MariaDB"
			break;
		case 9 :
			db = "Oracle / MariaDB"
			break;
		case 10 :
			db = "MySQL / MariaDB"
			break;
		case 11 :
			db = "Oracle / MySQL / MariaDB"
			break;
		case 12 :
			db = "MS-SQL / MariaDB"
			break;
		case 13 :
			db = "Oracle / MS-SQL / MariaDB"
			break;
		case 14 :
			db = "MySQL / MS-SQL / MariaDB"
			break;
		case 15 :
			db = "Oracle / MySQL / MS-SQL / MariaDB"
			break;																
	}
	
	availableDB.value = db;
	
	
	var availableOS = app.lookup("availableOS");
	
	var os = ""
	
	// 1 : Window,  10 : Linux,  100 : Unix,  1000 : Mac
	switch(osDecimalNum){
		case 1 :
			os = "Window"
			break;
		case 2 :
			os = "Linux"
			break;
		case 3 :
			os = "Window / Linux"
			break;				
		case 4 :
			os = "Unix"
			break;
		case 5 :
			os = "Window / Unix"
			break;
		case 6 :
			os = "Linux / Unix"
			break;
		case 7 :
			os = "Window / Linux / Unix"
			break;
		case 8 :
			os = "Mac"
			break;
		case 9 :
			os = "Window / Mac"
			break;
		case 10 :
			os = "Linux / Mac"
			break;
		case 11 :
			os = "Window / Linux / Mac"
			break;
		case 12 :
			os = "Unix / Mac"
			break;
		case 13 :
			os = "Window / Unix / Mac"
			break;
		case 14 :
			os = "Linux / Unix / Mac"
			break;
		case 15 :
			os = "Window / Linux / Unix / Mac"
			break;																
	}
	
	availableOS.value = os;
	
	
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var product_id = app.lookup("product_id").getValue("product_id");
	
	var confirmText = "제품 삭제시 등록한 커스터마이징 이력과 산출물들이 같이 삭제 됩니다.\n삭제하시겠습니까?";
	if(confirm(confirmText)){
		app.lookup("deleteSW").action = "/productMangement/deleteSW?" + product_id;
		app.lookup("deleteSW").send();
		console.log("deleteSW 서브미션 실행");
	}
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDeleteSWSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var deleteSW = e.control;
	
	alert("제품을 삭제했습니다.");
	//window.location.reload();
	app.getRootAppInstance().lookup("getSideMenu").send();
	app.close();
	
	
	var resultCode = app.lookup("result").getValue("resultCode");
	console.log(resultCode);
	
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
	
	var embeddedApp = app.getHost();
	
	cpr.core.App.load("modifySW", function(loadedApp){
		if(loadedApp){
			embeddedApp.initValue = {
				"product_id" : app.lookup("product_id").getValue("product_id")
			}
    		embeddedApp.app = loadedApp;	    		
  		}
	});
	
}
