import{j as l}from"./jsx-runtime-69eee039.js";import{w as z}from"./withIntl-4043b8b4.js";import{w as H}from"./withRouter-2e2c6e6b.js";import{w as J,F as Q}from"./ForeldrepengerStateMock-8c04d332.js";import{A as V}from"./AxiosMock-f4313c42.js";import{_ as W}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as X}from"./soknadMedEttBarn-66625a0c.js";import{A as D}from"./AnnenForelder-603657a2.js";import"./index-7c191284.js";import"./IntlProvider-7d7f37e2.js";import"./validationUtils-3923a44f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-d6f51789.js";import"./amplitude-bdf1e125.js";import"./api-38cb33cc.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-4c286eb0.js";import"./Periodene-7b9c80a7.js";import"./FormikFileUploader-cbd05895.js";import"./AttachmentList-bc8c7263.js";import"./Attachment-31710907.js";import"./formUtils-f08b9c6b.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-6a5c6f7b.js";import"./validationUtil-eb14dde0.js";import"./RegistrertePersonalia-ec341efb.js";import"./useSøkerinfo-ae49b1f5.js";const e=W,n=X,_n={title:"steps/AnnenForelder",component:D,decorators:[H,z,J]},r=({context:C,søkerinfo:Y})=>{const q=f=>{f.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),f.onPost("/storage").reply(200,void 0)};return l.jsx(V,{mock:q,children:l.jsx(Q,{søknad:C,søkerinfo:Y,children:l.jsx(D,{})})})},o=r.bind({});o.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"}}},søkerinfo:e};const t=r.bind({});t.args={context:{...n,søknad:{...n.søknad,annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const a=r.bind({});a.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const s=r.bind({});s.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const c=r.bind({});c.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},søkerinfo:{søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const k=r.bind({});k.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,barn:[]}}};const i=r.bind({});i.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,kjønn:"K",barn:[]}}};const d=r.bind({});d.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const p=r.bind({});p.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var m,M,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(g=(M=o.parameters)==null?void 0:M.docs)==null?void 0:g.source}}};var u,x,F;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(F=(x=t.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var A,S,P;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(P=(S=a.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var v,b,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var j,O,B;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(B=(O=c.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var U,E,I;k.parameters={...k.parameters,docs:{...(U=k.parameters)==null?void 0:U.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(I=(E=k.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var L,T,_;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var w,G,h;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(h=(G=d.parameters)==null?void 0:G.docs)==null?void 0:h.source}}};var K,R,N;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(N=(R=p.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};const wn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{o as Default,p as FarGiftUfødtBarn,d as FarUfødtBarn,c as ForFar,i as MedmorUfødtBarn,k as MorUfødtBarn,t as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,a as SkalOppgiPersonaliaNavnMangler,wn as __namedExportsOrder,_n as default};
//# sourceMappingURL=AnnenForelder.stories-8a0d446c.js.map
