import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DmOPZsJB.js";import{M as S,P as u}from"./usePlanleggerNavigator-CNcSPKHE.js";import{h as r,a as m,H as o}from"./Planlegger-D-eWu1A_.js";import{D as d}from"./satserUtils-ByH5qFbf.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Cy5yeNTx.js";import"./barnetUtils-CXG7PFm-.js";import"./hvemHarRettUtils-DTOrrMv0.js";import"./ArbeidssituasjonSteg-DGqbT6Wl.js";import"./BlueRadioGroup-BQXq_ilg.js";import"./customErrorFormatter-C302y6gW.js";import"./PlanleggerStepPage-VoV6dwww.js";import"./useScrollBehaviour-DhWODBWE.js";import"./Spacer-wcnbDWpR.js";import"./BarnehageplassSteg-DDzNxAdF.js";import"./uttakUtils-B8qRXv-g.js";import"./BabyWrapped-TFtpnZ-7.js";import"./Information-CCOluq1F.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DwI5eUeF.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D_O18Ckn.js";import"./HvorLangPeriodeSteg-GDkuiw91.js";import"./PersonGroup-19IVRdLl.js";import"./HvorMyeSteg-D-wunwwW.js";import"./Wallet-o6zoMNnt.js";import"./OmBarnetSteg-hZP8XzaD.js";import"./TasklistStart-ClQ4DlcP.js";import"./OmPlanleggerenSteg-BoTN1Nr5.js";import"./OppsummeringSteg-DLbf5l2P.js";import"./ShareDataInfobox-BAqelaoo.js";import"./CalendarLabels-BL85eafH.js";import"./CalendarIconLabel-Bu8UhRG2.js";import"./FamiliehendelseLabel-SEqQ7jwu.js";import"./PlanenDeresSteg-CyhoHG96.js";import"./OmÅTilpassePlanen-DTxgQ9Ay.js";import"./PersonPregnant-BZpXF6hU.js";import"./PencilWriting-D0cYGgmm.js";import"./UforutsetteEndringer-DfX3G1NQ.js";import"./ToggleGroup-BUzq_aTo.js";import"./TilpassPlanenSteg-CE8ZyANw.js";import"./HvaErMulig-DeGDuIQa.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
