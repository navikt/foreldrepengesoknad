import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{r as a}from"./index-CTjT7uj6.js";import{c as i,d as u}from"./StepButtonsHookForm-BKlDxIoe.js";import{f as d}from"./customErrorFormatter-BAPWT5E-.js";import"./composeEventHandlers-CQxkItEI.js";import{B as m}from"./VeiviserPage-96q4z1iB.js";const n=o=>{const r=i(),s=r.watch(o.name);return a.useEffect(()=>{let e;return o.shouldAutofocus&&(e=setTimeout(()=>{r.setFocus(o.name)},300)),()=>e&&clearTimeout(e)},[]),t.jsx(m,{isDarkBlue:s===void 0,shouldFadeIn:o.shouldFadeIn,children:t.jsx(u,{...o,customErrorFormatter:d,children:o.children})})};n.__docgenInfo={description:"",methods:[],displayName:"BlueRadioGroup",props:{shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:""},shouldAutofocus:{required:!1,tsType:{name:"boolean"},description:""}}};export{n as B};
