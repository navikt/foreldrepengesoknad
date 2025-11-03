import{bp as E,bq as o,l as c}from"./iframe-B4WE4l2S.js";import{h as v,A as S,f as F}from"./index-CK92jtoJ.js";import{F as I,C as m}from"./FpDataContext-hlHQefgQ.js";import{M as T,S as j}from"./useFpNavigator-CdIHd26a.js";import{a as L,b as U}from"./annenPartVedtak-Dw1uUoYP.js";import{S as M}from"./sivilstandType-DxfjzFEG.js";import{A as u}from"./AnnenForelderSteg-t3F4gfMV.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-CiZcqz2o.js";import"./eksisterendeSakUtils-B4cOy8ba.js";import"./RegistrertePersonalia-7QJhObBC.js";import"./BabyWrapped-rM9oGfqF.js";import"./List-DGDZBOjD.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,h=()=>()=>(g("button-click")(),Promise.resolve()),n={fnr:"19047815714",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"},kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"M"}]},q={title:"steps/AnnenForelderSteg",component:u,decorators:[E],render:({søkersituasjon:b={situasjon:"fødsel",rolle:"mor"},barn:B={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:O,gåTilNesteSide:A=g("button-click"),...P})=>c.jsx(T,{initialEntries:[j.ANNEN_FORELDER],children:c.jsx(I,{onDispatch:A,initialState:{[m.SØKERSITUASJON]:b,[m.OM_BARNET]:B,[m.ANNEN_FORELDER]:O},children:c.jsx(u,{...P})})})},a={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{person:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:h(),avbrytSøknad:g("button-click")}},r={args:{...a.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{person:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{person:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},d={args:{...r.args,søkerInfo:{person:{...n,barn:[{navn:{fornavn:"Ben",etternavn:"Big"},fnr:"1",kjønn:"M",fødselsdato:"2021-03-15",annenPart:{fnr:"999999999",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},l={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},e={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{person:{...n,barn:[]},arbeidsforhold:[]}}},p={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{person:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[]},arbeidsforhold:[]}}},f={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{person:{...n,navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"},kjønn:"M",barn:[],sivilstand:{type:M.GIFT}},arbeidsforhold:[]}}},i={args:{...a.args,annenForelder:{...n.barn[0].annenPart,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[v.post(S.annenPartVedtak,()=>F.json(L))]}}},k={args:{...a.args,annenForelder:{...n.barn[0].annenPart,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[v.post(S.annenPartVedtak,()=>F.json(U))]}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
    annenForelder: {
      kanIkkeOppgis: false
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      person: {
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
}`,...l.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      person: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...e.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
          type: SivilstandType.GIFT
        }
      },
      arbeidsforhold: []
    }
  }
}`,...f.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultSøker.barn[0].annenPart,
      kanIkkeOppgis: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  }
}`,...i.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    annenForelder: {
      ...defaultSøker.barn[0].annenPart,
      kanIkkeOppgis: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(avslåttAnnenPartVedtak))]
    }
  }
}`,...k.parameters?.docs?.source}}};const J=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn","FarFødtBarnMorHarVedtak","FarFødtBarnMorHarAvslåttVedtak"];export{a as AnnenForelderFraOppgittBarn,k as FarFødtBarnMorHarAvslåttVedtak,i as FarFødtBarnMorHarVedtak,f as FarGiftUfødtBarn,s as FarUfødtBarn,l as ForFar,p as MedmorUfødtBarn,e as MorUfødtBarn,r as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,J as __namedExportsOrder,q as default};
