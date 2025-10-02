import{w as c,j as n,r as k,E as g,l as t}from"./iframe-BmPJRzdA.js";import{M as S,P as u}from"./usePlanleggerNavigator-Brn5wd2T.js";import{h as r,a as m,H as o}from"./Planlegger-Ccd5Likl.js";import{D as d}from"./satserUtils-3t_uLuTu.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BXixIGyn.js";import"./barnetUtils-B7EHn61T.js";import"./hvemHarRettUtils-eT6v_Pjs.js";import"./ArbeidssituasjonSteg-CABaLpGV.js";import"./BlueRadioGroup-Cua5gqZ3.js";import"./customErrorFormatter-BGZprzId.js";import"./PlanleggerStepPage-DR8x2B32.js";import"./useScrollBehaviour-AqmQNN56.js";import"./Spacer-dnYgEog-.js";import"./BarnehageplassSteg-BK6ppusf.js";import"./uttakUtils-DCFN3PbO.js";import"./BabyWrapped-C0T93lI4.js";import"./Information-DC64oTEI.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FordelingSteg-CXQ39cIJ.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CIBnwGzY.js";import"./HvorLangPeriodeSteg-Dz32WefL.js";import"./PersonGroup-B86_5ABL.js";import"./HvorMyeSteg-DlyROnTu.js";import"./Wallet-CBLkzUlH.js";import"./OmBarnetSteg-DK-vu_Zl.js";import"./TasklistStart-DbY5afRW.js";import"./OmPlanleggerenSteg-BZJBjxe9.js";import"./OppsummeringSteg-DXp7cCgW.js";import"./ShareDataInfobox-DO6--zU3.js";import"./CalendarLabels-C-E3X3aS.js";import"./CalendarIconLabel-CZbaCveG.js";import"./FamiliehendelseLabel-8C44QLMS.js";import"./PlanenDeresSteg-E9_BWQjZ.js";import"./OmÅTilpassePlanen-DjHn2e-L.js";import"./PersonPregnant-CUwJeCvZ.js";import"./PencilWriting-C8p-uuNv.js";import"./UforutsetteEndringer-Bxb66Cj7.js";import"./ToggleGroup-p3KI3FZb.js";import"./TilpassPlanenSteg-cZouWrcq.js";import"./HvaErMulig-CKqI4kDo.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
