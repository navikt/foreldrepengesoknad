import{aT as L,j as a,k as F}from"./iframe-Dpp7yu4e.js";import{u as H}from"./useQuery-Cr_wKRw3.js";import{h as e,H as s}from"./index-C-k-IzMo.js";import{t as V,m as v,a as w,b as E,c as y,d as b,e as B,f as M,g as U,h as x,i as T,j as D,k as O,l as N,n as Q}from"./tidslinjeHendelser-B1hocJmd.js";import{s as z,c as C,d as G,f as K,g as $,h as q,i as J,j as W,k as X,l as Y,m as Z,n as ee,o as se}from"./saker-thaWTfcA.js";import{s as t}from"./sokerinfo-CRlQSfuz.js";import{e as ne,f as te,A as n}from"./queries-h-vcByZy.js";import{u as re}from"./useSelectedSak-XDpRXMO7.js";import{T as ae}from"./Tidslinje-Bhur-vDh.js";import{M as oe,R as de,a as ge,b as pe}from"./chunk-WWGJGFF6-GowFewAn.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DBZVZ2Rk.js";import"./sakerUtils-Dh7nKuvC.js";import"./routes-BgSQQwXh.js";import"./guid-CsArkN6i.js";import"./tidslinjeUtils-Co8gpg0z.js";import"./Paperplane-CgiOiMJF.js";import"./BabyWrapped-CLNqiB5T.js";const ie=d=>(o,p)=>{const g=p.args.mockDate??d;return L.set(g),a.jsxs(a.Fragment,{children:[a.jsxs("div",{style:{fontSize:"18px",borderRadius:"4px",padding:"8px",background:"#F68282"},children:["Dato er mocket til ",new Date(g).toLocaleDateString()]}),a.jsx(o,{})]})},r=[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}],A=d=>{const o=pe(),p=re(),g=H(ne(o.saksnummer)).data,f=H(te(o.saksnummer)).data;return!g||!f||!p?"Laster story...":a.jsx("div",{style:{marginTop:"1rem"},children:a.jsx(ae,{...d,sak:p,manglendeVedlegg:f,tidslinjeHendelser:g})})},Ve={title:"Tidslinje",component:A,decorators:[F,ie(new Date("2025-11-27").getTime())],argTypes:{mockDate:{control:"date",description:"Mock the current date for the story"}},render:({saksnummer:d,...o})=>a.jsx(oe,{initialEntries:[`/${d}`],children:a.jsx(de,{children:a.jsx(ge,{element:a.jsx(A,{...o}),path:"/:saksnummer"})})})},i={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(z)),e.get(n.tidslinje,()=>s.json(V)),e.get(n.manglendeVedlegg,()=>s.json(v))]}},args:{søkersBarn:r,saksnummer:"1"}},l={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(C)),e.get(n.tidslinje,()=>s.json(w)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"818"}},m={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(G)),e.get(n.tidslinje,()=>s.json(E)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"821"}},_={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(K)),e.get(n.tidslinje,()=>s.json(y)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"827"}},j={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json($)),e.get(n.tidslinje,()=>s.json(b)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"830"}},k={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(q)),e.get(n.tidslinje,()=>s.json(B)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"837"}},c={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(J)),e.get(n.tidslinje,()=>s.json(M)),e.get(n.manglendeVedlegg,()=>s.json(U))]}},args:{søkersBarn:r,saksnummer:"352028412"}},h={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(W)),e.get(n.tidslinje,()=>s.json(x)),e.get(n.manglendeVedlegg,()=>s.json(U))]}},args:{søkersBarn:r,saksnummer:"352028412"}},P={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(X)),e.get(n.tidslinje,()=>s.json(T)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"843"}},R={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(Y)),e.get(n.tidslinje,()=>s.json(D)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"848"}},S={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(Z)),e.get(n.tidslinje,()=>s.json(O)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"838"}},u={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(ee)),e.get(n.tidslinje,()=>s.json(N)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"839"}},I={parameters:{msw:{handlers:[e.get(n.søkerInfo,()=>s.json(t)),e.get(n.saker,()=>s.json(se)),e.get(n.tidslinje,()=>s.json(Q)),e.get(n.manglendeVedlegg,()=>s.json([]))]}},args:{søkersBarn:r,saksnummer:"842"}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '1'
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_adopsjon)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_Adopsjon)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '818'
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_termin_innvilget)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_termin_innvilget)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '821'
  }
}`,...m.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_fødsel_tilbakekreving)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_tilbakekreving)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '827'
  }
}`,..._.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_etterlyst_IM)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_etterlys_IM)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '830'
  }
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_for_tidlig_søknad)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_for_tidlig_søknad)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '837'
  }
}`,...k.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_mangler_dokumentasjon)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_mangler_dokumentasjon)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg_FP))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '352028412'
  }
}`,...c.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_ny_søknad)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_ny_søknad)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg_FP))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '352028412'
  }
}`,...h.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_SVP_innvilget)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_SVP_innvilget)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '843'
  }
}`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_SVP_under_behandling)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_SVP_under_behandling)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '848'
  }
}`,...R.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_adopsjon_innvilget)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_adopsjon_innvilget)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '838'
  }
}`,...S.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_adopsjon_avslag)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_adopsjon_avslag)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '839'
  }
}`,...u.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)), http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_under_behandling)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_under_behandling)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([]))]
    }
  },
  args: {
    søkersBarn,
    saksnummer: '842'
  }
}`,...I.parameters?.docs?.source}}};const ve=["FP","FPAdopsjon","FPTerminInnvilget","FPMedTilbakekreving","FPEtterlysIM","FPForTidligSøknad","FPManglerDokumentasjon","FPNySøknad","SVPInnvilget","SVPUnderBehandling","ESAdopsjonInnvilget","ESAdopsjonAvslag","ESUnderBehandling"];export{u as ESAdopsjonAvslag,S as ESAdopsjonInnvilget,I as ESUnderBehandling,i as FP,l as FPAdopsjon,j as FPEtterlysIM,k as FPForTidligSøknad,c as FPManglerDokumentasjon,_ as FPMedTilbakekreving,h as FPNySøknad,m as FPTerminInnvilget,P as SVPInnvilget,R as SVPUnderBehandling,ve as __namedExportsOrder,Ve as default};
