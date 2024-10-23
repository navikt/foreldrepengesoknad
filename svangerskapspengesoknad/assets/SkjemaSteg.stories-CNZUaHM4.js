import{j as g}from"./jsx-runtime-Cw0GR0a5.js";import{a as H}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as Z,S as q,C as t}from"./routes-B1fb87EI.js";import{S,h as x,H as B}from"./SkjemaSteg-DPDaBADV.js";import{A as I,S as E}from"./attachmentType-CO8SwnHI.js";import{i as Q}from"./VeiviserPage-DPeYfbGG.js";import{M as W}from"./useSvpNavigator-yfJ1o2OX.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./decorators-86JrGkCj.js";import"./ErrorSummaryHookForm-C03QHvL8.js";import"./Checkbox-BLvctaFa.js";import"./index-vZN_Bsf0.js";import"./minMax-BeRBV8CB.js";import"./Bedriftsbanner-pytk0qyo.js";import"./index-BRV0Se7Z.js";import"./_baseUniq-BRhi2-IM.js";const a=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),m=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),r="990322244",z="975326209",X=[{arbeidsgiverId:z,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:r,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],c=()=>(...p)=>(H("button-click")(...p),Promise.resolve()),Se={title:"steps/SkjemaSteg",component:S,render:({gåTilNesteSide:p=H("button-click"),vedlegg:w,valgtTilretteleggingId:K,valgteArbeidsforhold:C,arbeidsforholdOgInntekt:U,...P})=>(Q(),g.jsx(W,{initialEntries:[Z.SKJEMA],children:g.jsx(q,{onDispatch:p,initialState:{[t.ARBEIDSFORHOLD_OG_INNTEKT]:U,[t.TILRETTELEGGINGER_VEDLEGG]:w,[t.VALGT_TILRETTELEGGING_ID]:K,[t.VALGTE_ARBEIDSFORHOLD]:C,[t.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:g.jsx(S,{...P})})}))},e={parameters:{msw:{handlers:[x.post("https://svp/rest/storage/svangerskapspenger/vedlegg",()=>new B("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{mellomlagreSøknadOgNaviger:c(),avbrytSøknad:c(),arbeidsforhold:X,maxAntallVedlegg:40,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},s={parameters:{msw:{handlers:[x.post("https://svp/rest/storage/svangerskapspenger/vedlegg",()=>new B(null,{status:400}))]}},args:e.args},n={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}}},l={parameters:e.parameters,args:{...e.args,valgteArbeidsforhold:[r,z]}},i={parameters:e.parameters,args:{...e.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1}}},o={parameters:e.parameters,args:{...e.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0}}},d={parameters:e.parameters,args:{...e.args,valgtTilretteleggingId:r,vedlegg:{[r]:[{id:"V134300149934973076055420920289127108",filename:a.name,filesize:a.size,file:a,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"},{id:"V134300149934973076055420920289127101",filename:m.name,filesize:m.size,file:m,uploaded:!0,pending:!1,type:I.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},maxAntallVedlegg:2}};var u,f,k;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    maxAntallVedlegg: 40,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...(k=(f=e.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var T,G,h;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://svp/rest/storage/svangerskapspenger/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(h=(G=s.parameters)==null?void 0:G.docs)==null?void 0:h.source}}};var R,v,A;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
      }]
    }
  }
}`,...(A=(v=n.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var O,b,_;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    valgteArbeidsforhold: [ARBEIDSGIVER_ID, ANNEN_ARBEIDSGIVER_ID]
  }
}`,...(_=(b=l.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var L,N,F;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...(F=(N=i.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var V,D,M;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: SkalIkkeFeileOpplasting.parameters,
  args: {
    ...SkalIkkeFeileOpplasting.args,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    }
  }
}`,...(M=(D=o.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var y,j,J;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(J=(j=d.parameters)==null?void 0:j.docs)==null?void 0:J.source}}};const ce=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","ErTypeEgenNæring","KanMaxHaToVedlegg"];export{o as ErTypeEgenNæring,i as ErTypeFrilans,d as KanMaxHaToVedlegg,l as MedToTilrettelegginger,n as MedVedlegg,s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ce as __namedExportsOrder,Se as default};
