import { useCallback } from 'react';
import { LocaleAll } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import Kvittering from 'types/Kvittering';
import { EsDataType, useEsStateAllDataFn } from './EsDataContext';
import Api from './api';

const mapBarn = (omBarnet: OmBarnet, dokumentasjon?: Dokumentasjon) => {
    // TODO Vurder om ein heller bør mappa fram og tilbake i barn-komponenten. Er nok bedre å gjera det
    const vedleggreferanser = dokumentasjon?.vedlegg.map((v) => v.id) || [];
    if (erAdopsjon(omBarnet)) {
        return {
            type: 'adopsjon',
            antallBarn: omBarnet.antallBarn,
            fødselsdatoer: omBarnet.fødselsdatoer.map((f) => f.dato),
            adopsjonsdato: omBarnet.adopsjonsdato,
            adopsjonAvEktefellesBarn: omBarnet.adopsjonAvEktefellesBarn,
            vedleggreferanser,
        };
    }
    if (erBarnetFødt(omBarnet)) {
        return {
            type: 'fødsel',
            antallBarn: omBarnet.antallBarn,
            fødselsdato: omBarnet.fødselsdato,
            vedleggreferanser: [],
        };
    }

    if (erBarnetIkkeFødt(omBarnet) && dokumentasjon && erTerminDokumentasjon(dokumentasjon)) {
        return {
            type: 'termin',
            antallBarn: omBarnet.antallBarn,
            termindato: omBarnet.termindato,
            terminbekreftelseDato: dokumentasjon.terminbekreftelsedato,
            vedleggreferanser,
        };
    }

    throw Error('Det er feil i data om barnet');
};

const useEsSendData = (locale: LocaleAll, setKvittering: (kvittering: Kvittering | (() => never)) => void) => {
    const hentData = useEsStateAllDataFn();

    const sendData = useCallback(
        async (abortSignal: AbortSignal) => {
            const omBarnet = notEmpty(hentData(EsDataType.OM_BARNET));
            const dokumentasjon = hentData(EsDataType.DOKUMENTASJON);
            const tidligereUtenlandsopphold = hentData(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
            const senereUtenlandsopphold = hentData(EsDataType.UTENLANDSOPPHOLD_SENERE);

            const søknad = {
                type: 'engangsstønad',
                språkkode: locale,
                barn: mapBarn(omBarnet, dokumentasjon),
                utenlandsopphold: {
                    utenlandsoppholdSiste12Mnd: tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd || [],
                    utenlandsoppholdNeste12Mnd: senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd || [],
                },
                vedlegg: dokumentasjon?.vedlegg || [],
            };

            try {
                const kvittering = await Api.sendSøknad(abortSignal, '/soknad/engangssoknad', søknad);
                setKvittering(kvittering);
            } catch (error) {
                // Kast feilmelding inne funksjon som set state => hack for å at ErrorBoundary skal snappa opp feilen
                setKvittering(() => {
                    throw error;
                });
            }
        },
        [hentData, locale, setKvittering],
    );

    return sendData;
};

export default useEsSendData;
