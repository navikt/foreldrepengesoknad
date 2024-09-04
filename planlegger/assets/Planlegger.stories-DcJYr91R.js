import{j as t}from"./VStack-Bypcsavb.js";import{P as k}from"./usePlanleggerNavigator-BjdIcytp.js";import{P as l,g as u,M as f,a as n,B as h}from"./Planlegger-OWrmmNcu.js";import{r as M}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-BrvxP9lU.js";import"./Label-DrVT6kL1.js";import{i as x}from"./Arbeidssituasjon-C_G5ELv8.js";import{n as v,u as a,e as y,a as F}from"./nn_NO-BXySWE7y.js";import{I as P,E as R}from"./Infobox-DOCbJzrs.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-CYM-y3Gt.js";import"./hvemHarRettUtils-HGT9ntnp.js";import"./ArbeidssituasjonSteg-B3ASC_jj.js";import"./BlueRadioGroup-BnU-S6YF.js";import"./StepButtonsHookForm-B7I0tWB8.js";import"./Calendar-CdedEl02.js";import"./Responsive-CMY18hyE.js";import"./ArrowLeft-C03Jdrb8.js";import"./PlanleggerStepPage-Dnf73nKI.js";import"./satserUtils-C65OlwZv.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-CknwOGzw.js";import"./Spacer-BW3tgveW.js";import"./FordelingSteg-B0PlkJ9z.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-Chc7nMZg.js";import"./HvorLangPeriodeSteg-DDvfgimQ.js";import"./PersonGroup-BZgbcndd.js";import"./OmBarnetSteg-BENkIDCt.js";import"./TasklistStart-Di7ZrbYl.js";import"./OmPlanleggerenSteg-BmBmLwPt.js";import"./OppsummeringSteg-49biC1s7.js";import"./ExpansionCard-CsmgqR51.js";import"./kalenderPerioderUtils-D7KIMJxi.js";import"./CalendarIconLabel-Dcpp4ieL.js";import"./FamiliehendelseLabel-Cq-Hyj2B.js";import"./PlanenDeresSteg-jq2Xs7sL.js";import"./OmÅTilpassePlanen-DDf36brG.js";import"./BabyWrapped-D30skVMZ.js";import"./PersonPregnant-DOvTPghS.js";import"./UforutsetteEndringer-BQExmRmI.js";import"./Information-t3hv7DAC.js";import"./index-BRV0Se7Z.js";const E={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},S={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},b={...F,...a.nb},w={nb:b,nn:{...v,...a.nn},en:{...y,...a.en}},ve={title:"PlanleggerDataFetcher",component:l},s={render:c=>{x();const m=u(),o=new f(m);return c.brukMocks?(o.onPost("/rest/konto").reply(()=>[200,E]),o.onGet("/rest/satser").reply(()=>[200,S])):(o.onPost("/rest/konto").reply(async r=>[200,(await n.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",r.data,{withCredentials:r.withCredentials,headers:r.headers,timeout:r.timeout})).data]),o.onGet("/rest/satser").reply(async r=>[200,(await n.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:r.headers,timeout:r.timeout})).data])),t.jsx(M.StrictMode,{children:t.jsx(P,{locale:"nb",messagesGroupedByLocale:w,children:t.jsx(R,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(h,{children:t.jsx(k,{initialState:{},children:t.jsx(l,{locale:"nb",changeLocale:()=>{}})})})})})})}};var i,p,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const ye=["Default"];export{s as Default,ye as __namedExportsOrder,ve as default};
