import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k}from"./useQuery-D15qCwmj.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{O as s}from"./routes-D6j-qr5i.js";import{E as o}from"./ForeldrepengeoversiktRoutes-DniYLCEw.js";import{M as f,R as h,a as v}from"./index-qfvvJAWu.js";import{Q as E}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-Cr7z64jr.js";import"./stringUtils-BhrNUKGk.js";import"./Header-BScsmPsj.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-bGpEqGAO.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-C7_0haOy.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-CHYZ_Dh2.js";import"./iframe-DezlgRuI.js";import"../sb-preview/runtime.js";import"./VeiviserPage-WWaDT2q1.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-BQIkEs3k.js";import"./Snarveier-rzE7JfwR.js";import"./Dokument-BB_EWHwU.js";import"./GrupperteDokumenter-dEI0kWs9.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-DQyK4-yq.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-BTSb5_55.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-BUF0fVCN.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-BIzN156d.js";import"./Oppgaver-BGFFg_zq.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const S=new E({defaultOptions:{queries:{retry:!1}}}),Ct={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:S,children:t.jsx(f,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(h,{children:t.jsx(v,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var i,m,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const It=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,It as __namedExportsOrder,Ct as default};
