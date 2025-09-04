import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DtlMMI4M.js";import{M as S,P as u}from"./usePlanleggerNavigator-Df2I-nQn.js";import{h as r,a as m,H as o}from"./Planlegger-D8Ktbthm.js";import{D as d}from"./satserUtils-Cf_C0MJt.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BpOyiRq9.js";import"./barnetUtils-UJ991_ef.js";import"./hvemHarRettUtils-BvH9CDXP.js";import"./ArbeidssituasjonSteg-Ci_M8D4-.js";import"./BlueRadioGroup-CuMEdWWx.js";import"./customErrorFormatter-BqmoN_l3.js";import"./PlanleggerStepPage-BB99b_dz.js";import"./useScrollBehaviour-BmstEB9T.js";import"./Spacer-C2SqGK3w.js";import"./BarnehageplassSteg-DAtoMj1G.js";import"./uttakUtils-CiFKdbCe.js";import"./BabyWrapped-BN4stzkP.js";import"./Information-D5sgZsqk.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DWU_jX87.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D6P-qWMM.js";import"./HvorLangPeriodeSteg-C7SwNFi6.js";import"./PersonGroup-BioD8YFi.js";import"./HvorMyeSteg-4U9FuhPk.js";import"./Wallet-Cvzk8iSY.js";import"./OmBarnetSteg-BCXYwUXU.js";import"./TasklistStart-DfbDd4P3.js";import"./OmPlanleggerenSteg-DjiDSzj7.js";import"./OppsummeringSteg-CrAKkRlq.js";import"./ShareDataInfobox-CmmvJ1DZ.js";import"./CalendarLabels-CEYbt6Ta.js";import"./CalendarIconLabel-1vVV_1Lw.js";import"./FamiliehendelseLabel-fYzx3b7Z.js";import"./PlanenDeresSteg-DFMjIhrl.js";import"./OmÅTilpassePlanen-CJ0iQi2h.js";import"./PersonPregnant-Dcp2OOZ4.js";import"./PencilWriting-De7x64-0.js";import"./UforutsetteEndringer-BrEWdpf6.js";import"./ToggleGroup-B9fccaWd.js";import"./TilpassPlanenSteg-DU8V3hQ_.js";import"./HvaErMulig-C7lHjhtu.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
