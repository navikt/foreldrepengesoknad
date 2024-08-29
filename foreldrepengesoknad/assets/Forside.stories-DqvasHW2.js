import{j as Y}from"./tslib.es6-BMc9PpVS.js";import{a as T}from"./chunk-MZXVCX43-CM0pFb8Z.js";import"./index-DoedxA3Z.js";import"./Uttaksdagen-B0FM17qM.js";import{D as Ye,R as qe}from"./eksisterendeSakUtils-B4VuGX9T.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import{i as we}from"./ErrorSummaryHookForm-CpcWKZeM.js";import{M as ze,F as Qe}from"./FpDataContext-wT6-gpAc.js";import{S as We}from"./useFpNavigator-cdVAXfmg.js";import{F as ye}from"./Forside-BVcgd9KC.js";import"./v4-CQkTLCs1.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateUtils-ZxRZYjT8.js";import"./barnUtils-BlHIzq3r.js";import"./dateFormValidation-CMcKJG1V.js";import"./bemUtils-Cb0-YXpW.js";import"./links-BegG-28I.js";import"./iframe-CnSJsggb.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./DinePlikter-BnBpQ0vx.js";import"./DinePersonopplysningerModal-BHrMcl44.js";var P=(e=>(e.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",e.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",e.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",e.UNDER_BEHANDLING="UNDER_BEHANDLING",e))(P||{});const Xe=()=>(...e)=>(T("button-click")(...e),Promise.resolve()),Cr={title:"pages/Forside",component:ye},q={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},n=({harGodkjentVilkår:e,saker:U,søker:_=q,mellomlagreSøknadOgNaviger:J=Xe(),onDispatch:Je})=>(we(),Y.jsx(ze,{initialEntries:[We.VELKOMMEN],children:Y.jsx(Qe,{onDispatch:Je,children:Y.jsx(ye,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:U,fnr:"123",harGodkjentVilkår:e,søkerInfo:{søker:_,arbeidsforhold:[]},setErEndringssøknad:T("button-click"),setHarGodkjentVilkår:T("button-click"),setSøknadGjelderNyttBarn:T("button-click"),mellomlagreSøknadOgNaviger:J})})})),He=(e,U)=>{const _=U.map(J=>({fnr:J}));return{...e,barn:_}},o=e=>({dekningsgrad:Ye.HUNDRE_PROSENT,familiehendelse:{fødselsdato:e.fødselsdato,omsorgsovertakelse:e.omsorgsovertakelse,antallBarn:e.antallBarn,termindato:e.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:e.gjelderAdopsjon,kanSøkeOmEndring:e.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:qe.BEGGE_RETT,sakAvsluttet:e.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:e.åpenbehandlingTilstand!==void 0?{tilstand:e.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=e=>({...q,barn:e}),a="2022-12-06",Ze="2022-12-08",I={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},Ce={...I,dødsdato:"2022-12-07"},Ie={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},Te={...Ie,dødsdato:"2022-12-07"},C={fødselsdato:a,dødsdato:a},Pe=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},w={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},$e={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},z=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,fødselsdato:a}),s=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,termindato:"2024-06-28",åpenbehandlingTilstand:P.UNDER_BEHANDLING}),nr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ze,fødselsdato:a,åpenbehandlingTilstand:P.UNDER_BEHANDLING}),er=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),rr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),Q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),K=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:P.UNDER_BEHANDLING}),ar=He(K,["1","2"]),tr=He(K,["1"]),Ke=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),or=[z,{...s,saksnummer:"555555"}],Ue=[],i=n.bind({});i.args={harGodkjentVilkår:!1,saker:Ue};const l=n.bind({});l.args={harGodkjentVilkår:!0,saker:Ue};const d=n.bind({});d.args={saker:[z],søker:r([t])};const k=n.bind({});k.args={saker:[s]};const c=n.bind({});c.args={saker:[nr],søker:r([t])};const g=n.bind({});g.args={saker:[er],søker:r([t])};const m=n.bind({});m.args={saker:or,søker:r([t])};const x=n.bind({});x.args={saker:[rr]};const p=n.bind({});p.args={saker:[Q],søker:q};const u=n.bind({});u.args={saker:[Q],søker:r([t])};const F=n.bind({});F.args={saker:[K],søker:r([t,w])};const E=n.bind({});E.args={saker:[Ke],søker:r([t,w,$e])};const sr=r([I]),_e=r([I,Ie]),W=r([Ce]),ir=r([Ce,Te]),lr=r([C]),dr=r([C,C]),X=r([I,C]),kr=r([I,Te]),S=n.bind({});S.args={saker:[],søker:sr};const f=n.bind({});f.args={saker:[],søker:_e};const h=n.bind({});h.args={saker:[],søker:W};const D=n.bind({});D.args={saker:[],søker:ir};const v=n.bind({});v.args={saker:[],søker:lr};const b=n.bind({});b.args={saker:[],søker:dr};const j=n.bind({});j.args={saker:[],søker:X};const N=n.bind({});N.args={saker:[],søker:kr};const M=n.bind({});M.args={saker:[K],søker:X};const O=n.bind({});O.args={saker:[z],søker:W};const G=n.bind({});G.args={saker:[Q],søker:W};const V=n.bind({});V.args={saker:[ar],søker:_e};const A=n.bind({});A.args={saker:[tr],søker:X};const L=n.bind({});L.args={saker:[Ke],søker:r([t,w,C])};const R=n.bind({});R.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-03-01",kjønn:"K"}])};const B=n.bind({});B.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-09",kjønn:"K"}])};const y=n.bind({});y.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-02-29",kjønn:"K"}])};const H=n.bind({});H.args={saker:[s],søker:r([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-10",kjønn:"K"}])};var Z,$,nn;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(an=(rn=l.parameters)==null?void 0:rn.docs)==null?void 0:an.source}}};var tn,on,sn;d.parameters={...d.parameters,docs:{...(tn=d.parameters)==null?void 0:tn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(sn=(on=d.parameters)==null?void 0:on.docs)==null?void 0:sn.source}}};var ln,dn,kn;k.parameters={...k.parameters,docs:{...(ln=k.parameters)==null?void 0:ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(kn=(dn=k.parameters)==null?void 0:dn.docs)==null?void 0:kn.source}}};var cn,gn,mn;c.parameters={...c.parameters,docs:{...(cn=c.parameters)==null?void 0:cn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(mn=(gn=c.parameters)==null?void 0:gn.docs)==null?void 0:mn.source}}};var xn,pn,un;g.parameters={...g.parameters,docs:{...(xn=g.parameters)==null?void 0:xn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(un=(pn=g.parameters)==null?void 0:pn.docs)==null?void 0:un.source}}};var Fn,En,Sn;m.parameters={...m.parameters,docs:{...(Fn=m.parameters)==null?void 0:Fn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Sn=(En=m.parameters)==null?void 0:En.docs)==null?void 0:Sn.source}}};var fn,hn,Dn;x.parameters={...x.parameters,docs:{...(fn=x.parameters)==null?void 0:fn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(jn=(bn=p.parameters)==null?void 0:bn.docs)==null?void 0:jn.source}}};var Nn,Mn,On;u.parameters={...u.parameters,docs:{...(Nn=u.parameters)==null?void 0:Nn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(On=(Mn=u.parameters)==null?void 0:Mn.docs)==null?void 0:On.source}}};var Gn,Vn,An;F.parameters={...F.parameters,docs:{...(Gn=F.parameters)==null?void 0:Gn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(An=(Vn=F.parameters)==null?void 0:Vn.docs)==null?void 0:An.source}}};var Ln,Rn,Bn;E.parameters={...E.parameters,docs:{...(Ln=E.parameters)==null?void 0:Ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Bn=(Rn=E.parameters)==null?void 0:Rn.docs)==null?void 0:Bn.source}}};var yn,Hn,Cn;S.parameters={...S.parameters,docs:{...(yn=S.parameters)==null?void 0:yn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ee=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:ee.source}}};var re,ae,te;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(te=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var oe,se,ie;M.parameters={...M.parameters,docs:{...(oe=M.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ie=(se=M.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var le,de,ke;O.parameters={...O.parameters,docs:{...(le=O.parameters)==null?void 0:le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ke=(de=O.parameters)==null?void 0:de.docs)==null?void 0:ke.source}}};var ce,ge,me;G.parameters={...G.parameters,docs:{...(ce=G.parameters)==null?void 0:ce.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(me=(ge=G.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var xe,pe,ue;V.parameters={...V.parameters,docs:{...(xe=V.parameters)==null?void 0:xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(ue=(pe=V.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var Fe,Ee,Se;A.parameters={...A.parameters,docs:{...(Fe=A.parameters)==null?void 0:Fe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Se=(Ee=A.parameters)==null?void 0:Ee.docs)==null?void 0:Se.source}}};var fe,he,De;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
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
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(je=(be=R.parameters)==null?void 0:be.docs)==null?void 0:je.source}}};var Ne,Me,Oe;B.parameters={...B.parameters,docs:{...(Ne=B.parameters)==null?void 0:Ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Oe=(Me=B.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};var Ge,Ve,Ae;y.parameters={...y.parameters,docs:{...(Ge=y.parameters)==null?void 0:Ge.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Ae=(Ve=y.parameters)==null?void 0:Ve.docs)==null?void 0:Ae.source}}};var Le,Re,Be;H.parameters={...H.parameters,docs:{...(Le=H.parameters)==null?void 0:Le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søker = defaultPerson,
  mellomlagreSøknadOgNaviger = promiseAction(),
  onDispatch
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Forside fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={{
        søker,
        arbeidsforhold: []
      }} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(Be=(Re=H.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};const Ir=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{i as Default,l as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,k as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,N as HarIngenSakerMedEnLevendeOgEnDødTvilling,j as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,v as HarIngenSakerOgEtDødfødtBarn,S as HarIngenSakerOgEttBarn,h as HarIngenSakerOgEttDødtBarn,D as HarIngenSakerOgToDødeTvillinger,b as HarIngenSakerOgToDødfødteBarn,f as HarIngenSakerOgTvillinger,d as HarOpprettetFPSakFødselMedBarnetIPDL,u as HarSakAdopsjonMedBarnIPDL,G as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,E as HarSakFødselTrillinger,F as HarSakFødselTvillinger,x as HarSakFødselUtenBarnIPDL,M as HarSakMedEnLevendeOgEnDødfødtTvilling,O as HarSakMedEtDødtBarn,A as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,V as HarSakMedOppgittBarnTvillingerAlleLever,L as HarSakMedTrillingerEnErDød,H as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,y as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,R as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,B as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,Ir as __namedExportsOrder,Cr as default};
