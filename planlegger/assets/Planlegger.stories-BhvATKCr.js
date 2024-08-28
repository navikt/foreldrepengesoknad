import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{P as k}from"./usePlanleggerNavigator-jDt0wNwG.js";import{P as m,g as u,M as f,a,B as h}from"./Planlegger-CfrMZwMS.js";import{r as M}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-OWE-GiZC.js";import"./Label-Gfmvfmi8.js";import{i as x}from"./Arbeidssituasjon-CAHwRJI2.js";import{n as v,u as s,e as y,a as F}from"./nn_NO-BnVmvcXE.js";import{I as P,E as R}from"./Infobox-DVjx-NGR.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-9r8iugjR.js";import"./hvemHarRettUtils-tzuypzxl.js";import"./ArbeidssituasjonSteg-Dw5wSkw_.js";import"./BlueRadioGroup-BUdnxEis.js";import"./StepButtonsHookForm-BYB95tLj.js";import"./VStack-BOynvu-T.js";import"./Calendar-BSTiMy7q.js";import"./Responsive-CQFMNo-p.js";import"./ArrowLeft-KWMC2j3U.js";import"./PlanleggerStepPage-BRIf6pRN.js";import"./satserUtils-D1SQv_MC.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-CRQH3sGQ.js";import"./Spacer-BW3tgveW.js";import"./FordelingSteg-BO6l_HPZ.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DFV6NkFO.js";import"./HvorLangPeriodeSteg-CUz7PNKp.js";import"./PersonGroup-D_DyOkqX.js";import"./OmBarnetSteg-Dmn_FM3T.js";import"./TasklistStart-D-d1-_O9.js";import"./OmPlanleggerenSteg-yhS4_V0G.js";import"./OppsummeringSteg-Cy_M0PDy.js";import"./ExpansionCard-By81LWUv.js";import"./kalenderPerioderUtils-D21Rn_hm.js";import"./CalendarIconLabel-DLHk2Wi7.js";import"./FamiliehendelseLabel-B_I5S8Sy.js";import"./PlanenDeresSteg-BC9CUMsH.js";import"./OmÅTilpassePlanen-mo1P-JWh.js";import"./BabyWrapped-BEcH1H8s.js";import"./PersonPregnant-CmbINfC2.js";import"./UforutsetteEndringer-Dq51YtlK.js";import"./Information-3Bc-kubE.js";import"./tslib.es6-pJfR_DrR.js";import"./index-BRV0Se7Z.js";const E={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},S={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},b={...F,...s.nb},w={nb:b,nn:{...v,...s.nn},en:{...y,...s.en}},Fe={title:"PlanleggerDataFetcher",component:m},n={render:l=>{x();const c=u(),o=new f(c);return l.brukMocks?(o.onPost("/rest/konto").reply(()=>[200,E]),o.onGet("/rest/satser").reply(()=>[200,S])):(o.onPost("/rest/konto").reply(async r=>[200,(await a.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",r.data,{withCredentials:r.withCredentials,headers:r.headers,timeout:r.timeout})).data]),o.onGet("/rest/satser").reply(async r=>[200,(await a.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:r.headers,timeout:r.timeout})).data])),t.jsx(M.StrictMode,{children:t.jsx(P,{locale:"nb",messagesGroupedByLocale:w,children:t.jsx(R,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(h,{children:t.jsx(k,{initialState:{},children:t.jsx(m,{locale:"nb",changeLocale:()=>{}})})})})})})}};var i,p,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const Pe=["Default"];export{n as Default,Pe as __namedExportsOrder,Fe as default};
