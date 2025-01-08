import{j as t}from"./jsx-runtime-DwRxq3ZX.js";import{Q as k}from"./useQuery-Bp3akpRK.js";import{h as g,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./routes-D6j-qr5i.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-CZYxAkva.js";import{M as f,R as E,a as S}from"./index-ByI1_y3g.js";import{Q as h}from"./queryClient-Ch-PTZPr.js";import"./index-BX3iQpgp.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-DvvsaCwN.js";import"./dates-TdbGqddN.js";import"./index-A4VDgvRX.js";import"./iframe-Op9mga9u.js";import"../sb-preview/runtime.js";import"./dateFormValidation-CpTlqkG5.js";import"./links-Cq4ifjPA.js";import"./VStack-DCI-IWy0.js";import"./Label-sdGPuzAK.js";import"./useId-CmSpHSni.js";import"./message-8h7m8LF5.js";import"./Alert-DYj8gWus.js";import"./Button-CZavV0iI.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-6pYp3TYt.js";import"./File-B657A67O.js";import"./UttaksdagenString-Dd6xBUPd.js";import"./HGrid-VFl1Qdht.js";import"./index-B1dLepta.js";import"./stønadskontoType-l1GAnwlP.js";import"./_getTag-CkXgi8rB.js";import"./stringUtils-grKZaQiI.js";import"./index-ImNsV_cY.js";import"./Responsive-DPQNueAS.js";import"./Accordion-Cnxh7RR0.js";import"./ChevronDown-4_HeHalp.js";import"./useBackgroundColor-Djv3QOUN.js";import"./useSelectedSak-DLx0IsMZ.js";import"./api-CuYAbk1P.js";import"./sakerUtils-B3gbHCJi.js";import"./Snarveier-D6TCwXKt.js";import"./LenkePanel-Bw60y4ti.js";import"./index-BwGdUlzO.js";import"./Dokument-BP9frbnt.js";import"./dokumenterUtils-DhfrfuBG.js";import"./Tag-BLAkPtYT.js";import"./GrupperteDokumenter-DU_vBhJ0.js";import"./guid-CsArkN6i.js";import"./Header-Cj5SuQnq.js";import"./LayoutWrapper-CL5NNoZ7.js";import"./StatusTag-D1SAZhwx.js";import"./Stroller-d-1P2-cY.js";import"./NoeGikkGalt-4UiPdUz7.js";import"./MinidialogSkjema-DMRRV1I5.js";import"./skjemanummer-CsrY1khI.js";import"./useClientLayoutEffect-CDS5ZwQf.js";import"./BekreftelseSendtSøknad-CbNH0frt.js";import"./KontonummerInfo-BOjUcBgR.js";import"./HarIkkeSaker-BfhA7sLg.js";import"./SøkelenkerPanel-CVmRVoti.js";import"./HarSaker-CA-oXsaE.js";import"./SakLink-BXt0nCMn.js";import"./ContentSection-CmPeHpUR.js";import"./DinPlan-BkRWcGRp.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Byqve8zJ.js";import"./OppgaveLenkepanel-BBR3kecF.js";import"./KontaktOss-Bm_F3i4V.js";const R=new h({defaultOptions:{queries:{retry:!1}}}),Ht={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(f,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
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
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Qt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Qt as __namedExportsOrder,Ht as default};
