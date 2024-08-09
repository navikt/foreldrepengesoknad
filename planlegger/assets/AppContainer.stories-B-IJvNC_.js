import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{B as f,E as M,b as h,g as v,M as x,a as m}from"./Planlegger-B_eFd1bs.js";import{r as a}from"./index-CTjT7uj6.js";import{S as r}from"./uttakUtils-BJDqa1rw.js";import{d as g}from"./Label-cZWDpmVx.js";import{l as b,i as y}from"./Arbeidssituasjon-CtvZIwEe.js";import{n as E,u as p,e as F,a as w}from"./nn_NO-CJF1g305.js";import{I as A,E as R,f as C}from"./Infobox-CIm8wbwz.js";import"./index-9r8iugjR.js";import"./usePlanleggerNavigator-v6etJ_5l.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-C3RMR-i3.js";import"./ArbeidssituasjonSteg-D4DDWYyC.js";import"./BlueRadioGroup-D7seneZg.js";import"./StepButtonsHookForm-DzN-gnL3.js";import"./VStack-BTp1Z9Zd.js";import"./Calendar-B_DGIy38.js";import"./useCallbackRef-Ds8NZ9D5.js";import"./Responsive-DpCLtDyH.js";import"./ArrowLeft-B9M5uQgf.js";import"./PlanleggerStepPage-68oBhdxt.js";import"./satserUtils-C-yW1OKK.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-CS4WEBxz.js";import"./Spacer-BW3tgveW.js";import"./FordelingSteg-m-d7sb-i.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-wGHYLxUq.js";import"./HvorLangPeriodeSteg-CDHrtJQT.js";import"./PersonGroup-sMP7i3QT.js";import"./OmBarnetSteg-Dm6nXrzE.js";import"./TasklistStart-Duqoxn30.js";import"./OmPlanleggerenSteg-Ba77sz-y.js";import"./OppsummeringSteg-HGBv8_JF.js";import"./ExpansionCard-DQpw5XxX.js";import"./kalenderPerioderUtils-BIPQV847.js";import"./CalendarIconLabel-DTsIPpi-.js";import"./FamiliehendelseLabel-Dt6gIiBe.js";import"./PlanenDeresSteg-BtOHk0gN.js";import"./OmÅTilpassePlanen-D5u3ipNc.js";import"./BabyWrapped-BL47-253.js";import"./PersonPregnant-DFjb3V6g.js";import"./UforutsetteEndringer-DA4wy___.js";import"./Information-RqxmfIOz.js";import"./tslib.es6-CMwweBXX.js";import"./index-BRV0Se7Z.js";const j="From {fom} until {tom}",P={tidsperiode:j,"tidsperiode.kort":"{fom} - {tom}"},S="Fra {fom} til {tom}",I={tidsperiode:S,"tidsperiode.kort":"{fom} - {tom}"},_="Frå {fom} til {tom}",L={tidsperiode:_,"tidsperiode.kort":"{fom} - {tom}"},B=e=>{const o=a.useRef(e);a.useEffect(()=>{o.current=e},[e]),a.useEffect(()=>(window.addEventListener("beforeunload",o.current),()=>window.removeEventListener("beforeunload",o.current)),[])},G={nb:I,nn:L,en:P},$={...w,...p.nb,...G.nb},D={nb:$,nn:{...E,...p.nn},en:{...F,...p.en}},T=()=>{const e="nb";return g.locale(e),e},d=()=>{const[e,o]=a.useState(T());B(()=>{b("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const s=a.useCallback(t=>{o(t),g.locale(t),document.documentElement.setAttribute("lang",t)},[]);return n.jsx(A,{locale:e,messagesGroupedByLocale:D,children:n.jsx(R,{appName:"Foreldrepengeplanlegger",customErrorPage:n.jsx(C,{retryCallback:()=>location.reload()}),children:n.jsx(f,{basename:M.PUBLIC_PATH,children:n.jsx(h,{locale:e,changeLocale:s})})})})};d.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const N={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},O={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},Ge={title:"AppContainer",component:d},i={render:e=>{y();const o=v(),s=new x(o);return e.brukMocks?(s.onPost("/rest/konto").reply(()=>[200,N]),s.onGet("/rest/satser").reply(()=>[200,O])):(s.onPost("/rest/konto").reply(async t=>[200,(await m.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),s.onGet("/rest/satser").reply(async t=>[200,(await m.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:t.headers,timeout:t.timeout})).data])),n.jsx(a.StrictMode,{children:n.jsx(d,{})})}};var c,l,u;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => {
    initAmplitude();
    const axiosInstance = getAxiosInstance();
    const apiMock = new MockAdapter(axiosInstance);
    if (args.brukMocks) {
      apiMock.onPost('/rest/konto').reply(() => {
        return [200, kontoer];
      });
      apiMock.onGet('/rest/satser').reply(() => {
        return [200, satser];
      });
    } else {
      apiMock.onPost('/rest/konto').reply(async config => {
        const redirectResponse = await axios.create().post('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', config.data, {
          withCredentials: config.withCredentials,
          headers: config.headers,
          timeout: config.timeout
        });
        return [200, redirectResponse.data];
      });
      apiMock.onGet('/rest/satser').reply(async config => {
        const redirectResponse = await axios.create().get('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser', {
          headers: config.headers,
          timeout: config.timeout
        });
        return [200, redirectResponse.data];
      });
    }
    return <StrictMode>
                <AppContainer />
            </StrictMode>;
  }
}`,...(u=(l=i.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const $e=["Default"];export{i as Default,$e as __namedExportsOrder,Ge as default};
