import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DkTHROqV.js";import{M as S,P as u}from"./usePlanleggerNavigator-5f31aYPD.js";import{h as r,a as m,H as o}from"./Planlegger-ncHNQC6C.js";import{D as d}from"./satserUtils-F0X8cQKj.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CCRP9L8U.js";import"./barnetUtils-CqQDLkg1.js";import"./hvemHarRettUtils-BpTwWWHk.js";import"./ArbeidssituasjonSteg-zSEQp0OD.js";import"./BlueRadioGroup-DepNymGN.js";import"./customErrorFormatter-Cp3Q35zU.js";import"./PlanleggerStepPage-IfahVWO9.js";import"./useScrollBehaviour-DOQpi1r2.js";import"./Spacer-Df7fEANz.js";import"./BarnehageplassSteg-B0diCRKY.js";import"./uttakUtils-CKfUQdoA.js";import"./BabyWrapped-Cet644h6.js";import"./Information-BGt0WSsa.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-Dsby-J79.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DJETg-Pe.js";import"./HvorLangPeriodeSteg-BDPCU5zH.js";import"./PersonGroup-CJiFn_6D.js";import"./HvorMyeSteg-I6x-Dlqn.js";import"./Wallet-CkMMORm7.js";import"./OmBarnetSteg-57frSqTF.js";import"./TasklistStart-CjGY07jp.js";import"./OmPlanleggerenSteg-Dfe5k8JU.js";import"./OppsummeringSteg-Cewqq454.js";import"./ShareDataInfobox-R5O8YhQw.js";import"./CalendarLabels-CWfOiWSD.js";import"./CalendarIconLabel-C9Y-wByw.js";import"./FamiliehendelseLabel-ciCKfwju.js";import"./PlanenDeresSteg-DXkzDytX.js";import"./OmÅTilpassePlanen-CYr5vVFI.js";import"./PersonPregnant-Bq8KiA9q.js";import"./PencilWriting-B9Le1q6B.js";import"./UforutsetteEndringer-Cr3wdseZ.js";import"./ToggleGroup-CJr82zH8.js";import"./TilpassPlanenSteg-C3Empk6Y.js";import"./HvaErMulig-BnZVHZ0S.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
