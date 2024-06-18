import{j as n}from"./VStack-WHXoK350.js";import{B as g,E as k,b as f,g as M,M as x,a as E}from"./Planlegger-Bmcbc_Mx.js";import{r as s}from"./index-DVXBtNgz.js";import{S as o}from"./uttakUtils-Bwre5uei.js";import{d as u}from"./Label-fr1ceDiJ.js";import{l as b,i as h}from"./Arbeidssituasjon-CN0FLUdg.js";import{n as F,u as p,e as A,a as w}from"./nn_NO-CqX4i02I.js";import{I as S,E as v,g as y}from"./Infobox-DsnShUVx.js";import"./index-Cbx7Fas8.js";import"./usePlanleggerNavigator-Dq-O5lYg.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-B2i4COBs.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-BA6nnELj.js";import"./ArbeidssituasjonSteg-DTprRSnt.js";import"./GreenRadioGroup-CBcYt_4L.js";import"./StepButtonsHookForm-fh8Q5j67.js";import"./Calendar-BZZfWk4Z.js";import"./Responsive-WWdcyc0t.js";import"./ArrowLeft-Dtu47hhV.js";import"./PlanleggerStepPage-XUVo4FBw.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Checkmark-DT9WXbuU.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-T5X5TpOq.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BMCl5NQa.js";import"./HvorLangPeriodeSteg-1UJhQUr-.js";import"./PersonGroup-Cfb_4mVh.js";import"./OmBarnetSteg-KKXjkXg2.js";import"./TasklistStart-B0h6AqDi.js";import"./OmPlanleggerenSteg-BNHpJx9_.js";import"./OppsummeringSteg-D8U2Vaa5.js";import"./ExpansionCard-rVhYZxvQ.js";import"./kalenderPerioderUtils-DivcWZc5.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-DTN_qf_m.js";import"./PlanenDeresSteg-C-clieCL.js";import"./OmÅTilpassePlanen-BvAJr-oU.js";import"./BabyWrapped-BuBGhlxi.js";import"./PersonPregnant-CPShOP20.js";import"./UforutsetteEndringer-8lwbN6uY.js";import"./Information-CMXdOA2t.js";import"./extends-CF3RwP-h.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const j="From {fom} until {tom}",C={tidsperiode:j,"tidsperiode.kort":"{fom} - {tom}"},P="Fra {fom} til {tom}",I={tidsperiode:P,"tidsperiode.kort":"{fom} - {tom}"},R="Frå {fom} til {tom}",_={tidsperiode:R,"tidsperiode.kort":"{fom} - {tom}"},L=e=>{const r=s.useRef(e);s.useEffect(()=>{r.current=e},[e]),s.useEffect(()=>(window.addEventListener("beforeunload",r.current),()=>window.removeEventListener("beforeunload",r.current)),[])},B={nb:I,nn:_,en:C},$={...w,...p.nb,...B.nb},D={nb:$,nn:{...F,...p.nn},en:{...A,...p.en}},T=()=>{const e="nb";return u.locale(e),e},d=()=>{const[e,r]=s.useState(T());L(()=>{b("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"page-unload"})});const a=s.useCallback(t=>{r(t),u.locale(t),document.documentElement.setAttribute("lang",t)},[]);return n.jsx(S,{locale:e,messagesGroupedByLocale:D,children:n.jsx(v,{appName:"Foreldrepengeplanlegger",customErrorPage:n.jsx(y,{}),children:n.jsx(g,{basename:k.PUBLIC_PATH,children:n.jsx(f,{locale:e,changeLocale:a})})})})};d.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const G={100:{kontoer:[{konto:o.Mødrekvote,dager:75},{konto:o.Fedrekvote,dager:75},{konto:o.Fellesperiode,dager:80},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:o.Mødrekvote,dager:95},{konto:o.Fedrekvote,dager:95},{konto:o.Fellesperiode,dager:90},{konto:o.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},_e={title:"AppContainer",component:d},i={render:e=>{h();const r=M(),a=new x(r);return e.brukStønadskontoMock?a.onPost("/rest/konto").reply(()=>[200,G]):a.onPost("/rest/konto").reply(async t=>[200,(await E.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),n.jsx(s.StrictMode,{children:n.jsx(d,{})})}};var m,c,l;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
