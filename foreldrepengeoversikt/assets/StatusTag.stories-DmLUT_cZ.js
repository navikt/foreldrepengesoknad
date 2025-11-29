import{s as e}from"./saker-D6DZJrGh.js";import{S as E}from"./StatusTag-DYRadPNX.js";import"./iframe-B9HSP4qp.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-91CngL8I.js";const k={title:"StatusTag",component:E},r={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER"},harMinstEttArbeidsforhold:!0}},n={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",sakAvsluttet:!0},harMinstEttArbeidsforhold:!0}},s={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",åpenBehandling:{søknadsperioder:[],tilstand:"UNDER_BEHANDLING"}},harMinstEttArbeidsforhold:!0}},t={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",åpenBehandling:{søknadsperioder:[],tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!0}},a={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",åpenBehandling:{søknadsperioder:[],tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!1}},o={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",åpenBehandling:{søknadsperioder:[],tilstand:"VENT_TIDLIG_SØKNAD"}},harMinstEttArbeidsforhold:!0}},d={args:{sak:{...e.foreldrepenger[0],ytelse:"FORELDREPENGER",åpenBehandling:{søknadsperioder:[],tilstand:"VENT_MELDEKORT"}},harMinstEttArbeidsforhold:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER'
    },
    harMinstEttArbeidsforhold: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      sakAvsluttet: true
    },
    harMinstEttArbeidsforhold: true
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      åpenBehandling: {
        søknadsperioder: [],
        tilstand: 'UNDER_BEHANDLING'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      åpenBehandling: {
        søknadsperioder: [],
        tilstand: 'VENT_INNTEKTSMELDING'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      åpenBehandling: {
        søknadsperioder: [],
        tilstand: 'VENT_INNTEKTSMELDING'
      }
    },
    harMinstEttArbeidsforhold: false
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      åpenBehandling: {
        søknadsperioder: [],
        tilstand: 'VENT_TIDLIG_SØKNAD'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    sak: {
      ...saker.foreldrepenger[0]!,
      ytelse: 'FORELDREPENGER',
      åpenBehandling: {
        søknadsperioder: [],
        tilstand: 'VENT_MELDEKORT'
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...d.parameters?.docs?.source}}};const R=["AktivSak","AvsluttetSak","UnderBehandling","VenterPåInntektsmelding","VenterPåBehandling","TidligSøknad","VenterPåMeldekort"];export{r as AktivSak,n as AvsluttetSak,o as TidligSøknad,s as UnderBehandling,a as VenterPåBehandling,t as VenterPåInntektsmelding,d as VenterPåMeldekort,R as __namedExportsOrder,k as default};
