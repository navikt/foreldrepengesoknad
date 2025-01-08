import{j as e}from"./jsx-runtime-DwRxq3ZX.js";import{u as E,a as L,b as S,C as v,c as B}from"./usePlanleggerNavigator-D8MRbo-c.js";import{P as C}from"./routes-gnI_NAHe.js";import{P as I}from"./PlanleggerStepPage-B4mv9i7n.js";import{u as O,R as z,b as A,S as G}from"./StepButtonsHookForm-BshiUIx4.js";import{u as w,M as a,B as y,H as U}from"./UttaksdagenString-BukZE9W5.js";import{b as K,c as W,g as P}from"./HvemPlanleggerUtils-BK9nF1ca.js";import{u as Y}from"./hvemHarRettUtils-C-poRxZI.js";import{d as N,L as V,l as D,B as R}from"./VeiviserPage-D4tcb8_M.js";import"./index-BX3iQpgp.js";import{n as q}from"./validation-C6jaRJB5.js";import{a as J}from"./dateFormValidation-Bp6HZMTm.js";import{f as $,a as m}from"./satserUtils-Cswv5nKA.js";import{c as T}from"./stringUtils-BLFzASq_.js";import{V as g}from"./VStack-D5W2V_Wo.js";import{S as Q,a as X}from"./Wallet-B2EmqHGK.js";import{S as Z}from"./Spacer-BzMIvYka.js";const ee=/^\d+([,.]\d+)?$/,re=o=>ee.test(o.toString()),_=o=>r=>J(r)||re(r)?null:o,b=({satser:o,lønnSøker:r,fornavn:n})=>{const t=w().locale,c=$(o),s=6*c/12,f=s/21.67,u=80/100,p=(i,l)=>Math.round(Math.min(i,s)*l),d=(i,l)=>Math.round(Math.min(i*12/260,f)*l);return e.jsx(g,{gap:"4",children:e.jsx(N,{header:r<=s?e.jsx(a,{id:"HvorMyeSteg.VilFå",values:{hvem:T(n),utregning100:m(d(r,1),t),utregning80:m(d(r,u),t)}}):e.jsx(a,{id:"HvorMyeSteg.KanFå",values:{hvem:T(n),utregning100:m(d(r,1),t),utregning80:m(d(r,u),t)}}),color:"green",icon:e.jsx(Q,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"2",children:[e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.Utregning",values:{utregning100:m(p(r,1),t),utregning80:m(p(r,u),t)}})}),r>s&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:m(c*6,t),a:i=>e.jsx(V,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:i})}})}),e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:n}})})]})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const ne=({locale:o,satser:r})=>{const n=w(),t=E(o),c=L(),j=S(v.HVOR_MYE),s=q(S(v.HVEM_PLANLEGGER)),f=q(S(v.ARBEIDSSITUASJON)),u=Y(f),p=u==="kunSøker1HarRett"||u==="kunSøker2HarRett",d=K(s),i=W(s,n),l=P(s,n),k=B(v.HVOR_MYE),x=O({defaultValues:j}),M=x.watch("lønnSøker1"),H=x.watch("lønnSøker2"),F=h=>{k(h),t.goToNextStep(C.HVOR_LANG_PERIODE)};return e.jsx(I,{steps:c,goToStep:t.goToNextStep,children:e.jsx(z,{formMethods:x,onSubmit:F,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"6",children:[e.jsx(U,{size:"medium",spacing:!0,level:"2",children:e.jsx(a,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:u==="kunSøker2HarRett"?e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:l}}):e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:i}}),name:"lønnSøker1",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),M&&e.jsx(b,{lønnSøker:M,satser:r,fornavn:i})]}),!p&&l&&e.jsxs(g,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:P(s,n)}}),name:"lønnSøker2",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),H&&e.jsx(b,{satser:r,lønnSøker:H,fornavn:l})]}),e.jsx(g,{gap:"2",children:e.jsx(N,{header:e.jsx(a,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:d}}),icon:e.jsx(X,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.MerDetaljert",values:{a:h=>e.jsx(V,{href:D.hvorMye,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:h})}})})})})]}),e.jsx(Z,{}),e.jsx(G,{saveDataOnPreviousClick:k,goToPreviousStep:t.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{ne as H};
