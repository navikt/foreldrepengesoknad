import{w as k,j as s,r as g,E as S,l as t}from"./iframe-Bs5G3KwD.js";import{M as u,P as f}from"./usePlanleggerNavigator-D-fGVXS_.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-mplsjUu2.js";import{D as l}from"./satserUtils-BY5nTA47.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CD0Kb3Am.js";import"./barnetUtils-Cf3DLlxd.js";import"./hvemHarRettUtils-u8tR62J0.js";import"./ArbeidssituasjonSteg-BdzyC-kN.js";import"./BlueRadioGroup-BhUu3sK7.js";import"./customErrorFormatter-omCWJuTJ.js";import"./PlanleggerStepPage-C2zV7yDx.js";import"./useScrollBehaviour-Di0A7rs4.js";import"./Spacer-B3rr7FnB.js";import"./BarnehageplassSteg-Cl3JxRcD.js";import"./uttakUtils-BvCdJx7b.js";import"./BabyWrapped-C6gEKyPB.js";import"./Information-BS4v5amT.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-DqJG8eme.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DthqHC9_.js";import"./HvorLangPeriodeSteg-Dzi241gu.js";import"./PersonGroup-d7Kkv_ZT.js";import"./HvorMyeSteg-BT8_w7ln.js";import"./Wallet-D-HOygai.js";import"./OmBarnetSteg-BN8CK8bJ.js";import"./TasklistStart-BrobBFjT.js";import"./OmPlanleggerenSteg-Ch9aOG0w.js";import"./OppsummeringSteg-FSK-rbp1.js";import"./ShareDataInfobox-n0tMjhXB.js";import"./CalendarLabels-BvtqkALF.js";import"./CalendarIconLabel-CWPR6plk.js";import"./FamiliehendelseLabel-BGFCU2rd.js";import"./PlanenDeresSteg-B1mrbJp3.js";import"./OmÅTilpassePlanen-B3V1Mfhe.js";import"./PersonPregnant-rQtmNn6Z.js";import"./PencilWriting-C9M0pbIK.js";import"./UforutsetteEndringer-DZY4XEoX.js";import"./ToggleGroup-C_DI4c29.js";import"./TilpassPlanenSteg-CI2KauTa.js";import"./HvaErMulig-BUn0eaU3.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
