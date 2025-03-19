import{j as k}from"./jsx-runtime-CLpGMVip.js";import{a as c}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{F as H,C as m}from"./FpDataContext-DWIUkGg8.js";import{M as Q,S as V}from"./useFpNavigator-CrVLYhlk.js";import{B as o}from"./Uttaksplan-DwDBGZRj.js";import{S as W}from"./sivilstandType-DxfjzFEG.js";import"./dates-AkG-ZPn6.js";import{A as g}from"./AnnenForelderSteg-DrBx-VeH.js";import"./v4-CtRu48qb.js";import"./index-DI2V0i71.js";import"./Link-BKbcfhYA.js";import"./iframe-BlLIEc3x.js";import"./VStack-0uPSX4Ae.js";import"./index-Go8-pri6.js";import"./index-DNwIpxWs.js";import"./ErrorSummaryHookForm-DgHLVtF_.js";import"./barnUtils-fGEJoYVf.js";import"./RegistrertePersonalia-D6WOF0_s.js";import"./BabyWrapped-CIjOwvVy.js";const X=()=>(...p)=>(c("button-click")(...p),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},Fn={title:"steps/AnnenForelderSteg",component:g,render:({søkersituasjon:p={situasjon:"fødsel",rolle:"mor"},barn:J={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:q,gåTilNesteSide:w=c("button-click"),...z})=>k.jsx(Q,{initialEntries:[V.ANNEN_FORELDER],children:k.jsx(H,{onDispatch:w,initialState:{[m.SØKERSITUASJON]:p,[m.OM_BARNET]:J,[m.ANNEN_FORELDER]:q},children:k.jsx(g,{...z})})})},a={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:X(),avbrytSøknad:c("button-click")}},r={args:{...a.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},l={args:{...r.args,søkerInfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},d={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},e={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]}}},f={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{søker:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]},arbeidsforhold:[]}}},i={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:W.GIFT}},arbeidsforhold:[]}}};var u,S,F;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(F=(S=a.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var b,v,B;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(B=(v=r.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var E,O,T;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(T=(O=t.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,I,j;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: [{
          fornavn: 'Ben',
          annenForelder: {
            fnr: '999999999',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          }
        }] as SøkerBarn[]
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'Tom',
      fnr: '123456789',
      kanIkkeOppgis: false
    }
  }
}`,...(j=(I=l.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var L,U,P;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(P=(U=d.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var M,y,h;e.parameters={...e.parameters,docs:{...(M=e.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(h=(y=e.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var N,R,D;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(D=(R=f.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var K,G,x;s.parameters={...s.parameters,docs:{...(K=s.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(x=(G=s.parameters)==null?void 0:G.docs)==null?void 0:x.source}}};var _,C,Y;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(Y=(C=i.parameters)==null?void 0:C.docs)==null?void 0:Y.source}}};const bn=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{a as AnnenForelderFraOppgittBarn,i as FarGiftUfødtBarn,s as FarUfødtBarn,d as ForFar,f as MedmorUfødtBarn,e as MorUfødtBarn,r as SkalOppgiPersonalia,l as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,bn as __namedExportsOrder,Fn as default};
