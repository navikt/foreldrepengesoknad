import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CDdkwaUD.js";import{M as S,P as u}from"./usePlanleggerNavigator-BM-o9sks.js";import{h as r,a as m,H as o}from"./Planlegger-lwpYpLDi.js";import{D as d}from"./satserUtils-C3ghfRzt.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-qWiE9Y5O.js";import"./barnetUtils-DJEdQVZj.js";import"./hvemHarRettUtils-DIlYlrMu.js";import"./ArbeidssituasjonSteg-CcoSeuLB.js";import"./BlueRadioGroup-CeS_B73H.js";import"./customErrorFormatter-B-gb0qnD.js";import"./PlanleggerStepPage-DZShhhrE.js";import"./useScrollBehaviour-DaUsPXAy.js";import"./Spacer-4dhhMyFQ.js";import"./BarnehageplassSteg-BFLCCTs1.js";import"./uttakUtils-DU3CruIP.js";import"./BabyWrapped-Dwt7z9ji.js";import"./Information-dCyNOdy4.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BroBnrZG.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-lNDAjRlm.js";import"./HvorLangPeriodeSteg-D6x2qolD.js";import"./PersonGroup-D0u7WhLR.js";import"./HvorMyeSteg-BOUZWP0P.js";import"./Wallet-llSNt_iL.js";import"./OmBarnetSteg-NaVvduZZ.js";import"./TasklistStart-DZJeigVO.js";import"./OmPlanleggerenSteg-D-5oHHRC.js";import"./OppsummeringSteg-D63kxOcX.js";import"./ShareDataInfobox-CGwi5rpX.js";import"./CalendarLabels-BOAH7TwE.js";import"./CalendarIconLabel-D2jHVQkA.js";import"./FamiliehendelseLabel-BkcvgwL9.js";import"./PlanenDeresSteg-dJFZ4eHO.js";import"./OmÅTilpassePlanen-sKEhhTPT.js";import"./PersonPregnant-C8enuYwt.js";import"./PencilWriting-DuchxkVM.js";import"./UforutsetteEndringer-Clr31E4N.js";import"./ToggleGroup-CxkLagmg.js";import"./TilpassPlanenSteg-vj7kTiob.js";import"./HvaErMulig-0z1sYag6.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
