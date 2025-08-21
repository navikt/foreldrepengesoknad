import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CLf1HT0m.js";import{M as S,P as u}from"./usePlanleggerNavigator-nzjOwZTY.js";import{h as r,a as m,H as o}from"./Planlegger-Cau1dzqX.js";import{D as d}from"./satserUtils-DCB33mY4.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BaeAZJjJ.js";import"./barnetUtils-i9fhKq44.js";import"./hvemHarRettUtils-BIn454Dl.js";import"./ArbeidssituasjonSteg-Cw2GHWJb.js";import"./BlueRadioGroup-CbMYg4ec.js";import"./customErrorFormatter-BZ_IR-Mf.js";import"./PlanleggerStepPage-CroPI4Ac.js";import"./useScrollBehaviour-BlR6FJlM.js";import"./Spacer-tFz7OrlQ.js";import"./BarnehageplassSteg-adpGWNpZ.js";import"./uttakUtils-C7ifSyyF.js";import"./BabyWrapped-DfOCB5qs.js";import"./Information-TUa1BU_-.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-B84_cGiN.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-oIZVfzeA.js";import"./HvorLangPeriodeSteg-BngbswN_.js";import"./PersonGroup-BEgUwSem.js";import"./HvorMyeSteg-B6VOTePu.js";import"./Wallet-C4W6SduV.js";import"./OmBarnetSteg-3FM2jzKo.js";import"./TasklistStart-D8qtE8CY.js";import"./OmPlanleggerenSteg-BNlfrI0x.js";import"./OppsummeringSteg-BHIziuio.js";import"./ShareDataInfobox-OT5rwm95.js";import"./CalendarLabels-Pk48mDNF.js";import"./CalendarIconLabel-BefFm7C6.js";import"./FamiliehendelseLabel-cV-HeDq4.js";import"./PlanenDeresSteg-BkmypIGj.js";import"./OmÅTilpassePlanen-CWX3nVzR.js";import"./PersonPregnant-CWyB51EK.js";import"./PencilWriting-CoFfZFj4.js";import"./UforutsetteEndringer-KqFxTWdl.js";import"./ToggleGroup-DQu-w5nG.js";import"./TilpassPlanenSteg-YGSGY43H.js";import"./HvaErMulig-Dr6RMKq0.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};const lt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,lt as __namedExportsOrder,dt as default};
