import{w as k,j as s,r as g,E as S,l as t}from"./iframe-DQxPMM_i.js";import{M as u,P as f}from"./usePlanleggerNavigator-Bb-xFQjz.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-BairRyXs.js";import{D as l}from"./satserUtils-UlToWeN4.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CNzxjUaE.js";import"./barnetUtils-BlIdrVYa.js";import"./hvemHarRettUtils-DByd3qQ3.js";import"./ArbeidssituasjonSteg-CwrHJ-Q2.js";import"./BlueRadioGroup-8cCRLHuD.js";import"./customErrorFormatter-DvkLpZTL.js";import"./PlanleggerStepPage-DN5dX1lW.js";import"./useScrollBehaviour-P_vE3ShB.js";import"./Spacer-FqkVTQ9_.js";import"./BarnehageplassSteg-DAGEkw-A.js";import"./uttakUtils-ComfI1oD.js";import"./BabyWrapped-DOQ0-pmD.js";import"./Information-DKAzzv_L.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-vGC2xcKa.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-5xINVmuA.js";import"./HvorLangPeriodeSteg-DVuXqdbs.js";import"./PersonGroup-7d7vWpwI.js";import"./HvorMyeSteg-DyGTYrnd.js";import"./Wallet-UMrteHAW.js";import"./OmBarnetSteg-CGmAdYHs.js";import"./TasklistStart-D-JkIIbV.js";import"./OmPlanleggerenSteg-IZGZE3AW.js";import"./OppsummeringSteg-DAPW7aTc.js";import"./ShareDataInfobox-BtDg3KFD.js";import"./CalendarLabels-F0Z3YPx3.js";import"./CalendarIconLabel-0U0OSGEf.js";import"./FamiliehendelseLabel-BJVZW3zk.js";import"./PlanenDeresSteg-zAZrmvED.js";import"./OmÅTilpassePlanen-DCG7j3ii.js";import"./PersonPregnant-Bng-_eeV.js";import"./PencilWriting-BvEJrJIC.js";import"./UforutsetteEndringer-DLaMPF4o.js";import"./ToggleGroup-CyFMOR1W.js";import"./TilpassPlanenSteg-9spbmD5N.js";import"./HvaErMulig-BrRlFQ2g.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
