import{j as p}from"./fridagerUtils-c18a0f00.js";import{M as E}from"./index-54751434.js";import{w as R}from"./withSvangerskapspengerContext-4d93004b.js";import{w as _}from"./withRouter-feaf9ee1.js";import{S as j,b as I,c as C}from"./SvangerskapspengesøknadRoutes-78c69267.js";import{S as H}from"./SvangerskapspengerStateMock-54d6da63.js";import{_ as K}from"./soknad-056e750f.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-da441cba.js";import"./v4-4a60fe23.js";import"./links-484cc4a2.js";import"./index-3a2de3aa.js";import"./Forside-a954e32e.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./useSvangerskapspengerContext-0f01bc86.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-7268ef2e.js";import"./amplitude-98a81243.js";import"./provider-400824f9.js";import"./ArrowRight-ecd2b00c.js";const ge={title:"steps/SkjemaSteg",component:j,decorators:[R,_]},e=K,t=({context:w,skalFeileOpplasting:b,maxAntallVedlegg:T=40})=>{const l=new E(C);return b||(l.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(200),l.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200)),p.jsx(H,{context:w,children:p.jsx(j,{id:"263929546-6215-9868-5127-161910165730101",maxAntallVedlegg:T})})},a=t.bind({});a.args={context:{...e,søknad:{...e.søknad,tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]}]}},skalFeileOpplasting:!1};const n=t.bind({});n.args={context:{...e,søknad:{...e.søknad,tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]}]}},skalFeileOpplasting:!0};const s=t.bind({});s.args={context:e,skalFeileOpplasting:!1};const r=t.bind({});r.args={context:{...e,søknad:{...e.søknad,tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]},{...e.søknad.tilrettelegging[0],vedlegg:[]}]}},skalFeileOpplasting:!1};const o=t.bind({});o.args={context:{...e,søknad:{...e.søknad,tilrettelegging:[{...e.søknad.tilrettelegging[0],arbeidsforhold:{...e.søknad.tilrettelegging[0].arbeidsforhold,type:I.FRILANSER}}]}},skalFeileOpplasting:!1};const g=t.bind({});g.args={context:e,skalFeileOpplasting:!1,maxAntallVedlegg:2};var i,c,k;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(k=(c=a.parameters)==null?void 0:c.docs)==null?void 0:k.source}}};var d,m,S;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(S=(m=n.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var x,v,M;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(M=(v=s.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var A,u,h;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,F,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(y=(F=o.parameters)==null?void 0:F.docs)==null?void 0:y.source}}};var O,V,P;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`({
  context,
  skalFeileOpplasting,
  maxAntallVedlegg = 40
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>;
}`,...(P=(V=g.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};const le=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{o as ErTypeFrilans,g as KanMaxHaToVedlegg,r as MedToTilrettelegginger,s as MedVedlegg,n as SkalFeileOpplasting,a as SkalIkkeFeileOpplasting,le as __namedExportsOrder,ge as default};
