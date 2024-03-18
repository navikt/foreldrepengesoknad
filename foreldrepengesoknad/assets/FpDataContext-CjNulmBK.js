import{j as p}from"./jsx-runtime-DoxjgJx5.js";import{r as a}from"./index-Cu9bd8lq.js";var T=(e=>(e.APP_ROUTE="APP_ROUTE",e.EKSISTERENDE_SAK="EKSISTERENDE_SAK",e.BARN_FRA_NESTE_SAK="BARN_FRA_NESTE_SAK",e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.ANNEN_FORELDER="ANNEN_FORELDER",e.SØKER_DATA="SØKER",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.PERIODE_MED_FORELDREPENGER="PERIODE_MED_FORELDREPENGER",e.UTTAKSPLAN_INFO="UTTAKSPLAN_INFO",e.UTTAKSPLAN="UTTAKSPLAN",e.UTTAKSPLAN_METADATA="UTTAKSPLAN_METADATA",e.VEDLEGG="VEDLEGG",e))(T||{});const u={},s=a.createContext(u),E=a.createContext(void 0),S=({children:e,initialState:t,onDispatch:n})=>{const[A,i]=a.useReducer((r,o)=>{switch(o.type){case"update":return{...r,[o.key]:o.data};case"reset":return{};default:throw new Error}},t||u),N=r=>{n&&n(r),i(r)};return p.jsx(s.Provider,{value:A,children:p.jsx(E.Provider,{value:N,children:e})})},R=e=>a.useContext(s)[e],c=()=>{const e=a.useContext(s);return t=>e[t]},P=e=>{const t=a.useContext(E);return n=>{t&&t({type:"update",key:e,data:n})}},_=()=>{const e=a.useContext(E);return(t,n)=>{e&&e({type:"update",key:t,data:n})}},O=()=>{const e=a.useContext(E);return()=>{e&&e({type:"reset"})}},L=()=>a.useContext(s);S.__docgenInfo={description:"",methods:[],displayName:"FpDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [ContextDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
    [ContextDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.ANNEN_FORELDER]?: AnnenForelder;
    [ContextDataType.SØKER_DATA]?: SøkerData;
    [ContextDataType.UTENLANDSOPPHOLD]?: Opphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [ContextDataType.PERIODE_MED_FORELDREPENGER]?: PeriodeMedForeldrepenger;
    [ContextDataType.UTTAKSPLAN_INFO]?: UttaksplanInfo;
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: ContextDataType; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};export{T as C,S as F,P as a,_ as b,O as c,c as d,L as e,R as u};
