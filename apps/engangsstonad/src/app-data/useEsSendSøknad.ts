import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import { useMemo } from 'react';
import { Dokumentasjon, erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, harBarnetTermindato } from 'types/OmBarnet';

import { useAbortSignal } from '@navikt/fp-api';
import { Kvittering } from '@navikt/fp-types';
import { getDecoratorLanguageCookie } from '@navikt/fp-utils';
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
            termindato: omBarnet.termindato,
            vedleggreferanser: [],
        };
    }

    if (harBarnetTermindato(omBarnet) && dokumentasjon && erTerminDokumentasjon(dokumentasjon)) {
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
const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useEsSendSøknad = (setKvittering: (kvittering: Kvittering) => void) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`),
    });

    const send = async () => {
        const omBarnet = notEmpty(hentData(ContextDataType.OM_BARNET));
        const dokumentasjon = hentData(ContextDataType.DOKUMENTASJON);
        const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
        const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

        const søknad = {
            type: 'engangsstønad',
            språkkode: getDecoratorLanguageCookie('decorator-language'),
            barn: mapBarn(omBarnet, dokumentasjon),
            utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
            vedlegg:
                dokumentasjon?.vedlegg.map((vedlegg) => ({
                    ...vedlegg,
                    dokumenterer: {
                        type: 'barn',
                    },
                })) ?? [],
        };

        const signal = initAbortSignal();

        try {
            const response = await ky.post(`${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`, {
                json: søknad,
                signal,
            });

            slettMellomlagring();

            setKvittering((await response.json()) as Kvittering);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json();
                Sentry.captureMessage(`${FEIL_VED_INNSENDING}${JSON.stringify(jsonResponse)}`);
                const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
                throw Error(FEIL_VED_INNSENDING + callIdForBruker);
            }
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(String(error));
        }
    };

    const { mutateAsync: sendSøknad, error } = useMutation({
        mutationFn: () => send(),
    });

    return useMemo(
        () => ({
            sendSøknad: () => sendSøknad(),
            errorSendSøknad: error,
        }),
        [sendSøknad, error],
    );
};
