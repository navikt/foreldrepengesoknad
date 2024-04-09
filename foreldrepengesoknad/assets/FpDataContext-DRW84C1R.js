import{j as p}from"./jsx-runtime-DoxjgJx5.js";import{r as a}from"./index-Cu9bd8lq.js";var N=(e=>(e.APP_ROUTE="APP_ROUTE",e.EKSISTERENDE_SAK="EKSISTERENDE_SAK",e.BARN_FRA_NESTE_SAK="BARN_FRA_NESTE_SAK",e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.ANNEN_FORELDER="ANNEN_FORELDER",e.SØKER_DATA="SØKER",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.PERIODE_MED_FORELDREPENGER="PERIODE_MED_FORELDREPENGER",e.FORDELING="FORDELING",e.UTTAKSPLAN="UTTAKSPLAN",e.UTTAKSPLAN_METADATA="UTTAKSPLAN_METADATA",e.VEDLEGG="VEDLEGG",e))(N||{});const u={},E=a.createContext(u),s=a.createContext(void 0),S=({children:e,initialState:t,onDispatch:n})=>{const[i,A]=a.useReducer((r,o)=>{switch(o.type){case"update":return{...r,[o.key]:o.data};case"reset":return{};default:throw new Error}},t||u),D=r=>{n&&n(r),A(r)};return p.jsx(E.Provider,{value:i,children:p.jsx(s.Provider,{value:D,children:e})})},R=e=>a.useContext(E)[e],c=()=>{const e=a.useContext(E);return t=>e[t]},O=e=>{const t=a.useContext(s);return n=>{t&&t({type:"update",key:e,data:n})}},P=()=>{const e=a.useContext(s);return(t,n)=>{e&&e({type:"update",key:t,data:n})}},_=()=>{const e=a.useContext(s);return()=>{e&&e({type:"reset"})}},L=()=>a.useContext(E);S.__docgenInfo={description:"",methods:[],displayName:"FpDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
    [ContextDataType.FORDELING]?: Fordeling;
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: ContextDataType; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};export{N as C,S as F,O as a,P as b,_ as c,c as d,L as e,R as u};
