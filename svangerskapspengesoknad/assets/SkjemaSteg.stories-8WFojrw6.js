import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{a as z}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{c as Q,a as S,S as W,C as s,T as X}from"./routes-Cd7jN6RC.js";import{S as u,h as K,H as w}from"./SkjemaSteg-DRljB8zm.js";import{A as I,S as E}from"./attachmentType-CO8SwnHI.js";import{i as Y}from"./VeiviserPage-DFVY7kb3.js";import{E as c}from"./minMax-BlSSLQ_O.js";import{M as ee,R as ae,d as re,F as f}from"./useSvpNavigator-B3F_qXR5.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./decorators-86JrGkCj.js";import"./ErrorSummaryHookForm-BYm0lOzV.js";import"./Checkbox-IvE2uK3E.js";import"./index-BbmHap-z.js";import"./Bedriftsbanner-CSoToEfC.js";import"./index-BRV0Se7Z.js";import"./_baseUniq-BRhi2-IM.js";const a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),m=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",U="975326209",te=[{arbeidsgiverId:U,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],k=()=>(...p)=>(z("button-click")(...p),Promise.resolve()),Ge={title:"steps/SkjemaSteg",component:u,render:({gåTilNesteSide:p=z("button-click"),vedlegg:C,valgteArbeidsforhold:P,valgtTilretteleggingId:$,arbeidsforholdOgInntekt:Z,...q})=>(Y(),t.jsx(ee,{initialEntries:[Q(S.SKJEMA,$)],children:t.jsx(W,{onDispatch:p,initialState:{[s.ARBEIDSFORHOLD_OG_INNTEKT]:Z,[s.TILRETTELEGGINGER_VEDLEGG]:C,[s.VALGTE_ARBEIDSFORHOLD]:P,[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(ae,{children:t.jsx(re,{element:t.jsx(u,{...q}),path:`/${S.SKJEMA}/${X}`})})})}))},e={parameters:{msw:{handlers:[K.post("/svangerskapspenger/soknad/rest/storage/svangerskapspenger/vedlegg",()=>new w("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{mellomlagreSøknadOgNaviger:k(),avbrytSøknad:k(),arbeidsforhold:te,maxAntallVedlegg:40,valgtTilretteleggingId:r,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},n={parameters:{msw:{handlers:[K.post("/svangerskapspenger/soknad/rest/storage/svangerskapspenger/vedlegg",()=>new w(null,{status:400}))]}},args:e.args},l={parameters:e.parameters,args:{...e.args,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}}},i={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,U]}},o={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:f,valgteArbeidsforhold:[f],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:c,valgteArbeidsforhold:[c],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},g={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"},{id:"V134300149934973076055420920289127101",filename:m.name,filesize:m.size,file:m,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},maxAntallVedlegg:2}};var T,G,R;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(R=(G=e.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var A,h,v;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(v=(h=n.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var _,b,N;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(N=(b=l.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var O,L,F;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgteArbeidsforhold: [ARBEIDSGIVER_ID, ANNEN_ARBEIDSGIVER_ID]
  }
}`,...(F=(L=i.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var D,V,M;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(M=(V=o.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var j,y,J;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(J=(y=d.parameters)==null?void 0:y.docs)==null?void 0:J.source}}};var x,B,H;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(H=(B=g.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};const Re=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{d as ErTypeEgenNæring,o as ErTypeFrilans,g as KanMaxHaToVedlegg,i as MedToTilrettelegginger,l as MedVedlegg,n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Re as __namedExportsOrder,Ge as default};
