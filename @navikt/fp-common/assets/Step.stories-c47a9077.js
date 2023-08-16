import{a as s,j as e,F as u}from"./jsx-runtime-a9c13c85.js";import{H}from"./index-0def224c.js";import{b as N}from"./bemUtils-f774aeb7.js";import{r as L,R as k}from"./index-d8ade8ea.js";import{u as x}from"./index-0057e936.js";import{i as c}from"./intlUtils-adb52f84.js";import{B as E}from"./Banner-2b58ad5a.js";import{H as C}from"./Heading-58d6757e.js";import{B as h}from"./Block-225921c7.js";import{A as F}from"./ActionLink-9ec96656.js";import{A as T}from"./AvbrytSoknadDialog-2f4b0e62.js";import{B as M}from"./BekreftDialog-2c168270.js";import{F as p}from"./message-795d5de4.js";import{P as O}from"./ProgressStepper-527474f4.js";import"./_commonjsHelpers-042e6b4d.js";import"./tslib.es6-c380bd65.js";import"./clsx.m-1229b3e0.js";import"./Link-0df60bee.js";import"./index-6cf4ba34.js";import"./index-4d501b15.js";import"./useId-73d84699.js";import"./useId-927ec08e.js";import"./Label-d1be74cf.js";import"./guid-c1767a53.js";import"./Back-5e3cd62b.js";import"./useId-7fff3971.js";import"./Expand-2a92aefe.js";import"./BodyShort-97a931c9.js";function P(t){L.useEffect(()=>{const r=document.title;return document.title=t,()=>{document.title=r}},[t])}const f=({ariaLabel:t,id:r="pageMainContent",title:a,className:o,topContentRenderer:n,children:l})=>{L.useEffect(()=>{window.scrollTo(0,0)},[]),P(a);const i=x(),m=t?c(i,"page.defaultMainRoleLabel"):void 0;return s("div",{role:"main","aria-label":m,id:r,children:[n&&n(),e("div",{className:`page ${o}`,children:l})]})};try{f.displayName="Page",f.__docgenInfo={description:"",displayName:"Page",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},id:{defaultValue:{value:"pageMainContent"},description:"",name:"id",required:!1,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!1,type:{name:"string"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}}}}}catch{}const g=({text:t,level:r="2"})=>e(E,{size:"small",children:e(C,{size:"large",level:r,children:t})});try{g.displayName="StepBanner",g.__docgenInfo={description:"",displayName:"StepBanner",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},level:{defaultValue:{value:"2"},description:"",name:"level",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'},{value:'"3"'}]}}}}}catch{}const $=t=>{const r=x(),{synlig:a,onFortsettSøknad:o,onFortsettSøknadSenere:n}=t;return s(M,{open:a,bekreftLabel:c(r,"fortsettSøknadSenereDialog.avbrytSøknadLabel"),avbrytLabel:c(r,"fortsettSøknadSenereDialog.fortsettSøknadLabel"),closeButton:!1,"aria-label":c(r,"fortsettSøknadSenereDialog.tittel"),onBekreft:n,onClose:o,children:[e(C,{size:"small",children:e(p,{id:"fortsettSøknadSenereDialog.tittel"})}),e("p",{children:e(p,{id:"fortsettSøknadSenereDialog.intro"})}),e("p",{children:e(p,{id:"fortsettSøknadSenereDialog.spørsmål"})})]})};try{FortsettSknadSenereDialog.displayName="FortsettSknadSenereDialog",FortsettSknadSenereDialog.__docgenInfo={description:"",displayName:"FortsettSknadSenereDialog",props:{synlig:{defaultValue:null,description:"",name:"synlig",required:!0,type:{name:"boolean"}},onFortsettSøknadSenere:{defaultValue:null,description:"",name:"onFortsettSøknadSenere",required:!0,type:{name:"() => void"}},onFortsettSøknad:{defaultValue:null,description:"",name:"onFortsettSøknad",required:!0,type:{name:"() => void"}}}}}catch{}function S({onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:r}){const[a,o]=k.useState(!1),[n,l]=k.useState(!1),i=N("stepFooter");return s(u,{children:[s("div",{className:i.block,children:[e("div",{className:i.element("divider")}),s("div",{className:i.element("links"),children:[t&&e(F,{onClick:()=>l(!0),children:e(p,{id:"steg.footer.fortsettSenere"})}),r&&e(F,{className:i.element("avbrytSoknadLenke"),onClick:()=>o(!0),children:e(p,{id:"steg.footer.avbryt"})})]})]}),t&&e($,{synlig:n,onFortsettSøknadSenere:t,onFortsettSøknad:()=>l(!1)}),r&&e(T,{synlig:a,onAvbrytSøknad:r,onFortsettSøknad:()=>o(!1)})]})}try{S.displayName="StepFooter",S.__docgenInfo={description:"",displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}}}}}catch{}const y=({bannerTitle:t,pageTitle:r,steps:a,activeStepId:o,onCancel:n,onContinueLater:l,cancelOrContinueLaterAriaLabel:i,showStepIndicator:m=!0,children:A,pageAriaLabel:B,infoMessage:v})=>{const _=a.findIndex(R=>R.id===o),b=N("step");return s(f,{className:b.block,title:r,ariaLabel:B,topContentRenderer:()=>e(u,{children:t&&e(u,{children:e(g,{text:t})})}),children:[v!==void 0&&e("div",{className:b.element("infoMessage"),children:v}),m&&e(h,{padBottom:"xl",children:e("div",{role:"presentation","aria-hidden":!0,children:e(O,{steps:a,currentStepIndex:_,titleHeadingLevel:"2"})})}),s("section",{"aria-label":`Steg ${_+1} av ${a.length}:  ${r}`,children:[e(h,{children:A}),(n||l)&&e("div",{role:i?"complementary":void 0,"aria-label":i,children:e(S,{onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:l})})]})]})},I=y;try{y.displayName="Step",y.__docgenInfo={description:"",displayName:"Step",props:{pageTitle:{defaultValue:null,description:"",name:"pageTitle",required:!0,type:{name:"string"}},bannerTitle:{defaultValue:null,description:"",name:"bannerTitle",required:!1,type:{name:"string"}},steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"StepIndicatorStep[]"}},activeStepId:{defaultValue:null,description:"",name:"activeStepId",required:!0,type:{name:"string"}},showStepIndicator:{defaultValue:{value:"true"},description:"",name:"showStepIndicator",required:!1,type:{name:"boolean"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},cancelOrContinueLaterAriaLabel:{defaultValue:null,description:"",name:"cancelOrContinueLaterAriaLabel",required:!1,type:{name:"string"}},pageAriaLabel:{defaultValue:null,description:"",name:"pageAriaLabel",required:!1,type:{name:"string"}},infoMessage:{defaultValue:null,description:"",name:"infoMessage",required:!1,type:{name:"ReactNode"}}}}}catch{}const ye={title:"components/Step",component:I},w=t=>e(H,{children:e(I,{...t})}),d=w.bind({});d.args={pageTitle:"Foreldrepenger",activeStepId:"test",steps:[{id:"test",index:1,label:"Om Barnet"},{id:"test2",index:2,label:"Annet"},{id:"test3",index:3,label:"Oppsummering"}],children:e(u,{children:"Her er det noe kult innhold"})};var V,q,D;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`args => <HashRouter>
        <Step {...args} />
    </HashRouter>`,...(D=(q=d.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};const ve=["Default"];export{d as Default,ve as __namedExportsOrder,ye as default};
//# sourceMappingURL=Step.stories-c47a9077.js.map
