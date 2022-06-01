/************************************************
 * modifyDevice.js
 * Created at 2022. 5. 31. 오후 7:12:37.
 *
 * @author A
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
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
