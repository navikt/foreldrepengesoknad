import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{Q as M,a as R,b as w,h as p,H as m}from"./Planlegger-CHtKqKgQ.js";import{r as s}from"./index-CTjT7uj6.js";import{S as r}from"./Uttaksplan-Dl087Op2.js";import{d as y}from"./composeEventHandlers-CQxkItEI.js";import{l as F,i as A}from"./amplitude-CwVHyeVN.js";import{n as x,u as c,a as u,e as O,b as T}from"./nn_NO-xZ5PLckq.js";import{n as v}from"./index-DFjIPz0u.js";import{I as $,E as C,j as D}from"./VeiviserPage-96q4z1iB.js";import{M as L}from"./usePlanleggerNavigator-Cm6vQNA1.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CRuekH12.js";import"./barnetUtils-DlK2ezHC.js";import"./barnType-CnRI8jWg.js";import"./hvemHarRettUtils-DaTWCV6h.js";import"./routes-gnI_NAHe.js";import"./ArbeidssituasjonSteg-CcFghVNm.js";import"./BlueRadioGroup-BXetq7PL.js";import"./StepButtonsHookForm-BKlDxIoe.js";import"./VStack-CL9KkpXr.js";import"./Responsive-DXvSXsD0.js";import"./index-BbmHap-z.js";import"./useDescendant-BRdZoW52.js";import"./ArrowLeft-DucJ29WA.js";import"./ArrowRight-DKhFa6bH.js";import"./stringUtils-BLFzASq_.js";import"./customErrorFormatter-BAPWT5E-.js";import"./PlanleggerStepPage-CSYOuldx.js";import"./satserUtils-Crj2HgKZ.js";import"./validation-DdAZ_Aa2.js";import"./dateFormValidation-akPD_OBx.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./Checkmark-BTbDdFPG.js";import"./Spacer-BW3tgveW.js";import"./BarnehageplassSteg-BkbxdoJ_.js";import"./uttakUtils-BlBKvfQA.js";import"./BabyWrapped-BmM7oml1.js";import"./Information-Bmi259za.js";import"./ExpansionCard-Cbc8mE8e.js";import"./FordelingSteg-Bo9f1KM-.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-1IKl5OPX.js";import"./HvorLangPeriodeSteg-DtqQ3nmr.js";import"./PersonGroup-28ji-Imn.js";import"./HvorMyeSteg-DIX5iGch.js";import"./Wallet-BVwe51Pq.js";import"./OmBarnetSteg-NLyuwzcb.js";import"./TasklistStart-tqEO_qgA.js";import"./OmPlanleggerenSteg-BNPzHJIj.js";import"./OppsummeringSteg-CruTq8Au.js";import"./ShareDataInfobox-BmqwRKQa.js";import"./CalendarLabels-DVE-HdY-.js";import"./CalendarIconLabel-BGbS44xu.js";import"./FamiliehendelseLabel-BuaJ6Zvx.js";import"./UttaksplanKalender-DEw2Yf5O.js";import"./iframe-Dt2twp6C.js";import"../sb-preview/runtime.js";import"./_getTag-WD7lpBXy.js";import"./PlanenDeresSteg-6KAPZR-a.js";import"./OmÅTilpassePlanen-C99lNIfE.js";import"./PersonPregnant-DiOgii_u.js";import"./Briefcase-DdOvFoVc.js";import"./PencilWriting-DBZWjI4-.js";import"./UforutsetteEndringer-srKgsWZS.js";import"./ToggleGroup-CyH79ZUF.js";import"./index-BRV0Se7Z.js";var _=function(){return null};const P="From {fom} until {tom}",N={tidsperiode:P,"tidsperiode.kort":"{fom} - {tom}"},B="Fra {fom} til {tom}",U={tidsperiode:B,"tidsperiode.kort":"{fom} - {tom}"},H="Frå {fom} til {tom}",I={tidsperiode:H,"tidsperiode.kort":"{fom} - {tom}"},K=t=>{const e=s.useRef(t);s.useEffect(()=>{e.current=t},[t]),s.useEffect(()=>(window.addEventListener("beforeunload",e.current),()=>window.removeEventListener("beforeunload",e.current)),[])},g={nb:U,nn:I,en:N},Q={...T,...c.nb,...g.nb,...v.nb,...u.nb},q=new M({defaultOptions:{queries:{retry:3}}}),G={nb:Q,nn:{...x,...c.nn,...g.nn,...v.nn,...u.nn},en:{...O,...c.en,...g.en,...u.en}},J=()=>{const t=window.location.search,e=new URLSearchParams(t).get("language"),n=e==="nb"||e==="nn"||e==="en"?e:"nb";return y.locale(n),document.documentElement.setAttribute("lang",n),n},f=()=>{const t=s.useMemo(()=>J(),[]),[e,n]=s.useState(t);K(()=>{F("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const d=s.useCallback(l=>{n(l),y.locale(l),document.documentElement.setAttribute("lang",l)},[]);return o.jsx($,{locale:e,messagesGroupedByLocale:G,children:o.jsx(C,{appName:"Foreldrepengeplanlegger",customErrorPage:o.jsx(D,{retryCallback:()=>location.reload()}),children:o.jsxs(R,{client:q,children:[o.jsx(_,{}),o.jsx(w,{locale:e,changeLocale:d})]})})})};f.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const Y={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},z={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},pt={title:"AppContainer",component:f,parameters:{msw:{handlers:[p.post(".//rest/konto",async({request:t})=>{const e=await t.json(),d=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(e),method:"POST",headers:{"Content-Type":"application/json"}})).json();return m.json(d)}),p.get(".//rest/satser",async()=>{const e=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return m.json(e)})]}},render:()=>(A(),o.jsx(s.StrictMode,{children:o.jsx(L,{children:o.jsx(f,{})})}))},a={},i={...a,parameters:{msw:{handlers:[p.post(".//rest/konto",()=>m.json(Y)),p.get(".//rest/satser",()=>m.json(z))]}}};var k,S,j;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:"{}",...(j=(S=a.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var E,b,h;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(h=(b=i.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const mt=["Default","DefaultMockaStønadskontoerOgSatser"];export{a as Default,i as DefaultMockaStønadskontoerOgSatser,mt as __namedExportsOrder,pt as default};
