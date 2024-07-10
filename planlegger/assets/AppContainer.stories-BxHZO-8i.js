import{j as n}from"./VStack-CUK_170J.js";import{B as f,E as M,b as h,g as v,M as x,a as m}from"./Planlegger-NnwnwCxv.js";import{r as a}from"./index-DVXBtNgz.js";import{S as r}from"./uttakUtils-CMk_3sxY.js";import{d as g}from"./Label-CID3Cstt.js";import{l as b,i as y}from"./Arbeidssituasjon-Bv5qmZXZ.js";import{n as E,u as p,e as F,a as w}from"./nn_NO-DkaPsbrY.js";import{I as A,E as R,f as C}from"./Infobox-C9xVbVLy.js";import"./index-Cbx7Fas8.js";import"./usePlanleggerNavigator--ivN0HFz.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-tuYFdP_1.js";import"./ArbeidssituasjonSteg-Dkpn6ekw.js";import"./BlueRadioGroup-COEOYHsZ.js";import"./StepButtonsHookForm-BTvbgS1l.js";import"./Calendar-9kL8-203.js";import"./useCallbackRef-BwGyppiy.js";import"./Responsive-Btp1HK0W.js";import"./ArrowLeft-CWx9JlvR.js";import"./PlanleggerStepPage-rhW8hRYv.js";import"./satserUtils-9xrd151Q.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-DZQNITUT.js";import"./Spacer-CsVIbW7M.js";import"./FordelingSteg-CCkotkBt.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Bsbfzvzz.js";import"./HvorLangPeriodeSteg-CPxJqMF4.js";import"./PersonGroup-B7ZUyNHa.js";import"./OmBarnetSteg-BkuM6RAJ.js";import"./TasklistStart-0028vx3K.js";import"./OmPlanleggerenSteg-cdmTjT_1.js";import"./OppsummeringSteg-C-9WJYpw.js";import"./ExpansionCard-B-Fv0RpH.js";import"./kalenderPerioderUtils-BuK3nbRC.js";import"./CalendarIconLabel-BM4LZRTl.js";import"./FamiliehendelseLabel-DYmoRR90.js";import"./PlanenDeresSteg-BnAsy3G6.js";import"./OmÅTilpassePlanen-Cep8bi9t.js";import"./BabyWrapped-BjxzPTIC.js";import"./PersonPregnant-srm2wUW7.js";import"./UforutsetteEndringer-DiXBwpYK.js";import"./Information-7yXFVef7.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const j="From {fom} until {tom}",P={tidsperiode:j,"tidsperiode.kort":"{fom} - {tom}"},S="Fra {fom} til {tom}",I={tidsperiode:S,"tidsperiode.kort":"{fom} - {tom}"},_="Frå {fom} til {tom}",L={tidsperiode:_,"tidsperiode.kort":"{fom} - {tom}"},B=e=>{const o=a.useRef(e);a.useEffect(()=>{o.current=e},[e]),a.useEffect(()=>(window.addEventListener("beforeunload",o.current),()=>window.removeEventListener("beforeunload",o.current)),[])},G={nb:I,nn:L,en:P},$={...w,...p.nb,...G.nb},D={nb:$,nn:{...E,...p.nn},en:{...F,...p.en}},T=()=>{const e="nb";return g.locale(e),e},d=()=>{const[e,o]=a.useState(T());B(()=>{b("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const s=a.useCallback(t=>{o(t),g.locale(t),document.documentElement.setAttribute("lang",t)},[]);return n.jsx(A,{locale:e,messagesGroupedByLocale:D,children:n.jsx(R,{appName:"Foreldrepengeplanlegger",customErrorPage:n.jsx(C,{retryCallback:()=>location.reload()}),children:n.jsx(f,{basename:M.PUBLIC_PATH,children:n.jsx(h,{locale:e,changeLocale:s})})})})};d.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const N={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},O={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},Be={title:"AppContainer",component:d},i={render:e=>{y();const o=v(),s=new x(o);return e.brukMocks?(s.onPost("/rest/konto").reply(()=>[200,N]),s.onGet("/rest/satser").reply(()=>[200,O])):(s.onPost("/rest/konto").reply(async t=>[200,(await m.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),s.onGet("/rest/satser").reply(async t=>[200,(await m.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:t.headers,timeout:t.timeout})).data])),n.jsx(a.StrictMode,{children:n.jsx(d,{})})}};var c,l,u;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(l=i.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ge=["Default"];export{i as Default,Ge as __namedExportsOrder,Be as default};
