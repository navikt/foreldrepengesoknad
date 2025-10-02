import{w as c,j as n,r as k,E as g,l as t}from"./iframe-yMJ-4Bu_.js";import{M as S,P as u}from"./usePlanleggerNavigator-_XDJHp-h.js";import{h as r,a as m,H as o}from"./Planlegger-Cam2RTjG.js";import{D as d}from"./satserUtils-CDMjRUHx.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CFG-jxPe.js";import"./barnetUtils-DiYN72G-.js";import"./hvemHarRettUtils-DfStqDjO.js";import"./ArbeidssituasjonSteg-Bb699Zko.js";import"./BlueRadioGroup-DnCIbthQ.js";import"./customErrorFormatter-D9-c21L_.js";import"./PlanleggerStepPage-CFxVVCLO.js";import"./useScrollBehaviour-R5vXw0GQ.js";import"./Spacer-JwU70Fwn.js";import"./BarnehageplassSteg-VLctFD_i.js";import"./uttakUtils-DMSkJXrH.js";import"./BabyWrapped-BGzmHwJo.js";import"./Information-D_pCHnSB.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-P4vvphxH.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BuCtOOOo.js";import"./HvorLangPeriodeSteg-lH_3pT7J.js";import"./PersonGroup-r2v_SOPZ.js";import"./HvorMyeSteg-C9Bmt_ut.js";import"./Wallet-B1Fjf3UJ.js";import"./OmBarnetSteg-XSsUgGxV.js";import"./TasklistStart-jdWBWpPO.js";import"./OmPlanleggerenSteg-B62Nueyk.js";import"./OppsummeringSteg-qVw4p9nu.js";import"./ShareDataInfobox-BtvDg8Xw.js";import"./CalendarLabels-B8wyT0GR.js";import"./CalendarIconLabel-Czx84UMk.js";import"./FamiliehendelseLabel-CTC0AMt6.js";import"./PlanenDeresSteg-DFTmv7Sw.js";import"./OmÅTilpassePlanen--h0wxi9v.js";import"./PersonPregnant-DnHwvTnO.js";import"./PencilWriting-D4AUbTzG.js";import"./UforutsetteEndringer-2JTEn9Qu.js";import"./ToggleGroup-BeWl-iuO.js";import"./TilpassPlanenSteg-dXzzwv2Y.js";import"./HvaErMulig-CAVrpaou.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
