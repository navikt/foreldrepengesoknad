import{j as d}from"./jsx-runtime-Cw0GR0a5.js";import{a as M}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as H,S as w,C as a}from"./routes-B9jRY1rx.js";import{S as T,h as j,H as x}from"./SkjemaSteg-BDBJbfxL.js";import{A as z,M as C}from"./useSvpNavigator-CAaGp3ik.js";import{A as m,S as u}from"./attachmentType-CO8SwnHI.js";import{i as J}from"./VeiviserPage-Dgj9HcLq.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./decorators-86JrGkCj.js";import"./ErrorSummaryHookForm-Ry7c6Fhg.js";import"./Checkbox-Bba2tHGD.js";import"./index-vZN_Bsf0.js";import"./minMax-D1_QAUx9.js";import"./Bedriftsbanner-3X12mbUg.js";import"./_baseUniq-BRhi2-IM.js";import"./index-BRV0Se7Z.js";const t=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),p=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:z.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},Z=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],f=()=>(...o)=>(M("button-click")(...o),Promise.resolve()),ge={title:"steps/SkjemaSteg",component:T,render:({gåTilNesteSide:o=M("button-click"),tilrettelegging:D,...K})=>(J(),d.jsx(C,{initialEntries:[H.SKJEMA],children:d.jsx(w,{onDispatch:o,initialState:{[a.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[a.TILRETTELEGGINGER]:D,[a.VALGT_TILRETTELEGGING_ID]:"990322244",[a.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:d.jsx(T,{...K})})}))},e={parameters:{msw:{handlers:[j.post("https://svp/rest/storage/svangerskapspenger/vedlegg",()=>new x("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{tilrettelegging:[r],mellomlagreSøknadOgNaviger:f(),avbrytSøknad:f(),arbeidsforhold:Z,maxAntallVedlegg:40}},s={parameters:{msw:{handlers:[j.post("https://svp/rest/storage/svangerskapspenger/vedlegg",()=>new x(null,{status:400}))]}},args:e.args},n={parameters:e.parameters,args:{...e.args,tilrettelegging:[{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:u.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}]}},i={parameters:e.parameters,args:{...e.args,tilrettelegging:[r,r]}},l={parameters:e.parameters,args:{...e.args,tilrettelegging:[{...r,arbeidsforhold:{...r.arbeidsforhold,type:z.FRILANSER}}]}},g={parameters:e.parameters,args:{...e.args,tilrettelegging:[{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:u.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...r,vedlegg:[{id:"V134300149934973076055420920289127108",filename:p.name,filesize:p.size,file:p,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:u.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],maxAntallVedlegg:2}};var c,E,S;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://svp/rest/storage/svangerskapspenger/vedlegg', () => new HttpResponse('uuid-test', {
        status: 200,
        headers: {
          location: 'test.com'
        }
      }))]
    }
  },
  args: {
    tilrettelegging: [defaultTilrettelegging],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    maxAntallVedlegg: 40
  }
}`,...(S=(E=e.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var k,I,v;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://svp/rest/storage/svangerskapspenger/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(v=(I=s.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var G,h,R;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
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
}`,...(R=(h=n.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};var O,L,A;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    tilrettelegging: [defaultTilrettelegging, defaultTilrettelegging]
  }
}`,...(A=(L=i.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var b,F,N;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
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
}`,...(N=(F=l.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var _,y,V;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
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
}`,...(V=(y=g.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};const oe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{l as ErTypeFrilans,g as KanMaxHaToVedlegg,i as MedToTilrettelegginger,n as MedVedlegg,s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,oe as __namedExportsOrder,ge as default};
