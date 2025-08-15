import{w as c,j as n,r as k,E as g,l as t}from"./iframe-C2DrL3h-.js";import{M as S,P as u}from"./usePlanleggerNavigator-BQ5orzeq.js";import{h as r,a as m,H as o}from"./Planlegger-DZYF0DdW.js";import{D as d}from"./satserUtils-CoBaeWMp.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BLgDyaAc.js";import"./barnetUtils-C8FWrpjt.js";import"./hvemHarRettUtils-Cn2ZBnOy.js";import"./ArbeidssituasjonSteg-Ejw66cVh.js";import"./BlueRadioGroup-WzT3mgEF.js";import"./customErrorFormatter-Dwn-FM1i.js";import"./PlanleggerStepPage-DFZqp60K.js";import"./useScrollBehaviour-DnncyyC5.js";import"./Spacer-D6dK-OF0.js";import"./BarnehageplassSteg-pkLvKA3d.js";import"./uttakUtils-wrCRqCnZ.js";import"./BabyWrapped-CxDBUbbm.js";import"./Information-BPm3cWjB.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-5L1OG942.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-6I3vMNa1.js";import"./HvorLangPeriodeSteg-BhERoeGc.js";import"./PersonGroup-CZje9SFx.js";import"./HvorMyeSteg-B2L01epl.js";import"./Wallet-KeSRPZ95.js";import"./OmBarnetSteg-LmAJIFep.js";import"./TasklistStart-CmpOqvnn.js";import"./OmPlanleggerenSteg-BUWJRbtA.js";import"./OppsummeringSteg-ir_h6xqq.js";import"./ShareDataInfobox-CFKkNnJs.js";import"./CalendarLabels-CBSX7Pok.js";import"./CalendarIconLabel-Cn9ozGeS.js";import"./FamiliehendelseLabel-DFQZaJjB.js";import"./PlanenDeresSteg-DVoFJgjA.js";import"./OmÅTilpassePlanen-Bmq6e0wX.js";import"./PersonPregnant-Bo3MVT6q.js";import"./PencilWriting-CL5eeosQ.js";import"./UforutsetteEndringer-CyQUY1_k.js";import"./ToggleGroup-C-Ht6-0s.js";import"./TilpassPlanenSteg-BH5zbFOj.js";import"./HvaErMulig-Dq0g64HO.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
