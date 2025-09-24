import{w as c,j as n,r as k,E as g,l as t}from"./iframe-DQRi85mc.js";import{M as S,P as u}from"./usePlanleggerNavigator-DCKhgGRz.js";import{h as r,a as m,H as o}from"./Planlegger-DMxKYYWv.js";import{D as d}from"./satserUtils-Cka210ka.js";import"./preload-helper-D9Z9MdNV.js";import"./routes-Cyl7_Mgv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-hHJczd2i.js";import"./barnetUtils-D7nAA-xm.js";import"./hvemHarRettUtils-CWEO9m2x.js";import"./ArbeidssituasjonSteg-RKO4ahYj.js";import"./BlueRadioGroup-DEAOYVGe.js";import"./customErrorFormatter-Cc5hQuvR.js";import"./PlanleggerStepPage-Bdtv9K4e.js";import"./useScrollBehaviour-BiJ2i2JH.js";import"./Spacer-BSmbC52l.js";import"./BarnehageplassSteg-CCy8r2I5.js";import"./uttakUtils-Bee84jvp.js";import"./BabyWrapped-5VyqwlMU.js";import"./Information-BiPyaRRC.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FordelingSteg-CYjS3gmH.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-8_fCYvLr.js";import"./HvorLangPeriodeSteg-B19RityI.js";import"./PersonGroup-Ck1Lurtn.js";import"./HvorMyeSteg-ClzHINgV.js";import"./Wallet-CsH_KIGZ.js";import"./OmBarnetSteg-DKcXGC7F.js";import"./TasklistStart-D_kLa2hi.js";import"./OmPlanleggerenSteg-B0hO2qRw.js";import"./OppsummeringSteg-CpgyowcZ.js";import"./ShareDataInfobox-B2Wu55lT.js";import"./CalendarLabels-DDJd-luL.js";import"./CalendarIconLabel-Dh5Jt6N4.js";import"./FamiliehendelseLabel-rKP8XDyy.js";import"./PlanenDeresSteg-CMskzufw.js";import"./OmÅTilpassePlanen-C2aXlcGP.js";import"./PersonPregnant-BoNMk070.js";import"./PencilWriting-rCSKO06v.js";import"./UforutsetteEndringer-Lv2GrfZ0.js";import"./ToggleGroup-CKmLERH9.js";import"./TilpassPlanenSteg-CXeEOM8U.js";import"./HvaErMulig-Wmyi3e3c.js";const f={100:{kontoer:[{konto:t.Mødrekvote,dager:75},{konto:t.Fedrekvote,dager:75},{konto:t.Fellesperiode,dager:80},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.Mødrekvote,dager:95},{konto:t.Fedrekvote,dager:95},{konto:t.Fellesperiode,dager:90},{konto:t.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},dt={title:"PlanleggerDataFetcher",component:m,decorators:[c],parameters:{msw:{handlers:[r.post(".//rest/konto",async({request:i})=>{const p=await i.json(),l=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(p),method:"POST",headers:{"Content-Type":"application/json"}})).json();return o.json(l)}),r.get(".//rest/satser",async()=>{const p=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return o.json(p)})]}},render:()=>n.jsx(k.StrictMode,{children:n.jsx(S,{children:n.jsx(g,{appName:"planlegger",retryCallback:()=>{},children:n.jsx(u,{initialState:{},children:n.jsx(m,{})})})})})},e={args:{changeLocale:()=>{},locale:"nb"}},s={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json(f)),r.get(".//rest/satser",()=>o.json(d))]}}},a={...e,parameters:{msw:{handlers:[r.post(".//rest/konto",()=>o.json({100:{kontoer:[{konto:t.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:t.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}})),r.get(".//rest/satser",()=>o.json(d))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
