import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DoMDK7zu.js";import{M as S,P as u}from"./usePlanleggerNavigator-BCQ9Fn9K.js";import{h as r,a as m,H as o}from"./Planlegger-BNY49jQp.js";import{D as d}from"./satserUtils-CdqJbm0v.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-D6u3ND5W.js";import"./barnetUtils-D1VXHzYq.js";import"./hvemHarRettUtils-yjXHvXgJ.js";import"./ArbeidssituasjonSteg-DMfb9PdX.js";import"./BlueRadioGroup-DwtgsmtP.js";import"./customErrorFormatter-BoaJiyaW.js";import"./PlanleggerStepPage-Bs742RVm.js";import"./useScrollBehaviour-C49Lms4n.js";import"./Spacer-CpO8mtHF.js";import"./BarnehageplassSteg-DN3zF6WP.js";import"./uttakUtils-Bf6WskLk.js";import"./BabyWrapped-r9xdpVqr.js";import"./Information-BnsbUGRD.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-C8ToJgro.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Cgi26K1F.js";import"./HvorLangPeriodeSteg-BUNTaM4z.js";import"./PersonGroup--1rBZ2ro.js";import"./HvorMyeSteg-Bt7IFyGw.js";import"./Wallet-DOeC2axs.js";import"./OmBarnetSteg-BALXW_I-.js";import"./TasklistStart-BpScT6xW.js";import"./OmPlanleggerenSteg-x82dRA6f.js";import"./OppsummeringSteg-Cm0aK4Ey.js";import"./ShareDataInfobox-DIRuk4xO.js";import"./CalendarLabels-WWQ_q0jq.js";import"./CalendarIconLabel-BCTE3Fdj.js";import"./FamiliehendelseLabel-BPPbvt0c.js";import"./PlanenDeresSteg-Drowr_fa.js";import"./OmÅTilpassePlanen-B4wbYgqQ.js";import"./PersonPregnant-z1U3bjD9.js";import"./PencilWriting-BCA2xMGh.js";import"./UforutsetteEndringer-CatYLrGi.js";import"./ToggleGroup-BSoYeUc8.js";import"./TilpassPlanenSteg-DXJzEs4V.js";import"./HvaErMulig-BxG2zm0r.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
