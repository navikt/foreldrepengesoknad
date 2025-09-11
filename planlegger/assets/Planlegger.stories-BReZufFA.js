import{w as c,j as n,r as k,E as g,l as t}from"./iframe-RmyPOhDr.js";import{M as S,P as u}from"./usePlanleggerNavigator-C8rX8g-S.js";import{h as r,a as m,H as o}from"./Planlegger-ComAvmeX.js";import{D as d}from"./satserUtils-vFjoDC0e.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BfUylo7Z.js";import"./barnetUtils--oUqstRa.js";import"./hvemHarRettUtils-DUSVVDd4.js";import"./ArbeidssituasjonSteg-BMbUByo2.js";import"./BlueRadioGroup-g4LFDWR_.js";import"./customErrorFormatter-DdPA9jAq.js";import"./PlanleggerStepPage-DEGB3q-6.js";import"./useScrollBehaviour-CR7WgvCF.js";import"./Spacer-BPNm3P3u.js";import"./BarnehageplassSteg-DYEM-zLr.js";import"./uttakUtils-WGjICcuw.js";import"./BabyWrapped-BAcb_PoU.js";import"./Information-CyUeeqdZ.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-JhSrKlKl.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-dXEYKPyz.js";import"./HvorLangPeriodeSteg-CE4nvS8x.js";import"./PersonGroup-DIDDF9pV.js";import"./HvorMyeSteg-DDRYQv1l.js";import"./Wallet-DFQ2l-Er.js";import"./OmBarnetSteg-DI0qk55I.js";import"./TasklistStart-DOHQV7ul.js";import"./OmPlanleggerenSteg-Cw1_NgYH.js";import"./OppsummeringSteg-CSLFGnqv.js";import"./ShareDataInfobox-CJMAVFst.js";import"./CalendarLabels-x6sibIvZ.js";import"./CalendarIconLabel-nGE3Sl65.js";import"./FamiliehendelseLabel-BUopP2l8.js";import"./PlanenDeresSteg-CsCHJnaQ.js";import"./OmÅTilpassePlanen-CXvV37pl.js";import"./PersonPregnant-CWYWZ7Pk.js";import"./PencilWriting-CSRUyxUd.js";import"./UforutsetteEndringer-RRg4r6HA.js";import"./ToggleGroup-DDbsZbxG.js";import"./TilpassPlanenSteg-4IK4VqcR.js";import"./HvaErMulig-WaJxtAiW.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
