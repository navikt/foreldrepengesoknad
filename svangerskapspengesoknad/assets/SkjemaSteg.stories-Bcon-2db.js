import{aB as S,j as t}from"./iframe-CjREDw4G.js";import{f as q,c as Q,S as c,T as W,C as s}from"./routes-CFH8rONi.js";import{h as z,a as K}from"./index-CW0loGYA.js";import{S as I,A as E}from"./attachmentType-DJ1vFT-G.js";import{F as u,M as X,R as ee,c as ae}from"./useSvpNavigator-DqU81pO3.js";import{S as f}from"./SkjemaSteg-DiA3zZ7q.js";import"./Bedriftsbanner-aabVB7IA.js";const{action:U}=__STORYBOOK_MODULE_ACTIONS__,a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),m=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",w="975326209",re=[{arbeidsgiverId:w,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],T=()=>(...p)=>(U("button-click")(...p),Promise.resolve()),ge={title:"steps/SkjemaSteg",component:f,render:({gåTilNesteSide:p=U("button-click"),vedlegg:C,valgteArbeidsforhold:P,valgtTilretteleggingId:$,arbeidsforholdOgInntekt:Z,...Y})=>t.jsx(X,{initialEntries:[q(c.SKJEMA,$)],children:t.jsx(Q,{onDispatch:p,initialState:{[s.ARBEIDSFORHOLD_OG_INNTEKT]:Z,[s.TILRETTELEGGINGER_VEDLEGG]:C,[s.VALGTE_ARBEIDSFORHOLD]:P,[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(ee,{children:t.jsx(ae,{element:t.jsx(f,{...Y}),path:`/${c.SKJEMA}/${W}`})})})})},e={parameters:{msw:{handlers:[z.post(".//rest/storage/svangerskapspenger/vedlegg",()=>new K("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{mellomlagreSøknadOgNaviger:T(),avbrytSøknad:T(),arbeidsforhold:re,maxAntallVedlegg:40,valgtTilretteleggingId:r,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},n={parameters:{msw:{handlers:[z.post(".//rest/storage/svangerskapspenger/vedlegg",()=>new K(null,{status:400}))]}},args:e.args},l={parameters:e.parameters,args:{...e.args,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:E.TILRETTELEGGING,skjemanummer:I.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}}},i={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,w]}},o={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:u,valgteArbeidsforhold:[u],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:S,valgteArbeidsforhold:[S],arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},g={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:E.TILRETTELEGGING,skjemanummer:I.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"},{id:"V134300149934973076055420920289127101",filename:m.name,filesize:m.size,file:m,uploaded:!0,pending:!1,type:E.TILRETTELEGGING,skjemanummer:I.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},maxAntallVedlegg:2}};var k,G,R;e.parameters={...e.parameters,docs:{...(k=e.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(G=e.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var A,h,_;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(_=(h=n.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var v,O,b;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(b=(O=l.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var N,L,F;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(J=(y=d.parameters)==null?void 0:y.docs)==null?void 0:J.source}}};var B,x,H;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(H=(x=g.parameters)==null?void 0:x.docs)==null?void 0:H.source}}};const pe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{d as ErTypeEgenNæring,o as ErTypeFrilans,g as KanMaxHaToVedlegg,i as MedToTilrettelegginger,l as MedVedlegg,n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,pe as __namedExportsOrder,ge as default};
