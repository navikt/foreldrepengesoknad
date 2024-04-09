import{j as P}from"./jsx-runtime-DoxjgJx5.js";import{a as B}from"./chunk-MZXVCX43-DWuJqIWT.js";import"./Tidsperioden-uYz_lIz2.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{D as Oe,R as Ge}from"./eksisterendeSakUtils-BvyXWOOX.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as Ae}from"./Step-C4VAanZM.js";import{F as Re}from"./FpDataContext-DRW84C1R.js";import{S as Le}from"./useFpNavigator-C0Dng-Rz.js";import{V as Fe}from"./Velkommen-CsB4lFk7.js";import{M as Be}from"./index-KchjYVEa.js";import"./v4-D8aEg3BZ.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./velkommenUtils-DMshz9-3.js";import"./dateUtils-BU-Sa8jz.js";import"./barnUtils-DBQFgAwJ.js";import"./links-dJHPeQm3.js";import"./message-DfLv_Bcn.js";import"./amplitude.esm-CWYNo8IU.js";import"./lodash-o8vTUAkc.js";import"./Accordion-ebYyXW3f.js";import"./dateFormValidation-Dx0vmcZR.js";import"./ErrorSummaryHookForm-C3CyVljj.js";import"./DinePlikter-MYL-1qIO.js";import"./DinePersonopplysningerModal-Dc87vj6b.js";var y=(e=>(e.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",e.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",e.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",e.UNDER_BEHANDLING="UNDER_BEHANDLING",e))(y||{});const ye=()=>(...e)=>(B("button-click")(...e),Promise.resolve()),jr={title:"pages/Velkommen",component:Fe},K={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},n=({harGodkjentVilkår:e,saker:C,søker:I=K,mellomlagreSøknadOgNaviger:T=ye(),onDispatch:Me})=>(Ae(),P.jsx(Be,{initialEntries:[Le.VELKOMMEN],children:P.jsx(Re,{onDispatch:Me,children:P.jsx(Fe,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:C,fnr:"123",harGodkjentVilkår:e,søkerInfo:{søker:I,arbeidsforhold:[]},setErEndringssøknad:B("button-click"),setHarGodkjentVilkår:B("button-click"),setSøknadGjelderNyttBarn:B("button-click"),mellomlagreSøknadOgNaviger:T})})})),fe=(e,C)=>{const I=C.map(T=>({fnr:T}));return{...e,barn:I}},o=e=>({dekningsgrad:Oe.HUNDRE_PROSENT,familiehendelse:{fødselsdato:e.fødselsdato,omsorgsovertakelse:e.omsorgsovertakelse,antallBarn:e.antallBarn,termindato:e.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:e.gjelderAdopsjon,kanSøkeOmEndring:e.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Ge.BEGGE_RETT,sakAvsluttet:e.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:e.åpenbehandlingTilstand!==void 0?{tilstand:e.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=e=>({...K,barn:e}),a="2022-12-06",He="2022-12-08",L={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},Se={...L,dødsdato:"2022-12-07"},he={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},De={...he,dødsdato:"2022-12-07"},R={fødselsdato:a,dødsdato:a},ve=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},U={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Ce={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},_=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:ve,fødselsdato:a}),je=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:ve,termindato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Ie=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:He,fødselsdato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Te=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Pe=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),J=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),H=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:y.UNDER_BEHANDLING}),Ke=fe(H,["1","2"]),Ue=fe(H,["1"]),Ve=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),_e=[_,{...je,saksnummer:"555555"}],be=[],s=n.bind({});s.args={harGodkjentVilkår:!1,saker:be};const i=n.bind({});i.args={harGodkjentVilkår:!0,saker:be};const l=n.bind({});l.args={saker:[_],søker:r([t])};const d=n.bind({});d.args={saker:[je]};const k=n.bind({});k.args={saker:[Ie],søker:r([t])};const c=n.bind({});c.args={saker:[Te],søker:r([t])};const m=n.bind({});m.args={saker:_e,søker:r([t])};const g=n.bind({});g.args={saker:[Pe]};const p=n.bind({});p.args={saker:[J],søker:K};const x=n.bind({});x.args={saker:[J],søker:r([t])};const u=n.bind({});u.args={saker:[H],søker:r([t,U])};const E=n.bind({});E.args={saker:[Ve],søker:r([t,U,Ce])};const Je=r([L]),Ne=r([L,he]),Y=r([Se]),Ye=r([Se,De]),qe=r([R]),we=r([R,R]),q=r([L,R]),ze=r([L,De]),F=n.bind({});F.args={saker:[],søker:Je};const f=n.bind({});f.args={saker:[],søker:Ne};const S=n.bind({});S.args={saker:[],søker:Y};const h=n.bind({});h.args={saker:[],søker:Ye};const D=n.bind({});D.args={saker:[],søker:qe};const v=n.bind({});v.args={saker:[],søker:we};const j=n.bind({});j.args={saker:[],søker:q};const V=n.bind({});V.args={saker:[],søker:ze};const b=n.bind({});b.args={saker:[H],søker:q};const N=n.bind({});N.args={saker:[_],søker:Y};const M=n.bind({});M.args={saker:[J],søker:Y};const O=n.bind({});O.args={saker:[Ke],søker:Ne};const G=n.bind({});G.args={saker:[Ue],søker:q};const A=n.bind({});A.args={saker:[Ve],søker:r([t,U,R])};var w,z,Q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Q=(z=s.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Z=(X=i.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,nn,en;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(en=(nn=l.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,an,tn;d.parameters={...d.parameters,docs:{...(rn=d.parameters)==null?void 0:rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(tn=(an=d.parameters)==null?void 0:an.docs)==null?void 0:tn.source}}};var on,sn,ln;k.parameters={...k.parameters,docs:{...(on=k.parameters)==null?void 0:on.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ln=(sn=k.parameters)==null?void 0:sn.docs)==null?void 0:ln.source}}};var dn,kn,cn;c.parameters={...c.parameters,docs:{...(dn=c.parameters)==null?void 0:dn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(cn=(kn=c.parameters)==null?void 0:kn.docs)==null?void 0:cn.source}}};var mn,gn,pn;m.parameters={...m.parameters,docs:{...(mn=m.parameters)==null?void 0:mn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(pn=(gn=m.parameters)==null?void 0:gn.docs)==null?void 0:pn.source}}};var xn,un,En;g.parameters={...g.parameters,docs:{...(xn=g.parameters)==null?void 0:xn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(En=(un=g.parameters)==null?void 0:un.docs)==null?void 0:En.source}}};var Fn,fn,Sn;p.parameters={...p.parameters,docs:{...(Fn=p.parameters)==null?void 0:Fn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Sn=(fn=p.parameters)==null?void 0:fn.docs)==null?void 0:Sn.source}}};var hn,Dn,vn;x.parameters={...x.parameters,docs:{...(hn=x.parameters)==null?void 0:hn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(vn=(Dn=x.parameters)==null?void 0:Dn.docs)==null?void 0:vn.source}}};var jn,Vn,bn;u.parameters={...u.parameters,docs:{...(jn=u.parameters)==null?void 0:jn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(bn=(Vn=u.parameters)==null?void 0:Vn.docs)==null?void 0:bn.source}}};var Nn,Mn,On;E.parameters={...E.parameters,docs:{...(Nn=E.parameters)==null?void 0:Nn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(On=(Mn=E.parameters)==null?void 0:Mn.docs)==null?void 0:On.source}}};var Gn,An,Rn;F.parameters={...F.parameters,docs:{...(Gn=F.parameters)==null?void 0:Gn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Rn=(An=F.parameters)==null?void 0:An.docs)==null?void 0:Rn.source}}};var Ln,Bn,yn;f.parameters={...f.parameters,docs:{...(Ln=f.parameters)==null?void 0:Ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(yn=(Bn=f.parameters)==null?void 0:Bn.docs)==null?void 0:yn.source}}};var Hn,Cn,In;S.parameters={...S.parameters,docs:{...(Hn=S.parameters)==null?void 0:Hn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(In=(Cn=S.parameters)==null?void 0:Cn.docs)==null?void 0:In.source}}};var Tn,Pn,Kn;h.parameters={...h.parameters,docs:{...(Tn=h.parameters)==null?void 0:Tn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Kn=(Pn=h.parameters)==null?void 0:Pn.docs)==null?void 0:Kn.source}}};var Un,_n,Jn;D.parameters={...D.parameters,docs:{...(Un=D.parameters)==null?void 0:Un.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Jn=(_n=D.parameters)==null?void 0:_n.docs)==null?void 0:Jn.source}}};var Yn,qn,wn;v.parameters={...v.parameters,docs:{...(Yn=v.parameters)==null?void 0:Yn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(wn=(qn=v.parameters)==null?void 0:qn.docs)==null?void 0:wn.source}}};var zn,Qn,Wn;j.parameters={...j.parameters,docs:{...(zn=j.parameters)==null?void 0:zn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Wn=(Qn=j.parameters)==null?void 0:Qn.docs)==null?void 0:Wn.source}}};var Xn,Zn,$n;V.parameters={...V.parameters,docs:{...(Xn=V.parameters)==null?void 0:Xn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...($n=(Zn=V.parameters)==null?void 0:Zn.docs)==null?void 0:$n.source}}};var ne,ee,re;b.parameters={...b.parameters,docs:{...(ne=b.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(re=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,te,oe;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(oe=(te=N.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var se,ie,le;M.parameters={...M.parameters,docs:{...(se=M.parameters)==null?void 0:se.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(le=(ie=M.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var de,ke,ce;O.parameters={...O.parameters,docs:{...(de=O.parameters)==null?void 0:de.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ce=(ke=O.parameters)==null?void 0:ke.docs)==null?void 0:ce.source}}};var me,ge,pe;G.parameters={...G.parameters,docs:{...(me=G.parameters)==null?void 0:me.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(pe=(ge=G.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};var xe,ue,Ee;A.parameters={...A.parameters,docs:{...(xe=A.parameters)==null?void 0:xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Ee=(ue=A.parameters)==null?void 0:ue.docs)==null?void 0:Ee.source}}};const Vr=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{s as Default,i as HarAlleredeLestOgForstått,c as HarAvsluttetFPSak,k as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,V as HarIngenSakerMedEnLevendeOgEnDødTvilling,j as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,D as HarIngenSakerOgEtDødfødtBarn,F as HarIngenSakerOgEttBarn,S as HarIngenSakerOgEttDødtBarn,h as HarIngenSakerOgToDødeTvillinger,v as HarIngenSakerOgToDødfødteBarn,f as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,x as HarSakAdopsjonMedBarnIPDL,M as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,E as HarSakFødselTrillinger,u as HarSakFødselTvillinger,g as HarSakFødselUtenBarnIPDL,b as HarSakMedEnLevendeOgEnDødfødtTvilling,N as HarSakMedEtDødtBarn,G as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,O as HarSakMedOppgittBarnTvillingerAlleLever,A as HarSakMedTrillingerEnErDød,Vr as __namedExportsOrder,jr as default};
