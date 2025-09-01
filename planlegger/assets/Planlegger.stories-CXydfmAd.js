import{w as c,j as n,r as k,E as g,l as t}from"./iframe-B4V4OSzL.js";import{M as S,P as u}from"./usePlanleggerNavigator-CeTkxojr.js";import{h as r,a as m,H as o}from"./Planlegger-D7AVTeEM.js";import{D as d}from"./satserUtils-Bg_hiCeX.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DLjfmPBC.js";import"./barnetUtils-DgXTdjKu.js";import"./hvemHarRettUtils-lbU75gHu.js";import"./ArbeidssituasjonSteg-CET6Tq6F.js";import"./BlueRadioGroup-k7bciE_N.js";import"./customErrorFormatter-oLWwrgyQ.js";import"./PlanleggerStepPage-fh4Xz54x.js";import"./useScrollBehaviour-0ez-Nq_N.js";import"./Spacer-C7aVEYAb.js";import"./BarnehageplassSteg-edckvvVP.js";import"./uttakUtils-DvnUTZBC.js";import"./BabyWrapped-CwczJ19m.js";import"./Information-C3CcdfwK.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-BNI2umR1.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DMd1oxat.js";import"./HvorLangPeriodeSteg-Z1Rnyg3I.js";import"./PersonGroup-BcYCCZkV.js";import"./HvorMyeSteg-ySvJse9V.js";import"./Wallet-BIpciQc7.js";import"./OmBarnetSteg-CSiHm4qT.js";import"./TasklistStart-DAtBEwiz.js";import"./OmPlanleggerenSteg-DJKIG4G8.js";import"./OppsummeringSteg-BXSZJYLk.js";import"./ShareDataInfobox-C9GG-voo.js";import"./CalendarLabels-BaD_i-9A.js";import"./CalendarIconLabel-BuoCPWgl.js";import"./FamiliehendelseLabel-DC7IYUqm.js";import"./PlanenDeresSteg-o2SiQWnq.js";import"./OmÅTilpassePlanen-Cnjz8ylR.js";import"./PersonPregnant-BO8Fvb03.js";import"./PencilWriting-DGhFVTzM.js";import"./UforutsetteEndringer-D_SrJcy0.js";import"./ToggleGroup-CJjaBBbg.js";import"./TilpassPlanenSteg-DX8pZtrg.js";import"./HvaErMulig-CXGqf7yz.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
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
      } as TilgjengeligeStønadskontoer)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  }
}`,...a.parameters?.docs?.source}}};const lt=["Default","DefaultMockaStønadskontoerOgSatser","FarFarMockaStønadskontoerOgSatser"];export{e as Default,s as DefaultMockaStønadskontoerOgSatser,a as FarFarMockaStønadskontoerOgSatser,lt as __namedExportsOrder,dt as default};
