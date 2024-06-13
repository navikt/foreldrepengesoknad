import{r as m}from"./index-DVXBtNgz.js";import{E as P}from"./Environment-O62Hvuhd.js";import{u as k,R as N}from"./useRequest-QOxy2UtX.js";import{j as S}from"./jsx-runtime-_e34SzbC.js";import{d,A as K}from"./Tidsperioden-JQeTBW8H.js";import"./index--IHLcpuH.js";import{v as c,w as A,x,y as B,z as F}from"./useFpNavigator-CnR-1yS3.js";import{i as y,h as I,j as C,g as q}from"./index-BI6FGWNT.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{c as w}from"./barnUtils-YoT_baD_.js";import{c as M}from"./eksisterendeSakUtils-D2JRJtdj.js";var l=(e=>(e.ANNEN_PART_VEDTAK="ANNEN_PART_VEDTAK",e.NESTE_SAK_ANNEN_PART_VEDTAK="NESTE_SAK_ANNEN_PART_VEDTAK",e.STØNADSKONTOER="STØNADSKONTOER",e))(l||{});const D={},R=m.createContext(D),_=m.createContext(void 0),j=({children:e})=>{const[t,r]=m.useReducer((a,s)=>{switch(s.type){case"update":return{...a,[s.key]:[s.hash,s.data]};case"reset":return{};default:throw new Error}},D);return S.jsx(R.Provider,{value:t,children:S.jsx(_.Provider,{value:r,children:e})})},V=(e,t)=>{const a=m.useContext(R)[e];return a&&a[0]===t?a[1]:void 0},U=(e,t)=>{const r=m.useContext(_);return a=>{r&&r({type:"update",key:e,hash:t,data:a})}};j.__docgenInfo={description:"",methods:[],displayName:"FpApiDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [FpApiDataType.ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.STØNADSKONTOER]?: [number, TilgjengeligeStønadskontoer];
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: FpApiDataType; hash: number; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: FpApiDataType; hash: number; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"FpApiDataType",required:!0}},{key:"hash",value:{name:"number",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};const H=e=>Object.keys(e).sort((t,r)=>t.localeCompare(r)).reduce((t,r)=>(t[r]=e[r],t),{}),G=e=>{let t=0;for(let r=0;r<e.length;r++){const a=e.charCodeAt(r);t=(t<<5)-t+a,t=t&t}return t},L={[l.ANNEN_PART_VEDTAK]:"/innsyn/v2/annenPartVedtak",[l.NESTE_SAK_ANNEN_PART_VEDTAK]:"/innsyn/v2/annenPartVedtak",[l.STØNADSKONTOER]:`${P.REST_API_URL}/konto`},dt=(e,t,r)=>{const a=G(JSON.stringify(H(t))),s=V(e,a),i=!!s,n=U(e,a),{data:o,requestStatus:g,error:p}=k(L[e],t,{config:{withCredentials:e!==l.STØNADSKONTOER},isSuspended:i||r});return m.useEffect(()=>{o&&n(o)},[o]),p&&p.message.includes("Ugyldig ident")?{data:void 0,requestStatus:N.FINISHED,error:null}:{data:i?s:o,requestStatus:i?N.FINISHED:g,error:p}},b=(e,t)=>e?!0:c(t)?!!t.harRettPåForeldrepengerINorge:!1,J=(e,t)=>e?c(t)?!!t.harRettPåForeldrepengerINorge:!1:!0,z=(e,t)=>{if(y(e)||q(e))return t||e.termindato},Y=(e,t)=>t||e||void 0,$=(e,t,r)=>e&&r?r:t,Q=(e,t,r,a,s)=>r||a?"ALENEOMSORG":e&&t||s?"BEGGE_RETT":"BARE_SØKER_RETT",mt=(e,t,r,a,s,i)=>{const n=c(t)?t:void 0,o=A(r.rolle),g=x(o,(n==null?void 0:n.erAleneOmOmsorg)||!1,t),p=B(!o,(n==null?void 0:n.erAleneOmOmsorg)||!1,t),E=a!==void 0?a.startdatoFørsteStønadsperiode:void 0,u=M(s,e,o,w(e),E),h=$(o,e.antallBarn,u==null?void 0:u.grunnlag.antallBarn),O=Y(i==null?void 0:i.grunnlag.termindato,u==null?void 0:u.grunnlag.termindato),f=A(r.rolle),T=A(r.rolle),v=c(t)&&t.harRettPåForeldrepengerIEØS;return{rettighetstype:Q(b(f,t),J(f,t),p||!1,g||!1,v||!1),brukerrolle:T?"FAR":"MOR",antallBarn:h.toString(),fødselsdato:y(e)?e.fødselsdatoer[0]:void 0,termindato:z(e,O),omsorgsovertakelseDato:I(e)||C(e)?e.adopsjonsdato:void 0,morHarUføretrygd:F(t,T),familieHendelseDatoNesteSak:E}},pt=(e,t,r)=>{if(e===void 0||t===void 0||r!=="fødsel")return!1;const a=d(e).isSameOrAfter(d(new Date("2019-07-01")),"day");return d(e).add(7,"weeks").add(3,"days").isBefore(d(t),"days")&&a},lt=(e,t)=>e&&t?(100-parseInt(t,10)).toString():"100",ct=(e,t)=>K({fom:d(e).toDate(),tom:d(t).toDate()}).getAntallUttaksdager()-1;export{j as F,l as a,ct as b,$ as c,Y as d,lt as e,mt as g,pt as s,dt as u};
