/************************************************
 * addSW.js
 * Created at 2022. 5. 29. 오전 1:35:06.
 *
 * @author PSE
 ************************************************/

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
	
	var addSW = app.lookup("addSW");
	// 업로드한 파일 정보 서브미션에 저장
	if (product_image.file != null){
		addSW.addFileParameter("SWImage", product_image.file);
		console.log("출입통제기 이미지 파일명 :" + product_image.file);
		console.log("출입통제기 파일 타입" + product_image.file.type);
	}
	
	var product = app.lookup("product");
	
	product.setValue("product_type", "SW");
	
	var product_sw = app.lookup("product_sw");
	
	var selectDBVaules = app.lookup("checkBox_os").values;
	console.log("selectDBVaules : " + selectDBVaules);
	
	var i;
	for(i = 0; i < selectDBVaules.length; i++){
		
	}
	
	
	
}
