webpackJsonp([2],{RboU:function(e,t){},TxY1:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__=__webpack_require__("Gu7T"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__),__WEBPACK_IMPORTED_MODULE_1__components_commom_EChartsMap__=__webpack_require__("loSv"),__WEBPACK_IMPORTED_MODULE_2__store__=__webpack_require__("IcnI"),__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__=__webpack_require__("vlla"),__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__=__webpack_require__("KwgN");__webpack_exports__.a={name:"prediction",data:function(){return{max_id:this.$store.state.traj_max_num,formInline:{},cut_size:10,slider_max:10,id:30,move_value:1,is_dynamic:!1,preable:!1,dy:null,user:{name:"user1",recordMap:null,trajectory:null,real_dest:[],pre_dests:{},center:[],boundingCoords:[]},bmap:{center:this.$store.state.mapconfig.center,boundingCoords:[],zoom:15,roam:!0,mapStyle:__WEBPACK_IMPORTED_MODULE_2__store__.a.state.mapStyle},option:{bmap:this.bmap,tooltip:{trigger:"item"},series:[]},myChart:null,lines:{coords:[],lineStyle:{normal:{color:"orange"}}},lines_option:{type:"lines",coordinateSystem:"bmap",polyline:!0,data:[],silent:!0,lineStyle:{normal:{opacity:.75,width:3}},progressiveThreshold:500,progressive:200},lines_state:{type:"lines",coordinateSystem:"bmap",polyline:!0,data:[],lineStyle:{normal:{width:0}},effect:{constantSpeed:40,show:!0,trailLength:.3,symbolSize:3.5},zlevel:1},real_dest_option:{type:"effectScatter",coordinateSystem:"bmap",data:[{name:"目的地",value:[]}],symbolSize:20,showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,tooltip:{trigger:"item",formatter:"{b}"},itemStyle:{normal:{color:"#12e78c",shadowBlur:10,shadowColor:"#333"}},zlevel:2},pre_dest_option:{type:"effectScatter",coordinateSystem:"bmap",data:[{name:"预测点",value:[]}],symbolSize:15,showEffectOn:"render",rippleEffect:{brushType:"fill"},tooltip:{trigger:"item",formatter:"{b}"},itemStyle:{normal:{color:"#ff461f",shadowBlur:7,shadowColor:"#333"}},zlevel:3}}},mounted:function(){},methods:{change:function(){this.is_dynamic||null==this.dy||(clearInterval(this.dy),this.preable=!1)},getAjax:function(){return this.$isOnServer?Object(__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__.b)("searchByCol",{id:this.id,tableName:this.user.name}):Object(__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__.a)("../static/data/"+this.user.name+".json")},handleSubmit:function(){var e=this;if(this.id<0||this.id>this.max_id||this.id!==parseInt(this.id))return this.$Message.error("ID需要在1~"+this.max_id+"之间"),void(this.id=30);this.slider_max=this.cut_size,this.getAjax().then(function(t){var r=e.$isOnServer?t:[t.RECORDS[parseInt(e.id)]],i=Object(__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__.c)(r,e.cut_size),s=i.trajectory,a=i.boundingbox,_=i.center,n=i.real_dest,o=i.recordMap;e.user.recordMap=o,e.user.trajectory=s,e.user.center=_,e.user.boundingCoords=a,e.user.real_dest=n,e.draw(s,n,_,a,[])}).catch(function(t){return e.$Message.error(t.toString())})},draw:function(e,t,r,i,s){this.lines.coords=e,this.lines_option.data=[this.lines],this.lines_state.data=[this.lines],this.real_dest_option.data=[{name:"目的地",value:this.user.real_dest}],this.pre_dest_option.data=[{name:"预测点",value:s}];var a=[this.lines_option,this.lines_state,this.real_dest_option];this.$isOnServer&&a.push(this.pre_dest_option);var _={tooltip:{trigger:"item"},series:a};this.bmap.center.toString()!==r.toString()&&(this.bmap.center=r,this.bmap.boundingCoords=i,_.bmap=this.bmap),this.option=_},predict:function(){if(null==this.user.trajectory||null==this.user.recordMap)return this.$Message.info("没有数据"),null;if(this.is_dynamic){this.preable=!0;var e=this,t=!1;this.dy=setInterval(function(){t&&(e.move_value+=1),e.move_value>=e.slider_max&&(e.move_value=0);var r=Math.max(2,parseInt(e.move_value/e.cut_size*e.user.trajectory.length-1)),i=""+e.move_value;i in e.user.pre_dests?e.draw(e.user.trajectory.slice(0,r),e.user.real_dest,e.user.center,e.user.boundingCoords,e.user.pre_dests[i]):e.do_predict(),t=!0},3e3)}else this.do_predict()},do_predict:function do_predict(){var _this3=this,len=Math.max(2,parseInt(this.move_value/this.cut_size*this.user.trajectory.length-1));this.$isOnServer?Object(__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__.b)("predictor",{record:this.user.recordMap.get(this.move_value),user:this.user.name}).then(function(data){var pre_dest=__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__.d.apply(void 0,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(eval(data.res)));_this3.draw(_this3.user.trajectory.slice(0,len),_this3.user.real_dest,_this3.user.center,_this3.user.boundingCoords,pre_dest),_this3.$Message.success("预测结果："+pre_dest)}):this.draw(this.user.trajectory.slice(0,len),this.user.real_dest,this.user.center,this.user.boundingCoords)},format:function(e){return(e/this.slider_max*100).toFixed(1)+"%"},idChange:function(){(this.id>this.max_id||this.min_v<=0||this.id!==parseInt(this.id))&&(this.$Message.error("ID需要在1~"+this.max_id+"之间"),this.id=30)}},components:{EChartsMap:__WEBPACK_IMPORTED_MODULE_1__components_commom_EChartsMap__.a}}},gyq4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("TxY1"),s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Form",{ref:"formInline",attrs:{model:e.formInline,inline:""}},[r("FormItem",[e._v("\n      轨迹 ID:\n      "),r("InputNumber",{staticStyle:{width:"70px"},attrs:{max:e.max_id,min:1},on:{"on-change":e.idChange},model:{value:e.id,callback:function(t){e.id=t},expression:"id"}})],1),e._v(" "),r("FormItem",[e._v("\n      切分粒度:\n      "),r("InputNumber",{staticStyle:{width:"70px"},attrs:{editable:!1,max:30,min:1},model:{value:e.cut_size,callback:function(t){e.cut_size=t},expression:"cut_size"}})],1),e._v(" "),r("FormItem",[e._v("\n      测试用户: "),r("Select",{staticStyle:{width:"70px"},attrs:{clearable:""},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}},[r("Option",{attrs:{value:"user1"}},[e._v("User1")]),e._v(" "),r("Option",{attrs:{value:"user2"}},[e._v("User2")]),e._v(" "),r("Option",{attrs:{value:"user3"}},[e._v("User3")]),e._v(" "),r("Option",{attrs:{value:"user4"}},[e._v("User4")])],1)],1),e._v(" "),r("FormItem",{staticStyle:{width:"70px"}},[r("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("选择")])],1),e._v(" "),r("FormItem",[r("Divider",{attrs:{type:"vertical"}}),e._v("\n      旅程完成度:\n    ")],1),e._v(" "),r("FormItem",{staticStyle:{width:"305px"}},[r("Slider",{staticStyle:{width:"300px"},attrs:{step:1,max:e.slider_max,min:1,"tip-format":e.format,"show-tip":"always","show-stops":""},model:{value:e.move_value,callback:function(t){e.move_value=t},expression:"move_value"}})],1),e._v(" "),r("FormItem",{staticStyle:{width:"110px"}},[e._v("\n      动态预测:\n      "),r("i-switch",{on:{"on-change":e.change},model:{value:e.is_dynamic,callback:function(t){e.is_dynamic=t},expression:"is_dynamic"}})],1),e._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary",disabled:e.preable},on:{click:e.predict}},[e._v("开始预测")])],1)],1),e._v(" "),r("EChartsMap",{attrs:{option:e.option}})],1)},staticRenderFns:[]};var a=function(e){r("RboU")},_=r("VU/8")(i.a,s,!1,a,"data-v-7f023f3b",null);t.default=_.exports},loSv:function(e,t,r){"use strict";var i=r("IcnI"),s=r("XLwt"),a={name:"EChartsMap",props:["option"],watch:{option:function(e){this.myChart.setOption(e)}},data:function(){return{myChart:null}},mounted:function(){this.draw()},methods:{draw:function(){this.myChart=s.init(this.$el),this.myChart.setOption({bmap:{center:[114.03,22.32],zoom:10,roam:!0,mapStyle:i.a.state.mapStyle}})}}},_={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"bmap"})},staticRenderFns:[]};var n=r("VU/8")(a,_,!1,function(e){r("x/J/")},"data-v-72b8a829",null);t.a=n.exports},"x/J/":function(e,t){}});