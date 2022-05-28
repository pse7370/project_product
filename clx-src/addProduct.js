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
	app.lookup("radio_productType").value = "출입통제기"
	var embeddedApp = app.lookup("detailLayout");
	cpr.core.App.load("addDevice", function(loadedApp){
		if(loadedApp){
    	embeddedApp.app = loadedApp;
  		}
	});
	
}

/*
 * 제품 종류 라디오 버튼에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onRadio_productTypeItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var radio_productType = e.control;
	
	var product_type = app.lookup("radio_productType").value;
	console.log("제품 종류 : " + product_type);
	var embeddedApp = app.lookup("detailLayout");
	
	switch(product_type){
		case "출입통제기" :
			cpr.core.App.load("addDevice", function(loadedApp){
				if(loadedApp){
		    	embeddedApp.app = loadedApp;
		  		}
			});
			break;
		
		case "SW" :						
			cpr.core.App.load("addSW", function(loadedApp){
				if(loadedApp){
		    	embeddedApp.app = loadedApp;
		  		}
			});
			break;
	}
	
}
