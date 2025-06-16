import{bm as e,_ as p}from"./iframe-DyGDXKke.js";import{F as z,C as g}from"./FpDataContext-BLxUEGTa.js";import{M as Q,S as V}from"./useFpNavigator-DdVPwYFi.js";import{O as k}from"./OmBarnetSteg-BSEvSpUl.js";import"./barnUtils-BLmUZmf-.js";import"./RegistrertePersonalia-Bz_sTXfw.js";import"./BabyWrapped-DUng2kyp.js";const{action:H}=__STORYBOOK_MODULE_ACTIONS__,c=()=>(...m)=>(H("button-click")(...m),Promise.resolve()),r={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},sn={title:"steps/OmBarnetSteg",component:k,render:({søkersituasjon:m={situasjon:"fødsel",rolle:"mor"},barn:J,gåTilNesteSide:q=H("button-click"),...w})=>p.jsx(Q,{initialEntries:[V.OM_BARNET],children:p.jsx(z,{onDispatch:q,initialState:{[g.SØKERSITUASJON]:m,[g.OM_BARNET]:J},children:p.jsx(k,{...w})})})},n={args:{søkerInfo:r,søknadGjelderNyttBarn:!0,mellomlagreSøknadOgNaviger:c(),avbrytSøknad:c(),barn:void 0}},s={args:{...n.args,søkerInfo:{...r,søker:{...r.søker,kjønn:"M"}},søkersituasjon:{situasjon:"fødsel",rolle:"far"}}},a={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"}}},o={args:{...n.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}},t={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},d={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:["2022-08-02","2022-08-02"],type:e.FØDT}}},l={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:e.FØDT}}},f={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}]}}},i={args:{...n.args,søknadGjelderNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:["2023-01-02"],type:e.FØDT},søkerInfo:{...r,søker:{...r.søker,barn:[]}}}};var u,j,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    søknadGjelderNyttBarn: true,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    barn: undefined
  }
}`,...(v=(j=n.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var S,T,B;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(B=(T=s.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var F,E,M;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    }
  }
}`,...(M=(E=a.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var b,A,I;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...MorFødsel.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(I=(A=o.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var y,N,L;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(L=(N=t.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var K,R,D;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(D=(R=d.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var U,O,P;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(P=(O=l.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var G,_,x;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(x=(_=f.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var h,Y,C;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(C=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:C.source}}};const an=["MorFødsel","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{s as FarFødsel,o as ForAdopsjon,a as MedmorFødsel,n as MorFødsel,l as RegistrertBarnAdopsjonMor,t as RegistrertBarnFødselFar,d as RegistrertBarnFødselMor,f as RegistrertBarnTrillingerDerEnErDød,i as SøknadPåUregistrertBarnSomErFødt,an as __namedExportsOrder,sn as default};
