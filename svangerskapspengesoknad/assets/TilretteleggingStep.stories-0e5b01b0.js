import{j as i}from"./Modal-046e2c19.js";import{A as g,S as T}from"./attachmentType-7a83d42b.js";import{d as o,I as a}from"./dates-b80184c6.js";import{a as f}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as v,C as t}from"./routes-33249ab0.js";import{A as E}from"./useFortsettSøknadSenere-310b57eb.js";import{T as m}from"./TilretteleggingStep-c2b4196d.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./validation-631bcf6e.js";import"./Bedriftsbanner-4d6f57d2.js";import"./VStack-976bfc58.js";import"./dateUtils-d488a907.js";import"./BackButton-d9cee460.js";import"./tilretteleggingValidation-9cfc1a40.js";import"./ExpansionCard-89202861.js";const H={title:"steps/TilretteleggingStep",component:m},n=()=>(...r)=>(f("button-click")(...r),Promise.resolve()),I=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],S=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:p})=>i.jsx(v,{onDispatch:p,initialState:{[t.TILRETTELEGGINGER]:[{id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:E.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:g.TILRETTELEGGING,skjemanummer:T.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[t.VALGT_TILRETTELEGGING_ID]:"990322244",[t.OM_BARNET]:{erBarnetFødt:!1,termindato:o().add(45,"days").format(a),fødselsdato:o().add(45,"days").format(a)}},children:i.jsx(m,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:I})}),e=S.bind({});var s,d,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: [{
      id: '990322244',
      arbeidsforhold: {
        arbeidsgiverId: '990322244',
        type: Arbeidsforholdstype.VIRKSOMHET,
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [],
        startdato: '2023-01-01'
      },
      varierendePerioder: [],
      behovForTilretteleggingFom: undefined!,
      type: undefined!,
      vedlegg: [{
        id: 'V134300149934973076055420920289127108',
        file: ({} as any),
        filename: 'vedlegg – Kopi (7).png',
        filesize: 7477,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
        uuid: 'Created'
      }]
    }],
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
      fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT)
    }
  }}>
            <TilretteleggingStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
        </SvpDataContext>;
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const J=["Default"];export{e as Default,J as __namedExportsOrder,H as default};
