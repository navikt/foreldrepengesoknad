import{aC as E,j as t}from"./iframe-Ctey05fg.js";import{f as N,c as L,S,T as F,C as s}from"./routes-CwTl2evT.js";import{h as T,a as k}from"./index-C_A4Dtqo.js";import{S as m,A as I}from"./attachmentType-DJ1vFT-G.js";import{F as c,M as D,R as V,c as M}from"./useSvpNavigator-DalUACfh.js";import{S as u}from"./SkjemaSteg-watkD9_x.js";import"./preload-helper-D9Z9MdNV.js";import"./Bedriftsbanner-hi0zY5sb.js";const{action:G}=__STORYBOOK_MODULE_ACTIONS__,a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),p=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",R="975326209",j=[{arbeidsgiverId:R,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],f=()=>()=>(G("button-click")(),Promise.resolve()),U={title:"steps/SkjemaSteg",component:u,render:({gåTilNesteSide:A=G("button-click"),vedlegg:h,valgteArbeidsforhold:_,valgtTilretteleggingId:v,arbeidsforholdOgInntekt:O,...b})=>t.jsx(D,{initialEntries:[N(S.SKJEMA,v)],children:t.jsx(L,{onDispatch:A,initialState:{[s.ARBEIDSFORHOLD_OG_INNTEKT]:O,[s.TILRETTELEGGINGER_VEDLEGG]:h,[s.VALGTE_ARBEIDSFORHOLD]:_,[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(V,{children:t.jsx(M,{element:t.jsx(u,{...b}),path:`/${S.SKJEMA}/${F}`})})})})},e={parameters:{msw:{handlers:[T.post(".//rest/storage/svangerskapspenger/vedlegg",()=>new k("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{mellomlagreSøknadOgNaviger:f(),avbrytSøknad:f(),arbeidsforhold:j,maxAntallVedlegg:40,valgtTilretteleggingId:r,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},n={parameters:{msw:{handlers:[T.post(".//rest/storage/svangerskapspenger/vedlegg",()=>new k(null,{status:400}))]}},args:e.args},l={parameters:e.parameters,args:{...e.args,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}}},i={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,R]}},o={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:c,valgteArbeidsforhold:[c],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:E,valgteArbeidsforhold:[E],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},g={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"},{id:"V134300149934973076055420920289127101",filename:p.name,filesize:p.size,file:p,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},maxAntallVedlegg:2}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger/vedlegg\`, () => new HttpResponse('uuid-test', {
        status: 200,
        headers: {
          location: 'test.com'
        }
      }))]
    }
  },
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    maxAntallVedlegg: 40,
    valgtTilretteleggingId: ARBEIDSGIVER_ID,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    vedlegg: {
      [ARBEIDSGIVER_ID]: [{
        id: 'V134300149934973076055420920289127108',
        filename: file1.name,
        filesize: file1.size,
        file: file1,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
        uuid: 'Created'
      }]
    }
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgteArbeidsforhold: [ARBEIDSGIVER_ID, ANNEN_ARBEIDSGIVER_ID]
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgtTilretteleggingId: FRILANS_ID,
    valgteArbeidsforhold: [FRILANS_ID],
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgtTilretteleggingId: EGEN_NÆRING_ID,
    valgteArbeidsforhold: [EGEN_NÆRING_ID],
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    }
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgtTilretteleggingId: ARBEIDSGIVER_ID,
    vedlegg: {
      [ARBEIDSGIVER_ID]: [{
        id: 'V134300149934973076055420920289127108',
        filename: file1.name,
        filesize: file1.size,
        file: file1,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
        uuid: 'Created'
      }, {
        id: 'V134300149934973076055420920289127101',
        filename: file2.name,
        filesize: file2.size,
        file: file2,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
        uuid: 'Created'
      }]
    },
    maxAntallVedlegg: 2
  }
}`,...g.parameters?.docs?.source}}};const w=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{d as ErTypeEgenNæring,o as ErTypeFrilans,g as KanMaxHaToVedlegg,i as MedToTilrettelegginger,l as MedVedlegg,n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,w as __namedExportsOrder,U as default};
