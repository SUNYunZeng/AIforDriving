webpackJsonp([0],{KwgN:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a=process,__webpack_exports__.b=wgs84togcj02tobd09;var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__=__webpack_require__("Gu7T"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__),__WEBPACK_IMPORTED_MODULE_1__store__=__webpack_require__("IcnI");function process(data){var user="string"==typeof data?JSON.parse(data)[0]:data[0],trajectory=[],norm_dict=eval(user.norm_dict),_ref=[eval(user.lngs),eval(user.lats)],lngs=_ref[0],lats=_ref[1],_ref2=[lngs,lats];user.lngs=_ref2[0],user.lats=_ref2[1];for(var _ref3=[Math.min.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(lngs)),Math.max.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(lats)),Math.max.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(lngs)),Math.min.apply(Math,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(lats))],min_lng=_ref3[0],max_lat=_ref3[1],max_lng=_ref3[2],min_lat=_ref3[3],center=dec_loc(norm_dict,(max_lng+min_lng)/2,(max_lat+min_lat)/2),boundingbox=[dec_loc(norm_dict,min_lng,max_lat),dec_loc(norm_dict,max_lng,min_lat)],i=0;i<lngs.length;i++)trajectory.push(wgs84togcj02tobd09.apply(void 0,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(dec_loc(norm_dict,lngs[i],lats[i]))));return{record:user,trajectory:trajectory,boundingbox:boundingbox,center:center,destination:trajectory[trajectory.length-1]}}var dec_loc=function(e,t,_){return[t*e[1]+e[0],_*e[3]+e[2]]};function wgs84togcj02tobd09(e,t){var _=52.35987755982988,a=3.141592653589793,r=6378245,n=.006693421622965943,s=transformlat(e-105,t-35),i=transformlng(e-105,t-35),o=t/180*a,l=Math.sin(o);l=1-n*l*l;var c=Math.sqrt(l),u=t+(s=180*s/(r*(1-n)/(l*c)*a)),m=e+(i=180*i/(r/c*Math.cos(o)*a)),p=Math.sqrt(m*m+u*u)+2e-5*Math.sin(u*_),d=Math.atan2(u,m)+3e-6*Math.cos(m*_);return[p*Math.cos(d)+.0065,p*Math.sin(d)+.006]}function transformlat(e,t){var _=3.141592653589793,a=2*e-100+3*t+.2*t*t+.1*e*t+.2*Math.sqrt(Math.abs(e));return a+=2*(20*Math.sin(6*e*_)+20*Math.sin(2*e*_))/3,a+=2*(20*Math.sin(t*_)+40*Math.sin(t/3*_))/3,a+=2*(160*Math.sin(t/12*_)+320*Math.sin(t*_/30))/3}function transformlng(e,t){var _=3.141592653589793,a=300+e+2*t+.1*e*e+.1*e*t+.1*Math.sqrt(Math.abs(e));return a+=2*(20*Math.sin(6*e*_)+20*Math.sin(2*e*_))/3,a+=2*(20*Math.sin(e*_)+40*Math.sin(e/3*_))/3,a+=2*(150*Math.sin(e/12*_)+300*Math.sin(e/30*_))/3}},TxY1:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__=__webpack_require__("Gu7T"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__),__WEBPACK_IMPORTED_MODULE_1__components_commom_EChartsMap__=__webpack_require__("loSv"),__WEBPACK_IMPORTED_MODULE_2__store__=__webpack_require__("IcnI"),__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__=__webpack_require__("vlla"),__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__=__webpack_require__("KwgN");__webpack_exports__.a={name:"prediction",data:function(){return{formInline:{},cut_size:10,slider_max:10,id:10,move_value:1,is_dynamic:!1,user:{name:"user1",record:null,trajectory:null,real_dest:[],pre_dests:[]},bmap:{center:__WEBPACK_IMPORTED_MODULE_2__store__.a.state.mapconfig.center,zoom:15,roam:!0,mapStyle:__WEBPACK_IMPORTED_MODULE_2__store__.a.state.mapStyle},option:{bmap:this.bmap,tooltip:{trigger:"item"},series:[]},myChart:null,lines_option:[]}},mounted:function(){},methods:{change:function(){},getAjax:function(){return this.$isOnServer?Object(__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__.b)("searchByCol",{id:this.id,tableName:this.user.name,requireRes:!0}):Object(__WEBPACK_IMPORTED_MODULE_3__utils_myAjax__.a)("../static/data/user_1.json")},handleSubmit:function handleSubmit(){var _this=this;this.slider_max=this.cut_size,this.getAjax().then(function(data){var traj=_this.$isOnServer?data.traj:[data.RECORDS[parseInt(_this.id)]],_process=Object(__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__.a)(traj),trajectory=_process.trajectory,boundingbox=_process.boundingbox,center=_process.center,destination=_process.destination,record=_process.record;_this.user.trajectory=trajectory,_this.user.record=record;var lines=[{coords:trajectory,lineStyle:{normal:{color:"orange"}}}];_this.lines_option=[{type:"lines",coordinateSystem:"bmap",polyline:!0,data:lines,silent:!0,lineStyle:{normal:{opacity:.75,width:3}},progressiveThreshold:500,progressive:200},{type:"lines",coordinateSystem:"bmap",polyline:!0,data:lines,lineStyle:{normal:{width:0}},effect:{constantSpeed:40,show:!0,trailLength:.3,symbolSize:3.5},zlevel:1}],_this.user.real_dest=[{type:"effectScatter",coordinateSystem:"bmap",data:[{name:"目的地",value:destination}],symbolSize:20,showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,tooltip:{trigger:"item",formatter:"{b}"},itemStyle:{normal:{color:"#12e78c",shadowBlur:10,shadowColor:"#333"}},zlevel:2}];var pre_dest=_this.$isOnServer?[{type:"scatter",coordinateSystem:"bmap",data:[{name:"预测点",value:__WEBPACK_IMPORTED_MODULE_4__utils_traj_handler__.b.apply(void 0,__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(eval(data.res)))}],symbolSize:15,tooltip:{trigger:"item",formatter:"{b}"},itemStyle:{normal:{color:"#ff461f"}}}]:[];_this.bmap.center=center,_this.option={bmap:_this.bmap,tooltip:{trigger:"item"},series:[].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this.lines_option),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this.user.real_dest),pre_dest)},_this.$Message.success("预测结果："+data.res)}).catch(function(e){return _this.$Message.error(e.toString())})},predict:function(){if(null==this.user.trajectory||null==this.user.record)return this.$Message.info("没有数据"),null},format:function(e){return(e/this.slider_max*100).toFixed(1)+"%"}},components:{EChartsMap:__WEBPACK_IMPORTED_MODULE_1__components_commom_EChartsMap__.a}}},eHsE:function(e,t){},gyq4:function(e,t,_){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=_("TxY1"),r={render:function(){var e=this,t=e.$createElement,_=e._self._c||t;return _("div",[_("Form",{ref:"formInline",attrs:{model:e.formInline,inline:""}},[_("FormItem",[e._v("\n      轨迹 ID:\n      "),_("InputNumber",{staticStyle:{width:"70px"},attrs:{max:1e3,min:1},model:{value:e.id,callback:function(t){e.id=t},expression:"id"}})],1),e._v(" "),_("FormItem",[e._v("\n      切分粒度:\n      "),_("InputNumber",{staticStyle:{width:"70px"},attrs:{editable:!1,max:1e3,min:1},model:{value:e.cut_size,callback:function(t){e.cut_size=t},expression:"cut_size"}})],1),e._v(" "),_("FormItem",[e._v("\n      测试用户: "),_("Select",{staticStyle:{width:"70px"},attrs:{clearable:""},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}},[_("Option",{attrs:{value:"user1"}},[e._v("User1")]),e._v(" "),_("Option",{attrs:{value:"user2",disabled:""}},[e._v("User2")]),e._v(" "),_("Option",{attrs:{value:"user3",disabled:""}},[e._v("User3")]),e._v(" "),_("Option",{attrs:{value:"user3",disabled:""}},[e._v("User4")])],1)],1),e._v(" "),_("FormItem",{staticStyle:{width:"70px"}},[_("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("选择")])],1),e._v(" "),_("FormItem",[_("Divider",{attrs:{type:"vertical"}}),e._v("\n      旅程完成度:\n    ")],1),e._v(" "),_("FormItem",{staticStyle:{width:"305px"}},[_("Slider",{staticStyle:{width:"300px"},attrs:{step:1,max:e.slider_max,min:1,"tip-format":e.format,"show-tip":"always","show-stops":""},model:{value:e.move_value,callback:function(t){e.move_value=t},expression:"move_value"}})],1),e._v(" "),_("FormItem",{staticStyle:{width:"110px"}},[e._v("\n      动态预测:\n      "),_("i-switch",{on:{"on-change":e.change},model:{value:e.is_dynamic,callback:function(t){e.is_dynamic=t},expression:"is_dynamic"}})],1),e._v(" "),_("FormItem",[_("Button",{attrs:{disabled:!this.$isOnServer,type:"primary"},on:{click:e.predict}},[e._v("开始预测")])],1)],1),e._v(" "),_("EChartsMap",{attrs:{option:e.option}})],1)},staticRenderFns:[]};var n=function(e){_("zjkY")},s=_("VU/8")(a.a,r,!1,n,"data-v-efa36608",null);t.default=s.exports},loSv:function(e,t,_){"use strict";var a=_("IcnI"),r=_("XLwt"),n={name:"EChartsMap",props:["option"],watch:{option:function(e){this.myChart.setOption(e)}},data:function(){return{myChart:null}},mounted:function(){this.draw()},methods:{draw:function(){this.myChart=r.init(this.$el),this.myChart.setOption({bmap:{center:[114.03,22.32],zoom:10,roam:!0,mapStyle:a.a.state.mapStyle}})}}},s={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"bmap"})},staticRenderFns:[]};var i=_("VU/8")(n,s,!1,function(e){_("eHsE")},"data-v-72b8a829",null);t.a=i.exports},vlla:function(e,t,_){"use strict";t.b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r.a.post(n.a.state.bUrl+e,t,{headers:{"Content-Type":"application/json"}})},t.a=function(e){return r.a.get(e)};var a=_("mtWM"),r=_.n(a),n=_("IcnI")},zjkY:function(e,t){}});
//# sourceMappingURL=0.b0fa023f649aa41204cc.js.map