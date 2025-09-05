import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DhsZ0ALI.js";import{M as S,P as u}from"./usePlanleggerNavigator-COt2d-Y5.js";import{h as r,a as m,H as o}from"./Planlegger-KleeAJ0z.js";import{D as d}from"./satserUtils-DcNNfAGY.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DradhGLm.js";import"./barnetUtils-DTz6d6cG.js";import"./hvemHarRettUtils-B1CJDEx7.js";import"./ArbeidssituasjonSteg-CIO1L9Qn.js";import"./BlueRadioGroup-DrVberuK.js";import"./customErrorFormatter-0xWo5H32.js";import"./PlanleggerStepPage-BdatCgKF.js";import"./useScrollBehaviour-I2rFl3qG.js";import"./Spacer-Bpqi0HXb.js";import"./BarnehageplassSteg-B-4-zOQi.js";import"./uttakUtils-CirewYOL.js";import"./BabyWrapped-DcYPFgnu.js";import"./Information-C1ZAja8R.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-yEy_5Iua.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-iS1-l3nj.js";import"./HvorLangPeriodeSteg-OUzl5jLG.js";import"./PersonGroup-BIlIVada.js";import"./HvorMyeSteg-frTLrNtw.js";import"./Wallet-Bgp-75om.js";import"./OmBarnetSteg-BUJW20wF.js";import"./TasklistStart-VMeuOrUV.js";import"./OmPlanleggerenSteg-ClqNaJIa.js";import"./OppsummeringSteg-TCzMsTtj.js";import"./ShareDataInfobox-CYI0iNM4.js";import"./CalendarLabels-BfxwjkYB.js";import"./CalendarIconLabel-CwcgOW4T.js";import"./FamiliehendelseLabel-D6KPyPvf.js";import"./PlanenDeresSteg-tH9K2a1X.js";import"./OmÅTilpassePlanen-BE9m6eYm.js";import"./PersonPregnant-B_1o3WcP.js";import"./PencilWriting-Bt2b3QGr.js";import"./UforutsetteEndringer-DHx4_QBw.js";import"./ToggleGroup-AHGQkpO0.js";import"./TilpassPlanenSteg-BAUBP3Qw.js";import"./HvaErMulig-7plo_WHl.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
