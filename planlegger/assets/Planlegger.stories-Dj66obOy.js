import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CEvsz2vt.js";import{M as S,P as u}from"./usePlanleggerNavigator-DP9d7zaw.js";import{h as r,a as m,H as o}from"./Planlegger-Z7zicYTP.js";import{D as d}from"./satserUtils-BRDMmP4Q.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Cr6VmqTZ.js";import"./barnetUtils-DcsU4DuI.js";import"./hvemHarRettUtils-BXUnNEJ4.js";import"./ArbeidssituasjonSteg-C-j1hERl.js";import"./BlueRadioGroup-DqoYpcoj.js";import"./customErrorFormatter-CiFagAUC.js";import"./PlanleggerStepPage-Dr03yGf8.js";import"./useScrollBehaviour-ZxuCZWSz.js";import"./Spacer-o7Q7Kg32.js";import"./BarnehageplassSteg-BYwrtR_P.js";import"./uttakUtils-BI6B6G6Z.js";import"./BabyWrapped-BrVpGhZz.js";import"./Information-BByfAI3m.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-C0dr-qXC.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CjYw7S6i.js";import"./HvorLangPeriodeSteg-9nHEgyXc.js";import"./PersonGroup-C4TscJmX.js";import"./HvorMyeSteg-Ww5EbR3U.js";import"./Wallet-CE0ArgtB.js";import"./OmBarnetSteg-CBa6IMmK.js";import"./TasklistStart-Dr_Mixwt.js";import"./OmPlanleggerenSteg-Cx1ifxHc.js";import"./OppsummeringSteg-zlbuGahZ.js";import"./ShareDataInfobox-DjTnGny3.js";import"./CalendarLabels-CJusZLir.js";import"./CalendarIconLabel-D9nPovPN.js";import"./FamiliehendelseLabel-Ss563LAQ.js";import"./PlanenDeresSteg-DBRtga_r.js";import"./OmÅTilpassePlanen-DPIsLsd8.js";import"./PersonPregnant-C1mrG_yn.js";import"./PencilWriting-D5z81-wt.js";import"./UforutsetteEndringer-Dm_Yl4Vw.js";import"./ToggleGroup-CBzyTQVE.js";import"./TilpassPlanenSteg-CxkF0Pxr.js";import"./HvaErMulig-Bn8eNZ-e.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
