import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as I,a as O,b as S,C as y,c as z}from"./usePlanleggerNavigator-CtZztggr.js";import{P as G}from"./routes-Cyl7_Mgv.js";import{P as U}from"./PlanleggerStepPage-CpAzVme-.js";import{u as K,R as W,b as V,S as Y}from"./StepButtonsHookForm-CNBQaM6m.js";import{u as w,h as D,M as a,B as f,L as F,l as L,H as $,a as R}from"./VeiviserPage-D6rzfKEu.js";import{b as J,c as Q,g as P}from"./HvemPlanleggerUtils-ELKMd8Xo.js";import{u as X}from"./hvemHarRettUtils-BjfRVGSJ.js";import"./index-CR__hKHy.js";import{n as q}from"./validation-DYlyn1BB.js";import{a as Z}from"./dateFormValidation-Ci3PRuoF.js";import{f as ee,a as m}from"./satserUtils-y1Ml9Oia.js";import{c as T}from"./stringUtils-DApHD7Y2.js";import{V as g}from"./VStack-2apmvZh_.js";import{S as re,a as ne}from"./Wallet-CEpMmkt_.js";import{S as te}from"./Spacer-DmBY75Fg.js";const ae=/^\d+([,.]\d+)?$/,se=l=>ae.test(l.toString()),_=l=>r=>Z(r)||se(r)?null:l,b=({satser:l,lønnSøker:r,fornavn:n})=>{const t=w().locale,p=ee(l),i=6*p/12,h=i/21.67,o=80/100,v=(s,u)=>isNaN(s)?0:Math.round(Math.min(s,i)*u),d=(s,u)=>isNaN(s)?0:Math.round(Math.min(s*12/260,h)*u);return e.jsx(g,{gap:"4",children:e.jsx(D,{header:r<=i?e.jsx(a,{id:"HvorMyeSteg.VilFå",values:{hvem:T(n),utregning100:m(d(r,1),t),utregning80:m(d(r,o),t)}}):e.jsx(a,{id:"HvorMyeSteg.KanFå",values:{hvem:T(n),utregning100:m(d(r,1),t),utregning80:m(d(r,o),t)}}),color:"green",icon:e.jsx(re,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"2",children:[e.jsx(f,{children:e.jsx(a,{id:"HvorMyeSteg.Utregning",values:{utregning100:m(v(r,1),t),utregning80:m(v(r,o),t)}})}),r>i&&e.jsxs(e.Fragment,{children:[e.jsx(f,{children:e.jsx(a,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:m(p*6,t),a:s=>e.jsx(F,{href:L.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:s})}})}),e.jsx(f,{children:e.jsx(a,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:n}})})]})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const ie=({locale:l,satser:r})=>{const n=w(),t=I(l),p=O(),j=S(y.HVOR_MYE),i=q(S(y.HVEM_PLANLEGGER)),h=q(S(y.ARBEIDSSITUASJON)),o=X(h),v=o==="kunSøker1HarRett"||o==="kunSøker2HarRett",d=J(i),s=Q(i,n),u=P(i,n),k=z(y.HVOR_MYE),x=K({defaultValues:j}),M=x.watch("lønnSøker1"),H=x.watch("lønnSøker2"),A=c=>{if(!c)return!1;const N=String(c);return N.length>=3&&/^\d+$/.test(N)},E=A(M),B=A(H),C=c=>{k(c),t.goToNextStep(G.HVOR_LANG_PERIODE)};return e.jsx(U,{steps:p,goToStep:t.goToNextStep,children:e.jsx(W,{formMethods:x,onSubmit:C,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"6",children:[e.jsx($,{size:"medium",spacing:!0,level:"2",children:e.jsx(a,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(V,{label:o==="kunSøker2HarRett"?e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:u}}):e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:s}}),name:"lønnSøker1",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(b,{lønnSøker:Number(M),satser:r,fornavn:o==="kunSøker2HarRett"?u??"":s??""})]}),!v&&u&&e.jsxs(g,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(V,{label:e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:P(i,n)}}),name:"lønnSøker2",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),B&&e.jsx(b,{satser:r,lønnSøker:Number(H),fornavn:u})]}),e.jsx(g,{gap:"2",children:e.jsx(D,{header:e.jsx(a,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:d}}),icon:e.jsx(ne,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(f,{children:e.jsx(a,{id:"HvorMyeSteg.MerDetaljert",values:{a:c=>e.jsx(F,{href:L.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:c})}})})})})]}),e.jsx(te,{}),e.jsx(Y,{saveDataOnPreviousClick:k,goToPreviousStep:t.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ie.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{ie as H};
