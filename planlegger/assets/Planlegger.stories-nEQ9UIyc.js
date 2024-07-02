import{j as t}from"./VStack-WHXoK350.js";import{P as k}from"./usePlanleggerNavigator-Ccj4KIMB.js";import{P as l,g as u,M as f,a,B as h}from"./Planlegger-o18QMHba.js";import{r as M}from"./index-DVXBtNgz.js";import{S as e}from"./uttakUtils-CJz5obiz.js";import"./Label-8FC7ZTne.js";import{i as x}from"./Arbeidssituasjon-C6VIUH-J.js";import{n as v,u as s,e as y,a as F}from"./nn_NO-D-eUOL0r.js";import{I as P,E as R}from"./Infobox-DetgtEDk.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-CBBhcrhA.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-Cbx7Fas8.js";import"./hvemHarRettUtils-BWxL3CeN.js";import"./ArbeidssituasjonSteg-CyEHnsi-.js";import"./BlueRadioGroup-BNnnkB5D.js";import"./StepButtonsHookForm-3IFWmRNg.js";import"./Calendar-BZZfWk4Z.js";import"./Responsive-DsVdjnOq.js";import"./ArrowLeft-Dtu47hhV.js";import"./PlanleggerStepPage-wobah_yV.js";import"./satserUtils-I5pzhzLQ.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-Cv2DEzG7.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DKy7pBfm.js";import"./HvorLangPeriodeSteg-BkZKKqoP.js";import"./PersonGroup-Cfb_4mVh.js";import"./OmBarnetSteg-BE6TQuDp.js";import"./TasklistStart-B0h6AqDi.js";import"./OmPlanleggerenSteg-D-1v-wyv.js";import"./OppsummeringSteg-Di_4gOSn.js";import"./ExpansionCard-sDrg31LY.js";import"./kalenderPerioderUtils-BIZzUdhK.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-D6oCVI_Q.js";import"./PlanenDeresSteg-C88fLtts.js";import"./OmÅTilpassePlanen-Cye1kmRf.js";import"./BabyWrapped-BuBGhlxi.js";import"./PersonPregnant-CPShOP20.js";import"./UforutsetteEndringer-B9NR10-s.js";import"./Information-CMXdOA2t.js";import"./extends-CF3RwP-h.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const E={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},S={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},b={...F,...s.nb},w={nb:b,nn:{...v,...s.nn},en:{...y,...s.en}},ye={title:"PlanleggerDataFetcher",component:l},n={render:m=>{x();const c=u(),o=new f(c);return m.brukMocks?(o.onPost("/rest/konto").reply(()=>[200,E]),o.onGet("/rest/satser").reply(()=>[200,S])):(o.onPost("/rest/konto").reply(async r=>[200,(await a.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",r.data,{withCredentials:r.withCredentials,headers:r.headers,timeout:r.timeout})).data]),o.onGet("/rest/satser").reply(async r=>[200,(await a.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:r.headers,timeout:r.timeout})).data])),t.jsx(M.StrictMode,{children:t.jsx(P,{locale:"nb",messagesGroupedByLocale:w,children:t.jsx(R,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(h,{children:t.jsx(k,{initialState:{},children:t.jsx(l,{locale:"nb",changeLocale:()=>{}})})})})})})}};var i,p,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                        <BrowserRouter>
                            <PlanleggerDataContext initialState={{}}>
                                <PlanleggerDataFetcher locale="nb" changeLocale={() => undefined} />
                            </PlanleggerDataContext>
                        </BrowserRouter>
                    </ErrorBoundary>
                </IntlProvider>
            </StrictMode>;
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const Fe=["Default"];export{n as Default,Fe as __namedExportsOrder,ye as default};
