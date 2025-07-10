import{w as F,j as n,r as R,E as T,l as t}from"./iframe-CRvMeerX.js";import{M as E,P as y}from"./usePlanleggerNavigator-CPyje46K.js";import{h as r,a as m,H as o}from"./Planlegger-B5P_PE09.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-6KuuBP0g.js";import"./barnetUtils-bDKrTgG9.js";import"./hvemHarRettUtils-CYbG3O6f.js";import"./ArbeidssituasjonSteg-C47agJdf.js";import"./BlueRadioGroup-Dh7ioo6I.js";import"./customErrorFormatter-Dmp8gNwa.js";import"./PlanleggerStepPage-D-nkzCQ-.js";import"./satserUtils-CEIo-dLj.js";import"./useScrollBehaviour-C4yw0GP1.js";import"./Spacer-CIh5feze.js";import"./BarnehageplassSteg-DbSkRR9l.js";import"./uttakUtils-CaJVb0Bt.js";import"./BabyWrapped-4Xlse5hl.js";import"./Information-BrZU_XRo.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CLKjqWc_.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-C75efwDu.js";import"./HvorLangPeriodeSteg-2iNRp8Dm.js";import"./PersonGroup-rZJOdjX2.js";import"./HvorMyeSteg-BhIhGYxZ.js";import"./Wallet-BWw5VW1q.js";import"./OmBarnetSteg-B8agqxGd.js";import"./TasklistStart-QaMSerDO.js";import"./OmPlanleggerenSteg-DMHwFKMR.js";import"./OppsummeringSteg-DXKOVS8H.js";import"./ShareDataInfobox-Ps_NTfu-.js";import"./CalendarLabels-DFkv4LGL.js";import"./CalendarIconLabel-DUxusoeb.js";import"./FamiliehendelseLabel-C5Gax8FV.js";import"./PlanenDeresSteg-tCpmkzY7.js";import"./OmÅTilpassePlanen-BbhZWpXV.js";import"./PersonPregnant-BaElzIkJ.js";import"./PencilWriting-DkbyN8ce.js";import"./UforutsetteEndringer-CChHBs7b.js";import"./ToggleGroup-C4bO47DR.js";import"./TilpassPlanenSteg-DdJNWV-0.js";import"./HvaErMulig-CsjX8CYh.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
