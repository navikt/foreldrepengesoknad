import{w as F,j as n,r as R,E as T,l as t}from"./iframe-ClkbrzSB.js";import{M as E,P as y}from"./usePlanleggerNavigator-B6vDRMOc.js";import{h as r,a as m,H as o}from"./Planlegger-CGQpBwQ_.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-5H2S_3Nj.js";import"./barnetUtils-DutV4Y9k.js";import"./hvemHarRettUtils-wbcJj993.js";import"./ArbeidssituasjonSteg-NJYwvVCL.js";import"./BlueRadioGroup-CkAipmw6.js";import"./customErrorFormatter-CZoJ6xrL.js";import"./PlanleggerStepPage-r9vMsIeg.js";import"./satserUtils-l5irKFdK.js";import"./useScrollBehaviour-CglsPqv2.js";import"./Spacer-BeN815oP.js";import"./BarnehageplassSteg-BMHkjUMZ.js";import"./uttakUtils-C0pndi1X.js";import"./BabyWrapped-syyv_VSU.js";import"./Information-DOEySf3g.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BDVIWdi9.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-8DV7d3NK.js";import"./HvorLangPeriodeSteg-C3upi6U5.js";import"./PersonGroup-Csa-Tp5h.js";import"./HvorMyeSteg-BWyTONP4.js";import"./Wallet-CYtfaXgZ.js";import"./OmBarnetSteg-DEMTDSsB.js";import"./TasklistStart-C-WSFd-H.js";import"./OmPlanleggerenSteg-B5y5-8b2.js";import"./OppsummeringSteg-DQwLcunu.js";import"./ShareDataInfobox-D5pGAH7u.js";import"./CalendarLabels-COATF3B1.js";import"./CalendarIconLabel-fjWxZswM.js";import"./FamiliehendelseLabel-UdI1Ir_o.js";import"./PlanenDeresSteg-CZt0WmJx.js";import"./OmÅTilpassePlanen-DYNsslOh.js";import"./PersonPregnant-Kf7ri98u.js";import"./PencilWriting-Gv2ow24V.js";import"./UforutsetteEndringer-DRygOdsN.js";import"./ToggleGroup-lnj4l1gz.js";import"./TilpassPlanenSteg-ByZq-lgO.js";import"./HvaErMulig-BzGlZqEU.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
