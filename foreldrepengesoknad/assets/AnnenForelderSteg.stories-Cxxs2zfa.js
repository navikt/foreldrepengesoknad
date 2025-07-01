import{bp as an,bq as o,_ as m}from"./iframe-DqUTJYq8.js";import{F as sn,C as c}from"./FpDataContext-DWl9nV1x.js";import{M as on,S as tn}from"./useFpNavigator-Dz_KNZO0.js";import{h as z,H as W}from"./index-BtQIspsG.js";import{a as dn}from"./annenPartVedtak-B2EF3kIR.js";import{S as ln}from"./sivilstandType-DxfjzFEG.js";import{A as u}from"./AnnenForelderSteg-DSjtjgWG.js";import"./api-DlsyE1_F.js";import"./queries-DGkvPQdN.js";import"./annenForelderUtils-CLCUnmuV.js";import"./eksisterendeSakUtils-C-PKXlHw.js";import"./guid-CsArkN6i.js";import"./RegistrertePersonalia-CVZ4h-Y7.js";import"./BabyWrapped-COGIdLRm.js";import"./List-BUTmRkvA.js";const pn="2022-08-17",fn=[{fom:"2022-12-12",tom:"2023-02-17",kontoType:"FEDREKVOTE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},samtidigUttak:100,flerbarnsdager:!1}],kn="HUNDRE",mn={termindato:pn,perioder:fn,dekningsgrad:kn},{action:g}=__STORYBOOK_MODULE_ACTIONS__,cn=()=>()=>(g("button-click")(),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},Pn={title:"steps/AnnenForelderSteg",component:u,decorators:[an],render:({søkersituasjon:X={situasjon:"fødsel",rolle:"mor"},barn:Z={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:nn,gåTilNesteSide:rn=g("button-click"),...en})=>m.jsx(on,{initialEntries:[tn.ANNEN_FORELDER],children:m.jsx(sn,{onDispatch:rn,initialState:{[c.SØKERSITUASJON]:X,[c.OM_BARNET]:Z,[c.ANNEN_FORELDER]:nn},children:m.jsx(u,{...en})})})},e={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:cn(),avbrytSøknad:g("button-click")}},r={args:{...e.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},d={args:{...r.args,søkerInfo:{søker:{...n,barn:[{fornavn:"Ben",fnr:"1",etternavn:"Big",kjønn:"M",fødselsdato:"2021-03-15",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},l={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},a={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]}}},i={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{søker:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]},arbeidsforhold:[]}}},p={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:ln.GIFT}},arbeidsforhold:[]}}},f={args:{...e.args,annenForelder:{...n.barn[0].annenForelder,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[z.post(".//rest/innsyn/v2/annenPartVedtak",()=>W.json(dn))]}}},k={args:{...e.args,annenForelder:{...n.barn[0].annenForelder,kanIkkeOppgis:!1}},parameters:{msw:{handlers:[z.post(".//rest/innsyn/v2/annenPartVedtak",()=>W.json(mn))]}}};var F,S,v;e.parameters={...e.parameters,docs:{...(F=e.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(v=(S=e.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var b,B,E;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(E=(B=r.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var O,A,T;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(T=(A=t.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var I,j,U;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(U=(j=d.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var L,P,M;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(M=(P=l.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var h,y,R;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(R=(y=a.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var N,D,K;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(K=(D=i.parameters)==null?void 0:D.docs)==null?void 0:K.source}}};var _,G,V;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(V=(G=s.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var x,H,w;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(w=(H=p.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};var C,Y,$;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...($=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:$.source}}};var q,J,Q;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(Q=(J=k.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const Mn=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn","FarFødtBarnMorHarVedtak","FarFødtBarnMorHarAvslåttVedtak"];export{e as AnnenForelderFraOppgittBarn,k as FarFødtBarnMorHarAvslåttVedtak,f as FarFødtBarnMorHarVedtak,p as FarGiftUfødtBarn,s as FarUfødtBarn,l as ForFar,i as MedmorUfødtBarn,a as MorUfødtBarn,r as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,Mn as __namedExportsOrder,Pn as default};
