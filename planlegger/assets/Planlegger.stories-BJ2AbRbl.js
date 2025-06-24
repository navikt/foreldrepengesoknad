import{w as F,j as n,r as R,E as T,l as t}from"./iframe-VTDB-9x6.js";import{M as E,P as y}from"./usePlanleggerNavigator-CTeZB_HS.js";import{h as r,a as m,H as o}from"./Planlegger-DJa9f3UK.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-C3XmPc95.js";import"./barnetUtils-B3OfU4T5.js";import"./hvemHarRettUtils-DmzQeHFG.js";import"./ArbeidssituasjonSteg-BFfDl83X.js";import"./BlueRadioGroup-71v--RSg.js";import"./customErrorFormatter-B586elG1.js";import"./PlanleggerStepPage-DSlmRxO_.js";import"./satserUtils-DTH7btpW.js";import"./useScrollBehaviour-C61KYPUU.js";import"./Spacer-B137rtXV.js";import"./BarnehageplassSteg-B74MBNV0.js";import"./uttakUtils-BvoQki1b.js";import"./BabyWrapped-BDY9oi6J.js";import"./Information-43a6seeP.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-wWX_ghJh.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DsHIU-o4.js";import"./HvorLangPeriodeSteg-B2mT5dL6.js";import"./PersonGroup-BxdaWc7q.js";import"./HvorMyeSteg-C4VI8OFi.js";import"./Wallet-BPkSECIf.js";import"./OmBarnetSteg-BzE6g4jP.js";import"./TasklistStart-OJ591q7h.js";import"./OmPlanleggerenSteg-BLVeaeQL.js";import"./OppsummeringSteg-bl9-bM9F.js";import"./ShareDataInfobox-RPwKnOhF.js";import"./CalendarLabels-BQJLCL3x.js";import"./CalendarIconLabel-Dw6NeJBO.js";import"./FamiliehendelseLabel-DHzDywC_.js";import"./PlanenDeresSteg-DSI4h6jG.js";import"./OmÅTilpassePlanen-BMQTKVia.js";import"./PersonPregnant-BL8HXgT9.js";import"./PencilWriting-BdY7dH3P.js";import"./UforutsetteEndringer-tikq-1rA.js";import"./ToggleGroup-BlplGUX0.js";import"./TilpassPlanenSteg-1gaIp8vp.js";import"./HvaErMulig-DluX1K2i.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
