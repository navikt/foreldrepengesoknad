import{bz as X,bp as e,_ as k}from"./iframe-ClSqJt5_.js";import{F as Z,C as m}from"./FpDataContext-SvkGaKab.js";import{M as nn,S as rn}from"./useFpNavigator-vGkufEEK.js";import{h as en,H as an}from"./index-DT-3yxyD.js";import{O as g,a as sn}from"./OmBarnetSteg-C9sTHIss.js";import"./api-B3hYRVNJ.js";import"./queries-BwMqeCOu.js";import"./annenForelderUtils-C2TyKNHh.js";import"./eksisterendeSakUtils-CxROGpQG.js";import"./guid-CsArkN6i.js";import"./RegistrertePersonalia-ByvYXIC8.js";import"./BabyWrapped-Dqmyw3S_.js";const{action:$}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>($("button-click")(),Promise.resolve()),r={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},jn={title:"steps/OmBarnetSteg",component:g,decorators:[X],render:({søkersituasjon:z={situasjon:"fødsel",rolle:"mor"},barn:J,gåTilNesteSide:Q=$("button-click"),annenForelder:q={kanIkkeOppgis:!0},...W})=>k.jsx(nn,{initialEntries:[rn.OM_BARNET],children:k.jsx(Z,{onDispatch:Q,initialState:{[m.SØKERSITUASJON]:z,[m.OM_BARNET]:J,[m.ANNEN_FORELDER]:q},children:k.jsx(g,{...W})})})},n={args:{søkerInfo:r,søknadGjelderNyttBarn:!0,mellomlagreSøknadOgNaviger:u(),avbrytSøknad:u(),barn:void 0}},a={args:{...n.args,søkerInfo:{...r,søker:{...r.søker,kjønn:"M"}},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},s={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"}}},o={args:{...n.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}},t={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},d={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:["2022-08-02","2022-08-02"],type:e.FØDT}}},l={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},f={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}]}}},i={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{...r,søker:{...r.søker,barn:[]}}}},p={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:["19522278338"],fødselsdatoer:["2022-08-17"],type:e.FØDT},annenForelder:{fnr:"27438445248",fornavn:"Eline",etternavn:"Ilder",kanIkkeOppgis:!1},søkerInfo:{...r,søker:{...r.søker,barn:[{fnr:"19522278338",fornavn:"Ole",etternavn:"Duck",kjønn:"M",fødselsdato:"2022-08-17",annenForelder:{fnr:"27438445248",fornavn:"Eline",etternavn:"Ilder",fødselsdato:"1993-06-13"}}]}}},parameters:{msw:{handlers:[en.post(".//rest/innsyn/v2/annenPartVedtak",()=>an.json(sn))]}}};var c,v,j;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    søknadGjelderNyttBarn: true,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    barn: undefined
  }
}`,...(j=(v=n.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var S,F,B;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkerInfo: {
      ...defaultSøkerinfo,
      søker: {
        ...defaultSøkerinfo.søker,
        kjønn: 'M'
      }
    },
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    }
  }
}`,...(B=(F=a.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var T,E,M;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    }
  }
}`,...(M=(E=s.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var b,I,y;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(y=(I=o.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};var A,N,L;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barn: {
      antallBarn: 1,
      fnr: ['21091981146'],
      fødselsdatoer: ['2021-03-15'],
      type: BarnType.FØDT
    }
  }
}`,...(L=(N=t.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var R,D,O;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barn: {
      antallBarn: 2,
      fnr: ['31091981146', '31091981147'],
      fødselsdatoer: ['2022-08-02', '2022-08-02'],
      type: BarnType.FØDT
    }
  }
}`,...(O=(D=d.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var K,U,P;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barn: {
      antallBarn: 1,
      fnr: ['21091981146'],
      fødselsdatoer: ['2021-03-15'],
      type: BarnType.FØDT
    }
  }
}`,...(P=(U=l.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var G,_,h;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barn: {
      antallBarn: 3,
      fnr: ['21091981146', '31091981147', '31091981148'],
      fødselsdatoer: ['2023-01-02'],
      type: BarnType.FØDT
    },
    søkerInfo: {
      søker: {
        fnr: '21430354032',
        fornavn: 'Hes',
        etternavn: 'Mandagsbil',
        kjønn: 'K',
        fødselsdato: '2003-03-21',
        bankkonto: {
          kontonummer: '',
          banknavn: ''
        },
        barn: [{
          fnr: '21091981146',
          fødselsdato: '2023-03-01',
          annenForelder: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          },
          fornavn: 'KLØKTIG',
          etternavn: 'MIDTPUNKT',
          kjønn: 'M'
        }, {
          fnr: '31091981147',
          fødselsdato: '2023-03-02',
          annenForelder: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          },
          fornavn: 'SNILT',
          etternavn: 'MIDTPUNKT',
          kjønn: 'M'
        }, {
          fnr: '31091981148',
          fødselsdato: '2023-03-01',
          dødsdato: '2023-03-02',
          annenForelder: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          },
          fornavn: 'LYST',
          etternavn: 'MIDTPUNKT',
          kjønn: 'M'
        }]
      },
      arbeidsforhold: [{
        arbeidsgiverId: '896929119',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'SAUEFABRIKK',
        stillingsprosent: 100.0,
        fom: '2017-03-24'
      }, {
        arbeidsgiverId: '896929119',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'SAUEFABRIKK',
        stillingsprosent: 100.0,
        fom: '2017-03-24'
      }]
    }
  }
}`,...(h=(_=f.parameters)==null?void 0:_.docs)==null?void 0:h.source}}};var x,H,V;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barn: {
      antallBarn: 1,
      fnr: undefined,
      fødselsdatoer: ['2023-01-02'],
      type: BarnType.FØDT
    },
    søkerInfo: {
      ...defaultSøkerinfo,
      søker: {
        ...defaultSøkerinfo.søker,
        barn: []
      }
    }
  }
}`,...(V=(H=i.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};var C,Y,w;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søknadGjelderNyttBarn: false,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barn: {
      antallBarn: 1,
      fnr: ['19522278338'],
      fødselsdatoer: ['2022-08-17'],
      type: BarnType.FØDT
    },
    annenForelder: {
      fnr: '27438445248',
      fornavn: 'Eline',
      etternavn: 'Ilder',
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfo,
      søker: {
        ...defaultSøkerinfo.søker,
        barn: [{
          fnr: '19522278338',
          fornavn: 'Ole',
          etternavn: 'Duck',
          kjønn: 'M',
          fødselsdato: '2022-08-17',
          annenForelder: {
            fnr: '27438445248',
            fornavn: 'Eline',
            etternavn: 'Ilder',
            fødselsdato: '1993-06-13'
          }
        }]
      }
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak\`, () => HttpResponse.json(annenPartVedtak))]
    }
  }
}`,...(w=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:w.source}}};const Sn=["MorFødsel","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt","FarFødselMorHarVedtak"];export{a as FarFødsel,p as FarFødselMorHarVedtak,o as ForAdopsjon,s as MedmorFødsel,n as MorFødsel,l as RegistrertBarnAdopsjonMor,t as RegistrertBarnFødselFar,d as RegistrertBarnFødselMor,f as RegistrertBarnTrillingerDerEnErDød,i as SøknadPåUregistrertBarnSomErFødt,Sn as __namedExportsOrder,jn as default};
