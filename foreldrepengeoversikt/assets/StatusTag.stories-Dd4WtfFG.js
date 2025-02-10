import{s as e}from"./saker-LsKd_i7-.js";import{S as V,B as r}from"./StatusTag-fyAQ8Z0C.js";import"./stønadskontoType-l1GAnwlP.js";import"./dates-BoUBb6Xm.js";import"./index-CR__hKHy.js";import"./DekningsgradDTO-DRRk0ium.js";import"./jsx-runtime-CLpGMVip.js";import"./Tag-ilehSkCp.js";import"./Label-uxnjPK_2.js";const j={title:"StatusTag",component:V},n={args:{sak:e.foreldrepenger[0],harMinstEttArbeidsforhold:!0}},s={args:{sak:{...e.foreldrepenger[0],sakAvsluttet:!0},harMinstEttArbeidsforhold:!0}},t={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:r.UNDER_BEHANDLING}},harMinstEttArbeidsforhold:!0}},a={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:r.VENTER_PÅ_INNTEKTSMELDING}},harMinstEttArbeidsforhold:!0}},o={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:r.VENTER_PÅ_INNTEKTSMELDING}},harMinstEttArbeidsforhold:!1}},d={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:r.TIDLIG_SØKNAD}},harMinstEttArbeidsforhold:!0}},i={args:{sak:{...e.foreldrepenger[0],åpenBehandling:{tilstand:r.VENTER_PÅ_MELDEKORT}},harMinstEttArbeidsforhold:!0}};var l,p,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: saker.foreldrepenger[0],
    harMinstEttArbeidsforhold: true
  }
}`,...(g=(p=n.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var c,h,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      sakAvsluttet: true
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(m=(h=s.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var k,E,u;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: BehandlingTilstand.UNDER_BEHANDLING
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(u=(E=t.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var f,T,N;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(N=(T=a.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var A,B,M;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING
      }
    },
    harMinstEttArbeidsforhold: false
  }
}`,...(M=(B=o.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var S,_,I;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: BehandlingTilstand.TIDLIG_SØKNAD
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(I=(_=d.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var b,D,P;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    //@ts-expect-error fiks
    sak: {
      ...saker.foreldrepenger[0],
      åpenBehandling: {
        tilstand: BehandlingTilstand.VENTER_PÅ_MELDEKORT
      }
    },
    harMinstEttArbeidsforhold: true
  }
}`,...(P=(D=i.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};const q=["AktivSak","AvsluttetSak","UnderBehandling","VenterPåInntektsmelding","VenterPåBehandling","TidligSøknad","VenterPåMeldekort"];export{n as AktivSak,s as AvsluttetSak,d as TidligSøknad,t as UnderBehandling,o as VenterPåBehandling,a as VenterPåInntektsmelding,i as VenterPåMeldekort,q as __namedExportsOrder,j as default};
