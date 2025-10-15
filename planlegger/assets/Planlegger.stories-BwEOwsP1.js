import{w as k,j as s,r as g,E as S,l as t}from"./iframe-DMjR5zJp.js";import{M as u,P as f}from"./usePlanleggerNavigator-fce4_mez.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-BnGieyU3.js";import{D as l}from"./satserUtils-CvEkq6Re.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-FmAHV5TN.js";import"./barnetUtils-CFOtHNM8.js";import"./hvemHarRettUtils-Dth0aJl-.js";import"./ArbeidssituasjonSteg-DSgF6np4.js";import"./BlueRadioGroup-D7gH8xRp.js";import"./customErrorFormatter-BRBGjbF-.js";import"./PlanleggerStepPage-DCTHONNL.js";import"./useScrollBehaviour-JvNfIY5k.js";import"./Spacer-DvBXqbH6.js";import"./BarnehageplassSteg-h1oel86k.js";import"./uttakUtils-RZEI38-d.js";import"./BabyWrapped-Cee8FrKo.js";import"./Information-BvMm_DSP.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-xl0IsvID.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CElooHFS.js";import"./HvorLangPeriodeSteg-BS-BlenV.js";import"./PersonGroup-BvIX9_x2.js";import"./HvorMyeSteg-Kg35yXpl.js";import"./Wallet-D7tW95nM.js";import"./OmBarnetSteg-BvLqxDKf.js";import"./TasklistStart-SSGoFenx.js";import"./OmPlanleggerenSteg-CfiUXzgY.js";import"./OppsummeringSteg-BWO5CCaX.js";import"./ShareDataInfobox-DO5BsAyZ.js";import"./CalendarLabels-DmzBiFlF.js";import"./CalendarIconLabel-lbBQPi52.js";import"./FamiliehendelseLabel-B92j8m9f.js";import"./PlanenDeresSteg-B3hu_tPp.js";import"./OmÅTilpassePlanen-fzAfu2-0.js";import"./PersonPregnant-ZY-X3Tk7.js";import"./PencilWriting-yFJM4-f4.js";import"./UforutsetteEndringer-CFiyy7zJ.js";import"./ToggleGroup-CxnyZ6za.js";import"./TilpassPlanenSteg-C2TGZrlx.js";import"./HvaErMulig-BVMBMZvf.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
