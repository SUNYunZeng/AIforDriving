webpackJsonp([1],{BO1k:function(e,t,a){e.exports={default:a("fxRn"),__esModule:!0}},JX1B:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("w6bL"),_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overflow: auto",staticStyle:{width:"auto"}},[a("Form",{ref:"formInline",attrs:{inline:""}},[a("FormItem",[e._v("\n      用户: "),a("Select",{staticStyle:{width:"70px"},attrs:{clearable:""},model:{value:e.table_name,callback:function(t){e.table_name=t},expression:"table_name"}},[a("Option",{attrs:{value:"user1"}},[e._v("User1")]),e._v(" "),a("Option",{attrs:{value:"user2",disabled:!this.$isOnServer}},[e._v("User2")]),e._v(" "),a("Option",{attrs:{value:"user3",disabled:!this.$isOnServer}},[e._v("User3")]),e._v(" "),a("Option",{attrs:{value:"user4",disabled:!this.$isOnServer}},[e._v("User4")])],1)],1),e._v(" "),a("FormItem",[a("b",[e._v("检索内容:")])]),e._v(" "),a("FormItem",[a("CheckboxGroup",{on:{"on-change":e.checkAllGroupChange},model:{value:e.checkAllGroup,callback:function(t){e.checkAllGroup=t},expression:"checkAllGroup"}},[a("Checkbox",{attrs:{label:"出发时间"}}),e._v(" "),a("Checkbox",{attrs:{label:"出发地点"}}),e._v(" "),a("Checkbox",{attrs:{label:"抵达地点"}}),e._v(" "),a("Checkbox",{attrs:{label:"平均行驶速度"}}),e._v(" "),a("Checkbox",{attrs:{label:"轨迹总点数"}}),e._v(" "),a("Checkbox",{attrs:{label:"行驶总距离"}}),e._v(" "),a("Checkbox",{attrs:{indeterminate:e.indeterminate,value:e.checkAll},nativeOn:{click:function(t){return t.preventDefault(),e.handleCheckAll(t)}}},[e._v("全选\n        ")])],1)],1),e._v(" "),a("FormItem",[a("b",[e._v("ID范围:")])]),e._v(" "),a("FormItem",[a("InputNumber",{staticStyle:{width:"55px"},attrs:{max:e.max_set,min:1},on:{"on-change":e.changv1},model:{value:e.min_v,callback:function(t){e.min_v=t},expression:"min_v"}}),e._v("\n      ~\n      "),a("InputNumber",{staticStyle:{width:"55px"},attrs:{max:e.max_set,min:1},on:{"on-change":e.changv2},model:{value:e.max_v,callback:function(t){e.max_v=t},expression:"max_v"}})],1),e._v(" "),a("FormItem",[a("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:e.search}},[e._v("Search")])],1)],1),e._v(" "),a("Table",{ref:"selection",attrs:{border:"",stripe:"",columns:e.columns1,data:e.nowData}}),e._v(" "),a("br"),e._v(" "),a("Page",{attrs:{total:e.dataCount,"page-size":e.pageSize,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":e.changepage,"on-page-size-change":e._nowPageSize}})],1)},staticRenderFns:[]},i=a("VU/8")(r.a,_,!1,null,null,null);t.default=i.exports},fxRn:function(e,t,a){a("+tPU"),a("zQR9"),e.exports=a("g8Ux")},g8Ux:function(e,t,a){var r=a("77Pl"),_=a("3fs2");e.exports=a("FeBl").getIterator=function(e){var t=_(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},vlla:function(e,t,a){"use strict";t.b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return _.a.post(i.a.state.bUrl+e,t,{headers:{"Content-Type":"application/json"}})},t.a=function(e){return _.a.get(e)};var r=a("mtWM"),_=a.n(r),i=a("IcnI")},w6bL:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__=__webpack_require__("Gu7T"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__=__webpack_require__("BO1k"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__),__WEBPACK_IMPORTED_MODULE_2__utils_myAjax__=__webpack_require__("vlla");__webpack_exports__.a={name:"t1",data:function(){return{id:[],user:[],table_data:[],table_name:"user1",pageSize:10,dataCount:0,pageCurrent:1,min_v:1,max_v:20,max_set:this.$isOnServer?2e3:200,indeterminate:!0,checkAll:!1,checkAllGroup:["出发时间","出发地点","抵达地点","平均行驶速度","轨迹总点数","行驶总距离"],placeDict:{0:"餐饮",1:"医疗",2:"小区",3:"酒店",4:"生活服务",5:"景点",6:"教育",7:"公司"},checktochar:{"出发时间":"dep_time","出发地点":"dep_origin","抵达地点":"dest","平均行驶速度":"vel","轨迹总点数":"num","行驶总距离":"dis"},columns:{"出发时间":{title:"Departure Time",key:"dep_time",sortable:!0,width:200},"出发地点":{title:"Origin",key:"dep_origin",sortable:!0,width:180},"抵达地点":{title:"Destination",key:"dest",sortable:!0,width:180},"平均行驶速度":{title:"Mean Velocity(km/h)",key:"vel",sortable:!0,width:200},"轨迹总点数":{title:"Point's Number",key:"num",sortable:!0,width:200},"行驶总距离":{title:"Travel Distance(/km)",key:"dis",sortable:!0,width:200}},columns1:[],pageData:[],nowData:[]}},methods:{search:function(){var e=this;if(0===this.checkAllGroup.length||void 0===this.table_name)return this.$Message.info("查询参数错误！"),null;this.id=[];for(var t=this.min_v;t<=this.max_v;t++)this.table_data=[1,2,3,4,5,6,4,7,8,9,10,11,12],this.id.push(t);this.$isOnServer?Object(__WEBPACK_IMPORTED_MODULE_2__utils_myAjax__.b)("searchByCol",{id:this.id,tableName:this.table_name}).then(function(t){t.length>0&&e.tableFactory(t)}):Object(__WEBPACK_IMPORTED_MODULE_2__utils_myAjax__.a)("../static/data/user_1.json").then(function(t){e.user=[];var a=!0,r=!1,_=void 0;try{for(var i,n=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(e.id);!(a=(i=n.next()).done);a=!0){var s=i.value;e.user.push(t.RECORDS[s])}}catch(e){r=!0,_=e}finally{try{!a&&n.return&&n.return()}finally{if(r)throw _}}e.user.length>0&&e.tableFactory(e.user)})},tableFactory:function(e){this.pageData=[],this.columns1=[{title:"ID",key:"id",sortable:!0,width:65}];var t=!0,a=!1,r=void 0;try{for(var _,i=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(this.checkAllGroup);!(t=(_=i.next()).done);t=!0){var n=_.value;this.columns1.push(this.columns[n])}}catch(e){a=!0,r=e}finally{try{!t&&i.return&&i.return()}finally{if(a)throw r}}var s=this.min_v,l=!0,o=!1,c=void 0;try{for(var h,u=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(e);!(l=(h=u.next()).done);l=!0){var m=h.value;this.pageData.push(this.generateRowContent(s,m)),s++}}catch(e){o=!0,c=e}finally{try{!l&&u.return&&u.return()}finally{if(o)throw c}}this.dataCount=this.pageData.length,this.nowData=[];for(var v=0;v<this.pageSize;v++)this.nowData.push(this.pageData[v])},generateRowContent:function(e,t){var a={id:e},r=!0,_=!1,i=void 0;try{for(var n,s=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(this.checkAllGroup);!(r=(n=s.next()).done);r=!0){var l=n.value;this.calContent(a,l,t)}}catch(e){_=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(_)throw i}}return a},calContent:function calContent(res,key,item){switch(key){case"出发时间":res[this.checktochar[key]]=item.time;break;case"出发地点":var semO=eval(item.sem_O);res[this.checktochar[key]]=this.placeDict[semO.indexOf(Math.max.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(semO)))];break;case"抵达地点":var semD=eval(item.sem_D);res[this.checktochar[key]]=this.placeDict[semD.indexOf(Math.max.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(semD)))];break;case"平均行驶速度":var spd=eval(item.spd);res[this.checktochar[key]]=(spd.reduce(function(e,t,a,r){return e+t})/spd.length*3.6).toFixed(6);break;case"轨迹总点数":res[this.checktochar[key]]=eval(item.lngs).length;break;case"行驶总距离":res[this.checktochar[key]]=item.dis_total}},changepage:function(e){var t=(e-1)*this.pageSize,a=e*this.pageSize;this.nowData=this.pageData.slice(t,a),this.pageCurrent=e},_nowPageSize:function(e){this.pageSize=e},changv1:function(){(this.min_v>=this.max_v||this.min_v<=0||this.min_v>this.max_set)&&(this.$Message.error("数值需要在1~"+this.max_set+"之间"),this.min_v=1)},changv2:function(){(this.min_v>=this.max_v||this.max_v<=0||this.max_v>this.max_set)&&(this.$Message.error("数值需要在1~"+this.max_set+"之间"),this.max_v=this.max_set-1)},handleCheckAll:function(){this.indeterminate?this.checkAll=!1:this.checkAll=!this.checkAll,this.indeterminate=!1,this.checkAll?this.checkAllGroup=["出发时间","出发地点","抵达地点","平均行驶速度","轨迹总点数","行驶总距离"]:this.checkAllGroup=[]},checkAllGroupChange:function(e){6===e.length?(this.indeterminate=!1,this.checkAll=!0):e.length>0?(this.indeterminate=!0,this.checkAll=!1):(this.indeterminate=!1,this.checkAll=!1)}}}}});
//# sourceMappingURL=1.8a3e48689abde1198f56.js.map