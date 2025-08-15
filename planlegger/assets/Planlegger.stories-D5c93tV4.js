import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DgOJv59J.js";import{M as S,P as u}from"./usePlanleggerNavigator-Cyt7D8Sq.js";import{h as r,a as m,H as o}from"./Planlegger-BN-IG4b8.js";import{D as d}from"./satserUtils-BQd3P4ik.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DH4lpjzv.js";import"./barnetUtils-CDtTXb69.js";import"./hvemHarRettUtils-CpUjoCfJ.js";import"./ArbeidssituasjonSteg-CAs6LkXC.js";import"./BlueRadioGroup-Do1AK1tP.js";import"./customErrorFormatter-Cza47OJB.js";import"./PlanleggerStepPage-B2LEjRwR.js";import"./useScrollBehaviour-uDpg5_LB.js";import"./Spacer-B5tJwySy.js";import"./BarnehageplassSteg-JSUGYtSV.js";import"./uttakUtils-DwM9VdOA.js";import"./BabyWrapped-DGsoFhKH.js";import"./Information-CQdf_vkW.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-B0QJdQka.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BvjPJFTU.js";import"./HvorLangPeriodeSteg-DfyNN9t6.js";import"./PersonGroup-BsuUbjWU.js";import"./HvorMyeSteg-aTutG2jd.js";import"./Wallet-BGbQrVBU.js";import"./OmBarnetSteg-LcwRcMOD.js";import"./TasklistStart-DWifa2ZE.js";import"./OmPlanleggerenSteg-T8KgNXwI.js";import"./OppsummeringSteg-ZEtQRiPr.js";import"./ShareDataInfobox-D2hIpHBk.js";import"./CalendarLabels-weCEpBeI.js";import"./CalendarIconLabel-a02XQPge.js";import"./FamiliehendelseLabel-Bk13xXFQ.js";import"./PlanenDeresSteg-rXSjt6CD.js";import"./OmÅTilpassePlanen-FMxroPn-.js";import"./PersonPregnant-Be6rBqkn.js";import"./PencilWriting-C-b3gKPx.js";import"./UforutsetteEndringer-67FivJx3.js";import"./ToggleGroup-DGeO9rpx.js";import"./TilpassPlanenSteg-BSODHXUP.js";import"./HvaErMulig-Cagruxv1.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
