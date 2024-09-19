import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{u as w,H as E}from"./useVeiviserNavigator-DbrAlZWh.js";import{a as O,d as o,i as R,I as k,D as N,u as D,V as _,S as I,b as c,M as n,B as x,c as B,e as H,f as T}from"./FrontPage-B1gjX788.js";import{u as A,R as P,B as y,a as m,b as v}from"./BlueRadioGroup-6xACzYqF.js";import{r as d,R as q}from"./index-CTjT7uj6.js";const V=()=>{const e=d.useRef(null),[s,a]=d.useState(0),t=()=>a(s+1);return d.useEffect(()=>{window.scrollTo(0,0)},[]),d.useEffect(()=>{e.current&&s>0&&e.current.scrollIntoView({behavior:"smooth",block:"nearest"})},[s]),{ref:e,scrollToBottom:t}};var z=function(e,s){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&s.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)s.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(a[t[i]]=e[t[i]]);return a};const G=d.forwardRef((e,s)=>{var{title:a,titleId:t}=e,i=z(e,["title","titleId"]);let l=O();return l=a?t||"title-"+l:void 0,d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":l},i),a?d.createElement("title",{id:l},a):null,d.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.25 8a5.75 5.75 0 1 1 11.5 0v8a5.75 5.75 0 0 1-11.5 0zM12 3.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5m0 10a5.74 5.74 0 0 1-4.25-1.877v1.686l3.85 2.14 4.65-3.1v-.726A5.74 5.74 0 0 1 12 13.75m-4.25 1.525 2.447 1.359-1.974 1.316A4.2 4.2 0 0 1 7.75 16zm8.5-.874-7.111 4.741A4.25 4.25 0 0 0 16.25 16zM9.75 8a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01A.75.75 0 0 1 9.75 8m3 0a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75",clipRule:"evenodd"}))});var C=function(e,s){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&s.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)s.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(a[t[i]]=e[t[i]]);return a};const L=d.forwardRef((e,s)=>{var{title:a,titleId:t}=e,i=C(e,["title","titleId"]);let l=O();return l=a?t||"title-"+l:void 0,d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":l},i),a?d.createElement("title",{id:l},a):null,d.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),b=()=>q.createElement("span",{className:"navds-stack__spacer"}),U=e=>e==null||e.toString().trim().length===0;o.extend(R);o().add(18,"week").add(3,"day").startOf("day").toDate();o().startOf("day").subtract(21,"days");o().add(1,"year").startOf("day").toDate();const S=e=>s=>U(s)||k.test(s)?null:e,K=e=>s=>o(s).isAfter(N)?e:null;var J=(e=>(e.MOR_OG_FAR="morOgFar",e.FAR_OG_FAR="farOgFar",e.MOR_OG_MEDMOR="morOgMedmor",e.KUN_FAR_ELLER_MEDMOR="kunFarEllerMedmor",e.KUN_MOR="kunMor",e.ALENEOMSORG="aleneomsorg",e))(J||{});const W=e=>k.test(e),X=({hvaSkjerNårSituasjon:e,setHvaSkjerNårSituasjon:s})=>{const a=D(),{goToRoute:t}=w(),i=A({defaultValues:e,shouldUnregister:!0}),{situasjon:l,erFødt:j,fødselsdato:f,termindato:g}=i.watch(),h=o("2021-10-01"),M=u=>{s(u),t(E.OPPSUMMERING)},{ref:F,scrollToBottom:p}=V();return r.jsx(_,{ref:F,label:a.formatMessage({id:"HvaSkjerNår.Tittel"}),icon:r.jsx(I,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0}),children:r.jsx(P,{formMethods:i,onSubmit:M,shouldUseFlexbox:!0,children:r.jsxs(c,{gap:"6",style:{flex:1},children:[r.jsxs(y,{label:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.Situasjon"}),name:"situasjon",onChange:p,children:[r.jsx(m,{value:"morOgFar",autoFocus:!0,children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.MorOgFar"})}),r.jsx(m,{value:"morOgMedmor",children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.MorOgMedmor"})}),r.jsx(m,{value:"farOgFar",children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.FarOgFar"})}),r.jsx(m,{value:"kunFarEllerMedmor",children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.KunFarEllerMedmor"})}),r.jsx(m,{value:"kunMor",children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.KunMor"})}),r.jsx(m,{value:"aleneomsorg",children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.Aleneomsorg"})})]}),l&&r.jsx(c,{gap:"4",children:r.jsxs(y,{label:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.ErBarnetFødt"}),name:"erFødt",onChange:p,children:[r.jsx(m,{value:!0,autoFocus:!0,children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.Ja"})}),r.jsx(m,{value:!1,children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.Nei"})})]})}),j===!0&&r.jsxs(c,{gap:"4",children:[r.jsx(x,{isDarkBlue:!0,shouldFadeIn:!0,children:r.jsxs(c,{gap:"4",children:[r.jsx(v,{name:"fødselsdato",label:a.formatMessage({id:"HvaSkjerNår.SituasjonSide.Født"}),maxDate:o().toDate(),validate:[S(a.formatMessage({id:"valideringsfeil.fødselsdato.ugyldigDatoFormat"})),K(a.formatMessage({id:"valideringsfeil.fødselsdato.måVæreIdagEllerTidligere"})),u=>{if(o(u).isBefore(o(h)))return a.formatMessage({id:"valideringsfeil.fødselsdato.førOktober2021"})}]}),r.jsx(v,{name:"termindato",label:a.formatMessage({id:"HvaSkjerNår.SituasjonSide.NårVarTermin"}),minDate:o(f).subtract(1,"month").toDate(),maxDate:o().add(6,"months").toDate(),validate:[S(a.formatMessage({id:"valideringsfeil.termindato.ugyldigDatoFormat"})),u=>{if(!o(u).subtract(6,"months").isSameOrBefore(o(f),"day"))return a.formatMessage({id:"valideringsfeil.termindato.forLangtFremITid"});if(!o(u).add(1,"months").isSameOrAfter(o(f),"day"))return a.formatMessage({id:"valideringsfeil.termindato.forLangtTilbakeITid"})}]})]})}),f!==void 0&&o(f).isBefore(h)&&r.jsx(B,{header:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.FødtFørOktober"}),icon:r.jsx(G,{title:"a11y-title",fontSize:"1.5rem","aria-hidden":!0}),color:"green",children:r.jsx(H,{children:r.jsx(n,{id:"HvaSkjerNår.SituasjonSide.HvisBarnetErFødtFørOktober"})})})]}),j===!1&&r.jsx(c,{gap:"4",children:r.jsx(x,{isDarkBlue:!0,shouldFadeIn:!0,children:r.jsx(c,{gap:"4",children:r.jsx(v,{name:"termindato",label:a.formatMessage({id:"HvaSkjerNår.SituasjonSide.NårErTermin"}),minDate:o().subtract(3,"weeks").toDate(),maxDate:o().add(6,"months").toDate(),validate:[S(a.formatMessage({id:"valideringsfeil.termindato.ugyldigDatoFormat"})),u=>{if(o(u).isSameOrBefore(o().subtract(3,"weeks").subtract(1,"day").toDate()))return a.formatMessage({id:"valideringsfeil.termindato.forTidlig"})}]})})})}),r.jsx(b,{}),r.jsx(b,{}),(j===!0&&f&&g||j===!1&&g)&&W(g)&&r.jsx(T,{icon:r.jsx(L,{"aria-hidden":!0}),iconPosition:"right",type:"submit",style:{flex:1},children:r.jsx(n,{id:"ArbeidssituasjonSide.SeResultatet"})})]})})})};X.__docgenInfo={description:"",methods:[],displayName:"SituasjonSide",props:{hvaSkjerNårSituasjon:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    situasjon: Situasjon;
    erFødt: boolean;
    fødselsdato?: string;
    termindato: string;
}`,signature:{properties:[{key:"situasjon",value:{name:"Situasjon",required:!0}},{key:"erFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""},setHvaSkjerNårSituasjon:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: HvaSkjerNårSituasjon) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    situasjon: Situasjon;
    erFødt: boolean;
    fødselsdato?: string;
    termindato: string;
}`,signature:{properties:[{key:"situasjon",value:{name:"Situasjon",required:!0}},{key:"erFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!0}}]}},name:"data"}],return:{name:"void"}}},description:""}}};export{J as S,X as a,V as u};
