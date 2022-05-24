/************************************************
 * addProduct.js
 * Created at 2022. 5. 23. 오후 10:41:02.
 *
 * @author PSE
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 제품명 inputBox에 커서 위치
	app.lookup("input_productName").focus();
	
	// 통신 방식 그리드 1행 추가
	app.lookup("communication").insertRow(1, true);
	
}


/*
 * 담당 개발자 "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
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
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var product_image = app.lookup("product_image");
	console.log("출입통제기 이미지 파일명 :" + product_image.file);
	console.log("출입통제기 파일 타입" + product_image.file.type);
	
	var addDevice = app.lookup("addDevice");
	addDevice.addFileParameter("deviceImage", product_image.file);
	
	addDevice.send();
	
}
