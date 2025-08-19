import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BosW6K5Z.js";import{M as S,P as u}from"./usePlanleggerNavigator-DUrK2eUs.js";import{h as r,a as m,H as o}from"./Planlegger-BKe2pdt_.js";import{D as d}from"./satserUtils-CF_nSNed.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-r8niiArc.js";import"./barnetUtils-Dk0hcQKI.js";import"./hvemHarRettUtils-B93lXCXL.js";import"./ArbeidssituasjonSteg-CVJiomVR.js";import"./BlueRadioGroup-DISeb6tq.js";import"./customErrorFormatter-DzglKYxZ.js";import"./PlanleggerStepPage-Bo20lr_j.js";import"./useScrollBehaviour-KXdNK_Db.js";import"./Spacer-DSNeARcn.js";import"./BarnehageplassSteg-DIkwsFlr.js";import"./uttakUtils-xh-ZU4Ld.js";import"./BabyWrapped-CeK2dw16.js";import"./Information-D_O6BJe_.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DY3ejaaQ.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D8Wspo8D.js";import"./HvorLangPeriodeSteg-BXiCvldy.js";import"./PersonGroup-C-Hmui5J.js";import"./HvorMyeSteg-DgkLhPMO.js";import"./Wallet-B2uTKq04.js";import"./OmBarnetSteg-uHaiwx90.js";import"./TasklistStart-BTlTFLSK.js";import"./OmPlanleggerenSteg-BTbfyF1Y.js";import"./OppsummeringSteg-CcpBLmN3.js";import"./ShareDataInfobox-DCe2XNL3.js";import"./CalendarLabels-Cbh1HdY5.js";import"./CalendarIconLabel-Cw_swmdS.js";import"./FamiliehendelseLabel-DFaJNalF.js";import"./PlanenDeresSteg-BQcXpOoc.js";import"./OmÅTilpassePlanen-Ck-WFVPI.js";import"./PersonPregnant-D9OIcdLr.js";import"./PencilWriting-B2hGW6su.js";import"./UforutsetteEndringer-DbYe3h_z.js";import"./ToggleGroup-DkPThGUO.js";import"./TilpassPlanenSteg-DFlQeDfn.js";import"./HvaErMulig-Ae28ek1H.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
