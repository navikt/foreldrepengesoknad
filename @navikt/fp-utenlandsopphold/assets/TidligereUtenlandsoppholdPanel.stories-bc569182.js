import{j as e}from"./jsx-runtime-ffb262ed.js";import{a as I,b as H,d,w as x,D as y,x as B,V as O,S as R,F as g,e as P,f as $,g as _,h as k,j as b,k as z,l as F,m as v,n as A,o as G,B as C,X as Y,p as w,q as K,U as X,r as W,s as J,E as Q,t as Z,v as f}from"./useUtenlandsoppholdIntl-287c87d4.js";import{r as D}from"./index-76fb7be0.js";import"./index-ff53cee2.js";import{H as ee,P as te}from"./HorizontalLine-461a0439.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_commonjsHelpers-de833af9.js";import"./isNativeReflectConstruct-554b52b6.js";import"./index-d3ea75b5.js";import"./provider-595edeb0.js";import"./index-9d475cdf.js";const ae=({index:a,fjernOpphold:u})=>{const{i18n:t}=I(),{watch:l,trigger:T,formState:{isSubmitted:S}}=H(),U=l("utenlandsoppholdSiste12Mnd").filter((p,m)=>m!==a),n=l(`utenlandsoppholdSiste12Mnd.${a}.fom`),o=l(`utenlandsoppholdSiste12Mnd.${a}.tom`),i=d(x).toDate(),s=o?d(o).subtract(1,"days").toDate():d(y).toDate(),r=n&&B(n,x)?d(n).add(1,"days").toDate():d(x).toDate(),c=d(y).toDate();return e.jsxs(O,{gap:"5",align:"start",children:[e.jsx(R,{name:`utenlandsoppholdSiste12Mnd.${a}.landkode`,label:e.jsx(g,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[P(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"))],children:$().map(p=>e.jsx("option",{value:p[0],children:p[1]},p[0]))}),e.jsx(_,{name:`utenlandsoppholdSiste12Mnd.${a}.fom`,label:e.jsx(g,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:s,validate:[P(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),k(t("TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),b(t("TidligereUtenlandsoppholdSteg.FomErLikTom"),o),z(t("TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),o),F(t("TidligereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:v(i),max:v(s)}),i,s),A(t("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:o,isStartDate:!1},U)],onChange:()=>S&&T(),defaultMonth:o?d(o).toDate():void 0}),e.jsx(_,{name:`utenlandsoppholdSiste12Mnd.${a}.tom`,label:e.jsx(g,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:r,maxDate:c,validate:[P(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved")),k(t("TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),b(t("TidligereUtenlandsoppholdSteg.TomErLikFom"),n),G(t("TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),n),F(t("TidligereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:v(r),max:v(c)}),r,c),A(t("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:n,isStartDate:!0},U)],onChange:()=>S&&T()}),a>0&&e.jsx(C,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Y,{"aria-hidden":!0}),onClick:()=>u(a),children:e.jsx(g,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{TidligereUtenlandsoppholdPeriode.displayName="TidligereUtenlandsoppholdPeriode",TidligereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const M={fom:"",tom:"",landkode:""},oe={utenlandsoppholdSiste12Mnd:[M]},j=({tidligereUtenlandsopphold:a,saveOnNext:u,saveOnPrevious:t,cancelApplication:l,onContinueLater:T,goToPreviousStep:S,stepConfig:U})=>{const n=D.useMemo(()=>a||oe,[a]),o=w({defaultValues:n}),{fields:i,append:s,remove:r}=K({name:"utenlandsoppholdSiste12Mnd",control:o.control}),c=D.useCallback(()=>{s(M)},[s]),p=D.useCallback(m=>{r(m)},[r]);return e.jsx(X,{children:e.jsx(W,{onCancel:l,onContinueLater:T,steps:U,children:e.jsx(J,{formMethods:o,onSubmit:u,children:e.jsxs(O,{gap:"10",children:[e.jsx(Q,{}),e.jsxs(O,{gap:"10",align:"start",children:[i.map((m,q)=>e.jsxs(D.Fragment,{children:[e.jsx(ae,{index:q,fjernOpphold:p}),i.length>1&&e.jsx(ee,{})]},m.id)),e.jsx(C,{type:"button",variant:"secondary",size:"small",icon:e.jsx(te,{"aria-hidden":!0}),onClick:c,children:e.jsx(g,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(Z,{goToPreviousStep:S,saveDataOnPreviousClick:t})]})})})})},N=j;try{j.displayName="TidligereUtenlandsoppholdPanel",j.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{defaultValue:null,description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdTidligere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdTidligere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(data: UtenlandsoppholdTidligere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"ProgressStep<TYPE>[]"}}}}}catch{}const Se={title:"TidligereUtenlandsoppholdPanel",component:N},ne=({saveOnNext:a,saveOnPrevious:u,cancelApplication:t,goToPreviousStep:l})=>e.jsx(N,{saveOnNext:a,saveOnPrevious:u,cancelApplication:t,goToPreviousStep:l,stepConfig:[{id:"1",label:"Har bodd i utlandet",isSelected:!0}]}),h=ne.bind({});h.args={saveOnNext:f("button-click"),saveOnPrevious:f("button-click"),cancelApplication:f("button-click"),goToPreviousStep:f("button-click")};var L,E,V;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(V=(E=h.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};const Ue=["Default"];export{h as Default,Ue as __namedExportsOrder,Se as default};
