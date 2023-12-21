import{j as s}from"./jsx-runtime-vNq4Oc-g.js";import{r as d,R as o}from"./index-4g5l5LRQ.js";import{g as V}from"./guid-2lJjzOVx.js";import{B as A}from"./Back-zRBVOpwg.js";import{E as B}from"./Expand-Mp73MEIz.js";import{u as R}from"./useId-C5JUNp_l.js";import{c as j}from"./clsx.m-2Jv0kmJG.js";import{L}from"./Label-FRBbQv-X.js";import{B as S}from"./BodyShort-e28R0Rui.js";import{H as $}from"./Heading-47a5g-Kl.js";const w=d.createContext(null);var q=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const F=()=>o.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img","aria-hidden":!0,"aria-label":"Fullført"},o.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"})),H=d.forwardRef((t,l)=>{var{className:a,children:e,as:r="a",unsafe_index:i=0,completed:g=!1,interactive:c}=t,p=q(t,["className","children","as","unsafe_index","completed","interactive"]);const n=d.useContext(w);if(n===null)return console.error("<Stepper.Step> has to be used within <Stepper>"),null;const{activeStep:u}=n,m=c??(n==null?void 0:n.interactive),v=m?r:"div";return o.createElement(v,Object.assign({},p,{"aria-current":u===i,ref:l,className:j("navds-stepper__step",a,{"navds-stepper__step--active":u===i,"navds-stepper__step--behind":u>i,"navds-stepper__step--non-interactive":!m,"navds-stepper__step--completed":g}),onClick:_=>{var f;m&&n.onStepChange(i+1),(f=p==null?void 0:p.onClick)===null||f===void 0||f.call(p,_)}}),g?o.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},o.createElement(F,null)):o.createElement(L,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},i+1),o.createElement(L,{as:"span",className:"navds-stepper__content"},e))}),z=H;var G=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const E=d.forwardRef((t,l)=>{var{children:a,className:e,activeStep:r,orientation:i="vertical",onStepChange:g=()=>{},interactive:c=!0}=t,p=G(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return r=r-1,o.createElement("ol",Object.assign({},p,{ref:l,className:j("navds-stepper",i==="horizontal"?"navds-stepper--horizontal":"",e)}),o.createElement(w.Provider,{value:{activeStep:r,onStepChange:g,lastIndex:o.Children.count(a),orientation:i,interactive:c}},o.Children.map(a,(n,u)=>{var m,v,_,f,h;return o.createElement("li",{className:j("navds-stepper__item",{"navds-stepper__item--behind":r>u,"navds-stepper__item--completed":o.isValidElement(n)&&((m=n==null?void 0:n.props)===null||m===void 0?void 0:m.completed),"navds-stepper__item--non-interactive":o.isValidElement(n)&&!((_=(v=n==null?void 0:n.props)===null||v===void 0?void 0:v.interactive)!==null&&_!==void 0?_:c)}),key:u+((h=(f=a==null?void 0:a.toString)===null||f===void 0?void 0:f.call(a))!==null&&h!==void 0?h:"")},o.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),o.isValidElement(n)?o.cloneElement(n,Object.assign(Object.assign({},n.props),{unsafe_index:u})):n,o.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))})))});E.Step=z;const C=E;var T=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const M=d.forwardRef((t,l)=>{var{title:a,titleId:e}=t,r=T(t,["title","titleId"]);let i=R();return i=a?e||"title-"+i:void 0,d.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:l,"aria-labelledby":i},r),a?d.createElement("title",{id:i},a):null,d.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m12 6.586 7.707 7.707-1.414 1.414L12 9.414l-6.293 6.293-1.414-1.414L12 6.586Z",fill:"currentColor"}))}),Z=M,D={showAllStepsLabel:"Vis alle steg",goToPreviousStepLabel:"Gå til forrige steg",allStepsSectionAriaLabel:"Alle steg",navigasjonAriaLabel:"Navigasjon i søknaden",stepProgressLabelFunc:(t,l)=>`Steg ${t} av ${l}`},x=({steps:t,currentStepIndex:l,allStepsHeader:a,allStepsFooter:e,labels:r=D,titleHeadingLevel:i="1",includeBackLink:g=!1,setFocusOnHeadingOnMount:c=!0,onStepSelect:p})=>{const[n,u]=d.useState(!1),m=t[l],v=l+1,_=t.length,f=100/_*v,h=V(),P=b=>{p&&p(t[b-1])},I=()=>{p&&p(t[l-1])},N=s.jsx(S,{as:"div",children:r.stepProgressLabelFunc(v,_)}),O=p!==void 0&&g===!0,k=O?s.jsx("div",{className:"progressStepper__heading__stepInfo",children:N}):void 0,y=d.useRef(null);return d.useEffect(()=>{c&&y.current&&y.current.focus()},[c]),s.jsxs("div",{className:"progressStepper",children:[s.jsx("div",{className:"progressStepper__heading",children:s.jsxs($,{tabIndex:-1,size:"medium",level:i,className:"progressStepper__heading__title",ref:y,children:[k,m.label]})}),s.jsx("div",{className:"progressStepper__progressBarWrapper",role:"presentation","aria-hidden":!0,children:s.jsx("div",{className:"progressStepper__progressBar",children:s.jsx("div",{className:"progressStepper__progressBar__progress",style:{width:`${f}%`}})})}),s.jsxs("nav",{"aria-label":r.navigasjonAriaLabel,children:[s.jsxs("div",{className:"progressStepper__stepsInfo",children:[O?s.jsx(S,{children:l>0&&s.jsxs("button",{type:"button",onClick:I,className:"navds-read-more__button navds-body-short progressStepper__backLink",children:[s.jsx(A,{className:"progressStepper__backLink__icon","aria-hidden":!0}),r.goToPreviousStepLabel]})}):s.jsx(s.Fragment,{children:N}),s.jsxs("button",{type:"button",className:"navds-read-more__button navds-body-short","aria-controls":h,"aria-expanded":n,onClick:()=>{u(!n)},children:[n===!1&&s.jsx(B,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0}),n&&s.jsx(Z,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0})]})]}),s.jsx("div",{id:h,"aria-hidden":n===!1,"aria-live":"polite",children:n&&s.jsxs("section",{className:"progressStepper__allSteps","aria-label":r.allStepsSectionAriaLabel,children:[a&&s.jsx(S,{as:"div",className:"progressStepper__allSteps__header",children:a}),s.jsx(C,{activeStep:v,onStepChange:p?P:void 0,children:t.map(b=>s.jsx(C.Step,{completed:b.completed,interactive:p!==void 0&&b.completed===!0,children:b.label},b.id))}),e&&s.jsx(S,{as:"div",className:"progressStepper__allSteps__footer",children:e})]})})]})]})},ae=x;try{x.displayName="ProgressStepper",x.__docgenInfo={description:"",displayName:"ProgressStepper",props:{steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"ProgressStep[]"}},currentStepIndex:{defaultValue:null,description:"",name:"currentStepIndex",required:!0,type:{name:"number"}},labels:{defaultValue:{value:`{
    showAllStepsLabel: 'Vis alle steg',
    goToPreviousStepLabel: 'Gå til forrige steg',
    allStepsSectionAriaLabel: 'Alle steg',
    navigasjonAriaLabel: 'Navigasjon i søknaden',
    stepProgressLabelFunc: (currentStep, totalSteps) => \`Steg \${currentStep} av \${totalSteps}\`,
}`},description:"",name:"labels",required:!1,type:{name:"Labels"}},titleHeadingLevel:{defaultValue:{value:"1"},description:"",name:"titleHeadingLevel",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'}]}},allStepsHeader:{defaultValue:null,description:"",name:"allStepsHeader",required:!1,type:{name:"ReactNode"}},allStepsFooter:{defaultValue:null,description:"",name:"allStepsFooter",required:!1,type:{name:"ReactNode"}},includeBackLink:{defaultValue:{value:"false"},description:"",name:"includeBackLink",required:!1,type:{name:"boolean"}},setFocusOnHeadingOnMount:{defaultValue:{value:"true"},description:"",name:"setFocusOnHeadingOnMount",required:!1,type:{name:"boolean"}},onStepSelect:{defaultValue:null,description:"",name:"onStepSelect",required:!1,type:{name:"((step: ProgressStep) => void)"}}}}}catch{}export{ae as P};
