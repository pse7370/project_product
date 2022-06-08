/************************************************
 * modifyOutput.js
 * Created at 2022. 6. 6. 오후 2:48:59.
 *
 * @author PSE
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	console.log(app.getHost().initValue.product_output);
	console.log(app.getHost().initValue.output_id);
	console.log(app.getHost().initValue.attachmentList);
	
	
}
