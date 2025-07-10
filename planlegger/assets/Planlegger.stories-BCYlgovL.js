import{w as F,j as n,r as R,E as T,l as t}from"./iframe-SYFgyuWa.js";import{M as E,P as y}from"./usePlanleggerNavigator-Cb5ENjjV.js";import{h as r,a as m,H as o}from"./Planlegger-Os3tnG0q.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-bU3toQpL.js";import"./barnetUtils-BFkRSEVg.js";import"./hvemHarRettUtils-9OVhtej6.js";import"./ArbeidssituasjonSteg-4JYwY_Oi.js";import"./BlueRadioGroup-BDOX4BBK.js";import"./customErrorFormatter-DRH4EFIc.js";import"./PlanleggerStepPage-DGMS0Ft6.js";import"./satserUtils-JGniFUUE.js";import"./useScrollBehaviour-Dz-t1lwo.js";import"./Spacer-CTnqhOhT.js";import"./BarnehageplassSteg-C2kexmsn.js";import"./uttakUtils-BhCSq6F4.js";import"./BabyWrapped-DBGt-JUN.js";import"./Information-Cdta85vO.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CZI-JWsc.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Diy889Xl.js";import"./HvorLangPeriodeSteg-BwzUJ3qf.js";import"./PersonGroup-B51i3TMT.js";import"./HvorMyeSteg-ApXCXxQi.js";import"./Wallet-CXz00hGQ.js";import"./OmBarnetSteg-DirHtB8P.js";import"./TasklistStart-T9P3pBs8.js";import"./OmPlanleggerenSteg-CYE27RnH.js";import"./OppsummeringSteg-E15f0tNi.js";import"./ShareDataInfobox-ClxbIpww.js";import"./CalendarLabels-COaEhZev.js";import"./CalendarIconLabel-DtLZNyvE.js";import"./FamiliehendelseLabel-B5WDUsIw.js";import"./PlanenDeresSteg-CgwH9ZYY.js";import"./OmÅTilpassePlanen-DO0MD7NX.js";import"./PersonPregnant-CJCw3S1M.js";import"./PencilWriting-DuuG6c1a.js";import"./UforutsetteEndringer-DVLGB8PR.js";import"./ToggleGroup-HnICnWJT.js";import"./TilpassPlanenSteg-Dzj-9W_j.js";import"./HvaErMulig-DoyCsMFm.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
