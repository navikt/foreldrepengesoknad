import{j as e}from"./jsx-runtime-4ca860c5.js";import{r as o}from"./index-61bf1805.js";import{g as I}from"./guid-c1767a53.js";import{B as w}from"./Back-50038281.js";import{E as A}from"./Expand-48a8ed38.js";import{u as V}from"./useId-4401db27.js";import{S as b}from"./Stepper-6f01f52c.js";import{B as c}from"./BodyShort-f7cba4a4.js";import{H as O}from"./Heading-f8ba3d4b.js";var B=globalThis&&globalThis.__rest||function(r,a){var l={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&a.indexOf(t)<0&&(l[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(r);s<t.length;s++)a.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(r,t[s])&&(l[t[s]]=r[t[s]]);return l};const E=o.forwardRef((r,a)=>{var{title:l,titleId:t}=r,s=B(r,["title","titleId"]);let i=V();return i=l?t||"title-"+i:void 0,o.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":i},s),l?o.createElement("title",{id:i},l):null,o.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m12 6.586 7.707 7.707-1.414 1.414L12 9.414l-6.293 6.293-1.414-1.414L12 6.586Z",fill:"currentColor"}))}),q=E;const C={showAllStepsLabel:"Vis alle steg",goToPreviousStepLabel:"Gå til forrige steg",allStepsSectionAriaLabel:"Alle steg",navigasjonAriaLabel:"Navigasjon i søknaden",stepProgressLabelFunc:(r,a)=>`Steg ${r} av ${a}`},m=({steps:r,currentStepIndex:a,allStepsHeader:l,allStepsFooter:t,labels:s=C,titleHeadingLevel:i="1",includeBackLink:j=!1,setFocusOnHeadingOnMount:f=!0,onStepSelect:n})=>{const[p,x]=o.useState(!1),y=r[a],u=a+1,v=r.length,L=100/v*u,_=I(),N=d=>{n&&n(r[d-1])},P=()=>{n&&n(r[a-1])},S=e.jsx(c,{as:"div",children:s.stepProgressLabelFunc(u,v)}),h=n!==void 0&&j===!0,k=h?e.jsx("div",{className:"progressStepper__heading__stepInfo",children:S}):void 0,g=o.useRef(null);return o.useEffect(()=>{f&&g.current&&g.current.focus()},[f]),e.jsxs("div",{className:"progressStepper",children:[e.jsx("div",{className:"progressStepper__heading",children:e.jsxs(O,{tabIndex:-1,size:"medium",level:i,className:"progressStepper__heading__title",ref:g,children:[k,y.label]})}),e.jsx("div",{className:"progressStepper__progressBarWrapper",role:"presentation","aria-hidden":!0,children:e.jsx("div",{className:"progressStepper__progressBar",children:e.jsx("div",{className:"progressStepper__progressBar__progress",style:{width:`${L}%`}})})}),e.jsxs("nav",{"aria-label":s.navigasjonAriaLabel,children:[e.jsxs("div",{className:"progressStepper__stepsInfo",children:[h?e.jsx(c,{children:a>0&&e.jsxs("button",{type:"button",onClick:P,className:"navds-read-more__button navds-body-short progressStepper__backLink",children:[e.jsx(w,{className:"progressStepper__backLink__icon","aria-hidden":!0}),s.goToPreviousStepLabel]})}):e.jsx(e.Fragment,{children:S}),e.jsxs("button",{type:"button",className:"navds-read-more__button navds-body-short","aria-controls":_,"aria-expanded":p,onClick:()=>{x(!p)},children:[p===!1&&e.jsx(A,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0}),p&&e.jsx(q,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0})]})]}),e.jsx("div",{id:_,"aria-hidden":p===!1,"aria-live":"polite",children:p&&e.jsxs("section",{className:"progressStepper__allSteps","aria-label":s.allStepsSectionAriaLabel,children:[l&&e.jsx(c,{as:"div",className:"progressStepper__allSteps__header",children:l}),e.jsx(b,{activeStep:u,onStepChange:n?N:void 0,children:r.map(d=>e.jsx(b.Step,{completed:d.completed,interactive:n!==void 0&&d.completed===!0,children:d.label},d.id))}),t&&e.jsx(c,{as:"div",className:"progressStepper__allSteps__footer",children:t})]})})]})]})},W=m;try{m.displayName="ProgressStepper",m.__docgenInfo={description:"",displayName:"ProgressStepper",props:{steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"ProgressStep[]"}},currentStepIndex:{defaultValue:null,description:"",name:"currentStepIndex",required:!0,type:{name:"number"}},labels:{defaultValue:{value:`{
    showAllStepsLabel: 'Vis alle steg',
    goToPreviousStepLabel: 'Gå til forrige steg',
    allStepsSectionAriaLabel: 'Alle steg',
    navigasjonAriaLabel: 'Navigasjon i søknaden',
    stepProgressLabelFunc: (currentStep, totalSteps) => \`Steg \${currentStep} av \${totalSteps}\`,
}`},description:"",name:"labels",required:!1,type:{name:"Labels"}},titleHeadingLevel:{defaultValue:{value:"1"},description:"",name:"titleHeadingLevel",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'}]}},allStepsHeader:{defaultValue:null,description:"",name:"allStepsHeader",required:!1,type:{name:"ReactNode"}},allStepsFooter:{defaultValue:null,description:"",name:"allStepsFooter",required:!1,type:{name:"ReactNode"}},includeBackLink:{defaultValue:{value:"false"},description:"",name:"includeBackLink",required:!1,type:{name:"boolean"}},setFocusOnHeadingOnMount:{defaultValue:{value:"true"},description:"",name:"setFocusOnHeadingOnMount",required:!1,type:{name:"boolean"}},onStepSelect:{defaultValue:null,description:"",name:"onStepSelect",required:!1,type:{name:"((step: ProgressStep) => void)"}}}}}catch{}export{W as P};
//# sourceMappingURL=ProgressStepper-e41d4c07.js.map
