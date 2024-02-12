import{j as o}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{_ as S}from"./soknad-056e750f.js";import{S as g,C as t}from"./routes-345f7acb.js";import{O as p}from"./Oppsummering-76b08b1f.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-bf3b07ca.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./attachmentApi-1d2d61fa.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c112d50a.js";import"./dates-5d9af962.js";import"./useFortsettSøknadSenere-40515bb0.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./egenNæringFormUtils-49aad5b8.js";import"./dateUtils-8598b125.js";import"./ArbeidsforholdInformasjon-743d756d.js";import"./HStack-13158dfb.js";import"./BackButton-f80f5ffe.js";import"./Paperplane-3462cdad.js";const q={title:"steps/Oppsummering",component:p},a=()=>(...n)=>(x("button-click")(...n),Promise.resolve()),r=S,N=({mellomlagreSøknadOgNaviger:n=a(),gåTilNesteSide:l,sendSøknad:d=()=>Promise.resolve()})=>o.jsx(g,{onDispatch:l,initialState:{[t.TILRETTELEGGINGER]:r.søknad.tilrettelegging,[t.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[t.OM_BARNET]:r.søknad.barn,[t.UTENLANDSOPPHOLD]:{iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0}},children:o.jsx(p,{mellomlagreSøknadOgNaviger:n,avbrytSøknad:a(),søkerInfo:r.søkerinfo,sendSøknad:d})}),e=N.bind({});var i,s,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  sendSøknad = () => Promise.resolve()
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.OM_BARNET]: context.søknad.barn,
    [ContextDataType.UTENLANDSOPPHOLD]: {
      iNorgeNeste12Mnd: true,
      iNorgeSiste12Mnd: true
    }
  }}>
            <Oppsummering mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} sendSøknad={sendSøknad} />
        </SvpDataContext>;
}`,...(m=(s=e.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,q as default};
