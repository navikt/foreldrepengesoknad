import{w as F,j as n,r as R,E as T,l as t}from"./iframe-C99sxnSa.js";import{M as E,P as y}from"./usePlanleggerNavigator-hP8CXpll.js";import{h as r,a as m,H as o}from"./Planlegger-BZUmb5lc.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BD-V6xm3.js";import"./barnetUtils-JBbyHvrM.js";import"./hvemHarRettUtils-D9smcPz3.js";import"./ArbeidssituasjonSteg-CwvBWpzH.js";import"./BlueRadioGroup-DIe3hDbq.js";import"./customErrorFormatter-CBCMan6W.js";import"./PlanleggerStepPage-BFyRZs6C.js";import"./satserUtils-C1a8tOSD.js";import"./useScrollBehaviour-F8Ufidqa.js";import"./Spacer-DS-lozIZ.js";import"./BarnehageplassSteg-DSSRPT1D.js";import"./uttakUtils-CMKlhXhA.js";import"./BabyWrapped-KQGcj3uz.js";import"./Information-B4QF2Jvw.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-I2p_WyGF.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BOHwgWMP.js";import"./HvorLangPeriodeSteg-ChTDfDdI.js";import"./PersonGroup-C7k4jC5n.js";import"./HvorMyeSteg-BNHEOy08.js";import"./Wallet-C7HP89Hn.js";import"./OmBarnetSteg-LUQe5W34.js";import"./TasklistStart-DMf7L1Ex.js";import"./OmPlanleggerenSteg-DAjvoN4n.js";import"./OppsummeringSteg-BNIsNtDV.js";import"./ShareDataInfobox-B2zggsXG.js";import"./CalendarLabels-a7hXtBYp.js";import"./CalendarIconLabel-BFsozv7s.js";import"./FamiliehendelseLabel-BMoXJEKZ.js";import"./PlanenDeresSteg-2uzdapQ9.js";import"./OmÅTilpassePlanen-BK-qJr6i.js";import"./PersonPregnant-BWlqd6Im.js";import"./PencilWriting-DtOCG-lC.js";import"./UforutsetteEndringer-Dz7SgOks.js";import"./ToggleGroup-DV3TmfbB.js";import"./TilpassPlanenSteg-Bnb7IwC4.js";import"./HvaErMulig-Bpz2mWQD.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var k,g,S;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(S=(g=s.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var u,f,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json({
        '100': {
          kontoer: [{
            konto: StønadskontoType.AktivitetsfriKvote,
            dager: 75
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        },
        '80': {
          kontoer: [{
            konto: StønadskontoType.AktivitetsfriKvote,
            dager: 95
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const vt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,vt as __namedExportsOrder,ht as default};
