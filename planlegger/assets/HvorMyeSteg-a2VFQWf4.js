import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as F,a as E,b as S,C as v,c as L}from"./usePlanleggerNavigator-BMwMoAob.js";import{P as B}from"./routes-gnI_NAHe.js";import{P as C}from"./PlanleggerStepPage-CgCEs-Kq.js";import{u as I,R as O,b as A,S as z}from"./StepButtonsHookForm-DfZ4GwOu.js";import{M as t,B as y,u as G,H as U}from"./composeEventHandlers-CQxkItEI.js";import{b as K,c as Y,g as P}from"./HvemPlanleggerUtils-CRuekH12.js";import{u as J}from"./hvemHarRettUtils-DaTWCV6h.js";import{d as w,L as N,l as V,B as R}from"./VeiviserPage-CEALjThC.js";import"./index-CTjT7uj6.js";import{n as q}from"./validation-DdAZ_Aa2.js";import{a as W}from"./dateFormValidation-akPD_OBx.js";import{f as $,a as i}from"./satserUtils-Crj2HgKZ.js";import{c as T}from"./stringUtils-BLFzASq_.js";import{V as o}from"./VStack-CL9KkpXr.js";import{S as Q,a as X}from"./Wallet-BVwe51Pq.js";import{S as Z}from"./Spacer-BW3tgveW.js";const ee=/^\d+([,.]\d+)?$/,re=a=>ee.test(a.toString()),_=a=>r=>W(r)||re(r)?null:a,b=({satser:a,lønnSøker:r,fornavn:n})=>{const u=$(a),l=6*u/12,m=l/21.67,c=80/100,g=(s,p)=>Math.round(Math.min(s,l)*p),d=(s,p)=>Math.round(Math.min(s*12/260,m)*p);return e.jsx(o,{gap:"4",children:e.jsx(w,{header:r<=l?e.jsx(t,{id:"HvorMyeSteg.VilFå",values:{hvem:T(n),utregning100:i(d(r,1)),utregning80:i(d(r,c))}}):e.jsx(t,{id:"HvorMyeSteg.KanFå",values:{hvem:T(n),utregning100:i(d(r,1)),utregning80:i(d(r,c))}}),color:"green",icon:e.jsx(Q,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(o,{gap:"2",children:[e.jsx(y,{children:e.jsx(t,{id:"HvorMyeSteg.Utregning",values:{utregning100:i(g(r,1)),utregning80:i(g(r,c))}})}),r>l&&e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(t,{id:"HvorMyeSteg.NAVDekker",values:{grunnbeløpet:i(u*6),a:s=>e.jsx(N,{href:V.grunnbeløpet,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:s})}})}),e.jsx(y,{children:e.jsx(t,{id:"HvorMyeSteg.BasertPåInntekt",values:{hvem:n}})})]})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"Utbetaling",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const ne=({locale:a,satser:r})=>{const n=G(),u=F(a),j=E(),l=S(v.HVOR_MYE),m=q(S(v.HVEM_PLANLEGGER)),c=q(S(v.ARBEIDSSITUASJON)),g=J(c),d=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",s=K(m),p=Y(m,n),f=P(m,n),k=L(v.HVOR_MYE),x=I({defaultValues:l}),M=x.watch("lønnSøker1"),H=x.watch("lønnSøker2"),D=h=>{k(h),u.goToNextStep(B.HVOR_LANG_PERIODE)};return e.jsx(C,{steps:j,goToStep:u.goToNextStep,children:e.jsx(O,{formMethods:x,onSubmit:D,shouldUseFlexbox:!0,children:e.jsxs(o,{gap:"10",style:{flex:1},children:[e.jsxs(o,{gap:"6",children:[e.jsx(U,{size:"medium",spacing:!0,level:"2",children:e.jsx(t,{id:"HvorMyeSteg.Tittel"})}),e.jsxs(o,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:g==="kunSøker2HarRett"?e.jsx(t,{id:"HvorMyeSteg.Lønn",values:{hvem:f}}):e.jsx(t,{id:"HvorMyeSteg.Lønn",values:{hvem:p}}),name:"lønnSøker1",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),M&&e.jsx(b,{lønnSøker:M,satser:r,fornavn:p})]}),!d&&f&&e.jsxs(o,{gap:"2",children:[e.jsx(R,{isDarkBlue:!0,children:e.jsx(A,{label:e.jsx(t,{id:"HvorMyeSteg.Lønn",values:{hvem:P(m,n)}}),name:"lønnSøker2",validate:[_(n.formatMessage({id:"Validering.ValidNumber"}))],description:n.formatMessage({id:"HvorMyeSteg.LønnBeskrivelse"})})}),H&&e.jsx(b,{satser:r,lønnSøker:H,fornavn:f})]}),e.jsx(o,{gap:"2",children:e.jsx(w,{header:e.jsx(t,{id:"HvorMyeSteg.ViteMer",values:{erAleneforsørger:s}}),icon:e.jsx(X,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(y,{children:e.jsx(t,{id:"HvorMyeSteg.MerDetaljert",values:{a:h=>e.jsx(N,{href:V.hvorMye,target:"_blank",rel:"noreferrer",className:"lenke",inlineText:!0,children:h})}})})})})]}),e.jsx(Z,{}),e.jsx(z,{saveDataOnPreviousClick:k,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyeSteg",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
