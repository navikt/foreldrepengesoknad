import{aj as I,j as e,a4 as g,a3 as T,a5 as h,Y as n,a7 as w,a8 as D,a6 as A,ab as C,ac as R,Z as O,_ as z,ad as G,ag as V,ah as P,af as U}from"./iframe-3O5WXtlm.js";import{c as K,e as Y,u as f,C as y,f as W}from"./usePlanleggerNavigator-BOaMwcQc.js";import{P as $}from"./routes-Cyl7_Mgv.js";import{P as J}from"./PlanleggerStepPage-DFLh4lK8.js";import{e as Z,g as Q,a as _}from"./HvemPlanleggerUtils-B_AoHGNR.js";import{u as X}from"./hvemHarRettUtils-DqifVOpu.js";import{u as ee}from"./useScrollBehaviour-gn_EjiBT.js";import{a as re,f as l}from"./satserUtils-D9ZtxjGH.js";import{S as ne,a as te}from"./Wallet-Dzp9vSwX.js";import{S as ae}from"./Spacer-DNA1VvAw.js";const se=/^\d+([,.]\d+)?$/,ie=i=>se.test(i.toString()),q=i=>r=>I(r)||ie(r)?null:i,S=({satser:i,lønnSøker:r,fornavn:u})=>{const p=re(i),a=6*p/12,x=a/21.67,s=80/100,v=(t,o)=>Number.isNaN(t)?0:Math.round(Math.min(t,a)*o),m=(t,o)=>Number.isNaN(t)?0:Math.round(Math.min(t*12/260,x)*o);return e.jsx(g,{gap:"space-16",children:e.jsx(T,{header:r<=a?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:A(u),utregning100:l(m(r,1)),utregning80:l(m(r,s))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:A(u),utregning100:l(m(r,1)),utregning80:l(m(r,s))}}),color:"green",icon:e.jsx(ne,{height:24,width:24,color:"var(--ax-bg-success-strong)",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"space-8",children:[e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:l(v(r,1)),utregning80:l(v(r,s))}})}),r>a&&e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:l(p*6),a:t=>e.jsx(w,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:t})}})}),e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:u}})})]})]})})})};S.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const oe=({satser:i})=>{const r=C(),u=K(),p=Y(),b=f(y.HVOR_MYE),a=R(f(y.HVEM_PLANLEGGER)),x=R(f(y.ARBEIDSSITUASJON)),s=X(x),v=s==="kunSøker1HarRett"||s==="kunSøker2HarRett",m=Z(a),t=Q(a,r),o=_(a,r),j=W(y.HVOR_MYE),c=O({defaultValues:b}),k=c.watch("lønnSøker1"),M=c.watch("lønnSøker2"),H=d=>{if(!d)return!1;const N=String(d);return N.length>=3&&/^\d+$/.test(N)},F=H(k),E=H(M),L=d=>{j(d),u.goToNextStep($.HVOR_LANG_PERIODE)},{ref:B}=ee();return e.jsx(J,{ref:B,steps:p,goToStep:u.goToNextStep,children:e.jsx(z,{formMethods:c,onSubmit:L,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"space-40",style:{flex:1},children:[e.jsxs(g,{gap:"space-24",children:[e.jsx(G,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"space-8",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:s==="kunSøker2HarRett"?"lønnSøker2":"lønnSøker1",control:c.control,label:s==="kunSøker2HarRett"?e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:o}}):e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:t}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),F&&e.jsx(S,{lønnSøker:Number(k),satser:i,fornavn:s==="kunSøker2HarRett"?o??"":t??""})]}),!v&&o&&e.jsxs(g,{gap:"space-8",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:"lønnSøker2",control:c.control,label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:_(a,r)}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(S,{satser:i,lønnSøker:Number(M),fornavn:o})]}),e.jsx(g,{gap:"space-8",children:e.jsx(T,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:m}}),icon:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:d=>e.jsx(w,{href:D.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:d})}})})})})]}),e.jsx(ae,{}),e.jsx(U,{saveDataOnPreviousClick:j,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};oe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
