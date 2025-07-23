import{w as c,j as n,r as k,E as g,l as t}from"./iframe-C0zW3gbC.js";import{M as S,P as u}from"./usePlanleggerNavigator-DtuLJGnq.js";import{h as r,a as m,H as o}from"./Planlegger-C1QOpqxB.js";import{D as d}from"./satserUtils-BiTZogNE.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-sI2mxn03.js";import"./barnetUtils-B_cvbOpn.js";import"./hvemHarRettUtils-Dw5xgszl.js";import"./ArbeidssituasjonSteg-BbYQVDQX.js";import"./BlueRadioGroup-D4jORFow.js";import"./customErrorFormatter-DXd23HFI.js";import"./PlanleggerStepPage-6D9Suj-N.js";import"./useScrollBehaviour-C4b9TFXL.js";import"./Spacer-DJSlEuZZ.js";import"./BarnehageplassSteg-BcwPfY28.js";import"./uttakUtils-DP8MwtAS.js";import"./BabyWrapped-N_-gcT4v.js";import"./Information-CKIJ6rJY.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-cVKhmNxb.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D8wh6rfR.js";import"./HvorLangPeriodeSteg-ySkCmWCX.js";import"./PersonGroup-BYuvRAD2.js";import"./HvorMyeSteg-2nvBXQ6s.js";import"./Wallet-DyyVpPAG.js";import"./OmBarnetSteg-fkeeVYg2.js";import"./TasklistStart-Bh9UirQy.js";import"./OmPlanleggerenSteg-BvSz20CU.js";import"./OppsummeringSteg-dUTQyE7l.js";import"./ShareDataInfobox-BA-Jdo75.js";import"./CalendarLabels-CG_jIuBW.js";import"./CalendarIconLabel-Cscuv0Ja.js";import"./FamiliehendelseLabel-z7vZnIDB.js";import"./PlanenDeresSteg-DnLVuTsE.js";import"./OmÅTilpassePlanen-DAKlqViW.js";import"./PersonPregnant-C64TORgp.js";import"./PencilWriting-CH26HMOz.js";import"./UforutsetteEndringer-XJP0KP7s.js";import"./ToggleGroup-B-QDp-qT.js";import"./TilpassPlanenSteg-CGvzpApT.js";import"./HvaErMulig-1PzO4gH_.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
