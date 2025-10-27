import{w as k,j as s,r as g,E as S,l as t}from"./iframe-DZpYEUcy.js";import{M as u,P as f}from"./usePlanleggerNavigator-ZJ7Tfy5M.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-BEU8y7et.js";import{D as l}from"./satserUtils-Dreouvcd.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DXTiv3TI.js";import"./barnetUtils-BQ_Di5aw.js";import"./hvemHarRettUtils-MjDAyvpz.js";import"./ArbeidssituasjonSteg-BOjJHaZs.js";import"./BlueRadioGroup-71exNWby.js";import"./customErrorFormatter-CqrLzylO.js";import"./PlanleggerStepPage-DbT-ul6u.js";import"./useScrollBehaviour-BNyGyNR3.js";import"./Spacer-Bfu2YI9g.js";import"./BarnehageplassSteg-xKv2Qv1X.js";import"./uttakUtils-CtYDyF4D.js";import"./BabyWrapped-DZWNIG-3.js";import"./Information-BoYA-lSo.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-ChrJDmGa.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-B6p5RJJS.js";import"./HvorLangPeriodeSteg-CBAF5PN_.js";import"./PersonGroup-cZKxAORw.js";import"./HvorMyeSteg-C8tTIDXa.js";import"./Wallet-DjGDTZ7j.js";import"./OmBarnetSteg-aQbzkHtq.js";import"./TasklistStart-QthyBjIb.js";import"./OmPlanleggerenSteg-Do1UwmeL.js";import"./OppsummeringSteg-CEcW7xME.js";import"./ShareDataInfobox-2HLDvmQ0.js";import"./CalendarLabels-e0d2iko7.js";import"./CalendarIconLabel-LSe08cpP.js";import"./FamiliehendelseLabel-BMbT-lO8.js";import"./PlanenDeresSteg-KS3PIDEx.js";import"./OmÅTilpassePlanen-h17oCxLY.js";import"./PersonPregnant-CNHbA15C.js";import"./PencilWriting-CENR29Ti.js";import"./UforutsetteEndringer-B5JpuIT0.js";import"./ToggleGroup-w6dMIoAx.js";import"./TilpassPlanenSteg-OujDpi67.js";import"./HvaErMulig-plyhzBjP.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
