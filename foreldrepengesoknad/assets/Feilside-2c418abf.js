import{j as r}from"./jsx-runtime-1caa8f64.js";import{Q as C,W as y,t as R,y as T,s as N,X as U,c as h,H as V,B as v,k as _}from"./Tidsperioden-d3b158ba.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{n as x}from"./amplitude.esm-2809efde.js";import{u as g}from"./useRequest-a00d1ba3.js";import{g as c,E as q}from"./apiInterceptor-716e24db.js";import"./index-753920cd.js";import{d as M}from"./FpDataContext-c0784ba8.js";import{L as B,B as I}from"./Link-d47e444a.js";const Y=(t,e)=>C(e)?e:!Array.isArray(e)&&y(e,[y.HTML5_FMT.DATE,"YYYY-MM-DDTHH:mm:ss.SSSZ"],!0).isValid()?new Date(e):e,L=t=>{if(t)return JSON.parse(t,Y)},u=(t,e)=>R(t)?T(t,e):void 0,G=q.REST_API_URL,K="/soknad",P="/soknad/endre",O=()=>{const{data:t,error:e}=g("/sokerinfo",{config:{withCredentials:!0}});return{søkerinfoData:t,søkerinfoError:e}},z=()=>{const{data:t,error:e}=g("/innsyn/v2/saker",{config:{withCredentials:!0}});return{sakerData:t,sakerError:e}},J=()=>{const{data:t,error:e,requestStatus:a}=g("/storage/foreldrepenger",{config:{transformResponse:L,withCredentials:!0}});return{storageData:t,storageError:e,storageStatus:a}},Q=(t,e)=>c(e).post("/storage/foreldrepenger",t,{withCredentials:!0}),W=t=>c(t).get("/storage/kvittering/foreldrepenger",{withCredentials:!0,timeout:15*1e3}),X=(t,e=!1)=>{const{antallBarn:a,farHarRettINorge:n,morHarRettINorge:s,harAnnenForelderTilsvarendeRettEØS:o,dekningsgrad:m,fødselsdato:i,termindato:l,omsorgsovertakelsesdato:p,morHarAleneomsorg:f,farHarAleneomsorg:k,startdatoUttak:S,minsterett:D,erMor:E,morHarUføretrygd:H,familieHendelseDatoNesteSak:b}=t,d="YYYYMMDD",w={farHarRett:n,morHarRett:s,harAnnenForelderTilsvarendeRettEØS:o,morHarAleneomsorg:f||!1,farHarAleneomsorg:k||!1,dekningsgrad:m,antallBarn:a,fødselsdato:u(i,d),termindato:u(l,d),omsorgsovertakelseDato:u(p,d),startdatoUttak:u(S,d),minsterett:D,erMor:E,morHarUføretrygd:H,familieHendelseDatoNesteSak:u(b,d)},{data:A,error:F}=g(`${G}/konto`,{config:{timeout:15*1e3,params:w,withCredentials:!1},isSuspended:e});return{tilgjengeligeStønadskontoerData:A,tilgjengeligeStønadskontoerError:F}},Z=(t,e,a)=>{const n=t.erEndringssøknad?P:K;return c(e).post(n,t,{withCredentials:!0,timeout:120*1e3,headers:{"content-type":"application/json;"},signal:a})},$=(t,e)=>c(t).delete("/storage/foreldrepenger",{withCredentials:!0,signal:e}),ee=(t,e,a)=>{const n=e.reduce((s,o)=>(o.uuid&&s.push(o.uuid),s),[]);return c(t).delete("/storage/foreldrepenger/vedlegg",{withCredentials:!0,data:n,signal:a})},te={useGetUttakskontoer:X,storeAppState:Q,getStorageKvittering:W,useStoredAppState:J,useSøkerinfo:O,sendSøknad:Z,useGetSaker:z,deleteMellomlagretSøknad:$,deleteMellomlagredeVedlegg:ee},re=(t,e,a=!0)=>{if(a){console.log({eventName:t,eventData:e});return}setTimeout(()=>{try{x&&x.getInstance().logEvent(t,e)}catch(n){console.error(n)}})};const j=({containerId:t,illustrasjon:e,tittel:a,ingress:n,skalKunneGåTilbakeTilSøknad:s,språkkode:o,setLanguage:m,søkerInfo:i})=>{const l=_("feilside"),p=M(),f=async()=>{if(i){re("applikasjon-hendelse",{app:"foreldrepengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),p();try{await te.deleteMellomlagretSøknad(i.person.fnr)}catch{}window.location.href="https://nav.no"}},k=()=>{window.location.reload()};return r.jsxs(r.Fragment,{children:[m&&o&&r.jsx(N,{locale:o,availableLocales:["en","nb","nn"],toggle:m}),e&&r.jsx(U,{dialog:{title:e.tittel,text:r.jsxs(r.Fragment,{children:[r.jsx(h,{padBottom:"m",children:e.tekst}),e.lenke&&r.jsx(B,{href:e.lenke.url,children:e.lenke.tekst})]})}}),r.jsxs("div",{id:t,className:l.block,children:[r.jsx(h,{padBottom:"l",children:r.jsx(V,{size:"large",level:"2",children:a})}),r.jsx(h,{padBottom:"l",children:r.jsx(I,{children:n})}),i!==void 0&&!s&&r.jsx("div",{className:l.element("avbrytKnapp"),children:r.jsx(v,{variant:"primary",onClick:f,children:"Start søknaden på nytt"})}),i!==void 0&&s&&r.jsx("div",{className:l.element("avbrytKnapp"),children:r.jsx(v,{variant:"primary",onClick:k,children:"Gå tilbake til søknaden"})})]})]})};try{j.displayName="Feilside",j.__docgenInfo={description:"",displayName:"Feilside",props:{containerId:{defaultValue:null,description:"",name:"containerId",required:!1,type:{name:"string"}},dokumenttittel:{defaultValue:null,description:"",name:"dokumenttittel",required:!0,type:{name:"string"}},illustrasjon:{defaultValue:null,description:"",name:"illustrasjon",required:!1,type:{name:"{ tittel: string; tekst: ReactNode; lenke?: { url: string; tekst: string; }; }"}},tittel:{defaultValue:null,description:"",name:"tittel",required:!0,type:{name:"ReactNode"}},ingress:{defaultValue:null,description:"",name:"ingress",required:!0,type:{name:"ReactNode"}},skalKunneGåTilbakeTilSøknad:{defaultValue:null,description:"",name:"skalKunneGåTilbakeTilSøknad",required:!0,type:{name:"boolean"}},språkkode:{defaultValue:null,description:"",name:"språkkode",required:!1,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},setLanguage:{defaultValue:null,description:"",name:"setLanguage",required:!1,type:{name:"((languageCode: string) => void)"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!1,type:{name:"Søkerinfo"}}}}}catch{}export{te as A,j as F,re as l};
