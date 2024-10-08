import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as N,a as F,b as h,C as v,c as E}from"./usePlanleggerNavigator-ykRWW_nA.js";import{P as B}from"./routes-CNSEBeeI.js";import{P as C}from"./PlanleggerStepPage-BMK-eQnw.js";import{u as I,R as L,b as A,S as O}from"./StepButtonsHookForm-Bygd4x74.js";import{M as n,B as y,u as G,H as U}from"./Label-BZeSnhnH.js";import{b as z,c as K,g as P}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as Y}from"./hvemHarRettUtils-BiyQH6Vj.js";import{d as w,l as T,B as q}from"./VeiviserPage-RPc-Ebv7.js";import"./index-CTjT7uj6.js";import{n as R}from"./validation-4HO0J-zV.js";import{a as J}from"./dateFormValidation-BCNomYDE.js";import{f as $,a as i}from"./satserUtils-RIH-5EbV.js";import{c as _}from"./stringUtils-DWuGC-tf.js";import{V as d}from"./VStack-CHPVCYB5.js";import{S as Q}from"./Spacer-BW3tgveW.js";import{S as W}from"./SackKroner-DzHmr5wB.js";const X=/^\d+([,.]\d+)?$/,Z=a=>X.test(a.toString()),V=a=>r=>J(r)||Z(r)?null:a,b=({satser:a,lønnSøker:r,fornavn:t})=>{const o=$(a),u=6*o/12,m=u/21.67,p=80/100,c=(s,g)=>Math.round(Math.min(s,u)*g),l=(s,g)=>Math.round(Math.min(s*12/260,m)*g);return e.jsx(d,{gap:"4",children:e.jsxs(w,{header:r<=u?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:_(t),utregning100:i(l(r,1)),utregning80:i(l(r,p))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:_(t),utregning100:i(l(r,1)),utregning80:i(l(r,p))}}),color:"green",children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:i(c(r,1)),utregning80:i(c(r,p))}})}),r>u&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:i(o*6),a:s=>e.jsx("a",{href:T.grunnbeløpet,target:"_blank",rel:"noreferrer",children:s})}})}),e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:t}})})]})]})})};b.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const ee=({locale:a,satser:r})=>{const t=G(),o=N(a),j=F(),u=h(v.HVOR_MYE),m=R(h(v.HVEM_PLANLEGGER)),p=R(h(v.ARBEIDSSITUASJON)),c=Y(p),l=c==="kunSøker1HarRett"||c==="kunSøker2HarRett",s=z(m),g=K(m,t),S=P(m,t),k=E(v.HVOR_MYE),f=I({defaultValues:u}),M=f.watch("lønnSøker1"),H=f.watch("lønnSøker2"),D=x=>{k(x),o.goToNextStep(B.HVOR_LANG_PERIODE)};return e.jsx(C,{steps:j,goToStep:o.goToNextStep,children:e.jsx(L,{formMethods:f,onSubmit:D,shouldUseFlexbox:!0,children:e.jsxs(d,{gap:"10",style:{flex:1},children:[e.jsxs(d,{gap:"6",children:[e.jsx(U,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(d,{gap:"2",children:[e.jsx(q,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:g}}),name:"lønnSøker1",validate:[V(t.formatMessage({id:"Validering.ValidNumber"}))]})}),M&&e.jsx(b,{lønnSøker:M,satser:r,fornavn:g})]}),!l&&S&&e.jsxs(d,{gap:"2",children:[e.jsx(q,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:P(m,t)}}),name:"lønnSøker2",validate:[V(t.formatMessage({id:"Validering.ValidNumber"}))]})}),H&&e.jsx(b,{satser:r,lønnSøker:H,fornavn:S})]}),e.jsx(d,{gap:"2",children:e.jsx(w,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:s}}),icon:e.jsx(W,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:x=>e.jsx("a",{href:T.hvorMye,target:"_blank",rel:"noreferrer",children:x})}})})})})]}),e.jsx(Q,{}),e.jsx(O,{saveDataOnPreviousClick:k,goToPreviousStep:o.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ee.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{ee as H};
