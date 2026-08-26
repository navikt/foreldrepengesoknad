import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { ApiError, captureApiError } from '@navikt/fp-observability';
import type { ProblemDetails } from '@navikt/fp-types';

import { lastInnPåNyttVedUtløptSesjon } from './lastInnPåNyttVedUtløptSesjon';

export interface CreateDefaultQueryClientOptions {
    /**
     * Telemetrimelding som logges når et query feiler med HTTPError og
     * ikke er 401/403. Hvis denne ikke er satt registreres ingen
     * onError-handler på QueryCache (brukes av apper uten API-kall som
     * trenger feilrapportering, f.eks. veivisere/planlegger).
     */
    apiQueryErrorMessage?: string;
}

export const createDefaultQueryClient = ({ apiQueryErrorMessage }: CreateDefaultQueryClientOptions = {}) => {
    const queryCache = apiQueryErrorMessage
        ? new QueryCache({
              onError: (error) => {
                  if (lastInnPåNyttVedUtløptSesjon(error)) {
                      return;
                  }
                  if (error instanceof HTTPError) {
                      if (error.response?.status === 403) {
                          return;
                      }
                      const apiError = error.data as ProblemDetails | undefined;
                      captureApiError(apiQueryErrorMessage, apiError);
                  }
              },
          })
        : undefined;

    const mutationCache = new MutationCache({
        onError: (error) => {
            // Innsending og mellomlagring kaster 401 videre som rå HTTPError, ikke
            // som ApiError. Uten denne sjekken ble en utløpt sesjon svelget stille
            // og brukeren mistet det som var fylt ut.
            if (lastInnPåNyttVedUtløptSesjon(error)) {
                return;
            }
            if (error instanceof ApiError) {
                captureApiError(error.telemetryMessage, error.problemDetails);
            }
        },
    });

    return new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
};
