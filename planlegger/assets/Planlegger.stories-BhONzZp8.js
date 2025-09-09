import{w as c,j as n,r as k,E as g,l as t}from"./iframe-Dpp55iil.js";import{M as S,P as u}from"./usePlanleggerNavigator-7hRQrnGQ.js";import{h as r,a as m,H as o}from"./Planlegger-x_xu1hdW.js";import{D as d}from"./satserUtils-BZIlvhUO.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DnD4TB4U.js";import"./barnetUtils-B6jZ9ii2.js";import"./hvemHarRettUtils-GlUnSRFs.js";import"./ArbeidssituasjonSteg-BSuA9YqU.js";import"./BlueRadioGroup-BgN7leHl.js";import"./customErrorFormatter-wG2WcKaU.js";import"./PlanleggerStepPage-Dy24wbJ2.js";import"./useScrollBehaviour-DNJGWmMq.js";import"./Spacer-61NI-6Lm.js";import"./BarnehageplassSteg-LRTmnmUp.js";import"./uttakUtils-DPSi3iar.js";import"./BabyWrapped-CE8auwHb.js";import"./Information-DhxVUXNJ.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-zppwtPC3.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DfU_eEwL.js";import"./HvorLangPeriodeSteg-C8ETWbfw.js";import"./PersonGroup-BKFwfUct.js";import"./HvorMyeSteg-B3PkE4Lp.js";import"./Wallet-w0O4bYfT.js";import"./OmBarnetSteg-DlmQVM3e.js";import"./TasklistStart-DyunpzbM.js";import"./OmPlanleggerenSteg-CwvuE9I_.js";import"./OppsummeringSteg-CaxFlX2m.js";import"./ShareDataInfobox-DKI4cHKt.js";import"./CalendarLabels-CPasQSle.js";import"./CalendarIconLabel-Cfzk1Qjh.js";import"./FamiliehendelseLabel-DRwbj0xU.js";import"./PlanenDeresSteg-1NrV2t_0.js";import"./OmÅTilpassePlanen-c5dnufyP.js";import"./PersonPregnant-DAUrD13e.js";import"./PencilWriting-WkbjJUeB.js";import"./UforutsetteEndringer-Ew9HYsUa.js";import"./ToggleGroup-CaQJ_fGT.js";import"./TilpassPlanenSteg-CvnJzd3j.js";import"./HvaErMulig-x297TlLz.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
