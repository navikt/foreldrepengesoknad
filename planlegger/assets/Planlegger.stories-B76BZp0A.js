import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CJmNX-Qy.js";import{M as S,P as u}from"./usePlanleggerNavigator-CHxEWgLI.js";import{h as r,a as m,H as o}from"./Planlegger-DTuHL_AT.js";import{D as d}from"./satserUtils-CcNZKoGW.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-kdfItyte.js";import"./barnetUtils-HCVQ2KtU.js";import"./hvemHarRettUtils-hF3KqmRK.js";import"./ArbeidssituasjonSteg-C7vR-AyF.js";import"./BlueRadioGroup-DdW4noOS.js";import"./customErrorFormatter-3Xx2NEok.js";import"./PlanleggerStepPage-4Ph6bjVj.js";import"./useScrollBehaviour-CmyWvVDF.js";import"./Spacer-DNqk_7HY.js";import"./BarnehageplassSteg-C3spCo4n.js";import"./uttakUtils-CNIQjtKE.js";import"./BabyWrapped-Dl08ofP9.js";import"./Information-COiGrVgs.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-COd1nNpV.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BwFMpftm.js";import"./HvorLangPeriodeSteg-DQX1-Gmq.js";import"./PersonGroup-BK4a2Yry.js";import"./HvorMyeSteg-Dgs4PaPN.js";import"./Wallet-C8O3ksEG.js";import"./OmBarnetSteg-DpvZ7x1A.js";import"./TasklistStart-ClH8mCKX.js";import"./OmPlanleggerenSteg-BPojwEcf.js";import"./OppsummeringSteg-BiVpV7l6.js";import"./ShareDataInfobox-D9vr4aaS.js";import"./CalendarLabels-Bb1HqHUI.js";import"./CalendarIconLabel-C5hGrhRR.js";import"./FamiliehendelseLabel-BwA-eJ6g.js";import"./PlanenDeresSteg-BuyE4Tkc.js";import"./OmÅTilpassePlanen-NqaGbMMo.js";import"./PersonPregnant-By4dsuSE.js";import"./PencilWriting-D2nybxb7.js";import"./UforutsetteEndringer-CDF0Kcrl.js";import"./ToggleGroup-B3gGmvMu.js";import"./TilpassPlanenSteg-CeGUzx0U.js";import"./HvaErMulig-DHgl2s_S.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
