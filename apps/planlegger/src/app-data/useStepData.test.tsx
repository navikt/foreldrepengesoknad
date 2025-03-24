import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { HvemPlanleggerType } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/messages/nb_NO.json';
import { ContextDataType, PlanleggerDataContext } from './PlanleggerDataContext';
import { PlanleggerRoutes } from './routes';
import { useStepData } from './useStepData';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};
const getWrapper =
    (
        route: PlanleggerRoutes,
        barnet?: OmBarnet,
        hvemPlanlegger?: HvemPlanlegger,
        arbeidssituasjon?: Arbeidssituasjon,
    ) =>
    ({ children }: { children: ReactNode }) => (
        <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <MemoryRouter initialEntries={[route]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.OM_BARNET]: barnet,
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                    }}
                >
                    {children}
                </PlanleggerDataContext>
            </MemoryRouter>
        </IntlProvider>
    );

describe('useStepData', () => {
    it('skal finne default-steg når ingen data er satt i context', async () => {
        const { result } = renderHook(() => useStepData(), { wrapper: getWrapper(PlanleggerRoutes.OM_PLANLEGGEREN) });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/fordeling',
                    isSelected: false,
                    label: 'Fordeling',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: false,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal vise arbeidssituasjon-steg når barnet er oppgitt og fødselsdato er yngre enn tre år siden', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/fordeling',
                    isSelected: false,
                    label: 'Fordeling',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise arbeidssituasjon-steg når barnet er oppgitt og barnet er eldre enn tre år', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: '2020-02-02',
            fødselsdato: '2020-02-02',
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal vise stegene hvor-lenge, fordeling og planen-deres når begge foreldre har rett', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Helga Utvikler',
            navnPåFar: 'Espen Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/fordeling',
                    isSelected: false,
                    label: 'Fordeling',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise barnehageplass-steg når barnet er adoptert', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: false,
            overtakelsesdato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Helga Utvikler',
            navnPåFar: 'Espen Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/fordeling',
                    isSelected: false,
                    label: 'Fordeling',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise steget fordeling når kun en part har rett', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Helga Utvikler',
            navnPåFar: 'Espen Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise steget fordeling når alenesøker', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.MOR,
            navnPåMor: 'Helga Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise steget fordeling ved fødsel for far og far', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Anders Utvikler',
            navnPåMedfar: 'Espen Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/hvor-mye',
                    isSelected: false,
                    label: 'Hvor mye',
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                    label: 'Hvor lenge',
                },
                {
                    id: '/planen-deres',
                    isSelected: false,
                    label: 'Planen',
                },
                // {
                //     id: '/tilpass-planen',
                //     isSelected: false,
                //     label: 'Tilpass planen',
                // },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });

    it('skal ikke vise stegene hvor-lenge og planen-deres når ingen har rett', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Helga Utvikler',
            navnPåFar: 'Espen Utvikler',
        };
        const arbeidssituasjon = {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: false,
        };

        const { result } = renderHook(() => useStepData(), {
            wrapper: getWrapper(PlanleggerRoutes.OPPSUMMERING, barnet, hvemPlanlegger, arbeidssituasjon),
        });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                    label: 'Hvem planlegger?',
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                    label: 'Barnet',
                },
                {
                    id: '/barnehageplass',
                    isSelected: false,
                    label: 'Barnehageplass',
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                    label: 'Arbeidssituasjon',
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
                    label: 'Oppsummering',
                },
            ]),
        );
    });
});
