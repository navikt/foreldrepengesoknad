import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{u as I,S as R,i as k,D as j,a as O,b,c as V,d as x,e as A,f as Y,g as $,h as z,F as G,E as K,j as W,k as c}from"./dateFormValidation-6cm2VK1u.js";import{r as v}from"./index-uubelm5h.js";import{u as X}from"./index-BQarJUyT.js";import{d as s,e as P,D as E,g as J,V as M,M as h,c as Q,f as y,B as F,S as Z,b as ee,H as te}from"./CalendarLabel-BFRneCm4.js";import{S as ne}from"./Plus-lai4gkGt.js";import"./v4-CQkTLCs1.js";import"./index-Dei0BBcc.js";import"./tslib.es6-CwyXKlH1.js";import"./index-D3eZ-H7s.js";const w=({index:n,fjernOpphold:m})=>{const t=X(),{watch:r,trigger:i,formState:{isSubmitted:S}}=I(),f=r("utenlandsoppholdSiste12Mnd").filter((g,D)=>D!==n),o=r(`utenlandsoppholdSiste12Mnd.${n}.fom`),a=r(`utenlandsoppholdSiste12Mnd.${n}.tom`),d=s(P).toDate(),l=a?s(a).subtract(1,"days").toDate():s(E).toDate(),p=o&&J(o,P)?s(o).add(1,"days").toDate():s(P).toDate(),u=s(E).toDate();return e.jsxs(M,{gap:"5",align:"start",children:[e.jsx(R,{name:`utenlandsoppholdSiste12Mnd.${n}.landkode`,label:e.jsx(h,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[k(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"}))],children:Q().map(g=>e.jsx("option",{value:g[0],children:g[1]},g[0]))}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.fom`,label:e.jsx(h,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:d,maxDate:l,validate:[k(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved"})),O(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato"})),b(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.FomErLikTom"}),a),V(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"}),a),x(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.DateOutsideRangeFom"},{min:y(d),max:y(l)}),d,l),A(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"}),{date:a,isStartDate:!1},f)],onChange:()=>S&&i(),defaultMonth:a?s(a).toDate():void 0}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.tom`,label:e.jsx(h,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:p,maxDate:u,validate:[k(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved"})),O(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato"})),b(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.TomErLikFom"}),o),Y(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"}),o),x(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.DateOutsideRangeTom"},{min:y(p),max:y(u)}),p,u),A(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"}),{date:o,isStartDate:!0},f)],onChange:()=>S&&i()}),n>0&&e.jsx(F,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Z,{"aria-hidden":!0}),onClick:()=>m(n),children:e.jsx(h,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};w.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel"};const C={fom:"",tom:"",landkode:""},ae={utenlandsoppholdSiste12Mnd:[C]},H=({tidligereUtenlandsopphold:n,saveOnNext:m,saveOnPrevious:t,cancelApplication:r,onContinueLater:i,onStepChange:S,goToPreviousStep:f,stepConfig:o})=>{const a=v.useMemo(()=>n||ae,[n]),d=$({defaultValues:a}),{fields:l,append:p,remove:u}=z({name:"utenlandsoppholdSiste12Mnd",control:d.control}),g=v.useCallback(()=>{p(C)},[p]),D=v.useCallback(U=>{u(U)},[u]);return e.jsx(ee,{onCancel:r,onContinueLater:i,steps:o,onStepChange:S,children:e.jsx(G,{formMethods:d,onSubmit:m,children:e.jsxs(M,{gap:"10",children:[e.jsx(K,{}),e.jsxs(M,{gap:"10",align:"start",children:[l.map((U,B)=>e.jsxs(v.Fragment,{children:[e.jsx(w,{index:B,fjernOpphold:D}),l.length>1&&e.jsx(te,{})]},U.id)),e.jsx(F,{type:"button",variant:"secondary",size:"small",icon:e.jsx(ne,{"aria-hidden":!0}),onClick:g,children:e.jsx(h,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(W,{goToPreviousStep:f,saveDataOnPreviousClick:t})]})})})},N=H;H.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: UtenlandsoppholdTidligere) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UtenlandsoppholdTidligere | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"UtenlandsoppholdTidligere | undefined",elements:[{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},{name:"undefined"}]},name:"data"}],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const he={title:"TidligereUtenlandsoppholdPanel",component:N},oe=({saveOnNext:n,saveOnPrevious:m,cancelApplication:t,goToPreviousStep:r,onStepChange:i})=>e.jsx(N,{saveOnNext:n,saveOnPrevious:m,cancelApplication:t,goToPreviousStep:r,onStepChange:i,stepConfig:[{id:"UTENLANDSOPPHOLD_PATH",label:"Utenlandsopphold",isSelected:!1},{id:"HAR_BODD_I_UTLANDET_PATH",label:"Har bodd i utlandet",isSelected:!0}]}),T=oe.bind({});T.args={saveOnNext:c("button-click"),saveOnPrevious:c("button-click"),cancelApplication:c("button-click"),goToPreviousStep:c("button-click"),onStepChange:c("button-click")};var _,q,L;T.parameters={...T.parameters,docs:{...(_=T.parameters)==null?void 0:_.docs,source:{originalSource:`({
  saveOnNext,
  saveOnPrevious,
  cancelApplication,
  goToPreviousStep,
  onStepChange
}) => {
  return <TidligereUtenlandsoppholdPanel saveOnNext={saveOnNext} saveOnPrevious={saveOnPrevious} cancelApplication={cancelApplication} goToPreviousStep={goToPreviousStep} onStepChange={onStepChange} stepConfig={[{
    id: 'UTENLANDSOPPHOLD_PATH',
    label: 'Utenlandsopphold',
    isSelected: false
  }, {
    id: 'HAR_BODD_I_UTLANDET_PATH',
    label: 'Har bodd i utlandet',
    isSelected: true
  }]} />;
}`,...(L=(q=T.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};const Te=["Default"];export{T as Default,Te as __namedExportsOrder,he as default};
