import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DDACrD87.js";import{M as S,P as u}from"./usePlanleggerNavigator-CMKb3z3b.js";import{h as r,a as m,H as o}from"./Planlegger-DCNP8jP8.js";import{D as d}from"./satserUtils-tN1d9viq.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DtVvCAm-.js";import"./barnetUtils-23QICeaT.js";import"./hvemHarRettUtils-ChzdvcHg.js";import"./ArbeidssituasjonSteg-DyAsOmPk.js";import"./BlueRadioGroup-BPAGblSt.js";import"./customErrorFormatter-COKAcMV7.js";import"./PlanleggerStepPage-DARo0GLf.js";import"./useScrollBehaviour-BO5BVwBa.js";import"./Spacer-aJKfeyKc.js";import"./BarnehageplassSteg-n3xYF78V.js";import"./uttakUtils-CytS4jn5.js";import"./BabyWrapped-dZLs4_np.js";import"./Information-U36-MPYq.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DHLeQuR0.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BnDMvqqQ.js";import"./HvorLangPeriodeSteg-BZzBSiym.js";import"./PersonGroup-M_Wp4Kpa.js";import"./HvorMyeSteg-B8wgD7cU.js";import"./Wallet-WSvsRS45.js";import"./OmBarnetSteg-CkpL8vmN.js";import"./TasklistStart-C2VC4l5o.js";import"./OmPlanleggerenSteg-CyRV2ZHz.js";import"./OppsummeringSteg-BFzJZS1O.js";import"./ShareDataInfobox-D9u_JJZb.js";import"./CalendarLabels-74G2fxY2.js";import"./CalendarIconLabel-CaQRlJ4a.js";import"./FamiliehendelseLabel-BQRRIgV5.js";import"./PlanenDeresSteg-BRV94079.js";import"./OmÅTilpassePlanen-np4jbNfQ.js";import"./PersonPregnant-Crs4YDTe.js";import"./PencilWriting-CZMDgAeV.js";import"./UforutsetteEndringer-DD5VoTpU.js";import"./ToggleGroup-D5JLhP3V.js";import"./TilpassPlanenSteg-C4TwscRe.js";import"./HvaErMulig-KQESB7cO.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
