import{j as n}from"./jsx-runtime-QvZ8i92b.js";import{v as ue}from"./v4-CQkTLCs1.js";import{u as me,a as L,c as b,o as I,L as Q,B as F,E as X,b as ee,d as pe,H as ge,S as fe,V as U,e as ve,M as d,f as E,i as he,g as be,h as je}from"./VeiviserPage-D_Bk-Ynh.js";import{r as m,R as l}from"./index-uubelm5h.js";import{u as R}from"./index-Cp2k7tly.js";import"./index-D3eZ-H7s.js";import"./index-CfOt2XX2.js";const{addons:Oe}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:ye}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:H}=__STORYBOOK_MODULE_GLOBAL__;var xe="storybook/actions",ke=`${xe}/action-event`,Se={depth:10,clearOnStoryChange:!0,limit:50},re=(e,t)=>{let s=Object.getPrototypeOf(e);return!s||t(s)?s:re(s,t)},Ee=e=>!!(typeof e=="object"&&e&&re(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),Ae=e=>{if(Ee(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let s=Object.getOwnPropertyDescriptor(t,"view"),r=s==null?void 0:s.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...s,value:Object.create(r.constructor.prototype)}),t}return e},_e=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?ue():Date.now().toString(36)+Math.random().toString(36).substring(2);function k(e,t={}){let s={...Se,...t},r=function(...i){var j,v;if(t.implicit){let y=(j="__STORYBOOK_PREVIEW__"in H?H.__STORYBOOK_PREVIEW__:void 0)==null?void 0:j.storyRenders.find(h=>h.phase==="playing"||h.phase==="rendering");if(y){let h=!((v=window==null?void 0:window.FEATURES)!=null&&v.disallowImplicitActionsInRenderV8),O=new ye({phase:y.phase,name:e,deprecated:h});if(h)console.warn(O);else throw O}}let c=Oe.getChannel(),g=_e(),f=5,o=i.map(Ae),u=i.length>1?o:o[0],p={id:g,count:0,data:{name:e,args:u},options:{...s,maxDepth:f+(s.depth||3),allowFunction:s.allowFunction||!1}};c.emit(ke,p)};return r.isAction=!0,r.implicit=t.implicit,r}var _=(e=>(e.FISKER="FISKE",e.JORDBRUK="JORDBRUK_SKOGBRUK",e.DAGMAMMA="DAGMAMMA",e.ANNET="ANNEN",e))(_||{});const we=e=>e.harHattAndreInntektskilder!==void 0;var Ie=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Pe=m.forwardRef((e,t)=>{var{title:s,titleId:r}=e,i=Ie(e,["title","titleId"]);let c=me();return c=s?r||"title-"+c:void 0,m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":c},i),s?m.createElement("title",{id:c},s):null,m.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25m3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25zM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13",clipRule:"evenodd"}))}),ne=({readOnly:e,nativeReadOnly:t=!0})=>e?l.createElement(Pe,Object.assign({},t?{"aria-hidden":!0}:{title:"readonly"},{className:"navds-form-field__readonly-icon"})):null,V=m.createContext(null),B=(e,t)=>{var s,r,i;const{size:c,error:g,errorId:f}=e,o=m.useContext(V),u=L(),p=(s=e.id)!==null&&s!==void 0?s:`${t}-${u}`,j=f??`${t}-error-${u}`,v=`${t}-description-${u}`,y=(o==null?void 0:o.disabled)||e.disabled,h=((o==null?void 0:o.readOnly)||e.readOnly)&&!y||void 0,O=!y&&!h&&!!(g||o!=null&&o.error),x=!y&&!h&&!!g&&typeof g!="boolean",A=Object.assign({},O?{"aria-invalid":!0}:{});return e!=null&&e.required,{showErrorMsg:x,hasError:O,errorId:j,inputDescriptionId:v,size:(r=c??(o==null?void 0:o.size))!==null&&r!==void 0?r:"medium",readOnly:h,inputProps:Object.assign(Object.assign({id:p},A),{"aria-describedby":b(e["aria-describedby"],{[v]:!!(e!=null&&e.description)&&typeof(e==null?void 0:e.description)=="string",[j]:x,[(i=o==null?void 0:o.errorId)!==null&&i!==void 0?i:""]:O&&!!(o!=null&&o.error)})||void 0,disabled:y})}},Ne=e=>{const t=B(e,"fieldset"),{inputProps:s}=t;return Object.assign(Object.assign({},t),{inputProps:{"aria-invalid":s["aria-invalid"],"aria-describedby":s["aria-describedby"]}})};var Le=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Ve=m.forwardRef((e,t)=>{var s,r,i;const{inputProps:c,errorId:g,showErrorMsg:f,hasError:o,size:u,readOnly:p,inputDescriptionId:j}=Ne(e),v=m.useContext(V),{children:y,className:h,errorPropagation:O=!0,legend:x,description:A,hideLegend:D,nativeReadOnly:oe=!0}=e,ce=Le(e,["children","className","errorPropagation","legend","description","hideLegend","nativeReadOnly"]);return l.createElement(V.Provider,{value:{error:O?(s=e.error)!==null&&s!==void 0?s:v==null?void 0:v.error:void 0,errorId:b({[g]:f,[(r=v==null?void 0:v.errorId)!==null&&r!==void 0?r:""]:!!(v!=null&&v.error)}),size:u,disabled:(i=e.disabled)!==null&&i!==void 0?i:!1,readOnly:p}},l.createElement("fieldset",Object.assign({},I(ce,["errorId","error","size","readOnly"]),I(c,["aria-describedby","aria-invalid"]),{ref:t,className:b(h,"navds-fieldset",`navds-fieldset--${u}`,{"navds-fieldset--error":o,"navds-fieldset--readonly":p})}),l.createElement(Q,{size:u,as:"legend",className:b("navds-fieldset__legend",{"navds-sr-only":!!D})},l.createElement(ne,{readOnly:p,nativeReadOnly:oe}),x),!!A&&l.createElement(F,{className:b("navds-fieldset__description",{"navds-sr-only":!!D}),id:j,size:u??"medium",as:"div"},e.description),y,l.createElement("div",{id:g,"aria-relevant":"additions removals","aria-live":"polite",className:"navds-fieldset__error"},f&&l.createElement(X,{size:u},e.error))))});var Fe=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const te=m.createContext(null);m.forwardRef((e,t)=>{var s,r,{value:i,defaultValue:c,onChange:g=()=>{},children:f,className:o}=e,u=Fe(e,["value","defaultValue","onChange","children","className"]);const p=m.useContext(V),[j,v]=m.useState(c??[]),y=h=>{const O=i??j,x=O.includes(h)?O.filter(A=>A!==h):[...O,h];i===void 0&&v(x),g(x)};return l.createElement(Ve,Object.assign({},u,{ref:t,className:b(o,"navds-checkbox-group",`navds-checkbox-group--${(r=(s=u.size)!==null&&s!==void 0?s:p==null?void 0:p.size)!==null&&r!==void 0?r:"medium"}`),nativeReadOnly:!1}),l.createElement(te.Provider,{value:{value:i,defaultValue:c,toggleValue:y}},l.createElement("div",{className:"navds-checkboxes"},f)))});var Ce=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Re=e=>{const t=m.useContext(te),s=B(I(e,["description","children"]),"checkbox"),{inputProps:r,readOnly:i}=s,c=Ce(s,["inputProps","readOnly"]);return t&&(e.checked&&console.warn("`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."),e.value===void 0&&console.warn("A <Checkbox> element within a <CheckboxGroup> requires a `value` property.")),Object.assign(Object.assign({},c),{readOnly:i,nested:!!t,inputProps:Object.assign(Object.assign({},r),{checked:t!=null&&t.value?t.value.includes(e.value):e.checked,defaultChecked:t!=null&&t.defaultValue?t.defaultValue.includes(e.value):e.defaultChecked,onChange:g=>{i||(e.onChange&&e.onChange(g),t&&t.toggleValue(e.value))},onClick:g=>{var f;if(i){g.preventDefault();return}(f=e==null?void 0:e.onClick)===null||f===void 0||f.call(e,g)}})})},Be=m.forwardRef((e,t)=>{const{inputProps:s,hasError:r,size:i,readOnly:c,nested:g}=Re(e),f=L(),o=L();return l.createElement("div",{className:b(e.className,"navds-checkbox",`navds-checkbox--${i}`,{"navds-checkbox--error":r,"navds-checkbox--disabled":s.disabled,"navds-checkbox--readonly":c})},l.createElement("input",Object.assign({},I(e,["children","size","error","description","hideLabel","indeterminate","errorId","readOnly"]),I(s,["aria-invalid"]),{type:"checkbox",className:"navds-checkbox__input","aria-checked":e.indeterminate?"mixed":s.checked,ref:u=>{var p;u&&(u.indeterminate=(p=e.indeterminate)!==null&&p!==void 0?p:!1),typeof t=="function"?t(u):t!=null&&(t.current=u)},"aria-labelledby":b(f,!!e["aria-labelledby"]&&e["aria-labelledby"],{[o]:e.description})})),l.createElement("label",{htmlFor:s.id,className:"navds-checkbox__label"},l.createElement("span",{className:"navds-checkbox__icon"},l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"0.8125rem",height:"0.625rem",viewBox:"0 0 13 10",fill:"none",focusable:!1,role:"img","aria-hidden":!0},l.createElement("path",{d:"M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z",fill:"currentColor"}))),l.createElement("span",{className:b("navds-checkbox__content",{"navds-sr-only":e.hideLabel})},l.createElement(F,{as:"span",id:f,size:i,className:"navds-checkbox__label-text","aria-hidden":!0},!g&&l.createElement(ne,{readOnly:c,nativeReadOnly:!1}),e.children),e.description&&l.createElement(F,{as:"span",id:o,size:i,className:"navds-form-field__subdescription navds-checkbox__description","aria-hidden":!0},e.description))))});var Te=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const De=m.forwardRef((e,t)=>{var{className:s,children:r,label:i}=e,c=Te(e,["className","children","label"]);const{errorId:g,showErrorMsg:f,hasError:o,size:u,inputProps:p}=B(c,"confirmation-panel"),j=L();return l.createElement("div",{className:b("navds-confirmation-panel","navds-form-field",s,{"navds-confirmation-panel--small":u==="small","navds-confirmation-panel--error":o,"navds-confirmation-panel--checked":!!c.checked})},l.createElement("div",{className:"navds-confirmation-panel__inner"},r&&l.createElement(ee,{size:c.size,className:"navds-confirmation-panel__content",id:`confirmation-panel-${j}`,as:"div"},r),l.createElement(Be,Object.assign({ref:t},c,p,{"aria-describedby":b(p["aria-describedby"],r&&`confirmation-panel-${j}`),error:o,size:u}),i)),l.createElement("div",{className:"navds-form-field__error",id:g,role:"alert"},f&&l.createElement(X,{size:u},c.error)))});var Ue=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const He=l.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Ue(e,["children","className"]);return l.createElement("div",Object.assign({ref:t},i,{className:b("navds-form-summary__answer",r)}),s)});var Me=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const qe=m.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Me(e,["children","className"]);return l.createElement("dl",Object.assign({ref:t},i,{className:b("navds-form-summary__answers",r)}),s)});var ze=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const $e=m.forwardRef((e,t)=>{var{children:s="Endre svar",className:r,as:i="a"}=e,c=ze(e,["children","className","as"]);return l.createElement(pe,Object.assign({ref:t,as:i},c,{className:b("navds-form-summary__edit",r)}),s)});var Ke=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Je=m.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Ke(e,["children","className"]);return l.createElement("header",Object.assign({ref:t},i,{className:b("navds-form-summary__header",r)}),s)}),Ge=m.forwardRef((e,t)=>l.createElement(ge,Object.assign({ref:t},e,{size:"medium"})));var Ye=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const We=m.forwardRef((e,t)=>{var{children:s}=e,r=Ye(e,["children"]);return l.createElement(Q,Object.assign({ref:t},r,{as:"dt"}),s)});var Ze=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const Qe=m.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Ze(e,["children","className"]);return l.createElement(ee,Object.assign({ref:t},i,{as:"dd",className:b("navds-form-summary__value",r)}),s)});var Xe=function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(s[r[i]]=e[r[i]]);return s};const a=m.forwardRef((e,t)=>{var{children:s,className:r}=e,i=Xe(e,["children","className"]);return l.createElement("div",Object.assign({ref:t},i,{className:b("navds-form-summary",r)}),s)});a.Header=Je;a.Heading=Ge;a.EditLink=$e;a.Answers=qe;a.Answer=He;a.Label=We;a.Value=Qe;const er=e=>e.charAt(0).toUpperCase()+e.slice(1),rr=["og","and","i","in"],nr=["as"],tr=e=>{if(e)return e.toLowerCase().split(" ").map(t=>nr.includes(t)?t.toUpperCase():rr.includes(t)?t:er(t)).join(" ")},ir=(e,t,s)=>{if(t==="Engangsstønad")return e.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(t==="Foreldrepenger"&&s!==void 0)return e.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(s);if(t==="Svangerskapspenger")return e.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${t} not supported`)},ie=({sendSøknad:e,cancelApplication:t,onContinueLater:s,goToPreviousStep:r,onStepChange:i,stepConfig:c,children:g,appName:f,ekstraSamtykketekst:o})=>{const u=R(),[p,j]=m.useState(!1),[v,y]=m.useState(!1),[h,O]=m.useState(!1),x=()=>{p?(y(!0),e()):O(!0)};return n.jsx(fe,{onCancel:t,onContinueLater:s,steps:c,onStepChange:i,noFieldsRequired:!0,children:n.jsxs(U,{gap:"10",children:[n.jsx(U,{gap:"3",children:g}),n.jsx(De,{label:ir(u,f,o),onChange:()=>j(A=>!A),checked:p,error:h&&!p&&u.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),n.jsx(ve,{goToPreviousStep:r,nextButtonOnClick:x,isDisabledAndLoading:v,isSendButton:!0})]})})};ie.__docgenInfo={description:"",methods:[],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const se=({arbeidsforholdOgInntekt:e,arbeidsforhold:t,onVilEndreSvar:s})=>{if(!e)return null;const r=we(e);return n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(d,{id:"ArbeidsforholdOppsummering.Arbeid"})}),n.jsx(a.EditLink,{onClick:s,children:n.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.OmArbeidsforhold"})}),n.jsxs(a.Value,{children:[t.length===0&&n.jsx(d,{id:"ArbeidsforholdOppsummering.IngenRegistrerteArbeidsforhold"}),t.length>0&&n.jsx(a.Answers,{children:t.map(i=>n.jsx(sr,{arbeidsforhold:i},i.arbeidsgiverId))})]})]}),n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[r&&n.jsx(d,{id:"ArbeidsforholdOppsummering.HarDuJobbetSomFrilansFp"}),!r&&n.jsx(d,{id:"ArbeidsforholdOppsummering.HarDuJobbetSomFrilans"})]}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harJobbetSomFrilans})})]}),n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[r&&n.jsx(d,{id:"ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivendeFp"}),!r&&n.jsx(d,{id:"ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivende"})]}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harJobbetSomSelvstendigNæringsdrivende})})]}),!r&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.HarHattArbeidIUtlandet"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harHattArbeidIUtlandet})})]}),r&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.HarHattAndreInntektskilder"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:e.harHattAndreInntektskilder})})]})]})]})},S=({ja:e})=>e?n.jsx(d,{id:"ja"}):n.jsx(d,{id:"nei"}),sr=({arbeidsforhold:e})=>{const t=R();return n.jsxs(a.Answer,{children:[n.jsxs(a.Label,{children:[tr(e.arbeidsgiverNavn),","," ",e.stillingsprosent,"%"]}),n.jsxs(a.Value,{children:["Org nr: ",e.arbeidsgiverId,","," ",n.jsx(d,{id:"ArbeidsforholdFormSummaryValue.arbeidsforhold.periode",values:{fom:E(e.fom),tom:e.tom?E(e.tom):t.formatMessage({id:"pågående"})}})]})]})},ae=({onVilEndreSvar:e,egenNæring:t})=>t?n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(d,{id:"ArbeidsforholdOppsummering.Næring"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype"})}),n.jsx(a.Value,{children:(()=>{switch(t==null?void 0:t.næringstype){case _.FISKER:return n.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.fiske"});case _.DAGMAMMA:return n.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.dagmamma"});case _.JORDBRUK:return n.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.jordbrukSkogbruk"});case _.ANNET:return n.jsx(d,{id:"ArbeidsforholdOppsummering.næringstype.annen"});default:return null}})()})]}),t.navnPåNæringen&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.navnPåNæring"})}),n.jsx(a.Value,{children:t.navnPåNæringen})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.erNæringenRegistrertINorge"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.registrertINorge})})]}),t.organisasjonsnummer&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.orgnr"})}),n.jsx(a.Value,{children:t.organisasjonsnummer})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.næring.fom"})}),n.jsx(a.Value,{children:E(t.fom)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.næring.pågående"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.pågående})})]}),!t.pågående&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.næring.tom"})}),n.jsx(a.Value,{children:E(t.tom)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.næringsinntekt"})}),n.jsx(a.Value,{children:t.næringsinntekt||"-"})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.blittYrkesaktivSiste3År"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:!!t.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene})})]}),t.oppstartsdato&&n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.yrkesaktivDato"})}),n.jsx(a.Value,{children:E(t.oppstartsdato)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.egenNæringHattVarigEndringDeSiste4Årene"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.hattVarigEndringAvNæringsinntektSiste4Kalenderår||!1})})]}),t.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&t.varigEndringDato&&n.jsxs(n.Fragment,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.egenNæringVarigEndringDato"})}),n.jsx(a.Value,{children:E(t.varigEndringDato)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.egenNæringVarigEndringInntektEtterEndring"})}),n.jsx(a.Value,{children:t.varigEndringInntektEtterEndring})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.varigEndringBeskrivelse.label"})}),n.jsx(a.Value,{children:t.varigEndringBeskrivelse})]})]})]})]}):null,de=({onVilEndreSvar:e,frilans:t})=>t?n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(d,{id:"ArbeidsforholdOppsummering.Frilans"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(d,{id:"ArbeidsforholdOppsummering.EndreSvar"})})]}),n.jsxs(a.Answers,{children:[n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.Oppstart"})}),n.jsx(a.Value,{children:E(t.oppstart)})]}),n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"ArbeidsforholdOppsummering.JobberFremdelesSomFrilans"})}),n.jsx(a.Value,{children:n.jsx(S,{ja:t.jobberFremdelesSomFrilans})})]})]})]}):null;se.__docgenInfo={description:"",methods:[],displayName:"ArbeidsforholdOppsummering"};ae.__docgenInfo={description:"",methods:[],displayName:"SelvstendigNæringsdrivendeOppsummering"};de.__docgenInfo={description:"",methods:[],displayName:"FrilansOppsummering"};const M=(e,t)=>be(e)?t.formatMessage({id:"LandOppsummering.IDag"}):E(e),ar=(e,t)=>je(e.fom).isAfter(t.fom,"day")?1:0,C=({utenlandsoppholdListe:e})=>{const t=R();return n.jsx(a.Answers,{children:e.sort(ar).map(s=>n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:he.getName(s.landkode,"nb")}),n.jsx(a.Value,{children:n.jsx(d,{id:"LandOppsummering.periode",values:{fra:M(s.fom,t),til:M(s.tom,t)}})})]},s.landkode))})};C.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering",props:{utenlandsoppholdListe:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""}}};const T=({onVilEndreSvar:e,tidligereUtenlandsopphold:t,senereUtenlandsopphold:s})=>n.jsxs(a,{children:[n.jsxs(a.Header,{children:[n.jsx(a.Heading,{level:"2",children:n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.tittel"})}),n.jsx(a.EditLink,{onClick:e,children:n.jsx(d,{id:"EndreSvar"})})]}),n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel"})}),n.jsx(a.Value,{children:t.length>0?n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet"}):n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge"})})]})}),t.length>0&&n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label",values:{antall:t.length}})}),n.jsx(a.Value,{children:n.jsx(C,{utenlandsoppholdListe:t})})]})}),n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel"})}),n.jsx(a.Value,{children:s.length>0?n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet"}):n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge"})})]})}),s.length>0&&n.jsx(a.Answers,{children:n.jsxs(a.Answer,{children:[n.jsx(a.Label,{children:n.jsx(d,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label",values:{antall:s.length}})}),n.jsx(a.Value,{children:n.jsx(C,{utenlandsoppholdListe:s})})]})})]});T.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummering",props:{tidligereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},senereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const le=()=>(...e)=>(k("button-click")(...e),Promise.resolve()),gr={component:ie},w={args:{appName:"Engangsstønad",sendSøknad:le(),cancelApplication:k("button-click"),onContinueLater:k("button-click"),goToPreviousStep:k("button-click"),onStepChange:k("button-click"),stepConfig:[{id:"SKAL_BO_I_UTLANDET_PATH",label:"Skal bo i utlandet",isSelected:!1},{id:"OPPSUMMERING_PATH",label:"Oppsummering",isSelected:!0}],children:n.jsx(T,{onVilEndreSvar:()=>{},senereUtenlandsopphold:[{fom:"2022-10-10",tom:"2023-05-05",landkode:"SE"}],tidligereUtenlandsopphold:[{fom:"2023-06-06",tom:"2023-10-10",landkode:"DE"}]})}},P={args:{...w.args,children:n.jsx(T,{onVilEndreSvar:()=>{},senereUtenlandsopphold:[],tidligereUtenlandsopphold:[]})}},N={args:{appName:"Foreldrepenger",sendSøknad:le(),cancelApplication:k("button-click"),onContinueLater:k("button-click"),goToPreviousStep:k("button-click"),onStepChange:k("button-click"),stepConfig:[{id:"OPPSUMMERING_PATH",label:"Oppsummering",isSelected:!0}],ekstraSamtykketekst:"Bla bla bla",children:n.jsxs(n.Fragment,{children:[n.jsx(se,{arbeidsforhold:[],arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1},onVilEndreSvar:()=>{}}),n.jsx(ae,{egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:_.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,varigEndringBeskrivelse:"Beskrivelse av varig endring",varigEndringDato:"2021-01-01",varigEndringInntektEtterEndring:"10000"},onVilEndreSvar:()=>{}}),n.jsx(de,{frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},onVilEndreSvar:()=>{}})]})}};var q,z,$;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(Z=(W=N.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};const fr=["HarBoddIUtlandetOgFødt","HarIkkeBoddIUtlandetOgIkkeFødt","ArbeidsforholdOgInntektOppsummering"];export{N as ArbeidsforholdOgInntektOppsummering,w as HarBoddIUtlandetOgFødt,P as HarIkkeBoddIUtlandetOgIkkeFødt,fr as __namedExportsOrder,gr as default};
