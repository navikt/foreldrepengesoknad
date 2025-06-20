import{ah as B,j as e,a2 as g,a1 as T,a3 as y,Y as n,a5 as w,a6 as D,a4 as N,a9 as C,aa as V,Z as I,_ as O,ab as z,ae as P,af as R,ad as G}from"./iframe-CVrfE2al.js";import{c as U,e as K,u as f,C as p,f as Y}from"./usePlanleggerNavigator-CiFzBK8e.js";import{P as W}from"./routes-Cyl7_Mgv.js";import{P as $}from"./PlanleggerStepPage-D4MInbhN.js";import{e as J,g as Z,a as _}from"./HvemPlanleggerUtils-BUtsRXNw.js";import{u as Q}from"./hvemHarRettUtils-DYggLVfz.js";import{a as X,f as l}from"./satserUtils-NKMJ441h.js";import{S as ee,a as re}from"./Wallet-Dg1Wjyam.js";import{S as ne}from"./Spacer-Cii7NwhO.js";const te=/^\d+([,.]\d+)?$/,ae=s=>te.test(s.toString()),q=s=>r=>B(r)||ae(r)?null:s,S=({satser:s,lønnSøker:r,fornavn:u})=>{const c=X(s),a=6*c/12,h=a/21.67,i=80/100,v=(t,o)=>isNaN(t)?0:Math.round(Math.min(t,a)*o),d=(t,o)=>isNaN(t)?0:Math.round(Math.min(t*12/260,h)*o);return e.jsx(g,{gap:"4",children:e.jsx(T,{header:r<=a?e.jsx(n,{id:"HvorMyeSteg.VilFå",values:{hvem:N(u),utregning100:l(d(r,1)),utregning80:l(d(r,i))}}):e.jsx(n,{id:"HvorMyeSteg.KanFå",values:{hvem:N(u),utregning100:l(d(r,1)),utregning80:l(d(r,i))}}),color:"green",icon:e.jsx(ee,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(g,{gap:"2",children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.Utregning",values:{utregning100:l(v(r,1)),utregning80:l(v(r,i))}})}),r>a&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:l(c*6),a:t=>e.jsx(w,{href:D.grunnbeløpet,target:"_blank",rel:"noreferrer",inlineText:!0,children:t})}})}),e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:u}})})]})]})})})};S.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const se=({satser:s})=>{const r=C(),u=U(),c=K(),j=f(p.HVOR_MYE),a=V(f(p.HVEM_PLANLEGGER)),h=V(f(p.ARBEIDSSITUASJON)),i=Q(h),v=i==="kunSøker1HarRett"||i==="kunSøker2HarRett",d=J(a),t=Z(a,r),o=_(a,r),b=Y(p.HVOR_MYE),x=I({defaultValues:j}),k=x.watch("lønnSøker1"),M=x.watch("lønnSøker2"),H=m=>{if(!m)return!1;const A=String(m);return A.length>=3&&/^\d+$/.test(A)},F=H(k),E=H(M),L=m=>{b(m),u.goToNextStep(W.HVOR_LANG_PERIODE)};return e.jsx($,{steps:c,goToStep:u.goToNextStep,children:e.jsx(O,{formMethods:x,onSubmit:L,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"6",children:[e.jsx(z,{size:"medium",spacing:!0,level:"2",children:e.jsx(n,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(g,{gap:"2",children:[e.jsx(P,{isDarkBlue:!0,children:e.jsx(R,{label:i==="kunSøker2HarRett"?e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:o}}):e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:t}}),name:"lønnSøker1",validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),F&&e.jsx(S,{lønnSøker:Number(k),satser:s,fornavn:i==="kunSøker2HarRett"?o??"":t??""})]}),!v&&o&&e.jsxs(g,{gap:"2",children:[e.jsx(P,{isDarkBlue:!0,children:e.jsx(R,{label:e.jsx(n,{id:"HvorMyeSteg.Lønn",values:{hvem:_(a,r)}}),name:"lønnSøker2",validate:[q(r.formatMessage({id:"Validering.ValidNumber"}))],description:r.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),E&&e.jsx(S,{satser:s,lønnSøker:Number(M),fornavn:o})]}),e.jsx(g,{gap:"2",children:e.jsx(T,{header:e.jsx(n,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:d}}),icon:e.jsx(re,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(n,{id:"HvorMyeSteg.MerDetaljert",values:{a:m=>e.jsx(w,{href:D.hvorMye,target:"_blank",rel:"noreferrer",inlineText:!0,children:m})}})})})})]}),e.jsx(ne,{}),e.jsx(G,{saveDataOnPreviousClick:b,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
