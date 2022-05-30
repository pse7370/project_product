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
	
	app.lookup("productName").value = product.getValue("product_name");
	
	app.lookup("productVersion").value = product.getValue("product_version");
	
	app.lookup("productSize").value = product_device.getValue("width") + '(W) x ' 
									+ product_device.getValue("height") + '(H) x '
									+ product_device.getValue("depth") + '(D)';
	
	app.lookup("server").value = product_device.getValue("server");
	app.lookup("wi_fi").value = product_device.getValue("wi_fi");
	app.lookup("other").value = product_device.getValue("other");								
									
	app.lookup("ipRatings").value = product_device.getValue("ip_ratings");	
	
	app.lookup("explanation").value = product.getValue("explanation");							
								
	app.lookup("authentication").redraw();
	app.lookup("grid_developer").redraw();
	
	
}

