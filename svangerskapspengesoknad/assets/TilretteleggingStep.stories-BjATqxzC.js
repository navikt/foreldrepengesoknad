import{i as b,j as i,f as o,I as a}from"./VeiviserPage-C75wD2__.js";import{a as f}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as u,S,C as s}from"./routes-BUvKtCoD.js";import{M as y,A as I}from"./useSvpNavigator-BZZPUZdx.js";import{A,S as R}from"./attachmentType-CO8SwnHI.js";import{T as d}from"./TilretteleggingStep-DQL1kxfS.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DetDAlbJ.js";import"./Checkbox-Cnui9qju.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./dateUtils-DSgpPuow.js";import"./Bedriftsbanner-Brr_EDAK.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-D4RPoczx.js";import"./ReadMore-DXqh3bRO.js";import"./ExpansionCard-DZnUEyB1.js";const n=()=>(...t)=>(f("button-click")(...t),Promise.resolve()),G=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],J={title:"steps/TilretteleggingStep",component:d,render:({gåTilNesteSide:t=f("button-click"),type:c,...E})=>(b(),i.jsx(y,{initialEntries:[u.TILRETTELEGGING],children:i.jsx(S,{onDispatch:t,initialState:{[s.TILRETTELEGGINGER]:[{id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:c,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:A.TILRETTELEGGING,skjemanummer:R.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[s.VALGT_TILRETTELEGGING_ID]:"990322244",[s.OM_BARNET]:{erBarnetFødt:!1,termindato:o().add(45,"days").format(a),fødselsdato:o().add(45,"days").format(a)}},children:i.jsx(d,{...E})})}))},e={args:{mellomlagreSøknadOgNaviger:n(),avbrytSøknad:n(),arbeidsforhold:G,type:I.VIRKSOMHET}},r={args:{...e.args,type:I.FRILANSER}};var m,p,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    type: Arbeidsforholdstype.VIRKSOMHET
  }
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var g,T,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: Arbeidsforholdstype.FRILANSER
  }
}`,...(v=(T=r.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};const q=["Default","Frilanser"];export{e as Default,r as Frilanser,q as __namedExportsOrder,J as default};
