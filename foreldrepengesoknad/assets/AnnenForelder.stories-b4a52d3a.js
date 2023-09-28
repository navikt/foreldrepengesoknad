import{j as l}from"./jsx-runtime-69eee039.js";import{w as z}from"./withIntl-5b625509.js";import{w as H}from"./withRouter-50e5a3a8.js";import{w as J,F as Q}from"./ForeldrepengerStateMock-5e97e270.js";import{A as V}from"./AxiosMock-84c9c037.js";import{_ as W}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as X}from"./soknadMedEttBarn-66625a0c.js";import{A as D}from"./AnnenForelder-c240815e.js";import"./index-7c191284.js";import"./IntlProvider-819d5fbb.js";import"./validationUtils-0c7fa3e5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-a6eb7500.js";import"./dateUtils-2cd75fe4.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-c91ff169.js";import"./useSaveLoadedRoute-be1eb81e.js";import"./amplitude-bdf1e125.js";import"./api-7b722a65.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-c3cad064.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-3d0150ec.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-07636938.js";import"./Periodene-255b16d1.js";import"./FormikFileUploader-101bf53f.js";import"./AttachmentList-563636ad.js";import"./Attachment-0ba07e00.js";import"./Skjemanummer-77149054.js";import"./formUtils-d5863e5c.js";import"./useOnValidSubmit-bd5aa797.js";import"./index-47edccfa.js";import"./RegistrertePersonalia-48e431fa.js";import"./personUtils-34a8287c.js";import"./useSøkerinfo-79a04600.js";import"./links-b36d21ab.js";const e=W,n=X,qn={title:"steps/AnnenForelder",component:D,decorators:[H,z,J]},r=({context:C,søkerinfo:Y})=>{const q=m=>{m.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),m.onPost("/storage").reply(200,void 0)};return l.jsx(V,{mock:q,children:l.jsx(Q,{søknad:C,søkerinfo:Y,children:l.jsx(D,{})})})},o=r.bind({});o.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"}}},søkerinfo:e};const t=r.bind({});t.args={context:{...n,søknad:{...n.søknad,annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const a=r.bind({});a.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const s=r.bind({});s.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const c=r.bind({});c.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},søkerinfo:{søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const i=r.bind({});i.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,barn:[]}}};const k=r.bind({});k.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,kjønn:"K",barn:[]}}};const d=r.bind({});d.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const p=r.bind({});p.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var f,M,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`({
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
}`,...(B=(O=c.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var U,E,I;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
}`,...(I=(E=i.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var L,T,_;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(_=(T=k.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var w,G,h;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`({
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
}`,...(N=(R=p.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};const zn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{o as Default,p as FarGiftUfødtBarn,d as FarUfødtBarn,c as ForFar,k as MedmorUfødtBarn,i as MorUfødtBarn,t as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,a as SkalOppgiPersonaliaNavnMangler,zn as __namedExportsOrder,qn as default};
//# sourceMappingURL=AnnenForelder.stories-b4a52d3a.js.map
