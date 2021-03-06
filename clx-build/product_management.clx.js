/*
 * App URI: product_management
 * Source Location: product_management.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("product_management", {
		onPrepare: function(loader){
			loader.addCSS("theme/css/addProduct_style.css");
			loader.addCSS("theme/css/main.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
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
				
				if(clickLable == "커스터마이징") {
					app.dialogManager.openDialog("customizing/customizingManagement", "customizingManagement", {width : 850, height : 700}, function(dialog){
					dialog.ready(function(dialogApp){
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
						dialog.headerTitle = "커스터마이징 관리";
						console.log(dialog.app.id);
					
					});
					}).then(function(returnValue){
							if (returnValue == 1){
								//window.location.reload();
								
							}
						});
				}
				
				if(clickLable == "산출물"){
					app.setAppProperty("product_name", clickParent);
					cpr.core.App.load("output/outputManagement", function(loadedApp){
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
					
					if (appInstance.app.id == "output/outputManagement"){
						appInstance.close();
						appInstance.run();	
					}
				
				});
				
				
				
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("sideMenuList");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "label",
						"dataType": "string"
					},
					{
						"name": "value",
						"dataType": "string"
					},
					{"name": "parent"},
					{
						"name": "product_id",
						"dataType": "number"
					}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("getSideMenu");
			submission_1.async = true;
			submission_1.method = "get";
			submission_1.action = "/productMangement/sideMenu";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onGetSideMenuSubmitDone == "function") {
				submission_1.addEventListener("submit-done", onGetSideMenuSubmitDone);
			}
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"font-size" : "11pt",
				"background-repeat" : "no-repeat",
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px",
				"font-family" : "IBMPlexSansKR-Regular"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var tree_1 = new cpr.controls.Tree("sideTree");
				tree_1.indent = 20;
				tree_1.style.css({
					"border-radius" : "15px"
				});
				(function(tree_1){
					tree_1.setItemSet(app.lookup("sideMenuList"), {
						"label": "label",
						"value": "value",
						"parentValue": "parent"
					});
				})(tree_1);
				if(typeof onTre1SelectionChange == "function") {
					tree_1.addEventListener("selection-change", onTre1SelectionChange);
				}
				if(typeof onSideTreeSelectionChange == "function") {
					tree_1.addEventListener("selection-change", onSideTreeSelectionChange);
				}
				if(typeof onSideTreeItemClick == "function") {
					tree_1.addEventListener("item-click", onSideTreeItemClick);
				}
				container.addChild(tree_1, {
					"top": "7px",
					"left": "1px",
					"width": "213px",
					"height": "714px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "18px",
				"left": "19px",
				"width": "216px",
				"height": "727px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "#8d8d8d",
				"border-right-width" : "1px",
				"border-left-color" : "#8d8d8d",
				"border-right-color" : "#8d8d8d",
				"border-left-width" : "1px",
				"border-top-style" : "solid",
				"border-radius" : "15px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-top-color" : "#8d8d8d",
				"font-family" : "'\\B9D1\\C740  \\ACE0\\B515' , 'Malgun Gothic' , sans-serif",
				"border-bottom-style" : "solid"
			});
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			group_2.setLayout(verticalLayout_1);
			(function(container){
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("content_view");
				embeddedApp_1.style.css({
					"border-radius" : "10px",
					"padding-bottom" : "0px"
				});
				container.addChild(embeddedApp_1, {
					"width": "753px",
					"height": "596px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "140px",
				"left": "245px",
				"width": "760px",
				"height": "598px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "제품 등록";
			button_1.style.css({
				"border-right-style" : "none",
				"background-color" : "#DAF2DA",
				"border-radius" : "10px",
				"color" : "black",
				"border-left-style" : "none",
				"font-size" : "11pt",
				"border-bottom-style" : "none",
				"background-image" : "none",
				"border-top-style" : "none"
			});
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "97px",
				"left": "893px",
				"width": "95px",
				"height": "30px"
			});
			
			var output_1 = new cpr.controls.Output();
			output_1.value = "제품관리";
			output_1.style.css({
				"font-size" : "30pt"
			});
			container.addChild(output_1, {
				"top": "30px",
				"left": "546px",
				"width": "176px",
				"height": "58px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyScreenChange == "function"){
				app.addEventListener("screen-change", onBodyScreenChange);
			}
			if(typeof onBodyPropertyChange == "function"){
				app.addEventListener("property-change", onBodyPropertyChange);
			}
		}
	});
	app.title = "product_management";
	cpr.core.Platform.INSTANCE.register(app);
})();
