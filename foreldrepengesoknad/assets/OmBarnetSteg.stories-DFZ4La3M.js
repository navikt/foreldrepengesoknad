import{bw as X,bm as e,_ as m}from"./iframe-Gxd28MnS.js";import{F as Z,C as g}from"./FpDataContext-CGyNGwkW.js";import{M as nn,S as rn}from"./useFpNavigator-B8aNkvCK.js";import{h as en,H as an}from"./index-CPnfIhCi.js";import{O as u,a as sn}from"./OmBarnetSteg-BZ_yrAMy.js";import"./api-C7lcQsXu.js";import"./queries-dR9rj-bH.js";import"./annenForelderUtils-CbZSaEzy.js";import"./eksisterendeSakUtils-qCImuu5o.js";import"./guid-CsArkN6i.js";import"./RegistrertePersonalia-BSfkSQTC.js";import"./BabyWrapped-BSfRzz_m.js";const{action:J}=__STORYBOOK_MODULE_ACTIONS__,c=()=>(...p)=>(J("button-click")(...p),Promise.resolve()),r={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},jn={title:"steps/OmBarnetSteg",component:u,decorators:[X],render:({søkersituasjon:p={situasjon:"fødsel",rolle:"mor"},barn:Q,gåTilNesteSide:q=J("button-click"),annenForelder:z={kanIkkeOppgis:!0},...W})=>m.jsx(nn,{initialEntries:[rn.OM_BARNET],children:m.jsx(Z,{onDispatch:q,initialState:{[g.SØKERSITUASJON]:p,[g.OM_BARNET]:Q,[g.ANNEN_FORELDER]:z},children:m.jsx(u,{...W})})})},n={args:{søkerInfo:r,søknadGjelderNyttBarn:!0,mellomlagreSøknadOgNaviger:c(),avbrytSøknad:c(),barn:void 0}},a={args:{...n.args,søkerInfo:{...r,søker:{...r.søker,kjønn:"M"}},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},s={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"}}},o={args:{...n.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}},t={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},d={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:["2022-08-02","2022-08-02"],type:e.FØDT}}},l={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},f={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}]}}},i={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{...r,søker:{...r.søker,barn:[]}}}},k={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:["19522278338"],fødselsdatoer:["2022-08-17"],type:e.FØDT},annenForelder:{fnr:"27438445248",fornavn:"Eline",etternavn:"Ilder",kanIkkeOppgis:!1},søkerInfo:{...r,søker:{...r.søker,barn:[{fnr:"19522278338",fornavn:"Ole",etternavn:"Duck",kjønn:"M",fødselsdato:"2022-08-17",annenForelder:{fnr:"27438445248",fornavn:"Eline",etternavn:"Ilder",fødselsdato:"1993-06-13"}}]}}},parameters:{msw:{handlers:[en.post(".//rest/innsyn/v2/annenPartVedtak",()=>an.json(sn))]}}};var v,j,S;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    søknadGjelderNyttBarn: true,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    barn: undefined
  }
}`,...(S=(j=n.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var F,B,T;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(T=(B=a.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var E,M,b;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    }
  }
}`,...(b=(M=s.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var I,y,A;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(A=(y=o.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var N,L,R;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(R=(L=t.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var D,O,K;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(K=(O=d.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var U,P,G;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(G=(P=l.parameters)==null?void 0:P.docs)==null?void 0:G.source}}};var _,h,x;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(x=(h=f.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var H,V,C;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(C=(V=i.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var Y,w,$;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...($=(w=k.parameters)==null?void 0:w.docs)==null?void 0:$.source}}};const Sn=["MorFødsel","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt","FarFødselMorHarVedtak"];export{a as FarFødsel,k as FarFødselMorHarVedtak,o as ForAdopsjon,s as MedmorFødsel,n as MorFødsel,l as RegistrertBarnAdopsjonMor,t as RegistrertBarnFødselFar,d as RegistrertBarnFødselMor,f as RegistrertBarnTrillingerDerEnErDød,i as SøknadPåUregistrertBarnSomErFødt,Sn as __namedExportsOrder,jn as default};
