import{j as Y}from"./jsx-runtime-69eee039.js";import{w as br}from"./withRouter-f0df7a0f.js";import{a as L}from"./chunk-AY7I2SME-331d03ca.js";import{D as Br,R as Hr}from"./eksisterendeSakUtils-ef126668.js";import"./Tidsperioden-a95d044c.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{m as Cr}from"./mapSøkerinfoDTO-268f32cb.js";import{F as Fr}from"./FpDataContext-75ac2616.js";import{V as ur}from"./Velkommen-76afd8e0.js";import"./index-7e40074d.js";import"./v4-a960c1f4.js";import"./dateUtils-e2f5989d.js";import"./Perioden-f9b2043e.js";import"./leggTilPeriode-514e4bf5.js";import"./Periodene-e4e7892a.js";import"./uttaksPlanStatus-38959b58.js";import"./stringUtils-f4190696.js";import"./barnUtils-6056f31e.js";import"./velkommenUtils-7e7dde66.js";import"./index-47edccfa.js";import"./Link-b834ea2b.js";import"./index-b3a39e30.js";import"./links-b36d21ab.js";import"./DinePlikter-febbb9b5.js";import"./message-650a43cb.js";import"./DinePersonopplysningerModal-253bb78b.js";import"./routes-9effe5a6.js";var x=(r=>(r.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",r.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",r.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",r.UNDER_BEHANDLING="UNDER_BEHANDLING",r))(x||{});const Ar=()=>(...r)=>(L("button-click")(...r),Promise.resolve()),On={title:"pages/Velkommen",component:ur,decorators:[br]},s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:r,saker:y,søkerinfo:P,mellomlagreSøknadOgNaviger:U=Ar(),gåTilNesteSide:Vr})=>Y.jsx(Fr,{onDispatch:Vr,children:Y.jsx(ur,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:y,fnr:"123",harGodkjentVilkår:r,søkerInfo:Cr(P),setErEndringssøknad:L("button-click"),setHarGodkjentVilkår:L("button-click"),setSøknadGjelderNyttBarn:L("button-click"),mellomlagreSøknadOgNaviger:U})}),Nr=(r,y)=>{const P=y.map(U=>({fnr:U}));return{...r,barn:P}},t=r=>({dekningsgrad:Br.HUNDRE_PROSENT,familiehendelse:{fødselsdato:r.fødselsdato,omsorgsovertakelse:r.omsorgsovertakelse,antallBarn:r.antallBarn,termindato:r.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:r.gjelderAdopsjon,kanSøkeOmEndring:r.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Hr.BEGGE_RETT,sakAvsluttet:r.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:r.åpenbehandlingTilstand!==void 0?{tilstand:r.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),n=r=>({...s,søker:{...s.søker,barn:r}}),a="2022-12-06",Ir="2022-12-08",I={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},vr={...I,dødsdato:"2022-12-07"},Er={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},jr={...Er,dødsdato:"2022-12-07"},A={fødselsdato:a,dødsdato:a},Dr=!1,o={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},_={...o,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Lr={...o,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},R=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Dr,fødselsdato:a}),Tr=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Dr,termindato:a,åpenbehandlingTilstand:x.UNDER_BEHANDLING}),xr=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ir,fødselsdato:a,åpenbehandlingTilstand:x.UNDER_BEHANDLING}),Mr=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),yr=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),K=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),M=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:x.UNDER_BEHANDLING}),Pr=Nr(M,["1","2"]),Ur=Nr(M,["1"]),Or=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),_r=[R,{...Tr,saksnummer:"555555"}],hr=[],i=e.bind({});i.args={harGodkjentVilkår:!1,saker:hr,søkerinfo:s};const k=e.bind({});k.args={harGodkjentVilkår:!0,saker:hr,søkerinfo:s};const l=e.bind({});l.args={saker:[R],søkerinfo:n([o])};const d=e.bind({});d.args={saker:[Tr],søkerinfo:s};const c=e.bind({});c.args={saker:[xr],søkerinfo:n([o])};const g=e.bind({});g.args={saker:[Mr],søkerinfo:n([o])};const m=e.bind({});m.args={saker:_r,søkerinfo:n([o])};const p=e.bind({});p.args={saker:[yr],søkerinfo:s};const f=e.bind({});f.args={saker:[K],søkerinfo:s};const S=e.bind({});S.args={saker:[K],søkerinfo:n([o])};const u=e.bind({});u.args={saker:[M],søkerinfo:n([o,_])};const N=e.bind({});N.args={saker:[Or],søkerinfo:n([o,_,Lr])};const Rr=n([I]),Gr=n([I,Er]),J=n([vr]),Kr=n([vr,jr]),Jr=n([A]),wr=n([A,A]),w=n([I,A]),Yr=n([I,jr]),v=e.bind({});v.args={saker:[],søkerinfo:Rr};const E=e.bind({});E.args={saker:[],søkerinfo:Gr};const j=e.bind({});j.args={saker:[],søkerinfo:J};const D=e.bind({});D.args={saker:[],søkerinfo:Kr};const T=e.bind({});T.args={saker:[],søkerinfo:Jr};const O=e.bind({});O.args={saker:[],søkerinfo:wr};const h=e.bind({});h.args={saker:[],søkerinfo:w};const G=e.bind({});G.args={saker:[],søkerinfo:Yr};const V=e.bind({});V.args={saker:[M],søkerinfo:w};const b=e.bind({});b.args={saker:[R],søkerinfo:J};const B=e.bind({});B.args={saker:[K],søkerinfo:J};const H=e.bind({});H.args={saker:[Pr],søkerinfo:Gr};const C=e.bind({});C.args={saker:[Ur],søkerinfo:w};const F=e.bind({});F.args={saker:[Or],søkerinfo:n([o,_,A])};var q,z,Q;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Q=(z=i.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Z=(X=k.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,re;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(re=(ee=l.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,ae,oe;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(oe=(ae=d.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var te,se,ie;c.parameters={...c.parameters,docs:{...(te=c.parameters)==null?void 0:te.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ie=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var ke,le,de;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(de=(le=g.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,ge,me;m.parameters={...m.parameters,docs:{...(ce=m.parameters)==null?void 0:ce.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(me=(ge=m.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var pe,fe,Se;p.parameters={...p.parameters,docs:{...(pe=p.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Se=(fe=p.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var ue,Ne,ve;f.parameters={...f.parameters,docs:{...(ue=f.parameters)==null?void 0:ue.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ve=(Ne=f.parameters)==null?void 0:Ne.docs)==null?void 0:ve.source}}};var Ee,je,De;S.parameters={...S.parameters,docs:{...(Ee=S.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(De=(je=S.parameters)==null?void 0:je.docs)==null?void 0:De.source}}};var Te,Oe,he;u.parameters={...u.parameters,docs:{...(Te=u.parameters)==null?void 0:Te.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(he=(Oe=u.parameters)==null?void 0:Oe.docs)==null?void 0:he.source}}};var Ge,Ve,be;N.parameters={...N.parameters,docs:{...(Ge=N.parameters)==null?void 0:Ge.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(be=(Ve=N.parameters)==null?void 0:Ve.docs)==null?void 0:be.source}}};var Be,He,Ce;v.parameters={...v.parameters,docs:{...(Be=v.parameters)==null?void 0:Be.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ce=(He=v.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Fe,Ae,Ie;E.parameters={...E.parameters,docs:{...(Fe=E.parameters)==null?void 0:Fe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ie=(Ae=E.parameters)==null?void 0:Ae.docs)==null?void 0:Ie.source}}};var Le,xe,Me;j.parameters={...j.parameters,docs:{...(Le=j.parameters)==null?void 0:Le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Me=(xe=j.parameters)==null?void 0:xe.docs)==null?void 0:Me.source}}};var ye,Pe,Ue;D.parameters={...D.parameters,docs:{...(ye=D.parameters)==null?void 0:ye.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ue=(Pe=D.parameters)==null?void 0:Pe.docs)==null?void 0:Ue.source}}};var _e,Re,Ke;T.parameters={...T.parameters,docs:{...(_e=T.parameters)==null?void 0:_e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ke=(Re=T.parameters)==null?void 0:Re.docs)==null?void 0:Ke.source}}};var Je,we,Ye;O.parameters={...O.parameters,docs:{...(Je=O.parameters)==null?void 0:Je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ye=(we=O.parameters)==null?void 0:we.docs)==null?void 0:Ye.source}}};var qe,ze,Qe;h.parameters={...h.parameters,docs:{...(qe=h.parameters)==null?void 0:qe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Qe=(ze=h.parameters)==null?void 0:ze.docs)==null?void 0:Qe.source}}};var We,Xe,Ze;G.parameters={...G.parameters,docs:{...(We=G.parameters)==null?void 0:We.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ze=(Xe=G.parameters)==null?void 0:Xe.docs)==null?void 0:Ze.source}}};var $e,er,rr;V.parameters={...V.parameters,docs:{...($e=V.parameters)==null?void 0:$e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(rr=(er=V.parameters)==null?void 0:er.docs)==null?void 0:rr.source}}};var nr,ar,or;b.parameters={...b.parameters,docs:{...(nr=b.parameters)==null?void 0:nr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(or=(ar=b.parameters)==null?void 0:ar.docs)==null?void 0:or.source}}};var tr,sr,ir;B.parameters={...B.parameters,docs:{...(tr=B.parameters)==null?void 0:tr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ir=(sr=B.parameters)==null?void 0:sr.docs)==null?void 0:ir.source}}};var kr,lr,dr;H.parameters={...H.parameters,docs:{...(kr=H.parameters)==null?void 0:kr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(dr=(lr=H.parameters)==null?void 0:lr.docs)==null?void 0:dr.source}}};var cr,gr,mr;C.parameters={...C.parameters,docs:{...(cr=C.parameters)==null?void 0:cr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(mr=(gr=C.parameters)==null?void 0:gr.docs)==null?void 0:mr.source}}};var pr,fr,Sr;F.parameters={...F.parameters,docs:{...(pr=F.parameters)==null?void 0:pr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Sr=(fr=F.parameters)==null?void 0:fr.docs)==null?void 0:Sr.source}}};const hn=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{i as Default,k as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,G as HarIngenSakerMedEnLevendeOgEnDødTvilling,h as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,T as HarIngenSakerOgEtDødfødtBarn,v as HarIngenSakerOgEttBarn,j as HarIngenSakerOgEttDødtBarn,D as HarIngenSakerOgToDødeTvillinger,O as HarIngenSakerOgToDødfødteBarn,E as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,B as HarSakAdopsjonMedEtDødtBarn,f as HarSakAdopsjonUtenBarnIPDL,N as HarSakFødselTrillinger,u as HarSakFødselTvillinger,p as HarSakFødselUtenBarnIPDL,V as HarSakMedEnLevendeOgEnDødfødtTvilling,b as HarSakMedEtDødtBarn,C as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,H as HarSakMedOppgittBarnTvillingerAlleLever,F as HarSakMedTrillingerEnErDød,hn as __namedExportsOrder,On as default};
//# sourceMappingURL=Velkommen.stories-90d55897.js.map
