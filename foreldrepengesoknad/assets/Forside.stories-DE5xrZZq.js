import{j as Y}from"./Uttaksdagen-CVi1UdfS.js";import{a as P}from"./chunk-454WOBUV-CM0pFb8Z.js";import{D as Jr,R as Yr}from"./eksisterendeSakUtils-DSpOZe4a.js";import{i as qr}from"./Uttaksplan-C-q_5N0-.js";import{M as wr,F as zr}from"./FpDataContext-Bw3l41n2.js";import{S as Qr}from"./useFpNavigator-BE1soRC3.js";import{F as yr}from"./Forside-Dc8UNONA.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./barnUtils-CCEXbVV1.js";import"./guid-CsArkN6i.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./DinePlikter-ZEekqie-.js";import"./DinePersonopplysningerModal-DRATsUUo.js";import"./Block-07daPjv9.js";var x=(r=>(r.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",r.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",r.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",r.UNDER_BEHANDLING="UNDER_BEHANDLING",r))(x||{});const Wr=()=>(...r)=>(P("button-click")(...r),Promise.resolve()),ya={title:"pages/Forside",component:yr},q={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},e=({harGodkjentVilkår:r,saker:U,søker:_=q,mellomlagreSøknadOgNaviger:J=Wr(),onDispatch:_r})=>(qr(),Y.jsx(wr,{initialEntries:[Qr.VELKOMMEN],children:Y.jsx(zr,{onDispatch:_r,children:Y.jsx(yr,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:U,fnr:"123",harGodkjentVilkår:r,søkerInfo:{søker:_,arbeidsforhold:[]},setErEndringssøknad:P("button-click"),setHarGodkjentVilkår:P("button-click"),setSøknadGjelderNyttBarn:P("button-click"),mellomlagreSøknadOgNaviger:J})})})),Hr=(r,U)=>{const _=U.map(J=>({fnr:J}));return{...r,barn:_}},o=r=>({dekningsgrad:Jr.HUNDRE_PROSENT,familiehendelse:{fødselsdato:r.fødselsdato,omsorgsovertakelse:r.omsorgsovertakelse,antallBarn:r.antallBarn,termindato:r.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:r.gjelderAdopsjon,kanSøkeOmEndring:r.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Yr.BEGGE_RETT,sakAvsluttet:r.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:r.åpenbehandlingTilstand!==void 0?{tilstand:r.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),a=r=>({...q,barn:r}),n="2022-12-06",Xr="2022-12-08",T={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:n,kjønn:"K"},Cr={...T,dødsdato:"2022-12-07"},Ir={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:n},Tr={...Ir,dødsdato:"2022-12-07"},I={fødselsdato:n,dødsdato:n},Pr=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:n,kjønn:"M"},w={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Zr={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},z=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pr,fødselsdato:n}),s=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pr,termindato:"2024-06-28",åpenbehandlingTilstand:x.UNDER_BEHANDLING}),$r=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Xr,fødselsdato:n,åpenbehandlingTilstand:x.UNDER_BEHANDLING}),ea=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:n}),ra=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:n}),Q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:n,fødselsdato:n}),K=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:n,åpenbehandlingTilstand:x.UNDER_BEHANDLING}),aa=Hr(K,["1","2"]),na=Hr(K,["1"]),xr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:n}),ta=[z,{...s,saksnummer:"555555"}],Kr=[],i=e.bind({});i.args={harGodkjentVilkår:!1,saker:Kr};const l=e.bind({});l.args={harGodkjentVilkår:!0,saker:Kr};const d=e.bind({});d.args={saker:[z],søker:a([t])};const k=e.bind({});k.args={saker:[s]};const c=e.bind({});c.args={saker:[$r],søker:a([t])};const g=e.bind({});g.args={saker:[ea],søker:a([t])};const m=e.bind({});m.args={saker:ta,søker:a([t])};const u=e.bind({});u.args={saker:[ra]};const p=e.bind({});p.args={saker:[Q],søker:q};const S=e.bind({});S.args={saker:[Q],søker:a([t])};const E=e.bind({});E.args={saker:[K],søker:a([t,w])};const f=e.bind({});f.args={saker:[xr],søker:a([t,w,Zr])};const oa=a([T]),Ur=a([T,Ir]),W=a([Cr]),sa=a([Cr,Tr]),ia=a([I]),la=a([I,I]),X=a([T,I]),da=a([T,Tr]),h=e.bind({});h.args={saker:[],søker:oa};const D=e.bind({});D.args={saker:[],søker:Ur};const v=e.bind({});v.args={saker:[],søker:W};const b=e.bind({});b.args={saker:[],søker:sa};const j=e.bind({});j.args={saker:[],søker:ia};const N=e.bind({});N.args={saker:[],søker:la};const M=e.bind({});M.args={saker:[],søker:X};const O=e.bind({});O.args={saker:[],søker:da};const G=e.bind({});G.args={saker:[K],søker:X};const V=e.bind({});V.args={saker:[z],søker:W};const F=e.bind({});F.args={saker:[Q],søker:W};const A=e.bind({});A.args={saker:[aa],søker:Ur};const L=e.bind({});L.args={saker:[na],søker:X};const R=e.bind({});R.args={saker:[xr],søker:a([t,w,I])};const B=e.bind({});B.args={saker:[s],søker:a([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-03-01",kjønn:"K"}])};const y=e.bind({});y.args={saker:[s],søker:a([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-09",kjønn:"K"}])};const H=e.bind({});H.args={saker:[s],søker:a([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-02-29",kjønn:"K"}])};const C=e.bind({});C.args={saker:[s],søker:a([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-10",kjønn:"K"}])};var Z,$,ee;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`({
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
}`,...(ee=($=i.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ae,ne;l.parameters={...l.parameters,docs:{...(re=l.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(ne=(ae=l.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var te,oe,se;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`({
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
}`,...(se=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ie,le,de;k.parameters={...k.parameters,docs:{...(ie=k.parameters)==null?void 0:ie.docs,source:{originalSource:`({
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
}`,...(de=(le=k.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ke,ce,ge;c.parameters={...c.parameters,docs:{...(ke=c.parameters)==null?void 0:ke.docs,source:{originalSource:`({
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
}`,...(ge=(ce=c.parameters)==null?void 0:ce.docs)==null?void 0:ge.source}}};var me,ue,pe;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`({
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
}`,...(pe=(ue=g.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var Se,Ee,fe;m.parameters={...m.parameters,docs:{...(Se=m.parameters)==null?void 0:Se.docs,source:{originalSource:`({
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
}`,...(fe=(Ee=m.parameters)==null?void 0:Ee.docs)==null?void 0:fe.source}}};var he,De,ve;u.parameters={...u.parameters,docs:{...(he=u.parameters)==null?void 0:he.docs,source:{originalSource:`({
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
}`,...(ve=(De=u.parameters)==null?void 0:De.docs)==null?void 0:ve.source}}};var be,je,Ne;p.parameters={...p.parameters,docs:{...(be=p.parameters)==null?void 0:be.docs,source:{originalSource:`({
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
}`,...(Ne=(je=p.parameters)==null?void 0:je.docs)==null?void 0:Ne.source}}};var Me,Oe,Ge;S.parameters={...S.parameters,docs:{...(Me=S.parameters)==null?void 0:Me.docs,source:{originalSource:`({
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
}`,...(Ge=(Oe=S.parameters)==null?void 0:Oe.docs)==null?void 0:Ge.source}}};var Ve,Fe,Ae;E.parameters={...E.parameters,docs:{...(Ve=E.parameters)==null?void 0:Ve.docs,source:{originalSource:`({
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
}`,...(Ae=(Fe=E.parameters)==null?void 0:Fe.docs)==null?void 0:Ae.source}}};var Le,Re,Be;f.parameters={...f.parameters,docs:{...(Le=f.parameters)==null?void 0:Le.docs,source:{originalSource:`({
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
}`,...(Be=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};var ye,He,Ce;h.parameters={...h.parameters,docs:{...(ye=h.parameters)==null?void 0:ye.docs,source:{originalSource:`({
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
}`,...(Ce=(He=h.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Ie,Te,Pe;D.parameters={...D.parameters,docs:{...(Ie=D.parameters)==null?void 0:Ie.docs,source:{originalSource:`({
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
}`,...(Pe=(Te=D.parameters)==null?void 0:Te.docs)==null?void 0:Pe.source}}};var xe,Ke,Ue;v.parameters={...v.parameters,docs:{...(xe=v.parameters)==null?void 0:xe.docs,source:{originalSource:`({
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
}`,...(Ue=(Ke=v.parameters)==null?void 0:Ke.docs)==null?void 0:Ue.source}}};var _e,Je,Ye;b.parameters={...b.parameters,docs:{...(_e=b.parameters)==null?void 0:_e.docs,source:{originalSource:`({
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
}`,...(Ye=(Je=b.parameters)==null?void 0:Je.docs)==null?void 0:Ye.source}}};var qe,we,ze;j.parameters={...j.parameters,docs:{...(qe=j.parameters)==null?void 0:qe.docs,source:{originalSource:`({
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
}`,...(ze=(we=j.parameters)==null?void 0:we.docs)==null?void 0:ze.source}}};var Qe,We,Xe;N.parameters={...N.parameters,docs:{...(Qe=N.parameters)==null?void 0:Qe.docs,source:{originalSource:`({
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
}`,...(Xe=(We=N.parameters)==null?void 0:We.docs)==null?void 0:Xe.source}}};var Ze,$e,er;M.parameters={...M.parameters,docs:{...(Ze=M.parameters)==null?void 0:Ze.docs,source:{originalSource:`({
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
}`,...(er=($e=M.parameters)==null?void 0:$e.docs)==null?void 0:er.source}}};var rr,ar,nr;O.parameters={...O.parameters,docs:{...(rr=O.parameters)==null?void 0:rr.docs,source:{originalSource:`({
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
}`,...(nr=(ar=O.parameters)==null?void 0:ar.docs)==null?void 0:nr.source}}};var tr,or,sr;G.parameters={...G.parameters,docs:{...(tr=G.parameters)==null?void 0:tr.docs,source:{originalSource:`({
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
}`,...(sr=(or=G.parameters)==null?void 0:or.docs)==null?void 0:sr.source}}};var ir,lr,dr;V.parameters={...V.parameters,docs:{...(ir=V.parameters)==null?void 0:ir.docs,source:{originalSource:`({
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
}`,...(dr=(lr=V.parameters)==null?void 0:lr.docs)==null?void 0:dr.source}}};var kr,cr,gr;F.parameters={...F.parameters,docs:{...(kr=F.parameters)==null?void 0:kr.docs,source:{originalSource:`({
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
}`,...(gr=(cr=F.parameters)==null?void 0:cr.docs)==null?void 0:gr.source}}};var mr,ur,pr;A.parameters={...A.parameters,docs:{...(mr=A.parameters)==null?void 0:mr.docs,source:{originalSource:`({
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
}`,...(pr=(ur=A.parameters)==null?void 0:ur.docs)==null?void 0:pr.source}}};var Sr,Er,fr;L.parameters={...L.parameters,docs:{...(Sr=L.parameters)==null?void 0:Sr.docs,source:{originalSource:`({
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
}`,...(fr=(Er=L.parameters)==null?void 0:Er.docs)==null?void 0:fr.source}}};var hr,Dr,vr;R.parameters={...R.parameters,docs:{...(hr=R.parameters)==null?void 0:hr.docs,source:{originalSource:`({
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
}`,...(vr=(Dr=R.parameters)==null?void 0:Dr.docs)==null?void 0:vr.source}}};var br,jr,Nr;B.parameters={...B.parameters,docs:{...(br=B.parameters)==null?void 0:br.docs,source:{originalSource:`({
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
}`,...(Nr=(jr=B.parameters)==null?void 0:jr.docs)==null?void 0:Nr.source}}};var Mr,Or,Gr;y.parameters={...y.parameters,docs:{...(Mr=y.parameters)==null?void 0:Mr.docs,source:{originalSource:`({
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
}`,...(Gr=(Or=y.parameters)==null?void 0:Or.docs)==null?void 0:Gr.source}}};var Vr,Fr,Ar;H.parameters={...H.parameters,docs:{...(Vr=H.parameters)==null?void 0:Vr.docs,source:{originalSource:`({
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
}`,...(Ar=(Fr=H.parameters)==null?void 0:Fr.docs)==null?void 0:Ar.source}}};var Lr,Rr,Br;C.parameters={...C.parameters,docs:{...(Lr=C.parameters)==null?void 0:Lr.docs,source:{originalSource:`({
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
}`,...(Br=(Rr=C.parameters)==null?void 0:Rr.docs)==null?void 0:Br.source}}};const Ha=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{i as Default,l as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,k as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,O as HarIngenSakerMedEnLevendeOgEnDødTvilling,M as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,j as HarIngenSakerOgEtDødfødtBarn,h as HarIngenSakerOgEttBarn,v as HarIngenSakerOgEttDødtBarn,b as HarIngenSakerOgToDødeTvillinger,N as HarIngenSakerOgToDødfødteBarn,D as HarIngenSakerOgTvillinger,d as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,F as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,f as HarSakFødselTrillinger,E as HarSakFødselTvillinger,u as HarSakFødselUtenBarnIPDL,G as HarSakMedEnLevendeOgEnDødfødtTvilling,V as HarSakMedEtDødtBarn,L as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,A as HarSakMedOppgittBarnTvillingerAlleLever,R as HarSakMedTrillingerEnErDød,C as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,H as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,B as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,y as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,Ha as __namedExportsOrder,ya as default};
