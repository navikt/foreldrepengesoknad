import{j as w}from"./jsx-runtime-69eee039.js";import{w as Gr,F as Dr}from"./ForeldrepengerStateMock-c0a24792.js";import{w as Lr}from"./withRouter-a172066d.js";import{V as mr}from"./Velkommen-136d37aa.js";import"./Tidsperioden-bc4aa89e.js";import{D as Tr,R as Br}from"./eksisterendeSakUtils-9faa4d73.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSøknad-26978d9c.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-1caa3e37.js";import"./api-32ec0d49.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-3b298622.js";import"./Periodene-3e3b4ab3.js";import"./velkommenUtils-67ca2dfd.js";import"./Link-b834ea2b.js";import"./dateUtils-9225f718.js";import"./DinePlikter-1887aa82.js";import"./message-0de53699.js";import"./DinePersonopplysningerModal-652f60cc.js";import"./useSøkerinfo-417aa154.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";import"./leggTilPeriode-197d6712.js";var I=(r=>(r.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",r.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",r.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",r.UNDER_BEHANDLING="UNDER_BEHANDLING",r))(I||{});const Fn={title:"pages/Velkommen",component:mr,decorators:[Gr,Lr]},t={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:r,saker:x,søkerinfo:U})=>w.jsx(Dr,{søknad:{søknad:{harGodkjentVilkår:r,søker:{språkkode:"nb"}}},søkerinfo:U,children:w.jsx(mr,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:x,fnr:"123"})}),Sr=(r,x)=>{const U=x.map(br=>({fnr:br}));return{...r,barn:U}},o=r=>({dekningsgrad:Tr.HUNDRE_PROSENT,familiehendelse:{fødselsdato:r.fødselsdato,omsorgsovertakelse:r.omsorgsovertakelse,antallBarn:r.antallBarn,termindato:r.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:r.gjelderAdopsjon,kanSøkeOmEndring:r.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Br.BEGGE_RETT,sakAvsluttet:r.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:r.åpenbehandlingTilstand!==void 0?{tilstand:r.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),n=r=>({...t,søker:{...t.søker,barn:r}}),a="2022-12-06",Hr="2022-12-08",O={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},ur={...O,dødsdato:"2022-12-07"},Er={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},vr={...Er,dødsdato:"2022-12-07"},A={fødselsdato:a,dødsdato:a},Fr=!1,s={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},P={...s,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Cr={...s,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},_=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Fr,fødselsdato:a}),hr=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Fr,termindato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),Ar=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Hr,fødselsdato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),Or=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Ir=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),R=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),N=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),Nr=Sr(N,["1","2"]),xr=Sr(N,["1"]),Mr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Ur=[_,{...hr,saksnummer:"555555"}],jr=[],k=e.bind({});k.args={harGodkjentVilkår:!1,saker:jr,søkerinfo:t};const d=e.bind({});d.args={harGodkjentVilkår:!0,saker:jr,søkerinfo:t};const l=e.bind({});l.args={saker:[_],søkerinfo:n([s])};const i=e.bind({});i.args={saker:[hr],søkerinfo:t};const c=e.bind({});c.args={saker:[Ar],søkerinfo:n([s])};const p=e.bind({});p.args={saker:[Or],søkerinfo:n([s])};const g=e.bind({});g.args={saker:Ur,søkerinfo:n([s])};const f=e.bind({});f.args={saker:[Ir],søkerinfo:t};const m=e.bind({});m.args={saker:[R],søkerinfo:t};const S=e.bind({});S.args={saker:[R],søkerinfo:n([s])};const u=e.bind({});u.args={saker:[N],søkerinfo:n([s,P])};const E=e.bind({});E.args={saker:[Mr],søkerinfo:n([s,P,Cr])};const Pr=n([O]),Vr=n([O,Er]),K=n([ur]),_r=n([ur,vr]),Rr=n([A]),Kr=n([A,A]),y=n([O,A]),yr=n([O,vr]),v=e.bind({});v.args={saker:[],søkerinfo:Pr};const F=e.bind({});F.args={saker:[],søkerinfo:Vr};const h=e.bind({});h.args={saker:[],søkerinfo:K};const M=e.bind({});M.args={saker:[],søkerinfo:_r};const j=e.bind({});j.args={saker:[],søkerinfo:Rr};const V=e.bind({});V.args={saker:[],søkerinfo:Kr};const b=e.bind({});b.args={saker:[],søkerinfo:y};const G=e.bind({});G.args={saker:[],søkerinfo:yr};const D=e.bind({});D.args={saker:[N],søkerinfo:y};const L=e.bind({});L.args={saker:[_],søkerinfo:K};const T=e.bind({});T.args={saker:[R],søkerinfo:K};const B=e.bind({});B.args={saker:[Nr],søkerinfo:Vr};const H=e.bind({});H.args={saker:[xr],søkerinfo:y};const C=e.bind({});C.args={saker:[Mr],søkerinfo:n([s,P,A])};var J,Y,q;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(q=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var z,Q,W;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(W=(Q=d.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;l.parameters={...l.parameters,docs:{...(X=l.parameters)==null?void 0:X.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...($=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ne;i.parameters={...i.parameters,docs:{...(ee=i.parameters)==null?void 0:ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ne=(re=i.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ae,se,oe;c.parameters={...c.parameters,docs:{...(ae=c.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(oe=(se=c.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var te,ke,de;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(de=(ke=p.parameters)==null?void 0:ke.docs)==null?void 0:de.source}}};var le,ie,ce;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ce=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var pe,ge,fe;f.parameters={...f.parameters,docs:{...(pe=f.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(fe=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var me,Se,ue;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ue=(Se=m.parameters)==null?void 0:Se.docs)==null?void 0:ue.source}}};var Ee,ve,Fe;S.parameters={...S.parameters,docs:{...(Ee=S.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Fe=(ve=S.parameters)==null?void 0:ve.docs)==null?void 0:Fe.source}}};var he,Me,je;u.parameters={...u.parameters,docs:{...(he=u.parameters)==null?void 0:he.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(je=(Me=u.parameters)==null?void 0:Me.docs)==null?void 0:je.source}}};var Ve,be,Ge;E.parameters={...E.parameters,docs:{...(Ve=E.parameters)==null?void 0:Ve.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ge=(be=E.parameters)==null?void 0:be.docs)==null?void 0:Ge.source}}};var De,Le,Te;v.parameters={...v.parameters,docs:{...(De=v.parameters)==null?void 0:De.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Te=(Le=v.parameters)==null?void 0:Le.docs)==null?void 0:Te.source}}};var Be,He,Ce;F.parameters={...F.parameters,docs:{...(Be=F.parameters)==null?void 0:Be.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ce=(He=F.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Ae,Oe,Ie;h.parameters={...h.parameters,docs:{...(Ae=h.parameters)==null?void 0:Ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ie=(Oe=h.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var Ne,xe,Ue;M.parameters={...M.parameters,docs:{...(Ne=M.parameters)==null?void 0:Ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ue=(xe=M.parameters)==null?void 0:xe.docs)==null?void 0:Ue.source}}};var Pe,_e,Re;j.parameters={...j.parameters,docs:{...(Pe=j.parameters)==null?void 0:Pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Re=(_e=j.parameters)==null?void 0:_e.docs)==null?void 0:Re.source}}};var Ke,ye,we;V.parameters={...V.parameters,docs:{...(Ke=V.parameters)==null?void 0:Ke.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(we=(ye=V.parameters)==null?void 0:ye.docs)==null?void 0:we.source}}};var Je,Ye,qe;b.parameters={...b.parameters,docs:{...(Je=b.parameters)==null?void 0:Je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(qe=(Ye=b.parameters)==null?void 0:Ye.docs)==null?void 0:qe.source}}};var ze,Qe,We;G.parameters={...G.parameters,docs:{...(ze=G.parameters)==null?void 0:ze.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(We=(Qe=G.parameters)==null?void 0:Qe.docs)==null?void 0:We.source}}};var Xe,Ze,$e;D.parameters={...D.parameters,docs:{...(Xe=D.parameters)==null?void 0:Xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...($e=(Ze=D.parameters)==null?void 0:Ze.docs)==null?void 0:$e.source}}};var er,rr,nr;L.parameters={...L.parameters,docs:{...(er=L.parameters)==null?void 0:er.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(nr=(rr=L.parameters)==null?void 0:rr.docs)==null?void 0:nr.source}}};var ar,sr,or;T.parameters={...T.parameters,docs:{...(ar=T.parameters)==null?void 0:ar.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(or=(sr=T.parameters)==null?void 0:sr.docs)==null?void 0:or.source}}};var tr,kr,dr;B.parameters={...B.parameters,docs:{...(tr=B.parameters)==null?void 0:tr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(dr=(kr=B.parameters)==null?void 0:kr.docs)==null?void 0:dr.source}}};var lr,ir,cr;H.parameters={...H.parameters,docs:{...(lr=H.parameters)==null?void 0:lr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(cr=(ir=H.parameters)==null?void 0:ir.docs)==null?void 0:cr.source}}};var pr,gr,fr;C.parameters={...C.parameters,docs:{...(pr=C.parameters)==null?void 0:pr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(fr=(gr=C.parameters)==null?void 0:gr.docs)==null?void 0:fr.source}}};const hn=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{k as Default,d as HarAlleredeLestOgForstått,p as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,i as HarFPSakUnderBehandlingTermin,g as HarFlereSaker,G as HarIngenSakerMedEnLevendeOgEnDødTvilling,b as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,j as HarIngenSakerOgEtDødfødtBarn,v as HarIngenSakerOgEttBarn,h as HarIngenSakerOgEttDødtBarn,M as HarIngenSakerOgToDødeTvillinger,V as HarIngenSakerOgToDødfødteBarn,F as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,T as HarSakAdopsjonMedEtDødtBarn,m as HarSakAdopsjonUtenBarnIPDL,E as HarSakFødselTrillinger,u as HarSakFødselTvillinger,f as HarSakFødselUtenBarnIPDL,D as HarSakMedEnLevendeOgEnDødfødtTvilling,L as HarSakMedEtDødtBarn,H as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,B as HarSakMedOppgittBarnTvillingerAlleLever,C as HarSakMedTrillingerEnErDød,hn as __namedExportsOrder,Fn as default};
//# sourceMappingURL=Velkommen.stories-d4d14d01.js.map