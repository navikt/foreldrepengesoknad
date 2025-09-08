import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DwDbxGoC.js";import{M as S,P as u}from"./usePlanleggerNavigator-BS5B7EdM.js";import{h as r,a as m,H as o}from"./Planlegger-BtHNtdfO.js";import{D as d}from"./satserUtils-int4kEbS.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-C7nv2Vwo.js";import"./barnetUtils-D3KFvU5B.js";import"./hvemHarRettUtils-BPMogdnP.js";import"./ArbeidssituasjonSteg-BCKpjQ7e.js";import"./BlueRadioGroup-CJfCmfeh.js";import"./customErrorFormatter-DQjJpt-n.js";import"./PlanleggerStepPage-BfyB_Y5J.js";import"./useScrollBehaviour-cvJjQC0S.js";import"./Spacer-B7ZNjBbo.js";import"./BarnehageplassSteg-zerk8PrA.js";import"./uttakUtils-DcpyO0aO.js";import"./BabyWrapped-C0NzqHEl.js";import"./Information-DQYStLjj.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-C0m71mXM.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Dj-sfy02.js";import"./HvorLangPeriodeSteg-Dsa81sGN.js";import"./PersonGroup-Bu07FfyB.js";import"./HvorMyeSteg-CkJ3MknU.js";import"./Wallet-ChTGlhDW.js";import"./OmBarnetSteg-Dr_qNo2z.js";import"./TasklistStart-DyO8Rpe1.js";import"./OmPlanleggerenSteg-BXd8P7Ng.js";import"./OppsummeringSteg-ZwBZZf9Z.js";import"./ShareDataInfobox-CvEhpINI.js";import"./CalendarLabels-C-8Wb-sR.js";import"./CalendarIconLabel-DaOfyqGK.js";import"./FamiliehendelseLabel-Dg_PsfDT.js";import"./PlanenDeresSteg-BNb1x_35.js";import"./OmÅTilpassePlanen-4ZN7wJI_.js";import"./PersonPregnant-DNgFjoyl.js";import"./PencilWriting-BmHS9ivr.js";import"./UforutsetteEndringer-BfsABi6y.js";import"./ToggleGroup-D0TAPB8u.js";import"./TilpassPlanenSteg-DbAauBpZ.js";import"./HvaErMulig-BP6rw0Az.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
