import{w as c,j as n,r as k,E as g,l as t}from"./iframe-7czCGN7b.js";import{M as S,P as u}from"./usePlanleggerNavigator-DYP19ueN.js";import{h as r,a as m,H as o}from"./Planlegger-MbKPnjeN.js";import{D as d}from"./satserUtils-DlluwObF.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CeanplYH.js";import"./barnetUtils-CJBenv_k.js";import"./hvemHarRettUtils-DJajuYJo.js";import"./ArbeidssituasjonSteg-DAChp9kF.js";import"./BlueRadioGroup-CFSMi-Z0.js";import"./customErrorFormatter-BXuhwfyP.js";import"./PlanleggerStepPage-tD3jivVV.js";import"./useScrollBehaviour-DPu1hTQy.js";import"./Spacer-CcLD0oTU.js";import"./BarnehageplassSteg-BqxlIU_E.js";import"./uttakUtils-BJA-dqt1.js";import"./BabyWrapped-DnyHQg7I.js";import"./Information-BYYuBT3m.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DBU9evKz.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg--iSEieOC.js";import"./HvorLangPeriodeSteg-CYkx0Gbr.js";import"./PersonGroup-C9CGBS0E.js";import"./HvorMyeSteg-DUDwz6Id.js";import"./Wallet-C15kOWb3.js";import"./OmBarnetSteg-BlPx_42T.js";import"./TasklistStart-CCVw0mVB.js";import"./OmPlanleggerenSteg-IS5r5IYn.js";import"./OppsummeringSteg-CgLfwiJY.js";import"./ShareDataInfobox-D0bcg1Yx.js";import"./CalendarLabels-BEC7VVuz.js";import"./CalendarIconLabel-BMu8rANy.js";import"./FamiliehendelseLabel-CtNrbf1S.js";import"./PlanenDeresSteg-DYNAuy98.js";import"./OmÅTilpassePlanen-Deo1tZ94.js";import"./PersonPregnant-DVOFErp7.js";import"./PencilWriting-qAdVnyOl.js";import"./UforutsetteEndringer-CBjFSas6.js";import"./ToggleGroup-DJiAKUJF.js";import"./TilpassPlanenSteg-CHzQfsxL.js";import"./HvaErMulig-DwPdqQr0.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
