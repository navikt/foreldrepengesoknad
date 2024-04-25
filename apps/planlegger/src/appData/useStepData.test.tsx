import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { ContextDataType, PlanleggerDataContext } from './PlanleggerDataContext';
import { PlanleggerRoutes } from './routes';
import useStepData from './useStepData';

const getWrapper =
    (
        route: PlanleggerRoutes,
        barnet?: OmBarnet,
        hvemPlanlegger?: HvemPlanlegger,
        arbeidssituasjon?: Arbeidssituasjon,
    ) =>
    ({ children }: { children: ReactNode }) => (
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
    );

describe('useStepData', () => {
    it('skal finne default-steg når ingen data er satt i context', async () => {
        const { result } = renderHook(() => useStepData(), { wrapper: getWrapper(PlanleggerRoutes.OM_PLANLEGGEREN) });

        await waitFor(() =>
            expect(result.current).toEqual([
                {
                    id: '/hvem-planlegger',
                    isSelected: false,
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: false,
                },
            ]),
        );
    });

    it('skal vise arbeidssituasjon-steg når barnet er oppgitt og fødselsdato er etter tre år siden', async () => {
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
                },
            ]),
        );
    });

    it('skal vise stegene hvor-lenge, fordeling og oversikt når begge foreldre har rett', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: Situasjon.MOR_OG_FAR,
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                },
                {
                    id: '/fordeling',
                    isSelected: false,
                },
                {
                    id: '/oversikt',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
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
            type: Situasjon.MOR_OG_FAR,
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                },
                {
                    id: '/oversikt',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
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
            type: Situasjon.MOR,
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                },
                {
                    id: '/hvor-lenge',
                    isSelected: false,
                },
                {
                    id: '/oversikt',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
                },
            ]),
        );
    });

    it('skal ikke vise stegene hvor-lenge og oversikt når ingen har rett', async () => {
        const barnet = {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            termindato: dayjs().format(ISO_DATE_FORMAT),
            fødselsdato: dayjs().format(ISO_DATE_FORMAT),
        };
        const hvemPlanlegger = {
            type: Situasjon.MOR_OG_FAR,
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
                },
                {
                    id: '/om-barnet',
                    isSelected: false,
                },
                {
                    id: '/arbeidssituasjon',
                    isSelected: false,
                },
                {
                    id: '/oppsummering',
                    isSelected: true,
                },
            ]),
        );
    });
});
