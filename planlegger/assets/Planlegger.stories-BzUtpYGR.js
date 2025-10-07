import{w as k,j as s,r as g,E as S,l as t}from"./iframe-CWlE8tBU.js";import{M as u,P as f}from"./usePlanleggerNavigator-BWippXP8.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-D8cewAZA.js";import{D as l}from"./satserUtils-BBYmRgxo.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-D9XTNPQ-.js";import"./barnetUtils-CBzeYiMo.js";import"./hvemHarRettUtils-BiN7-jfc.js";import"./ArbeidssituasjonSteg-hV-YsTC5.js";import"./BlueRadioGroup-U1HjNZ-w.js";import"./customErrorFormatter-BuMnojUN.js";import"./PlanleggerStepPage-Rb27Rt4N.js";import"./useScrollBehaviour-24ROaTVB.js";import"./Spacer-BYPYEUbg.js";import"./BarnehageplassSteg-eLN_y-CS.js";import"./uttakUtils-C54gm3v_.js";import"./BabyWrapped-BSivmdtj.js";import"./Information-CEKsFJcH.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CQDy9peU.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BhYq1TIN.js";import"./HvorLangPeriodeSteg-r6uUjwMm.js";import"./PersonGroup-CUXm7t63.js";import"./HvorMyeSteg-DPtserVl.js";import"./Wallet-C8_1zphG.js";import"./OmBarnetSteg-Drv9iA8p.js";import"./TasklistStart-CYmvNHVl.js";import"./OmPlanleggerenSteg-DPDXMzjO.js";import"./OppsummeringSteg-ziRMPwdX.js";import"./ShareDataInfobox-Dvu122c6.js";import"./CalendarLabels-Cmi0bHfi.js";import"./CalendarIconLabel-pAJD2Z8p.js";import"./FamiliehendelseLabel-DH-gIAZh.js";import"./PlanenDeresSteg-CeIcMdTh.js";import"./OmÅTilpassePlanen-HALMSsrl.js";import"./PersonPregnant-cQQAZLgl.js";import"./PencilWriting-BQQkUuxr.js";import"./UforutsetteEndringer-CrCMqnkh.js";import"./ToggleGroup-BdrVQyEA.js";import"./TilpassPlanenSteg-t0IeVq0Z.js";import"./HvaErMulig-BNAY-3li.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER)), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json({
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
      } as TilgjengeligeStønadskontoer)), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...p.parameters?.docs?.source}}};const ct=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,a as DefaultMockaStønadskontoerOgSatser,p as FarFarMockaStønadskontoerOgSatser,ct as __namedExportsOrder,lt as default};
