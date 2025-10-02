import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CBSp2d5D.js";import{M as S,P as u}from"./usePlanleggerNavigator-B9T5u7Sq.js";import{h as r,a as m,H as o}from"./Planlegger-H6Hyqydm.js";import{D as d}from"./satserUtils-ATsGvZNe.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-B3io6HQm.js";import"./barnetUtils-DezGDX7O.js";import"./hvemHarRettUtils-pkGj1Y-Z.js";import"./ArbeidssituasjonSteg-CkqD1mh2.js";import"./BlueRadioGroup-BDPLGS5Z.js";import"./customErrorFormatter-cfS5n4VG.js";import"./PlanleggerStepPage-6rRELH1X.js";import"./useScrollBehaviour-CmAylGMy.js";import"./Spacer-Dvj6Y9oB.js";import"./BarnehageplassSteg-KdHPilRM.js";import"./uttakUtils-kEqqNPVq.js";import"./BabyWrapped-bfx09z9t.js";import"./Information-8SQNV3XJ.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-De2i4uL6.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-X_7S2wGw.js";import"./HvorLangPeriodeSteg-C5mpKRw5.js";import"./PersonGroup-9jvCfF6a.js";import"./HvorMyeSteg-DGdK-u_d.js";import"./Wallet-C-jwidrm.js";import"./OmBarnetSteg-CQ5BZCAo.js";import"./TasklistStart-BAamu92I.js";import"./OmPlanleggerenSteg-BK6ECI4y.js";import"./OppsummeringSteg-B2Ex5oDy.js";import"./ShareDataInfobox-CvIQECaC.js";import"./CalendarLabels-C6BkB8gs.js";import"./CalendarIconLabel-CO1NP-J1.js";import"./FamiliehendelseLabel-JeaAiiAN.js";import"./PlanenDeresSteg-B3TJV31O.js";import"./OmÅTilpassePlanen-DzyvkqGf.js";import"./PersonPregnant-DneL6RVq.js";import"./PencilWriting-BV-cJJuN.js";import"./UforutsetteEndringer-W7DRG7T-.js";import"./ToggleGroup-DzO7H5Ew.js";import"./TilpassPlanenSteg-j9N8XB0q.js";import"./HvaErMulig-D3OGV41Y.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
