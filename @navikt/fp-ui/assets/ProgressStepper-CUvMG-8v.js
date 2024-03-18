import{j as i}from"./jsx-runtime-Du8NFWEI.js";import{r as d,R as s}from"./index-Dl6G-zuu.js";import{u as E}from"./useUiIntl-Bi4NBNIX.js";import{c as h,L as S,B as O,H as C}from"./Label-El8VFjDh.js";import{C as N}from"./ChevronDown-7NnMs7TJ.js";import{u as P}from"./nn_NO-un3m1AoC.js";import{c as I}from"./composeEventHandlers-DeH74NdU.js";var k=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const q=d.forwardRef((t,a)=>{var{title:n,titleId:e}=t,r=k(t,["title","titleId"]);let l=P();return l=n?e||"title-"+l:void 0,d.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":l},r),n?d.createElement("title",{id:l},n):null,d.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.47 7.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 1 1-1.06 1.06L12 9.56l-4.97 4.97a.75.75 0 0 1-1.06-1.06l5.5-5.5Z",fill:"currentColor"}))}),L=q,x=d.createContext(null);var R=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const A=()=>s.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img","aria-hidden":!0,"aria-label":"Fullført"},s.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"})),T=d.forwardRef((t,a)=>{var{className:n,children:e,as:r="a",unsafe_index:l=0,completed:g=!1,interactive:u,onClick:_}=t,o=R(t,["className","children","as","unsafe_index","completed","interactive","onClick"]);const c=d.useContext(x);if(c===null)return console.error("<Stepper.Step> has to be used within <Stepper>"),null;const{activeStep:m}=c,v=u??(c==null?void 0:c.interactive),f=v?r:"div",p=()=>{v&&c.onStepChange(l+1)};return s.createElement(f,Object.assign({},o,{"aria-current":m===l,ref:a,className:h("navds-stepper__step",n,{"navds-stepper__step--active":m===l,"navds-stepper__step--behind":m>l,"navds-stepper__step--non-interactive":!v,"navds-stepper__step--completed":g}),onClick:I(_,p)}),g?s.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},s.createElement(A,null)):s.createElement(S,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},l+1),s.createElement(S,{as:"span",className:"navds-stepper__content"},e))});var B=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const j=d.forwardRef((t,a)=>{var{children:n,className:e,activeStep:r,orientation:l="vertical",onStepChange:g=()=>{},interactive:u=!0}=t,_=B(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return r=r-1,s.createElement("ol",Object.assign({},_,{ref:a,className:h("navds-stepper",l==="horizontal"?"navds-stepper--horizontal":"",e)}),s.createElement(x.Provider,{value:{activeStep:r,onStepChange:g,lastIndex:s.Children.count(n),orientation:l,interactive:u}},s.Children.map(n,(o,c)=>{var m,v,f,p,b;return s.createElement("li",{className:h("navds-stepper__item",{"navds-stepper__item--behind":r>c,"navds-stepper__item--completed":s.isValidElement(o)&&((m=o==null?void 0:o.props)===null||m===void 0?void 0:m.completed),"navds-stepper__item--non-interactive":s.isValidElement(o)&&!((f=(v=o==null?void 0:o.props)===null||v===void 0?void 0:v.interactive)!==null&&f!==void 0?f:u)}),key:c+((b=(p=n==null?void 0:n.toString)===null||p===void 0?void 0:p.call(n))!==null&&b!==void 0?b:"")},s.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),s.isValidElement(o)?s.cloneElement(o,Object.assign(Object.assign({},o.props),{unsafe_index:c})):o,s.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))})))});j.Step=T;const y=j,w=({steps:t,onStepSelect:a})=>{const n=E(),[e,r]=d.useState(!1),l=t.findIndex(p=>p.isSelected);if(l===-1)throw new Error("No selected step in step-config");const g=t[l],u=l+1,_=t.length,o=100/_*u,c="progress-stepper-container-id",m=p=>{a&&a(t[p-1])},v=i.jsx(O,{as:"div",children:n.formatMessage({id:"ProgressStepper.StepProgressLabel"},{currentStep:u,totalSteps:_})}),f=d.useRef(null);return d.useEffect(()=>{f.current&&f.current.focus()},[]),i.jsxs("div",{className:"progressStepper",children:[i.jsx("div",{className:"progressStepper__heading",children:i.jsx(C,{tabIndex:-1,size:"medium",level:"2",className:"progressStepper__heading__title",ref:f,children:g.label})}),i.jsx("div",{className:"progressStepper__progressBarWrapper",role:"presentation","aria-hidden":!0,children:i.jsx("div",{className:"progressStepper__progressBar",children:i.jsx("div",{className:"progressStepper__progressBar__progress",style:{width:`${o}%`}})})}),i.jsxs("nav",{"aria-label":n.formatMessage({id:"ProgressStepper.NavigasjonAriaLabel"}),children:[i.jsxs("div",{className:"progressStepper__stepsInfo",children:[v,i.jsxs("button",{type:"button",className:"navds-read-more__button navds-body-short","aria-controls":c,"aria-expanded":e,"aria-label":e?"Skjul stegene":"Se alle steg",onClick:()=>{r(!e)},children:[e===!1&&i.jsx(N,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0}),e&&i.jsx(L,{className:"progressStepper__toggleAllStepsIcon","aria-hidden":!0})]})]}),i.jsx("div",{id:c,"aria-hidden":e===!1,"aria-live":"polite",children:e&&i.jsx("section",{className:"progressStepper__allSteps","aria-label":n.formatMessage({id:"ProgressStepper.AllStepsSectionAriaLabel"}),children:i.jsx(y,{activeStep:u,onStepChange:a?m:void 0,children:t.map(p=>i.jsx(y.Step,{completed:p.completed,interactive:a!==void 0&&p.completed===!0,children:p.label},p.id))})})})]})]})},D=w;w.__docgenInfo={description:"",methods:[],displayName:"ProgressStepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},onStepSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: ProgressStep<TYPE>) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}},name:"step"}],return:{name:"void"}}},description:""}}};export{D as P};
