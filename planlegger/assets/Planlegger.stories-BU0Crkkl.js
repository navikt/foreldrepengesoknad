import{w as c,j as n,r as k,E as g,l as t}from"./iframe-B_GR6qPJ.js";import{M as S,P as u}from"./usePlanleggerNavigator-BXVnWe8e.js";import{h as r,a as m,H as o}from"./Planlegger-D-KU_kFI.js";import{D as d}from"./satserUtils-BcKARKDS.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-j5yRz-EO.js";import"./barnetUtils-BRTUeh5i.js";import"./hvemHarRettUtils-BsIMmBMM.js";import"./ArbeidssituasjonSteg-BYSDDrNv.js";import"./BlueRadioGroup-D7xtaLFd.js";import"./customErrorFormatter-CPeU_2Qo.js";import"./PlanleggerStepPage-Dr_SV5VW.js";import"./useScrollBehaviour-DFcqq6Oj.js";import"./Spacer-i3WuuTAW.js";import"./BarnehageplassSteg-BUq5slro.js";import"./uttakUtils-DNrhlWik.js";import"./BabyWrapped-CfJVobmQ.js";import"./Information-X6GlkQck.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BeM2yj8Z.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DbdTkhlV.js";import"./HvorLangPeriodeSteg-Du97Ef_Q.js";import"./PersonGroup-Dzv5jXte.js";import"./HvorMyeSteg-ybqaJhu7.js";import"./Wallet-iEK0YR5h.js";import"./OmBarnetSteg-BxmPWF82.js";import"./TasklistStart-BWaTAOHd.js";import"./OmPlanleggerenSteg-DM2pe9d9.js";import"./OppsummeringSteg-Dk5TANdH.js";import"./ShareDataInfobox-Zyk0VG3C.js";import"./CalendarLabels-DB3b5xoI.js";import"./CalendarIconLabel-Ch2iji5K.js";import"./FamiliehendelseLabel-B4aEFxpM.js";import"./PlanenDeresSteg-CRFpEXYJ.js";import"./OmÅTilpassePlanen-CLUne40t.js";import"./PersonPregnant-DjzAfCHt.js";import"./PencilWriting-D56A2gkc.js";import"./UforutsetteEndringer-CHZ1ymQw.js";import"./ToggleGroup-DCYyDsXz.js";import"./TilpassPlanenSteg-CLAeInYp.js";import"./HvaErMulig-CV3E55TT.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
