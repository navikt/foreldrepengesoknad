import{w as k,j as s,r as g,E as S,l as t}from"./iframe-6_J5CKaQ.js";import{M as u,P as f}from"./usePlanleggerNavigator-C2pcqYNa.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-DthuaIWV.js";import{D as l}from"./satserUtils-Cn92Uj1k.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-EXn8yxxX.js";import"./barnetUtils-CAOXR3bw.js";import"./hvemHarRettUtils-DW_kkzev.js";import"./ArbeidssituasjonSteg-DWx2TlNN.js";import"./BlueRadioGroup-CCZLDtJK.js";import"./customErrorFormatter-B08yBI2d.js";import"./PlanleggerStepPage-BEQHIM7h.js";import"./useScrollBehaviour-QJhmvulI.js";import"./Spacer-DR_7yrEc.js";import"./BarnehageplassSteg-tZ3r4LXT.js";import"./uttakUtils-c8UDpNlQ.js";import"./BabyWrapped-GvLgJ902.js";import"./Information-Cao5Af-g.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CUCVVjL3.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-wihH79iA.js";import"./HvorLangPeriodeSteg-CXTyQp9C.js";import"./PersonGroup-DuovysEv.js";import"./HvorMyeSteg-w-zvh53o.js";import"./Wallet-Bt4qcKy1.js";import"./OmBarnetSteg-Brieoq2n.js";import"./TasklistStart-CSRKLMzo.js";import"./OmPlanleggerenSteg-Bo7sK8O0.js";import"./OppsummeringSteg-z10Z4rkS.js";import"./ShareDataInfobox-6s8vRzs5.js";import"./CalendarLabels-BldFtAny.js";import"./CalendarIconLabel-B-9oE_po.js";import"./FamiliehendelseLabel-BPo6HubT.js";import"./PlanenDeresSteg-Bg_5nio4.js";import"./OmÅTilpassePlanen-Dj0nnUN-.js";import"./PersonPregnant-DTG6IXri.js";import"./PencilWriting-DdNLXA9C.js";import"./UforutsetteEndringer-pZOrY3Ni.js";import"./ToggleGroup-CnqHNYEV.js";import"./TilpassPlanenSteg-Z1DS0ou_.js";import"./HvaErMulig-fNoihg5g.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
