import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BdvdCHhd.js";import{M as S,P as u}from"./usePlanleggerNavigator-BmqndTcW.js";import{h as r,a as m,H as o}from"./Planlegger-qfFIsZxg.js";import{D as d}from"./satserUtils-Dog2VIFM.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CFuCMGcE.js";import"./barnetUtils-Bpxsu0pX.js";import"./hvemHarRettUtils-COgwfgRz.js";import"./ArbeidssituasjonSteg-CgC0cx39.js";import"./BlueRadioGroup-CdqL4Z0k.js";import"./customErrorFormatter-CS5NK0vJ.js";import"./PlanleggerStepPage-DHrfb4uE.js";import"./useScrollBehaviour-DNH0egqJ.js";import"./Spacer-BXRfy7CQ.js";import"./BarnehageplassSteg-BxZaTbPv.js";import"./uttakUtils-DL3N3acj.js";import"./BabyWrapped-B0ljrz__.js";import"./Information-DlvXKX2u.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BU9vabKm.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CgFyZ-KE.js";import"./HvorLangPeriodeSteg-DwzOUfam.js";import"./PersonGroup-Ce_J0WQX.js";import"./HvorMyeSteg-Bwtzg8Ow.js";import"./Wallet-D1gdIyzJ.js";import"./OmBarnetSteg-CyjfK3Zr.js";import"./TasklistStart-CTk0C9Zu.js";import"./OmPlanleggerenSteg-77CXF6Nr.js";import"./OppsummeringSteg-DnDHxBeH.js";import"./ShareDataInfobox-B8Jo8rOd.js";import"./CalendarLabels-B7gzb1sS.js";import"./CalendarIconLabel-0x51hZSz.js";import"./FamiliehendelseLabel-B8TWIrK0.js";import"./PlanenDeresSteg-f1gb3n0q.js";import"./OmÅTilpassePlanen-rP04X2pK.js";import"./PersonPregnant-D2ocLH2j.js";import"./PencilWriting-tnbyy-NF.js";import"./UforutsetteEndringer-CRk3cesE.js";import"./ToggleGroup-D7BketL6.js";import"./TilpassPlanenSteg-FiThfYNH.js";import"./HvaErMulig-C2rSxc3r.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json({
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
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};const lt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,lt as __namedExportsOrder,dt as default};
