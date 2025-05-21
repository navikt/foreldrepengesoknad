import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as B,a as C,b as x,C as v,c as I}from"./usePlanleggerNavigator-eoygEux_.js";import{P as O}from"./routes-Cyl7_Mgv.js";import{P as z}from"./PlanleggerStepPage-ChY5fp_x.js";import{u as G,R as U,b as V,S as K}from"./StepButtonsHookForm-DAulkPa7.js";import{h as T,B as y,M as n,L as w,l as D,u as W,H as Y,a as N}from"./VeiviserPage-CHSQEW6u.js";import{b as $,g as J,c as R}from"./HvemPlanleggerUtils-CSaQ6gna.js";import{u as Q}from"./hvemHarRettUtils-CtKbu_BH.js";import"./index-DQLiH3RP.js";import{n as P}from"./validation-Dy1ue2_T.js";import{a as X}from"./dateFormValidation-DphE57k6.js";import{f as Z,a as m}from"./satserUtils-9JOgwpQY.js";import{c as _}from"./stringUtils-DApHD7Y2.js";import{V as l}from"./VStack-05Ww9A8B.js";import{S as ee,a as re}from"./Wallet-BDcZwlms.js";import{S as ne}from"./Spacer-C5GDfzOr.js";const te=/^\d+([,.]\d+)?$/,ae=s=>te.test(s.toString()),q=s=>r=>X(r)||ae(r)?null:s,S=({satser:s,lønnSøker:r,fornavn:u})=>{const c=Z(s),a=6*c/12,f=a/21.67,i=80/100,p=(t,o)=>isNaN(t)?0:Math.round(Math.min(t,a)*o),g=(t,o)=>isNaN(t)?0:Math.round(Math.min(t*12/260,f)*o);return e.jsx(l,{gap:"4",children:e.jsx(T,{header:r<=a?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:_(u),utregning100:m(g(r,1)),utregning80:m(g(r,i))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:_(u),utregning100:m(g(r,1)),utregning80:m(g(r,i))}}),color:"green",icon:e.jsx(ee,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(l,{gap:"2",children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:m(p(r,1)),utregning80:m(p(r,i))}})}),r>a&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:m(c*6),a:t=>e.jsx(w,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:t})}})}),e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:u}})})]})]})})})};S.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const se=({satser:s})=>{const r=W(),u=B(),c=C(),b=x(v.HVOR_MYE),a=P(x(v.HVEM_PLANLEGGER)),f=P(x(v.ARBEIDSSITUASJON)),i=Q(f),p=i==="kunSøker1HarRett"||i==="kunSøker2HarRett",g=$(a),t=J(a,r),o=R(a,r),j=I(v.HVOR_MYE),h=G({defaultValues:b}),k=h.watch("lønnSøker1"),M=h.watch("lønnSøker2"),H=d=>{if(!d)return!1;const A=String(d);return A.length>=3&&/^\d+$/.test(A)},F=H(k),E=H(M),L=d=>{j(d),u.goToNextStep(O.HVOR_LANG_PERIODE)};return e.jsx(z,{steps:c,goToStep:u.goToNextStep,children:e.jsx(U,{formMethods:h,onSubmit:L,shouldUseFlexbox:!0,children:e.jsxs(l,{gap:"10",style:{flex:1},children:[e.jsxs(l,{gap:"6",children:[e.jsx(Y,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(l,{gap:"2",children:[e.jsx(N,{isDarkBlue:!0,children:e.jsx(V,{label:i==="kunSøker2HarRett"?e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:o}}):e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:t}}),name:"lønnSøker1",validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),F&&e.jsx(S,{lønnSøker:Number(k),satser:s,fornavn:i==="kunSøker2HarRett"?o??"":t??""})]}),!p&&o&&e.jsxs(l,{gap:"2",children:[e.jsx(N,{isDarkBlue:!0,children:e.jsx(V,{label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:R(a,r)}}),name:"lønnSøker2",validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(S,{satser:s,lønnSøker:Number(M),fornavn:o})]}),e.jsx(l,{gap:"2",children:e.jsx(T,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:g}}),icon:e.jsx(re,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:d=>e.jsx(w,{href:D.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:d})}})})})})]}),e.jsx(ne,{}),e.jsx(K,{saveDataOnPreviousClick:j,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};export{se as H};
