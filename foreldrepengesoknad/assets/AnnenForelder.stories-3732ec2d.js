import{j as l}from"./jsx-runtime-69eee039.js";import{w as z}from"./withRouter-abe5f971.js";import{w as H,F as J}from"./ForeldrepengerStateMock-2da5e9a6.js";import{A as Q}from"./AxiosMock-030c8bf1.js";import{_ as V}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as W}from"./soknadMedEttBarn-66625a0c.js";import{A as D}from"./AnnenForelder-8e3def61.js";import"./index-7c191284.js";import"./useSøknad-05357384.js";import"./validationUtils-5499fd9f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-2a26cc46.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-2f0f23d4.js";import"./amplitude-e7683f28.js";import"./api-586fa5a6.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-ed03f05c.js";import"./Periodene-b35d6a88.js";import"./FormikFileUploader-72e25524.js";import"./AttachmentList-0feb94b1.js";import"./Attachment-d4253051.js";import"./formUtils-a1fa05f4.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-793544df.js";import"./validationUtil-629ed893.js";import"./RegistrertePersonalia-a147ac7e.js";import"./useSøkerinfo-e2871e4f.js";const e=V,n=W,In={title:"steps/AnnenForelder",component:D,decorators:[z,H]},r=({context:C,søkerinfo:Y})=>{const q=f=>{f.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),f.onPost("/storage").reply(200,void 0)};return l.jsx(Q,{mock:q,children:l.jsx(J,{søknad:C,søkerinfo:Y,children:l.jsx(D,{})})})},o=r.bind({});o.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"}}},søkerinfo:e};const a=r.bind({});a.args={context:{...n,søknad:{...n.søknad,annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const t=r.bind({});t.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[]}}};const s=r.bind({});s.args={context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},søkerinfo:{søker:{...e,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const c=r.bind({});c.args={context:{...n,søknad:{...n.søknad,barn:{...n.søknad.barn,fnr:"21091981146"},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},søkerinfo:{søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const k=r.bind({});k.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,barn:[]}}};const i=r.bind({});i.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,kjønn:"K",barn:[]}}};const d=r.bind({});d.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const p=r.bind({});p.args={context:{...n,søknad:{...n.søknad,barn:{type:"ufødt",antallBarn:"1",termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1}}},søkerinfo:{...e,søker:{...e.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var M,m,g;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`({
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
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var u,x,F;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(F=(x=a.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var A,S,P;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
}`,...(P=(S=t.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var v,b,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
}`,...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var G,K,R;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`({
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
}`,...(R=(K=d.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var h,w,N;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
}`,...(N=(w=p.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const Ln=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{o as Default,p as FarGiftUfødtBarn,d as FarUfødtBarn,c as ForFar,i as MedmorUfødtBarn,k as MorUfødtBarn,a as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,Ln as __namedExportsOrder,In as default};
//# sourceMappingURL=AnnenForelder.stories-3732ec2d.js.map
