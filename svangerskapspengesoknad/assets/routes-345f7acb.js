import{j as i}from"./Modal-5f6515f6.js";import{r}from"./index-f1f2c4b1.js";var L=(e=>(e.APP_ROUTE="APP_ROUTE",e.OM_BARNET="OM_BARNET",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.INNTEKTSINFORMASJON="INNTEKTSINFORMASJON",e.FRILANS="FRILANS",e.ARBEID_I_UTLANDET="ARBEID_I_UTLANDET",e.EGEN_NÆRING="EGEN_NÆRING",e.TILRETTELEGGINGER="TILRETTELEGGINGER",e.VALGT_TILRETTELEGGING_ID="VALGT_TILRETTELEGGING_ID",e))(L||{});const l={},o=r.createContext(l),n=r.createContext(void 0),p=({children:e,initialState:t,onDispatch:a})=>{const[I,D]=r.useReducer((s,c)=>{switch(c.type){case"update":return{...s,[c.key]:c.data};case"reset":return{};default:throw new Error}},t||l),A=s=>{a&&a(s),D(s)};return i.jsx(o.Provider,{value:I,children:i.jsx(n.Provider,{value:A,children:e})})},_=e=>r.useContext(o)[e],E=()=>{const e=r.useContext(o);return t=>e[t]},d=e=>{const t=r.useContext(n);return a=>{t&&t({type:"update",key:e,data:a})}},N=()=>{const e=r.useContext(n);return(t,a)=>{e&&e({type:"update",key:t,data:a})}},u=()=>{const e=r.useContext(n);return()=>{e&&e({type:"reset"})}},f=()=>r.useContext(o);try{p.displayName="SvpDataContext",p.__docgenInfo={description:"",displayName:"SvpDataContext",props:{initialState:{defaultValue:null,description:"",name:"initialState",required:!1,type:{name:"ContextDataMap"}},onDispatch:{defaultValue:null,description:"",name:"onDispatch",required:!1,type:{name:"((action: Action) => void)"}}}}}catch{}try{_.displayName="useContextGetData",_.__docgenInfo={description:"Hook returns data for one specific data type",displayName:"useContextGetData",props:{}}}catch{}try{E.displayName="useContextGetAnyData",E.__docgenInfo={description:"Hook returns function capable of getting all types of data from context state",displayName:"useContextGetAnyData",props:{}}}catch{}try{d.displayName="useContextSaveData",d.__docgenInfo={description:"Hook returns save function for one specific data type",displayName:"useContextSaveData",props:{}}}catch{}try{N.displayName="useContextSaveAnyData",N.__docgenInfo={description:"Hook returns save function usable with all data types",displayName:"useContextSaveAnyData",props:{}}}catch{}try{u.displayName="useContextReset",u.__docgenInfo={description:"Hook returns state reset function",displayName:"useContextReset",props:{}}}catch{}var T=(e=>(e.FORSIDE="/",e.BARNET="/barnet",e.UTENLANDSOPPHOLD="/utenlandsopphold",e.HAR_BODD_I_UTLANDET="/har-bodd-i-utlandet",e.SKAL_BO_I_UTLANDET="/skal-bo-i-utlandet",e.ARBEID="/arbeid",e.FRILANS="/frilans",e.NÆRING="/naering",e.ARBEID_I_UTLANDET="/arbeid-i-utlandet",e.VELG_ARBEID="/velg-arbeid",e.SKJEMA="/skjema",e.TILRETTELEGGING="/tilrettelegging",e.PERIODER="/perioder",e.OPPSUMMERING="/oppsummering",e))(T||{});export{L as C,p as S,d as a,T as b,f as c,u as d,E as e,_ as u};
