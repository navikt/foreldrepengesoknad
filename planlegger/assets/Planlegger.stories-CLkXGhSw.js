import{w as F,j as n,r as R,E as T,l as t}from"./iframe-BzUS2-gV.js";import{M as E,P as y}from"./usePlanleggerNavigator-B3s2WoJH.js";import{h as r,a as m,H as o}from"./Planlegger-pCbP0ict.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-TQ0Dpdrm.js";import"./barnetUtils-Mapwb1UO.js";import"./hvemHarRettUtils-CAx3fXXr.js";import"./ArbeidssituasjonSteg-CX2o4L2a.js";import"./BlueRadioGroup-e8t9cth_.js";import"./customErrorFormatter-D6z3bQ13.js";import"./PlanleggerStepPage-D8i2W5lh.js";import"./satserUtils-UymZacT9.js";import"./useScrollBehaviour-CWnNnABP.js";import"./Spacer-WaaM-6ni.js";import"./BarnehageplassSteg-DLjZ1-Al.js";import"./uttakUtils-DJnF4XBz.js";import"./BabyWrapped-lr3hIVbh.js";import"./Information-C4k0i-76.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-B918PUBk.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-D_rRERZu.js";import"./HvorLangPeriodeSteg-lehtSgSg.js";import"./PersonGroup-BK21AVa6.js";import"./HvorMyeSteg-D_pZnX2a.js";import"./Wallet-bAd4XexA.js";import"./OmBarnetSteg-DGHnQX63.js";import"./TasklistStart-DogeMOcV.js";import"./OmPlanleggerenSteg-CE810z5S.js";import"./OppsummeringSteg-Dsz6_5Ev.js";import"./ShareDataInfobox-DxBpPzvq.js";import"./CalendarLabels-CZGgeU-3.js";import"./CalendarIconLabel-9lXxfbdc.js";import"./FamiliehendelseLabel-CeivgG6f.js";import"./PlanenDeresSteg-YVBunSN9.js";import"./OmÅTilpassePlanen-CTteaXWk.js";import"./PersonPregnant-De5sItHN.js";import"./PencilWriting-Chl-VzWB.js";import"./UforutsetteEndringer-m7-Oumy4.js";import"./ToggleGroup-BIoVGLPF.js";import"./TilpassPlanenSteg-q5rWPpj_.js";import"./HvaErMulig-MCXqrjbq.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
