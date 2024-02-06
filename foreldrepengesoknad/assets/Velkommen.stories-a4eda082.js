import{j as P}from"./jsx-runtime-1caa8f64.js";import{a as B}from"./chunk-WFFRPTHA-80d37c1b.js";import{D as Ge,R as be}from"./eksisterendeSakUtils-c8490a73.js";import"./Tidsperioden-50230361.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{m as Te}from"./mapSøkerinfoDTO-12ea38d4.js";import{F as Ae}from"./FpDataContext-c0784ba8.js";import{V as ue}from"./Velkommen-6c218e24.js";import{i as Re}from"./IntlProvider-6c566b41.js";import{S as Le}from"./useFpNavigator-4a28a96f.js";import{M as Be}from"./dateFormValidation-9bfd2ef5.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./dateUtils-2d535cd3.js";import"./timezone-b3f5c703.js";import"./Perioden-0a366813.js";import"./leggTilPeriode-d0ea1657.js";import"./Periodene-496bb434.js";import"./uttaksPlanStatus-98c9f3b7.js";import"./stringUtils-5476a1f3.js";import"./barnUtils-91b846b3.js";import"./velkommenUtils-19cb6b19.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./ErrorSummaryHookForm-0794039a.js";import"./dates-2640516b.js";import"./isNativeReflectConstruct-554b52b6.js";import"./links-4d39192e.js";import"./DinePlikter-f451d612.js";import"./DinePersonopplysningerModal-b4bf4a2b.js";import"./Ingress-10c1b249.js";import"./amplitude.esm-2809efde.js";import"./createIntl-adea17b9.js";var y=(e=>(e.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",e.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",e.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",e.UNDER_BEHANDLING="UNDER_BEHANDLING",e))(y||{});const ye=()=>(...e)=>(B("button-click")(...e),Promise.resolve()),Lr={title:"pages/Velkommen",component:ue},i={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},n=({harGodkjentVilkår:e,saker:C,søkerinfo:I,mellomlagreSøknadOgNaviger:K=ye(),onDispatch:Me})=>(Re(),P.jsx(Be,{initialEntries:[Le.VELKOMMEN],children:P.jsx(Ae,{onDispatch:Me,children:P.jsx(ue,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:C,fnr:"123",harGodkjentVilkår:e,søkerInfo:Te(I),setErEndringssøknad:B("button-click"),setHarGodkjentVilkår:B("button-click"),setSøknadGjelderNyttBarn:B("button-click"),mellomlagreSøknadOgNaviger:K})})})),fe=(e,C)=>{const I=C.map(K=>({fnr:K}));return{...e,barn:I}},t=e=>({dekningsgrad:Ge.HUNDRE_PROSENT,familiehendelse:{fødselsdato:e.fødselsdato,omsorgsovertakelse:e.omsorgsovertakelse,antallBarn:e.antallBarn,termindato:e.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:e.gjelderAdopsjon,kanSøkeOmEndring:e.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:be.BEGGE_RETT,sakAvsluttet:e.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:e.åpenbehandlingTilstand!==void 0?{tilstand:e.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=e=>({...i,søker:{...i.søker,barn:e}}),a="2022-12-06",He="2022-12-08",L={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},Se={...L,dødsdato:"2022-12-07"},De={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},he={...De,dødsdato:"2022-12-07"},R={fødselsdato:a,dødsdato:a},ve=!1,o={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},U={...o,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Ce={...o,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},_=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:ve,fødselsdato:a}),Oe=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:ve,termindato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Ie=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:He,fødselsdato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Ke=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Pe=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),J=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),H=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Ue=fe(H,["1","2"]),_e=fe(H,["1"]),je=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Je=[_,{...Oe,saksnummer:"555555"}],Ve=[],s=n.bind({});s.args={harGodkjentVilkår:!1,saker:Ve,søkerinfo:i};const k=n.bind({});k.args={harGodkjentVilkår:!0,saker:Ve,søkerinfo:i};const l=n.bind({});l.args={saker:[_],søkerinfo:r([o])};const d=n.bind({});d.args={saker:[Oe],søkerinfo:i};const c=n.bind({});c.args={saker:[Ie],søkerinfo:r([o])};const m=n.bind({});m.args={saker:[Ke],søkerinfo:r([o])};const g=n.bind({});g.args={saker:Je,søkerinfo:r([o])};const x=n.bind({});x.args={saker:[Pe],søkerinfo:i};const p=n.bind({});p.args={saker:[J],søkerinfo:i};const F=n.bind({});F.args={saker:[J],søkerinfo:r([o])};const E=n.bind({});E.args={saker:[H],søkerinfo:r([o,U])};const u=n.bind({});u.args={saker:[je],søkerinfo:r([o,U,Ce])};const Ye=r([L]),Ne=r([L,De]),Y=r([Se]),qe=r([Se,he]),we=r([R]),ze=r([R,R]),q=r([L,R]),Qe=r([L,he]),f=n.bind({});f.args={saker:[],søkerinfo:Ye};const S=n.bind({});S.args={saker:[],søkerinfo:Ne};const D=n.bind({});D.args={saker:[],søkerinfo:Y};const h=n.bind({});h.args={saker:[],søkerinfo:qe};const v=n.bind({});v.args={saker:[],søkerinfo:we};const O=n.bind({});O.args={saker:[],søkerinfo:ze};const j=n.bind({});j.args={saker:[],søkerinfo:q};const V=n.bind({});V.args={saker:[],søkerinfo:Qe};const N=n.bind({});N.args={saker:[H],søkerinfo:q};const M=n.bind({});M.args={saker:[_],søkerinfo:Y};const G=n.bind({});G.args={saker:[J],søkerinfo:Y};const b=n.bind({});b.args={saker:[Ue],søkerinfo:Ne};const T=n.bind({});T.args={saker:[_e],søkerinfo:q};const A=n.bind({});A.args={saker:[je],søkerinfo:r([o,U,R])};var w,z,Q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Q=(z=s.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Z=(X=k.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,nn,en;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(en=(nn=l.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,an,on;d.parameters={...d.parameters,docs:{...(rn=d.parameters)==null?void 0:rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(on=(an=d.parameters)==null?void 0:an.docs)==null?void 0:on.source}}};var tn,sn,kn;c.parameters={...c.parameters,docs:{...(tn=c.parameters)==null?void 0:tn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(kn=(sn=c.parameters)==null?void 0:sn.docs)==null?void 0:kn.source}}};var ln,dn,cn;m.parameters={...m.parameters,docs:{...(ln=m.parameters)==null?void 0:ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(cn=(dn=m.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var mn,gn,xn;g.parameters={...g.parameters,docs:{...(mn=g.parameters)==null?void 0:mn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(xn=(gn=g.parameters)==null?void 0:gn.docs)==null?void 0:xn.source}}};var pn,Fn,En;x.parameters={...x.parameters,docs:{...(pn=x.parameters)==null?void 0:pn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(En=(Fn=x.parameters)==null?void 0:Fn.docs)==null?void 0:En.source}}};var un,fn,Sn;p.parameters={...p.parameters,docs:{...(un=p.parameters)==null?void 0:un.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Sn=(fn=p.parameters)==null?void 0:fn.docs)==null?void 0:Sn.source}}};var Dn,hn,vn;F.parameters={...F.parameters,docs:{...(Dn=F.parameters)==null?void 0:Dn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(vn=(hn=F.parameters)==null?void 0:hn.docs)==null?void 0:vn.source}}};var On,jn,Vn;E.parameters={...E.parameters,docs:{...(On=E.parameters)==null?void 0:On.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Vn=(jn=E.parameters)==null?void 0:jn.docs)==null?void 0:Vn.source}}};var Nn,Mn,Gn;u.parameters={...u.parameters,docs:{...(Nn=u.parameters)==null?void 0:Nn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Gn=(Mn=u.parameters)==null?void 0:Mn.docs)==null?void 0:Gn.source}}};var bn,Tn,An;f.parameters={...f.parameters,docs:{...(bn=f.parameters)==null?void 0:bn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(An=(Tn=f.parameters)==null?void 0:Tn.docs)==null?void 0:An.source}}};var Rn,Ln,Bn;S.parameters={...S.parameters,docs:{...(Rn=S.parameters)==null?void 0:Rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Bn=(Ln=S.parameters)==null?void 0:Ln.docs)==null?void 0:Bn.source}}};var yn,Hn,Cn;D.parameters={...D.parameters,docs:{...(yn=D.parameters)==null?void 0:yn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Cn=(Hn=D.parameters)==null?void 0:Hn.docs)==null?void 0:Cn.source}}};var In,Kn,Pn;h.parameters={...h.parameters,docs:{...(In=h.parameters)==null?void 0:In.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Pn=(Kn=h.parameters)==null?void 0:Kn.docs)==null?void 0:Pn.source}}};var Un,_n,Jn;v.parameters={...v.parameters,docs:{...(Un=v.parameters)==null?void 0:Un.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Jn=(_n=v.parameters)==null?void 0:_n.docs)==null?void 0:Jn.source}}};var Yn,qn,wn;O.parameters={...O.parameters,docs:{...(Yn=O.parameters)==null?void 0:Yn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(wn=(qn=O.parameters)==null?void 0:qn.docs)==null?void 0:wn.source}}};var zn,Qn,Wn;j.parameters={...j.parameters,docs:{...(zn=j.parameters)==null?void 0:zn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Wn=(Qn=j.parameters)==null?void 0:Qn.docs)==null?void 0:Wn.source}}};var Xn,Zn,$n;V.parameters={...V.parameters,docs:{...(Xn=V.parameters)==null?void 0:Xn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...($n=(Zn=V.parameters)==null?void 0:Zn.docs)==null?void 0:$n.source}}};var ne,ee,re;N.parameters={...N.parameters,docs:{...(ne=N.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(re=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,oe,te;M.parameters={...M.parameters,docs:{...(ae=M.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(te=(oe=M.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var ie,se,ke;G.parameters={...G.parameters,docs:{...(ie=G.parameters)==null?void 0:ie.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ke=(se=G.parameters)==null?void 0:se.docs)==null?void 0:ke.source}}};var le,de,ce;b.parameters={...b.parameters,docs:{...(le=b.parameters)==null?void 0:le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ce=(de=b.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var me,ge,xe;T.parameters={...T.parameters,docs:{...(me=T.parameters)==null?void 0:me.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(xe=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:xe.source}}};var pe,Fe,Ee;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Ee=(Fe=A.parameters)==null?void 0:Fe.docs)==null?void 0:Ee.source}}};const Br=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{s as Default,k as HarAlleredeLestOgForstått,m as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,g as HarFlereSaker,V as HarIngenSakerMedEnLevendeOgEnDødTvilling,j as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,v as HarIngenSakerOgEtDødfødtBarn,f as HarIngenSakerOgEttBarn,D as HarIngenSakerOgEttDødtBarn,h as HarIngenSakerOgToDødeTvillinger,O as HarIngenSakerOgToDødfødteBarn,S as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,F as HarSakAdopsjonMedBarnIPDL,G as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,u as HarSakFødselTrillinger,E as HarSakFødselTvillinger,x as HarSakFødselUtenBarnIPDL,N as HarSakMedEnLevendeOgEnDødfødtTvilling,M as HarSakMedEtDødtBarn,T as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,b as HarSakMedOppgittBarnTvillingerAlleLever,A as HarSakMedTrillingerEnErDød,Br as __namedExportsOrder,Lr as default};
