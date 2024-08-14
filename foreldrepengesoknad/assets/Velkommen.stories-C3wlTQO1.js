import{j as Y}from"./jsx-runtime-CexXSJP5.js";import{a as T}from"./chunk-MZXVCX43-CM0pFb8Z.js";import"./Tidsperioden-C6mWeONA.js";import"./index-CSpfAsmC.js";import{D as Ye,R as qe}from"./eksisterendeSakUtils-oJr0_UBy.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-W-93wHM-.js";import{i as we}from"./ByttBrowserModal-HTsU0x66.js";import{M as ze,F as Qe}from"./FpDataContext-BTc1vbhf.js";import{S as We}from"./useFpNavigator-C9gfPHIo.js";import{V as ye}from"./Velkommen-DCLf7x_F.js";import"./v4-CQkTLCs1.js";import"./index-Snk9MO9S.js";import"./Link-DYtqBS4e.js";import"./index-BxmsGmlx.js";import"./guid-CsArkN6i.js";import"./velkommenUtils-C8Y2FXdE.js";import"./dateUtils-DT5Rdmf_.js";import"./barnUtils-CaCDHL4F.js";import"./links-BGW0SL1u.js";import"./VStack-6vecGfqt.js";import"./message-DzkwUWcQ.js";import"./iframe-Dt3FAXlG.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-LsD0M7ov.js";import"./dateFormValidation-CnYnx8C2.js";import"./ErrorSummaryHookForm-C51MI7vg.js";import"./DinePlikter-Cuhao7w3.js";import"./DinePersonopplysningerModal-DpdIdBup.js";var P=(e=>(e.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",e.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",e.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",e.UNDER_BEHANDLING="UNDER_BEHANDLING",e))(P||{});const Xe=()=>(...e)=>(T("button-click")(...e),Promise.resolve()),_r={title:"pages/Velkommen",component:ye},q={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},n=({harGodkjentVilkår:e,saker:U,søker:_=q,mellomlagreSøknadOgNaviger:J=Xe(),onDispatch:Je})=>(we(),Y.jsx(ze,{initialEntries:[We.VELKOMMEN],children:Y.jsx(Qe,{onDispatch:Je,children:Y.jsx(ye,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:U,fnr:"123",harGodkjentVilkår:e,søkerInfo:{søker:_,arbeidsforhold:[]},setErEndringssøknad:T("button-click"),setHarGodkjentVilkår:T("button-click"),setSøknadGjelderNyttBarn:T("button-click"),mellomlagreSøknadOgNaviger:J})})})),He=(e,U)=>{const _=U.map(J=>({fnr:J}));return{...e,barn:_}},o=e=>({dekningsgrad:Ye.HUNDRE_PROSENT,familiehendelse:{fødselsdato:e.fødselsdato,omsorgsovertakelse:e.omsorgsovertakelse,antallBarn:e.antallBarn,termindato:e.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:e.gjelderAdopsjon,kanSøkeOmEndring:e.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:qe.BEGGE_RETT,sakAvsluttet:e.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:e.åpenbehandlingTilstand!==void 0?{tilstand:e.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=e=>({...q,barn:e}),a="2022-12-06",Ze="2022-12-08",I={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},Ce={...I,dødsdato:"2022-12-07"},Ie={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},Te={...Ie,dødsdato:"2022-12-07"},C={fødselsdato:a,dødsdato:a},Pe=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},w={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},$e={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},z=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,fødselsdato:a}),s=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,termindato:"2024-06-28",åpenbehandlingTilstand:P.UNDER_BEHANDLING}),nr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ze,fødselsdato:a,åpenbehandlingTilstand:P.UNDER_BEHANDLING}),er=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),rr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),Q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),K=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:P.UNDER_BEHANDLING}),ar=He(K,["1","2"]),tr=He(K,["1"]),Ke=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),or=[z,{...s,saksnummer:"555555"}],Ue=[],i=n.bind({});i.args={harGodkjentVilkår:!1,saker:Ue};const l=n.bind({});l.args={harGodkjentVilkår:!0,saker:Ue};const k=n.bind({});k.args={saker:[z],søker:r([t])};const d=n.bind({});d.args={saker:[s]};const c=n.bind({});c.args={saker:[nr],søker:r([t])};const m=n.bind({});m.args={saker:[er],søker:r([t])};const g=n.bind({});g.args={saker:or,søker:r([t])};const x=n.bind({});x.args={saker:[rr]};const p=n.bind({});p.args={saker:[Q],søker:q};const u=n.bind({});u.args={saker:[Q],søker:r([t])};const E=n.bind({});E.args={saker:[K],søker:r([t,w])};const F=n.bind({});F.args={saker:[Ke],søker:r([t,w,$e])};const sr=r([I]),_e=r([I,Ie]),W=r([Ce]),ir=r([Ce,Te]),lr=r([C]),kr=r([C,C]),X=r([I,C]),dr=r([I,Te]),S=n.bind({});S.args={saker:[],søker:sr};const f=n.bind({});f.args={saker:[],søker:_e};const h=n.bind({});h.args={saker:[],søker:W};const D=n.bind({});D.args={saker:[],søker:ir};const v=n.bind({});v.args={saker:[],søker:lr};const b=n.bind({});b.args={saker:[],søker:kr};const j=n.bind({});j.args={saker:[],søker:X};const V=n.bind({});V.args={saker:[],søker:dr};const N=n.bind({});N.args={saker:[K],søker:X};const M=n.bind({});M.args={saker:[z],søker:W};const O=n.bind({});O.args={saker:[Q],søker:W};const G=n.bind({});G.args={saker:[ar],søker:_e};const A=n.bind({});A.args={saker:[tr],søker:X};const L=n.bind({});L.args={saker:[Ke],søker:r([t,w,C])};const R=n.bind({});R.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-03-01",kjønn:"K"}])};const B=n.bind({});B.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-09",kjønn:"K"}])};const y=n.bind({});y.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-02-29",kjønn:"K"}])};const H=n.bind({});H.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-10",kjønn:"K"}])};var Z,$,nn;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`({
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
}`,...(nn=($=i.parameters)==null?void 0:$.docs)==null?void 0:nn.source}}};var en,rn,an;l.parameters={...l.parameters,docs:{...(en=l.parameters)==null?void 0:en.docs,source:{originalSource:`({
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
}`,...(an=(rn=l.parameters)==null?void 0:rn.docs)==null?void 0:an.source}}};var tn,on,sn;k.parameters={...k.parameters,docs:{...(tn=k.parameters)==null?void 0:tn.docs,source:{originalSource:`({
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
}`,...(sn=(on=k.parameters)==null?void 0:on.docs)==null?void 0:sn.source}}};var ln,kn,dn;d.parameters={...d.parameters,docs:{...(ln=d.parameters)==null?void 0:ln.docs,source:{originalSource:`({
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
}`,...(dn=(kn=d.parameters)==null?void 0:kn.docs)==null?void 0:dn.source}}};var cn,mn,gn;c.parameters={...c.parameters,docs:{...(cn=c.parameters)==null?void 0:cn.docs,source:{originalSource:`({
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
}`,...(gn=(mn=c.parameters)==null?void 0:mn.docs)==null?void 0:gn.source}}};var xn,pn,un;m.parameters={...m.parameters,docs:{...(xn=m.parameters)==null?void 0:xn.docs,source:{originalSource:`({
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
}`,...(un=(pn=m.parameters)==null?void 0:pn.docs)==null?void 0:un.source}}};var En,Fn,Sn;g.parameters={...g.parameters,docs:{...(En=g.parameters)==null?void 0:En.docs,source:{originalSource:`({
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
}`,...(Sn=(Fn=g.parameters)==null?void 0:Fn.docs)==null?void 0:Sn.source}}};var fn,hn,Dn;x.parameters={...x.parameters,docs:{...(fn=x.parameters)==null?void 0:fn.docs,source:{originalSource:`({
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
}`,...(Dn=(hn=x.parameters)==null?void 0:hn.docs)==null?void 0:Dn.source}}};var vn,bn,jn;p.parameters={...p.parameters,docs:{...(vn=p.parameters)==null?void 0:vn.docs,source:{originalSource:`({
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
}`,...(jn=(bn=p.parameters)==null?void 0:bn.docs)==null?void 0:jn.source}}};var Vn,Nn,Mn;u.parameters={...u.parameters,docs:{...(Vn=u.parameters)==null?void 0:Vn.docs,source:{originalSource:`({
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
}`,...(Mn=(Nn=u.parameters)==null?void 0:Nn.docs)==null?void 0:Mn.source}}};var On,Gn,An;E.parameters={...E.parameters,docs:{...(On=E.parameters)==null?void 0:On.docs,source:{originalSource:`({
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
}`,...(An=(Gn=E.parameters)==null?void 0:Gn.docs)==null?void 0:An.source}}};var Ln,Rn,Bn;F.parameters={...F.parameters,docs:{...(Ln=F.parameters)==null?void 0:Ln.docs,source:{originalSource:`({
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
}`,...(Bn=(Rn=F.parameters)==null?void 0:Rn.docs)==null?void 0:Bn.source}}};var yn,Hn,Cn;S.parameters={...S.parameters,docs:{...(yn=S.parameters)==null?void 0:yn.docs,source:{originalSource:`({
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
}`,...(Cn=(Hn=S.parameters)==null?void 0:Hn.docs)==null?void 0:Cn.source}}};var In,Tn,Pn;f.parameters={...f.parameters,docs:{...(In=f.parameters)==null?void 0:In.docs,source:{originalSource:`({
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
}`,...(Pn=(Tn=f.parameters)==null?void 0:Tn.docs)==null?void 0:Pn.source}}};var Kn,Un,_n;h.parameters={...h.parameters,docs:{...(Kn=h.parameters)==null?void 0:Kn.docs,source:{originalSource:`({
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
}`,...(_n=(Un=h.parameters)==null?void 0:Un.docs)==null?void 0:_n.source}}};var Jn,Yn,qn;D.parameters={...D.parameters,docs:{...(Jn=D.parameters)==null?void 0:Jn.docs,source:{originalSource:`({
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
}`,...(qn=(Yn=D.parameters)==null?void 0:Yn.docs)==null?void 0:qn.source}}};var wn,zn,Qn;v.parameters={...v.parameters,docs:{...(wn=v.parameters)==null?void 0:wn.docs,source:{originalSource:`({
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
}`,...(Qn=(zn=v.parameters)==null?void 0:zn.docs)==null?void 0:Qn.source}}};var Wn,Xn,Zn;b.parameters={...b.parameters,docs:{...(Wn=b.parameters)==null?void 0:Wn.docs,source:{originalSource:`({
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
}`,...(Zn=(Xn=b.parameters)==null?void 0:Xn.docs)==null?void 0:Zn.source}}};var $n,ne,ee;j.parameters={...j.parameters,docs:{...($n=j.parameters)==null?void 0:$n.docs,source:{originalSource:`({
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
}`,...(ee=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:ee.source}}};var re,ae,te;V.parameters={...V.parameters,docs:{...(re=V.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(te=(ae=V.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var oe,se,ie;N.parameters={...N.parameters,docs:{...(oe=N.parameters)==null?void 0:oe.docs,source:{originalSource:`({
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
}`,...(ie=(se=N.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var le,ke,de;M.parameters={...M.parameters,docs:{...(le=M.parameters)==null?void 0:le.docs,source:{originalSource:`({
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
}`,...(de=(ke=M.parameters)==null?void 0:ke.docs)==null?void 0:de.source}}};var ce,me,ge;O.parameters={...O.parameters,docs:{...(ce=O.parameters)==null?void 0:ce.docs,source:{originalSource:`({
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
}`,...(ge=(me=O.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var xe,pe,ue;G.parameters={...G.parameters,docs:{...(xe=G.parameters)==null?void 0:xe.docs,source:{originalSource:`({
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
}`,...(ue=(pe=G.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var Ee,Fe,Se;A.parameters={...A.parameters,docs:{...(Ee=A.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
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
}`,...(Se=(Fe=A.parameters)==null?void 0:Fe.docs)==null?void 0:Se.source}}};var fe,he,De;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`({
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
}`,...(De=(he=L.parameters)==null?void 0:he.docs)==null?void 0:De.source}}};var ve,be,je;R.parameters={...R.parameters,docs:{...(ve=R.parameters)==null?void 0:ve.docs,source:{originalSource:`({
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
}`,...(je=(be=R.parameters)==null?void 0:be.docs)==null?void 0:je.source}}};var Ve,Ne,Me;B.parameters={...B.parameters,docs:{...(Ve=B.parameters)==null?void 0:Ve.docs,source:{originalSource:`({
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
}`,...(Me=(Ne=B.parameters)==null?void 0:Ne.docs)==null?void 0:Me.source}}};var Oe,Ge,Ae;y.parameters={...y.parameters,docs:{...(Oe=y.parameters)==null?void 0:Oe.docs,source:{originalSource:`({
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
}`,...(Ae=(Ge=y.parameters)==null?void 0:Ge.docs)==null?void 0:Ae.source}}};var Le,Re,Be;H.parameters={...H.parameters,docs:{...(Le=H.parameters)==null?void 0:Le.docs,source:{originalSource:`({
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
}`,...(Be=(Re=H.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};const Jr=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{i as Default,l as HarAlleredeLestOgForstått,m as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,g as HarFlereSaker,V as HarIngenSakerMedEnLevendeOgEnDødTvilling,j as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,v as HarIngenSakerOgEtDødfødtBarn,S as HarIngenSakerOgEttBarn,h as HarIngenSakerOgEttDødtBarn,D as HarIngenSakerOgToDødeTvillinger,b as HarIngenSakerOgToDødfødteBarn,f as HarIngenSakerOgTvillinger,k as HarOpprettetFPSakFødselMedBarnetIPDL,u as HarSakAdopsjonMedBarnIPDL,O as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,F as HarSakFødselTrillinger,E as HarSakFødselTvillinger,x as HarSakFødselUtenBarnIPDL,N as HarSakMedEnLevendeOgEnDødfødtTvilling,M as HarSakMedEtDødtBarn,A as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,G as HarSakMedOppgittBarnTvillingerAlleLever,L as HarSakMedTrillingerEnErDød,H as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,y as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,R as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,B as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,Jr as __namedExportsOrder,_r as default};
