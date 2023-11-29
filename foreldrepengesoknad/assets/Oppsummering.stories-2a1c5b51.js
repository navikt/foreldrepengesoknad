import{j as S}from"./jsx-runtime-69eee039.js";import{w as ge}from"./withRouter-92fc33ca.js";import{w as Me,F as fe}from"./ForeldrepengerStateMock-6bee6c3f.js";import{N as ie,A as de}from"./Næring-ebce090a.js";import{A as ue}from"./AxiosMock-93151916.js";import{_ as Se}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{O as ke}from"./Oppsummering-885bd0c4.js";import{b as o}from"./Tidsperioden-34456269.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./useSøknad-68f2101b.js";import"./mapSøkerinfoDTO-4d14a9e9.js";import"./AttachmentType-f6ad37cf.js";import"./Link-b834ea2b.js";import"./useSaveLoadedRoute-4a411548.js";import"./amplitude-e7683f28.js";import"./api-c9fff41c.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-ad49f018.js";import"./Periodene-b9b510c3.js";import"./useSøkerinfo-3dc1f3b8.js";import"./message-46ff19cd.js";import"./dateUtils-ed7cfeb2.js";import"./arbeidsforholdUtils-91a4724f.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./leggTilPeriode-90b24a7b.js";import"./Uttaksplan-0110c369.js";import"./FormikFileUploader-e0023e85.js";import"./AttachmentList-faf4d5ab.js";import"./Attachment-54d68cfd.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./formUtils-a4ae2b4b.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const xe=4,Ae="/soknad/uttaksplan-info",Fe=[],Ie=[],ve={},Oe="undefined",be=!1,he={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,uttaksplan:[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:"2021-11-23T23:00:00.000Z",tom:"2021-12-13T23:00:00.000Z"}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:"2021-12-14T23:00:00.000Z",tom:"2022-01-24T23:00:00.000Z"}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:"2022-01-25T23:00:00.000Z",tom:"2022-03-28T23:00:00.000Z"}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:"2022-03-29T23:00:00.000Z",tom:"2022-06-06T23:00:00.000Z"},ønskerSamtidigUttak:!1,gradert:!1}],tilleggsopplysninger:{},dekningsgrad:100,harGodkjentOppsummering:!0,vedlegg:[],ønskerJustertUttakVedFødsel:!1},version:xe,currentRoute:Ae,søknadGjelderEtNyttBarn:!0,saker:Fe,søkerinfo:{},perioderSomSkalSendesInn:Ie,kvittering:ve,antallUkerIUttaksplan:Oe,harUttaksplanBlittSlettet:be,brukerSvarteJaPåAutoJustering:!1},cr={title:"steps/Oppsummering",component:ke,decorators:[ge,Me]},e=he,r=Se,n=({context:pe,søkerinfo:ce})=>{const le=me=>{me.onPost("/storage").reply(200,void 0)};return S.jsx(ue,{mock:le,children:S.jsx(fe,{søknad:pe,søkerinfo:ce,children:S.jsx(ke,{})})})},s=n.bind({});s.args={context:e,søkerinfo:r};const a=n.bind({});a.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const i=n.bind({});i.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!0},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1}}},søkerinfo:r};const d=n.bind({});d.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},tilleggsopplysninger:{begrunnelseForSenEndring:{tekst:"Utsettelsesgrunn"}}}},søkerinfo:r};const t=n.bind({});t.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const u=n.bind({});t.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1}}},søkerinfo:r};const k=n.bind({});k.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:r};const p=n.bind({});p.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{...e.søknad.søkersituasjon,situasjon:"adopsjon"},barn:{type:"adoptertStebarn",antallBarn:1,adopsjonsdato:o("2021-10-01"),fødselsdatoer:[o("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},søkerinfo:r};const c=n.bind({});c.args={context:{...e,søknad:{...e.søknad,informasjonOmUtenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1,senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}],tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]}}},søkerinfo:r};const l=n.bind({});l.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:o("2019-01-01")}}}},søkerinfo:{søker:{...r.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const m=n.bind({});m.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:o("2018-01-01"),tom:o("2021-01-01")},næringstyper:[ie.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:o("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}]}}},søkerinfo:r};const g=n.bind({});g.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:o("2018-01-01"),tom:o("2021-01-01")},næringstyper:[ie.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}]}}},søkerinfo:r};const M=n.bind({});M.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:de.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE"}]}}},søkerinfo:r};const f=n.bind({});f.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:de.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}]}}},søkerinfo:r};var x,A,F;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
}`,...(F=(A=s.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var I,v,O;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`({
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
}`,...(O=(v=a.parameters)==null?void 0:v.docs)==null?void 0:O.source}}};var b,h,E;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(E=(h=i.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var N,j,y;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`({
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
}`,...(y=(j=d.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var P,R,U;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
}`,...(U=(R=t.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var T,D,J;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`({
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
}`,...(J=(D=u.parameters)==null?void 0:D.docs)==null?void 0:J.source}}};var B,H,_;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...(_=(H=k.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var L,Z,K;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(K=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var w,G,V;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`({
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
}`,...(V=(G=c.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var Y,C,q;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(q=(C=l.parameters)==null?void 0:C.docs)==null?void 0:q.source}}};var z,Q,W;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,$,ee;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
}`,...(ee=($=g.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ne,oe;M.parameters={...M.parameters,docs:{...(re=M.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(oe=(ne=M.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var te,se,ae;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`({
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
}`,...(ae=(se=f.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};const lr=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste"];export{s as Default,t as FarMedMorSomHarRettIEØS,k as FarMedMorSomHarRettINorge,u as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,d as FarMedUførMor,p as MedAdoptertBarn,i as MedAleneOmsorg,M as MedAndreInntekterJobbIUtlandet,f as MedAndreInntekterMilitærtjeneste,a as MedAnnenForelder,l as MedArbeidsforholdOgAndreInntekter,m as MedSelvstendigNæringsdrivende,g as MedSelvstendigNæringsdrivendeUtenDiverse,c as MedUtenlandsopphold,lr as __namedExportsOrder,cr as default};
//# sourceMappingURL=Oppsummering.stories-2a1c5b51.js.map
