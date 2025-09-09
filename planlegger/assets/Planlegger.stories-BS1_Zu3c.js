import{w as c,j as n,r as k,E as g,l as t}from"./iframe-qlLyz47e.js";import{M as S,P as u}from"./usePlanleggerNavigator-CL2qjhXF.js";import{h as r,a as m,H as o}from"./Planlegger-BSIvMV7q.js";import{D as d}from"./satserUtils-ARavgYXX.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-bS7ol6_i.js";import"./barnetUtils-BI4Rud8J.js";import"./hvemHarRettUtils-Ho3gJQFv.js";import"./ArbeidssituasjonSteg-CwpxzRCf.js";import"./BlueRadioGroup-CX6fC3bh.js";import"./customErrorFormatter-CYgrU2bJ.js";import"./PlanleggerStepPage-OB7l9i9E.js";import"./useScrollBehaviour-C2pHivVr.js";import"./Spacer-DiMQOD6l.js";import"./BarnehageplassSteg-CEpfrGWR.js";import"./uttakUtils-BQR95S8z.js";import"./BabyWrapped-DN_xQpFK.js";import"./Information-Da-bjfYM.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BHTcdIJk.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-B0i1tc2u.js";import"./HvorLangPeriodeSteg-Bg_vMGX-.js";import"./PersonGroup-CiNzCx3j.js";import"./HvorMyeSteg-XVvS7hX5.js";import"./Wallet-BfFm88nB.js";import"./OmBarnetSteg-DGC58cC9.js";import"./TasklistStart-DRo4eQuR.js";import"./OmPlanleggerenSteg-DjP2MYOw.js";import"./OppsummeringSteg-5x6GTNll.js";import"./ShareDataInfobox-CStw4a5D.js";import"./CalendarLabels-CWinH-ld.js";import"./CalendarIconLabel-B6xlPTW1.js";import"./FamiliehendelseLabel-Bs4bT45T.js";import"./PlanenDeresSteg-BZka6Cc3.js";import"./OmÅTilpassePlanen-BLm1QhkH.js";import"./PersonPregnant-pRwVTbwm.js";import"./PencilWriting-Cbw4nY2C.js";import"./UforutsetteEndringer-DYmxHPJ8.js";import"./ToggleGroup-R0tnxlzV.js";import"./TilpassPlanenSteg-DMwnQvCL.js";import"./HvaErMulig-xc7Mmcq0.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
