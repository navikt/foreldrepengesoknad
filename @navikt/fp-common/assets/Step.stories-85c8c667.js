import{j as e}from"./jsx-runtime-ffb262ed.js";import{H as B}from"./index-69127a3c.js";import{b as O}from"./bemUtils-2cc87b6f.js";import{r as V}from"./index-76fb7be0.js";import{u as k}from"./index-88ec15bb.js";import{i as L}from"./intlUtils-93c7918a.js";import{B as R}from"./Banner-fd2bae9a.js";import{H as A,a as M}from"./Label-5044b96c.js";import{B as b}from"./Block-ec103e42.js";import{M as p,B as u}from"./Modal-14480dd3.js";import{P as E}from"./ProgressStepper-a35903e2.js";import"./index-d3ea75b5.js";import"./_commonjsHelpers-de833af9.js";import"./clsx-0839fdbe.js";import"./floating-ui.react-e8d42726.js";import"./useId-55135a07.js";import"./composeEventHandlers-4d33bf7d.js";import"./useId-3db0ed0c.js";import"./Loader-9f7a8695.js";import"./guid-c1767a53.js";import"./Back-3b16c8fb.js";import"./useId-b2ee2642.js";import"./Expand-d819559b.js";const c=({ariaLabel:t,id:a="pageMainContent",className:r,topContentRenderer:n,children:l})=>{V.useEffect(()=>{window.scrollTo(0,0)},[]);const s=k(),o=t?L(s,"page.defaultMainRoleLabel"):void 0;return e.jsxs("div",{role:"main","aria-label":o,id:a,children:[n&&n(),e.jsx("div",{className:`page ${r}`,children:l})]})};try{c.displayName="Page",c.__docgenInfo={description:"",displayName:"Page",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},id:{defaultValue:{value:"pageMainContent"},description:"",name:"id",required:!1,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!1,type:{name:"string"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}}}}}catch{}const m=({text:t,level:a="1"})=>e.jsx(R,{size:"small",children:e.jsx(A,{size:"large",level:a,children:t})});try{m.displayName="StepBanner",m.__docgenInfo={description:"",displayName:"StepBanner",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},level:{defaultValue:{value:"1"},description:"",name:"level",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'},{value:'"3"'}]}}}}}catch{}const f=({isOpen:t,setIsOpen:a,onAvbrytOgSlett:r,onAvbrytOgFortsettSenere:n})=>e.jsxs(p,{open:t,onClose:()=>a(!1),"aria-label":"Avslutt søknad",children:[e.jsx(p.Header,{children:e.jsx(A,{size:"medium",children:"Fortsett senere"})}),e.jsx(p.Body,{children:e.jsx(M,{children:"Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer."})}),e.jsxs(p.Footer,{children:[e.jsx(u,{variant:"primary",onClick:n,children:"OK"}),e.jsx(u,{variant:"tertiary",onClick:r,children:"Slett søknaden"})]})]});try{f.displayName="AvsluttModal",f.__docgenInfo={description:"",displayName:"AvsluttModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},setIsOpen:{defaultValue:null,description:"",name:"setIsOpen",required:!0,type:{name:"(isOpen: boolean) => void"}},onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}}}}}catch{}function g({onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a}){const[r,n]=V.useState(!1),l=O("stepFooter");return e.jsx(e.Fragment,{children:e.jsxs("div",{className:l.block,children:[e.jsx("div",{className:l.element("divider")}),e.jsx(f,{isOpen:r,setIsOpen:n,onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a}),e.jsx(u,{variant:"tertiary",onClick:()=>n(!0),children:"Avslutt"})]})})}try{g.displayName="StepFooter",g.__docgenInfo={description:"",displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{defaultValue:null,description:"",name:"onAvbrytOgFortsettSenere",required:!1,type:{name:"(() => void)"}},onAvbrytOgSlett:{defaultValue:null,description:"",name:"onAvbrytOgSlett",required:!1,type:{name:"(() => void)"}}}}}catch{}const y=({bannerTitle:t,pageTitle:a,steps:r,activeStepId:n,onCancel:l,onContinueLater:s,cancelOrContinueLaterAriaLabel:o,showStepIndicator:N=!0,children:F,pageAriaLabel:C,infoMessage:v})=>{const d=r.findIndex(S=>S.id===n||S.isSelected);if(d===-1)throw new Error(`${n} not found in step-config`);const x=a||r[d].label,_=O("step");return e.jsxs(c,{className:_.block,title:x,ariaLabel:C,topContentRenderer:()=>e.jsx(e.Fragment,{children:t&&e.jsx(e.Fragment,{children:e.jsx(m,{text:t})})}),children:[v!==void 0&&e.jsx("div",{className:_.element("infoMessage"),children:v}),N&&e.jsx(b,{padBottom:"xxl",children:e.jsx("div",{role:"presentation",children:e.jsx(E,{steps:r,currentStepIndex:d,titleHeadingLevel:"2"})})}),e.jsxs("section",{"aria-label":`Steg ${d+1} av ${r.length}:  ${x}`,children:[e.jsx(b,{children:F}),(l||s)&&e.jsx("div",{role:o?"complementary":void 0,"aria-label":o,children:e.jsx(g,{onAvbrytOgSlett:l,onAvbrytOgFortsettSenere:s})})]})]})},I=y;try{y.displayName="Step",y.__docgenInfo={description:"",displayName:"Step",props:{pageTitle:{defaultValue:null,description:"",name:"pageTitle",required:!1,type:{name:"string"}},bannerTitle:{defaultValue:null,description:"",name:"bannerTitle",required:!1,type:{name:"string"}},steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"StepIndicatorStep[]"}},activeStepId:{defaultValue:null,description:"",name:"activeStepId",required:!1,type:{name:"string"}},showStepIndicator:{defaultValue:{value:"true"},description:"",name:"showStepIndicator",required:!1,type:{name:"boolean"}},topContentRenderer:{defaultValue:null,description:"",name:"topContentRenderer",required:!1,type:{name:"(() => ReactElement<any, string | JSXElementConstructor<any>>)"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},cancelOrContinueLaterAriaLabel:{defaultValue:null,description:"",name:"cancelOrContinueLaterAriaLabel",required:!1,type:{name:"string"}},pageAriaLabel:{defaultValue:null,description:"",name:"pageAriaLabel",required:!1,type:{name:"string"}},infoMessage:{defaultValue:null,description:"",name:"infoMessage",required:!1,type:{name:"ReactNode"}}}}}catch{}const oe={title:"components/Step",component:I},H=t=>e.jsx(B,{children:e.jsx(I,{...t})}),i=H.bind({});i.args={pageTitle:"Foreldrepenger",activeStepId:"test",steps:[{id:"test",index:1,label:"Om Barnet"},{id:"test2",index:2,label:"Annet"},{id:"test3",index:3,label:"Oppsummering"}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})};var h,j,q;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => <HashRouter>
        <Step {...args} />
    </HashRouter>`,...(q=(j=i.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const de=["Default"];export{i as Default,de as __namedExportsOrder,oe as default};
