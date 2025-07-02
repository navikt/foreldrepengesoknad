import{w as F,j as n,r as R,E as T,l as t}from"./iframe-DYr0ukZE.js";import{M as E,P as y}from"./usePlanleggerNavigator-Bb1sIER_.js";import{h as r,a as m,H as o}from"./Planlegger-CmGN7Rrz.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-V0lHvAHm.js";import"./barnetUtils-UbMospPp.js";import"./hvemHarRettUtils-DbNrTQc9.js";import"./ArbeidssituasjonSteg-DZbr4LYQ.js";import"./BlueRadioGroup-pLzhlCxU.js";import"./customErrorFormatter-CR75snsN.js";import"./PlanleggerStepPage-BLLRB0Wo.js";import"./satserUtils-CNK_xmJ0.js";import"./useScrollBehaviour-4OI-akC1.js";import"./Spacer-DvDcHGqT.js";import"./BarnehageplassSteg-3QAxcH4l.js";import"./uttakUtils-CNzrEWj7.js";import"./BabyWrapped-BPselUoZ.js";import"./Information-qbBZI9KJ.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DGxkKffP.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BI_fS2x8.js";import"./HvorLangPeriodeSteg-CP4pArL-.js";import"./PersonGroup-BOk6xLxz.js";import"./HvorMyeSteg-u1QorInC.js";import"./Wallet-BzfkEei0.js";import"./OmBarnetSteg-C5NimBMu.js";import"./TasklistStart-DFdtX6jS.js";import"./OmPlanleggerenSteg-C6UgqTAg.js";import"./OppsummeringSteg-DqnnEj3h.js";import"./ShareDataInfobox-BsfjC-6l.js";import"./CalendarLabels-D2bU1edy.js";import"./CalendarIconLabel-Dgbz7q7X.js";import"./FamiliehendelseLabel-3badKgSJ.js";import"./PlanenDeresSteg-CWqE6JYL.js";import"./OmÅTilpassePlanen-CcudQ-84.js";import"./PersonPregnant-BTvTCllI.js";import"./PencilWriting-Bt7XmEZD.js";import"./UforutsetteEndringer-WNip8xRk.js";import"./ToggleGroup-D2MBcQlT.js";import"./TilpassPlanenSteg-cV7pDdLb.js";import"./HvaErMulig-CUgFG4u-.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var k,g,S;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(S=(g=s.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var u,f,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const vt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,vt as __namedExportsOrder,ht as default};
