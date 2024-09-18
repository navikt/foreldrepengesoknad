import{j as C}from"./jsx-runtime-Cw0GR0a5.js";import{a as _}from"./chunk-454WOBUV-CM0pFb8Z.js";import{F as _e}from"./FpDataContext-BUlrLNeW.js";import{M as Re,S as Ve}from"./useFpNavigator-CHQH00Kk.js";import{D as ye,R as xe}from"./eksisterendeSakUtils-BGvmjzru.js";import{i as Ce}from"./Uttaksplan-D-2ffJut.js";import{F as z}from"./Forside-CVhRtAlf.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-B6IzymJM.js";import"./Label-CBuMlGmt.js";import"./barnUtils-mAvkqF4V.js";import"./Environment-Bt0OjbDD.js";import"./guid-CsArkN6i.js";import"./iframe-DpVakA98.js";import"../sb-preview/runtime.js";import"./links-D1Ssr2Sm.js";import"./VStack-CXeXbv9J.js";import"./index-CYM-y3Gt.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BQNUR2Ll.js";import"./_overArg-BaVEvwpy.js";import"./ErrorSummaryHookForm-DaYFsW33.js";import"./DinePlikter-CsMhufQ_.js";import"./DinePersonopplysningerModal-Whv2Ca45.js";var R=(n=>(n.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",n.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",n.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",n.UNDER_BEHANDLING="UNDER_BEHANDLING",n))(R||{});const Je=()=>(...n)=>(_("button-click")(...n),Promise.resolve()),Fe={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},Le=(n,x)=>{const Ke=x.map(Ge=>({fnr:Ge}));return{...n,barn:Ke}},o=n=>({dekningsgrad:ye.HUNDRE_PROSENT,familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:xe.BEGGE_RETT,sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),e=n=>({...Fe,barn:n}),a="2022-12-06",Ye="2022-12-08",t={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},V={...t,dødsdato:"2022-12-07"},J={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},Pe={...J,dødsdato:"2022-12-07"},d={fødselsdato:a,dødsdato:a},Ne=!1,s={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},Y={...s,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},qe={...s,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Ne,fødselsdato:a}),l=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Ne,termindato:"2024-06-28",åpenbehandlingTilstand:R.UNDER_BEHANDLING}),we=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Ye,fødselsdato:a,åpenbehandlingTilstand:R.UNDER_BEHANDLING}),ze=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Qe=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),w=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),y=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:R.UNDER_BEHANDLING}),Ue=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),In={title:"pages/Forside",component:z,render:({onDispatch:n,...x})=>(Ce(),C.jsx(Re,{initialEntries:[Ve.VELKOMMEN],children:C.jsx(_e,{onDispatch:n,children:C.jsx(z,{...x})})}))},r={args:{fornavn:"Espen",harGodkjentVilkår:!1,saker:[],søkerInfo:{søker:Fe,arbeidsforhold:[]},onChangeLocale:()=>{},locale:"nb",fnr:"123",setErEndringssøknad:_("button-click"),setHarGodkjentVilkår:_("button-click"),setSøknadGjelderNyttBarn:_("button-click"),mellomlagreSøknadOgNaviger:Je()}},k={args:{...r.args,harGodkjentVilkår:!0}},i={args:{...r.args,saker:[q],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},g={args:{...r.args,saker:[l]}},c={args:{...r.args,saker:[we],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},f={args:{...r.args,saker:[ze],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},m={args:{...r.args,saker:[q,{...l,saksnummer:"555555"}],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},p={args:{...r.args,saker:[Qe]}},u={args:{...r.args,saker:[w]}},S={args:{...r.args,saker:[w],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},B={args:{...r.args,saker:[y],søkerInfo:{søker:e([s,Y]),arbeidsforhold:[]}}},v={args:{...r.args,saker:[Ue],søkerInfo:{søker:e([s,Y,qe]),arbeidsforhold:[]}}},D={args:{...r.args,saker:[],søkerInfo:{søker:e([t]),arbeidsforhold:[]}}},E={args:{...r.args,saker:[],søkerInfo:{søker:e([t,J]),arbeidsforhold:[]}}},I={args:{...r.args,saker:[],søkerInfo:{søker:e([V]),arbeidsforhold:[]}}},T={args:{...r.args,saker:[],søkerInfo:{søker:e([V,Pe]),arbeidsforhold:[]}}},h={args:{...r.args,saker:[],søkerInfo:{søker:e([d]),arbeidsforhold:[]}}},M={args:{...r.args,saker:[],søkerInfo:{søker:e([d,d]),arbeidsforhold:[]}}},b={args:{...r.args,saker:[],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},H={args:{...r.args,saker:[],søkerInfo:{søker:e([t,Pe]),arbeidsforhold:[]}}},j={args:{...r.args,saker:[y],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},A={args:{...r.args,saker:[q],søkerInfo:{søker:e([V]),arbeidsforhold:[]}}},O={args:{...r.args,saker:[w],søkerInfo:{søker:e([V]),arbeidsforhold:[]}}},F={args:{...r.args,saker:[Le(y,["1","2"])],søkerInfo:{søker:e([t,J]),arbeidsforhold:[]}}},L={args:{...r.args,saker:[Le(y,["1"])],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},P={args:{...r.args,saker:[Ue],søkerInfo:{søker:e([s,Y,d]),arbeidsforhold:[]}}},N={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-03-01",kjønn:"K"}]),arbeidsforhold:[]}}},U={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-09",kjønn:"K"}]),arbeidsforhold:[]}}},K={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-02-29",kjønn:"K"}]),arbeidsforhold:[]}}},G={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-10",kjønn:"K"}]),arbeidsforhold:[]}}};var Q,W,X;r.parameters={...r.parameters,docs:{...(Q=r.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    fornavn: 'Espen',
    harGodkjentVilkår: false,
    saker: [],
    søkerInfo: {
      søker: defaultPerson,
      arbeidsforhold: []
    },
    onChangeLocale: () => undefined,
    locale: 'nb',
    fnr: '123',
    setErEndringssøknad: action('button-click'),
    setHarGodkjentVilkår: action('button-click'),
    setSøknadGjelderNyttBarn: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...(X=(W=r.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Z,$,rr;k.parameters={...k.parameters,docs:{...(Z=k.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    harGodkjentVilkår: true
  }
}`,...(rr=($=k.parameters)==null?void 0:$.docs)==null?void 0:rr.source}}};var er,nr,ar;i.parameters={...i.parameters,docs:{...(er=i.parameters)==null?void 0:er.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(ar=(nr=i.parameters)==null?void 0:nr.docs)==null?void 0:ar.source}}};var sr,or,tr;g.parameters={...g.parameters,docs:{...(sr=g.parameters)==null?void 0:sr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin]
  }
}`,...(tr=(or=g.parameters)==null?void 0:or.docs)==null?void 0:tr.source}}};var dr,lr,kr;c.parameters={...c.parameters,docs:{...(dr=c.parameters)==null?void 0:dr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(kr=(lr=c.parameters)==null?void 0:lr.docs)==null?void 0:kr.source}}};var ir,gr,cr;f.parameters={...f.parameters,docs:{...(ir=f.parameters)==null?void 0:ir.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakAvsluttet],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(cr=(gr=f.parameters)==null?void 0:gr.docs)==null?void 0:cr.source}}};var fr,mr,pr;m.parameters={...m.parameters,docs:{...(fr=m.parameters)==null?void 0:fr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel, {
      ...sakUnderBehandlingTermin,
      saksnummer: '555555'
    }],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(pr=(mr=m.parameters)==null?void 0:mr.docs)==null?void 0:pr.source}}};var ur,Sr,Br;p.parameters={...p.parameters,docs:{...(ur=p.parameters)==null?void 0:ur.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUtenBarnFødsel]
  }
}`,...(Br=(Sr=p.parameters)==null?void 0:Sr.docs)==null?void 0:Br.source}}};var vr,Dr,Er;u.parameters={...u.parameters,docs:{...(vr=u.parameters)==null?void 0:vr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon]
  }
}`,...(Er=(Dr=u.parameters)==null?void 0:Dr.docs)==null?void 0:Er.source}}};var Ir,Tr,hr;S.parameters={...S.parameters,docs:{...(Ir=S.parameters)==null?void 0:Ir.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(hr=(Tr=S.parameters)==null?void 0:Tr.docs)==null?void 0:hr.source}}};var Mr,br,Hr;B.parameters={...B.parameters,docs:{...(Mr=B.parameters)==null?void 0:Mr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...(Hr=(br=B.parameters)==null?void 0:br.docs)==null?void 0:Hr.source}}};var jr,Ar,Or;v.parameters={...v.parameters,docs:{...(jr=v.parameters)==null?void 0:jr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...(Or=(Ar=v.parameters)==null?void 0:Ar.docs)==null?void 0:Or.source}}};var Fr,Lr,Pr;D.parameters={...D.parameters,docs:{...(Fr=D.parameters)==null?void 0:Fr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Pr=(Lr=D.parameters)==null?void 0:Lr.docs)==null?void 0:Pr.source}}};var Nr,Ur,Kr;E.parameters={...E.parameters,docs:{...(Nr=E.parameters)==null?void 0:Nr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(Kr=(Ur=E.parameters)==null?void 0:Ur.docs)==null?void 0:Kr.source}}};var Gr,_r,Rr;I.parameters={...I.parameters,docs:{...(Gr=I.parameters)==null?void 0:Gr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Rr=(_r=I.parameters)==null?void 0:_r.docs)==null?void 0:Rr.source}}};var Vr,yr,xr;T.parameters={...T.parameters,docs:{...(Vr=T.parameters)==null?void 0:Vr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(xr=(yr=T.parameters)==null?void 0:yr.docs)==null?void 0:xr.source}}};var Cr,Jr,Yr;h.parameters={...h.parameters,docs:{...(Cr=h.parameters)==null?void 0:Cr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Yr=(Jr=h.parameters)==null?void 0:Jr.docs)==null?void 0:Yr.source}}};var qr,wr,zr;M.parameters={...M.parameters,docs:{...(qr=M.parameters)==null?void 0:qr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(zr=(wr=M.parameters)==null?void 0:wr.docs)==null?void 0:zr.source}}};var Qr,Wr,Xr;b.parameters={...b.parameters,docs:{...(Qr=b.parameters)==null?void 0:Qr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Xr=(Wr=b.parameters)==null?void 0:Wr.docs)==null?void 0:Xr.source}}};var Zr,$r,re;H.parameters={...H.parameters,docs:{...(Zr=H.parameters)==null?void 0:Zr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(re=($r=H.parameters)==null?void 0:$r.docs)==null?void 0:re.source}}};var ee,ne,ae;j.parameters={...j.parameters,docs:{...(ee=j.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(ae=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var se,oe,te;A.parameters={...A.parameters,docs:{...(se=A.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(te=(oe=A.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var de,le,ke;O.parameters={...O.parameters,docs:{...(de=O.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(ke=(le=O.parameters)==null?void 0:le.docs)==null?void 0:ke.source}}};var ie,ge,ce;F.parameters={...F.parameters,docs:{...(ie=F.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1', '2'])],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(ce=(ge=F.parameters)==null?void 0:ge.docs)==null?void 0:ce.source}}};var fe,me,pe;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1'])],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(pe=(me=L.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var ue,Se,Be;P.parameters={...P.parameters,docs:{...(ue=P.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Be=(Se=P.parameters)==null?void 0:Se.docs)==null?void 0:Be.source}}};var ve,De,Ee;N.parameters={...N.parameters,docs:{...(ve=N.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([{
        fnr: '1',
        fornavn: 'Hanne',
        etternavn: 'Brokkoli',
        fødselsdato: '2024-03-01',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...(Ee=(De=N.parameters)==null?void 0:De.docs)==null?void 0:Ee.source}}};var Ie,Te,he;U.parameters={...U.parameters,docs:{...(Ie=U.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([{
        fnr: '1',
        fornavn: 'Hanne',
        etternavn: 'Brokkoli',
        fødselsdato: '2024-08-09',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...(he=(Te=U.parameters)==null?void 0:Te.docs)==null?void 0:he.source}}};var Me,be,He;K.parameters={...K.parameters,docs:{...(Me=K.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([{
        fnr: '1',
        fornavn: 'Hanne',
        etternavn: 'Brokkoli',
        fødselsdato: '2024-02-29',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...(He=(be=K.parameters)==null?void 0:be.docs)==null?void 0:He.source}}};var je,Ae,Oe;G.parameters={...G.parameters,docs:{...(je=G.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([{
        fnr: '1',
        fornavn: 'Hanne',
        etternavn: 'Brokkoli',
        fødselsdato: '2024-08-10',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...(Oe=(Ae=G.parameters)==null?void 0:Ae.docs)==null?void 0:Oe.source}}};const Tn=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{r as Default,k as HarAlleredeLestOgForstått,f as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,g as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,H as HarIngenSakerMedEnLevendeOgEnDødTvilling,b as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,h as HarIngenSakerOgEtDødfødtBarn,D as HarIngenSakerOgEttBarn,I as HarIngenSakerOgEttDødtBarn,T as HarIngenSakerOgToDødeTvillinger,M as HarIngenSakerOgToDødfødteBarn,E as HarIngenSakerOgTvillinger,i as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,O as HarSakAdopsjonMedEtDødtBarn,u as HarSakAdopsjonUtenBarnIPDL,v as HarSakFødselTrillinger,B as HarSakFødselTvillinger,p as HarSakFødselUtenBarnIPDL,j as HarSakMedEnLevendeOgEnDødfødtTvilling,A as HarSakMedEtDødtBarn,L as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,F as HarSakMedOppgittBarnTvillingerAlleLever,P as HarSakMedTrillingerEnErDød,G as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,K as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,N as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,U as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,Tn as __namedExportsOrder,In as default};
