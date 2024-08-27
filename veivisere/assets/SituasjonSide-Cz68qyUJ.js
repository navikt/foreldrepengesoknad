import{j as e}from"./tslib.es6-D_L490Ab.js";import{u as y,C as b,H as N}from"./useVeiviserNavigator-DCyWpHcB.js";import{d as r,B as v,I as O,b as D,c as H}from"./Infobox-D0dyQTcP.js";import{u as R,F as B,R as o,D as m}from"./TextField-Db0FGdso.js";import{u as E,V as n,M as a,B as _}from"./Link-BH5eL72-.js";import{u as T,i as j,a as I,S as c,b as q}from"./useScrollBehaviour-CdZRlBA5.js";import"./index-CTjT7uj6.js";import{V as A}from"./VeiviserPage-KnQXWij4.js";import{B as x}from"./BlueRadioGroup-2R4rhtmO.js";import{S as V}from"./Responsive-D6TXEt_u.js";import{S as G}from"./BabyWrapped-Dw39p9xb.js";var w=(s=>(s.MOR_OG_FAR="morOgFar",s.FAR_OG_FAR="farOgFar",s.MOR_OG_MEDMOR="morOgMedmor",s.KUN_FAR_ELLER_MEDMOR="kunFarEllerMedmor",s.KUN_MOR="kunMor",s.ALENEOMSORG="aleneomsorg",s))(w||{});const P=s=>H.test(s),C=({hvaSkjerNårSituasjon:s,setHvaSkjerNårSituasjon:h})=>{const t=E(),{goToRoute:k}=y(b.HVA_SKJER),S=R({defaultValues:s,shouldUnregister:!0}),{situasjon:p,erFødt:l,fødselsdato:d,termindato:u}=S.watch(),g=r("2021-10-01"),F=i=>{h(i),k(N.OPPSUMMERING)},{ref:M,scrollToBottom:f}=T();return e.jsx(A,{ref:M,label:t.formatMessage({id:"HvaSkjerNår.Tittel"}),icon:e.jsx(V,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0}),children:e.jsx(B,{formMethods:S,onSubmit:F,shouldUseFlexbox:!0,children:e.jsxs(n,{gap:"6",style:{flex:1},children:[e.jsxs(x,{label:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.Situasjon"}),name:"situasjon",onChange:f,children:[e.jsx(o,{value:"morOgFar",autoFocus:!0,children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.MorOgFar"})}),e.jsx(o,{value:"morOgMedmor",children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.MorOgMedmor"})}),e.jsx(o,{value:"farOgFar",children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.FarOgFar"})}),e.jsx(o,{value:"kunFarEllerMedmor",children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.KunFarEllerMedmor"})}),e.jsx(o,{value:"kunMor",children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.KunMor"})}),e.jsx(o,{value:"aleneomsorg",children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.Aleneomsorg"})})]}),p&&e.jsx(n,{gap:"4",children:e.jsxs(x,{label:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.ErBarnetFødt"}),name:"erFødt",onChange:f,children:[e.jsx(o,{value:!0,autoFocus:!0,children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.Ja"})}),e.jsx(o,{value:!1,children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.Nei"})})]})}),l===!0&&e.jsxs(n,{gap:"4",children:[e.jsx(v,{isDarkBlue:!0,shouldFadeIn:!0,children:e.jsxs(n,{gap:"4",children:[e.jsx(m,{name:"fødselsdato",label:t.formatMessage({id:"HvaSkjerNår.SituasjonSide.Født"}),maxDate:r().toDate(),validate:[j(t.formatMessage({id:"valideringsfeil.fødselsdato.ugyldigDatoFormat"})),I(t.formatMessage({id:"valideringsfeil.fødselsdato.måVæreIdagEllerTidligere"})),i=>{if(r(i).isBefore(r(g)))return t.formatMessage({id:"valideringsfeil.fødselsdato.førOktober2021"})}]}),e.jsx(m,{name:"termindato",label:t.formatMessage({id:"HvaSkjerNår.SituasjonSide.NårVarTermin"}),minDate:r(d).subtract(1,"month").toDate(),maxDate:r().add(6,"months").toDate(),validate:[j(t.formatMessage({id:"valideringsfeil.termindato.ugyldigDatoFormat"})),i=>{if(!r(i).subtract(6,"months").isSameOrBefore(r(d),"day"))return t.formatMessage({id:"valideringsfeil.termindato.forLangtFremITid"});if(!r(i).add(1,"months").isSameOrAfter(r(d),"day"))return t.formatMessage({id:"valideringsfeil.termindato.forLangtTilbakeITid"})}]})]})}),d!==void 0&&r(d).isBefore(g)&&e.jsx(O,{header:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.FødtFørOktober"}),icon:e.jsx(G,{title:"a11y-title",fontSize:"1.5rem","aria-hidden":!0}),color:"green",children:e.jsx(_,{children:e.jsx(a,{id:"HvaSkjerNår.SituasjonSide.HvisBarnetErFødtFørOktober"})})})]}),l===!1&&e.jsx(n,{gap:"4",children:e.jsx(v,{isDarkBlue:!0,shouldFadeIn:!0,children:e.jsx(n,{gap:"4",children:e.jsx(m,{name:"termindato",label:t.formatMessage({id:"HvaSkjerNår.SituasjonSide.NårErTermin"}),minDate:r().subtract(3,"weeks").toDate(),maxDate:r().add(6,"months").toDate(),validate:[j(t.formatMessage({id:"valideringsfeil.termindato.ugyldigDatoFormat"})),i=>{if(r(i).isSameOrBefore(r().subtract(3,"weeks").subtract(1,"day").toDate()))return t.formatMessage({id:"valideringsfeil.termindato.forTidlig"})}]})})})}),e.jsx(c,{}),e.jsx(c,{}),(l===!0&&d&&u||l===!1&&u)&&P(u)&&e.jsx(D,{icon:e.jsx(q,{"aria-hidden":!0}),iconPosition:"right",type:"submit",style:{flex:1},children:e.jsx(a,{id:"ArbeidssituasjonSide.SeResultatet"})})]})})})};C.__docgenInfo={description:"",methods:[],displayName:"SituasjonSide",props:{hvaSkjerNårSituasjon:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    situasjon: Situasjon;
    erFødt: boolean;
    fødselsdato?: string;
    termindato: string;
}`,signature:{properties:[{key:"situasjon",value:{name:"Situasjon",required:!0}},{key:"erFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""},setHvaSkjerNårSituasjon:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: HvaSkjerNårSituasjon) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    situasjon: Situasjon;
    erFødt: boolean;
    fødselsdato?: string;
    termindato: string;
}`,signature:{properties:[{key:"situasjon",value:{name:"Situasjon",required:!0}},{key:"erFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!0}}]}},name:"data"}],return:{name:"void"}}},description:""}}};export{w as S,C as a};
