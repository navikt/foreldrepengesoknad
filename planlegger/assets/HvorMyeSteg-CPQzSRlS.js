import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as E,a as L,b as S,C as v,c as B}from"./usePlanleggerNavigator-CB5JmEPp.js";import{P as C}from"./routes-Cyl7_Mgv.js";import{P as I}from"./PlanleggerStepPage-GZKy2b1y.js";import{u as O,R as z,b as A,S as G}from"./StepButtonsHookForm-DKwXHReh.js";import{u as _,h as w,M as a,B as y,L as V,l as D,H as U,a as N}from"./VeiviserPage-BEkP5Xgm.js";import{b as K,c as W,g as R}from"./HvemPlanleggerUtils-Bv9Egsad.js";import{u as Y}from"./hvemHarRettUtils-CG2w_MQ5.js";import"./index-CR__hKHy.js";import{n as P}from"./validation-DYlyn1BB.js";import{a as J}from"./dateFormValidation-DK8wrmQ9.js";import{f as $,a as m}from"./satserUtils-BANzfR7D.js";import{c as q}from"./stringUtils-DApHD7Y2.js";import{V as g}from"./VStack-2apmvZh_.js";import{S as Q,a as X}from"./Wallet-CEpMmkt_.js";import{S as Z}from"./Spacer-DmBY75Fg.js";const ee=/^\d+([,.]\d+)?$/,re=l=>ee.test(l.toString()),T=l=>r=>J(r)||re(r)?null:l,b=({satser:l,lønnSøker:r,fornavn:n})=>{const t=_().locale,c=$(l),i=6*c/12,f=i/21.67,o=80/100,p=(s,u)=>isNaN(s)?0:Math.round(Math.min(s,i)*u),d=(s,u)=>isNaN(s)?0:Math.round(Math.min(s*12/260,f)*u);return e.jsx(g,{gap:"4",children:e.jsx(w,{header:r<=i?e.jsx(a,{id:"HvorMyeSteg.VilFå",values:{hvem:q(n),utregning100:m(d(r,1),t),utregning80:m(d(r,o),t)}}):e.jsx(a,{id:"HvorMyeSteg.KanFå",values:{hvem:q(n),utregning100:m(d(r,1),t),utregning80:m(d(r,o),t)}}),color:"green",icon:e.jsx(Q,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"2",children:[e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.Utregning",values:{utregning100:m(p(r,1),t),utregning80:m(p(r,o),t)}})}),r>i&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:m(c*6,t),a:s=>e.jsx(V,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:s})}})}),e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:n}})})]})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const ne=({locale:l,satser:r})=>{const n=_(),t=E(l),c=L(),j=S(v.HVOR_MYE),i=P(S(v.HVEM_PLANLEGGER)),f=P(S(v.ARBEIDSSITUASJON)),o=Y(f),p=o==="kunSøker1HarRett"||o==="kunSøker2HarRett",d=K(i),s=W(i,n),u=R(i,n),k=B(v.HVOR_MYE),h=O({defaultValues:j}),M=h.watch("lønnSøker1"),H=h.watch("lønnSøker2"),F=x=>{k(x),t.goToNextStep(C.HVOR_LANG_PERIODE)};return e.jsx(I,{steps:c,goToStep:t.goToNextStep,children:e.jsx(z,{formMethods:h,onSubmit:F,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"6",children:[e.jsx(U,{size:"medium",spacing:!0,level:"2",children:e.jsx(a,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"2",children:[e.jsx(N,{isDarkBlue:!0,children:e.jsx(A,{label:o==="kunSøker2HarRett"?e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:u}}):e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:s}}),name:"lønnSøker1",validate:[T(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),M&&e.jsx(b,{lønnSøker:M,satser:r,fornavn:o==="kunSøker2HarRett"?u??"":s??""})]}),!p&&u&&e.jsxs(g,{gap:"2",children:[e.jsx(N,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(a,{id:"HvorMyeSteg.Lønn",values:{hvem:R(i,n)}}),name:"lønnSøker2",validate:[T(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),H&&e.jsx(b,{satser:r,lønnSøker:H,fornavn:u})]}),e.jsx(g,{gap:"2",children:e.jsx(w,{header:e.jsx(a,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:d}}),icon:e.jsx(X,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(a,{id:"HvorMyeSteg.MerDetaljert",values:{a:x=>e.jsx(V,{href:D.hvorMye,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:x})}})})})})]}),e.jsx(Z,{}),e.jsx(G,{saveDataOnPreviousClick:k,goToPreviousStep:t.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
