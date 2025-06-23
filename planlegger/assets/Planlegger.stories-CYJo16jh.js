import{w as F,j as n,r as R,E as T,l as t}from"./iframe-GIdhbm7h.js";import{M as E,P as y}from"./usePlanleggerNavigator-Cq_Z4ZCU.js";import{h as r,a as m,H as o}from"./Planlegger-DMQIy55e.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BXg3x6ub.js";import"./barnetUtils-BWYaFkSi.js";import"./hvemHarRettUtils-CtlxHNf-.js";import"./ArbeidssituasjonSteg-bPpwRupI.js";import"./BlueRadioGroup-7iAz22Vl.js";import"./customErrorFormatter-D_PxsNKy.js";import"./PlanleggerStepPage-BxjMZiHe.js";import"./satserUtils-BDyX76jq.js";import"./useScrollBehaviour-BvqKgoeM.js";import"./Spacer-CRnSkdR9.js";import"./BarnehageplassSteg-pMf5HN2_.js";import"./uttakUtils-CL7hCCWF.js";import"./BabyWrapped-DGnMCi9-.js";import"./Information-DtdWnIMs.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CjLzLXwL.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DCFAjP7e.js";import"./HvorLangPeriodeSteg-CaQW3dxg.js";import"./PersonGroup-BXxlXPFY.js";import"./HvorMyeSteg-DWZ_vl82.js";import"./Wallet-CK42SKtJ.js";import"./OmBarnetSteg-DeA3RK4b.js";import"./TasklistStart-Bim7Kowr.js";import"./OmPlanleggerenSteg-BF3Wr2Q3.js";import"./OppsummeringSteg-DUEbOcAv.js";import"./ShareDataInfobox-C3QaogXE.js";import"./CalendarLabels-in-DkNLp.js";import"./CalendarIconLabel-BY0U4ONv.js";import"./FamiliehendelseLabel-B0xEqbri.js";import"./PlanenDeresSteg-CoXJ04r3.js";import"./OmÅTilpassePlanen-Bc75mom8.js";import"./PersonPregnant-DQFA2cAd.js";import"./PencilWriting-rZaOgErS.js";import"./UforutsetteEndringer-RPfy52f8.js";import"./ToggleGroup-BAfaD9Jg.js";import"./TilpassPlanenSteg-BiTaAGmp.js";import"./HvaErMulig-CPzYkxI-.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
