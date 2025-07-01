import{w as F,j as n,r as R,E as T,l as t}from"./iframe-DYD6BlSH.js";import{M as E,P as y}from"./usePlanleggerNavigator-C6Sph3Vp.js";import{h as r,a as m,H as o}from"./Planlegger-BBqOSi-1.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-BEUoFL1z.js";import"./barnetUtils-DTbMt5dp.js";import"./hvemHarRettUtils-CCEVlIll.js";import"./ArbeidssituasjonSteg-R4m9wTnP.js";import"./BlueRadioGroup-B0MxDaKp.js";import"./customErrorFormatter-ClBn-nw0.js";import"./PlanleggerStepPage-Dt1_AoND.js";import"./satserUtils-Db1ZVMAu.js";import"./useScrollBehaviour-yQI5uWdj.js";import"./Spacer-C3TgO8c8.js";import"./BarnehageplassSteg-BDHnXF4o.js";import"./uttakUtils-BGRbJ8fA.js";import"./BabyWrapped-CmF9ZdUw.js";import"./Information-5oNmP18x.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BW6x8HUH.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BJM0fv9Q.js";import"./HvorLangPeriodeSteg-C9mYwzdc.js";import"./PersonGroup-C_8BdLWj.js";import"./HvorMyeSteg-B1O_o6Jo.js";import"./Wallet-BWQr4JVs.js";import"./OmBarnetSteg-Dxku4tlV.js";import"./TasklistStart-DDipIlEU.js";import"./OmPlanleggerenSteg-DpoQ3GvO.js";import"./OppsummeringSteg-CxesINNs.js";import"./ShareDataInfobox-CIHN8084.js";import"./CalendarLabels-tIc45iSm.js";import"./CalendarIconLabel-CpY_hMJ9.js";import"./FamiliehendelseLabel-B0x3V4Ph.js";import"./PlanenDeresSteg-BYu59eVZ.js";import"./OmÅTilpassePlanen-mXg1AAem.js";import"./PersonPregnant-D9RpWBK5.js";import"./PencilWriting-DLxByDT-.js";import"./UforutsetteEndringer-CDyLQAvP.js";import"./ToggleGroup-DIheGLPc.js";import"./TilpassPlanenSteg-COtbCL6p.js";import"./HvaErMulig-C6-JfjBw.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
