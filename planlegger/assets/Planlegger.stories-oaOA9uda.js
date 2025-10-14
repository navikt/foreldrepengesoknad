import{w as k,j as s,r as g,E as S,l as t}from"./iframe-iv_pozw3.js";import{M as u,P as f}from"./usePlanleggerNavigator-zyX1GtDi.js";import{h as o,a as d,A as r,H as n}from"./Planlegger-CuFKVVeX.js";import{D as l}from"./satserUtils-FB2XDy4u.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CglsB6uD.js";import"./barnetUtils-BUOYe38_.js";import"./hvemHarRettUtils-CMadOtYH.js";import"./ArbeidssituasjonSteg-N5j73w3x.js";import"./BlueRadioGroup-Cq20x3F3.js";import"./customErrorFormatter-PTyM6HB0.js";import"./PlanleggerStepPage-DtD5bfb9.js";import"./useScrollBehaviour-Lp2RYBnQ.js";import"./Spacer-Cg6ByAhJ.js";import"./BarnehageplassSteg-M52IhNUf.js";import"./uttakUtils-DQ5qBxz7.js";import"./BabyWrapped-CKRZ91V_.js";import"./Information-0UO9gsrQ.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-Dk5Zb8vc.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-IuYd1qn_.js";import"./HvorLangPeriodeSteg-C2qzOpiQ.js";import"./PersonGroup-CzXXXwPj.js";import"./HvorMyeSteg-DBOeqXdq.js";import"./Wallet-DgV5-sk4.js";import"./OmBarnetSteg-CSPoPyc8.js";import"./TasklistStart-DJ9iIc-y.js";import"./OmPlanleggerenSteg-CgcNDuuT.js";import"./OppsummeringSteg-DCXqr6zf.js";import"./ShareDataInfobox-CQe0YFeJ.js";import"./CalendarLabels-DgrMWWNo.js";import"./CalendarIconLabel-D2Ngsbrw.js";import"./FamiliehendelseLabel-Cn4gbIK6.js";import"./PlanenDeresSteg-BkQvgPIw.js";import"./OmÅTilpassePlanen-E6iyM6w8.js";import"./PersonPregnant-FtyvAiiE.js";import"./PencilWriting-Y1T3kW-z.js";import"./UforutsetteEndringer-BYLeFPOU.js";import"./ToggleGroup-Dl8Pmoru.js";import"./TilpassPlanenSteg-k7sk3-C0.js";import"./HvaErMulig-BA_0uoLP.js";const h={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},lt={title:"PlanleggerDataFetcher",component:d,decorators:[k],parameters:{msw:{handlers:[o.post(r.konto,async({request:m})=>{const i=await m.json(),c=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(i),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(c)}),o.get(r.satser,async()=>{const i=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(i)})]}},render:()=>s.jsx(g.StrictMode,{children:s.jsx(u,{children:s.jsx(S,{appName:"planlegger",retryCallback:()=>{},children:s.jsx(f,{initialState:{},children:s.jsx(d,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},a={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json(h)),o.get(r.satser,()=>n.json(l))]}}},p={...e,parameters:{msw:{handlers:[o.post(r.konto,()=>n.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),o.get(r.satser,()=>n.json(l))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
