import{j as t}from"./jsx-runtime-DwRxq3ZX.js";import{Q as v,a as R,b as F,h as p,H as m}from"./Planlegger-_VJuJo3j.js";import{r as i}from"./index-BX3iQpgp.js";import{S as o}from"./KvoteOppsummering-MziGtOBb.js";import{d as M}from"./UttaksdagenString-BukZE9W5.js";import{n as x,u as c,a as g,e as A,b as w}from"./nn_NO-DzxmM6So.js";import{n as E}from"./index-D6c9KCmc.js";import{I as O,E as T,h as $}from"./VeiviserPage-D4tcb8_M.js";import{M as C}from"./usePlanleggerNavigator-D8MRbo-c.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BK9nF1ca.js";import"./barnetUtils-CSRVk0a8.js";import"./barnType-CnRI8jWg.js";import"./hvemHarRettUtils-C-poRxZI.js";import"./routes-gnI_NAHe.js";import"./ArbeidssituasjonSteg-CyKIY_mT.js";import"./BlueRadioGroup-zyk_m-Tn.js";import"./StepButtonsHookForm-BshiUIx4.js";import"./VStack-D5W2V_Wo.js";import"./Responsive-Ce8eyPol.js";import"./index-B1dLepta.js";import"./useDescendant-CwE7bbj1.js";import"./ArrowLeft-KP0Gek8u.js";import"./ArrowRight-8JtNjBzF.js";import"./stringUtils-BLFzASq_.js";import"./customErrorFormatter-Cvr18wO_.js";import"./PlanleggerStepPage-B4mv9i7n.js";import"./satserUtils-Cswv5nKA.js";import"./validation-C6jaRJB5.js";import"./dateFormValidation-Bp6HZMTm.js";import"./useScrollBehaviour-CZj3Grib.js";import"./Checkmark-DEUvPW0c.js";import"./Spacer-BzMIvYka.js";import"./BarnehageplassSteg-CUnDaUGh.js";import"./uttakUtils-Ccou8geE.js";import"./BabyWrapped-CJsG2lfv.js";import"./Information-BbPAPgch.js";import"./amplitudeUtils-DAyIbceM.js";import"./amplitude-DFYcRhpr.js";import"./ExpansionCard-538sVYuJ.js";import"./FordelingSteg--9dqG0FH.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-AWqXF-Iv.js";import"./HvorLangPeriodeSteg-BdnitoZw.js";import"./PersonGroup-PZs_xqug.js";import"./HvorMyeSteg-CQNfPMck.js";import"./Wallet-B2EmqHGK.js";import"./OmBarnetSteg-zu-zMPBD.js";import"./TasklistStart-CPo7Rzen.js";import"./OmPlanleggerenSteg-DYUqC7Hi.js";import"./OppsummeringSteg-C93SYspz.js";import"./ShareDataInfobox-BtBvN74b.js";import"./CalendarLabels-DXk4Tri_.js";import"./CalendarIconLabel-DueYfOM_.js";import"./FamiliehendelseLabel-5_6CDZ_a.js";import"./UttaksplanKalender-DjMPEdLw.js";import"./iframe-MHsM3fNt.js";import"../sb-preview/runtime.js";import"./PlanenDeresSteg-He0_enZS.js";import"./OmÅTilpassePlanen-DdkxR_HE.js";import"./PersonPregnant-4WbOnLNS.js";import"./Briefcase-C6hC4ecx.js";import"./PencilWriting-Brp2nDhe.js";import"./UforutsetteEndringer-DW_6_C44.js";import"./ToggleGroup-DgS3hqkv.js";var D=function(){return null};const _="From {fom} until {tom}",P={tidsperiode:_,"tidsperiode.kort":"{fom} - {tom}"},L="Fra {fom} til {tom}",N={tidsperiode:L,"tidsperiode.kort":"{fom} - {tom}"},B="Frå {fom} til {tom}",U={tidsperiode:B,"tidsperiode.kort":"{fom} - {tom}"},u={nb:N,nn:U,en:P},H={...w,...c.nb,...u.nb,...E.nb,...g.nb},I=new v({defaultOptions:{queries:{retry:3}}}),Q={nb:H,nn:{...x,...c.nn,...u.nn,...E.nn,...g.nn},en:{...A,...c.en,...u.en,...g.en}},q=()=>{const r=window.location.search,e=new URLSearchParams(r).get("language"),s=e==="nb"||e==="nn"||e==="en"?e:"nb";return M.locale(s),document.documentElement.setAttribute("lang",s),s},f=()=>{const r=i.useMemo(()=>q(),[]),[e,s]=i.useState(r),d=i.useCallback(l=>{s(l),M.locale(l),document.documentElement.setAttribute("lang",l)},[]);return t.jsx(O,{locale:e,messagesGroupedByLocale:Q,children:t.jsx(T,{appName:"planlegger",customErrorPage:t.jsx($,{retryCallback:()=>location.reload()}),children:t.jsxs(R,{client:I,children:[t.jsx(D,{}),t.jsx(F,{locale:e,changeLocale:d})]})})})};f.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const G={100:{kontoer:[{konto:o.Mødrekvote,dager:75},{konto:o.Fedrekvote,dager:75},{konto:o.Fellesperiode,dager:80},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:o.Mødrekvote,dager:95},{konto:o.Fedrekvote,dager:95},{konto:o.Fellesperiode,dager:90},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},K={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},st={title:"AppContainer",component:f,parameters:{msw:{handlers:[p.post(".//rest/konto",async({request:r})=>{const e=await r.json(),d=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(e),method:"POST",headers:{"Content-Type":"application/json"}})).json();return m.json(d)}),p.get(".//rest/satser",async()=>{const e=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return m.json(e)})]}},render:()=>t.jsx(i.StrictMode,{children:t.jsx(C,{children:t.jsx(f,{})})})},n={},a={...n,parameters:{msw:{handlers:[p.post(".//rest/konto",()=>m.json(G)),p.get(".//rest/satser",()=>m.json(K))]}}};var k,S,j;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:"{}",...(j=(S=n.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var h,b,y;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};const nt=["Default","DefaultMockaStønadskontoerOgSatser"];export{n as Default,a as DefaultMockaStønadskontoerOgSatser,nt as __namedExportsOrder,st as default};
