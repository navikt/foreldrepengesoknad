import{j as F}from"./jsx-runtime-69eee039.js";import{w as Se}from"./withRouter-300d4136.js";import{w as Fe,F as Ae}from"./ForeldrepengerStateMock-3e3aa0d2.js";import{N as ce,A as le}from"./Næring-6c670a87.js";import{A as xe}from"./AxiosMock-4a00635f.js";import{_ as Ie}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{O as me}from"./Oppsummering-91895da5.js";import{b as o}from"./validationUtils-12868324.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-1fb11dfb.js";import"./useSøknad-7a4f4355.js";import"./mapSøkerinfoDTO-2a30620a.js";import"./AttachmentType-f6ad37cf.js";import"./Link-b834ea2b.js";import"./useSaveLoadedRoute-1b40cfe9.js";import"./amplitude-e7683f28.js";import"./api-f40a3af6.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-47cd0f64.js";import"./Periodene-2c8badc5.js";import"./useSøkerinfo-3f9a8644.js";import"./dateUtils-040bb87b.js";import"./arbeidsforholdUtils-8f723304.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-5ffc9a17.js";import"./leggTilPeriode-4fa1ab86.js";import"./Uttaksplan-bd2da629.js";import"./index-dcfe8f28.js";import"./FormikFileUploader-8be2bb54.js";import"./AttachmentList-28310eba.js";import"./Attachment-19c3638d.js";import"./links-b36d21ab.js";import"./formUtils-f076150c.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const ve=4,be="/soknad/uttaksplan-info",Oe=[],he=[],Ee={},Ne="undefined",je=!1,ye={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,uttaksplan:[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:"2021-11-23T23:00:00.000Z",tom:"2021-12-13T23:00:00.000Z"}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:"2021-12-14T23:00:00.000Z",tom:"2022-01-24T23:00:00.000Z"}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:"2022-01-25T23:00:00.000Z",tom:"2022-03-28T23:00:00.000Z"}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:"2022-03-29T23:00:00.000Z",tom:"2022-06-06T23:00:00.000Z"},ønskerSamtidigUttak:!1,gradert:!1}],tilleggsopplysninger:{},dekningsgrad:100,harGodkjentOppsummering:!0,vedlegg:[],ønskerJustertUttakVedFødsel:!1},version:ve,currentRoute:be,søknadGjelderEtNyttBarn:!0,saker:Oe,søkerinfo:{},perioderSomSkalSendesInn:he,kvittering:Ee,antallUkerIUttaksplan:Ne,harUttaksplanBlittSlettet:je,brukerSvarteJaPåAutoJustering:!1},gr={title:"steps/Oppsummering",component:me,decorators:[Se,Fe]},e=ye,r=Ie,n=({context:ge,søkerinfo:Me})=>{const fe=ue=>{ue.onPost("/storage").reply(200,void 0)};return F.jsx(xe,{mock:fe,children:F.jsx(Ae,{søknad:ge,søkerinfo:Me,children:F.jsx(me,{})})})},s=n.bind({});s.args={context:e,søkerinfo:r};const a=n.bind({});a.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const i=n.bind({});i.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!0},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1}}},søkerinfo:r};const d=n.bind({});d.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},tilleggsopplysninger:{begrunnelseForSenEndring:{tekst:"Utsettelsesgrunn"}}}},søkerinfo:r};const t=n.bind({});t.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const S=n.bind({});t.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1}}},søkerinfo:r};const k=n.bind({});k.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const p=n.bind({});p.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{...e.søknad.søkersituasjon,situasjon:"adopsjon"},barn:{type:"adoptertStebarn",antallBarn:1,adopsjonsdato:o("2021-10-01"),fødselsdatoer:[o("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},søkerinfo:r};const c=n.bind({});c.args={context:{...e,søknad:{...e.søknad,informasjonOmUtenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1,senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}],tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]}}},søkerinfo:r};const l=n.bind({});l.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:o("2019-01-01"),harJobbetForNærVennEllerFamilieSiste10Mnd:!1,oppdragForNæreVennerEllerFamilieSiste10Mnd:[]}}}},søkerinfo:{søker:{...r.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const m=n.bind({});m.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:o("2019-01-01"),harJobbetForNærVennEllerFamilieSiste10Mnd:!0,oppdragForNæreVennerEllerFamilieSiste10Mnd:[{navnPåArbeidsgiver:"Auto Joachim Bilpleie",pågående:!0,tidsperiode:{fom:o("2019-01-01")}},{navnPåArbeidsgiver:"Taco Express",pågående:!1,tidsperiode:{fom:o("2018-01-01"),tom:o("2021-01-01")}}]}}}},søkerinfo:r};const g=n.bind({});g.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:o("2018-01-01"),tom:o("2021-01-01")},næringstyper:[ce.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:o("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"},harRegnskapsfører:!0,regnskapsfører:{navn:"Espen Utvikler",telefonnummer:"555904233",erNærVennEllerFamilie:!0}}]}}},søkerinfo:r};const M=n.bind({});M.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:o("2018-01-01"),tom:o("2021-01-01")},næringstyper:[ce.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1,harRegnskapsfører:!1}]}}},søkerinfo:r};const f=n.bind({});f.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:le.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE"}]}}},søkerinfo:r};const u=n.bind({});u.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:le.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}]}}},søkerinfo:r};var A,x,I;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(I=(x=s.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var v,b,O;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(O=(b=a.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};var h,E,N;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(N=(E=i.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var j,y,P;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(P=(y=d.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var R,U,T;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(T=(U=t.parameters)==null?void 0:U.docs)==null?void 0:T.source}}};var J,B,D;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(D=(B=S.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var H,_,L;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(L=(_=k.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};var V,Z,K;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(K=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var w,G,Y;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(Y=(G=c.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var C,q,z;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(z=(q=l.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(X=(W=m.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var $,ee,re;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(re=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,oe,te;M.parameters={...M.parameters,docs:{...(ne=M.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(te=(oe=M.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var se,ae,ie;f.parameters={...f.parameters,docs:{...(se=f.parameters)==null?void 0:se.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(ie=(ae=f.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var de,ke,pe;u.parameters={...u.parameters,docs:{...(de=u.parameters)==null?void 0:de.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(pe=(ke=u.parameters)==null?void 0:ke.docs)==null?void 0:pe.source}}};const Mr=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedArbeidsforholdOgAndreInntekterJobbetForNærFamilie","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste"];export{s as Default,t as FarMedMorSomHarRettIEØS,k as FarMedMorSomHarRettINorge,S as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,d as FarMedUførMor,p as MedAdoptertBarn,i as MedAleneOmsorg,f as MedAndreInntekterJobbIUtlandet,u as MedAndreInntekterMilitærtjeneste,a as MedAnnenForelder,l as MedArbeidsforholdOgAndreInntekter,m as MedArbeidsforholdOgAndreInntekterJobbetForNærFamilie,g as MedSelvstendigNæringsdrivende,M as MedSelvstendigNæringsdrivendeUtenDiverse,c as MedUtenlandsopphold,Mr as __namedExportsOrder,gr as default};
//# sourceMappingURL=Oppsummering.stories-d6e307d7.js.map
