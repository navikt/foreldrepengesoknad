import{j as n}from"./VStack-WHXoK350.js";import{B as g,E as k,b as f,g as M,M as x,a as E}from"./Planlegger-Unb1lPIO.js";import{r as s}from"./index-DVXBtNgz.js";import{S as o}from"./uttakUtils-BHa5NTlE.js";import{d as u}from"./Label-fr1ceDiJ.js";import{l as b,i as h}from"./Arbeidssituasjon-D_CF5PSD.js";import{n as F,u as p,e as A,a as w}from"./nn_NO-CrackIzD.js";import{I as S,E as v,g as y}from"./Infobox-7mLdiqNb.js";import"./index-Cbx7Fas8.js";import"./usePlanleggerNavigator-B67pSNYQ.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-CBBhcrhA.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-3zT87B9U.js";import"./ArbeidssituasjonSteg-napAbDed.js";import"./GreenRadioGroup-Dx44FPGB.js";import"./StepButtonsHookForm-C_347iV_.js";import"./Calendar-BZZfWk4Z.js";import"./Responsive-HyoBSi69.js";import"./ArrowLeft-Dtu47hhV.js";import"./PlanleggerStepPage-BtPOCpCn.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Checkmark-DT9WXbuU.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-DKPo_kGU.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DdSQbr6L.js";import"./HvorLangPeriodeSteg-CFqjLu4B.js";import"./PersonGroup-Cfb_4mVh.js";import"./OmBarnetSteg-o7Kdse7v.js";import"./TasklistStart-B0h6AqDi.js";import"./OmPlanleggerenSteg-5byRiGKN.js";import"./OppsummeringSteg-TNRHxA3i.js";import"./ExpansionCard-PVIXc2u6.js";import"./kalenderPerioderUtils-BQ78x_wt.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-Kg_7YD94.js";import"./PlanenDeresSteg-q0F0TZki.js";import"./OmÅTilpassePlanen-Bc10ehXD.js";import"./BabyWrapped-BuBGhlxi.js";import"./PersonPregnant-CPShOP20.js";import"./UforutsetteEndringer-CMRXXUHa.js";import"./Information-CMXdOA2t.js";import"./extends-CF3RwP-h.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const j="From {fom} until {tom}",C={tidsperiode:j,"tidsperiode.kort":"{fom} - {tom}"},P="Fra {fom} til {tom}",I={tidsperiode:P,"tidsperiode.kort":"{fom} - {tom}"},R="Frå {fom} til {tom}",_={tidsperiode:R,"tidsperiode.kort":"{fom} - {tom}"},L=e=>{const r=s.useRef(e);s.useEffect(()=>{r.current=e},[e]),s.useEffect(()=>(window.addEventListener("beforeunload",r.current),()=>window.removeEventListener("beforeunload",r.current)),[])},B={nb:I,nn:_,en:C},$={...w,...p.nb,...B.nb},D={nb:$,nn:{...F,...p.nn},en:{...A,...p.en}},T=()=>{const e="nb";return u.locale(e),e},d=()=>{const[e,r]=s.useState(T());L(()=>{b("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const a=s.useCallback(t=>{r(t),u.locale(t),document.documentElement.setAttribute("lang",t)},[]);return n.jsx(S,{locale:e,messagesGroupedByLocale:D,children:n.jsx(v,{appName:"Foreldrepengeplanlegger",customErrorPage:n.jsx(y,{}),children:n.jsx(g,{basename:k.PUBLIC_PATH,children:n.jsx(f,{locale:e,changeLocale:a})})})})};d.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const G={100:{kontoer:[{konto:o.Mødrekvote,dager:75},{konto:o.Fedrekvote,dager:75},{konto:o.Fellesperiode,dager:80},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:o.Mødrekvote,dager:95},{konto:o.Fedrekvote,dager:95},{konto:o.Fellesperiode,dager:90},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},_e={title:"AppContainer",component:d},i={render:e=>{h();const r=M(),a=new x(r);return e.brukStønadskontoMock?a.onPost("/rest/konto").reply(()=>[200,G]):a.onPost("/rest/konto").reply(async t=>[200,(await E.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),n.jsx(s.StrictMode,{children:n.jsx(d,{})})}};var m,c,l;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    initAmplitude();
    const axiosInstance = getAxiosInstance();
    const apiMock = new MockAdapter(axiosInstance);
    if (args.brukStønadskontoMock) {
      apiMock.onPost('/rest/konto').reply(() => {
        return [200, kontoer];
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
    }
    return <StrictMode>
                <AppContainer />
            </StrictMode>;
  }
}`,...(l=(c=i.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Le=["Default"];export{i as Default,Le as __namedExportsOrder,_e as default};
