import{j as Y}from"./jsx-runtime-1caa8f64.js";import{w as Vn}from"./withRouter-1922d0e8.js";import{a as I}from"./chunk-WFFRPTHA-80d37c1b.js";import{D as bn,R as An}from"./eksisterendeSakUtils-412a6125.js";import"./Tidsperioden-17ce50bb.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{m as Bn}from"./mapSøkerinfoDTO-27dc6acb.js";import{F as Hn}from"./FpDataContext-c0784ba8.js";import{V as fn}from"./Velkommen-25066717.js";import{i as Cn}from"./amplitude-0b5405b7.js";import"./index-3ff98463.js";import"./index-a01a9712.js";import"./dateFormValidation-46b46a42.js";import"./dates-01028c04.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./dateUtils-8c5fa214.js";import"./timezone-b3f5c703.js";import"./Perioden-56036cec.js";import"./leggTilPeriode-e4065a96.js";import"./Periodene-dea6e734.js";import"./uttaksPlanStatus-640e4161.js";import"./stringUtils-a9168712.js";import"./barnUtils-83c58311.js";import"./velkommenUtils-24f8c4c3.js";import"./index-47edccfa.js";import"./Tag-3d686a5d.js";import"./Link-d47e444a.js";import"./index-daf33b80.js";import"./links-4d39192e.js";import"./DinePlikter-9775427b.js";import"./DinePersonopplysningerModal-e20387c4.js";import"./Ingress-10c1b249.js";import"./useFpNavigator-84241c56.js";import"./amplitude.esm-2809efde.js";var L=(n=>(n.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",n.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",n.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",n.UNDER_BEHANDLING="UNDER_BEHANDLING",n))(L||{});const In=()=>(...n)=>(I("button-click")(...n),Promise.resolve()),Cr={title:"pages/Velkommen",component:fn,decorators:[Vn]},i={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:n,saker:y,søkerinfo:P,mellomlagreSøknadOgNaviger:U=In(),gåTilNesteSide:Gn})=>(Cn(),Y.jsx(Hn,{onDispatch:Gn,children:Y.jsx(fn,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:y,fnr:"123",harGodkjentVilkår:n,søkerInfo:Bn(P),setErEndringssøknad:I("button-click"),setHarGodkjentVilkår:I("button-click"),setSøknadGjelderNyttBarn:I("button-click"),mellomlagreSøknadOgNaviger:U})})),Sn=(n,y)=>{const P=y.map(U=>({fnr:U}));return{...n,barn:P}},o=n=>({dekningsgrad:bn.HUNDRE_PROSENT,familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:An.BEGGE_RETT,sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=n=>({...i,søker:{...i.søker,barn:n}}),a="2022-12-06",Ln="2022-12-08",C={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},un={...C,dødsdato:"2022-12-07"},Nn={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},vn={...Nn,dødsdato:"2022-12-07"},H={fødselsdato:a,dødsdato:a},jn=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},_={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Mn={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},R=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:jn,fødselsdato:a}),Dn=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:jn,termindato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),yn=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ln,fødselsdato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),Pn=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Un=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),K=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),M=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),_n=Sn(M,["1","2"]),Rn=Sn(M,["1"]),Tn=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Kn=[R,{...Dn,saksnummer:"555555"}],On=[],s=e.bind({});s.args={harGodkjentVilkår:!1,saker:On,søkerinfo:i};const l=e.bind({});l.args={harGodkjentVilkår:!0,saker:On,søkerinfo:i};const k=e.bind({});k.args={saker:[R],søkerinfo:r([t])};const d=e.bind({});d.args={saker:[Dn],søkerinfo:i};const c=e.bind({});c.args={saker:[yn],søkerinfo:r([t])};const g=e.bind({});g.args={saker:[Pn],søkerinfo:r([t])};const m=e.bind({});m.args={saker:Kn,søkerinfo:r([t])};const x=e.bind({});x.args={saker:[Un],søkerinfo:i};const p=e.bind({});p.args={saker:[K],søkerinfo:i};const F=e.bind({});F.args={saker:[K],søkerinfo:r([t])};const E=e.bind({});E.args={saker:[M],søkerinfo:r([t,_])};const f=e.bind({});f.args={saker:[Tn],søkerinfo:r([t,_,Mn])};const Jn=r([C]),hn=r([C,Nn]),J=r([un]),wn=r([un,vn]),Yn=r([H]),qn=r([H,H]),w=r([C,H]),zn=r([C,vn]),S=e.bind({});S.args={saker:[],søkerinfo:Jn};const u=e.bind({});u.args={saker:[],søkerinfo:hn};const N=e.bind({});N.args={saker:[],søkerinfo:J};const v=e.bind({});v.args={saker:[],søkerinfo:wn};const j=e.bind({});j.args={saker:[],søkerinfo:Yn};const D=e.bind({});D.args={saker:[],søkerinfo:qn};const T=e.bind({});T.args={saker:[],søkerinfo:w};const O=e.bind({});O.args={saker:[],søkerinfo:zn};const h=e.bind({});h.args={saker:[M],søkerinfo:w};const G=e.bind({});G.args={saker:[R],søkerinfo:J};const V=e.bind({});V.args={saker:[K],søkerinfo:J};const b=e.bind({});b.args={saker:[_n],søkerinfo:hn};const A=e.bind({});A.args={saker:[Rn],søkerinfo:w};const B=e.bind({});B.args={saker:[Tn],søkerinfo:r([t,_,H])};var q,z,Q;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Q=(z=s.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Z=(X=l.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ne=(ee=k.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,ae,te;d.parameters={...d.parameters,docs:{...(re=d.parameters)==null?void 0:re.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(te=(ae=d.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var oe,ie,se;c.parameters={...c.parameters,docs:{...(oe=c.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(se=(ie=c.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var le,ke,de;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(de=(ke=g.parameters)==null?void 0:ke.docs)==null?void 0:de.source}}};var ce,ge,me;m.parameters={...m.parameters,docs:{...(ce=m.parameters)==null?void 0:ce.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(me=(ge=m.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var xe,pe,Fe;x.parameters={...x.parameters,docs:{...(xe=x.parameters)==null?void 0:xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Fe=(pe=x.parameters)==null?void 0:pe.docs)==null?void 0:Fe.source}}};var Ee,fe,Se;p.parameters={...p.parameters,docs:{...(Ee=p.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Se=(fe=p.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var ue,Ne,ve;F.parameters={...F.parameters,docs:{...(ue=F.parameters)==null?void 0:ue.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ve=(Ne=F.parameters)==null?void 0:Ne.docs)==null?void 0:ve.source}}};var je,De,Te;E.parameters={...E.parameters,docs:{...(je=E.parameters)==null?void 0:je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Te=(De=E.parameters)==null?void 0:De.docs)==null?void 0:Te.source}}};var Oe,he,Ge;f.parameters={...f.parameters,docs:{...(Oe=f.parameters)==null?void 0:Oe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ge=(he=f.parameters)==null?void 0:he.docs)==null?void 0:Ge.source}}};var Ve,be,Ae;S.parameters={...S.parameters,docs:{...(Ve=S.parameters)==null?void 0:Ve.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ae=(be=S.parameters)==null?void 0:be.docs)==null?void 0:Ae.source}}};var Be,He,Ce;u.parameters={...u.parameters,docs:{...(Be=u.parameters)==null?void 0:Be.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ce=(He=u.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Ie,Le,Me;N.parameters={...N.parameters,docs:{...(Ie=N.parameters)==null?void 0:Ie.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Me=(Le=N.parameters)==null?void 0:Le.docs)==null?void 0:Me.source}}};var ye,Pe,Ue;v.parameters={...v.parameters,docs:{...(ye=v.parameters)==null?void 0:ye.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ue=(Pe=v.parameters)==null?void 0:Pe.docs)==null?void 0:Ue.source}}};var _e,Re,Ke;j.parameters={...j.parameters,docs:{...(_e=j.parameters)==null?void 0:_e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ke=(Re=j.parameters)==null?void 0:Re.docs)==null?void 0:Ke.source}}};var Je,we,Ye;D.parameters={...D.parameters,docs:{...(Je=D.parameters)==null?void 0:Je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ye=(we=D.parameters)==null?void 0:we.docs)==null?void 0:Ye.source}}};var qe,ze,Qe;T.parameters={...T.parameters,docs:{...(qe=T.parameters)==null?void 0:qe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Qe=(ze=T.parameters)==null?void 0:ze.docs)==null?void 0:Qe.source}}};var We,Xe,Ze;O.parameters={...O.parameters,docs:{...(We=O.parameters)==null?void 0:We.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ze=(Xe=O.parameters)==null?void 0:Xe.docs)==null?void 0:Ze.source}}};var $e,en,nn;h.parameters={...h.parameters,docs:{...($e=h.parameters)==null?void 0:$e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(nn=(en=h.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};var rn,an,tn;G.parameters={...G.parameters,docs:{...(rn=G.parameters)==null?void 0:rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(tn=(an=G.parameters)==null?void 0:an.docs)==null?void 0:tn.source}}};var on,sn,ln;V.parameters={...V.parameters,docs:{...(on=V.parameters)==null?void 0:on.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ln=(sn=V.parameters)==null?void 0:sn.docs)==null?void 0:ln.source}}};var kn,dn,cn;b.parameters={...b.parameters,docs:{...(kn=b.parameters)==null?void 0:kn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(cn=(dn=b.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var gn,mn,xn;A.parameters={...A.parameters,docs:{...(gn=A.parameters)==null?void 0:gn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(xn=(mn=A.parameters)==null?void 0:mn.docs)==null?void 0:xn.source}}};var pn,Fn,En;B.parameters={...B.parameters,docs:{...(pn=B.parameters)==null?void 0:pn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(En=(Fn=B.parameters)==null?void 0:Fn.docs)==null?void 0:En.source}}};const Ir=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{s as Default,l as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,O as HarIngenSakerMedEnLevendeOgEnDødTvilling,T as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,j as HarIngenSakerOgEtDødfødtBarn,S as HarIngenSakerOgEttBarn,N as HarIngenSakerOgEttDødtBarn,v as HarIngenSakerOgToDødeTvillinger,D as HarIngenSakerOgToDødfødteBarn,u as HarIngenSakerOgTvillinger,k as HarOpprettetFPSakFødselMedBarnetIPDL,F as HarSakAdopsjonMedBarnIPDL,V as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,f as HarSakFødselTrillinger,E as HarSakFødselTvillinger,x as HarSakFødselUtenBarnIPDL,h as HarSakMedEnLevendeOgEnDødfødtTvilling,G as HarSakMedEtDødtBarn,A as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,b as HarSakMedOppgittBarnTvillingerAlleLever,B as HarSakMedTrillingerEnErDød,Ir as __namedExportsOrder,Cr as default};
