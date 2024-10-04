import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useMemo } from 'react';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { useAbortSignal } from '@navikt/fp-api';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import Environment from './Environment';
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
const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

const useEsSendSøknad = (locale: LocaleAll, setKvittering: (kvittering: Kvittering | (() => never)) => void) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${Environment.PUBLIC_PATH}/rest/storage/engangsstonad`),
    });

    const send = async () => {
        const omBarnet = notEmpty(hentData(ContextDataType.OM_BARNET));
        const dokumentasjon = hentData(ContextDataType.DOKUMENTASJON);
        const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
        const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

        const søknad = {
            type: 'engangsstønad',
            språkkode: locale,
            barn: mapBarn(omBarnet, dokumentasjon),
            utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
            vedlegg:
                dokumentasjon?.vedlegg.map((vedlegg) => ({
                    ...vedlegg,
                    dokumenterer: {
                        type: 'barn',
                    },
                })) || [],
        };

        const signal = initAbortSignal();

        const response = await fetch(`${Environment.PUBLIC_PATH}/rest/soknad/engangsstonad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal,
            body: JSON.stringify(søknad),
        });

        if (signal.aborted || response.status === 401 || response.status === 403) {
            throw new Error();
        }

        if (!response.ok) {
            const jsonResponse = await response.json();
            const callIdForBruker = jsonResponse?.uuid ? jsonResponse?.uuid.slice(0, 8) : UKJENT_UUID;
            throw Error(FEIL_VED_INNSENDING + callIdForBruker);
        }

        slettMellomlagring();

        setKvittering((await response.json()) as Kvittering);
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

export default useEsSendSøknad;
