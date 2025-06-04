import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{h as r,H as t}from"./index-D5WPyhm7.js";import{s as u}from"./saker-Km-C6J1_.js";import{s as W,a as q}from"./sokerinfo-CTls8VgB.js";import{S as s}from"./List-whWw6Hq_.js";import"./dates-efjv5HSM.js";import{w as X}from"./withQueryClient-B3ZyOuTZ.js";import{O as E}from"./routes-C7yRzVAD.js";import{B as S}from"./BekreftelseSendtSøknad-Bo3OaYc8.js";import{M as Y,R as Z,a as ee}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./stønadskontoType-l1GAnwlP.js";import"./RettighetType-BD_oerVS.js";import"./index-DQLiH3RP.js";import"./Label-DalfrUzn.js";import"./index-DIIcF78r.js";import"./useQuery-CkpvBZiO.js";import"./index-ClyUrrHr.js";import"./links-CxU1E266.js";import"./UttaksdagenString-DipQCgGo.js";import"./stringUtils-DGs1tyYX.js";import"./api-CwRbU3cx.js";import"./useSelectedSak-Hsh9yDiu.js";import"./sakerUtils-B-XSHxgi.js";import"./_baseIsEqual-NirykxYQ.js";import"./dokumenterUtils-BRVIK3Iv.js";import"./File-Do6CElhQ.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./minMax-iJPfboRp.js";import"./KontonummerInfo-CIesi5MU.js";import"./Accordion-C2gXj9Z6.js";import"./useId-B11Gq5wf.js";import"./ChevronDown-w7HrHItv.js";import"./composeEventHandlers-DeH74NdU.js";import"./VStack-C9FgvL9l.js";import"./Button-D10r1vdM.js";import"./message-DohILNTk.js";const ne={msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(W)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}},Oe={title:"BekreftelseSendtSøknad",component:S,decorators:[X],parameters:ne,render:({saksnummer:z,...J})=>o.jsx(Y,{initialEntries:[`/${E.DIN_PLAN}/${z}`],children:o.jsx(Z,{children:o.jsx(ee,{element:o.jsx(S,{...J}),path:`/${E.DIN_PLAN}/:saksnummer`})})})},e={args:{saksnummer:"352011079",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},d={args:{...e.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(q)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}}},i={args:{...e.args,manglendeVedlegg:[s.HV_ØVELSE,s.NAV_TILTAK]}},m={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},a={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"ENGANGSSTØNAD",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},l={args:{...a.args,manglendeVedlegg:[s.DEPRECATED_TERMINBEKREFTELSE,s.NAV_TILTAK]}},n={args:{saksnummer:"308",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},p={args:{...n.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[r.get(".//rest/sokerinfo",()=>t.json(q)),r.get(".//rest/innsyn/v2/saker",()=>t.json(u))]}}},g={args:{saksnummer:"308",relevantNyTidslinjehendelse:{aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},k={args:{...n.args,manglendeVedlegg:[s.DOK_UTDANNING_MOR,s.TERMINBEKREFTELSE]}};var T,N,c;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(j=(h=d.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var I,f,b;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...(b=(f=i.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var A,y,D;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(D=(y=m.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var F,v,L;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(L=(v=a.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var M,K,G;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...(G=(K=l.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var V,H,B;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(Q=(C=k.parameters)==null?void 0:C.docs)==null?void 0:Q.source}}};const we=["ForForeldrepenger","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{a as ForEngangsstønad,l as ForEngangsstønadManglerDokumentasjon,e as ForForeldrepenger,i as ForForeldrepengerManglerDokumentasjon,d as ForForeldrepengerNårEnIkkeHarArbeidsforhold,m as ForForeldrepengerUtenTidligsteBehandlingsdato,n as ForSvangerskapspenger,k as ForSvangerskapspengerManglerDokumentasjon,p as ForSvangerskapspengerUtenArbeidsforhold,g as ForSvangerskapspengerUtenTidligsteBehandlingsdato,we as __namedExportsOrder,Oe as default};
