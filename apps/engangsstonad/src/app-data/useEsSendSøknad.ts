import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import { Path } from 'appData/paths';
import { API_URLS } from 'appData/queries';
import ky, { HTTPError } from 'ky';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dokumentasjon, erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, harBarnetTermindato } from 'types/OmBarnet';

import { useAbortSignal } from '@navikt/fp-api';
import { EngangsstønadDto, Målform, PersonFrontend } from '@navikt/fp-types';
import { getDecoratorLanguageCookie } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './EsDataContext';

// TODO Vurder om ein heller bør mappa fram og tilbake i barn-komponenten. Er nok bedre å gjera det
const mapBarn = (omBarnet: OmBarnet, dokumentasjon?: Dokumentasjon) => {
    if (erAdopsjon(omBarnet)) {
        return {
            type: 'adopsjon' as const,
            antallBarn: omBarnet.antallBarn,
            fødselsdatoer: omBarnet.fødselsdatoer.map((f) => f.dato),
            adopsjonsdato: omBarnet.adopsjonsdato,
            adopsjonAvEktefellesBarn: omBarnet.adopsjonAvEktefellesBarn,
        };
    }
    if (erBarnetFødt(omBarnet)) {
        return {
            type: 'fødsel' as const,
            antallBarn: omBarnet.antallBarn,
            fødselsdato: omBarnet.fødselsdato,
            termindato: omBarnet.termindato,
        };
    }

    if (harBarnetTermindato(omBarnet) && dokumentasjon && erTerminDokumentasjon(dokumentasjon)) {
        return {
            type: 'termin' as const,
            antallBarn: omBarnet.antallBarn,
            termindato: omBarnet.termindato,
            terminbekreftelseDato: dokumentasjon.terminbekreftelsedato,
        };
    }

    throw new Error('Det er feil i data om barnet');
};

// TODO (TOR) Fiks lokalisering
const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useEsSendSøknad = (personinfo: PersonFrontend) => {
    const navigate = useNavigate();
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const send = async () => {
        const omBarnet = notEmpty(hentData(ContextDataType.OM_BARNET));
        const dokumentasjon = hentData(ContextDataType.DOKUMENTASJON);
        const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
        const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

        const søknad = {
            søkerinfo: {
                fnr: personinfo.fnr,
                navn: [personinfo.fornavn, personinfo.mellomnavn, personinfo.etternavn].filter((a) => !!a).join(' '),
            },
            språkkode: getDecoratorLanguageCookie('decorator-language').toUpperCase() as Målform, //TODO: sketchy
            barn: mapBarn(omBarnet, dokumentasjon),
            utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
            vedlegg:
                dokumentasjon?.vedlegg.map((vedlegg) => ({
                    ...vedlegg,
                    dokumenterer: {
                        type: 'BARN',
                    },
                })) ?? [],
        } satisfies EngangsstønadDto;

        const signal = initAbortSignal();

        try {
            await ky.post(API_URLS.sendSøknad, {
                json: søknad,
                signal,
            });

            ky.delete(API_URLS.mellomlagring);
            navigate(Path.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json();
                Sentry.captureMessage(`${FEIL_VED_INNSENDING}${JSON.stringify(jsonResponse)}`);
                const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
                throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
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
