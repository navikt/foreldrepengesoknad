import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{H as k}from"./index-B7Wol3-5.js";import{b as j}from"./bemUtils-BssjAfnF.js";import{r as b}from"./index-CTjT7uj6.js";import{u as B}from"./index-D7P32T3h.js";import{i as E}from"./intlUtils-C_Owl2LD.js";import{B as F}from"./Banner-C3G8xbi8.js";import{H as S,a as H}from"./Label-UU7-twIW.js";import{B as y}from"./Block-DQ6Cq2es.js";import{M as p,B as c}from"./Modal-BNQc0mm_.js";import{P as M}from"./ProgressStepper-QJi79hs3.js";import"./index-9r8iugjR.js";import"./tslib.es6-BntfKcQG.js";import"./clsx-B-dksMZM.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-Did2T99i.js";import"./create-context-DOtOKOIE.js";import"./Loader-Bk4YieMA.js";import"./useId-BHtrcvnP.js";import"./guid-CsArkN6i.js";import"./Back-CBmEjlTt.js";import"./useId-BFxX0aRd.js";import"./Expand-DBYf7wR3.js";const T=({ariaLabel:t,id:a="pageMainContent",className:n,topContentRenderer:r,children:s})=>{b.useEffect(()=>{window.scrollTo(0,0)},[]);const o=B(),d=t?E(o,"page.defaultMainRoleLabel"):void 0;return e.jsxs("main",{"aria-label":d,id:a,children:[r==null?void 0:r(),e.jsx("div",{className:`page ${n}`,children:s})]})};T.__docgenInfo={description:"",methods:[],displayName:"Page",props:{className:{required:!1,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'pageMainContent'",computed:!1}},ariaLabel:{required:!1,tsType:{name:"string"},description:""},topContentRenderer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => React.ReactElement<any>",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const R=({text:t,level:a="1"})=>e.jsx(F,{size:"small",children:e.jsx(S,{size:"large",level:a,children:t})});R.__docgenInfo={description:"",methods:[],displayName:"StepBanner",props:{text:{required:!0,tsType:{name:"string"},description:""},level:{required:!1,tsType:{name:"union",raw:"'1' | '2' | '3'",elements:[{name:"literal",value:"'1'"},{name:"literal",value:"'2'"},{name:"literal",value:"'3'"}]},description:"",defaultValue:{value:"'1'",computed:!1}}}};const q=({isOpen:t,setIsOpen:a,onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:r})=>e.jsxs(p,{open:t,onClose:()=>a(!1),"aria-label":"Avslutt søknad",children:[e.jsx(p.Header,{children:e.jsx(S,{size:"medium",children:"Fortsett senere"})}),e.jsx(p.Body,{children:e.jsx(H,{children:"Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer."})}),e.jsxs(p.Footer,{children:[e.jsx(c,{variant:"primary",onClick:r,children:"OK"}),e.jsx(c,{variant:"tertiary",onClick:n,children:"Slett søknaden"})]})]});q.__docgenInfo={description:"",methods:[],displayName:"AvsluttModal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},setIsOpen:{required:!0,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""},onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const w=({onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a})=>{const[n,r]=b.useState(!1),s=j("stepFooter");return e.jsxs("div",{className:s.block,children:[e.jsx("div",{className:s.element("divider")}),e.jsx(q,{isOpen:n,setIsOpen:r,onAvbrytOgFortsettSenere:t,onAvbrytOgSlett:a}),e.jsx(c,{variant:"tertiary",onClick:()=>r(!0),children:"Avslutt"})]})};w.__docgenInfo={description:"",methods:[],displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const O=({bannerTitle:t,pageTitle:a,steps:n,activeStepId:r,onCancel:s,onContinueLater:o,cancelOrContinueLaterAriaLabel:d,showStepIndicator:I=!0,children:A,pageAriaLabel:_,infoMessage:m})=>{const l=n.findIndex(f=>f.id===r||f.isSelected);if(l===-1)throw new Error(`${r} not found in step-config`);const u=a||n[l].label,g=j("step");return e.jsxs(T,{className:g.block,title:u,ariaLabel:_,topContentRenderer:()=>e.jsx(e.Fragment,{children:t&&e.jsx(R,{text:t})}),children:[m!==void 0&&e.jsx("div",{className:g.element("infoMessage"),children:m}),I&&e.jsx(y,{padBottom:"xxl",children:e.jsx("div",{role:"presentation",children:e.jsx(M,{steps:n,currentStepIndex:l,titleHeadingLevel:"2"})})}),e.jsxs("section",{"aria-label":`Steg ${l+1} av ${n.length}:  ${u}`,children:[e.jsx(y,{children:A}),(s||o)&&e.jsx("div",{role:d?"complementary":void 0,"aria-label":d,children:e.jsx(w,{onAvbrytOgSlett:s,onAvbrytOgFortsettSenere:o})})]})]})},N=O;O.__docgenInfo={description:"",methods:[],displayName:"Step",props:{pageTitle:{required:!1,tsType:{name:"string"},description:""},bannerTitle:{required:!1,tsType:{name:"string"},description:""},steps:{required:!0,tsType:{name:"Array",elements:[{name:"StepIndicatorStep"}],raw:"StepIndicatorStep[]"},description:""},activeStepId:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},showStepIndicator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},topContentRenderer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => React.ReactElement<any>",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},cancelOrContinueLaterAriaLabel:{required:!1,tsType:{name:"string"},description:""},pageAriaLabel:{required:!1,tsType:{name:"string"},description:""},infoMessage:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const de={title:"components/Step",component:N},L=t=>e.jsx(k,{children:e.jsx(N,{...t})}),i=L.bind({});i.args={pageTitle:"Foreldrepenger",activeStepId:"test",steps:[{id:"test",index:1,label:"Om Barnet"},{id:"test2",index:2,label:"Annet"},{id:"test3",index:3,label:"Oppsummering"}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})};var v,x,h;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`args => <HashRouter>
        <Step {...args} />
    </HashRouter>`,...(h=(x=i.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const le=["Default"];export{i as Default,le as __namedExportsOrder,de as default};
