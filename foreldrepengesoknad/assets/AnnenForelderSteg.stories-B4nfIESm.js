import{bp as A,bq as o,_ as m}from"./iframe-Cixqbhkb.js";import{F as I,C as c}from"./FpDataContext-D0KztiVe.js";import{M as T,S as j}from"./useFpNavigator-DjCOzCJK.js";import{h as u,H as S}from"./index-X5Lkj7l5.js";import{a as L,b as U}from"./annenPartVedtak-Dw1uUoYP.js";import{S as P}from"./sivilstandType-DxfjzFEG.js";import{A as F}from"./AnnenForelderSteg-DIOBVwix.js";import"./preload-helper-D9Z9MdNV.js";import"./api-BfN1mhhT.js";import"./queries-ByORbUNN.js";import"./annenForelderUtils-EtlPmC7y.js";import"./eksisterendeSakUtils-CkcU6KLa.js";import"./guid-CsArkN6i.js";import"./RegistrertePersonalia-C4AP-T_H.js";import"./BabyWrapped-CoOmFJLm.js";import"./List-DuXmi8JJ.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,M=()=>()=>(g("button-click")(),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},J={title:"steps/AnnenForelderSteg",component:F,decorators:[A],render:({søkersituasjon:v={situasjon:"fødsel",rolle:"mor"},barn:b={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:B,gåTilNesteSide:O=g("button-click"),...E})=>m.jsx(T,{initialEntries:[j.ANNEN_FORELDER],children:m.jsx(I,{onDispatch:O,initialState:{[c.SØKERSITUASJON]:v,[c.OM_BARNET]:b,[c.ANNEN_FORELDER]:B},children:m.jsx(F,{...E})})})},e={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:M(),avbrytSøknad:g("button-click")}},r={args:{...e.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},d={args:{...r.args,søkerInfo:{søker:{...n,barn:[{fornavn:"Ben",fnr:"1",etternavn:"Big",kjønn:"M",fødselsdato:"2021-03-15",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},l={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},a={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]}}},i={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{søker:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]},arbeidsforhold:[]}}},p={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:P.GIFT}},arbeidsforhold:[]}}},f={args:{...e.args,annenForelder:{...n.barn[0].annenForelder,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[u.post(".//rest/innsyn/v2/annenPartVedtak",()=>S.json(L))]}}},k={args:{...e.args,annenForelder:{...n.barn[0].annenForelder,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[u.post(".//rest/innsyn/v2/annenPartVedtak",()=>S.json(U))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1,
      fnr: ['21091981146']
    },
    søkerInfo: {
      søker: defaultSøker,
      arbeidsforhold: []
    },
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    },
    annenForelder: {
      kanIkkeOppgis: false
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'annen forelder',
      kanIkkeOppgis: false
    }
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: [{
          fornavn: 'Ben',
          fnr: '1',
          etternavn: 'Big',
          kjønn: 'M',
          fødselsdato: '2021-03-15',
          annenForelder: {
            fnr: '999999999',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          }
        }] satisfies BarnFrontend[]
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'Tom',
      fnr: '123456789',
      kanIkkeOppgis: false
    }
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1,
      fnr: ['21091981146']
    },
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [{
          fnr: '21091981146',
          fødselsdato: '2021-03-15',
          annenForelder: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            fornavn: 'TALENTFULL',
            etternavn: 'MYGG'
          },
          fornavn: 'KLØKTIG',
          etternavn: 'MIDTPUNKT',
          kjønn: 'K'
        }]
      },
      arbeidsforhold: []
    },
    annenForelder: undefined
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2023-05-05'
    },
    annenForelder: {
      kanIkkeOppgis: false
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        kjønn: 'K',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [],
        sivilstand: {
          type: SivilstandType.GIFT
        }
      },
      arbeidsforhold: []
    }
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultSøker.barn[0].annenForelder,
      kanIkkeOppgis: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak\`, () => HttpResponse.json(annenPartVedtak))]
    }
  }
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultSøker.barn[0].annenForelder,
      kanIkkeOppgis: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak\`, () => HttpResponse.json(avslåttAnnenPartVedtak))]
    }
  }
}`,...k.parameters?.docs?.source}}};const Q=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn","FarFødtBarnMorHarVedtak","FarFødtBarnMorHarAvslåttVedtak"];export{e as AnnenForelderFraOppgittBarn,k as FarFødtBarnMorHarAvslåttVedtak,f as FarFødtBarnMorHarVedtak,p as FarGiftUfødtBarn,s as FarUfødtBarn,l as ForFar,i as MedmorUfødtBarn,a as MorUfødtBarn,r as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,Q as __namedExportsOrder,J as default};
