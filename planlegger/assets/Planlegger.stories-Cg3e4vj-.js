import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DL92mt0H.js";import{M as S,P as u}from"./usePlanleggerNavigator-CyzEXgEG.js";import{h as r,a as m,H as o}from"./Planlegger-DPPDWalS.js";import{D as d}from"./satserUtils-CcfW6iur.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DlB3iX-D.js";import"./barnetUtils-TyIXeucG.js";import"./hvemHarRettUtils-BU8X5X-v.js";import"./ArbeidssituasjonSteg-CQgHKjVF.js";import"./BlueRadioGroup-DGoV0d0g.js";import"./customErrorFormatter-DhleKEZs.js";import"./PlanleggerStepPage-Di6lxPXu.js";import"./useScrollBehaviour-BOasiVVP.js";import"./Spacer-DFLaNG8r.js";import"./BarnehageplassSteg-BDtszXRS.js";import"./uttakUtils-DRni-hr7.js";import"./BabyWrapped-DVhB7A-6.js";import"./Information-ybk39QrA.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CTcgH2C_.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BAQhUNp_.js";import"./HvorLangPeriodeSteg-DJO4mNRA.js";import"./PersonGroup-CXjL6Yk3.js";import"./HvorMyeSteg-BI5s9gyo.js";import"./Wallet-6eqWhmAt.js";import"./OmBarnetSteg-BrIGEB6W.js";import"./TasklistStart-BqCAK7Ax.js";import"./OmPlanleggerenSteg-zgoEbkCq.js";import"./OppsummeringSteg-CjSR1131.js";import"./ShareDataInfobox-BbUbVLB6.js";import"./CalendarLabels-D_NRJS6N.js";import"./CalendarIconLabel-CQhxI1b7.js";import"./FamiliehendelseLabel-DpisJE9o.js";import"./PlanenDeresSteg-BFkn8p6v.js";import"./OmÅTilpassePlanen-CuTwn-oa.js";import"./PersonPregnant-DX0GS66o.js";import"./PencilWriting-CSghtx24.js";import"./UforutsetteEndringer-B4d26n8U.js";import"./ToggleGroup-BNsP807y.js";import"./TilpassPlanenSteg-toJBwzYe.js";import"./HvaErMulig-Doiu3670.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
