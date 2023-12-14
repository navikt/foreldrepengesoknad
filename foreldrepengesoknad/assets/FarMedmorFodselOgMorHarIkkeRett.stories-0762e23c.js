import{j as a}from"./jsx-runtime-69eee039.js";import{w as M}from"./withRouter-f0df7a0f.js";import{A as O}from"./AxiosMock-ee1c53ff.js";import{F as R,U as F}from"./UttaksplanInfo-907c5187.js";import{R as D}from"./api-cfbd0b51.js";import{F as E,C as r}from"./FpDataContext-75ac2616.js";import{m as A}from"./mapSøkerinfoDTO-d9686cf0.js";import{d as s}from"./Tidsperioden-f06b1fb0.js";import{B as I}from"./barnUtils-6ca83891.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-53d645a6.js";import"./dates-53ab5347.js";import"./Periodene-0a8f4fdf.js";import"./Perioden-258f0205.js";import"./uttaksPlanStatus-eb75c060.js";import"./stringUtils-050465ad.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-38f20682.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./Uttaksplan-3d83941c.js";import"./FormikFileUploader-edfedb50.js";import"./AttachmentList-0916f102.js";import"./Attachment-22089457.js";import"./Link-b834ea2b.js";import"./IntlProvider-0d1ea53b.js";import"./provider-679c532c.js";import"./links-b36d21ab.js";import"./leggTilPeriode-6d2e14ee.js";import"./arbeidsforholdUtils-25b9ff22.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-9cb8c0d5.js";import"./message-42800413.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-12be774c.js";import"./dateUtils-d252c747.js";import"./eksisterendeSakUtils-ae52dae6.js";import"./velkommenUtils-c9ac41d3.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const y={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},u={FORELDREPENGER:250},v={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:u,minsteretter:v},U={FORELDREPENGER:200},x={farRundtFødsel:0,generellMinsterett:0,toTette:0},c={kontoer:U,minsteretter:x},P="/innsyn/v2/annenPartVedtak",i="/konto",g=y,ve={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:R,decorators:[M]},N=n=>{const T=o=>{o.onPost(P).replyOnce(200,void 0,D.FINISHED),o.onGet(i).replyOnce(200,n.stønadskonto100),o.onGet(i).replyOnce(200,n.stønadskonto80)};return a.jsx(O,{mock:T,children:a.jsx(E,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:I.FØDT,fødselsdatoer:[s("2021-07-01").toDate()],antallBarn:1,termindato:s("2021-07-01").toDate()},[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:n.annenForelder},children:a.jsx(F,{søkerInfo:A(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=N.bind({});e.args={stønadskonto100:c,stønadskonto80:S,søkerinfo:g,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};const t=N.bind({});t.args={stønadskonto100:c,stønadskonto80:S,søkerinfo:g,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var d,p,l;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,k,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const Ue=["UttaksplanDerMorIkkeHarRettPåForeldrepenger","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{e as UttaksplanDerMorIkkeHarRettPåForeldrepenger,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Ue as __namedExportsOrder,ve as default};
//# sourceMappingURL=FarMedmorFodselOgMorHarIkkeRett.stories-0762e23c.js.map
