import{j as e}from"./jsx-runtime-4ca860c5.js";import{H as T}from"./index-3b7bf8a3.js";import{b as v}from"./bemUtils-5ddd7bb5.js";import{r as x}from"./index-61bf1805.js";import{u as B}from"./index-b1d09ef8.js";import{i as L}from"./intlUtils-93c7918a.js";import{B as R}from"./Banner-82ab4c1c.js";import{H as A}from"./Heading-f8ba3d4b.js";import{B as j}from"./Block-3781a9d6.js";import{M as q,B as s}from"./Provider-9ffbd410.js";import{B as M}from"./BodyLong-d51fc342.js";import{P as E}from"./ProgressStepper-e41d4c07.js";import"./_commonjsHelpers-de833af9.js";import"./tslib.es6-74570fde.js";import"./clsx.m-266f4de0.js";import"./index-2801d3c9.js";import"./index-9d475cdf.js";import"./useId-c9351ca0.js";import"./useId-a104c71e.js";import"./Loader-bb5a2050.js";import"./Label-e660a0cb.js";import"./guid-c1767a53.js";import"./Back-50038281.js";import"./useId-4401db27.js";import"./Expand-48a8ed38.js";import"./Stepper-6f01f52c.js";import"./BodyShort-f7cba4a4.js";function H(t){x.useEffect(()=>{const a=document.title;return document.title=t,()=>{document.title=a}},[t])}const c=({ariaLabel:t,id:a="pageMainContent",title:r,className:i,topContentRenderer:n,children:l})=>{x.useEffect(()=>{window.scrollTo(0,0)},[]),H(r);const d=B(),p=t?L(d,"page.defaultMainRoleLabel"):void 0;return e.jsxs("div",{role:"main","aria-label":p,id:a,children:[n&&n(),e.jsx("div",{className:`page ${i}`,children:l})]})};try{c.displayName="Page",c.__docgenInfo={description:"",displayName:"Page",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},id:{defaultValue:{value:"pageMainContent"},description:"",name:"id",required:!1,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!1,type:{name:"string"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}}}}}catch{}const m=({text:t,level:a="2"})=>e.jsx(R,{size:"small",children:e.jsx(A,{size:"large",level:a,children:t})});try{m.displayName="StepBanner",m.__docgenInfo={description:"",displayName:"StepBanner",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},level:{defaultValue:{value:"2"},description:"",name:"level",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'},{value:'"3"'}]}}}}}catch{}const f=({isOpen:t,setIsOpen:a,onAvbrytOgSlett:r,onAvbrytOgFortsettSenere:i,useNoTempSavingText:n})=>{const l=v("avslutt-modal");return e.jsx(q,{open:t,onClose:()=>a(!1),closeButton:!0,children:e.jsxs(q.Content,{className:l.element("content"),children:[e.jsx(A,{size:"medium",children:n?"Avslutt og slett søknad":"Fortsett senere"}),e.jsx(M,{children:n?"Når du avslutter vil søknaden bli slettet og det du har oppgitt vil da forsvinne.":"Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer."}),e.jsxs("div",{className:l.element("button-wrapper"),children:[!n&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"tertiary",onClick:r,children:"Slett søknaden"}),e.jsx(s,{variant:"primary",onClick:i,children:"OK"})]}),n&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"tertiary",onClick:()=>a(!1),children:"Tilbake til søknaden"}),e.jsx(s,{variant:"primary",onClick:r,children:"Avslutt og slett"})]})]})]})})};try{f.displayName="AvsluttModal",f.__docgenInfo={description:"",displayName:"AvsluttModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},setIsOpen:{defaultValue:null,description:"",name:"setIsOpen",required:!0,type:{name:"(isOpen: boolean) => void"}},onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}},useNoTempSavingText:{defaultValue:null,description:"",name:"useNoTempSavingText",required:!1,type:{name:"boolean"}}}}}catch{}function g({onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a,useNoTempSavingText:r}){const[i,n]=x.useState(!1),l=v("stepFooter");return e.jsx(e.Fragment,{children:e.jsxs("div",{className:l.block,children:[e.jsx("div",{className:l.element("divider")}),e.jsxs("div",{className:l.element("links"),children:[e.jsx(f,{isOpen:i,setIsOpen:n,onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a,useNoTempSavingText:r}),e.jsx(s,{variant:"tertiary",onClick:()=>n(!0),children:"Avslutt"})]})]})})}try{g.displayName="StepFooter",g.__docgenInfo={description:"",displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}},useNoTempSavingText:{defaultValue:null,description:"",name:"useNoTempSavingText",required:!1,type:{name:"boolean"}}}}}catch{}const y=({bannerTitle:t,pageTitle:a,steps:r,activeStepId:i,onCancel:n,onContinueLater:l,cancelOrContinueLaterAriaLabel:d,showStepIndicator:p=!0,children:C,pageAriaLabel:F,infoMessage:b,useNoTempSavingText:I})=>{const u=r.findIndex(_=>_.id===i||_.isSelected),h=a||r[u].label,S=v("step");return e.jsxs(c,{className:S.block,title:h,ariaLabel:F,topContentRenderer:()=>e.jsx(e.Fragment,{children:t&&e.jsx(e.Fragment,{children:e.jsx(m,{text:t})})}),children:[b!==void 0&&e.jsx("div",{className:S.element("infoMessage"),children:b}),p&&e.jsx(j,{padBottom:"xxl",children:e.jsx("div",{role:"presentation","aria-hidden":!0,children:e.jsx(E,{steps:r,currentStepIndex:u,titleHeadingLevel:"2"})})}),e.jsxs("section",{"aria-label":`Steg ${u+1} av ${r.length}:  ${h}`,children:[e.jsx(j,{children:C}),(n||l)&&e.jsx("div",{role:d?"complementary":void 0,"aria-label":d,children:e.jsx(g,{onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:l,useNoTempSavingText:I})})]})]})},k=y;try{y.displayName="Step",y.__docgenInfo={description:"",displayName:"Step",props:{pageTitle:{defaultValue:null,description:"",name:"pageTitle",required:!1,type:{name:"string"}},bannerTitle:{defaultValue:null,description:"",name:"bannerTitle",required:!1,type:{name:"string"}},steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"StepIndicatorStep[]"}},activeStepId:{defaultValue:null,description:"",name:"activeStepId",required:!1,type:{name:"string"}},showStepIndicator:{defaultValue:{value:"true"},description:"",name:"showStepIndicator",required:!1,type:{name:"boolean"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},cancelOrContinueLaterAriaLabel:{defaultValue:null,description:"",name:"cancelOrContinueLaterAriaLabel",required:!1,type:{name:"string"}},pageAriaLabel:{defaultValue:null,description:"",name:"pageAriaLabel",required:!1,type:{name:"string"}},infoMessage:{defaultValue:null,description:"",name:"infoMessage",required:!1,type:{name:"ReactNode"}},useNoTempSavingText:{defaultValue:null,description:"",name:"useNoTempSavingText",required:!1,type:{name:"boolean"}}}}}catch{}const fe={title:"components/Step",component:k},w=t=>e.jsx(T,{children:e.jsx(k,{...t})}),o=w.bind({});o.args={pageTitle:"Foreldrepenger",activeStepId:"test",steps:[{id:"test",index:1,label:"Om Barnet"},{id:"test2",index:2,label:"Annet"},{id:"test3",index:3,label:"Oppsummering"}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})};var V,N,O;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`args => <HashRouter>
        <Step {...args} />
    </HashRouter>`,...(O=(N=o.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};const ge=["Default"];export{o as Default,ge as __namedExportsOrder,fe as default};
//# sourceMappingURL=Step.stories-9dbdd7ac.js.map
