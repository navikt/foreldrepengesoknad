import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as D,a as F,b as S,C as f,c as I}from"./usePlanleggerNavigator-ykRWW_nA.js";import{P as B}from"./routes-CNSEBeeI.js";import{P as C}from"./PlanleggerStepPage-BMK-eQnw.js";import{u as L,R as z,b as A,S as G}from"./StepButtonsHookForm-Bygd4x74.js";import{M as o,B as h,u as U,H as K}from"./Label-BZeSnhnH.js";import{b as Y,c as J,g as P}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as W}from"./hvemHarRettUtils-BiyQH6Vj.js";import{d as E,L as T,l as N,B as R}from"./VeiviserPage-RPc-Ebv7.js";import{r as y}from"./index-CTjT7uj6.js";import{n as _}from"./validation-4HO0J-zV.js";import{a as $}from"./dateFormValidation-BCNomYDE.js";import{a as Q,b as u}from"./satserUtils-CxlH83MZ.js";import{c as V}from"./stringUtils-DWuGC-tf.js";import{u as X,V as m}from"./VStack-CHPVCYB5.js";import{S as Z}from"./Spacer-BW3tgveW.js";import{S as ee}from"./SackKroner-DzHmr5wB.js";var re=function(t,n){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)n.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(a[r[s]]=t[r[s]]);return a};const ne=y.forwardRef((t,n)=>{var{title:a,titleId:r}=t,s=re(t,["title","titleId"]);let i=X();return i=a?r||"title-"+i:void 0,y.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:n,"aria-labelledby":i},s),a?y.createElement("title",{id:i},a):null,y.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M15.803 2.276a.75.75 0 0 1 .868.389l1.293 2.585H19c.966 0 1.75.784 1.75 1.75v2.418c.591.281 1 .884 1 1.582v3c0 .698-.409 1.3-1 1.582V18A1.75 1.75 0 0 1 19 19.75H4A1.75 1.75 0 0 1 2.25 18V7c0-.966.784-1.75 1.75-1.75h.9zm-.199 1.61.683 1.364H10.6zM3.75 7A.25.25 0 0 1 4 6.75h15a.25.25 0 0 1 .25.25v2.25h-3.917a2 2 0 0 0-.138.007 3.52 3.52 0 0 0-1.37.393 2.86 2.86 0 0 0-1.093 1.006c-.305.486-.482 1.097-.482 1.844s.177 1.358.482 1.844c.304.483.706.8 1.093 1.006a3.5 3.5 0 0 0 1.508.4h3.917V18a.25.25 0 0 1-.25.25H4a.25.25 0 0 1-.25-.25zm11.603 3.75H20a.25.25 0 0 1 .25.25v3a.25.25 0 0 1-.25.25h-4.647q-.011 0-.037-.002h-.007a2.023 2.023 0 0 1-.78-.222 1.36 1.36 0 0 1-.526-.48c-.136-.216-.253-.543-.253-1.046s.117-.83.253-1.047c.138-.22.323-.371.525-.478a2 2 0 0 1 .825-.225m.147 1a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),te=/^\d+([,.]\d+)?$/,ae=t=>te.test(t.toString()),q=t=>n=>$(n)||ae(n)?null:t,k=({satser:t,lønnSøker:n,fornavn:a})=>{const r=Q(t),i=6*r/12,d=i/21.67,v=80/100,g=(l,p)=>Math.round(Math.min(l,i)*p),c=(l,p)=>Math.round(Math.min(l*12/260,d)*p);return e.jsx(m,{gap:"4",children:e.jsx(E,{header:n<=i?e.jsx(o,{id:"HvorMyeSteg.VilFå",values:{hvem:V(a),utregning100:u(c(n,1)),utregning80:u(c(n,v))}}):e.jsx(o,{id:"HvorMyeSteg.KanFå",values:{hvem:V(a),utregning100:u(c(n,1)),utregning80:u(c(n,v))}}),color:"green",icon:e.jsx(ne,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(m,{gap:"2",children:[e.jsx(h,{children:e.jsx(o,{id:"HvorMyeSteg.Utregning",values:{utregning100:u(g(n,1)),utregning80:u(g(n,v))}})}),n>i&&e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx(o,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:u(r*6),a:l=>e.jsx(T,{href:N.grunnbeløpet,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:l})}})}),e.jsx(h,{children:e.jsx(o,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:a}})})]})]})})})};k.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const se=({locale:t,satser:n})=>{const a=U(),r=D(t),s=F(),i=S(f.HVOR_MYE),d=_(S(f.HVEM_PLANLEGGER)),v=_(S(f.ARBEIDSSITUASJON)),g=W(v),c=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",l=Y(d),p=J(d,a),x=P(d,a),M=I(f.HVOR_MYE),b=L({defaultValues:i}),H=b.watch("lønnSøker1"),w=b.watch("lønnSøker2"),O=j=>{M(j),r.goToNextStep(B.HVOR_LANG_PERIODE)};return e.jsx(C,{steps:s,goToStep:r.goToNextStep,children:e.jsx(z,{formMethods:b,onSubmit:O,shouldUseFlexbox:!0,children:e.jsxs(m,{gap:"10",style:{flex:1},children:[e.jsxs(m,{gap:"6",children:[e.jsx(K,{size:"medium",spacing:!0,level:"2",children:e.jsx(o,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(m,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:g==="kunSøker2HarRett"?e.jsx(o,{id:"HvorMyeSteg.Lønn",values:{hvem:x}}):e.jsx(o,{id:"HvorMyeSteg.Lønn",values:{hvem:p}}),name:"lønnSøker1",validate:[q(a.formatMessage({id:"Validering.ValidNumber"}))]})}),H&&e.jsx(k,{lønnSøker:H,satser:n,fornavn:p})]}),!c&&x&&e.jsxs(m,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(o,{id:"HvorMyeSteg.Lønn",values:{hvem:P(d,a)}}),name:"lønnSøker2",validate:[q(a.formatMessage({id:"Validering.ValidNumber"}))]})}),w&&e.jsx(k,{satser:n,lønnSøker:w,fornavn:x})]}),e.jsx(m,{gap:"2",children:e.jsx(E,{header:e.jsx(o,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:l}}),icon:e.jsx(ee,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(o,{id:"HvorMyeSteg.MerDetaljert",values:{a:j=>e.jsx(T,{href:N.hvorMye,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:j})}})})})})]}),e.jsx(Z,{}),e.jsx(G,{saveDataOnPreviousClick:M,goToPreviousStep:r.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
