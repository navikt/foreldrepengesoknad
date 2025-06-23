import{w as F,j as n,r as R,E as T,l as t}from"./iframe-dyC0iTc7.js";import{M as E,P as y}from"./usePlanleggerNavigator-DtY4WHRv.js";import{h as r,a as m,H as o}from"./Planlegger-B1yMPZR_.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-e5I2zTMf.js";import"./barnetUtils-DivX2dRP.js";import"./hvemHarRettUtils-DWIuzgeF.js";import"./ArbeidssituasjonSteg-uzya37GR.js";import"./BlueRadioGroup-D5uMiTlz.js";import"./customErrorFormatter-BEqNIfu-.js";import"./PlanleggerStepPage-Dxisglj3.js";import"./satserUtils-CwLnkIbJ.js";import"./useScrollBehaviour-Bicil2po.js";import"./Spacer-B8WdgPRK.js";import"./BarnehageplassSteg-BlUlucwk.js";import"./uttakUtils-B0glRu37.js";import"./BabyWrapped-BhxBax3O.js";import"./Information-DsibxvQU.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-Djpi-qzX.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BRAndV93.js";import"./HvorLangPeriodeSteg-BKMsMSvL.js";import"./PersonGroup-Df04UVcg.js";import"./HvorMyeSteg-tlQRtT_I.js";import"./Wallet-B6Fcob33.js";import"./OmBarnetSteg-8WpErZCi.js";import"./TasklistStart-D60ZZMzr.js";import"./OmPlanleggerenSteg-CFmMBPEF.js";import"./OppsummeringSteg-B6ufHI3e.js";import"./ShareDataInfobox-RyH9TwYd.js";import"./CalendarLabels-DQSTqFRP.js";import"./CalendarIconLabel-fNUrtA7C.js";import"./FamiliehendelseLabel-9vbqsCcO.js";import"./PlanenDeresSteg-CRE_ZhtY.js";import"./OmÅTilpassePlanen-Bcn_7I7z.js";import"./PersonPregnant-5V8m-Wrx.js";import"./PencilWriting-DGIqcUpd.js";import"./UforutsetteEndringer-CZcC62og.js";import"./ToggleGroup-DEQH1axi.js";import"./TilpassPlanenSteg-BwlYy0GT.js";import"./HvaErMulig-BF7_OyAC.js";const A={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ht={title:"PlanleggerDataFetcher",component:m,decorators:[F],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),j=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(j)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(R.StrictMode,{children:n.jsx(E,{children:n.jsx(T,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(y,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(A)),r.get(".//rest/satser",()=>o.json(v))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(v))]}}};var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
