import{w as k,j as s,r as g,E as S,l as t}from"./iframe-BDgwCH-l.js";import{M as u,P as f}from"./usePlanleggerNavigator-GW_IQNEq.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-CqZGin_1.js";import{D as l}from"./satserUtils-C6uEiA7o.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BEwfDS-_.js";import"./barnetUtils-CsAn-_Ru.js";import"./hvemHarRettUtils-C6P04xZs.js";import"./ArbeidssituasjonSteg-D0QFKnpg.js";import"./BlueRadioGroup-DmZWY2TH.js";import"./customErrorFormatter-DCJIlmIz.js";import"./PlanleggerStepPage-B5gGWiak.js";import"./useScrollBehaviour-BOyMqIjq.js";import"./Spacer-DAkEaI2z.js";import"./BarnehageplassSteg-CTXBoIqw.js";import"./uttakUtils-EWU6md8m.js";import"./BabyWrapped-C3fTsCvC.js";import"./Information-CH14Irt4.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-e3Qwq7re.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CSlIkNz7.js";import"./HvorLangPeriodeSteg-BElB1yau.js";import"./PersonGroup-B5bXqVFN.js";import"./HvorMyeSteg-BOzgW7OK.js";import"./Wallet-thACeoqG.js";import"./OmBarnetSteg-CKmD-XI4.js";import"./TasklistStart-C5xg8VnG.js";import"./OmPlanleggerenSteg-Dtb5ba3c.js";import"./OppsummeringSteg-DMJwdUTg.js";import"./ShareDataInfobox-EeJPVcfy.js";import"./CalendarLabels-DudxBy68.js";import"./CalendarIconLabel-Dd5o8VFY.js";import"./FamiliehendelseLabel-B_lrF6Q6.js";import"./PlanenDeresSteg-_w9nMLOq.js";import"./OmÅTilpassePlanen-BFwguN74.js";import"./PersonPregnant-p3F4kYej.js";import"./PencilWriting-B6TVKiin.js";import"./UforutsetteEndringer-C3Udu9Il.js";import"./ToggleGroup-DzsUR0sS.js";import"./TilpassPlanenSteg-DWgQxRFy.js";import"./HvaErMulig-CLOQ8mN_.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
