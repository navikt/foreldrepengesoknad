import{j as Y}from"./jsx-runtime-69eee039.js";import{w as Bn}from"./withRouter-f0df7a0f.js";import{a as x}from"./chunk-AY7I2SME-331d03ca.js";import{D as Hn,R as Cn}from"./eksisterendeSakUtils-ef126668.js";import"./Tidsperioden-a95d044c.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{m as Fn}from"./mapSøkerinfoDTO-268f32cb.js";import{F as In}from"./FpDataContext-75ac2616.js";import{V as Nn}from"./Velkommen-51467615.js";import"./index-7e40074d.js";import"./v4-a960c1f4.js";import"./dateUtils-e2f5989d.js";import"./Perioden-f9b2043e.js";import"./leggTilPeriode-514e4bf5.js";import"./Periodene-e4e7892a.js";import"./uttaksPlanStatus-38959b58.js";import"./stringUtils-f4190696.js";import"./barnUtils-6056f31e.js";import"./velkommenUtils-7e7dde66.js";import"./index-47edccfa.js";import"./Link-b834ea2b.js";import"./index-b3a39e30.js";import"./links-b36d21ab.js";import"./DinePlikter-febbb9b5.js";import"./message-650a43cb.js";import"./DinePersonopplysningerModal-253bb78b.js";import"./routes-9effe5a6.js";var A=(n=>(n.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",n.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",n.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",n.UNDER_BEHANDLING="UNDER_BEHANDLING",n))(A||{});const Tr={title:"pages/Velkommen",component:Nn,decorators:[Bn]},s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:n,saker:y,søkerinfo:U,mellomlagreSøknadOgNaviger:P=x("button-click"),gåTilNesteSide:Vn})=>Y.jsx(In,{onDispatch:Vn,children:Y.jsx(Nn,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:y,fnr:"123",harGodkjentVilkår:n,søkerInfo:Fn(U),setErEndringssøknad:x("button-click"),setHarGodkjentVilkår:x("button-click"),setSøknadGjelderNyttBarn:x("button-click"),mellomlagreSøknadOgNaviger:P})}),vn=(n,y)=>{const U=y.map(P=>({fnr:P}));return{...n,barn:U}},o=n=>({dekningsgrad:Hn.HUNDRE_PROSENT,familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Cn.BEGGE_RETT,sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=n=>({...s,søker:{...s.søker,barn:n}}),a="2022-12-06",Ln="2022-12-08",L={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},En={...L,dødsdato:"2022-12-07"},jn={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},Dn={...jn,dødsdato:"2022-12-07"},I={fødselsdato:a,dødsdato:a},Tn=!1,t={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},_={...t,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},xn={...t,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},R=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Tn,fødselsdato:a}),bn=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Tn,termindato:a,åpenbehandlingTilstand:A.UNDER_BEHANDLING}),An=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ln,fødselsdato:a,åpenbehandlingTilstand:A.UNDER_BEHANDLING}),Mn=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),yn=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),K=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),M=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:A.UNDER_BEHANDLING}),Un=vn(M,["1","2"]),Pn=vn(M,["1"]),On=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),_n=[R,{...bn,saksnummer:"555555"}],hn=[],i=e.bind({});i.args={harGodkjentVilkår:!1,saker:hn,søkerinfo:s};const k=e.bind({});k.args={harGodkjentVilkår:!0,saker:hn,søkerinfo:s};const l=e.bind({});l.args={saker:[R],søkerinfo:r([t])};const d=e.bind({});d.args={saker:[bn],søkerinfo:s};const c=e.bind({});c.args={saker:[An],søkerinfo:r([t])};const g=e.bind({});g.args={saker:[Mn],søkerinfo:r([t])};const m=e.bind({});m.args={saker:_n,søkerinfo:r([t])};const p=e.bind({});p.args={saker:[yn],søkerinfo:s};const f=e.bind({});f.args={saker:[K],søkerinfo:s};const S=e.bind({});S.args={saker:[K],søkerinfo:r([t])};const u=e.bind({});u.args={saker:[M],søkerinfo:r([t,_])};const N=e.bind({});N.args={saker:[On],søkerinfo:r([t,_,xn])};const Rn=r([L]),Gn=r([L,jn]),J=r([En]),Kn=r([En,Dn]),Jn=r([I]),wn=r([I,I]),w=r([L,I]),Yn=r([L,Dn]),v=e.bind({});v.args={saker:[],søkerinfo:Rn};const E=e.bind({});E.args={saker:[],søkerinfo:Gn};const j=e.bind({});j.args={saker:[],søkerinfo:J};const D=e.bind({});D.args={saker:[],søkerinfo:Kn};const T=e.bind({});T.args={saker:[],søkerinfo:Jn};const b=e.bind({});b.args={saker:[],søkerinfo:wn};const O=e.bind({});O.args={saker:[],søkerinfo:w};const h=e.bind({});h.args={saker:[],søkerinfo:Yn};const G=e.bind({});G.args={saker:[M],søkerinfo:w};const V=e.bind({});V.args={saker:[R],søkerinfo:J};const B=e.bind({});B.args={saker:[K],søkerinfo:J};const H=e.bind({});H.args={saker:[Un],søkerinfo:Gn};const C=e.bind({});C.args={saker:[Pn],søkerinfo:w};const F=e.bind({});F.args={saker:[On],søkerinfo:r([t,_,I])};var q,z,Q;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Q=(z=i.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Z=(X=k.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ne=(ee=l.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,ae,te;d.parameters={...d.parameters,docs:{...(re=d.parameters)==null?void 0:re.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(te=(ae=d.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var oe,se,ie;c.parameters={...c.parameters,docs:{...(oe=c.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ie=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var ke,le,de;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(de=(le=g.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,ge,me;m.parameters={...m.parameters,docs:{...(ce=m.parameters)==null?void 0:ce.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(me=(ge=m.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var pe,fe,Se;p.parameters={...p.parameters,docs:{...(pe=p.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Se=(fe=p.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var ue,Ne,ve;f.parameters={...f.parameters,docs:{...(ue=f.parameters)==null?void 0:ue.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ve=(Ne=f.parameters)==null?void 0:Ne.docs)==null?void 0:ve.source}}};var Ee,je,De;S.parameters={...S.parameters,docs:{...(Ee=S.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(De=(je=S.parameters)==null?void 0:je.docs)==null?void 0:De.source}}};var Te,be,Oe;u.parameters={...u.parameters,docs:{...(Te=u.parameters)==null?void 0:Te.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Oe=(be=u.parameters)==null?void 0:be.docs)==null?void 0:Oe.source}}};var he,Ge,Ve;N.parameters={...N.parameters,docs:{...(he=N.parameters)==null?void 0:he.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ve=(Ge=N.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source}}};var Be,He,Ce;v.parameters={...v.parameters,docs:{...(Be=v.parameters)==null?void 0:Be.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ce=(He=v.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Fe,Ie,Le;E.parameters={...E.parameters,docs:{...(Fe=E.parameters)==null?void 0:Fe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Le=(Ie=E.parameters)==null?void 0:Ie.docs)==null?void 0:Le.source}}};var xe,Ae,Me;j.parameters={...j.parameters,docs:{...(xe=j.parameters)==null?void 0:xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Me=(Ae=j.parameters)==null?void 0:Ae.docs)==null?void 0:Me.source}}};var ye,Ue,Pe;D.parameters={...D.parameters,docs:{...(ye=D.parameters)==null?void 0:ye.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Pe=(Ue=D.parameters)==null?void 0:Ue.docs)==null?void 0:Pe.source}}};var _e,Re,Ke;T.parameters={...T.parameters,docs:{...(_e=T.parameters)==null?void 0:_e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ke=(Re=T.parameters)==null?void 0:Re.docs)==null?void 0:Ke.source}}};var Je,we,Ye;b.parameters={...b.parameters,docs:{...(Je=b.parameters)==null?void 0:Je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ye=(we=b.parameters)==null?void 0:we.docs)==null?void 0:Ye.source}}};var qe,ze,Qe;O.parameters={...O.parameters,docs:{...(qe=O.parameters)==null?void 0:qe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Qe=(ze=O.parameters)==null?void 0:ze.docs)==null?void 0:Qe.source}}};var We,Xe,Ze;h.parameters={...h.parameters,docs:{...(We=h.parameters)==null?void 0:We.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ze=(Xe=h.parameters)==null?void 0:Xe.docs)==null?void 0:Ze.source}}};var $e,en,nn;G.parameters={...G.parameters,docs:{...($e=G.parameters)==null?void 0:$e.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(nn=(en=G.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};var rn,an,tn;V.parameters={...V.parameters,docs:{...(rn=V.parameters)==null?void 0:rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(tn=(an=V.parameters)==null?void 0:an.docs)==null?void 0:tn.source}}};var on,sn,kn;B.parameters={...B.parameters,docs:{...(on=B.parameters)==null?void 0:on.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(kn=(sn=B.parameters)==null?void 0:sn.docs)==null?void 0:kn.source}}};var ln,dn,cn;H.parameters={...H.parameters,docs:{...(ln=H.parameters)==null?void 0:ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(cn=(dn=H.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var gn,mn,pn;C.parameters={...C.parameters,docs:{...(gn=C.parameters)==null?void 0:gn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(pn=(mn=C.parameters)==null?void 0:mn.docs)==null?void 0:pn.source}}};var fn,Sn,un;F.parameters={...F.parameters,docs:{...(fn=F.parameters)==null?void 0:fn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(un=(Sn=F.parameters)==null?void 0:Sn.docs)==null?void 0:un.source}}};const br=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{i as Default,k as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,h as HarIngenSakerMedEnLevendeOgEnDødTvilling,O as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,T as HarIngenSakerOgEtDødfødtBarn,v as HarIngenSakerOgEttBarn,j as HarIngenSakerOgEttDødtBarn,D as HarIngenSakerOgToDødeTvillinger,b as HarIngenSakerOgToDødfødteBarn,E as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,B as HarSakAdopsjonMedEtDødtBarn,f as HarSakAdopsjonUtenBarnIPDL,N as HarSakFødselTrillinger,u as HarSakFødselTvillinger,p as HarSakFødselUtenBarnIPDL,G as HarSakMedEnLevendeOgEnDødfødtTvilling,V as HarSakMedEtDødtBarn,C as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,H as HarSakMedOppgittBarnTvillingerAlleLever,F as HarSakMedTrillingerEnErDød,br as __namedExportsOrder,Tr as default};
//# sourceMappingURL=Velkommen.stories-fee62587.js.map
