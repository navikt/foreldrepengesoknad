import{r as d}from"./index-DVXBtNgz.js";import{u as v,R as T}from"./useRequest-DZS6KsAA.js";import{j as f}from"./jsx-runtime-_e34SzbC.js";import"./Tidsperioden-Dpr6goD7.js";import"./index--IHLcpuH.js";import{v as E,w as A,x as K,y as x,z as B}from"./useFpNavigator-B_Cd7RMu.js";import{i as S,h as y,j as C,g as F}from"./index-BI6FGWNT.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{c as I}from"./barnUtils-Bbng30qG.js";import{c as M}from"./eksisterendeSakUtils-WKX2Kax_.js";var m=(e=>(e.ANNEN_PART_VEDTAK="ANNEN_PART_VEDTAK",e.NESTE_SAK_ANNEN_PART_VEDTAK="NESTE_SAK_ANNEN_PART_VEDTAK",e.STØNADSKONTOER="STØNADSKONTOER",e))(m||{});const R={},_=d.createContext(R),O=d.createContext(void 0),V=({children:e,initialState:t})=>{const[r,s]=d.useReducer((n,a)=>{switch(a.type){case"update":return{...n,[a.key]:[a.hash,a.data]};case"reset":return{};default:throw new Error}},t||R);return f.jsx(_.Provider,{value:r,children:f.jsx(O.Provider,{value:s,children:e})})},H=(e,t)=>{const s=d.useContext(_)[e];return s&&s[0]===t?s[1]:void 0},j=(e,t)=>{const r=d.useContext(O);return s=>{r&&r({type:"update",key:e,hash:t,data:s})}};V.__docgenInfo={description:"",methods:[],displayName:"FpApiDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [FpApiDataType.ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.STØNADSKONTOER]?: [number, TilgjengeligeStønadskontoer];
}`,signature:{properties:[]}},description:""}}};const q=e=>Object.keys(e).sort((t,r)=>t.localeCompare(r)).reduce((t,r)=>(t[r]=e[r],t),{}),w=e=>{let t=0;for(let r=0;r<e.length;r++){const s=e.charCodeAt(r);t=(t<<5)-t+s,t=t&t}return t},U={[m.ANNEN_PART_VEDTAK]:"/rest/innsyn/v2/annenPartVedtak",[m.NESTE_SAK_ANNEN_PART_VEDTAK]:"/rest/innsyn/v2/annenPartVedtak",[m.STØNADSKONTOER]:"/rest/konto"},ot=(e,t,r)=>{var l;const s=w(JSON.stringify(q(t))),n=H(e,s),a=!!n,i=j(e,s),{data:o,requestStatus:p,error:u}=v(U[e],t,{config:{withCredentials:e!==m.STØNADSKONTOER},isSuspended:a||r});return d.useEffect(()=>{o&&i(o)},[o]),(l=u==null?void 0:u.message)!=null&&l.includes("Ugyldig ident")?{data:void 0,requestStatus:T.FINISHED,error:null}:{data:a?n:o,requestStatus:a?T.FINISHED:p,error:u}},k=(e,t)=>e?!0:E(t)?!!t.harRettPåForeldrepengerINorge:!1,G=(e,t)=>e?E(t)?!!t.harRettPåForeldrepengerINorge:!1:!0,L=(e,t)=>{if(S(e)||F(e))return t||e.termindato},z=(e,t)=>t||e||void 0,J=(e,t,r)=>e&&r?r:t,Y=(e,t,r,s,n)=>r||s?"ALENEOMSORG":e&&t||n?"BEGGE_RETT":"BARE_SØKER_RETT",nt=(e,t,r,s,n,a)=>{const i=E(t)?t:void 0,o=A(r.rolle),p=K(o,(i==null?void 0:i.erAleneOmOmsorg)||!1,t),u=x(!o,(i==null?void 0:i.erAleneOmOmsorg)||!1,t),l=s!==void 0?s.startdatoFørsteStønadsperiode:void 0,c=M(n,e,o,I(e),l),D=J(o,e.antallBarn,c==null?void 0:c.grunnlag.antallBarn),h=z(a==null?void 0:a.grunnlag.termindato,c==null?void 0:c.grunnlag.termindato),g=A(r.rolle),N=A(r.rolle),P=E(t)&&t.harRettPåForeldrepengerIEØS;return{rettighetstype:Y(k(g,t),G(g,t),u||!1,p||!1,P||!1),brukerrolle:N?"FAR":"MOR",antallBarn:D.toString(),fødselsdato:S(e)?e.fødselsdatoer[0]:void 0,termindato:L(e,h),omsorgsovertakelseDato:y(e)||C(e)?e.adopsjonsdato:void 0,morHarUføretrygd:B(t,N),familieHendelseDatoNesteSak:l}};export{V as F,m as a,J as b,z as c,nt as g,ot as u};
