import{w as c,j as n,r as k,E as g,l as t}from"./iframe-Bb-S5uT4.js";import{M as S,P as u}from"./usePlanleggerNavigator-CgRCN3BR.js";import{h as r,a as m,H as o}from"./Planlegger-Clvlw7Je.js";import{D as d}from"./satserUtils-XLK1zY2p.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Cc9unDnD.js";import"./barnetUtils-B3Enz0EE.js";import"./hvemHarRettUtils-CC-AoAXt.js";import"./ArbeidssituasjonSteg-BK25A8HV.js";import"./BlueRadioGroup-DIXNytts.js";import"./customErrorFormatter-BKaTyzL1.js";import"./PlanleggerStepPage-HIHmxwq9.js";import"./useScrollBehaviour-CoEvu9rD.js";import"./Spacer-GTWwepVn.js";import"./BarnehageplassSteg-CVVi_r_J.js";import"./uttakUtils-BCoyaOHZ.js";import"./BabyWrapped-BABTeEmd.js";import"./Information-DCd26yxZ.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-PtnNE1CX.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg--cNh_zMM.js";import"./HvorLangPeriodeSteg-CZox5-66.js";import"./PersonGroup-C81TJ9ch.js";import"./HvorMyeSteg-pin9KNGd.js";import"./Wallet-Dk0lY0I5.js";import"./OmBarnetSteg-fjyBIREV.js";import"./TasklistStart-BLnDRXBt.js";import"./OmPlanleggerenSteg-DwxFWLin.js";import"./OppsummeringSteg-DwZ7TH87.js";import"./ShareDataInfobox-4A8J6umI.js";import"./CalendarLabels-BMsuwYSn.js";import"./CalendarIconLabel-BkKbVuAx.js";import"./FamiliehendelseLabel-BvHhg7aI.js";import"./PlanenDeresSteg-D1v0k1tE.js";import"./OmÅTilpassePlanen-ZkYnDoU4.js";import"./PersonPregnant-Z1atUb9F.js";import"./PencilWriting-CzkgookH.js";import"./UforutsetteEndringer-PBC-wrSv.js";import"./ToggleGroup-CPZbBE0M.js";import"./TilpassPlanenSteg-3V8p0ZY_.js";import"./HvaErMulig-QgLNR0wD.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
