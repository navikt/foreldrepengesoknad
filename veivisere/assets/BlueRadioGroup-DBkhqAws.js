import{j as t}from"./tslib.es6-D_L490Ab.js";import{r as s}from"./index-CTjT7uj6.js";import{b as i,c as n}from"./NumericField-CmsTZLxU.js";import{B as u}from"./Infobox-BWTFR4k9.js";const a=o=>o?t.jsx("span",{role:"alert",style:{background:"white",marginLeft:-13,paddingLeft:5,paddingRight:5,paddingBottom:5,paddingTop:5,borderRadius:4,width:"100%"},children:o}):void 0;a.__docgenInfo={description:"",methods:[],displayName:"formatError"};const l=o=>{const r=i(),d=r.watch(o.name);return s.useEffect(()=>{let e;return o.shouldAutofocus&&(e=setTimeout(()=>{r.setFocus(o.name)},300)),()=>e&&clearTimeout(e)},[]),t.jsx(u,{isDarkBlue:d==null,shouldFadeIn:o.shouldFadeIn,children:t.jsx(n,{...o,customErrorFormatter:a,children:o.children})})};l.__docgenInfo={description:"",methods:[],displayName:"BlueRadioGroup",props:{shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:""},shouldAutofocus:{required:!1,tsType:{name:"boolean"},description:""}}};export{l as B};
