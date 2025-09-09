import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DXWlG1wZ.js";import{M as S,P as u}from"./usePlanleggerNavigator-CgpHTw5j.js";import{h as r,a as m,H as o}from"./Planlegger-CiSr0Ud-.js";import{D as d}from"./satserUtils-DyBc0OfN.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-C5NuzGxi.js";import"./barnetUtils-3oew4E7l.js";import"./hvemHarRettUtils-Cr6TJP8o.js";import"./ArbeidssituasjonSteg-CxrkWv5q.js";import"./BlueRadioGroup-D6DHzzwj.js";import"./customErrorFormatter-KDdjOtm-.js";import"./PlanleggerStepPage-Br1qO49-.js";import"./useScrollBehaviour-CFdHoycy.js";import"./Spacer-DOugkOLU.js";import"./BarnehageplassSteg-CoJAMo3q.js";import"./uttakUtils-DUqHDWDq.js";import"./BabyWrapped-DwRDlYMS.js";import"./Information-D043TA08.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DJ5nOGmr.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-dFcspNDe.js";import"./HvorLangPeriodeSteg-BR-VHew8.js";import"./PersonGroup-DAKK9L8C.js";import"./HvorMyeSteg-CsVijjrU.js";import"./Wallet-BGrtouRM.js";import"./OmBarnetSteg-Ciqc8Q0n.js";import"./TasklistStart-BmA7vFGV.js";import"./OmPlanleggerenSteg-DQII0xnN.js";import"./OppsummeringSteg-BQR7uyED.js";import"./ShareDataInfobox-CLZgqwyY.js";import"./CalendarLabels-oQthmUBA.js";import"./CalendarIconLabel-BNmk13lo.js";import"./FamiliehendelseLabel-DK_tHPt-.js";import"./PlanenDeresSteg-DBoTYz0u.js";import"./OmÅTilpassePlanen-7ppSTjIL.js";import"./PersonPregnant-CffdedhO.js";import"./PencilWriting-Bq6UkMms.js";import"./UforutsetteEndringer-DFFWAU5N.js";import"./ToggleGroup-07XHXvGh.js";import"./TilpassPlanenSteg-B_h9SV0E.js";import"./HvaErMulig-CGoQbdTi.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
