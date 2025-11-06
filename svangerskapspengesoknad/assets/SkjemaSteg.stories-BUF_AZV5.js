import{aG as E,j as n}from"./iframe-uAU4MhM4.js";import{f as v,c as F,S,T as D,C as s}from"./routes-BzuUCrqz.js";import{A as c}from"./queries-CzYUnvm3.js";import{h as A,H as G}from"./index-Ck8_9XcB.js";import{S as m,A as I}from"./attachmentType-DJ1vFT-G.js";import{F as T,M as V,R as y,c as M}from"./useSvpNavigator-CEFBxhbY.js";import{S as u}from"./SkjemaSteg-XdtGsdE_.js";import"./preload-helper-D9Z9MdNV.js";import"./Bedriftsbanner-DJ2c07c-.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),p=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",_="975326209",P=[{arbeidsgiverId:_,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,to:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",from:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],f=()=>()=>(R("button-click")(),Promise.resolve()),C={title:"steps/SkjemaSteg",component:u,render:({gåTilNesteSide:k=R("button-click"),vedlegg:O,valgteArbeidsforhold:b,valgtTilretteleggingId:N,arbeidsforholdOgInntekt:L,...h})=>n.jsx(V,{initialEntries:[v(S.SKJEMA,N)],children:n.jsx(F,{onDispatch:k,initialState:{[s.ARBEIDSFORHOLD_OG_INNTEKT]:L,[s.TILRETTELEGGINGER_VEDLEGG]:O,[s.VALGTE_ARBEIDSFORHOLD]:b,[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:n.jsx(y,{children:n.jsx(M,{element:n.jsx(u,{...h}),path:`/${S.SKJEMA}/${D}`})})})})},e={parameters:{msw:{handlers:[A.post(c.sendVedlegg,()=>new G(JSON.stringify("uuid-test"),{status:200}))]}},args:{mellomlagreSøknadOgNaviger:f(),avbrytSøknad:f(),arbeidsforhold:P,maxAntallVedlegg:40,valgtTilretteleggingId:r,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},t={parameters:{msw:{handlers:[A.post(c.sendVedlegg,()=>new G(null,{status:400}))]}},args:e.args},i={parameters:e.parameters,args:{...e.args,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,innsendingsType:"LASTET_OPP",uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created"}]}}},l={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,_]}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:T,valgteArbeidsforhold:[T],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},o={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:E,valgteArbeidsforhold:[E],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},g={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created",innsendingsType:"LASTET_OPP"},{id:"V134300149934973076055420920289127101",filename:p.name,filesize:p.size,file:p,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,uuid:"Created",innsendingsType:"LASTET_OPP"}]},maxAntallVedlegg:2}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(JSON.stringify('uuid-test'), {
        status: 200
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
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{o as ErTypeEgenNæring,d as ErTypeFrilans,g as KanMaxHaToVedlegg,l as MedToTilrettelegginger,i as MedVedlegg,t as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,C as default};
