import{s as e}from"./saker-Cl3B_pmd.js";import{S as i}from"./StatusTag-BIIsr7dD.js";import"./iframe-GyC3bxcg.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./Tag-CXYRKVJP.js";const u={title:"StatusTag",component:i},r={args:{sak:e.foreldrepenger[0],harMinstEttArbeidsforhold:!0}},n={args:{sak:{...e.foreldrepenger[0],sakAvsluttet:!0},harMinstEttArbeidsforhold:!0}},s={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"UNDER_BEHANDLING"}},harMinstEttArbeidsforhold:!0}},t={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!0}},a={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!1}},o={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_TIDLIG_SØKNAD"}},harMinstEttArbeidsforhold:!0}},d={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_MELDEKORT"}},harMinstEttArbeidsforhold:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: saker.foreldrepenger[0],
    harMinstEttArbeidsforhold: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      sakAvsluttet: true
    },
    harMinstEttArbeidsforhold: true
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: 'UNDER_BEHANDLING'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: 'VENT_INNTEKTSMELDING'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: 'VENT_INNTEKTSMELDING'
      }
    },
    harMinstEttArbeidsforhold: false
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: 'VENT_TIDLIG_SØKNAD'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: 'VENT_MELDEKORT'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...d.parameters?.docs?.source}}};const m=["AktivSak","AvsluttetSak","UnderBehandling","VenterPåInntektsmelding","VenterPåBehandling","TidligSøknad","VenterPåMeldekort"];export{r as AktivSak,n as AvsluttetSak,o as TidligSøknad,s as UnderBehandling,a as VenterPåBehandling,t as VenterPåInntektsmelding,d as VenterPåMeldekort,m as __namedExportsOrder,u as default};
