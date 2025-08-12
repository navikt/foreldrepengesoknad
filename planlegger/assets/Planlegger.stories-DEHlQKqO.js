import{w as c,j as n,r as k,E as g,l as t}from"./iframe-D2c3Nw0A.js";import{M as S,P as u}from"./usePlanleggerNavigator-DQxUUH20.js";import{h as r,a as m,H as o}from"./Planlegger-D4KU0zxC.js";import{D as d}from"./satserUtils-QPVjacxi.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-D9U4hfzQ.js";import"./barnetUtils-D5M6B_Jj.js";import"./hvemHarRettUtils-CtPNwLJZ.js";import"./ArbeidssituasjonSteg-BPb_92og.js";import"./BlueRadioGroup-DNc3H7ue.js";import"./customErrorFormatter-DJK05_o6.js";import"./PlanleggerStepPage-CwvSannI.js";import"./useScrollBehaviour-BSQm-pg4.js";import"./Spacer-Dcyx7hV7.js";import"./BarnehageplassSteg-TJFdtg9S.js";import"./uttakUtils-C5g5JAZ5.js";import"./BabyWrapped-CYBgInRR.js";import"./Information-Zf_DlJcH.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-C8rrFfYr.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D1AI5LTX.js";import"./HvorLangPeriodeSteg-CSoTA9Pg.js";import"./PersonGroup-CJkQGQRC.js";import"./HvorMyeSteg-B_m8ZrAt.js";import"./Wallet-8d9Ge0aM.js";import"./OmBarnetSteg-ES6IEJ2d.js";import"./TasklistStart-B_GHgrtq.js";import"./OmPlanleggerenSteg-SLkB2QSO.js";import"./OppsummeringSteg-Cmfpx1bg.js";import"./ShareDataInfobox-hE5_hGTd.js";import"./CalendarLabels-DJTKp06m.js";import"./CalendarIconLabel-DthdDwaC.js";import"./FamiliehendelseLabel-BCVQ5Dm2.js";import"./PlanenDeresSteg-D8OHKJxV.js";import"./OmÅTilpassePlanen-BA2BYhr1.js";import"./PersonPregnant-DDidv9Kt.js";import"./PencilWriting-Cd0b21kB.js";import"./UforutsetteEndringer-B0KV9NXe.js";import"./ToggleGroup-Dcuj030B.js";import"./TilpassPlanenSteg-DOe4MW9e.js";import"./HvaErMulig-DxQtAERE.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
