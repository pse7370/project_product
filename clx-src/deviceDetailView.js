/************************************************
 * deviceDetailView.js
 * Created at 2022. 5. 29. 오전 3:27:55.
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
	
	app.lookup("getDeviceContent").send();
	console.log("getDeviceContent 서브미션 실행");

}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onGetDeviceContentSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var getDeviceContent = e.control;
	
	var product = app.lookup("product");
	var product_device = app.lookup("product_device");
	
	app.lookup("productImage").src = product.getValue("save_path");
	
	app.lookup("productName").redraw();
	app.lookup("productVersion").redraw();
	app.lookup("server").redraw();
	app.lookup("wi_fi").redraw();
	app.lookup("other").redraw();
	app.lookup("ipRatings").redraw();
	app.lookup("explanation").redraw();
	
	app.lookup("productSize").value = product_device.getValue("width") + '(W) x ' 
									+ product_device.getValue("height") + '(H) x '
									+ product_device.getValue("depth") + '(D)';			
								
	app.lookup("authentication").redraw();
	app.lookup("grid_developer").redraw();
	
	
}

/*
 * "삭제" 버튼(deleteButton)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDeleteButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var deleteButton = e.control;
	
	var confirmText = "제품 삭제시 등록한 커스터마이징 이력과 산출물들이 같이 삭제 됩니다.\n삭제하시겠습니까?";
	if(confirm(confirmText)){
		app.lookup("deleteDevice").send();
		console.log("deleteDevice 서브미션 실행");
	}	
	
	/*
	app.openDialog("udc/alter", {
			width: 310,
			height: 170,
			headerVisible: false
		}, function(dialog) {dialog.ready(function(dialogApp) {
					// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
					dialogApp.setAppProperty("text", "제품 삭제시 등록한 커스터마이징 이력과 산출물들이 같이 삭제 됩니다.\n삭제하시겠습니까?");
					dialogApp.addEventListener("onNoClick", function(e) {
						dialog.close(0);
					}); 
					dialogApp.addEventListener("onYesClick", function(e) {
						dialog.close(1);
					});
			});
	}).then(function(returnValue) {
			if(returnValue == 1){
				app.lookup("deleteDevice").send();
				console.log("deleteDevice 서브미션 실행");
			}
		});
	
	*/
		
}

/*
 * deleteDevice 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onDeleteDeviceSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var deleteDevice = e.control;
	
	alert("제품을 삭제했습니다.");
	window.location.reload();
	
	var resultCode = app.lookup("result").getValue("resultCode");
	console.log(resultCode);
	/*
	if(resultCode == '1'){
		alert("제품을 삭제했습니다.");
		window.location.reload(true);
	}
	*/
	
}


/*
 * "수정" 버튼(modifyButton)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onModifyButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var modifyButton = e.control;
	
	app.dialogManager.openDialog("", "", {width : 760, height : 700}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.headerTitle = "제품 수정";
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
				window.location.reload();
			});
		});
	}).then(function(returnValue){
			if (returnValue == 1){
				//window.location.reload();
				//app.lookup("").send();
				//console.log(" 서브 미션 실행");
			}
		});
	
}


