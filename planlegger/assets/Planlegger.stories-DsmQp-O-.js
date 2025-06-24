import{w as F,j as n,r as R,E as T,l as t}from"./iframe-DThxleL3.js";import{M as E,P as y}from"./usePlanleggerNavigator-DLe7bjhY.js";import{h as r,a as m,H as o}from"./Planlegger-DBn0M0dA.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BS29ilSk.js";import"./barnetUtils-hAI78pv_.js";import"./hvemHarRettUtils-CWo_SanA.js";import"./ArbeidssituasjonSteg-DaGnQJn-.js";import"./BlueRadioGroup-C9c2QuIz.js";import"./customErrorFormatter-lmeDBeol.js";import"./PlanleggerStepPage-DFfM2Crs.js";import"./satserUtils-BtM9YgV0.js";import"./useScrollBehaviour-De1ku619.js";import"./Spacer-CbpVftlN.js";import"./BarnehageplassSteg-iUMZgmHM.js";import"./uttakUtils-LWO6l4cx.js";import"./BabyWrapped-DSBrzKFy.js";import"./Information-DrIlgThY.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BjDK2iZF.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DjgQUzUy.js";import"./HvorLangPeriodeSteg-BmSN9fEw.js";import"./PersonGroup-KGGO72-C.js";import"./HvorMyeSteg-DvZWTcIf.js";import"./Wallet-7ZvDjFZt.js";import"./OmBarnetSteg-mVhXbphD.js";import"./TasklistStart-C2mQ48b4.js";import"./OmPlanleggerenSteg-CvfK7f3s.js";import"./OppsummeringSteg-CxsaqDfF.js";import"./ShareDataInfobox-4CwmfNk3.js";import"./CalendarLabels-BWycgE8x.js";import"./CalendarIconLabel-DdG3YnQu.js";import"./FamiliehendelseLabel-BtsE6yJS.js";import"./PlanenDeresSteg-2bJPFulX.js";import"./OmÅTilpassePlanen-rwfZI3e2.js";import"./PersonPregnant-CrDGdCNJ.js";import"./PencilWriting-BU7v_Udl.js";import"./UforutsetteEndringer-wr0N7CDt.js";import"./ToggleGroup-nLBBolh4.js";import"./TilpassPlanenSteg-zr3ZO0kJ.js";import"./HvaErMulig-CE5KnQU4.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
