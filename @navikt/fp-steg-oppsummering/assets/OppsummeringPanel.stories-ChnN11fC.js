import{j as n}from"./jsx-runtime-QvZ8i92b.js";import{v as ue}from"./v4-CQkTLCs1.js";import{u as me,a as L,c as b,o as I,L as Q,B as F,E as X,b as ee,d as pe,H as ge,S as fe,V as U,e as ve,M as l,A as he,f as E,i as be,g as je,h as Oe}from"./VeiviserPage-C9Vs8zn-.js";import{r as p,R as o}from"./index-uubelm5h.js";import{u as C}from"./index-GcLDTaiY.js";import"./index-D3eZ-H7s.js";import"./index-C4_kIme7.js";const{addons:ye}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:xe}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:H}=__STORYBOOK_MODULE_GLOBAL__;var ke="storybook/actions",Se=`${ke}/action-event`,Ee={depth:10,clearOnStoryChange:!0,limit:50},re=(e,t)=>{let s=Object.getPrototypeOf(e);return!s||t(s)?s:re(s,t)},Ae=e=>!!(typeof e=="object"&&e&&re(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),_e=e=>{if(Ae(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let s=Object.getOwnPropertyDescriptor(t,"view"),r=s==null?void 0:s.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...s,value:Object.create(r.constructor.prototype)}),t}return e},we=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?ue():Date.now().toString(36)+Math.random().toString(36).substring(2);function k(e,t={}){let s={...Ee,...t},r=function(...i){var j,v;if(t.implicit){let y=(j="__STORYBOOK_PREVIEW__"in H?H.__STORYBOOK_PREVIEW__:void 0)==null?void 0:j.storyRenders.find(h=>h.phase==="playing"||h.phase==="rendering");if(y){let h=!((v=window==null?void 0:window.FEATURES)!=null&&v.disallowImplicitActionsInRenderV8),O=new xe({phase:y.phase,name:e,deprecated:h});if(h)console.warn(O);else throw O}}let c=ye.getChannel(),f=we(),m=5,d=i.map(_e),u=i.length>1?d:d[0],g={id:f,count:0,data:{name:e,args:u},options:{...s,maxDepth:m+(s.depth||3),allowFunction:s.allowFunction||!1}};c.emit(Se,g)};return r.isAction=!0,r.implicit=t.implicit,r}var _=(e=>(e.FISKER="FISKE",e.JORDBRUK="JORDBRUK_SKOGBRUK",e.DAGMAMMA="DAGMAMMA",e.ANNET="ANNEN",e))(_||{});const Ie=e=>e.harHattAndreInntektskilder!==void 0;var Pe=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ne=p.forwardRef((e,t)=>{var{title:s,titleId:r}=e,i=Pe(e,["title","titleId"]);let c=me();return c=s?r||"title-"+c:void 0,p.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":c},i),s?p.createElement("title",{id:c},s):null,p.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25m3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25zM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13",clipRule:"evenodd"}))}),ne=({readOnly:e,nativeReadOnly:t=!0})=>e?o.createElement(Ne,Object.assign({},t?{"aria-hidden":!0}:{title:"readonly"},{className:"navds-form-field__readonly-icon"})):null,V=p.createContext(null),B=(e,t)=>{var s,r,i;const{size:c,error:f,errorId:m}=e,d=p.useContext(V),u=L(),g=(s=e.id)!==null&&s!==void 0?s:`${t}-${u}`,j=m??`${t}-error-${u}`,v=`${t}-description-${u}`,y=(d==null?void 0:d.disabled)||e.disabled,h=((d==null?void 0:d.readOnly)||e.readOnly)&&!y||void 0,O=!y&&!h&&!!(f||d!=null&&d.error),x=!y&&!h&&!!f&&typeof f!="boolean",A=Object.assign({},O?{"aria-invalid":!0}:{});return e!=null&&e.required,{showErrorMsg:x,hasError:O,errorId:j,inputDescriptionId:v,size:(r=c??(d==null?void 0:d.size))!==null&&r!==void 0?r:"medium",readOnly:h,inputProps:Object.assign(Object.assign({id:g},A),{"aria-describedby":b(e["aria-describedby"],{[v]:!!(e!=null&&e.description)&&typeof(e==null?void 0:e.description)=="string",[j]:x,[(i=d==null?void 0:d.errorId)!==null&&i!==void 0?i:""]:O&&!!(d!=null&&d.error)})||void 0,disabled:y})}},Le=e=>{const t=B(e,"fieldset"),{inputProps:s}=t;return Object.assign(Object.assign({},t),{inputProps:{"aria-invalid":s["aria-invalid"],"aria-describedby":s["aria-describedby"]}})};var Ve=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Fe=p.forwardRef((e,t)=>{var s,r,i;const{inputProps:c,errorId:f,showErrorMsg:m,hasError:d,size:u,readOnly:g,inputDescriptionId:j}=Le(e),v=p.useContext(V),{children:y,className:h,errorPropagation:O=!0,legend:x,description:A,hideLegend:D,nativeReadOnly:de=!0}=e,ce=Ve(e,["children","className","errorPropagation","legend","description","hideLegend","nativeReadOnly"]);return o.createElement(V.Provider,{value:{error:O?(s=e.error)!==null&&s!==void 0?s:v==null?void 0:v.error:void 0,errorId:b({[f]:m,[(r=v==null?void 0:v.errorId)!==null&&r!==void 0?r:""]:!!(v!=null&&v.error)}),size:u,disabled:(i=e.disabled)!==null&&i!==void 0?i:!1,readOnly:g}},o.createElement("fieldset",Object.assign({},I(ce,["errorId","error","size","readOnly"]),I(c,["aria-describedby","aria-invalid"]),{ref:t,className:b(h,"navds-fieldset",`navds-fieldset--${u}`,{"navds-fieldset--error":d,"navds-fieldset--readonly":g})}),o.createElement(Q,{size:u,as:"legend",className:b("navds-fieldset__legend",{"navds-sr-only":!!D})},o.createElement(ne,{readOnly:g,nativeReadOnly:de}),x),!!A&&o.createElement(F,{className:b("navds-fieldset__description",{"navds-sr-only":!!D}),id:j,size:u??"medium",as:"div"},e.description),y,o.createElement("div",{id:f,"aria-relevant":"additions removals","aria-live":"polite",className:"navds-fieldset__error"},m&&o.createElement(X,{size:u},e.error))))});var Re=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const te=p.createContext(null);p.forwardRef((e,t)=>{var s,r,{value:i,defaultValue:c,onChange:f=()=>{},children:m,className:d}=e,u=Re(e,["value","defaultValue","onChange","children","className"]);const g=p.useContext(V),[j,v]=p.useState(c??[]),y=h=>{const O=i??j,x=O.includes(h)?O.filter(A=>A!==h):[...O,h];i===void 0&&v(x),f(x)};return o.createElement(Fe,Object.assign({},u,{ref:t,className:b(d,"navds-checkbox-group",`navds-checkbox-group--${(r=(s=u.size)!==null&&s!==void 0?s:g==null?void 0:g.size)!==null&&r!==void 0?r:"medium"}`),nativeReadOnly:!1}),o.createElement(te.Provider,{value:{value:i,defaultValue:c,toggleValue:y}},o.createElement("div",{className:"navds-checkboxes"},m)))});var Ce=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Be=e=>{const t=p.useContext(te),s=B(I(e,["description","children"]),"checkbox"),{inputProps:r,readOnly:i}=s,c=Ce(s,["inputProps","readOnly"]);return t&&(e.checked&&console.warn("`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."),e.value===void 0&&console.warn("A <Checkbox> element within a <CheckboxGroup> requires a `value` property.")),Object.assign(Object.assign({},c),{readOnly:i,nested:!!t,inputProps:Object.assign(Object.assign({},r),{checked:t!=null&&t.value?t.value.includes(e.value):e.checked,defaultChecked:t!=null&&t.defaultValue?t.defaultValue.includes(e.value):e.defaultChecked,onChange:f=>{var m;i||((m=e.onChange)===null||m===void 0||m.call(e,f),t==null||t.toggleValue(e.value))},onClick:f=>{var m;if(i){f.preventDefault();return}(m=e==null?void 0:e.onClick)===null||m===void 0||m.call(e,f)}})})},Te=p.forwardRef((e,t)=>{const{inputProps:s,hasError:r,size:i,readOnly:c,nested:f}=Be(e),m=L(),d=L();return o.createElement("div",{className:b(e.className,"navds-checkbox",`navds-checkbox--${i}`,{"navds-checkbox--error":r,"navds-checkbox--disabled":s.disabled,"navds-checkbox--readonly":c})},o.createElement("input",Object.assign({},I(e,["children","size","error","description","hideLabel","indeterminate","errorId","readOnly"]),I(s,["aria-invalid"]),{type:"checkbox",className:"navds-checkbox__input",ref:u=>{var g;u&&(u.indeterminate=(g=e.indeterminate)!==null&&g!==void 0?g:!1),typeof t=="function"?t(u):t!=null&&(t.current=u)},"aria-labelledby":b(m,!!e["aria-labelledby"]&&e["aria-labelledby"],{[d]:e.description})})),o.createElement("label",{htmlFor:s.id,className:"navds-checkbox__label"},o.createElement("span",{className:"navds-checkbox__icon"},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"0.8125rem",height:"0.625rem",viewBox:"0 0 13 10",fill:"none",focusable:!1,role:"img","aria-hidden":!0},o.createElement("path",{d:"M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z",fill:"currentColor"}))),o.createElement("span",{className:b("navds-checkbox__content",{"navds-sr-only":e.hideLabel})},o.createElement(F,{as:"span",id:m,size:i,className:"navds-checkbox__label-text","aria-hidden":!0},!f&&o.createElement(ne,{readOnly:c,nativeReadOnly:!1}),e.children),e.description&&o.createElement(F,{as:"span",id:d,size:i,className:"navds-form-field__subdescription navds-checkbox__description","aria-hidden":!0},e.description))))});var De=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ue=p.forwardRef((e,t)=>{var{className:s,children:r,label:i}=e,c=De(e,["className","children","label"]);const{errorId:f,showErrorMsg:m,hasError:d,size:u,inputProps:g}=B(c,"confirmation-panel"),j=L();return o.createElement("div",{className:b("navds-confirmation-panel","navds-form-field",s,{"navds-confirmation-panel--small":u==="small","navds-confirmation-panel--error":d,"navds-confirmation-panel--checked":!!c.checked})},o.createElement("div",{className:"navds-confirmation-panel__inner"},r&&o.createElement(ee,{size:c.size,className:"navds-confirmation-panel__content",id:`confirmation-panel-${j}`,as:"div"},r),o.createElement(Te,Object.assign({ref:t},c,g,{"aria-describedby":b(g["aria-describedby"],r&&`confirmation-panel-${j}`),error:d,size:u}),i)),o.createElement("div",{className:"navds-form-field__error",id:f,role:"alert"},m&&o.createElement(X,{size:u},c.error)))});var He=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Me=o.forwardRef((e,t)=>{var{children:s,className:r}=e,i=He(e,["children","className"]);return o.createElement("div",Object.assign({ref:t},i,{className:b("navds-form-summary__answer",r)}),s)});var qe=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const ze=p.forwardRef((e,t)=>{var{children:s,className:r}=e,i=qe(e,["children","className"]);return o.createElement("dl",Object.assign({ref:t},i,{className:b("navds-form-summary__answers",r)}),s)});var $e=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ke=p.forwardRef((e,t)=>{var{children:s="Endre svar",className:r,as:i="a"}=e,c=$e(e,["children","className","as"]);return o.createElement(pe,Object.assign({ref:t,as:i},c,{className:b("navds-form-summary__edit",r)}),s)});var Je=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ge=p.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Je(e,["children","className"]);return o.createElement("header",Object.assign({ref:t},i,{className:b("navds-form-summary__header",r)}),s)}),Ye=p.forwardRef((e,t)=>o.createElement(ge,Object.assign({ref:t},e,{size:"medium"})));var We=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ze=p.forwardRef((e,t)=>{var{children:s}=e,r=We(e,["children"]);return o.createElement(Q,Object.assign({ref:t},r,{as:"dt"}),s)});var Qe=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Xe=p.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Qe(e,["children","className"]);return o.createElement(ee,Object.assign({ref:t},i,{as:"dd",className:b("navds-form-summary__value",r)}),s)});var er=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const a=p.forwardRef((e,t)=>{var{children:s,className:r}=e,i=er(e,["children","className"]);return o.createElement("div",Object.assign({ref:t},i,{className:b("navds-form-summary",r)}),s)});a.Header=Ge;a.Heading=Ye;a.EditLink=Ke;a.Answers=ze;a.Answer=Me;a.Label=Ze;a.Value=Xe;const rr=e=>e.charAt(0).toUpperCase()+e.slice(1),nr=["og","and","i","in"],tr=["as"],ir=e=>{if(e)return e.toLowerCase().split(" ").map(t=>tr.includes(t)?t.toUpperCase():nr.includes(t)?t:rr(t)).join(" ")},sr=(e,t,s)=>{if(t==="Engangsstønad")return e.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(t==="Foreldrepenger"&&s!==void 0)return e.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(s);if(t==="Svangerskapspenger")return e.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${t} not supported`)},ie=({sendSøknad:e,cancelApplication:t,onContinueLater:s,goToPreviousStep:r,onStepChange:i,stepConfig:c,children:f,appName:m,ekstraSamtykketekst:d})=>{const u=C(),[g,j]=p.useState(!1),[v,y]=p.useState(!1),[h,O]=p.useState(!1),x=()=>{g?(y(!0),e()):O(!0)};return n.jsx(fe,{onCancel:t,onContinueLater:s,steps:c,onStepChange:i,noFieldsRequired:!0,children:n.jsxs(U,{gap:"10",children:[n.jsx(U,{gap:"3",children:f}),n.jsx(Ue,{label:sr(u,m,d),onChange:()=>j(A=>!A),checked:g,error:h&&!g&&u.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),n.jsx(ve,{goToPreviousStep:r,nextButtonOnClick:x,isDisabledAndLoading:v,isSendButton:!0})]})})};ie.__docgenInfo={description:"",methods:[],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const se=({arbeidsforholdOgInntekt:e,arbeidsforhold:t,onVilEndreSvar:s})=>{if(!e)return null;const r=Ie(e);return n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(l,{id:"ArbeidsforholdOppsummering.Arbeid"})}),n.jsx(a.EditLink,{onClick:s,children:n.jsx(l,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.OmArbeidsforhold"})}),n.jsxs(a.Value,{children:[t.length===0&&n.jsx(l,{id:"ArbeidsforholdOppsummering.IngenRegistrerteArbeidsforhold"}),t.length>0&&n.jsx(a.Answers,{children:t.map(i=>n.jsx(ar,{arbeidsforhold:i},i.arbeidsgiverId))})]}),n.jsx(he,{variant:"info",style:{marginTop:"var(--a-spacing-2)"},children:n.jsx(l,{id:"ArbeidsforholdOppsummering.inntektsmelding",values:{antall:t.length}})})]}),n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[r&&n.jsx(l,{id:"ArbeidsforholdOppsummering.HarDuJobbetSomFrilansFp"}),!r&&n.jsx(l,{id:"ArbeidsforholdOppsummering.HarDuJobbetSomFrilans"})]}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harJobbetSomFrilans})})]}),n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[r&&n.jsx(l,{id:"ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivendeFp"}),!r&&n.jsx(l,{id:"ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivende"})]}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harJobbetSomSelvstendigNæringsdrivende})})]}),!r&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.HarHattArbeidIUtlandet"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harHattArbeidIUtlandet})})]}),r&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.HarHattAndreInntektskilder"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harHattAndreInntektskilder})})]})]})]})},S=({ja:e})=>e?n.jsx(l,{id:"ja"}):n.jsx(l,{id:"nei"}),ar=({arbeidsforhold:e})=>{const t=C();return n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[ir(e.arbeidsgiverNavn),","," ",e.stillingsprosent,"%"]}),n.jsxs(a.Value,{children:["Org nr: ",e.arbeidsgiverId,","," ",n.jsx(l,{id:"ArbeidsforholdFormSummaryValue.arbeidsforhold.periode",values:{fom:E(e.fom),tom:e.tom?E(e.tom):t.formatMessage({id:"pågående"})}})]})]})},ae=({onVilEndreSvar:e,egenNæring:t})=>t?n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(l,{id:"ArbeidsforholdOppsummering.Næring"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(l,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.næringstype"})}),n.jsx(a.Value,{children:(()=>{switch(t==null?void 0:t.næringstype){case _.FISKER:return n.jsx(l,{id:"ArbeidsforholdOppsummering.næringstype.fiske"});case _.DAGMAMMA:return n.jsx(l,{id:"ArbeidsforholdOppsummering.næringstype.dagmamma"});case _.JORDBRUK:return n.jsx(l,{id:"ArbeidsforholdOppsummering.næringstype.jordbrukSkogbruk"});case _.ANNET:return n.jsx(l,{id:"ArbeidsforholdOppsummering.næringstype.annen"});default:return null}})()})]}),t.navnPåNæringen&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.navnPåNæring"})}),n.jsx(a.Value,{children:t.navnPåNæringen})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.erNæringenRegistrertINorge"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.registrertINorge})})]}),t.organisasjonsnummer&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.orgnr"})}),n.jsx(a.Value,{children:t.organisasjonsnummer})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.næring.fom"})}),n.jsx(a.Value,{children:E(t.fom)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.næring.pågående"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.pågående})})]}),!t.pågående&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.næring.tom"})}),n.jsx(a.Value,{children:E(t.tom)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.næringsinntekt"})}),n.jsx(a.Value,{children:t.næringsinntekt||"-"})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.blittYrkesaktivSiste3År"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:!!t.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene})})]}),t.oppstartsdato&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.yrkesaktivDato"})}),n.jsx(a.Value,{children:E(t.oppstartsdato)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.egenNæringHattVarigEndringDeSiste4Årene"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.hattVarigEndringAvNæringsinntektSiste4Kalenderår||!1})})]}),t.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&t.varigEndringDato&&n.jsxs(n.Fragment,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.egenNæringVarigEndringDato"})}),n.jsx(a.Value,{children:E(t.varigEndringDato)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.egenNæringVarigEndringInntektEtterEndring"})}),n.jsx(a.Value,{children:t.varigEndringInntektEtterEndring})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.varigEndringBeskrivelse.label"})}),n.jsx(a.Value,{children:t.varigEndringBeskrivelse})]})]})]})]}):null,le=({onVilEndreSvar:e,frilans:t})=>t?n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(l,{id:"ArbeidsforholdOppsummering.Frilans"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(l,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.Oppstart"})}),n.jsx(a.Value,{children:E(t.oppstart)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"ArbeidsforholdOppsummering.JobberFremdelesSomFrilans"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.jobberFremdelesSomFrilans})})]})]})]}):null;se.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOppsummering"};ae.__docgenInfo={description:"",methods:[],displayName:"SelvstendigNæringsdrivendeOppsummering"};le.__docgenInfo={description:"",methods:[],displayName:"FrilansOppsummering"};const M=(e,t)=>je(e)?t.formatMessage({id:"LandOppsummering.IDag"}):E(e),lr=(e,t)=>Oe(e.fom).isAfter(t.fom,"day")?1:0,R=({utenlandsoppholdListe:e})=>{const t=C();return n.jsx(a.Answers,{children:e.sort(lr).map(s=>n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:be.getName(s.landkode,"nb")}),n.jsx(a.Value,{children:n.jsx(l,{id:"LandOppsummering.periode",values:{fra:M(s.fom,t),til:M(s.tom,t)}})})]},s.landkode))})};R.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering",props:{utenlandsoppholdListe:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""}}};const T=({onVilEndreSvar:e,tidligereUtenlandsopphold:t,senereUtenlandsopphold:s})=>n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.tittel"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(l,{id:"EndreSvar"})})]}),n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel"})}),n.jsx(a.Value,{children:t.length>0?n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet"}):n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge"})})]})}),t.length>0&&n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label",values:{antall:t.length}})}),n.jsx(a.Value,{children:n.jsx(R,{utenlandsoppholdListe:t})})]})}),n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel"})}),n.jsx(a.Value,{children:s.length>0?n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet"}):n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge"})})]})}),s.length>0&&n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label",values:{antall:s.length}})}),n.jsx(a.Value,{children:n.jsx(R,{utenlandsoppholdListe:s})})]})})]});T.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummering",props:{tidligereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},senereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const oe=()=>(...e)=>(k("button-click")(...e),Promise.resolve()),fr={component:ie},w={args:{appName:"Engangsstønad",sendSøknad:oe(),cancelApplication:k("button-click"),onContinueLater:k("button-click"),goToPreviousStep:k("button-click"),onStepChange:k("button-click"),stepConfig:[{id:"SKAL_BO_I_UTLANDET_PATH",label:"Skal bo i utlandet",isSelected:!1},{id:"OPPSUMMERING_PATH",label:"Oppsummering",isSelected:!0}],children:n.jsx(T,{onVilEndreSvar:()=>{},senereUtenlandsopphold:[{fom:"2022-10-10",tom:"2023-05-05",landkode:"SE"}],tidligereUtenlandsopphold:[{fom:"2023-06-06",tom:"2023-10-10",landkode:"DE"}]})}},P={args:{...w.args,children:n.jsx(T,{onVilEndreSvar:()=>{},senereUtenlandsopphold:[],tidligereUtenlandsopphold:[]})}},N={args:{appName:"Foreldrepenger",sendSøknad:oe(),cancelApplication:k("button-click"),onContinueLater:k("button-click"),goToPreviousStep:k("button-click"),onStepChange:k("button-click"),stepConfig:[{id:"OPPSUMMERING_PATH",label:"Oppsummering",isSelected:!0}],ekstraSamtykketekst:"Bla bla bla",children:n.jsxs(n.Fragment,{children:[n.jsx(se,{arbeidsforhold:[],arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1},onVilEndreSvar:()=>{}}),n.jsx(ae,{egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:_.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,varigEndringBeskrivelse:"Beskrivelse av varig endring",varigEndringDato:"2021-01-01",varigEndringInntektEtterEndring:"10000"},onVilEndreSvar:()=>{}}),n.jsx(le,{frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},onVilEndreSvar:()=>{}})]})}};var q,z,$;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    appName: 'Engangsstønad',
    sendSøknad: promiseAction(),
    cancelApplication: action('button-click'),
    onContinueLater: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
    stepConfig: [{
      id: 'SKAL_BO_I_UTLANDET_PATH',
      label: 'Skal bo i utlandet',
      isSelected: false
    }, {
      id: 'OPPSUMMERING_PATH',
      label: 'Oppsummering',
      isSelected: true
    }],
    children: <BoIUtlandetOppsummering onVilEndreSvar={() => {}} senereUtenlandsopphold={[{
      fom: '2022-10-10',
      tom: '2023-05-05',
      landkode: 'SE'
    }]} tidligereUtenlandsopphold={[{
      fom: '2023-06-06',
      tom: '2023-10-10',
      landkode: 'DE'
    }]} />
  }
}`,...($=(z=w.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};var K,J,G;P.parameters={...P.parameters,docs:{...(K=P.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...HarBoddIUtlandetOgFødt.args,
    children: <BoIUtlandetOppsummering onVilEndreSvar={() => {}} senereUtenlandsopphold={[]} tidligereUtenlandsopphold={[]} />
  }
}`,...(G=(J=P.parameters)==null?void 0:J.docs)==null?void 0:G.source}}};var Y,W,Z;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    appName: 'Foreldrepenger',
    sendSøknad: promiseAction(),
    cancelApplication: action('button-click'),
    onContinueLater: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
    stepConfig: [{
      id: 'OPPSUMMERING_PATH',
      label: 'Oppsummering',
      isSelected: true
    }],
    ekstraSamtykketekst: 'Bla bla bla',
    children: <>
                <ArbeidsforholdOppsummering arbeidsforhold={[]} arbeidsforholdOgInntekt={{
        harJobbetSomFrilans: true,
        harJobbetSomSelvstendigNæringsdrivende: true,
        harHattAndreInntektskilder: false
      }} onVilEndreSvar={() => {}} />
                <SelvstendigNæringsdrivendeOppsummering egenNæring={{
        navnPåNæringen: 'Fiske',
        pågående: false,
        fom: '2018-01-01',
        tom: '2021-01-01',
        næringstype: Næringstype.FISKER,
        registrertILand: 'SE',
        registrertINorge: false,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
        varigEndringBeskrivelse: 'Beskrivelse av varig endring',
        varigEndringDato: '2021-01-01',
        varigEndringInntektEtterEndring: '10000'
      }} onVilEndreSvar={() => {}} />
                <FrilansOppsummering frilans={{
        jobberFremdelesSomFrilans: true,
        oppstart: '2019-01-01'
      }} onVilEndreSvar={() => {}} />
            </>
  }
}`,...(Z=(W=N.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};const vr=["HarBoddIUtlandetOgFødt","HarIkkeBoddIUtlandetOgIkkeFødt","ArbeidsforholdOgInntektOppsummering"];export{N as ArbeidsforholdOgInntektOppsummering,w as HarBoddIUtlandetOgFødt,P as HarIkkeBoddIUtlandetOgIkkeFødt,vr as __namedExportsOrder,fr as default};
