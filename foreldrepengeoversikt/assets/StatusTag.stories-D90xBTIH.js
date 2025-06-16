import{s as e}from"./saker-BBpv7LgF.js";import{S as _}from"./StatusTag-CnRILs7g.js";import"./iframe-DuB7cK7M.js";import"./RettighetType-BD_oerVS.js";import"./Tag-CXdECPZQ.js";const P={title:"StatusTag",component:_},r={args:{sak:e.foreldrepenger[0],harMinstEttArbeidsforhold:!0}},n={args:{sak:{...e.foreldrepenger[0],sakAvsluttet:!0},harMinstEttArbeidsforhold:!0}},s={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"UNDER_BEHANDLING"}},harMinstEttArbeidsforhold:!0}},t={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!0}},a={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING"}},harMinstEttArbeidsforhold:!1}},o={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_TIDLIG_SØKNAD"}},harMinstEttArbeidsforhold:!0}},d={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:"VENT_MELDEKORT"}},harMinstEttArbeidsforhold:!0}};var i,l,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: saker.foreldrepenger[0],
    harMinstEttArbeidsforhold: true
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var c,g,k;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      sakAvsluttet: true
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(k=(g=n.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var h,u,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var m,E,N;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(N=(E=t.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var A,T,M;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(M=(T=a.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var S,B,I;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(I=(B=o.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var b,D,V;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(V=(D=d.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};const R=["AktivSak","AvsluttetSak","UnderBehandling","VenterPåInntektsmelding","VenterPåBehandling","TidligSøknad","VenterPåMeldekort"];export{r as AktivSak,n as AvsluttetSak,o as TidligSøknad,s as UnderBehandling,a as VenterPåBehandling,t as VenterPåInntektsmelding,d as VenterPåMeldekort,R as __namedExportsOrder,P as default};
