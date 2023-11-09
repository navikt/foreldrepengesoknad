import{r as k}from"./index-7c191284.js";import{E as U,g as S}from"./apiInterceptor-7ea9ce80.js";import{Z as w,a0 as H,C as T,a1 as v}from"./Tidsperioden-bc4aa89e.js";import"./jsx-runtime-69eee039.js";import"./index-e13aeee6.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";const N=()=>{window.location.href=U.LOGIN_URL+"?redirect="+window.location.origin};var u=(e=>(e.UNFETCHED="Unfetched",e.IN_PROGRESS="InProgress",e.FINISHED="Finished",e))(u||{});const P={config:{},isSuspended:!1},m=(e,t=P)=>{const[r,s]=k.useState(),[n,d]=k.useState(null),[o,i]=k.useState(u.UNFETCHED),c=t.fnr?S(t.fnr):S();return k.useEffect(()=>{!t.isSuspended&&o===u.UNFETCHED&&(i(u.IN_PROGRESS),c.get(e,t.config).then(a=>{a.data===""?s(void 0):s(a.data),i(u.FINISHED)}).catch(a=>{a.response&&(a.response.status===401||a.response.status===403)?N():d(a),i(u.FINISHED)}))},[t,e,c,o]),{data:r,error:n,requestStatus:o}},M=(e,t,r=P)=>{const[s,n]=k.useState(),[d,o]=k.useState(null),[i,c]=k.useState(u.UNFETCHED),a=r.fnr?S(r.fnr):S();return k.useEffect(()=>{!r.isSuspended&&i===u.UNFETCHED&&(c(u.IN_PROGRESS),a.post(e,t,r.config).then(l=>{l.data===""?n(void 0):n(l.data),c(u.FINISHED)}).catch(l=>{l.response&&(l.response.status===401||l.response.status===403)?N():o(l),c(u.FINISHED)}))},[r,e,a,i,t]),{data:s,error:d,requestStatus:i}},y=(e,t)=>w(t)?t:!Array.isArray(t)&&H(t,[H.HTML5_FMT.DATE,"YYYY-MM-DDTHH:mm:ss.SSSZ"],!0).isValid()?new Date(t):t,G=e=>{if(e)return JSON.parse(e,y)},f=(e,t)=>T(e)?v(e,t):void 0,O=U.REST_API_URL,_="/soknad",Y="/soknad/endre",q=()=>{const{data:e,error:t}=m("/sokerinfo",{config:{withCredentials:!0}});return{søkerinfoData:e,søkerinfoError:t}},L=()=>{const{data:e,error:t}=m("/innsyn/v2/saker",{config:{withCredentials:!0}});return{sakerData:e,sakerError:t}},j=(e,t,r,s)=>{const n={annenPartFødselsnummer:e,barnFødselsnummer:t,familiehendelse:r},{data:d,error:o,requestStatus:i}=M("/innsyn/v2/annenPartVedtak",n,{config:{withCredentials:!0},isSuspended:s});return o&&o.message.includes("Ugyldig ident")?{eksisterendeSakAnnenPartData:void 0,eksisterendeSakAnnenPartError:void 0,eksisterendeSakAnnenPartRequestStatus:u.FINISHED}:{eksisterendeSakAnnenPartData:d,eksisterendeSakAnnenPartError:o,eksisterendeSakAnnenPartRequestStatus:i}},x=()=>{const{data:e,error:t}=m("/storage",{config:{transformResponse:G,withCredentials:!0}});return{storageData:e,storageError:t}},V=(e,t)=>{const{søknad:r,version:s,currentRoute:n,uttaksplanInfo:d,antallUkerIUttaksplan:o,eksisterendeSak:i,endringstidspunkt:c,harAnnenPartEksisterendeSak:a,harEksisterendeSak:l,perioderSomSkalSendesInn:E,harUttaksplanBlittSlettet:p,søknadGjelderEtNyttBarn:D,barnFraNesteSak:I,brukerSvarteJaPåAutoJustering:h,annenPartsUttakErLagtTilIPlan:A}=e;return S(t).post("/storage",{søknad:r,version:s,currentRoute:n,uttaksplanInfo:d,antallUkerIUttaksplan:o,eksisterendeSak:i,endringstidspunkt:c,harAnnenPartEksisterendeSak:a,harEksisterendeSak:l,perioderSomSkalSendesInn:E,harUttaksplanBlittSlettet:p,søknadGjelderEtNyttBarn:D,barnFraNesteSak:I,brukerSvarteJaPåAutoJustering:h,annenPartsUttakErLagtTilIPlan:A},{withCredentials:!0})},b=e=>S(e).delete("/storage",{withCredentials:!0}),B=e=>S(e).get("/storage/kvittering/foreldrepenger",{withCredentials:!0,timeout:15*1e3}),J=(e,t=!1)=>{const{antallBarn:r,farHarRettINorge:s,morHarRettINorge:n,harAnnenForelderTilsvarendeRettEØS:d,dekningsgrad:o,fødselsdato:i,termindato:c,omsorgsovertakelsesdato:a,morHarAleneomsorg:l,farHarAleneomsorg:E,startdatoUttak:p,minsterett:D,erMor:I,morHarUføretrygd:h,familieHendelseDatoNesteSak:A}=e,g="YYYYMMDD",R={farHarRett:s,morHarRett:n,harAnnenForelderTilsvarendeRettEØS:d,morHarAleneomsorg:l||!1,farHarAleneomsorg:E||!1,dekningsgrad:o,antallBarn:r,fødselsdato:f(i,g),termindato:f(c,g),omsorgsovertakelseDato:f(a,g),startdatoUttak:f(p,g),minsterett:D,erMor:I,morHarUføretrygd:h,familieHendelseDatoNesteSak:f(A,g)},{data:F,error:C}=m(`${O}/konto`,{config:{timeout:15*1e3,params:R,withCredentials:!1},isSuspended:t});return{tilgjengeligeStønadskontoerData:F,tilgjengeligeStønadskontoerError:C}},Z=(e,t,r)=>{const s=e.erEndringssøknad?Y:_;return S(t).post(s,e,{withCredentials:!0,timeout:120*1e3,headers:{"content-type":"application/json;"},signal:r})},K=(e,t)=>S(e).delete("/storage",{withCredentials:!0,signal:t}),$=(e,t,r)=>{const s=t.reduce((n,d)=>(d.uuid&&n.push(d.uuid),n),[]);return S(e).delete("/storage/vedlegg",{withCredentials:!0,data:s,signal:r})},se={useGetUttakskontoer:J,storeAppState:V,deleteStoredAppState:b,getStorageKvittering:B,useGetAnnenPartsVedtak:j,useStoredAppState:x,useSøkerinfo:q,sendSøknad:Z,useGetSaker:L,deleteMellomlagretSøknad:K,deleteMellomlagredeVedlegg:$};export{se as A,u as R,N as r};
//# sourceMappingURL=api-f185354c.js.map
