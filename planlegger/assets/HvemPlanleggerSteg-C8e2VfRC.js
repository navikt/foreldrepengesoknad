import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as P,a as f,b as R,C as u,c as j}from"./usePlanleggerNavigator-bfolbdq0.js";import{B as O}from"./BlueRadioGroup-KpxmQA_m.js";import{P as h}from"./PlanleggerStepPage-B-k2kdCS.js";import{u as H,F as _,R as s,T as l,f as n,S as G}from"./StepButtonsHookForm-Dttpjjrm.js";import{u as A,B as E,M as t}from"./Label-ne8aFYav.js";import{S as a}from"./HvemPlanleggerUtils-D1xsqW5u.js";import"./index-CTjT7uj6.js";import{B}from"./Infobox-CtPDPZ_e.js";import{u as D,i as T}from"./useScrollBehaviour-CuUH4c1L.js";import{V as m}from"./useId-Dvu9sbXS.js";import{S as b}from"./Spacer-BW3tgveW.js";const k=r=>r===a.MOR_OG_FAR||r===a.MOR_OG_MEDMOR||r===a.MOR,C=r=>r===a.MOR_OG_FAR||r===a.FAR_OG_FAR||r===a.FAR,N=()=>{const r=A(),g=P(),c=f(),i=R(u.HVEM_PLANLEGGER),p=j(u.HVEM_PLANLEGGER),x=S=>{p(S),g.goToNextDefaultStep()},d=H({defaultValues:i}),o=d.watch("type"),v=i===void 0,{ref:M,scrollToBottom:F}=D();return e.jsx(h,{ref:M,steps:c,goToStep:g.goToNextStep,children:e.jsx(_,{formMethods:d,onSubmit:x,shouldUseFlexbox:!0,children:e.jsxs(m,{gap:"10",style:{flex:1},children:[e.jsxs(m,{gap:"8",children:[e.jsx(E,{children:e.jsx(t,{id:"HarValgfrieFelt"})}),e.jsxs(O,{name:"type",label:r.formatMessage({id:"HvemPlanleggerSteg.HvemPlanlegger"}),validate:[T(r.formatMessage({id:"HvemPlanleggerSteg.HvemPlanlegger.Required"}))],onChange:F,children:[e.jsx(s,{value:a.MOR_OG_FAR,autoFocus:!0,children:e.jsx(t,{id:"HvemPlanleggerSteg.MorOgFar"})}),e.jsx(s,{value:a.MOR_OG_MEDMOR,children:e.jsx(t,{id:"HvemPlanleggerSteg.MorOgMedmor"})}),e.jsx(s,{value:a.FAR_OG_FAR,children:e.jsx(t,{id:"HvemPlanleggerSteg.FarOgFar"})}),e.jsx(s,{value:a.MOR,children:e.jsx(t,{id:"HvemPlanleggerSteg.BareMor"})}),e.jsx(s,{value:a.FAR,children:e.jsx(t,{id:"HvemPlanleggerSteg.BareFar"})})]}),o&&e.jsx(B,{isDarkBlue:v,shouldFadeIn:!0,children:e.jsxs(m,{gap:"10",children:[k(o)&&e.jsx(l,{label:r.formatMessage({id:"HvemPlanleggerSteg.Mor"}),name:"navnPåMor",customErrorFormatter:n}),C(o)&&e.jsx(l,{label:r.formatMessage({id:"HvemPlanleggerSteg.Far"}),name:"navnPåFar",customErrorFormatter:n}),o===a.MOR_OG_MEDMOR&&e.jsx(l,{label:r.formatMessage({id:"HvemPlanleggerSteg.Medmor"}),name:"navnPåMedmor",customErrorFormatter:n}),o===a.FAR_OG_FAR&&e.jsx(l,{label:r.formatMessage({id:"HvemPlanleggerSteg.Far"}),name:"navnPåMedfar",customErrorFormatter:n})]})})]}),e.jsx(b,{}),e.jsx(G,{goToPreviousStep:g.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};N.__docgenInfo={description:"",methods:[],displayName:"HvemPlanleggerSteg"};export{N as H};
