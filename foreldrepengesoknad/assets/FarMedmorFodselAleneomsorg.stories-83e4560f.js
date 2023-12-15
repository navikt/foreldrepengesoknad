import{j as r}from"./jsx-runtime-69eee039.js";import{w as k}from"./withRouter-f0df7a0f.js";import{A as f}from"./AxiosMock-ee1c53ff.js";import{R as S}from"./api-37af441c.js";import{s as c,a as g}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-ddaea083.js";import{F as A,C as o}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-97167608.js";import{d as a}from"./Tidsperioden-d85ef78f.js";import{B as O}from"./barnUtils-499d6ba0.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-a6e67bdd.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-7b994c51.js";import"./dates-6a016f0f.js";import"./Periodene-a9178143.js";import"./Perioden-3b91fa00.js";import"./uttaksPlanStatus-735e5d33.js";import"./stringUtils-0142dcf8.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./Uttaksplan-dfa35fdf.js";import"./FormikFileUploader-5a8cca88.js";import"./AttachmentList-44783354.js";import"./Attachment-0c980428.js";import"./Link-11d7c909.js";import"./IntlProvider-788f10d0.js";import"./Alert-d5660280.js";import"./provider-91e4eed5.js";import"./ExpansionCard-24c428ff.js";import"./links-b36d21ab.js";import"./leggTilPeriode-2f77dbe8.js";import"./arbeidsforholdUtils-93d6b9aa.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1c52f6e3.js";import"./index-47edccfa.js";import"./BackButton-f1649e6f.js";import"./message-5ceb38b3.js";import"./LenkeKnapp-51387f12.js";import"./InfoOmSøknaden-5bef1722.js";import"./dateUtils-eb722a91.js";import"./Ingress-40110753.js";import"./eksisterendeSakUtils-14d651fe.js";import"./velkommenUtils-171e22cc.js";import"./Tag-8c31ae50.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const T={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},u="/innsyn/v2/annenPartVedtak",s="/konto",F=T,Mt={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},D=n=>{const l=async e=>{e.onPost(u).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,n.stønadskonto100),await e.onGet(s).replyOnce(200,n.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(A,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:{type:O.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[o.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:N(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=D.bind({});t.args={stønadskonto100:c,stønadskonto80:g,søkerinfo:F};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  const restMock = async (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2022-03-24').toDate(),
        dokumentasjonAvAleneomsorg: []
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: {
        etternavn: 'dfg',
        fornavn: 'dfg',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: true,
        erInformertOmSøknaden: true
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Rt=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{t as UttaksplanInfoFarMedmorFødselAleneomsorg,Rt as __namedExportsOrder,Mt as default};
//# sourceMappingURL=FarMedmorFodselAleneomsorg.stories-83e4560f.js.map
