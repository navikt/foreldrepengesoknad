import{w as F,j as n,r as R,E as T,l as t}from"./iframe-C7K-_vsJ.js";import{M as E,P as y}from"./usePlanleggerNavigator-HFI66Q4C.js";import{h as r,a as m,H as o}from"./Planlegger-DzwYuS2l.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BbE_SC0L.js";import"./barnetUtils-Cn2z4tuZ.js";import"./hvemHarRettUtils-D9CmtskZ.js";import"./ArbeidssituasjonSteg-Ca8UqK1e.js";import"./BlueRadioGroup-DwSakyii.js";import"./customErrorFormatter-C9b7KXOA.js";import"./PlanleggerStepPage-DNrpKK1r.js";import"./satserUtils-B4VBNQWH.js";import"./useScrollBehaviour-CJeeIdLD.js";import"./Spacer-mXmUqMuA.js";import"./BarnehageplassSteg-6du-fLNJ.js";import"./uttakUtils-CqA6053v.js";import"./BabyWrapped-ZDHfACqb.js";import"./Information-QT_Uy4Jf.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BiymQEzN.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Bqmbqo9L.js";import"./HvorLangPeriodeSteg-DFsyXvs2.js";import"./PersonGroup-BI7tCmo-.js";import"./HvorMyeSteg-Dy9_hPDd.js";import"./Wallet-khkLXslt.js";import"./OmBarnetSteg-Cctjb_qM.js";import"./TasklistStart-CtFJmPRv.js";import"./OmPlanleggerenSteg-B1OxxbKD.js";import"./OppsummeringSteg-Btqa6miQ.js";import"./ShareDataInfobox-Ce7_pZYk.js";import"./CalendarLabels-MPePJ1d8.js";import"./CalendarIconLabel-DuSSLW8u.js";import"./FamiliehendelseLabel-n2v767fB.js";import"./PlanenDeresSteg-DlrjuUcN.js";import"./OmÅTilpassePlanen-B3RH1NIi.js";import"./PersonPregnant-BfhttNwf.js";import"./PencilWriting-DUkKtGWt.js";import"./UforutsetteEndringer-BbdVxn0l.js";import"./ToggleGroup-V4u1FC2q.js";import"./TilpassPlanenSteg-Dw37TgBF.js";import"./HvaErMulig-D20hJU3Y.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
