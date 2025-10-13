import{w as k,j as s,r as g,E as S,l as t}from"./iframe-8awzgK37.js";import{M as u,P as f}from"./usePlanleggerNavigator-BpR1hUYd.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-u9kY71pI.js";import{D as l}from"./satserUtils-GA2WlRRi.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BW9HBgol.js";import"./barnetUtils-CO5mpazh.js";import"./hvemHarRettUtils-CYswA-4I.js";import"./ArbeidssituasjonSteg-DgO_Wawm.js";import"./BlueRadioGroup-BaYPO_rf.js";import"./customErrorFormatter-CcThI_5I.js";import"./PlanleggerStepPage-D7069Frk.js";import"./useScrollBehaviour-C2E34clf.js";import"./Spacer-DePtuH2k.js";import"./BarnehageplassSteg-Bb5KsVOT.js";import"./uttakUtils-0A02Mj_C.js";import"./BabyWrapped-DBeirre8.js";import"./Information-BhXqjG2L.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CREIAucR.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-C62eLDAo.js";import"./HvorLangPeriodeSteg-DcR_9p_Y.js";import"./PersonGroup-BJhbzRkd.js";import"./HvorMyeSteg-Dida51cR.js";import"./Wallet-7qEmrIDt.js";import"./OmBarnetSteg-C_vrRs7w.js";import"./TasklistStart-Bls6Fijv.js";import"./OmPlanleggerenSteg-Dhuj62Wu.js";import"./OppsummeringSteg-B2UoDMHs.js";import"./ShareDataInfobox-INPQoQ_W.js";import"./CalendarLabels-Bd3kduVa.js";import"./CalendarIconLabel-CmncDEOu.js";import"./FamiliehendelseLabel-BaLJ9T8u.js";import"./PlanenDeresSteg-CeJomHBf.js";import"./OmÅTilpassePlanen-Cj9hEFKi.js";import"./PersonPregnant-Cvf3uvTD.js";import"./PencilWriting-C_i5371D.js";import"./UforutsetteEndringer-C31ZBbYF.js";import"./ToggleGroup-DiIAeHxV.js";import"./TilpassPlanenSteg-ChzAReQ9.js";import"./HvaErMulig-DOM6UzqE.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
