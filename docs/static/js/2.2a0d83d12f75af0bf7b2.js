webpackJsonp([2],{QcjV:function(e,t){},j7e0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("IcnI"),n={name:"home",data:function(){return{map:null,L:null,baseLayer:null,msg:"高德地图",map_config:{zoom:15,center:[30.541093,114.360734],minZoom:2,maxZoom:18}}},mounted:function(){this.initMap()},methods:{initMap:function(){this.L=L;var e=L.map("map",{center:this.map_config.center,zoom:this.map_config.zoom});this.map=e,this.addLayer(L,e,i.a.state.layerItems.gd_n_a,18,3)},addLayer:function(e,t,a,i,n){null!==this.baseLayer&&t.removeLayer(this.baseLayer),this.baseLayer=e.tileLayer.chinaProvider(a,{maxZoom:void 0===i?this.map_config.maxZoom:i,minZoom:void 0===n?this.map_config.minZoom:n}),t.addLayer(this.baseLayer)},returnHome:function(){this.map.setView(this.map_config.center,15)},mapSet:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.L,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.map;switch(e){case"gd":this.addLayer(t,a,i.a.state.layerItems.gd_n_a,18,3),this.msg="高德地图 ";break;case"glg":this.addLayer(t,a,i.a.state.layerItems.glg_n),this.msg="谷歌地图 ";break;case"geo":this.addLayer(t,a,i.a.state.layerItems.geo_n_g,16),this.msg="   智图   ";break;case"osm":this.addLayer(t,a,i.a.state.layerItems.osm),this.msg="OSM地图";break;case"box":null!==this.baseLayer&&a.removeLayer(this.baseLayer),this.baseLayer=t.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{id:i.a.state.layerItems.box,minZoom:3}),a.addLayer(this.baseLayer),this.msg="Mapbox"}}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{attrs:{id:"map"}}),e._v(" "),a("Button",{staticClass:"rightmenu",attrs:{id:"map_home",icon:"ios-home",type:"primary",shape:"circle",title:"home"},on:{click:e.returnHome}}),e._v(" "),a("Dropdown",{staticClass:"rightmenu",staticStyle:{"margin-left":"20px"},attrs:{placement:"bottom-end"}},[a("Button",{attrs:{type:"primary"}},[e._v("\n      "+e._s(e.msg)+"\n      "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),e._v(" "),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[a("DropdownItem",{nativeOn:{click:function(t){return e.mapSet("gd")}}},[e._v("高德地图")]),e._v(" "),a("DropdownItem",{nativeOn:{click:function(t){return e.mapSet("glg")}}},[e._v("谷歌地图")]),e._v(" "),a("DropdownItem",{nativeOn:{click:function(t){return e.mapSet("box")}}},[e._v("MapBox")]),e._v(" "),a("DropdownItem",{nativeOn:{click:function(t){return e.mapSet("osm")}}},[e._v("OSM地图")]),e._v(" "),a("DropdownItem",{nativeOn:{click:function(t){return e.mapSet("geo")}}},[e._v("智图")])],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(n,o,!1,function(e){a("QcjV")},"data-v-53e6fa8e",null);t.default=s.exports}});
//# sourceMappingURL=2.2a0d83d12f75af0bf7b2.js.map