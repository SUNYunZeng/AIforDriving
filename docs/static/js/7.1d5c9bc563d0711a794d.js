webpackJsonp([7],{We1U:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"od",data:function(){return{msg:"Search data",id:"",tableName:""}},methods:{getData:function(){var e=this.id,t=this.tableName;this.$axios.post(this.bUrl+"searchByCol",{id:e,tableName:t,requireRes:!0},{headers:{"Content-Type":"application/json"}}).then(function(e){console.log(e.data)}).catch(function(e){return console.log(e)})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("h1",[e._v(e._s(e.msg))]),e._v(" "),a("form",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.id,expression:"id"}],attrs:{type:"text",name:"id"},domProps:{value:e.id},on:{input:function(t){t.target.composing||(e.id=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.tableName,expression:"tableName"}],attrs:{type:"text",name:"tableName"},domProps:{value:e.tableName},on:{input:function(t){t.target.composing||(e.tableName=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("a",{attrs:{href:"javascript:;"},on:{click:e.getData}},[e._v("提交")])])])},staticRenderFns:[]},i=a("VU/8")(n,o,!1,null,null,null);t.default=i.exports}});
//# sourceMappingURL=7.1d5c9bc563d0711a794d.js.map