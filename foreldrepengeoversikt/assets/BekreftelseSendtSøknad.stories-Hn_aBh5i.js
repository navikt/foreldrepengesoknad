import{j as o,i as W}from"./iframe-BWs6YiSD.js";import{h as r,H as t}from"./index-KPA9rKLR.js";import{s as u}from"./saker-DRaJfyN-.js";import{s as X,a as q}from"./sokerinfo-lX5q8qt6.js";import{S as s}from"./skjemanummer-Bkp7YBg1.js";import{O as E}from"./routes-C7yRzVAD.js";import{B as S}from"./BekreftelseSendtSøknad-DfdraupN.js";import{M as Y,R as Z,a as ee}from"./chunk-NL6KNZEE-CuQejqUr.js";import"./RettighetType-BD_oerVS.js";import"./useQuery-C7AIrGlu.js";import"./api-DtDQGiqu.js";import"./useSelectedSak-CKXYGI5S.js";import"./sakerUtils-CH7c72yn.js";import"./dokumenterUtils-DrWjTrzt.js";import"./KontonummerInfo-B-J8mOLx.js";const ne={msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(X)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}},Te={title:"BekreftelseSendtSøknad",component:S,decorators:[W],parameters:ne,render:({saksnummer:z,...J})=>o.jsx(Y,{initialEntries:[`/${E.DIN_PLAN}/${z}`],children:o.jsx(Z,{children:o.jsx(ee,{element:o.jsx(S,{...J}),path:`/${E.DIN_PLAN}/:saksnummer`})})})},e={args:{saksnummer:"352011079",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},d={args:{...e.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(q)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}}},l={args:{...e.args,manglendeVedlegg:[s.HV_ØVELSE,s.NAV_TILTAK]}},i={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},a={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"ENGANGSSTØNAD",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},m={args:{...a.args,manglendeVedlegg:[s.DEPRECATED_TERMINBEKREFTELSE,s.NAV_TILTAK]}},n={args:{saksnummer:"308",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},p={args:{...n.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(q)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}}},g={args:{saksnummer:"308",relevantNyTidslinjehendelse:{aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},k={args:{...n.args,manglendeVedlegg:[s.DOK_UTDANNING_MOR,s.TERMINBEKREFTELSE]}};var T,N,c;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    saksnummer: '352011079',
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...(c=(N=e.parameters)==null?void 0:N.docs)==null?void 0:c.source}}};var R,h,j;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  }
}`,...(j=(h=d.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var I,b,f;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...(f=(b=l.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var A,y,D;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'FORELDREPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...(D=(y=i.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var F,v,L;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'ENGANGSSTØNAD',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...(L=(v=a.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var M,K,G;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...(G=(K=m.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var V,H,B;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    saksnummer: '308',
    relevantNyTidslinjehendelse: {
      opprettet: new Date().toISOString(),
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...(B=(H=n.parameters)==null?void 0:H.docs)==null?void 0:B.source}}};var U,_,O;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  }
}`,...(O=(_=p.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var w,P,$;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    saksnummer: '308',
    relevantNyTidslinjehendelse: {
      aktørType: 'BRUKER',
      tidslinjeHendelseType: 'INNTEKTSMELDING',
      opprettet: new Date().toISOString(),
      dokumenter: [{
        dokumentId: '1',
        journalpostId: '1',
        tittel: 'Søknad'
      }]
    } satisfies TidslinjeHendelseDto,
    bankkonto: {
      kontonummer: '1212224',
      banknavn: 'Luster Sparebank'
    },
    ytelse: 'SVANGERSKAPSPENGER',
    harMinstEttArbeidsforhold: true,
    manglendeVedlegg: []
  }
}`,...($=(P=g.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};var x,C,Q;k.parameters={...k.parameters,docs:{...(x=k.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE]
  }
}`,...(Q=(C=k.parameters)==null?void 0:C.docs)==null?void 0:Q.source}}};const Ne=["ForForeldrepenger","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{a as ForEngangsstønad,m as ForEngangsstønadManglerDokumentasjon,e as ForForeldrepenger,l as ForForeldrepengerManglerDokumentasjon,d as ForForeldrepengerNårEnIkkeHarArbeidsforhold,i as ForForeldrepengerUtenTidligsteBehandlingsdato,n as ForSvangerskapspenger,k as ForSvangerskapspengerManglerDokumentasjon,p as ForSvangerskapspengerUtenArbeidsforhold,g as ForSvangerskapspengerUtenTidligsteBehandlingsdato,Ne as __namedExportsOrder,Te as default};
