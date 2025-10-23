import{w as k,j as s,r as g,E as S,l as t}from"./iframe-Bd_yl_7Z.js";import{M as u,P as f}from"./usePlanleggerNavigator-CsHpz8td.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-D9cVnYw5.js";import{D as l}from"./satserUtils-yPZSF8qc.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-Cl4FCups.js";import"./barnetUtils-Bue87cV1.js";import"./hvemHarRettUtils-2VQ3lvRb.js";import"./ArbeidssituasjonSteg-B6y_5BlP.js";import"./BlueRadioGroup-BOO4KLt4.js";import"./customErrorFormatter-DpUIRgkW.js";import"./PlanleggerStepPage-BNJtpAxs.js";import"./useScrollBehaviour-CK77PxSt.js";import"./Spacer-DEsp1kmt.js";import"./BarnehageplassSteg-D9YdsIaN.js";import"./uttakUtils-xZCfNEGy.js";import"./BabyWrapped-CW-K3-9Z.js";import"./Information-CMX5qHXQ.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-scH-Yf23.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-0LYKKamE.js";import"./HvorLangPeriodeSteg-DndNKUD1.js";import"./PersonGroup-BQJCbb7H.js";import"./HvorMyeSteg-DUuhCbAS.js";import"./Wallet-uufjYCJy.js";import"./OmBarnetSteg-DxX7PpNB.js";import"./TasklistStart-vnXaaq1h.js";import"./OmPlanleggerenSteg-C_mamTy_.js";import"./OppsummeringSteg-BiXAGFYY.js";import"./ShareDataInfobox-AKGEhn8c.js";import"./CalendarLabels-Dm26R3HD.js";import"./CalendarIconLabel-BolKI_5b.js";import"./FamiliehendelseLabel-B5rRRtKU.js";import"./PlanenDeresSteg-hG0vzghY.js";import"./OmÅTilpassePlanen-qb8aky7B.js";import"./PersonPregnant-CHQ_kO5s.js";import"./PencilWriting-DdG1kE6m.js";import"./UforutsetteEndringer-CMZBQkVR.js";import"./ToggleGroup-trk9mm5Q.js";import"./TilpassPlanenSteg-C4U03o4Q.js";import"./HvaErMulig-BX6jaHDm.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
