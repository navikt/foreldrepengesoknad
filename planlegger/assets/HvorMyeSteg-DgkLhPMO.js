import{aj as B,j as e,a4 as g,a3 as T,a5 as h,Z as n,a7 as w,a8 as D,a6 as N,ab as C,ac as R,_ as I,$ as O,ad as z,ag as V,ah as P,af as G}from"./iframe-BosW6K5Z.js";import{c as U,e as K,u as f,C as y,f as $}from"./usePlanleggerNavigator-DUrK2eUs.js";import{P as W}from"./routes-Cyl7_Mgv.js";import{P as Y}from"./PlanleggerStepPage-Bo20lr_j.js";import{e as J,g as Z,a as _}from"./HvemPlanleggerUtils-r8niiArc.js";import{u as Q}from"./hvemHarRettUtils-B93lXCXL.js";import{a as X,f as l}from"./satserUtils-CF_nSNed.js";import{S as ee,a as re}from"./Wallet-B2uTKq04.js";import{S as ne}from"./Spacer-DSNeARcn.js";const te=/^\d+([,.]\d+)?$/,ae=i=>te.test(i.toString()),q=i=>r=>B(r)||ae(r)?null:i,S=({satser:i,lønnSøker:r,fornavn:u})=>{const v=X(i),a=6*v/12,x=a/21.67,s=80/100,p=(t,o)=>isNaN(t)?0:Math.round(Math.min(t,a)*o),d=(t,o)=>isNaN(t)?0:Math.round(Math.min(t*12/260,x)*o);return e.jsx(g,{gap:"4",children:e.jsx(T,{header:r<=a?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:N(u),utregning100:l(d(r,1)),utregning80:l(d(r,s))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:N(u),utregning100:l(d(r,1)),utregning80:l(d(r,s))}}),color:"green",icon:e.jsx(ee,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"2",children:[e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:l(p(r,1)),utregning80:l(p(r,s))}})}),r>a&&e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:l(v*6),a:t=>e.jsx(w,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:t})}})}),e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:u}})})]})]})})})};S.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const se=({satser:i})=>{const r=C(),u=U(),v=K(),j=f(y.HVOR_MYE),a=R(f(y.HVEM_PLANLEGGER)),x=R(f(y.ARBEIDSSITUASJON)),s=Q(x),p=s==="kunSøker1HarRett"||s==="kunSøker2HarRett",d=J(a),t=Z(a,r),o=_(a,r),b=$(y.HVOR_MYE),c=I({defaultValues:j}),k=c.watch("lønnSøker1"),M=c.watch("lønnSøker2"),H=m=>{if(!m)return!1;const A=String(m);return A.length>=3&&/^\d+$/.test(A)},F=H(k),E=H(M),L=m=>{b(m),u.goToNextStep(W.HVOR_LANG_PERIODE)};return e.jsx(Y,{steps:v,goToStep:u.goToNextStep,children:e.jsx(O,{formMethods:c,onSubmit:L,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"6",children:[e.jsx(z,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"2",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:s==="kunSøker2HarRett"?"lønnSøker2":"lønnSøker1",control:c.control,label:s==="kunSøker2HarRett"?e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:o}}):e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:t}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),F&&e.jsx(S,{lønnSøker:Number(k),satser:i,fornavn:s==="kunSøker2HarRett"?o??"":t??""})]}),!p&&o&&e.jsxs(g,{gap:"2",children:[e.jsx(V,{isDarkBlue:!0,children:e.jsx(P,{name:"lønnSøker2",control:c.control,label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:_(a,r)}}),validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(S,{satser:i,lønnSøker:Number(M),fornavn:o})]}),e.jsx(g,{gap:"2",children:e.jsx(T,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:d}}),icon:e.jsx(re,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:m=>e.jsx(w,{href:D.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:m})}})})})})]}),e.jsx(ne,{}),e.jsx(G,{saveDataOnPreviousClick:b,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
