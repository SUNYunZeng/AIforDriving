webpackJsonp([0],{"3Xst":function(e,t,i){e.exports=i.p+"static/img/logo.71ddf3f.jpg"},"42Hy":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("//Fk"),n=i.n(s),a={name:"index",data:function(){return{paths:{},currentPage:"",openMenus:[],menuCache:[],showLoading:!1,isShowRouter:!0,tagsArry:[],isShowAsideTitle:!0,main:null,asideClassName:"aside-big",asideArrowIcons:[]}},created:function(){var e=this;this.$axios.interceptors.request.use(function(t){return e.showLoading=!0,t},function(t){return e.showLoading=!1,n.a.reject(t)}),this.$axios.interceptors.response.use(function(t){return e.showLoading=!1,t.data},function(t){return e.showLoading=!1,n.a.reject(t)})},mounted:function(){var e=this,t=this.$route.name;this.currentPage=t,this.tagsArry.push({text:this.nameToTitle[t],name:t}),this.openMenus=this.getMenus(t),this.$nextTick(function(){e.$refs.asideMenu.updateOpened()}),this.main=document.querySelector(".sec-right"),this.asideArrowIcons=document.querySelectorAll("aside .ivu-icon-ios-arrow-down"),this.monitorWindowSize()},watch:{$route:function(e){var t=e.name;this.currentPage=t,this.keepAliveData.includes(t)||(8==this.tagsArry.length&&this.tagsArry.shift(),this.tagsArry.push({name:t,text:this.nameToTitle[t]}))}},computed:{menuItems:function(){return this.$store.state.menuItems},keepAliveData:function(){return this.tagsArry.map(function(e){return e.name})},nameToTitle:function(){var e=this,t={};return this.menuItems.forEach(function(i){e.processNameToTitle(t,i)}),t}},methods:{getMenus:function(e){for(var t=void 0,i=this.nameToTitle[e],s=0,n=this.menuItems.length;s<n;s++){var a=this.menuItems[s];if((t=[])[0]=s,a.text==i)return t;if(a.children)for(var o=0,r=a.children.length;o<r;o++){var c=a.children[o];if(t[1]=s+"-"+o,t.length=2,c.text==i)return t;if(c.children)for(var h=0,l=c.children.length;h<l;h++){var u=c.children[h];if(t[2]=s+"-"+o+"-"+h,u.text==i)return t}}}},monitorWindowSize:function(){var e=this,t=document.documentElement.clientWidth||document.body.clientWidth;t<1300&&this.shrinkAside(),window.onresize=function(){t<1300&&e.isShowAsideTitle&&t>(document.documentElement.clientWidth||document.body.clientWidth)&&e.shrinkAside(),t=document.documentElement.clientWidth||document.body.clientWidth}},isActive:function(e){return this.$route.name===e},gotoPage:function(e,t){this.currentPage=e,this.$router.replace({name:e,params:t}),this.keepAliveData.includes(e)||(8==this.tagsArry.length&&this.tagsArry.shift(),this.tagsArry.push({name:e,text:this.nameToTitle[e]}))},isShrinkAside:function(){this.isShowAsideTitle?this.shrinkAside():this.expandAside()},shrinkAside:function(){var e=this;this.asideArrowIcons.forEach(function(e){e.style.display="none"}),this.isShowAsideTitle=!1,this.openMenus=[],this.$nextTick(function(){e.$refs.asideMenu.updateOpened()}),setTimeout(function(){e.asideClassName="",e.main.style.width="calc(100% - 80px)"},0)},expandAside:function(){var e=this;setTimeout(function(){e.isShowAsideTitle=!0,e.asideArrowIcons.forEach(function(e){e.style.display="block"}),e.openMenus=e.menuCache,e.$nextTick(function(){e.$refs.asideMenu.updateOpened()})},200),this.asideClassName="aside-big",this.main.style.width="calc(100% - 220px)"},reloadPage:function(){var e=this,t=this.$route.name,i=this.keepAliveData.indexOf(t);this.$nextTick(function(){e.tagsArry.length?(e.isShowRouter=!1,e.tagsArry.splice(i,1),e.$nextTick(function(){e.tagsArry.splice(i,0,{name:t,text:e.nameToTitle[t]}),e.gotoPage(t),e.isShowRouter=!0})):(e.isShowRouter=!1,e.$nextTick(function(){e.tagsArry.push({name:t,text:e.nameToTitle[t]}),e.gotoPage(t),e.isShowRouter=!0}))})},closeTag:function(e){var t=this.tagsArry[e].name;this.tagsArry.splice(e,1),event.stopPropagation(),this.tagsArry.length?this.isActive(t)&&(0!=e?this.gotoPage(this.tagsArry[e-1].name):this.gotoPage(this.tagsArry[e].name)):"home"!=t?this.gotoPage("home"):this.reloadPage()},closeName:function(e){for(var t=0,i=this.tagsArry.length;t<i;t++)if(this.tagsArry[t].name==e){this.closeTag(t);break}},closeTags:function(e){1==e?(this.tagsArry=[],this.gotoPage(this.$route.name)):(this.tagsArry=[],this.gotoPage("home"),this.reloadPage())},activeTag:function(e){this.gotoPage(this.tagsArry[e].name)},menuChange:function(e){this.menuCache=e},processNameToTitle:function(e,t,i){var s=this;t.name&&(e[t.name]=t.text,this.paths[t.name]=i?i+" / "+t.text:t.text),t.children&&t.children.forEach(function(n){s.processNameToTitle(e,n,i?i+" / "+t.text:t.text)})}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index-vue"},[s("aside",{class:e.asideClassName},[s("div",{staticClass:"logo-c pointer",attrs:{title:"收缩/展开"},on:{click:e.isShrinkAside}},[s("img",{staticClass:"logo",attrs:{src:i("3Xst"),alt:"logo"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v("驾驶分析系统")])]),e._v(" "),s("Menu",{ref:"asideMenu",staticClass:"menu",attrs:{theme:"dark",width:"100%",accordion:"","open-names":e.openMenus,"active-name":e.currentPage},on:{"on-select":e.gotoPage,"on-open-change":e.menuChange}},e._l(e.menuItems,function(t,i){return s("div",{key:i},[t.children?s("Submenu",{attrs:{name:i}},[s("template",{slot:"title"},[s("Icon",{attrs:{size:t.size,type:t.type}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v(e._s(t.text))])],1),e._v(" "),e._l(t.children,function(t,n){return s("div",{key:i+n},[t.children?s("Submenu",{attrs:{name:i+"-"+n}},[s("template",{slot:"title"},[s("Icon",{attrs:{size:t.size,type:t.type}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v(e._s(t.text))])],1),e._v(" "),e._l(t.children,function(t,a){return t.hidden?e._e():s("MenuItem",{key:i+n+a,staticClass:"menu-level-3",attrs:{name:t.name}},[s("Icon",{attrs:{size:t.size,type:t.type}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v(e._s(t.text))])],1)})],2):t.hidden?e._e():s("MenuItem",{attrs:{name:t.name}},[s("Icon",{attrs:{size:t.size,type:t.type}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v(e._s(t.text))])],1)],1)})],2):t.hidden?e._e():s("MenuItem",{attrs:{name:t.name}},[s("Icon",{attrs:{size:t.size,type:t.type}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isShowAsideTitle,expression:"isShowAsideTitle"}]},[e._v(e._s(t.text))])],1)],1)}),0)],1),e._v(" "),s("section",{staticClass:"sec-right"},[s("div",{staticClass:"div-tags"},[s("ul",{staticClass:"ul-c"},e._l(e.tagsArry,function(t,i){return s("li",{key:i,class:{active:e.isActive(t.name)},on:{click:function(t){return e.activeTag(i)}}},[s("a",{staticClass:"li-a"},[e._v("\n            "+e._s(t.text)+"\n          ")]),e._v(" "),s("Icon",{attrs:{size:"16",type:"md-close"},on:{click:function(t){return e.closeTag(i)}}})],1)}),0),e._v(" "),s("div",{staticClass:"div-icons"},[s("div",{staticClass:"refresh-c",attrs:{title:"刷新当前标签页"},on:{click:e.reloadPage}},[s("Icon",{attrs:{type:"md-refresh"}})],1),e._v(" "),s("div",{staticClass:"tag-options",attrs:{title:"关闭标签"}},[s("Dropdown",{attrs:{trigger:"click"},on:{"on-click":e.closeTags}},[s("Icon",{attrs:{type:"ios-options"}}),e._v(" "),s("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[s("DropdownItem",{attrs:{name:"1"}},[e._v("关闭其他标签")]),e._v(" "),s("DropdownItem",{attrs:{name:"2"}},[e._v("关闭所有标签")])],1)],1)],1)])]),e._v(" "),s("div",{staticClass:"main-content"},[s("div",{staticClass:"view-c"},[s("keep-alive",{attrs:{include:e.keepAliveData}},[e.isShowRouter?s("router-view"):e._e()],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showLoading,expression:"showLoading"}],staticClass:"loading-c"},[s("Spin",{attrs:{size:"large"}})],1)],1)])])])},staticRenderFns:[]};var r=i("VU/8")(a,o,!1,function(e){i("9cCA")},"data-v-d45969ee",null);t.default=r.exports},"9cCA":function(e,t){}});
//# sourceMappingURL=0.ebbc625a5ec681bdb4e7.js.map