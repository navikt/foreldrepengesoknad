import{j as o,i as I}from"./iframe-CE7hT7if.js";import{h as e,H as n}from"./index-CXM0r17l.js";import{s as T,a as f,b as A,e as y}from"./saker-eR-S7cLz.js";import{s as c,a as h}from"./sokerinfo-CxnnCWtJ.js";import{S as t}from"./skjemanummer-CmR8Q-T_.js";import{O as R}from"./routes-C7yRzVAD.js";import{B as N}from"./BekreftelseSendtSøknad-DSHSDVfP.js";import{M as b,R as v,a as D}from"./chunk-UH6JLGW7-CT9tgwxt.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useQuery-DAe-6ieI.js";import"./api-CW_KiZht.js";import"./useSelectedSak-D-It1NjT.js";import"./sakerUtils-_pH2ZGJn.js";import"./dokumenterUtils-Cmfr5izE.js";import"./KontonummerInfo-Ch0tCoW7.js";const L={msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(c)),e.get(".//rest/innsyn/v2/saker",()=>n.json(T))]}},z={title:"BekreftelseSendtSøknad",component:N,decorators:[I],parameters:L,render:({saksnummer:j,...F})=>o.jsx(b,{initialEntries:[`/${R.DIN_PLAN}/${j}`],children:o.jsx(v,{children:o.jsx(D,{element:o.jsx(N,{...F}),path:`/${R.DIN_PLAN}/:saksnummer`})})})},r={args:{saksnummer:"352011079",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},d={args:r.args,parameters:{msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(c)),e.get(".//rest/innsyn/v2/saker",()=>n.json(f))]}}},i={args:r.args,parameters:{msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(c)),e.get(".//rest/innsyn/v2/saker",()=>n.json(A))]}}},p={args:r.args,parameters:{msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(c)),e.get(".//rest/innsyn/v2/saker",()=>n.json(y))]}}},m={args:{...r.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(h)),e.get(".//rest/innsyn/v2/saker",()=>n.json(T))]}}},l={args:{...r.args,manglendeVedlegg:[t.HV_ØVELSE,t.NAV_TILTAK]}},g={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"FORELDREPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},a={args:{relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"ENGANGSSTØNAD",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},k={args:{...a.args,manglendeVedlegg:[t.DEPRECATED_TERMINBEKREFTELSE,t.NAV_TILTAK]}},s={args:{saksnummer:"308",relevantNyTidslinjehendelse:{opprettet:new Date().toISOString(),aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},u={args:{...s.args,harMinstEttArbeidsforhold:!1},parameters:{msw:{handlers:[e.get(".//rest/sokerinfo",()=>n.json(h)),e.get(".//rest/innsyn/v2/saker",()=>n.json(T))]}}},E={args:{saksnummer:"308",relevantNyTidslinjehendelse:{aktørType:"BRUKER",tidslinjeHendelseType:"INNTEKTSMELDING",opprettet:new Date().toISOString(),dokumenter:[{dokumentId:"1",journalpostId:"1",tittel:"Søknad"}]},bankkonto:{kontonummer:"1212224",banknavn:"Luster Sparebank"},ytelse:"SVANGERSKAPSPENGER",harMinstEttArbeidsforhold:!0,manglendeVedlegg:[]}},S={args:{...s.args,manglendeVedlegg:[t.DOK_UTDANNING_MOR,t.TERMINBEKREFTELSE]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfo)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(sakerTidligFPSøknad))]
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfo)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(sakerVenterPåFpInntektsmelding))]
    }
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: ForForeldrepenger.args,
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfo)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(endringFPSøknad))]
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  }
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForForeldrepenger.args,
    manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForEngangsstønad.args,
    manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK]
  }
}`,...k.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    harMinstEttArbeidsforhold: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/sokerinfo\`, () => HttpResponse.json(søkerinfoUtenArbeidsforhold)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  }
}`,...u.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForSvangerskapspenger.args,
    manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE]
  }
}`,...S.parameters?.docs?.source}}};const J=["ForForeldrepenger","ForForeldrepengerForTidligSøknad","ForForeldrepengerVenterPåInntektsmelding","ForForeldrepengerEndringsøknad","ForForeldrepengerNårEnIkkeHarArbeidsforhold","ForForeldrepengerManglerDokumentasjon","ForForeldrepengerUtenTidligsteBehandlingsdato","ForEngangsstønad","ForEngangsstønadManglerDokumentasjon","ForSvangerskapspenger","ForSvangerskapspengerUtenArbeidsforhold","ForSvangerskapspengerUtenTidligsteBehandlingsdato","ForSvangerskapspengerManglerDokumentasjon"];export{a as ForEngangsstønad,k as ForEngangsstønadManglerDokumentasjon,r as ForForeldrepenger,p as ForForeldrepengerEndringsøknad,d as ForForeldrepengerForTidligSøknad,l as ForForeldrepengerManglerDokumentasjon,m as ForForeldrepengerNårEnIkkeHarArbeidsforhold,g as ForForeldrepengerUtenTidligsteBehandlingsdato,i as ForForeldrepengerVenterPåInntektsmelding,s as ForSvangerskapspenger,S as ForSvangerskapspengerManglerDokumentasjon,u as ForSvangerskapspengerUtenArbeidsforhold,E as ForSvangerskapspengerUtenTidligsteBehandlingsdato,J as __namedExportsOrder,z as default};
