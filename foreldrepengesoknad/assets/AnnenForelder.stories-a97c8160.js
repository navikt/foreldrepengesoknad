import{j as l}from"./jsx-runtime-2c139190.js";import{w as q}from"./withIntl-56d3014e.js";import{w as z}from"./withRouter-f5ce0c47.js";import{w as H,F as J}from"./ForeldrepengerStateMock-6cb8bbe3.js";import{A as Q}from"./AxiosMock-1d20c8fe.js";import{_ as V}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as W}from"./soknadMedEttBarn-66625a0c.js";import{A as D}from"./AnnenForelder-18614a49.js";import"./index-b14cf94f.js";import"./IntlProvider-8c9095a4.js";import"./validationUtils-749fcdf4.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-958c5a2a.js";import"./dateUtils-c35f161a.js";import"./getTypedFormComponents-d760cc41.js";import"./mapSøkerinfoDTO-ee5c98c4.js";import"./useFortsettSøknadSenere-3c16dad9.js";import"./amplitude-7714a9b7.js";import"./api-b639d329.js";import"./apiInterceptor-53028d2f.js";import"./globalUtil-9d9e0ee4.js";import"./FormikFileUploader-bbaf3675.js";import"./AttachmentList-b4f71470.js";import"./Attachment-6568bbd4.js";import"./vedleggUtils-40a9f1c3.js";import"./Attachment-a8e5b8d1.js";import"./Skjemanummer-77149054.js";import"./formUtils-7620ebbd.js";import"./useOnValidSubmit-b0c8284c.js";import"./useSaveLoadedRoute-29d67678.js";import"./AnnenForelder-5c5d4f7f.js";import"./periodeUtils-80351000.js";import"./Periodene-527d5357.js";import"./index-47edccfa.js";import"./RegistrertePersonalia-f7fa476d.js";import"./personUtils-191596d0.js";import"./useSøkerinfo-9e58976c.js";import"./links-b36d21ab.js";const e=V,n=W,qn={title:"steps/AnnenForelder",component:D,decorators:[z,q,H]},r=({context:C,søkerinfo:Y})=>l(Q,{mock:m=>{m.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),m.onPost("/storage").reply(200,void 0)},children:l(J,{søknad:C,søkerinfo:Y,children:l(D,{})})}),o=r.bind({});o.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"}}},søkerinfo:e};const t=r.bind({});t.args={context:{...n,søknad:{...n.søknad,annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const a=r.bind({});a.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const s=r.bind({});s.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const c=r.bind({});c.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},søkerinfo:{søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const k=r.bind({});k.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,barn:[]}}};const i=r.bind({});i.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,kjønn:"K",barn:[]}}};const d=r.bind({});d.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const p=r.bind({});p.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var f,M,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`({
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
}`,...(g=(M=o.parameters)==null?void 0:M.docs)==null?void 0:g.source}}};var u,F,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(x=(F=t.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};var A,S,P;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var O,B,j;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`({
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
}`,...(j=(B=c.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var U,E,I;k.parameters={...k.parameters,docs:{...(U=k.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
}`,...(h=(G=d.parameters)==null?void 0:G.docs)==null?void 0:h.source}}};var K,N,R;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`({
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
}`,...(R=(N=p.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};const zn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{o as Default,p as FarGiftUfødtBarn,d as FarUfødtBarn,c as ForFar,i as MedmorUfødtBarn,k as MorUfødtBarn,t as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,a as SkalOppgiPersonaliaNavnMangler,zn as __namedExportsOrder,qn as default};
//# sourceMappingURL=AnnenForelder.stories-a97c8160.js.map
