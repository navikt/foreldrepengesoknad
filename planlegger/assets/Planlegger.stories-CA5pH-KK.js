import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DQwDPExg.js";import{M as S,P as u}from"./usePlanleggerNavigator-SSsX-AKq.js";import{h as r,a as m,H as o}from"./Planlegger-D3N6Gits.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-CHX4c2X2.js";import"./barnetUtils-DIdrQew2.js";import"./hvemHarRettUtils-TBBqqu45.js";import"./ArbeidssituasjonSteg-CTI3--NT.js";import"./BlueRadioGroup-nRVHGJll.js";import"./customErrorFormatter-hIY99Dql.js";import"./PlanleggerStepPage-hPT-F9Sx.js";import"./satserUtils-BheF6V5A.js";import"./useScrollBehaviour-ptYB-jQz.js";import"./Spacer-BlEVdZSL.js";import"./BarnehageplassSteg-IP1mGqc3.js";import"./uttakUtils-DKqwTozJ.js";import"./BabyWrapped-DUOzA-Jt.js";import"./Information-CzHyf1Eo.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg--RR1Fjyh.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BAvalcNB.js";import"./HvorLangPeriodeSteg-NoDjJoIw.js";import"./PersonGroup-AYVHJzOp.js";import"./HvorMyeSteg-DpZ4t4QV.js";import"./Wallet-CevumlO2.js";import"./OmBarnetSteg-BcY5aYjM.js";import"./TasklistStart-u7pw7uXW.js";import"./OmPlanleggerenSteg-CRZHKJcH.js";import"./OppsummeringSteg-C3HyCXlM.js";import"./ShareDataInfobox-0jBE7xeu.js";import"./CalendarLabels-BA28gq8x.js";import"./CalendarIconLabel-D-66Cgsi.js";import"./FamiliehendelseLabel-CMiz-Odi.js";import"./PlanenDeresSteg-Cnf6lN_9.js";import"./OmÅTilpassePlanen-BXkC9IKo.js";import"./PersonPregnant-DICEGIQ6.js";import"./PencilWriting-BZf8LgCn.js";import"./UforutsetteEndringer-BEySf30z.js";import"./ToggleGroup-B-aa4cri.js";import"./TilpassPlanenSteg-Bjg3dDjp.js";import"./HvaErMulig-B-blJRQE.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},d={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},mt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const dt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,dt as __namedExportsOrder,mt as default};
