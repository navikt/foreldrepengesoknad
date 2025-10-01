import{w as c,j as n,r as k,E as g,l as t}from"./iframe-LXTMV3rR.js";import{M as S,P as u}from"./usePlanleggerNavigator-yDL4ZAL4.js";import{h as r,a as m,H as o}from"./Planlegger-1Adx4lY1.js";import{D as d}from"./satserUtils-BORgrrz6.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DakUotk6.js";import"./barnetUtils-BAvddyKH.js";import"./hvemHarRettUtils-CpKXA2I4.js";import"./ArbeidssituasjonSteg-BQZRH6eS.js";import"./BlueRadioGroup-BzghiFCa.js";import"./customErrorFormatter-BGy2Hn8z.js";import"./PlanleggerStepPage-CWoQRx6r.js";import"./useScrollBehaviour-Dp3Ll2VL.js";import"./Spacer-B1hEFNF8.js";import"./BarnehageplassSteg-rW-0nFuX.js";import"./uttakUtils-BdMOp_OT.js";import"./BabyWrapped-BFtLrz3K.js";import"./Information-C9zfWg5i.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DIoloubD.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Bf1H0eq-.js";import"./HvorLangPeriodeSteg-Dnc1fxsI.js";import"./PersonGroup-CgcduDqo.js";import"./HvorMyeSteg-DEl2ebZG.js";import"./Wallet-DBgV_uzO.js";import"./OmBarnetSteg-Dc8XolYM.js";import"./TasklistStart-7qHbnkFH.js";import"./OmPlanleggerenSteg-Dha0QFyw.js";import"./OppsummeringSteg-AuoUGvQR.js";import"./ShareDataInfobox-B0ubmUme.js";import"./CalendarLabels-CU_8VCzK.js";import"./CalendarIconLabel-ipAsw-iZ.js";import"./FamiliehendelseLabel-DETPjvhM.js";import"./PlanenDeresSteg-MHx48UcB.js";import"./OmÅTilpassePlanen-B83djmlE.js";import"./PersonPregnant-CRYPEYP4.js";import"./PencilWriting-687gyswm.js";import"./UforutsetteEndringer-Cubsqqlp.js";import"./ToggleGroup-CzJIfGtz.js";import"./TilpassPlanenSteg-CztDiQaD.js";import"./HvaErMulig-OODOcpFz.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
