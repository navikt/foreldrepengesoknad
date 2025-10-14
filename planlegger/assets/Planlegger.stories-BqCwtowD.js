import{w as k,j as s,r as g,E as S,l as t}from"./iframe-7JIcCJIF.js";import{M as u,P as f}from"./usePlanleggerNavigator-9Vqp3-2j.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-DSfkv0D_.js";import{D as l}from"./satserUtils-De9tHUZ8.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DmcL2ehH.js";import"./barnetUtils-Dah3cwSu.js";import"./hvemHarRettUtils-CjbO3AQA.js";import"./ArbeidssituasjonSteg-huyDRGC2.js";import"./BlueRadioGroup-BUxv68vJ.js";import"./customErrorFormatter-ENs_DxF7.js";import"./PlanleggerStepPage-BbdQ5zay.js";import"./useScrollBehaviour-DdzleXBe.js";import"./Spacer-CMQM3zHS.js";import"./BarnehageplassSteg-DZ5Ey75x.js";import"./uttakUtils-BBrzUMYL.js";import"./BabyWrapped-DiItUiZC.js";import"./Information-DWT1dSiy.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-xcCwOvep.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-hIC4xBxc.js";import"./HvorLangPeriodeSteg-DvwYIzGx.js";import"./PersonGroup-CT8IHpN8.js";import"./HvorMyeSteg-Do4xB43f.js";import"./Wallet-DHaRJtcn.js";import"./OmBarnetSteg-BT0j44m3.js";import"./TasklistStart-DMhpo_Wn.js";import"./OmPlanleggerenSteg-B-iRmwd_.js";import"./OppsummeringSteg-489VnMsn.js";import"./ShareDataInfobox-DIlXrXnQ.js";import"./CalendarLabels-Df9tmXH-.js";import"./CalendarIconLabel-BpKao8EO.js";import"./FamiliehendelseLabel-BliZtbdt.js";import"./PlanenDeresSteg-C9ZElOe1.js";import"./OmÅTilpassePlanen-vIjyE2I6.js";import"./PersonPregnant-eYhBHD8C.js";import"./PencilWriting-D0CYRvPB.js";import"./UforutsetteEndringer-e0sJjevs.js";import"./ToggleGroup-DutzyJqf.js";import"./TilpassPlanenSteg-Cf8B25az.js";import"./HvaErMulig-Cd3jFZvo.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
