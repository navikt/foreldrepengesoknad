import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BlK1y9Vc.js";import{M as S,P as u}from"./usePlanleggerNavigator-Ca1EV7NE.js";import{h as r,a as m,H as o}from"./Planlegger-BV_JVQC0.js";import{D as d}from"./satserUtils-0bxO6JF7.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BH07isoM.js";import"./barnetUtils-a39WunUG.js";import"./hvemHarRettUtils-B1ep-xjP.js";import"./ArbeidssituasjonSteg-BTTEAiue.js";import"./BlueRadioGroup-Gqjq4Ok8.js";import"./customErrorFormatter-GiI371Fk.js";import"./PlanleggerStepPage-B4R00Xah.js";import"./useScrollBehaviour-CVBnku1o.js";import"./Spacer-CsOT35la.js";import"./BarnehageplassSteg-Dvt56xfV.js";import"./uttakUtils-CUDouJzg.js";import"./BabyWrapped-C_9M-8wU.js";import"./Information-BZOTEPvN.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-X0QVdajT.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DaGO0wOH.js";import"./HvorLangPeriodeSteg-BvhLXCW3.js";import"./PersonGroup-DYqk2avp.js";import"./HvorMyeSteg-aiSNfPJb.js";import"./Wallet-D9-tnZAR.js";import"./OmBarnetSteg-CAY7fCwC.js";import"./TasklistStart-JMPhMTDo.js";import"./OmPlanleggerenSteg-CFJELkPa.js";import"./OppsummeringSteg-C_l7NQoJ.js";import"./ShareDataInfobox-XY8fucXe.js";import"./CalendarLabels-9JCjbItt.js";import"./CalendarIconLabel-Bx_ZOrys.js";import"./FamiliehendelseLabel-Ci4a9xgR.js";import"./PlanenDeresSteg-BvSMLG4-.js";import"./OmÅTilpassePlanen-BEGDj0IP.js";import"./PersonPregnant-DJ9Dm4MH.js";import"./PencilWriting-BeC0hxk7.js";import"./UforutsetteEndringer-BcFldPUY.js";import"./ToggleGroup-Z8c7R9AI.js";import"./TilpassPlanenSteg-B5KPrsEi.js";import"./HvaErMulig-DBpZrNnL.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
