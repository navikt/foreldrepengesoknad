import{w as c,j as n,r as k,E as g,l as t}from"./iframe-B30j76VL.js";import{M as S,P as u}from"./usePlanleggerNavigator-CvOKJYO1.js";import{h as r,a as m,H as o}from"./Planlegger-CG1PJk_W.js";import{D as d}from"./satserUtils-DcGswDWt.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-B8CmOefN.js";import"./barnetUtils-BDTMNgnQ.js";import"./hvemHarRettUtils-vnZrw2lD.js";import"./ArbeidssituasjonSteg-D4dbUkME.js";import"./BlueRadioGroup-BRkE7dBh.js";import"./customErrorFormatter-CECnzqtc.js";import"./PlanleggerStepPage-Be6zfdA-.js";import"./useScrollBehaviour-BPuqBkbK.js";import"./Spacer-DbhhWmPY.js";import"./BarnehageplassSteg-hF6mKIQD.js";import"./uttakUtils-BduN21U3.js";import"./BabyWrapped-CMvt80FT.js";import"./Information-CW1U-iOy.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DdmqAUKz.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-W5Fg_R3t.js";import"./HvorLangPeriodeSteg-eBcD635R.js";import"./PersonGroup-D3PStuEn.js";import"./HvorMyeSteg-BxfHoI0-.js";import"./Wallet-BcCD4Ah7.js";import"./OmBarnetSteg-mpWH7AKk.js";import"./TasklistStart-B84R4Ti5.js";import"./OmPlanleggerenSteg-BAt9gx8D.js";import"./OppsummeringSteg-C6rx2kEJ.js";import"./ShareDataInfobox-Co77LWFN.js";import"./CalendarLabels-pyQoHZUW.js";import"./CalendarIconLabel-CThgufh6.js";import"./FamiliehendelseLabel-DiFDj4as.js";import"./PlanenDeresSteg-1yGzVpIa.js";import"./OmÅTilpassePlanen-BOS52GkO.js";import"./PersonPregnant-DHY4qh5M.js";import"./PencilWriting-CyRKBrlW.js";import"./UforutsetteEndringer-BxHEeS6a.js";import"./ToggleGroup-DDe1iwo8.js";import"./TilpassPlanenSteg-D5FDQKp3.js";import"./HvaErMulig-BS1gLQVY.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
