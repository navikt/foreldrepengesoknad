import{l as x}from"./iframe-4ccll28x.js";import{F as er}from"./FpDataContext-BC74lUxo.js";import{M as nr,S as ar}from"./useFpNavigator-B2Tm9bkU.js";import{F as w}from"./Forside-CoWa_Rck.js";import"./preload-helper-PPVm8Dsz.js";import"./DinePlikter-j4Fudq3K.js";import"./List-ivT9TXvc.js";import"./DinePersonopplysningerModal-mLom8J0F.js";const{action:_}=__STORYBOOK_MODULE_ACTIONS__,sr=()=>()=>(_("button-click")(),Promise.resolve()),z={fnr:"19047815714",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"},kjønn:"K",fødselsdato:"1978-04-19",barn:[]},Q=(n,y)=>{const $=y.map(rr=>({fnr:rr}));return{...n,barn:$}},o=n=>({dekningsgrad:"HUNDRE",familiehendelse:{fødselsdato:n.fødselsdato,omsorgsovertakelse:n.omsorgsovertakelse,antallBarn:n.antallBarn,termindato:n.termindato},forelder:"MOR",gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:n.gjelderAdopsjon,kanSøkeOmEndring:n.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:"BEGGE_RETT",sakAvsluttet:n.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,oppdatertTidspunkt:"2022-05-06",åpenBehandling:n.åpenbehandlingTilstand!==void 0?{tilstand:n.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),e=n=>({...z,barn:n}),a="2022-12-06",or="2022-12-08",t={fnr:"1",navn:{fornavn:"Oriental",etternavn:"Bokhylle"},fødselsdato:a,kjønn:"K"},V={...t,dødsdato:"2022-12-07"},C={fnr:"2",navn:{fornavn:"Vakker",etternavn:"Bokhylle"},fødselsdato:a,kjønn:"K"},W={...C,dødsdato:"2022-12-07"},d={fødselsdato:a,dødsdato:a,kjønn:"K",fnr:"2",navn:{fornavn:"Vakker",etternavn:"Bokhylle"}},X=!1,s={fnr:"3",navn:{fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår"},fødselsdato:a,kjønn:"M"},Y={...s,navn:{...s.navn,mellomnavn:void 0,fornavn:"Grønn"},fnr:"4"},tr={...s,navn:{...s.navn,mellomnavn:void 0,fornavn:"Sommerlig"},fnr:"5"},J=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:X,fødselsdato:a}),l=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:X,termindato:"2024-06-28",åpenbehandlingTilstand:"UNDER_BEHANDLING"}),dr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:or,fødselsdato:a,åpenbehandlingTilstand:"UNDER_BEHANDLING"}),lr=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),kr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),q=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),R=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:"UNDER_BEHANDLING"}),Z=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Br={title:"pages/Forside",component:w,render:({onDispatch:n,...y})=>x.jsx(nr,{initialEntries:[ar.VELKOMMEN],children:x.jsx(er,{onDispatch:n,children:x.jsx(w,{...y})})})},r={args:{harGodkjentVilkår:!1,saker:[],søkerInfo:{person:z,arbeidsforhold:[]},setErEndringssøknad:_("button-click"),setHarGodkjentVilkår:_("button-click"),setSøknadGjelderNyttBarn:_("button-click"),mellomlagreSøknadOgNaviger:sr()}},k={args:{...r.args,harGodkjentVilkår:!0}},i={args:{...r.args,saker:[J],søkerInfo:{person:e([s]),arbeidsforhold:[]}}},g={args:{...r.args,saker:[l]}},c={args:{...r.args,saker:[dr],søkerInfo:{person:e([s]),arbeidsforhold:[]}}},f={args:{...r.args,saker:[lr],søkerInfo:{person:e([s]),arbeidsforhold:[]}}},p={args:{...r.args,saker:[J,{...l,saksnummer:"555555"}],søkerInfo:{person:e([s]),arbeidsforhold:[]}}},m={args:{...r.args,saker:[kr]}},u={args:{...r.args,saker:[q]}},S={args:{...r.args,saker:[q],søkerInfo:{person:e([s]),arbeidsforhold:[]}}},B={args:{...r.args,saker:[R],søkerInfo:{person:e([s,Y]),arbeidsforhold:[]}}},v={args:{...r.args,saker:[Z],søkerInfo:{person:e([s,Y,tr]),arbeidsforhold:[]}}},I={args:{...r.args,saker:[],søkerInfo:{person:e([t]),arbeidsforhold:[]}}},D={args:{...r.args,saker:[],søkerInfo:{person:e([t,C]),arbeidsforhold:[]}}},h={args:{...r.args,saker:[],søkerInfo:{person:e([V]),arbeidsforhold:[]}}},E={args:{...r.args,saker:[],søkerInfo:{person:e([V,W]),arbeidsforhold:[]}}},M={args:{...r.args,saker:[],søkerInfo:{person:e([d]),arbeidsforhold:[]}}},b={args:{...r.args,saker:[],søkerInfo:{person:e([d,d]),arbeidsforhold:[]}}},T={args:{...r.args,saker:[],søkerInfo:{person:e([t,d]),arbeidsforhold:[]}}},H={args:{...r.args,saker:[],søkerInfo:{person:e([t,W]),arbeidsforhold:[]}}},j={args:{...r.args,saker:[R],søkerInfo:{person:e([t,d]),arbeidsforhold:[]}}},O={args:{...r.args,saker:[J],søkerInfo:{person:e([V]),arbeidsforhold:[]}}},A={args:{...r.args,saker:[q],søkerInfo:{person:e([V]),arbeidsforhold:[]}}},F={args:{...r.args,saker:[Q(R,["1","2"])],søkerInfo:{person:e([t,C]),arbeidsforhold:[]}}},L={args:{...r.args,saker:[Q(R,["1"])],søkerInfo:{person:e([t,d]),arbeidsforhold:[]}}},P={args:{...r.args,saker:[Z],søkerInfo:{person:e([s,Y,d]),arbeidsforhold:[]}}},U={args:{...r.args,saker:[l],søkerInfo:{person:e([{fnr:"1",navn:{fornavn:"Hanne",etternavn:"Brokkoli"},fødselsdato:"2024-03-01",kjønn:"K"}]),arbeidsforhold:[]}}},K={args:{...r.args,saker:[l],søkerInfo:{person:e([{fnr:"1",navn:{fornavn:"Hanne",etternavn:"Brokkoli"},fødselsdato:"2024-08-09",kjønn:"K"}]),arbeidsforhold:[]}}},N={args:{...r.args,saker:[l],søkerInfo:{person:e([{fnr:"1",navn:{fornavn:"Hanne",etternavn:"Brokkoli"},fødselsdato:"2024-02-29",kjønn:"K"}]),arbeidsforhold:[]}}},G={args:{...r.args,saker:[l],søkerInfo:{person:e([{fnr:"1",navn:{fornavn:"Hanne",etternavn:"Brokkoli"},fødselsdato:"2024-08-10",kjønn:"K"}]),arbeidsforhold:[]}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    harGodkjentVilkår: false,
    saker: [],
    søkerInfo: {
      person: defaultPerson,
      arbeidsforhold: []
    },
    setErEndringssøknad: action('button-click'),
    setHarGodkjentVilkår: action('button-click'),
    setSøknadGjelderNyttBarn: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...r.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    harGodkjentVilkår: true
  }
}`,...k.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin]
  }
}`,...g.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...c.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakAvsluttet],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel, {
      ...sakUnderBehandlingTermin,
      saksnummer: '555555'
    }],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUtenBarnFødsel]
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon]
  }
}`,...u.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn]),
      arbeidsforhold: []
    }
  }
}`,...S.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...B.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
      arbeidsforhold: []
    }
  }
}`,...v.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn]),
      arbeidsforhold: []
    }
  }
}`,...I.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...D.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...h.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødtBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...E.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...M.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...b.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...T.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, dødTvilling]),
      arbeidsforhold: []
    }
  }
}`,...H.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTvillinger],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...j.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakOpprettetFødsel],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...O.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakEttBarnAdopsjon],
    søkerInfo: {
      person: getSøkerinfoMedBarn([dødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...A.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1', '2'])],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
      arbeidsforhold: []
    }
  }
}`,...F.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [getSakMedBarn(sakMedTvillinger, ['1'])],
    søkerInfo: {
      person: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...L.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakMedTrillinger],
    søkerInfo: {
      person: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
      arbeidsforhold: []
    }
  }
}`,...P.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      person: getSøkerinfoMedBarn([{
        fnr: '1',
        navn: {
          fornavn: 'Hanne',
          etternavn: 'Brokkoli'
        },
        fødselsdato: '2024-03-01',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...U.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      person: getSøkerinfoMedBarn([{
        fnr: '1',
        navn: {
          fornavn: 'Hanne',
          etternavn: 'Brokkoli'
        },
        fødselsdato: '2024-08-09',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...K.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      person: getSøkerinfoMedBarn([{
        fnr: '1',
        navn: {
          fornavn: 'Hanne',
          etternavn: 'Brokkoli'
        },
        fødselsdato: '2024-02-29',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...N.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    saker: [sakUnderBehandlingTermin],
    søkerInfo: {
      person: getSøkerinfoMedBarn([{
        fnr: '1',
        navn: {
          fornavn: 'Hanne',
          etternavn: 'Brokkoli'
        },
        fødselsdato: '2024-08-10',
        kjønn: 'K'
      }]),
      arbeidsforhold: []
    }
  }
}`,...G.parameters?.docs?.source}}};const vr=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker","HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker","HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig","HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent"];export{r as Default,k as HarAlleredeLestOgForstått,f as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,g as HarFPSakUnderBehandlingTermin,p as HarFlereSaker,H as HarIngenSakerMedEnLevendeOgEnDødTvilling,T as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,M as HarIngenSakerOgEtDødfødtBarn,I as HarIngenSakerOgEttBarn,h as HarIngenSakerOgEttDødtBarn,E as HarIngenSakerOgToDødeTvillinger,b as HarIngenSakerOgToDødfødteBarn,D as HarIngenSakerOgTvillinger,i as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,A as HarSakAdopsjonMedEtDødtBarn,u as HarSakAdopsjonUtenBarnIPDL,v as HarSakFødselTrillinger,B as HarSakFødselTvillinger,m as HarSakFødselUtenBarnIPDL,j as HarSakMedEnLevendeOgEnDødfødtTvilling,O as HarSakMedEtDødtBarn,L as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,F as HarSakMedOppgittBarnTvillingerAlleLever,P as HarSakMedTrillingerEnErDød,G as HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent,N as HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig,U as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker,K as HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker,vr as __namedExportsOrder,Br as default};
