import{j as _}from"./jsx-runtime-CLpGMVip.js";import{a as V}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{F as Ne}from"./FpDataContext-DWIUkGg8.js";import{M as Ve,S as ye}from"./useFpNavigator-P3t276a7.js";import{F as w}from"./Forside-N5YTL2aH.js";import"./v4-CtRu48qb.js";import"./index-DI2V0i71.js";import"./Uttaksplan-BBRR8lyx.js";import"./dates-AkG-ZPn6.js";import"./List-CllE7Dzf.js";import"./iframe-D_c9tLHK.js";import"./VStack-CblYb0Xi.js";import"./index-Go8-pri6.js";import"./index-DNwIpxWs.js";import"./ErrorSummaryHookForm-DC0Xv-eP.js";import"./ConfirmationPanel-BsekZZI4.js";import"./eksisterendeSakUtils-DSHEYau7.js";import"./barnUtils-DZvnjw_L.js";import"./guid-CsArkN6i.js";import"./DinePlikter-vEuxPBWy.js";import"./DinePersonopplysningerModal-DYdJvji_.js";const Re=()=>(...n)=>(V("button-click")(...n),Promise.resolve()),Fe={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]},Oe=(n,x)=>{const Ke=x.map(Ge=>({fnr:Ge}));return{...n,barn:Ke}},o=n=>({dekningsgrad:"HUNDRE",familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:"BEGGE_RETT",sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,oppdatertTidspunkt:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),e=n=>({...Fe,barn:n}),a="2022-12-06",xe="2022-12-08",t={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},y={...t,dødsdato:"2022-12-07"},C={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},Le={...C,dødsdato:"2022-12-07"},d={fødselsdato:a,dødsdato:a,kjønn:"K",fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle"},Pe=!1,s={fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},J={...s,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},_e={...s,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},Y=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,fødselsdato:a}),l=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Pe,termindato:"2024-06-28",åpenbehandlingTilstand:"UNDER_BEHANDLING"}),Ce=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:xe,fødselsdato:a,åpenbehandlingTilstand:"UNDER_BEHANDLING"}),Je=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Ye=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),R=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:"UNDER_BEHANDLING"}),Ue=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),mn={title:"pages/Forside",component:w,render:({onDispatch:n,...x})=>_.jsx(Ve,{initialEntries:[ye.VELKOMMEN],children:_.jsx(Ne,{onDispatch:n,children:_.jsx(w,{...x})})})},r={args:{harGodkjentVilkår:!1,saker:[],søkerInfo:{søker:Fe,arbeidsforhold:[]},onChangeLocale:()=>{},locale:"nb",setErEndringssøknad:V("button-click"),setHarGodkjentVilkår:V("button-click"),setSøknadGjelderNyttBarn:V("button-click"),mellomlagreSøknadOgNaviger:Re()}},k={args:{...r.args,harGodkjentVilkår:!0}},i={args:{...r.args,saker:[Y],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},g={args:{...r.args,saker:[l]}},c={args:{...r.args,saker:[Ce],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},f={args:{...r.args,saker:[Je],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},m={args:{...r.args,saker:[Y,{...l,saksnummer:"555555"}],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},p={args:{...r.args,saker:[Ye]}},u={args:{...r.args,saker:[q]}},S={args:{...r.args,saker:[q],søkerInfo:{søker:e([s]),arbeidsforhold:[]}}},B={args:{...r.args,saker:[R],søkerInfo:{søker:e([s,J]),arbeidsforhold:[]}}},v={args:{...r.args,saker:[Ue],søkerInfo:{søker:e([s,J,_e]),arbeidsforhold:[]}}},I={args:{...r.args,saker:[],søkerInfo:{søker:e([t]),arbeidsforhold:[]}}},h={args:{...r.args,saker:[],søkerInfo:{søker:e([t,C]),arbeidsforhold:[]}}},D={args:{...r.args,saker:[],søkerInfo:{søker:e([y]),arbeidsforhold:[]}}},E={args:{...r.args,saker:[],søkerInfo:{søker:e([y,Le]),arbeidsforhold:[]}}},b={args:{...r.args,saker:[],søkerInfo:{søker:e([d]),arbeidsforhold:[]}}},M={args:{...r.args,saker:[],søkerInfo:{søker:e([d,d]),arbeidsforhold:[]}}},T={args:{...r.args,saker:[],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},H={args:{...r.args,saker:[],søkerInfo:{søker:e([t,Le]),arbeidsforhold:[]}}},j={args:{...r.args,saker:[R],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},A={args:{...r.args,saker:[Y],søkerInfo:{søker:e([y]),arbeidsforhold:[]}}},F={args:{...r.args,saker:[q],søkerInfo:{søker:e([y]),arbeidsforhold:[]}}},O={args:{...r.args,saker:[Oe(R,["1","2"])],søkerInfo:{søker:e([t,C]),arbeidsforhold:[]}}},L={args:{...r.args,saker:[Oe(R,["1"])],søkerInfo:{søker:e([t,d]),arbeidsforhold:[]}}},P={args:{...r.args,saker:[Ue],søkerInfo:{søker:e([s,J,d]),arbeidsforhold:[]}}},U={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-03-01",kjønn:"K"}]),arbeidsforhold:[]}}},K={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-09",kjønn:"K"}]),arbeidsforhold:[]}}},G={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-02-29",kjønn:"K"}]),arbeidsforhold:[]}}},N={args:{...r.args,saker:[l],søkerInfo:{søker:e([{fnr:"1",fornavn:"Hanne",etternavn:"Brokkoli",fødselsdato:"2024-08-10",kjønn:"K"}]),arbeidsforhold:[]}}};var z,Q,W;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    harGodkjentVilkår: false,
    saker: [],
    søkerInfo: {
      søker: defaultPerson,
      arbeidsforhold: []
    },
    onChangeLocale: () => undefined,
    locale: 'nb',
    setErEndringssøknad: action('button-click'),
    setHarGodkjentVilkår: action('button-click'),
    setSøknadGjelderNyttBarn: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...(W=(Q=r.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;k.parameters={...k.parameters,docs:{...(X=k.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    harGodkjentVilkår: true
  }
}`,...($=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var rr,er,nr;i.parameters={...i.parameters,docs:{...(rr=i.parameters)==null?void 0:rr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(nr=(er=i.parameters)==null?void 0:er.docs)==null?void 0:nr.source}}};var ar,sr,or;g.parameters={...g.parameters,docs:{...(ar=g.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin]
  }
}`,...(or=(sr=g.parameters)==null?void 0:sr.docs)==null?void 0:or.source}}};var tr,dr,lr;c.parameters={...c.parameters,docs:{...(tr=c.parameters)==null?void 0:tr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(lr=(dr=c.parameters)==null?void 0:dr.docs)==null?void 0:lr.source}}};var kr,ir,gr;f.parameters={...f.parameters,docs:{...(kr=f.parameters)==null?void 0:kr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakAvsluttet],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(gr=(ir=f.parameters)==null?void 0:ir.docs)==null?void 0:gr.source}}};var cr,fr,mr;m.parameters={...m.parameters,docs:{...(cr=m.parameters)==null?void 0:cr.docs,source:{originalSource:`{
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
}`,...(mr=(fr=m.parameters)==null?void 0:fr.docs)==null?void 0:mr.source}}};var pr,ur,Sr;p.parameters={...p.parameters,docs:{...(pr=p.parameters)==null?void 0:pr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUtenBarnFødsel]
  }
}`,...(Sr=(ur=p.parameters)==null?void 0:ur.docs)==null?void 0:Sr.source}}};var Br,vr,Ir;u.parameters={...u.parameters,docs:{...(Br=u.parameters)==null?void 0:Br.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon]
  }
}`,...(Ir=(vr=u.parameters)==null?void 0:vr.docs)==null?void 0:Ir.source}}};var hr,Dr,Er;S.parameters={...S.parameters,docs:{...(hr=S.parameters)==null?void 0:hr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Er=(Dr=S.parameters)==null?void 0:Dr.docs)==null?void 0:Er.source}}};var br,Mr,Tr;B.parameters={...B.parameters,docs:{...(br=B.parameters)==null?void 0:br.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...(Tr=(Mr=B.parameters)==null?void 0:Mr.docs)==null?void 0:Tr.source}}};var Hr,jr,Ar;v.parameters={...v.parameters,docs:{...(Hr=v.parameters)==null?void 0:Hr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...(Ar=(jr=v.parameters)==null?void 0:jr.docs)==null?void 0:Ar.source}}};var Fr,Or,Lr;I.parameters={...I.parameters,docs:{...(Fr=I.parameters)==null?void 0:Fr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Lr=(Or=I.parameters)==null?void 0:Or.docs)==null?void 0:Lr.source}}};var Pr,Ur,Kr;h.parameters={...h.parameters,docs:{...(Pr=h.parameters)==null?void 0:Pr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(Kr=(Ur=h.parameters)==null?void 0:Ur.docs)==null?void 0:Kr.source}}};var Gr,Nr,Vr;D.parameters={...D.parameters,docs:{...(Gr=D.parameters)==null?void 0:Gr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Vr=(Nr=D.parameters)==null?void 0:Nr.docs)==null?void 0:Vr.source}}};var yr,Rr,xr;E.parameters={...E.parameters,docs:{...(yr=E.parameters)==null?void 0:yr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(xr=(Rr=E.parameters)==null?void 0:Rr.docs)==null?void 0:xr.source}}};var _r,Cr,Jr;b.parameters={...b.parameters,docs:{...(_r=b.parameters)==null?void 0:_r.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Jr=(Cr=b.parameters)==null?void 0:Cr.docs)==null?void 0:Jr.source}}};var Yr,qr,wr;M.parameters={...M.parameters,docs:{...(Yr=M.parameters)==null?void 0:Yr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(wr=(qr=M.parameters)==null?void 0:qr.docs)==null?void 0:wr.source}}};var zr,Qr,Wr;T.parameters={...T.parameters,docs:{...(zr=T.parameters)==null?void 0:zr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Wr=(Qr=T.parameters)==null?void 0:Qr.docs)==null?void 0:Wr.source}}};var Xr,Zr,$r;H.parameters={...H.parameters,docs:{...(Xr=H.parameters)==null?void 0:Xr.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...($r=(Zr=H.parameters)==null?void 0:Zr.docs)==null?void 0:$r.source}}};var re,ee,ne;j.parameters={...j.parameters,docs:{...(re=j.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(ne=(ee=j.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,se,oe;A.parameters={...A.parameters,docs:{...(ae=A.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(oe=(se=A.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var te,de,le;F.parameters={...F.parameters,docs:{...(te=F.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(le=(de=F.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ke,ie,ge;O.parameters={...O.parameters,docs:{...(ke=O.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1', '2'])],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...(ge=(ie=O.parameters)==null?void 0:ie.docs)==null?void 0:ge.source}}};var ce,fe,me;L.parameters={...L.parameters,docs:{...(ce=L.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1'])],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(me=(fe=L.parameters)==null?void 0:fe.docs)==null?void 0:me.source}}};var pe,ue,Se;P.parameters={...P.parameters,docs:{...(pe=P.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...(Se=(ue=P.parameters)==null?void 0:ue.docs)==null?void 0:Se.source}}};var Be,ve,Ie;U.parameters={...U.parameters,docs:{...(Be=U.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(Ie=(ve=U.parameters)==null?void 0:ve.docs)==null?void 0:Ie.source}}};var he,De,Ee;K.parameters={...K.parameters,docs:{...(he=K.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(Ee=(De=K.parameters)==null?void 0:De.docs)==null?void 0:Ee.source}}};var be,Me,Te;G.parameters={...G.parameters,docs:{...(be=G.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(Te=(Me=G.parameters)==null?void 0:Me.docs)==null?void 0:Te.source}}};var He,je,Ae;N.parameters={...N.parameters,docs:{...(He=N.parameters)==null?void 0:He.docs,source:{originalSource:`{
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
}`,...(Ae=(je=N.parameters)==null?void 0:je.docs)==null?void 0:Ae.source}}};const pn=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{r as Default,k as HarAlleredeLestOgForstått,f as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,g as HarFPSakUnderBehandlingTermin,m as HarFlereSaker,H as HarIngenSakerMedEnLevendeOgEnDødTvilling,T as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,b as HarIngenSakerOgEtDødfødtBarn,I as HarIngenSakerOgEttBarn,D as HarIngenSakerOgEttDødtBarn,E as HarIngenSakerOgToDødeTvillinger,M as HarIngenSakerOgToDødfødteBarn,h as HarIngenSakerOgTvillinger,i as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,F as HarSakAdopsjonMedEtDødtBarn,u as HarSakAdopsjonUtenBarnIPDL,v as HarSakFødselTrillinger,B as HarSakFødselTvillinger,p as HarSakFødselUtenBarnIPDL,j as HarSakMedEnLevendeOgEnDødfødtTvilling,A as HarSakMedEtDødtBarn,L as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,O as HarSakMedOppgittBarnTvillingerAlleLever,P as HarSakMedTrillingerEnErDød,N as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,G as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,U as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,K as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,pn as __namedExportsOrder,mn as default};
