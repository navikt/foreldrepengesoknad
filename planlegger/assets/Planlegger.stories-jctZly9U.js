import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BXF9VHrd.js";import{M as S,P as u}from"./usePlanleggerNavigator-CsBLmO_f.js";import{h as r,a as m,H as o}from"./Planlegger-DiTsrRIe.js";import{D as d}from"./satserUtils-CGOdFKJ2.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DQbJoT8N.js";import"./barnetUtils-B25k8gn6.js";import"./hvemHarRettUtils-BFwYiMrh.js";import"./ArbeidssituasjonSteg-DwoGnIy6.js";import"./BlueRadioGroup-kwO895kY.js";import"./customErrorFormatter-CL8IlsiX.js";import"./PlanleggerStepPage-D54KN5jF.js";import"./useScrollBehaviour-B1Lx9Lrv.js";import"./Spacer-CqQ-v-EX.js";import"./BarnehageplassSteg-Be151CP9.js";import"./uttakUtils-C3SzwavK.js";import"./BabyWrapped-DF8rebp_.js";import"./Information-qHp-sjDS.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-B7JYsvmI.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BvfpnOKz.js";import"./HvorLangPeriodeSteg-CXUymbvY.js";import"./PersonGroup-HAXKyRk3.js";import"./HvorMyeSteg-BqIiw-Un.js";import"./Wallet-D0cOR6rE.js";import"./OmBarnetSteg-B3_5JeP0.js";import"./TasklistStart-UhN9MrNO.js";import"./OmPlanleggerenSteg-CwMszfrM.js";import"./OppsummeringSteg-BSIKmsch.js";import"./ShareDataInfobox-Cm8DzJZM.js";import"./CalendarLabels-C415htn1.js";import"./CalendarIconLabel-DGBUIzsj.js";import"./FamiliehendelseLabel-BTCPSe8O.js";import"./PlanenDeresSteg-D4NgL0Rn.js";import"./OmÅTilpassePlanen-DWOvDCt5.js";import"./PersonPregnant-DL-e-rQn.js";import"./PencilWriting-BgG6q9Pq.js";import"./UforutsetteEndringer-CoRUa7sg.js";import"./ToggleGroup-U0HkP8Zm.js";import"./TilpassPlanenSteg-w-YuGMqh.js";import"./HvaErMulig-DBMsL14e.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
