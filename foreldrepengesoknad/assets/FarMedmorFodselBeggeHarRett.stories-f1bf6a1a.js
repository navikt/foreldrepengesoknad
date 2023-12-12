import{j as a}from"./jsx-runtime-69eee039.js";import{w as M}from"./withRouter-f0df7a0f.js";import{A as F}from"./AxiosMock-ee1c53ff.js";import{R}from"./api-c8cb1d61.js";import{s as f,a as S}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as g}from"./UttaksplanInfo-4e0675ee.js";import{F as u,C as r}from"./FpDataContext-75ac2616.js";import{m as D}from"./mapSøkerinfoDTO-12ccca9c.js";import{d as c}from"./Tidsperioden-57efcdec.js";import{B as N}from"./barnUtils-bee45dcc.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-24de531f.js";import"./Periodene-f56e88dc.js";import"./Perioden-1c854ba4.js";import"./uttaksPlanStatus-1f5446f4.js";import"./stringUtils-9279c9e4.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f71b1bae.js";import"./amplitude-140e185d.js";import"./routes-9effe5a6.js";import"./Uttaksplan-c276434e.js";import"./FormikFileUploader-7ddafbe0.js";import"./AttachmentList-8d3b0f2c.js";import"./Attachment-2aa2754e.js";import"./Link-b834ea2b.js";import"./links-b36d21ab.js";import"./leggTilPeriode-9260f055.js";import"./arbeidsforholdUtils-1da69487.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-22f7a163.js";import"./message-87a45ae9.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-845f0535.js";import"./dateUtils-1f54a9f2.js";import"./eksisterendeSakUtils-90c073d8.js";import"./velkommenUtils-837cf02c.js";import"./exports-70c8b745.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const E={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},I="/innsyn/v2/annenPartVedtak",s="/konto",O=E,Rn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:g,decorators:[M]},T=t=>{const A=o=>{o.onPost(I).replyOnce(200,void 0,R.FINISHED),o.onGet(s).replyOnce(200,t.stønadskonto100),o.onGet(s).replyOnce(200,t.stønadskonto80)};return a.jsx(F,{mock:A,children:a.jsx(u,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:t.barn,[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(g,{søkerInfo:D(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=T.bind({});n.args={stønadskonto100:f,stønadskonto80:S,barn:{type:N.FØDT,fødselsdatoer:[c("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:O};const e=T.bind({});e.args={stønadskonto100:f,stønadskonto80:S,barn:{type:N.FØDT,fødselsdatoer:[c("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:O};var i,d,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
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
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,l,k;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
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
}`,...(k=(l=e.parameters)==null?void 0:l.docs)==null?void 0:k.source}}};const un=["UttaksplanInfoFarMedmorFødselBeggeHarRett","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{n as UttaksplanInfoFarMedmorFødselBeggeHarRett,e as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,un as __namedExportsOrder,Rn as default};
//# sourceMappingURL=FarMedmorFodselBeggeHarRett.stories-f1bf6a1a.js.map
