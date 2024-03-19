import{j as N}from"./Button-BkdplLyZ.js";import{r as t}from"./index-Dl6G-zuu.js";var I=(e=>(e.APP_ROUTE="APP_ROUTE",e.OM_BARNET="OM_BARNET",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.INNTEKTSINFORMASJON="INNTEKTSINFORMASJON",e.FRILANS="FRILANS",e.ARBEID_I_UTLANDET="ARBEID_I_UTLANDET",e.EGEN_NÆRING="EGEN_NÆRING",e.TILRETTELEGGINGER="TILRETTELEGGINGER",e.VALGT_TILRETTELEGGING_ID="VALGT_TILRETTELEGGING_ID",e))(I||{});const T={},E=t.createContext(T),i=t.createContext(void 0),L=({children:e,initialState:r,onDispatch:n})=>{const[o,p]=t.useReducer((a,s)=>{switch(s.type){case"update":return{...a,[s.key]:s.data};case"reset":return{};default:throw new Error}},r||T),u=a=>{n&&n(a),p(a)};return N.jsx(E.Provider,{value:o,children:N.jsx(i.Provider,{value:u,children:e})})},l=e=>t.useContext(E)[e],c=()=>{const e=t.useContext(E);return r=>e[r]},O=e=>{const r=t.useContext(i);return n=>{r&&r({type:"update",key:e,data:n})}},G=()=>{const e=t.useContext(i);return()=>{e&&e({type:"reset"})}},_=()=>t.useContext(E);L.__docgenInfo={description:"",methods:[],displayName:"SvpDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdSenere;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdTidligere;
    [ContextDataType.INNTEKTSINFORMASJON]?: Inntektsinformasjon;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet;
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.TILRETTELEGGINGER]?: Tilrettelegging[];
    [ContextDataType.VALGT_TILRETTELEGGING_ID]?: string;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: ContextDataType; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};var D=(e=>(e.FORSIDE="/",e.BARNET="/barnet",e.UTENLANDSOPPHOLD="/utenlandsopphold",e.HAR_BODD_I_UTLANDET="/har-bodd-i-utlandet",e.SKAL_BO_I_UTLANDET="/skal-bo-i-utlandet",e.INNTEKTSINFORMASJON="/arbeid",e.FRILANS="/frilans",e.NÆRING="/naering",e.ARBEID_I_UTLANDET="/arbeid-i-utlandet",e.VELG_ARBEID="/velg-arbeid",e.SKJEMA="/skjema",e.TILRETTELEGGING="/tilrettelegging",e.PERIODER="/perioder",e.OPPSUMMERING="/oppsummering",e))(D||{});export{I as C,L as S,D as a,O as b,c,G as d,_ as e,l as u};
