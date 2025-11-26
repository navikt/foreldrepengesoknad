import{bu as O,bv as o,l as v}from"./iframe-CzRVsuYv.js";import{M as P,S as T,A as g}from"./useFpNavigator-CZF9Omgb.js";import{F as L,C as c}from"./FpDataContext-CZGYtZHC.js";import{h as F,H as S}from"./index-CQIPvDd7.js";import{a as U,b as I}from"./annenPartVedtak-Dw1uUoYP.js";import{A as u}from"./AnnenForelderSteg-CXTPAQgB.js";import"./preload-helper-D9Z9MdNV.js";import"./RegistrertePersonalia-BRO9hOdq.js";import"./BabyWrapped-BZRbOJjT.js";import"./List-Bzx8xqTN.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,M=()=>()=>(m("button-click")(),Promise.resolve()),n={fnr:"19047815714",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"},kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"M"}]},k={fnr:"1",fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!1},H={title:"steps/AnnenForelderSteg",component:u,decorators:[O],render:({søkersituasjon:B={situasjon:"fødsel",rolle:"mor"},barn:A={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:b,gåTilNesteSide:E=m("button-click"),...j})=>v.jsx(P,{initialEntries:[T.ANNEN_FORELDER],children:v.jsx(L,{onDispatch:E,initialState:{[c.SØKERSITUASJON]:B,[c.OM_BARNET]:A,[c.ANNEN_FORELDER]:b},children:v.jsx(u,{...j})})})},r={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{person:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:M(),avbrytSøknad:m("button-click")}},a={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{person:{...n,barn:[]},arbeidsforhold:[]},annenForelder:void 0}},t={args:{...a.args,søkerInfo:{person:{...n,barn:[{navn:{fornavn:"Ben",etternavn:"Big"},fnr:"1",kjønn:"M",fødselsdato:"2021-03-15",annenPart:{fnr:"999999999",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}}]},arbeidsforhold:[]},annenForelder:{...k,fornavn:"Tom",fnr:"123456789"}}},d={args:{...a.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},e={args:{...a.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:void 0,søkerInfo:{person:{...n,barn:[]},arbeidsforhold:[]}}},l={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{person:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[]},arbeidsforhold:[]}}},f={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[],sivilstand:{type:"GIFT"}},arbeidsforhold:[]}}},p={args:{...r.args,annenForelder:{...k,fornavn:n.navn.fornavn,etternavn:n.navn.etternavn,fnr:n.fnr}},parameters:{msw:{handlers:[F.post(g.annenPartVedtak,()=>S.json(U))]}}},i={args:{...r.args,annenForelder:{...k,fornavn:n.navn.fornavn,etternavn:n.navn.etternavn,fnr:n.fnr}},parameters:{msw:{handlers:[F.post(g.annenPartVedtak,()=>S.json(I))]}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1,
      fnr: ['21091981146']
    },
    søkerInfo: {
      person: defaultSøker,
      arbeidsforhold: []
    },
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    søkerInfo: {
      person: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    },
    annenForelder: undefined
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      person: {
        ...defaultSøker,
        barn: [{
          navn: {
            fornavn: 'Ben',
            etternavn: 'Big'
          },
          fnr: '1',
          kjønn: 'M',
          fødselsdato: '2021-03-15',
          annenPart: {
            fnr: '999999999',
            fødselsdato: '1985-03-12',
            navn: {
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            }
          }
        }] satisfies BarnDto_fpoversikt[]
      },
      arbeidsforhold: []
    },
    annenForelder: {
      ...defaultAnnenForelder,
      fornavn: 'Tom',
      fnr: '123456789'
    }
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
      person: {
        ...defaultSøker,
        navn: {
          fornavn: 'LEALAUS',
          etternavn: 'BÆREPOSE'
        },
        kjønn: 'M',
        barn: [{
          fnr: '21091981146',
          fødselsdato: '2021-03-15',
          annenPart: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            navn: {
              fornavn: 'TALENTFULL',
              etternavn: 'MYGG'
            }
          },
          navn: {
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT'
          },
          kjønn: 'K'
        }]
      },
      arbeidsforhold: []
    },
    annenForelder: undefined
  }
}`,...d.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2023-05-05'
    },
    annenForelder: undefined,
    søkerInfo: {
      person: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...e.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    },
    søkerInfo: {
      person: {
        ...defaultSøker,
        kjønn: 'K',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      person: {
        ...defaultSøker,
        navn: {
          fornavn: 'LEALAUS',
          etternavn: 'BÆREPOSE'
        },
        kjønn: 'M',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...s.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      person: {
        ...defaultSøker,
        navn: {
          fornavn: 'LEALAUS',
          etternavn: 'BÆREPOSE'
        },
        kjønn: 'M',
        barn: [],
        sivilstand: {
          type: 'GIFT'
        }
      },
      arbeidsforhold: []
    }
  }
}`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultAnnenForelder,
      fornavn: defaultSøker.navn.fornavn,
      etternavn: defaultSøker.navn.etternavn,
      fnr: defaultSøker.fnr
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultAnnenForelder,
      fornavn: defaultSøker.navn.fornavn,
      etternavn: defaultSøker.navn.etternavn,
      fnr: defaultSøker.fnr
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(avslåttAnnenPartVedtak))]
    }
  }
}`,...i.parameters?.docs?.source}}};const w=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn","FarFødtBarnMorHarVedtak","FarFødtBarnMorHarAvslåttVedtak"];export{r as AnnenForelderFraOppgittBarn,i as FarFødtBarnMorHarAvslåttVedtak,p as FarFødtBarnMorHarVedtak,f as FarGiftUfødtBarn,s as FarUfødtBarn,d as ForFar,l as MedmorUfødtBarn,e as MorUfødtBarn,a as SkalOppgiPersonalia,t as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,w as __namedExportsOrder,H as default};
