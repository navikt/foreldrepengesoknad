import{d as p,I as G,D as S,_ as L,x as J,y as $}from"./Tidsperioden-2f191506.js";import{j as R}from"./jsx-runtime-d079401a.js";import{D as E}from"./Periodene-93f75033.js";import{S as k}from"./Perioden-756f4214.js";import"./index-d741deb4.js";import{r as l}from"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{c as z,b as Q,e as A,j as x,k as W,l as X,i as T,m as Z}from"./barnUtils-42471e8d.js";import{i as N}from"./isFarEllerMedmor-120238ea.js";import{g as b}from"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import{c as tt}from"./eksisterendeSakUtils-e1f0846a.js";import{u as et,R as D,a as rt}from"./useRequest-1bc7422a.js";import{E as P}from"./apiInterceptor-716e24db.js";const st=(t,e)=>{const r=[];return r.push({...t[0],dager:t[0].dager-e}),r.push({konto:k.AktivitetsfriKvote,dager:e}),r},v=t=>{let e=[];Object.keys(t.kontoer).filter(s=>s!==k.Flerbarnsdager).forEach(s=>{e.push({konto:s,dager:t.kontoer[s]})});const r=t.minsteretter.generellMinsterett;return r>0&&(e=st(e,r)),e},Ot=(t,e)=>{const r=v(t),s=v(e);return{[E.ÅTTI_PROSENT]:r,[E.HUNDRE_PROSENT]:s}},Rt=(t,e,r)=>{if(t===void 0||e===void 0||r!=="fødsel")return!1;const s=p(t).isSameOrAfter(p(new Date("2019-07-01")),"day");return p(t).add(7,"weeks").add(3,"days").isBefore(p(e),"days")&&s},Pt=(t,e)=>t&&e?(100-parseInt(e,10)).toString():"100",at=(t,e)=>t?!0:T(e)?!!e.harRettPåForeldrepengerINorge:!1,ot=(t,e)=>t?T(e)?!!e.harRettPåForeldrepengerINorge:!1:!0,nt=t=>T(t)?!!t.harRettPåForeldrepengerIEØS:!1,it=(t,e)=>{if(x(t)||Z(t))return e||S(t.termindato)},dt=(t,e)=>e||t||void 0,lt=(t,e,r)=>t&&r?r:e,g=(t,e)=>J(t)?$(t,e):void 0,vt=(t,e,r,s,a,n,i)=>{const o=N(r.rolle),c=z(o,s.erAleneOmOmsorg,e),d=Q(!o,s.erAleneOmOmsorg,e),j=a==null?void 0:a.familiehendelsesdato,q=a!==void 0?a.startdatoFørsteStønadsperiode:void 0,u=tt(n,t,o,A(t),q),V=lt(o,t.antallBarn,u==null?void 0:u.grunnlag.antallBarn),w=dt(i==null?void 0:i.grunnlag.termindato,u==null?void 0:u.grunnlag.termindato),_=N(r.rolle),Y=G(A(t)),h=N(r.rolle),m="YYYYMMDD",O={farHarRett:at(_,e),morHarRett:ot(_,e),harAnnenForelderTilsvarendeRettEØS:nt(e),morHarAleneomsorg:d||!1,farHarAleneomsorg:c||!1,antallBarn:V,fødselsdato:g(x(t)?S(t.fødselsdatoer[0]):void 0,m),termindato:g(it(t,w),m),omsorgsovertakelseDato:g(W(t)||X(t)?S(t.adopsjonsdato):void 0,m),startdatoUttak:g(A(t),m),minsterett:L(Y),erMor:!h,morHarUføretrygd:b(e,h),familieHendelseDatoNesteSak:g(S(j),m)};return{stønadskontoParams100:{...O,dekningsgrad:E.HUNDRE_PROSENT},stønadskontoParams80:{...O,dekningsgrad:E.ÅTTI_PROSENT}}};var f=(t=>(t.ANNEN_PART_VEDTAK="ANNEN_PART_VEDTAK",t.NESTE_SAK_ANNEN_PART_VEDTAK="NESTE_SAK_ANNEN_PART_VEDTAK",t.STØNADSKONTOER_100="STØNADSKONTOER_100",t.STØNADSKONTOER_80="STØNADSKONTOER_80",t))(f||{});const H={},K=l.createContext(H),y=l.createContext(void 0),I=({children:t})=>{const[e,r]=l.useReducer((s,a)=>{switch(a.type){case"update":return{...s,[a.key]:[a.hash,a.data]};case"reset":return{};default:throw new Error}},H);return R.jsx(K.Provider,{value:e,children:R.jsx(y.Provider,{value:r,children:t})})},C=(t,e)=>{const s=l.useContext(K)[t];return s&&s[0]===e?s[1]:void 0},F=(t,e)=>{const r=l.useContext(y);return s=>{r&&r({type:"update",key:t,hash:e,data:s})}};try{I.displayName="FpApiDataContext",I.__docgenInfo={description:"",displayName:"FpApiDataContext",props:{initialState:{defaultValue:null,description:"",name:"initialState",required:!1,type:{name:"FpApiDataHashMap"}},onDispatch:{defaultValue:null,description:"",name:"onDispatch",required:!1,type:{name:"((action: Action) => void)"}}}}}catch{}const M=t=>Object.keys(t).sort((e,r)=>e.localeCompare(r)).reduce((e,r)=>(e[r]=t[r],e),{}),B=t=>{let e=0;for(let r=0;r<t.length;r++){const s=t.charCodeAt(r);e=(e<<5)-e+s,e=e&e}return e},U={[f.ANNEN_PART_VEDTAK]:"/innsyn/v2/annenPartVedtak",[f.NESTE_SAK_ANNEN_PART_VEDTAK]:"/innsyn/v2/annenPartVedtak",[f.STØNADSKONTOER_80]:`${P.REST_API_URL}/konto`,[f.STØNADSKONTOER_100]:`${P.REST_API_URL}/konto`},It=(t,e,r)=>{const s=B(JSON.stringify(M(e))),a=C(t,s),n=!!a,i=F(t,s),{data:o,requestStatus:c,error:d}=et(U[t],{config:{timeout:15*1e3,params:e,withCredentials:!1},isSuspended:n||r});return l.useEffect(()=>{o&&i(o)},[o]),{data:n?a:o,requestStatus:n?D.FINISHED:c,error:d}},kt=(t,e,r)=>{const s=B(JSON.stringify(M(e))),a=C(t,s),n=!!a,i=F(t,s),{data:o,requestStatus:c,error:d}=rt(U[t],e,{config:{withCredentials:!0},isSuspended:n||r});return l.useEffect(()=>{o&&i(o)},[o]),d&&d.message.includes("Ugyldig ident")?{data:void 0,requestStatus:D.FINISHED,error:null}:{data:n?a:o,requestStatus:n?D.FINISHED:c,error:d}};export{I as F,f as a,It as b,Ot as c,lt as d,Pt as e,vt as g,Rt as s,kt as u};
