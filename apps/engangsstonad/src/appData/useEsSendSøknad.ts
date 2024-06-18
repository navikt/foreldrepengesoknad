import { AxiosInstance } from 'axios';
import { useCallback, useMemo, useState } from 'react';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { ApiAccessError, ApiGeneralError, deleteData, isApiError, postData } from '@navikt/fp-api';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './EsDataContext';

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
    const hentData = useContextGetAnyData();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const sendSøknad = useCallback(
        async (abortSignal: AbortSignal) => {
            const omBarnet = notEmpty(hentData(ContextDataType.OM_BARNET));
            const dokumentasjon = hentData(ContextDataType.DOKUMENTASJON);
            const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
            const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

            const søknad = {
                type: 'engangsstønad',
                språkkode: locale,
                barn: mapBarn(omBarnet, dokumentasjon),
                oppholdIUtlandet: (tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd || []).concat(
                    senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd || [],
                ),
                vedlegg:
                    dokumentasjon?.vedlegg.map((vedlegg) => ({
                        ...vedlegg,
                        dokumenterer: {
                            type: 'barn',
                        },
                    })) || [],
            };

            let kvittering;
            try {
                kvittering = await postData<typeof søknad, Kvittering>(
                    esApi,
                    '/rest/soknad/engangsstonad',
                    søknad,
                    FEIL_VED_INNSENDING,
                    true,
                    abortSignal,
                );
            } catch (error: unknown) {
                if (isApiError(error)) {
                    setError(error);
                } else {
                    throw new Error('This should never happen');
                }
            }

            if (kvittering) {
                try {
                    await deleteData(esApi, '/rest/storage/engangsstonad', FEIL_VED_INNSENDING, abortSignal);
                } catch (error) {
                    // Vi bryr oss ikke om feil her. Logges bare i backend
                }

                setKvittering(kvittering);
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
