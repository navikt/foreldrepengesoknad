import{w as k,j as s,r as g,E as S,l as t}from"./iframe-C5qkzLEa.js";import{M as u,P as f}from"./usePlanleggerNavigator-CLwseuZS.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-Ciz6yt3y.js";import{D as l}from"./satserUtils-CVPkbcer.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BQTYebQd.js";import"./barnetUtils-emRGvaJ9.js";import"./hvemHarRettUtils-BRt5Up9T.js";import"./ArbeidssituasjonSteg-DHYNlqXZ.js";import"./BlueRadioGroup-Cv3IbfJ_.js";import"./customErrorFormatter-CWCFVRcl.js";import"./PlanleggerStepPage-mPqcYHKR.js";import"./useScrollBehaviour-DS9r2xPn.js";import"./Spacer-BPz7qCEF.js";import"./BarnehageplassSteg-jFwNmC6Y.js";import"./uttakUtils-qQFalMFt.js";import"./BabyWrapped-eg_MVZXM.js";import"./Information-Dw6KqxIC.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CfU0whtG.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CWfERHni.js";import"./HvorLangPeriodeSteg-BF96iQMN.js";import"./PersonGroup-D8-vBWoa.js";import"./HvorMyeSteg-BvuX88uo.js";import"./Wallet-DZv6AEhh.js";import"./OmBarnetSteg-ChIzzupg.js";import"./TasklistStart-DBiDdmFD.js";import"./OmPlanleggerenSteg-uCrQZsYL.js";import"./OppsummeringSteg-TTyQ3Z7M.js";import"./ShareDataInfobox-Bl-YFQOm.js";import"./CalendarLabels-9Yha-22D.js";import"./CalendarIconLabel-C_q8Kq5A.js";import"./FamiliehendelseLabel-B8DSIxKb.js";import"./PlanenDeresSteg-D6vkE7qV.js";import"./OmÅTilpassePlanen-C66u7zSu.js";import"./PersonPregnant-BdjQ_yGo.js";import"./PencilWriting-DiFHdHDa.js";import"./UforutsetteEndringer-BPjeKbpA.js";import"./ToggleGroup-CynP9PfB.js";import"./TilpassPlanenSteg-BSXmRFLC.js";import"./HvaErMulig-Clh5x3is.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
