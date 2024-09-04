import{i as y,j as n,f as a,I as o}from"./ByttBrowserModal-B0_Lz7to.js";import{a as E}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as G,S as c}from"./attachmentType-CO8SwnHI.js";import{a as R,S as b,C as i}from"./routes-E6r3g9EM.js";import{A as f,M as A}from"./useSvpNavigator-DoJmEIyW.js";import{T as v}from"./TilretteleggingStep-jPFWvsWX.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DvJ4k8UE.js";import"./Checkbox-EHX0GevH.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./dateUtils-SvT5BRX6.js";import"./Bedriftsbanner-B3cMAY3W.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-DUD17xhv.js";import"./ReadMore-BuABtR1D.js";import"./ExpansionCard-YAZjDaPK.js";const w={title:"steps/TilretteleggingStep",component:v},d=()=>(...r)=>(E("button-click")(...r),Promise.resolve()),N=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],u=({mellomlagreSøknadOgNaviger:r=d(),gåTilNesteSide:I=E("button-click"),type:S})=>(y(),n.jsx(A,{initialEntries:[R.TILRETTELEGGING],children:n.jsx(b,{onDispatch:I,initialState:{[i.TILRETTELEGGINGER]:[{id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:S,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:G.TILRETTELEGGING,skjemanummer:c.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[i.VALGT_TILRETTELEGGING_ID]:"990322244",[i.OM_BARNET]:{erBarnetFødt:!1,termindato:a().add(45,"days").format(o),fødselsdato:a().add(45,"days").format(o)}},children:n.jsx(v,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:d(),arbeidsforhold:N})})})),e=u.bind({});e.args={type:f.VIRKSOMHET};const t=u.bind({});t.args={type:f.FRILANSER};var s,l,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  type
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.TILRETTELEGGING]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: [{
        id: '990322244',
        arbeidsforhold: {
          arbeidsgiverId: '990322244',
          type: type,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,p,T;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  type
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.TILRETTELEGGING]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: [{
        id: '990322244',
        arbeidsforhold: {
          arbeidsgiverId: '990322244',
          type: type,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(T=(p=t.parameters)==null?void 0:p.docs)==null?void 0:T.source}}};const Q=["Default","Frilanser"];export{e as Default,t as Frilanser,Q as __namedExportsOrder,w as default};
