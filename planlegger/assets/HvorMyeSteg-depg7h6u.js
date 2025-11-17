import{aj as I,j as e,a2 as g,a1 as T,a3 as x,X as n,a5 as w,a6 as D,a4 as A,a9 as C,aa as R,Y as O,Z as z,ab as G,af as V,ag as P,ad as U,ae as K}from"./iframe-CWVJK1FM.js";import{c as Y,e as W,u as f,C as y,f as $}from"./usePlanleggerNavigator-WbqkBMqr.js";import{P as J}from"./routes-Cyl7_Mgv.js";import{P as X}from"./PlanleggerStepPage-DTHwde7f.js";import{e as Z,g as Q,a as _}from"./HvemPlanleggerUtils-BZWijMz7.js";import{u as ee}from"./hvemHarRettUtils-Bm8Xp99V.js";import{u as re}from"./useScrollBehaviour-DROkofBD.js";import{a as ne,f as l}from"./satserUtils-CfqJyRrq.js";import{S as te,a as ae}from"./Wallet-CazvNZVQ.js";const se=/^\d+([,.]\d+)?$/,ie=i=>se.test(i.toString()),q=i=>r=>I(r)||ie(r)?null:i,S=({satser:i,lønnSøker:r,fornavn:u})=>{const p=ne(i),a=6*p/12,h=a/21.67,s=80/100,v=(t,o)=>Number.isNaN(t)?0:Math.round(Math.min(t,a)*o),m=(t,o)=>Number.isNaN(t)?0:Math.round(Math.min(t*12/260,h)*o);return e.jsx(g,{gap:"space-16",children:e.jsx(T,{header:r<=a?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:A(u),utregning100:l(m(r,1)),utregning80:l(m(r,s))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:A(u),utregning100:l(m(r,1)),utregning80:l(m(r,s))}}),color:"green",icon:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-success-strong)",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"space-8",children:[e.jsx(x,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:l(v(r,1)),utregning80:l(v(r,s))}})}),r>a&&e.jsxs(e.Fragment,{children:[e.jsx(x,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:l(p*6),a:t=>e.jsx(w,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:t})}})}),e.jsx(x,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:u}})})]})]})})})};S.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const oe=({satser:i})=>{const r=C(),u=Y(),p=W(),b=f(y.HVOR_MYE),a=R(f(y.HVEM_PLANLEGGER)),h=R(f(y.ARBEIDSSITUASJON)),s=ee(h),v=s==="kunSøker1HarRett"||s==="kunSøker2HarRett",m=Z(a),t=Q(a,r),o=_(a,r),j=$(y.HVOR_MYE),c=O({defaultValues:b}),k=c.watch("lønnSøker1"),M=c.watch("lønnSøker2"),H=d=>{if(!d)return!1;const N=String(d);return N.length>=3&&/^\d+$/.test(N)},F=H(k),E=H(M),L=d=>{j(d),u.goToNextStep(J.HVOR_LANG_PERIODE)},{ref:B}=re();return e.jsx(X,{ref:B,steps:p,goToStep:u.goToNextStep,children:e.jsx(z,{formMethods:c,onSubmit:L,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"space-40",style:{flex:1},children:[e.jsxs(g,{gap:"space-24",children:[e.jsx(G,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"space-8",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:s==="kunSøker2HarRett"?"lønnSøker2":"lønnSøker1",control:c.control,label:s==="kunSøker2HarRett"?e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:o}}):e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:t}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),F&&e.jsx(S,{lønnSøker:Number(k),satser:i,fornavn:s==="kunSøker2HarRett"?o??"":t??""})]}),!v&&o&&e.jsxs(g,{gap:"space-8",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:"lønnSøker2",control:c.control,label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:_(a,r)}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(S,{satser:i,lønnSøker:Number(M),fornavn:o})]}),e.jsx(g,{gap:"space-8",children:e.jsx(T,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:m}}),icon:e.jsx(ae,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(x,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:d=>e.jsx(w,{href:D.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:d})}})})})})]}),e.jsx(U,{}),e.jsx(K,{saveDataOnPreviousClick:j,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};oe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{oe as H};
