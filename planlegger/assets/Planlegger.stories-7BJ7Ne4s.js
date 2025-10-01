import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DcYl-sjs.js";import{M as S,P as u}from"./usePlanleggerNavigator-DFUdUlk7.js";import{h as r,a as m,H as o}from"./Planlegger-C_Axl5Jy.js";import{D as d}from"./satserUtils-BnSKyS5N.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-C-LAdrL3.js";import"./barnetUtils-CUmYgySE.js";import"./hvemHarRettUtils-CnKAtsXK.js";import"./ArbeidssituasjonSteg-D24SuDuX.js";import"./BlueRadioGroup-6V1yTxvn.js";import"./customErrorFormatter-yhHqCgJK.js";import"./PlanleggerStepPage-DietmWCq.js";import"./useScrollBehaviour-BbWRgwAK.js";import"./Spacer-Co6YrsoG.js";import"./BarnehageplassSteg-CcI5gNTW.js";import"./uttakUtils--T2kdly8.js";import"./BabyWrapped-DBALgjKr.js";import"./Information-B5LWbJbx.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-D38MXTqP.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DtWc7N4a.js";import"./HvorLangPeriodeSteg-CzqM0fz-.js";import"./PersonGroup-DBiJLCXJ.js";import"./HvorMyeSteg-Do1Uyx4M.js";import"./Wallet-sXiwklrY.js";import"./OmBarnetSteg-DTvjQONJ.js";import"./TasklistStart-DCSozsui.js";import"./OmPlanleggerenSteg-O8z5CAIr.js";import"./OppsummeringSteg-Bliw8hEh.js";import"./ShareDataInfobox-DnfFXWc8.js";import"./CalendarLabels-Dul2DBGU.js";import"./CalendarIconLabel-s6sBcOD6.js";import"./FamiliehendelseLabel-PPnut5q_.js";import"./PlanenDeresSteg-C5Drl2va.js";import"./OmÅTilpassePlanen-D-H9yHjT.js";import"./PersonPregnant-DzS_AhJ2.js";import"./PencilWriting-C08b5tWm.js";import"./UforutsetteEndringer-BT1qPYo6.js";import"./ToggleGroup-DZ4_Deqc.js";import"./TilpassPlanenSteg-Cbl5Y6Mu.js";import"./HvaErMulig--LSaaQ3B.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
