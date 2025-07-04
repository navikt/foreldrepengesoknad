import{w as F,j as n,r as R,E as T,l as t}from"./iframe-CrYP5esv.js";import{M as E,P as y}from"./usePlanleggerNavigator-DiKVpW1j.js";import{h as r,a as m,H as o}from"./Planlegger-B3QXvZQq.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CkbkVvRh.js";import"./barnetUtils-JREJxSeI.js";import"./hvemHarRettUtils-Dd828sPz.js";import"./ArbeidssituasjonSteg-Dy4RZPsX.js";import"./BlueRadioGroup-BKuSm3r0.js";import"./customErrorFormatter-C6HJeEbD.js";import"./PlanleggerStepPage-BvwrhM6L.js";import"./satserUtils-BucVDegm.js";import"./useScrollBehaviour-DmtLpSwH.js";import"./Spacer-OzFXJH2F.js";import"./BarnehageplassSteg-BLvZjg5d.js";import"./uttakUtils-BViYVu4F.js";import"./BabyWrapped-D5-gm9Ts.js";import"./Information-nEvyDZc0.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-DNo5tR2G.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Dg3abZvt.js";import"./HvorLangPeriodeSteg-CoI5iBXI.js";import"./PersonGroup-C6R6fd9n.js";import"./HvorMyeSteg-C-ljqt-x.js";import"./Wallet-BIYWlQZJ.js";import"./OmBarnetSteg-DlCcjTYF.js";import"./TasklistStart-C0B8ohgb.js";import"./OmPlanleggerenSteg-BJMi7Dvg.js";import"./OppsummeringSteg-mbfAXsVw.js";import"./ShareDataInfobox-Dibqoau-.js";import"./CalendarLabels-BhPwSP0T.js";import"./CalendarIconLabel-BwMz5iTy.js";import"./FamiliehendelseLabel-DzE4mho5.js";import"./PlanenDeresSteg-H5QPSS2L.js";import"./OmÅTilpassePlanen-iGipvrw-.js";import"./PersonPregnant-D5LArZHk.js";import"./PencilWriting-yEPMjan3.js";import"./UforutsetteEndringer-Dg5T_QJQ.js";import"./ToggleGroup-IiJ7I9mZ.js";import"./TilpassPlanenSteg-MoAnMo9v.js";import"./HvaErMulig-CN1Q9z_7.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
