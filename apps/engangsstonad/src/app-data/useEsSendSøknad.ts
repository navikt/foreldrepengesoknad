import { useMutation } from '@tanstack/react-query';
import { Path } from 'appData/paths';
import { API_URLS } from 'appData/queries';
import { HTTPError } from 'ky';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Dokumentasjon, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { kyWithSentry as ky } from '@navikt/fp-observability';
import { ApiError } from '@navikt/fp-observability';
import {
    BarnDto,
    EngangsstønadDto,
    EsPersonopplysningerDto_fpoversikt,
    FpSoknadProblemDetails,
    Målform,
} from '@navikt/fp-types';
import { getDecoratorLanguageCookie, useAbortSignal } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './EsDataContext';

export const useEsSendSøknad = (personinfo: EsPersonopplysningerDto_fpoversikt) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const send = async () => {
        const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
        const dokumentasjon = hentData(ContextDataType.DOKUMENTASJON);
        const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
        const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

        const søknad = {
            søkerinfo: {
                fnr: personinfo.fnr,
                navn: personinfo.navn,
            },
            språkkode: getDecoratorLanguageCookie('decorator-language').toUpperCase() as Målform,
            barn: mapBarn(barn, dokumentasjon),
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

            void ky.delete(API_URLS.mellomlagring);
            void navigate(Path.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
                const callId = jsonResponse?.callId;
                const feilmelding = callId
                    ? intl.formatMessage(
                          { id: 'useEsSendSøknad.FeilVedInnsending.MedCallId' },
                          { callId: callId.substring(0, 6) },
                      )
                    : intl.formatMessage({ id: 'useEsSendSøknad.FeilVedInnsending.UtenCallId' });
                throw new ApiError(feilmelding, 'Feil ved innsending av engangsstønad', jsonResponse);
            }
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(String(error), { cause: error });
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

const mapBarn = (barn: BarnDto, dokumentasjon?: Dokumentasjon): BarnDto => {
    if (barn.type === 'termin' && !(dokumentasjon && erTerminDokumentasjon(dokumentasjon))) {
        throw new Error('Det er feil i data om barnet: mangler terminbekreftelse for termin-barn');
    }

    return barn.type === 'termin' && dokumentasjon && erTerminDokumentasjon(dokumentasjon)
        ? { ...barn, terminbekreftelseDato: dokumentasjon.terminbekreftelsedato }
        : barn;
};
