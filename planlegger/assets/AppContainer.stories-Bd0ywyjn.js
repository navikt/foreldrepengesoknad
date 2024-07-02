import{j as n}from"./VStack-WHXoK350.js";import{B as f,E as M,b as h,g as v,M as x,a as m}from"./Planlegger-BhHxwA0U.js";import{r as a}from"./index-DVXBtNgz.js";import{S as r}from"./uttakUtils-DCxTe1uH.js";import{d as g}from"./Label-BBmAl76u.js";import{l as E,i as b}from"./Arbeidssituasjon-DNFOV-TE.js";import{n as y,u as p,e as F,a as w}from"./nn_NO-BWiVF6s-.js";import{I as A,E as R,g as j}from"./Infobox-BMmsyKnh.js";import"./index-Cbx7Fas8.js";import"./usePlanleggerNavigator-B_92Fadh.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-0Y6AdyIq.js";import"./ArbeidssituasjonSteg-CMgCUtC8.js";import"./BlueRadioGroup-CFRIzo2f.js";import"./StepButtonsHookForm-BQqPUx0E.js";import"./Calendar-BZZfWk4Z.js";import"./Responsive-csOMP1Pu.js";import"./ArrowLeft-Dtu47hhV.js";import"./PlanleggerStepPage-CadhnVxY.js";import"./satserUtils-D51Ayq0J.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-mzdbvsQL.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-DgdgpeMW.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-5IYvMCL0.js";import"./HvorLangPeriodeSteg-CAODts8f.js";import"./PersonGroup-Cfb_4mVh.js";import"./OmBarnetSteg-RdMyRHlK.js";import"./TasklistStart-B0h6AqDi.js";import"./OmPlanleggerenSteg-B8yFDCdA.js";import"./OppsummeringSteg-BkEextNa.js";import"./ExpansionCard-FN5rH6jV.js";import"./kalenderPerioderUtils-DGBw-U_Y.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-CXyjL9LR.js";import"./PlanenDeresSteg-BXxVdU1t.js";import"./OmÅTilpassePlanen-C1UQWc20.js";import"./BabyWrapped-BuBGhlxi.js";import"./PersonPregnant-CPShOP20.js";import"./UforutsetteEndringer-CzjIIWSU.js";import"./Information-CMXdOA2t.js";import"./extends-CF3RwP-h.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const C="From {fom} until {tom}",P={tidsperiode:C,"tidsperiode.kort":"{fom} - {tom}"},S="Fra {fom} til {tom}",I={tidsperiode:S,"tidsperiode.kort":"{fom} - {tom}"},_="Frå {fom} til {tom}",L={tidsperiode:_,"tidsperiode.kort":"{fom} - {tom}"},B=e=>{const o=a.useRef(e);a.useEffect(()=>{o.current=e},[e]),a.useEffect(()=>(window.addEventListener("beforeunload",o.current),()=>window.removeEventListener("beforeunload",o.current)),[])},G={nb:I,nn:L,en:P},$={...w,...p.nb,...G.nb},D={nb:$,nn:{...y,...p.nn},en:{...F,...p.en}},T=()=>{const e="nb";return g.locale(e),e},d=()=>{const[e,o]=a.useState(T());B(()=>{E("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const s=a.useCallback(t=>{o(t),g.locale(t),document.documentElement.setAttribute("lang",t)},[]);return n.jsx(A,{locale:e,messagesGroupedByLocale:D,children:n.jsx(R,{appName:"Foreldrepengeplanlegger",customErrorPage:n.jsx(j,{}),children:n.jsx(f,{basename:M.PUBLIC_PATH,children:n.jsx(h,{locale:e,changeLocale:s})})})})};d.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const N={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},O={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},Be={title:"AppContainer",component:d},i={render:e=>{b();const o=v(),s=new x(o);return e.brukMocks?(s.onPost("/rest/konto").reply(()=>[200,N]),s.onGet("/rest/satser").reply(()=>[200,O])):(s.onPost("/rest/konto").reply(async t=>[200,(await m.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),s.onGet("/rest/satser").reply(async t=>[200,(await m.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:t.headers,timeout:t.timeout})).data])),n.jsx(a.StrictMode,{children:n.jsx(d,{})})}};var c,l,u;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
