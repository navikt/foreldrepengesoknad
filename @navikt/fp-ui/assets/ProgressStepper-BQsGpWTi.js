import{j as y}from"./jsx-runtime-Cw0GR0a5.js";import{r as m,R as s}from"./index-CTjT7uj6.js";import{H as P,V as N}from"./VStack-Bd1wS6ci.js";import{L as S,B as I,H as T}from"./Label-oPV7DuXz.js";import{c as C,B as k}from"./Button-DtEqrV14.js";import{u as M}from"./useControllableState-CZwrAZhD.js";import{c as g,u as R}from"./useId-BGzI-o9Y.js";import{c as x}from"./create-context-DOtOKOIE.js";import{S as E}from"./BasePrimitive-D4NMUMeT.js";import{u as w}from"./i18n.context-CjLN2Up4.js";import{S as z}from"./ChevronDown-Cwt6cPhU.js";var $=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const B=m.forwardRef((t,o)=>{var{size:n="medium",value:e=0,valueMax:r=100,"aria-labelledby":i,"aria-label":l,className:p,simulated:a}=t,c=$(t,["size","value","valueMax","aria-labelledby","aria-label","className","simulated"]);const u=100-Math.round(e)/r*100,d=m.useRef();d.current=a==null?void 0:a.onTimeout;const f=w("ProgressBar");return m.useEffect(()=>{if(a!=null&&a.seconds&&d.current){const v=setTimeout(d.current,a.seconds*1e3);return()=>clearTimeout(v)}},[a==null?void 0:a.seconds]),s.createElement("div",Object.assign({ref:o,className:g("navds-progress-bar",`navds-progress-bar--${n}`,p),"aria-valuemax":a!=null&&a.seconds?0:Math.round(r),"aria-valuenow":a!=null&&a.seconds?0:Math.round(e),"aria-valuetext":a!=null&&a.seconds?f("progressUnknown",{replacements:{seconds:Math.round(a==null?void 0:a.seconds)}}):f("progress",{replacements:{current:Math.round(e),max:Math.round(r)}}),role:"progressbar","aria-labelledby":i,"aria-label":l},c),s.createElement("div",{className:g("navds-progress-bar__foreground",{"navds-progress-bar__foreground--indeterminate":(a==null?void 0:a.seconds)!==void 0}),style:{"--__ac-progress-bar-simulated":(a==null?void 0:a.seconds)!==void 0?`${a==null?void 0:a.seconds}s`:void 0,"--__ac-progress-bar-translate":`-${u}%`}}))}),[L,q]=x({hookName:"useStepperContext",providerName:"StepperContextProvider",name:"StepperContext",errorMessage:"<Stepper.Step> has to be used within <Stepper>"});var H=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const A=m.forwardRef((t,o)=>{var{className:n,children:e,as:r="a",completed:i=!1,interactive:l,onClick:p}=t,a=H(t,["className","children","as","completed","interactive","onClick"]);const c=q(),{activeStep:u}=c,d=l??(c==null?void 0:c.interactive),f=d?r:"div",v=()=>{d&&c.onStepChange(c.index+1)};return s.createElement(f,Object.assign({},a,{"aria-current":u===c.index?"step":void 0,ref:o,className:g("navds-stepper__step",n,{"navds-stepper__step--active":u===c.index,"navds-stepper__step--behind":u>c.index,"navds-stepper__step--non-interactive":!d,"navds-stepper__step--completed":i}),onClick:C(p,v)}),i?s.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},s.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"presentation","aria-hidden":!0},s.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"}))):s.createElement(S,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},c.index+1),s.createElement(S,{as:"span",className:"navds-stepper__content"},e))});var V=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const h=m.forwardRef((t,o)=>{var{children:n,className:e,activeStep:r,orientation:i="vertical",onStepChange:l=()=>{},interactive:p=!0}=t,a=V(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return r=r-1,s.createElement("ol",Object.assign({},a,{ref:o,className:g("navds-stepper",i==="horizontal"?"navds-stepper--horizontal":"",e)}),s.Children.map(n,(c,u)=>{var d,f,v;const O=s.isValidElement(c)?c.props:{};return s.createElement("li",{className:g("navds-stepper__item",{"navds-stepper__item--behind":r>u,"navds-stepper__item--completed":O.completed,"navds-stepper__item--non-interactive":(d=O.interactive)!==null&&d!==void 0?d:p}),key:u+((v=(f=n==null?void 0:n.toString)===null||f===void 0?void 0:f.call(n))!==null&&v!==void 0?v:"")},s.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),s.createElement(L,{interactive:p,activeStep:r,lastIndex:s.Children.count(n),index:u,onStepChange:l,orientation:i},c),s.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))}))});h.Step=A;const[Y,j]=x({name:"CollapsibleContext",errorMessage:"<Collapsible.Trigger> and <Collapsible.Content> must be used within a <Collapsible>"});var F=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const D=m.forwardRef((t,o)=>{var{children:n,asChild:e}=t,r=F(t,["children","asChild"]);const i=j(),l=e?E:"div";return s.createElement(l,Object.assign({ref:o},r,{"data-state":i.state,hidden:!i.open,"aria-controls":i.open?i.triggerId:void 0,id:i.contentId}),i.lazy||i.open?n:null)});var U=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const X=m.forwardRef((t,o)=>{var{children:n,asChild:e,onClick:r}=t,i=U(t,["children","asChild","onClick"]);const l=j(),p=e?E:"button";return s.createElement(p,Object.assign({ref:o,type:"button","data-state":l.state,onClick:C(r,l.onOpenToggle),"aria-expanded":l.open},i,{id:l.triggerId,"aria-controls":l.open?l.contentId:void 0}),n)});var Z=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const b=m.forwardRef((t,o)=>{var{children:n,open:e,defaultOpen:r=!1,onOpenChange:i,lazy:l=!1}=t,p=Z(t,["children","open","defaultOpen","onOpenChange","lazy"]);const[a,c]=M({value:e,defaultValue:r,onChange:i}),u=R(),d=a?"open":"closed";return s.createElement(Y,{open:a,onOpenToggle:m.useCallback(()=>c(f=>!f),[c]),contentId:`collapsible-content-${u}`,triggerId:`collapsible-trigger-${u}`,lazy:l,state:d},s.createElement("div",Object.assign({ref:o,"data-state":d},p),n))});b.Trigger=X;b.Content=D;var G=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const _=m.forwardRef((t,o)=>{var{totalSteps:n,activeStep:e,open:r,onOpenChange:i,children:l,onStepChange:p,interactiveSteps:a,translations:c}=t,u=G(t,["totalSteps","activeStep","open","onOpenChange","children","onStepChange","interactiveSteps","translations"]);const d=w("FormProgress",c);return s.createElement("div",Object.assign({ref:o},u),s.createElement(B,{"aria-hidden":!0,value:e,valueMax:n,className:"navds-form-progress__bar"}),s.createElement(b,{lazy:!0,open:r,onOpenChange:i},s.createElement(P,{justify:"space-between",align:"center"},s.createElement(I,{as:"span"},d("step",{replacements:{activeStep:e,totalSteps:n}})),s.createElement(b.Trigger,{asChild:!0,"aria-expanded":void 0},s.createElement(k,{variant:"tertiary",size:"small",className:"navds-form-progress__button",icon:s.createElement(z,{"aria-hidden":!0})},s.createElement("span",{className:"navds-form-progress__btn-txt-hide"},d("hideAllSteps")),s.createElement("span",{className:"navds-form-progress__btn-txt-show"},d("showAllSteps"))))),s.createElement(b.Content,{className:"navds-form-progress__collapsible"},s.createElement("div",{className:"navds-form-progress__collapsible-content"},s.createElement("div",{className:"navds-form-progress__stepper"},s.createElement(h,{activeStep:e,onStepChange:p,interactive:a},l))))))});_.Step=h.Step;h.Step;const J=({steps:t,onStepChange:o,hideHeader:n=!1})=>{const e=t.findIndex(l=>l.isSelected),[r,i]=m.useState(e+1);if(e===-1)throw new Error("No selected step in step-config");return y.jsxs(N,{gap:"4",children:[!n&&y.jsx(T,{tabIndex:-1,size:"medium",level:"2",children:t[e].label}),y.jsx(_,{totalSteps:t.length,activeStep:r,onStepChange:l=>{i(l),o&&o(t[l-1].id)},interactiveSteps:!!o,children:t.map((l,p)=>y.jsx(_.Step,{href:"#",interactive:o&&p<e,children:l.label},l.id))})]})};J.__docgenInfo={description:"",methods:[],displayName:"ProgressStepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};export{J as P};
