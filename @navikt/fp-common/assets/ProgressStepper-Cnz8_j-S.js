import{j as s}from"./jsx-runtime-_e34SzbC.js";import{r as u,R as o}from"./index-DVXBtNgz.js";import{g as k}from"./guid-CsArkN6i.js";import{L as C,B as h,H as I}from"./Label-CZT6yrnL.js";import{S as R}from"./Back-IiENdH20.js";import{S as A}from"./Expand-Db2uFZzY.js";import{u as T}from"./useId-B9DgiJ2s.js";import{c as x}from"./clsx-B-dksMZM.js";import{c as B}from"./composeEventHandlers-DeH74NdU.js";import{c as q}from"./create-context-DH-ArewY.js";const[V,$]=q({hookName:"useStepperContext",providerName:"StepperContextProvider",name:"StepperContext",errorMessage:"<Stepper.Step> has to be used within <Stepper>"});var H=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const F=u.forwardRef((t,l)=>{var{className:a,children:e,as:r="a",completed:i=!1,interactive:f,onClick:g}=t,p=H(t,["className","children","as","completed","interactive","onClick"]);const n=$(),{activeStep:c}=n,d=f??(n==null?void 0:n.interactive),m=d?r:"div",v=()=>{d&&n.onStepChange(n.index+1)};return o.createElement(m,Object.assign({},p,{"aria-current":c===n.index?"step":void 0,ref:l,className:x("navds-stepper__step",a,{"navds-stepper__step--active":c===n.index,"navds-stepper__step--behind":c>n.index,"navds-stepper__step--non-interactive":!d,"navds-stepper__step--completed":i}),onClick:B(g,v)}),i?o.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},o.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"presentation","aria-hidden":!0},o.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"}))):o.createElement(C,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},n.index+1),o.createElement(C,{as:"span",className:"navds-stepper__content"},e))});var z=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const y=u.forwardRef((t,l)=>{var{children:a,className:e,activeStep:r,orientation:i="vertical",onStepChange:f=()=>{},interactive:g=!0}=t,p=z(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return r=r-1,o.createElement("ol",Object.assign({},p,{ref:l,className:x("navds-stepper",i==="horizontal"?"navds-stepper--horizontal":"",e)}),o.Children.map(a,(n,c)=>{var d,m,v;const S=o.isValidElement(n)?n.props:{};return o.createElement("li",{className:x("navds-stepper__item",{"navds-stepper__item--behind":r>c,"navds-stepper__item--completed":S.completed,"navds-stepper__item--non-interactive":(d=S.interactive)!==null&&d!==void 0?d:g}),key:c+((v=(m=a==null?void 0:a.toString)===null||m===void 0?void 0:m.call(a))!==null&&v!==void 0?v:"")},o.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),o.createElement(V,{interactive:g,activeStep:r,lastIndex:o.Children.count(a),index:c,onStepChange:f,orientation:i},n),o.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))}))});y.Step=F;var G=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const M=u.forwardRef((t,l)=>{var{title:a,titleId:e}=t,r=G(t,["title","titleId"]);let i=T();return i=a?e||"title-"+i:void 0,u.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:l,"aria-labelledby":i},r),a?u.createElement("title",{id:i},a):null,u.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m12 6.586 7.707 7.707-1.414 1.414L12 9.414l-6.293 6.293-1.414-1.414L12 6.586Z",fill:"currentColor"}))}),Z={showAllStepsLabel:"Vis alle steg",goToPreviousStepLabel:"Gå til forrige steg",allStepsSectionAriaLabel:"Alle steg",navigasjonAriaLabel:"Navigasjon i søknaden",stepProgressLabelFunc:(t,l)=>`Steg ${t} av ${l}`},O=({steps:t,currentStepIndex:l,allStepsHeader:a,allStepsFooter:e,labels:r=Z,titleHeadingLevel:i="1",includeBackLink:f=!1,setFocusOnHeadingOnMount:g=!0,onStepSelect:p})=>{const[n,c]=u.useState(!1),d=t[l],m=l+1,v=t.length,S=100/v*m,j=k(),L=_=>{p&&p(t[_-1])},P=()=>{p&&p(t[l-1])},N=s.jsx(h,{as:"div",children:r.stepProgressLabelFunc(m,v)}),w=p!==void 0&&f===!0,E=w?s.jsx("div",{className:"progressStepper__heading__stepInfo",children:N}):void 0,b=u.useRef(null);return u.useEffect(()=>{g&&b.current&&b.current.focus()},[g]),s.jsxs("div",{className:"progressStepper",children:[s.jsx("div",{className:"progressStepper__heading",children:s.jsxs(I,{tabIndex:-1,size:"medium",level:i,className:"progressStepper__heading__title",ref:b,children:[E,d.label]})}),s.jsx("div",{className:"progressStepper__progressBarWrapper",role:"presentation","aria-hidden":!0,children:s.jsx("div",{className:"progressStepper__progressBar",children:s.jsx("div",{className:"progressStepper__progressBar__progress",style:{width:`${S}%`}})})}),s.jsxs("nav",{"aria-label":r.navigasjonAriaLabel,children:[s.jsxs("div",{className:"progressStepper__stepsInfo",children:[w?s.jsx(h,{children:l>0&&s.jsxs("button",{type:"button",onClick:P,className:"navds-read-more__button navds-body-short progressStepper__backLink",children:[s.jsx(R,{className:"progressStepper__backLink__icon","aria-hidden":!0}),r.goToPreviousStepLabel]})}):s.jsx(s.Fragment,{children:N}),s.jsxs("button",{type:"button",className:"navds-read-more__button navds-body-short","aria-controls":j,"aria-expanded":n,"aria-label":n?"Skjul stegene":"Se alle steg",onClick:()=>{c(!n)},children:[n===!1&&s.jsx(A,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0}),n&&s.jsx(M,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0})]})]}),s.jsx("div",{id:j,"aria-hidden":n===!1,"aria-live":"polite",children:n&&s.jsxs("section",{className:"progressStepper__allSteps","aria-label":r.allStepsSectionAriaLabel,children:[a&&s.jsx(h,{as:"div",className:"progressStepper__allSteps__header",children:a}),s.jsx(y,{activeStep:m,onStepChange:p?L:void 0,children:t.map(_=>s.jsx(y.Step,{completed:_.completed,interactive:p!==void 0&&_.completed===!0,children:_.label},_.id))}),e&&s.jsx(h,{as:"div",className:"progressStepper__allSteps__footer",children:e})]})})]})]})},re=O;O.__docgenInfo={description:"",methods:[],displayName:"ProgressStepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"ProgressStep"}],raw:"ProgressStep[]"},description:""},currentStepIndex:{required:!0,tsType:{name:"number"},description:""},labels:{required:!1,tsType:{name:"Labels"},description:"",defaultValue:{value:`{
    showAllStepsLabel: 'Vis alle steg',
    goToPreviousStepLabel: 'Gå til forrige steg',
    allStepsSectionAriaLabel: 'Alle steg',
    navigasjonAriaLabel: 'Navigasjon i søknaden',
    stepProgressLabelFunc: (currentStep, totalSteps) => \`Steg \${currentStep} av \${totalSteps}\`,
}`,computed:!1}},titleHeadingLevel:{required:!1,tsType:{name:"union",raw:"'1' | '2'",elements:[{name:"literal",value:"'1'"},{name:"literal",value:"'2'"}]},description:"",defaultValue:{value:"'1'",computed:!1}},allStepsHeader:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},allStepsFooter:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},includeBackLink:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},setFocusOnHeadingOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onStepSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: ProgressStep) => void",signature:{arguments:[{type:{name:"ProgressStep"},name:"step"}],return:{name:"void"}}},description:""}}};export{re as P};
