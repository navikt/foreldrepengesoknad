import{u as N,S as V,i as D,D as j,a as P,b,c as I,d as x,e as O,f as R,g as $,h as Y,F as z,E as G,j as K,k as S}from"./dateFormValidation-Bxa8F9jo.js";import{r as y}from"./index-DVXBtNgz.js";import{u as W}from"./index-CGcmP6XP.js";import{j as e}from"./jsx-runtime-_e34SzbC.js";import{d as s,e as k,D as q,g as X,V as M,M as c,c as J,f as U,B as w,S as Q,b as Z,H as ee}from"./infobox.module-xuTHhAJK.js";import{S as te}from"./Plus-oSxClA7_.js";import"./v4-CQkTLCs1.js";import"./tslib.es6-CwyXKlH1.js";import"./index-Dcs0RV0A.js";import"./index-Cbx7Fas8.js";const L=({index:n,fjernOpphold:u})=>{const t=W(),{watch:r,trigger:f,formState:{isSubmitted:T}}=N(),v=r("utenlandsoppholdSiste12Mnd").filter((p,g)=>g!==n),o=r(`utenlandsoppholdSiste12Mnd.${n}.fom`),a=r(`utenlandsoppholdSiste12Mnd.${n}.tom`),i=s(k).toDate(),d=a?s(a).subtract(1,"days").toDate():s(q).toDate(),l=o&&X(o,k)?s(o).add(1,"days").toDate():s(k).toDate(),m=s(q).toDate();return e.jsxs(M,{gap:"5",align:"start",children:[e.jsx(V,{name:`utenlandsoppholdSiste12Mnd.${n}.landkode`,label:e.jsx(c,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[D(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"}))],children:J().map(p=>e.jsx("option",{value:p[0],children:p[1]},p[0]))}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.fom`,label:e.jsx(c,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:d,validate:[D(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved"})),P(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato"})),b(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.FomErLikTom"}),a),I(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"}),a),x(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.DateOutsideRangeFom"},{min:U(i),max:U(d)}),i,d),O(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"}),{date:a,isStartDate:!1},v)],onChange:()=>T&&f(),defaultMonth:a?s(a).toDate():void 0}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.tom`,label:e.jsx(c,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:l,maxDate:m,validate:[D(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved"})),P(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato"})),b(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.TomErLikFom"}),o),R(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"}),o),x(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.DateOutsideRangeTom"},{min:U(l),max:U(m)}),l,m),O(t.formatMessage({id:"TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"}),{date:o,isStartDate:!0},v)],onChange:()=>T&&f()}),n>0&&e.jsx(w,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Q,{"aria-hidden":!0}),onClick:()=>u(n),children:e.jsx(c,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};L.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel"};const _={fom:"",tom:"",landkode:""},ne={utenlandsoppholdSiste12Mnd:[_]},C=({tidligereUtenlandsopphold:n,saveOnNext:u,saveOnPrevious:t,cancelApplication:r,onContinueLater:f,goToPreviousStep:T,stepConfig:v})=>{const o=y.useMemo(()=>n||ne,[n]),a=$({defaultValues:o}),{fields:i,append:d,remove:l}=Y({name:"utenlandsoppholdSiste12Mnd",control:a.control}),m=y.useCallback(()=>{d(_)},[d]),p=y.useCallback(g=>{l(g)},[l]);return e.jsx(Z,{onCancel:r,onContinueLater:f,steps:v,children:e.jsx(z,{formMethods:a,onSubmit:u,children:e.jsxs(M,{gap:"10",children:[e.jsx(G,{}),e.jsxs(M,{gap:"10",align:"start",children:[i.map((g,B)=>e.jsxs(y.Fragment,{children:[e.jsx(L,{index:B,fjernOpphold:p}),i.length>1&&e.jsx(ee,{})]},g.id)),e.jsx(w,{type:"button",variant:"secondary",size:"small",icon:e.jsx(te,{"aria-hidden":!0}),onClick:m,children:e.jsx(c,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(K,{goToPreviousStep:T,saveDataOnPreviousClick:t})]})})})},H=C;C.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},{name:"undefined"}]},name:"data"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label?: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const ce={title:"TidligereUtenlandsoppholdPanel",component:H},ae=({saveOnNext:n,saveOnPrevious:u,cancelApplication:t,goToPreviousStep:r})=>e.jsx(H,{saveOnNext:n,saveOnPrevious:u,cancelApplication:t,goToPreviousStep:r,stepConfig:[{id:"1",label:"Har bodd i utlandet",isSelected:!0}]}),h=ae.bind({});h.args={saveOnNext:S("button-click"),saveOnPrevious:S("button-click"),cancelApplication:S("button-click"),goToPreviousStep:S("button-click")};var A,F,E;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`({
  saveOnNext,
  saveOnPrevious,
  cancelApplication,
  goToPreviousStep
}) => {
  return <TidligereUtenlandsoppholdPanel saveOnNext={saveOnNext} saveOnPrevious={saveOnPrevious} cancelApplication={cancelApplication} goToPreviousStep={goToPreviousStep} stepConfig={[{
    id: '1',
    label: 'Har bodd i utlandet',
    isSelected: true
  }]} />;
}`,...(E=(F=h.parameters)==null?void 0:F.docs)==null?void 0:E.source}}};const he=["Default"];export{h as Default,he as __namedExportsOrder,ce as default};
