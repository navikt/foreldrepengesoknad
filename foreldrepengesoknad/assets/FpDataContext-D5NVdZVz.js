import{r as n,_ as N}from"./iframe-Dn1315qd.js";var i=(e=>(e.APP_ROUTE="APP_ROUTE",e.EKSISTERENDE_SAK="EKSISTERENDE_SAK",e.BARN_FRA_NESTE_SAK="BARN_FRA_NESTE_SAK",e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.ANNEN_FORELDER="ANNEN_FORELDER",e.ARBEIDSFORHOLD_OG_INNTEKT="ARBEIDSFORHOLD_OG_INNTEKT",e.EGEN_NÆRING="EGEN_NÆRING",e.FRILANS="FRILANS",e.ANDRE_INNTEKTSKILDER="ANDRE_INNTEKTSKILDER",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.PERIODE_MED_FORELDREPENGER="PERIODE_MED_FORELDREPENGER",e.FORDELING="FORDELING",e.UTTAKSPLAN="UTTAKSPLAN",e.UTTAKSPLAN_METADATA="UTTAKSPLAN_METADATA",e.VEDLEGG="VEDLEGG",e))(i||{});const D={},r=n.createContext(D),s=n.createContext(void 0),R=({children:e,initialState:t,onDispatch:a})=>{const[p,u]=n.useReducer((E,o)=>{switch(o.type){case"update":return{...E,[o.key]:o.data};case"reset":return{};default:throw new Error}},t||D),A=E=>{a&&a(E),u(E)};return N.jsx(r.Provider,{value:p,children:N.jsx(s.Provider,{value:A,children:e})})},d=e=>n.useContext(r)[e],S=()=>{const e=n.useContext(r);return t=>e[t]},_=e=>{const t=n.useContext(s);return a=>{t&&t({type:"update",key:e,data:a})}},O=()=>{const e=n.useContext(s);return(t,a)=>{e&&e({type:"update",key:t,data:a})}},L=()=>{const e=n.useContext(s);return()=>{e&&e({type:"reset"})}},c=()=>n.useContext(r);R.__docgenInfo={description:"",methods:[],displayName:"FpDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [ContextDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
    [ContextDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.ANNEN_FORELDER]?: AnnenForelder;
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektFp;
    [ContextDataType.EGEN_NÆRING]?: NæringDto;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ANDRE_INNTEKTSKILDER]?: AndreInntektskilder[];
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.PERIODE_MED_FORELDREPENGER]?: Dekningsgrad;
    [ContextDataType.FORDELING]?: Fordeling;
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:`| { type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] }
| { type: 'reset' }`,elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"unknown",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};export{i as C,R as F,S as a,d as b,_ as c,c as d,O as e,L as u};
