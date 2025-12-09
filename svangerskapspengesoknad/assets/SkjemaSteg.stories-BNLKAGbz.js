import{aL as S,j as n}from"./iframe-CE1_9r_c.js";import{f as h,c as v,S as T,T as F,C as s}from"./routes-CrhOMGYS.js";import{A as f}from"./queries-C14YzJ3-.js";import{h as R,H as A}from"./index-CDGzNG4q.js";import{S as m,A as I}from"./attachmentType-DJ1vFT-G.js";import{F as c,M as D,R as V,c as y}from"./useSvpNavigator-CFT-hiqq.js";import{S as u}from"./SkjemaSteg-CHn-YjA9.js";import"./preload-helper-PPVm8Dsz.js";import"./Bedriftsbanner-CiHP1DvX.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),p=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",G="975326209",M=[{arbeidsgiverId:G,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],P=()=>()=>(E("button-click")(),Promise.resolve()),C={title:"steps/SkjemaSteg",component:u,render:({gåTilNesteSide:_=E("button-click"),vedlegg:k,valgteArbeidsforhold:O,valgtTilretteleggingId:b,arbeidsforholdOgInntekt:L,...N})=>n.jsx(D,{initialEntries:[h(T.SKJEMA,b)],children:n.jsx(v,{onDispatch:_,initialState:{[s.ARBEIDSFORHOLD_OG_INNTEKT]:L,[s.TILRETTELEGGINGER_VEDLEGG]:k,[s.VALGTE_ARBEIDSFORHOLD]:O,[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:n.jsx(V,{children:n.jsx(y,{element:n.jsx(u,{...N}),path:`/${T.SKJEMA}/${F}`})})})})},e={parameters:{msw:{handlers:[R.post(f.sendVedlegg,()=>new A(JSON.stringify("uuid-test"),{status:200}))]}},args:{mellomlagreSøknadOgNaviger:P(),avbrytSøknad:()=>E("button-click"),arbeidsforhold:M,maxAntallVedlegg:40,valgtTilretteleggingId:r,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},t={parameters:{msw:{handlers:[R.post(f.sendVedlegg,()=>new A(null,{status:400}))]}},args:e.args},i={parameters:e.parameters,args:{...e.args,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,innsendingsType:"LASTET_OPP",uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created"}]}}},l={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,G]}},o={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:c,valgteArbeidsforhold:[c],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:S,valgteArbeidsforhold:[S],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},g={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created",innsendingsType:"LASTET_OPP"},{id:"V134300149934973076055420920289127101",filename:p.name,filesize:p.size,file:p,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created",innsendingsType:"LASTET_OPP"}]},maxAntallVedlegg:2}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(JSON.stringify('uuid-test'), {
        status: 200
      }))]
    }
  },
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    maxAntallVedlegg: 40,
    valgtTilretteleggingId: ARBEIDSGIVER_ID,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    vedlegg: {
      [ARBEIDSGIVER_ID]: [{
        id: 'V134300149934973076055420920289127108',
        filename: file1.name,
        filesize: file1.size,
        file: file1,
        innsendingsType: 'LASTET_OPP',
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        uuid: 'Created'
      }]
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgteArbeidsforhold: [ARBEIDSGIVER_ID, ANNEN_ARBEIDSGIVER_ID]
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
        uuid: 'Created',
        innsendingsType: 'LASTET_OPP'
      }, {
        id: 'V134300149934973076055420920289127101',
        filename: file2.name,
        filesize: file2.size,
        file: file2,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        uuid: 'Created',
        innsendingsType: 'LASTET_OPP'
      }]
    },
    maxAntallVedlegg: 2
  }
}`,...g.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{d as ErTypeEgenNæring,o as ErTypeFrilans,g as KanMaxHaToVedlegg,l as MedToTilrettelegginger,i as MedVedlegg,t as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,C as default};
