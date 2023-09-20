import{j as e}from"./jsx-runtime-4ca860c5.js";import{H as F}from"./index-3b7bf8a3.js";import{b as y}from"./bemUtils-ca30e94f.js";import{r as v}from"./index-61bf1805.js";import{u as B}from"./index-c9b9c854.js";import{i as k}from"./intlUtils-adb52f84.js";import{B as L}from"./Banner-6d32b927.js";import{H as V}from"./Heading-d6752989.js";import{B as b}from"./Block-8a28d15c.js";import{M as h,B as p}from"./Provider-b6ceb5d6.js";import{B as R}from"./BodyLong-a879fa97.js";import{P as M}from"./ProgressStepper-2b020caa.js";import"./_commonjsHelpers-de833af9.js";import"./tslib.es6-74570fde.js";import"./clsx.m-1229b3e0.js";import"./index-2801d3c9.js";import"./index-9d475cdf.js";import"./useId-c9351ca0.js";import"./useId-a104c71e.js";import"./Label-548f7d15.js";import"./guid-c1767a53.js";import"./Back-50038281.js";import"./useId-4401db27.js";import"./Expand-48a8ed38.js";import"./BodyShort-32f32afe.js";function E(t){v.useEffect(()=>{const r=document.title;return document.title=t,()=>{document.title=r}},[t])}const u=({ariaLabel:t,id:r="pageMainContent",title:a,className:l,topContentRenderer:n,children:s})=>{v.useEffect(()=>{window.scrollTo(0,0)},[]),E(a);const o=B(),d=t?k(o,"page.defaultMainRoleLabel"):void 0;return e.jsxs("div",{role:"main","aria-label":d,id:r,children:[n&&n(),e.jsx("div",{className:`page ${l}`,children:s})]})};try{u.displayName="Page",u.__docgenInfo={description:"",displayName:"Page",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},id:{defaultValue:{value:"pageMainContent"},description:"",name:"id",required:!1,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!1,type:{name:"string"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}}}}}catch{}const c=({text:t,level:r="2"})=>e.jsx(L,{size:"small",children:e.jsx(V,{size:"large",level:r,children:t})});try{c.displayName="StepBanner",c.__docgenInfo={description:"",displayName:"StepBanner",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},level:{defaultValue:{value:"2"},description:"",name:"level",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'},{value:'"3"'}]}}}}}catch{}const m=({isOpen:t,setIsOpen:r,onAvbrytOgSlett:a,onAvbrytOgFortsettSenere:l})=>{const n=y("avslutt-modal");return e.jsx(h,{open:t,onClose:()=>r(!1),closeButton:!0,children:e.jsxs(h.Content,{className:n.element("content"),children:[e.jsx(V,{size:"medium",children:"Fortsett senere"}),e.jsx(R,{children:"Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer."}),e.jsxs("div",{className:n.element("button-wrapper"),children:[e.jsx(p,{variant:"tertiary",onClick:a,children:"Slett søknaden"}),e.jsx(p,{variant:"primary",onClick:l,children:"OK"})]})]})})};try{m.displayName="AvsluttModal",m.__docgenInfo={description:"",displayName:"AvsluttModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},setIsOpen:{defaultValue:null,description:"",name:"setIsOpen",required:!0,type:{name:"(isOpen: boolean) => void"}},onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}}}}}catch{}function f({onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:r}){const[a,l]=v.useState(!1),n=y("stepFooter");return e.jsx(e.Fragment,{children:e.jsxs("div",{className:n.block,children:[e.jsx("div",{className:n.element("divider")}),e.jsxs("div",{className:n.element("links"),children:[e.jsx(m,{isOpen:a,setIsOpen:l,onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:r}),e.jsx(p,{variant:"tertiary",onClick:()=>l(!0),children:"Avslutt"})]})]})})}try{f.displayName="StepFooter",f.__docgenInfo={description:"",displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}}}}}catch{}const g=({bannerTitle:t,pageTitle:r,steps:a,activeStepId:l,onCancel:n,onContinueLater:s,cancelOrContinueLaterAriaLabel:o,showStepIndicator:d=!0,children:A,pageAriaLabel:I,infoMessage:x})=>{const _=a.findIndex(C=>C.id===l),S=y("step");return e.jsxs(u,{className:S.block,title:r,ariaLabel:I,topContentRenderer:()=>e.jsx(e.Fragment,{children:t&&e.jsx(e.Fragment,{children:e.jsx(c,{text:t})})}),children:[x!==void 0&&e.jsx("div",{className:S.element("infoMessage"),children:x}),d&&e.jsx(b,{padBottom:"xl",children:e.jsx("div",{role:"presentation","aria-hidden":!0,children:e.jsx(M,{steps:a,currentStepIndex:_,titleHeadingLevel:"2"})})}),e.jsxs("section",{"aria-label":`Steg ${_+1} av ${a.length}:  ${r}`,children:[e.jsx(b,{children:A}),(n||s)&&e.jsx("div",{role:o?"complementary":void 0,"aria-label":o,children:e.jsx(f,{onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:s})})]})]})},N=g;try{g.displayName="Step",g.__docgenInfo={description:"",displayName:"Step",props:{pageTitle:{defaultValue:null,description:"",name:"pageTitle",required:!0,type:{name:"string"}},bannerTitle:{defaultValue:null,description:"",name:"bannerTitle",required:!1,type:{name:"string"}},steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"StepIndicatorStep[]"}},activeStepId:{defaultValue:null,description:"",name:"activeStepId",required:!0,type:{name:"string"}},showStepIndicator:{defaultValue:{value:"true"},description:"",name:"showStepIndicator",required:!1,type:{name:"boolean"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},cancelOrContinueLaterAriaLabel:{defaultValue:null,description:"",name:"cancelOrContinueLaterAriaLabel",required:!1,type:{name:"string"}},pageAriaLabel:{defaultValue:null,description:"",name:"pageAriaLabel",required:!1,type:{name:"string"}},infoMessage:{defaultValue:null,description:"",name:"infoMessage",required:!1,type:{name:"ReactNode"}}}}}catch{}const pe={title:"components/Step",component:N},H=t=>e.jsx(F,{children:e.jsx(N,{...t})}),i=H.bind({});i.args={pageTitle:"Foreldrepenger",activeStepId:"test",steps:[{id:"test",index:1,label:"Om Barnet"},{id:"test2",index:2,label:"Annet"},{id:"test3",index:3,label:"Oppsummering"}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})};var j,q,O;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => <HashRouter>
        <Step {...args} />
    </HashRouter>`,...(O=(q=i.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};const ue=["Default"];export{i as Default,ue as __namedExportsOrder,pe as default};
//# sourceMappingURL=Step.stories-6c69d829.js.map
