import{w as F,j as n,r as R,E as T,l as t}from"./iframe-CVrfE2al.js";import{M as E,P as y}from"./usePlanleggerNavigator-CiFzBK8e.js";import{h as r,a as m,H as o}from"./Planlegger-Di7a7Zt7.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BUtsRXNw.js";import"./barnetUtils-Du1-Q7bq.js";import"./hvemHarRettUtils-DYggLVfz.js";import"./ArbeidssituasjonSteg-DM_D35LR.js";import"./BlueRadioGroup-BP0seXSU.js";import"./customErrorFormatter-Czv0TTXj.js";import"./PlanleggerStepPage-D4MInbhN.js";import"./satserUtils-NKMJ441h.js";import"./useScrollBehaviour-D-wSNcvi.js";import"./Spacer-Cii7NwhO.js";import"./BarnehageplassSteg-DSrhVd1I.js";import"./uttakUtils-ClJvmaX7.js";import"./BabyWrapped-CN55iSE6.js";import"./Information-CHB022Hj.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BQhaHem5.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-ehcje40P.js";import"./HvorLangPeriodeSteg-ClnE2TNA.js";import"./PersonGroup-fEvFtn19.js";import"./HvorMyeSteg-B7iRj27I.js";import"./Wallet-Dg1Wjyam.js";import"./OmBarnetSteg-BWSfgNep.js";import"./TasklistStart-1d5ZiPXg.js";import"./OmPlanleggerenSteg-BoEkn7az.js";import"./OppsummeringSteg-3TZHwsr8.js";import"./ShareDataInfobox-CBirWWV6.js";import"./CalendarLabels-D48hSGp9.js";import"./CalendarIconLabel-B85OfHpS.js";import"./FamiliehendelseLabel-CpyHGY0C.js";import"./PlanenDeresSteg-BPtSk9fW.js";import"./OmÅTilpassePlanen-n4kmZF0k.js";import"./PersonPregnant-B7jmPhfB.js";import"./PencilWriting-Eax_C3bC.js";import"./UforutsetteEndringer-DU_Vad0l.js";import"./ToggleGroup-CM-UNU-t.js";import"./TilpassPlanenSteg-Bf6SUxHB.js";import"./HvaErMulig-DLmmXBTg.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
