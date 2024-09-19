import{j as d}from"./jsx-runtime-Cw0GR0a5.js";import{a as j}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as P,S as C,C as a}from"./routes-B9jRY1rx.js";import{S as u,M as J,A as Z}from"./SkjemaSteg-CxFdhvpg.js";import{A as x,M as H}from"./useSvpNavigator-BT5X0qrb.js";import{A as m,S as f}from"./attachmentType-CO8SwnHI.js";import{i as B}from"./VeiviserPage-Bfd_9S15.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-BCiVvF9_.js";import"./Checkbox-CYL0tm0k.js";import"./index-vZN_Bsf0.js";import"./apiInterceptor-jBtz8lZe.js";import"./minMax-DB7FAiJQ.js";import"./Bedriftsbanner-rWEEopVL.js";import"./_baseUniq-BRhi2-IM.js";import"./index-BRV0Se7Z.js";const t=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),p=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:x.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},w=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],c=()=>(...o)=>(j("button-click")(...o),Promise.resolve()),de={title:"steps/SkjemaSteg",component:u,render:({gåTilNesteSide:o=j("button-click"),skalFeileOpplasting:z,tilrettelegging:D,...K})=>{B();const T=new J(Z());return z||(T.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200),T.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200)),d.jsx(H,{initialEntries:[P.SKJEMA],children:d.jsx(C,{onDispatch:o,initialState:{[a.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[a.TILRETTELEGGINGER]:D,[a.VALGT_TILRETTELEGGING_ID]:"990322244",[a.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:d.jsx(u,{...K})})})}},e={args:{tilrettelegging:[r],skalFeileOpplasting:!1,mellomlagreSøknadOgNaviger:c(),avbrytSøknad:c(),arbeidsforhold:w,maxAntallVedlegg:40}},i={args:{...e.args,tilrettelegging:[r],skalFeileOpplasting:!0}},n={args:{...e.args,tilrettelegging:[{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:f.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}]}},s={args:{...e.args,tilrettelegging:[r,r]}},l={args:{...e.args,tilrettelegging:[{...r,arbeidsforhold:{...r.arbeidsforhold,type:x.FRILANSER}}]}},g={args:{...e.args,tilrettelegging:[{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:f.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:p.name,filesize:p.size,file:p,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:f.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],maxAntallVedlegg:2}};var E,S,I;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    tilrettelegging: [defaultTilrettelegging],
    skalFeileOpplasting: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    maxAntallVedlegg: 40
  }
}`,...(I=(S=e.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var k,v,G;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [defaultTilrettelegging],
    skalFeileOpplasting: true
  }
}`,...(G=(v=i.parameters)==null?void 0:v.docs)==null?void 0:G.source}}};var A,O,R;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [{
      ...defaultTilrettelegging,
      vedlegg: [{
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
    }]
  }
}`,...(R=(O=n.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var L,b,h;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [defaultTilrettelegging, defaultTilrettelegging]
  }
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var F,y,N;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [{
      ...defaultTilrettelegging,
      arbeidsforhold: {
        ...defaultTilrettelegging.arbeidsforhold,
        type: Arbeidsforholdstype.FRILANSER
      }
    }]
  }
}`,...(N=(y=l.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var _,V,M;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [{
      ...defaultTilrettelegging,
      vedlegg: [{
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
    }, {
      ...defaultTilrettelegging,
      vedlegg: [{
        id: 'V134300149934973076055420920289127108',
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
    }],
    maxAntallVedlegg: 2
  }
}`,...(M=(V=g.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};const pe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{l as ErTypeFrilans,g as KanMaxHaToVedlegg,s as MedToTilrettelegginger,n as MedVedlegg,i as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,pe as __namedExportsOrder,de as default};
