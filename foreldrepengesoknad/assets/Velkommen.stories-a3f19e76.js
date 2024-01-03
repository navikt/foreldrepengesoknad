import{j as Y}from"./jsx-runtime-d079401a.js";import{w as Vn}from"./withRouter-d9926836.js";import{a as I}from"./chunk-WFFRPTHA-80d37c1b.js";import{D as bn,R as Bn}from"./eksisterendeSakUtils-410ab733.js";import"./Tidsperioden-a9e7c25c.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{m as Hn}from"./mapSøkerinfoDTO-a9156b17.js";import{F as Cn}from"./FpDataContext-fc20d236.js";import{V as fn}from"./Velkommen-13c93086.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./dateUtils-92fae614.js";import"./Perioden-cc956828.js";import"./leggTilPeriode-9d86030b.js";import"./Periodene-23276648.js";import"./uttaksPlanStatus-2cabf12a.js";import"./stringUtils-56ddfa05.js";import"./barnUtils-31e942c7.js";import"./velkommenUtils-47a82549.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Link-13f307fd.js";import"./index-b580f7e8.js";import"./links-b36d21ab.js";import"./DinePlikter-f233f440.js";import"./DinePersonopplysningerModal-711fbf51.js";import"./Ingress-6c1bbb1b.js";import"./routes-9effe5a6.js";import"./Alert-1e78f0aa.js";var L=(n=>(n.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",n.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",n.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",n.UNDER_BEHANDLING="UNDER_BEHANDLING",n))(L||{});const An=()=>(...n)=>(I("button-click")(...n),Promise.resolve()),Vr={title:"pages/Velkommen",component:fn,decorators:[Vn]},s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:n,saker:y,søkerinfo:P,mellomlagreSøknadOgNaviger:U=An(),gåTilNesteSide:Gn})=>Y.jsx(Cn,{onDispatch:Gn,children:Y.jsx(fn,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:y,fnr:"123",harGodkjentVilkår:n,søkerInfo:Hn(P),setErEndringssøknad:I("button-click"),setHarGodkjentVilkår:I("button-click"),setSøknadGjelderNyttBarn:I("button-click"),mellomlagreSøknadOgNaviger:U})}),Sn=(n,y)=>{const P=y.map(U=>({fnr:U}));return{...n,barn:P}},t=n=>({dekningsgrad:bn.HUNDRE_PROSENT,familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Bn.BEGGE_RETT,sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),r=n=>({...s,søker:{...s.søker,barn:n}}),a="2022-12-06",In="2022-12-08",A={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},un={...A,dødsdato:"2022-12-07"},Nn={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},vn={...Nn,dødsdato:"2022-12-07"},C={fødselsdato:a,dødsdato:a},jn=!1,o={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},_={...o,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Ln={...o,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},R=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:jn,fødselsdato:a}),Dn=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:jn,termindato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),Mn=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:In,fødselsdato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),yn=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Pn=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),K=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),M=t({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:L.UNDER_BEHANDLING}),Un=Sn(M,["1","2"]),_n=Sn(M,["1"]),Tn=t({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Rn=[R,{...Dn,saksnummer:"555555"}],On=[],i=e.bind({});i.args={harGodkjentVilkår:!1,saker:On,søkerinfo:s};const k=e.bind({});k.args={harGodkjentVilkår:!0,saker:On,søkerinfo:s};const l=e.bind({});l.args={saker:[R],søkerinfo:r([o])};const d=e.bind({});d.args={saker:[Dn],søkerinfo:s};const c=e.bind({});c.args={saker:[Mn],søkerinfo:r([o])};const g=e.bind({});g.args={saker:[yn],søkerinfo:r([o])};const x=e.bind({});x.args={saker:Rn,søkerinfo:r([o])};const m=e.bind({});m.args={saker:[Pn],søkerinfo:s};const p=e.bind({});p.args={saker:[K],søkerinfo:s};const F=e.bind({});F.args={saker:[K],søkerinfo:r([o])};const E=e.bind({});E.args={saker:[M],søkerinfo:r([o,_])};const f=e.bind({});f.args={saker:[Tn],søkerinfo:r([o,_,Ln])};const Kn=r([A]),hn=r([A,Nn]),J=r([un]),Jn=r([un,vn]),wn=r([C]),Yn=r([C,C]),w=r([A,C]),qn=r([A,vn]),S=e.bind({});S.args={saker:[],søkerinfo:Kn};const u=e.bind({});u.args={saker:[],søkerinfo:hn};const N=e.bind({});N.args={saker:[],søkerinfo:J};const v=e.bind({});v.args={saker:[],søkerinfo:Jn};const j=e.bind({});j.args={saker:[],søkerinfo:wn};const D=e.bind({});D.args={saker:[],søkerinfo:Yn};const T=e.bind({});T.args={saker:[],søkerinfo:w};const O=e.bind({});O.args={saker:[],søkerinfo:qn};const h=e.bind({});h.args={saker:[M],søkerinfo:w};const G=e.bind({});G.args={saker:[R],søkerinfo:J};const V=e.bind({});V.args={saker:[K],søkerinfo:J};const b=e.bind({});b.args={saker:[Un],søkerinfo:hn};const B=e.bind({});B.args={saker:[_n],søkerinfo:w};const H=e.bind({});H.args={saker:[Tn],søkerinfo:r([o,_,C])};var q,z,Q;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`({
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
}`,...(Z=(X=k.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(ne=(ee=l.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,ae,oe;d.parameters={...d.parameters,docs:{...(re=d.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(de=(le=g.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,ge,xe;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(xe=(ge=x.parameters)==null?void 0:ge.docs)==null?void 0:xe.source}}};var me,pe,Fe;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Fe=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:Fe.source}}};var Ee,fe,Se;p.parameters={...p.parameters,docs:{...(Ee=p.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
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
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ge=(he=f.parameters)==null?void 0:he.docs)==null?void 0:Ge.source}}};var Ve,be,Be;S.parameters={...S.parameters,docs:{...(Ve=S.parameters)==null?void 0:Ve.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Be=(be=S.parameters)==null?void 0:be.docs)==null?void 0:Be.source}}};var He,Ce,Ae;u.parameters={...u.parameters,docs:{...(He=u.parameters)==null?void 0:He.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(Ae=(Ce=u.parameters)==null?void 0:Ce.docs)==null?void 0:Ae.source}}};var Ie,Le,Me;N.parameters={...N.parameters,docs:{...(Ie=N.parameters)==null?void 0:Ie.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
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
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(nn=(en=h.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};var rn,an,on;G.parameters={...G.parameters,docs:{...(rn=G.parameters)==null?void 0:rn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(on=(an=G.parameters)==null?void 0:an.docs)==null?void 0:on.source}}};var tn,sn,kn;V.parameters={...V.parameters,docs:{...(tn=V.parameters)==null?void 0:tn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(kn=(sn=V.parameters)==null?void 0:sn.docs)==null?void 0:kn.source}}};var ln,dn,cn;b.parameters={...b.parameters,docs:{...(ln=b.parameters)==null?void 0:ln.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(cn=(dn=b.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var gn,xn,mn;B.parameters={...B.parameters,docs:{...(gn=B.parameters)==null?void 0:gn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(mn=(xn=B.parameters)==null?void 0:xn.docs)==null?void 0:mn.source}}};var pn,Fn,En;H.parameters={...H.parameters,docs:{...(pn=H.parameters)==null?void 0:pn.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} harGodkjentVilkår={harGodkjentVilkår} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} setErEndringssøknad={action('button-click')} setHarGodkjentVilkår={action('button-click')} setSøknadGjelderNyttBarn={action('button-click')} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
        </FpDataContext>;
}`,...(En=(Fn=H.parameters)==null?void 0:Fn.docs)==null?void 0:En.source}}};const br=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{i as Default,k as HarAlleredeLestOgForstått,g as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,d as HarFPSakUnderBehandlingTermin,x as HarFlereSaker,O as HarIngenSakerMedEnLevendeOgEnDødTvilling,T as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,j as HarIngenSakerOgEtDødfødtBarn,S as HarIngenSakerOgEttBarn,N as HarIngenSakerOgEttDødtBarn,v as HarIngenSakerOgToDødeTvillinger,D as HarIngenSakerOgToDødfødteBarn,u as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,F as HarSakAdopsjonMedBarnIPDL,V as HarSakAdopsjonMedEtDødtBarn,p as HarSakAdopsjonUtenBarnIPDL,f as HarSakFødselTrillinger,E as HarSakFødselTvillinger,m as HarSakFødselUtenBarnIPDL,h as HarSakMedEnLevendeOgEnDødfødtTvilling,G as HarSakMedEtDødtBarn,B as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,b as HarSakMedOppgittBarnTvillingerAlleLever,H as HarSakMedTrillingerEnErDød,br as __namedExportsOrder,Vr as default};
