import{j as s}from"./jsx-runtime-ffb262ed.js";import{r as u,R as o}from"./index-76fb7be0.js";import{g as V}from"./guid-c1767a53.js";import{B as A}from"./Back-3b16c8fb.js";import{E as B}from"./Expand-d819559b.js";import{u as R}from"./useId-b2ee2642.js";import{c as y}from"./clsx.m-1229b3e0.js";import{c as $}from"./composeEventHandlers-4d33bf7d.js";import{L as C}from"./Label-25b8f92d.js";import{B as S}from"./BodyShort-10a29dad.js";import{H as q}from"./Heading-4c0371fa.js";const E=u.createContext(null);var F=globalThis&&globalThis.__rest||function(t,n){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const T=()=>o.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img","aria-hidden":!0,"aria-label":"Fullført"},o.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"})),H=u.forwardRef((t,n)=>{var{className:a,children:e,as:r="a",unsafe_index:i=0,completed:_=!1,interactive:m,onClick:c}=t,l=F(t,["className","children","as","unsafe_index","completed","interactive","onClick"]);const p=u.useContext(E);if(p===null)return console.error("<Stepper.Step> has to be used within <Stepper>"),null;const{activeStep:v}=p,d=m??(p==null?void 0:p.interactive),f=d?r:"div",g=()=>{d&&p.onStepChange(i+1)};return o.createElement(f,Object.assign({},l,{"aria-current":v===i,ref:n,className:y("navds-stepper__step",a,{"navds-stepper__step--active":v===i,"navds-stepper__step--behind":v>i,"navds-stepper__step--non-interactive":!d,"navds-stepper__step--completed":_}),onClick:$(c,g)}),_?o.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},o.createElement(T,null)):o.createElement(C,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},i+1),o.createElement(C,{as:"span",className:"navds-stepper__content"},e))}),z=H;var G=globalThis&&globalThis.__rest||function(t,n){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const w=u.forwardRef((t,n)=>{var{children:a,className:e,activeStep:r,orientation:i="vertical",onStepChange:_=()=>{},interactive:m=!0}=t,c=G(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return r=r-1,o.createElement("ol",Object.assign({},c,{ref:n,className:y("navds-stepper",i==="horizontal"?"navds-stepper--horizontal":"",e)}),o.createElement(E.Provider,{value:{activeStep:r,onStepChange:_,lastIndex:o.Children.count(a),orientation:i,interactive:m}},o.Children.map(a,(l,p)=>{var v,d,f,g,h;return o.createElement("li",{className:y("navds-stepper__item",{"navds-stepper__item--behind":r>p,"navds-stepper__item--completed":o.isValidElement(l)&&((v=l==null?void 0:l.props)===null||v===void 0?void 0:v.completed),"navds-stepper__item--non-interactive":o.isValidElement(l)&&!((f=(d=l==null?void 0:l.props)===null||d===void 0?void 0:d.interactive)!==null&&f!==void 0?f:m)}),key:p+((h=(g=a==null?void 0:a.toString)===null||g===void 0?void 0:g.call(a))!==null&&h!==void 0?h:"")},o.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),o.isValidElement(l)?o.cloneElement(l,Object.assign(Object.assign({},l.props),{unsafe_index:p})):l,o.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))})))});w.Step=z;const L=w;var M=globalThis&&globalThis.__rest||function(t,n){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const Z=u.forwardRef((t,n)=>{var{title:a,titleId:e}=t,r=M(t,["title","titleId"]);let i=R();return i=a?e||"title-"+i:void 0,u.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:n,"aria-labelledby":i},r),a?u.createElement("title",{id:i},a):null,u.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m12 6.586 7.707 7.707-1.414 1.414L12 9.414l-6.293 6.293-1.414-1.414L12 6.586Z",fill:"currentColor"}))}),D=Z;const W={showAllStepsLabel:"Vis alle steg",goToPreviousStepLabel:"Gå til forrige steg",allStepsSectionAriaLabel:"Alle steg",navigasjonAriaLabel:"Navigasjon i søknaden",stepProgressLabelFunc:(t,n)=>`Steg ${t} av ${n}`},x=({steps:t,currentStepIndex:n,allStepsHeader:a,allStepsFooter:e,labels:r=W,titleHeadingLevel:i="1",includeBackLink:_=!1,setFocusOnHeadingOnMount:m=!0,onStepSelect:c})=>{const[l,p]=u.useState(!1),v=t[n],d=n+1,f=t.length,g=100/f*d,h=V(),P=b=>{c&&c(t[b-1])},k=()=>{c&&c(t[n-1])},N=s.jsx(S,{as:"div",children:r.stepProgressLabelFunc(d,f)}),O=c!==void 0&&_===!0,I=O?s.jsx("div",{className:"progressStepper__heading__stepInfo",children:N}):void 0,j=u.useRef(null);return u.useEffect(()=>{m&&j.current&&j.current.focus()},[m]),s.jsxs("div",{className:"progressStepper",children:[s.jsx("div",{className:"progressStepper__heading",children:s.jsxs(q,{tabIndex:-1,size:"medium",level:i,className:"progressStepper__heading__title",ref:j,children:[I,v.label]})}),s.jsx("div",{className:"progressStepper__progressBarWrapper",role:"presentation","aria-hidden":!0,children:s.jsx("div",{className:"progressStepper__progressBar",children:s.jsx("div",{className:"progressStepper__progressBar__progress",style:{width:`${g}%`}})})}),s.jsxs("nav",{"aria-label":r.navigasjonAriaLabel,children:[s.jsxs("div",{className:"progressStepper__stepsInfo",children:[O?s.jsx(S,{children:n>0&&s.jsxs("button",{type:"button",onClick:k,className:"navds-read-more__button navds-body-short progressStepper__backLink",children:[s.jsx(A,{className:"progressStepper__backLink__icon","aria-hidden":!0}),r.goToPreviousStepLabel]})}):s.jsx(s.Fragment,{children:N}),s.jsxs("button",{type:"button",className:"navds-read-more__button navds-body-short","aria-controls":h,"aria-expanded":l,"aria-label":l?"Skjul stegene":"Se alle steg",onClick:()=>{p(!l)},children:[l===!1&&s.jsx(B,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0}),l&&s.jsx(D,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0})]})]}),s.jsx("div",{id:h,"aria-hidden":l===!1,"aria-live":"polite",children:l&&s.jsxs("section",{className:"progressStepper__allSteps","aria-label":r.allStepsSectionAriaLabel,children:[a&&s.jsx(S,{as:"div",className:"progressStepper__allSteps__header",children:a}),s.jsx(L,{activeStep:d,onStepChange:c?P:void 0,children:t.map(b=>s.jsx(L.Step,{completed:b.completed,interactive:c!==void 0&&b.completed===!0,children:b.label},b.id))}),e&&s.jsx(S,{as:"div",className:"progressStepper__allSteps__footer",children:e})]})})]})]})},le=x;try{x.displayName="ProgressStepper",x.__docgenInfo={description:"",displayName:"ProgressStepper",props:{steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"ProgressStep[]"}},currentStepIndex:{defaultValue:null,description:"",name:"currentStepIndex",required:!0,type:{name:"number"}},labels:{defaultValue:{value:`{
    showAllStepsLabel: 'Vis alle steg',
    goToPreviousStepLabel: 'Gå til forrige steg',
    allStepsSectionAriaLabel: 'Alle steg',
    navigasjonAriaLabel: 'Navigasjon i søknaden',
    stepProgressLabelFunc: (currentStep, totalSteps) => \`Steg \${currentStep} av \${totalSteps}\`,
}`},description:"",name:"labels",required:!1,type:{name:"Labels"}},titleHeadingLevel:{defaultValue:{value:"1"},description:"",name:"titleHeadingLevel",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'}]}},allStepsHeader:{defaultValue:null,description:"",name:"allStepsHeader",required:!1,type:{name:"ReactNode"}},allStepsFooter:{defaultValue:null,description:"",name:"allStepsFooter",required:!1,type:{name:"ReactNode"}},includeBackLink:{defaultValue:{value:"false"},description:"",name:"includeBackLink",required:!1,type:{name:"boolean"}},setFocusOnHeadingOnMount:{defaultValue:{value:"true"},description:"",name:"setFocusOnHeadingOnMount",required:!1,type:{name:"boolean"}},onStepSelect:{defaultValue:null,description:"",name:"onStepSelect",required:!1,type:{name:"((step: ProgressStep) => void)"}}}}}catch{}export{le as P};
