import{w as k,j as s,r as g,E as S,l as t}from"./iframe-h4Gp-DNI.js";import{M as u,P as f}from"./usePlanleggerNavigator-DfTqE5mn.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-CVMmW4lG.js";import{D as l}from"./satserUtils-DTjEOUsj.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-gKZScuip.js";import"./barnetUtils-DGQYiNaf.js";import"./hvemHarRettUtils-CUxmLgIl.js";import"./ArbeidssituasjonSteg-DUL5ibmJ.js";import"./BlueRadioGroup-Ce4QGXct.js";import"./customErrorFormatter-7cz3mAKl.js";import"./PlanleggerStepPage-2YI5EZ7P.js";import"./useScrollBehaviour-DKQWcMJC.js";import"./Spacer-Bh71C_Tp.js";import"./BarnehageplassSteg-2Jc04JLq.js";import"./uttakUtils-DMfZ6XaR.js";import"./BabyWrapped-BcBhf4nR.js";import"./Information-BRpLtXKq.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-TSN1BLU5.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CWd6BUY-.js";import"./HvorLangPeriodeSteg-Cjjc2V5u.js";import"./PersonGroup-Do0PgK3t.js";import"./HvorMyeSteg-CjeHEvg7.js";import"./Wallet-Da8fEcA0.js";import"./OmBarnetSteg-BLrGfVVp.js";import"./TasklistStart-DQ060k5J.js";import"./OmPlanleggerenSteg-CmiAqQoD.js";import"./OppsummeringSteg-BXDT6Q4Z.js";import"./ShareDataInfobox-BhQ05gsH.js";import"./CalendarLabels-DgJm18BJ.js";import"./CalendarIconLabel-CwNlYdg2.js";import"./FamiliehendelseLabel-Bd4RnS94.js";import"./PlanenDeresSteg-DeWZZ3PG.js";import"./OmÅTilpassePlanen-Dq_N5GTP.js";import"./PersonPregnant-DhbKQ5bs.js";import"./PencilWriting-DBZiSV1b.js";import"./UforutsetteEndringer-Bjri2YRN.js";import"./ToggleGroup-BJu5BdaM.js";import"./TilpassPlanenSteg-DgaNFAns.js";import"./HvaErMulig-BUngaE0a.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
