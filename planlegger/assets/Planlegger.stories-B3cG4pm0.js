import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CQbnbxh1.js";import{M as S,P as u}from"./usePlanleggerNavigator-Dkub5ZVu.js";import{h as r,a as m,H as o}from"./Planlegger-CWgN9Wr-.js";import{D as d}from"./satserUtils-C7moq4Qg.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BqRonL6F.js";import"./barnetUtils-BGDZiBcx.js";import"./hvemHarRettUtils-2kgwFfAz.js";import"./ArbeidssituasjonSteg-Bm3_4omK.js";import"./BlueRadioGroup-Bxf35wGN.js";import"./customErrorFormatter-LmbcSRAF.js";import"./PlanleggerStepPage-BxQgt02M.js";import"./useScrollBehaviour-BJB2EIxn.js";import"./Spacer-C-bLU1Y6.js";import"./BarnehageplassSteg-BMfA0SA3.js";import"./uttakUtils-jNoxsXCl.js";import"./BabyWrapped-DjN_UP81.js";import"./Information-D90Y0_tE.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-Dd7BQTjU.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CcRgGWxY.js";import"./HvorLangPeriodeSteg-D7ze5zvC.js";import"./PersonGroup-DkrEEcdZ.js";import"./HvorMyeSteg-zFHH4e3q.js";import"./Wallet-CPjs0cBc.js";import"./OmBarnetSteg-CeAMjufr.js";import"./TasklistStart-BpdxQBZ6.js";import"./OmPlanleggerenSteg-PxFcOdT-.js";import"./OppsummeringSteg-DcMziMvm.js";import"./ShareDataInfobox-CIJl_ZMv.js";import"./CalendarLabels-N4MysdG5.js";import"./CalendarIconLabel-DQfxbjJU.js";import"./FamiliehendelseLabel-DGzL1-y9.js";import"./PlanenDeresSteg-DAz7CzQy.js";import"./OmÅTilpassePlanen-6TeY2oKc.js";import"./PersonPregnant-CFqjJWtz.js";import"./PencilWriting-U2Vt1jtD.js";import"./UforutsetteEndringer-cVeXkfkp.js";import"./ToggleGroup-DypqRBUM.js";import"./TilpassPlanenSteg-ir6B_yVf.js";import"./HvaErMulig-DGxe49-6.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
