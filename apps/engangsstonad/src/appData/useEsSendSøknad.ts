import { useCallback, useMemo, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { storeData, ApiAccessError, ApiGeneralError, isApiError } from '@navikt/fp-api';
import { notEmpty } from '@navikt/fp-validation';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { EsDataType, useEsStateAllDataFn } from './EsDataContext';

// TODO Vurder om ein heller bør mappa fram og tilbake i barn-komponenten. Er nok bedre å gjera det
const mapBarn = (omBarnet: OmBarnet, dokumentasjon?: Dokumentasjon) => {
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

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsSendSøknad = (
    esApi: AxiosInstance,
    locale: LocaleAll,
    setKvittering: (kvittering: Kvittering | (() => never)) => void,
) => {
    const hentData = useEsStateAllDataFn();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const sendSøknad = useCallback(
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
                // TODO (TOR) Fjern any
                const kvittering = await storeData<any, Kvittering>(
                    esApi,
                    '/soknad/engangssoknad',
                    søknad,
                    FEIL_VED_INNSENDING,
                    abortSignal,
                );
                setKvittering(kvittering);
            } catch (error: unknown) {
                if (isApiError(error)) {
                    setError(error);
                } else {
                    throw new Error('This should never happen');
                }
            }
        },
        [hentData, locale, setKvittering, esApi],
    );

    return useMemo(
        () => ({
            sendSøknad,
            errorSendSøknad: error,
        }),
        [sendSøknad, error],
    );
};

export default useEsSendSøknad;
