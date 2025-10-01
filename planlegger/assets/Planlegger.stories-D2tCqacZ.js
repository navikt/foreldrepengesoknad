import{w as c,j as n,r as k,E as g,l as t}from"./iframe-lVwyS3Qx.js";import{M as S,P as u}from"./usePlanleggerNavigator-CjY_a4A1.js";import{h as r,a as m,H as o}from"./Planlegger-vM3rssd7.js";import{D as d}from"./satserUtils-DiwKjUB2.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DmRXPRql.js";import"./barnetUtils-fEB1cv7e.js";import"./hvemHarRettUtils-DNkiKGiZ.js";import"./ArbeidssituasjonSteg-Dtf0pH1f.js";import"./BlueRadioGroup-Dh-P6Gsb.js";import"./customErrorFormatter-8IH2X8X7.js";import"./PlanleggerStepPage-0kquicl9.js";import"./useScrollBehaviour-DsMkK5LC.js";import"./Spacer-UtOl3dtS.js";import"./BarnehageplassSteg-fVVqECtp.js";import"./uttakUtils-AuLh9lHc.js";import"./BabyWrapped-B_9wIqjq.js";import"./Information-B-cdywU3.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CvNctuE5.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Cs4UDrZR.js";import"./HvorLangPeriodeSteg-GqSN1lTt.js";import"./PersonGroup-yWtezmRC.js";import"./HvorMyeSteg-72lFGEtp.js";import"./Wallet-DsrQiVvh.js";import"./OmBarnetSteg-C4_1JvZB.js";import"./TasklistStart-B6LW49Ti.js";import"./OmPlanleggerenSteg-DrIUyBdD.js";import"./OppsummeringSteg-D5nVJM3X.js";import"./ShareDataInfobox-CIWsUhT8.js";import"./CalendarLabels-D8Rfr7FS.js";import"./CalendarIconLabel-D6oG-kpc.js";import"./FamiliehendelseLabel-D_jKXhsi.js";import"./PlanenDeresSteg-BiERUPyF.js";import"./OmÅTilpassePlanen-D-mHeY4w.js";import"./PersonPregnant-B-AirGd6.js";import"./PencilWriting-DSmJ4lEo.js";import"./UforutsetteEndringer-CT8rbH3J.js";import"./ToggleGroup-DWTSZUQg.js";import"./TilpassPlanenSteg-COiT3OGk.js";import"./HvaErMulig-D_7MQv6t.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
