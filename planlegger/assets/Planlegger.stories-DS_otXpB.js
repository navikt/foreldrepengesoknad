import{w as c,j as n,r as k,E as g,l as t}from"./iframe-CVGapQFe.js";import{M as S,P as u}from"./usePlanleggerNavigator-BBl2Hc2i.js";import{h as r,a as m,H as o}from"./Planlegger-DakDmIp6.js";import{D as d}from"./satserUtils-xS6rMomE.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-tll3nsv3.js";import"./barnetUtils-DdrmLVv5.js";import"./hvemHarRettUtils-CUnqlA0N.js";import"./ArbeidssituasjonSteg-CYK3a_tj.js";import"./BlueRadioGroup-WepMbVo8.js";import"./customErrorFormatter-Bv74-4z4.js";import"./PlanleggerStepPage-GvTKdQbG.js";import"./useScrollBehaviour-CE3NRc8o.js";import"./Spacer-UqLvEHq_.js";import"./BarnehageplassSteg-CakSQKfX.js";import"./uttakUtils-B1Ao0qDz.js";import"./BabyWrapped-BHRzgYq6.js";import"./Information-xDrPySfK.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BEzwC1-8.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-40tiesyp.js";import"./HvorLangPeriodeSteg-DxxRPJV2.js";import"./PersonGroup-cSXvlrTV.js";import"./HvorMyeSteg-D_NRDICc.js";import"./Wallet-BllEtpo3.js";import"./OmBarnetSteg-CVn3mI42.js";import"./TasklistStart-_syNTdhN.js";import"./OmPlanleggerenSteg-eZh7oteS.js";import"./OppsummeringSteg-vsw1tpVq.js";import"./ShareDataInfobox-FW2kqH4_.js";import"./CalendarLabels-D-2XlqKU.js";import"./CalendarIconLabel-Bv9aIyHK.js";import"./FamiliehendelseLabel-wVZkeYSr.js";import"./PlanenDeresSteg-BQRIdsKa.js";import"./OmÅTilpassePlanen-1DtETdZ8.js";import"./PersonPregnant-BL22Gi4h.js";import"./PencilWriting-CJKB02Eh.js";import"./UforutsetteEndringer-B4hEG_69.js";import"./ToggleGroup-CGyZMoSs.js";import"./TilpassPlanenSteg-B3LNrQnZ.js";import"./HvaErMulig-KNOoMQUX.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
