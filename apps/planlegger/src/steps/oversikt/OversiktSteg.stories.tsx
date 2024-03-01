import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Periode, PeriodeEnum } from 'types/Periode';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import OversiktSteg from './OversiktSteg';

export default {
    title: 'OversiktSteg',
    component: OversiktSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    periode: Periode;
    omBarnet: OmBarnet;
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click'), hvemPlanlegger, periode, omBarnet }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OVERSIKT]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.PERIODE]: periode,
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
            >
                <OversiktSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const PeriodeFlereForsørgereHundreProsentTermin = Template.bind({});
PeriodeFlereForsørgereHundreProsentTermin.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    periode: {
        periode: PeriodeEnum.HUNDRE,
    },
    omBarnet: {
        erFødsel: true,
        erBarnetFødt: false,
        termindato: '2022-10-24',
    },
};

export const PeriodeAleneforsørgerÅttiProsentFødt = Template.bind({});
PeriodeAleneforsørgerÅttiProsentFødt.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    periode: {
        periode: PeriodeEnum.ÅTTI,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: true,
        fødselsdato: '2024-09-01',
        termindato: '2024-09-01',
    },
};

export const PeriodeFlereForsørgereÅttiProsentAdoptert = Template.bind({});
PeriodeFlereForsørgereÅttiProsentAdoptert.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    periode: {
        periode: PeriodeEnum.ÅTTI,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: false,
        erAdoptert: true,
        fødselsdato: '2024-09-01',
        termindato: '2024-09-01',
        overtakelsesdato: '2024-09-01',
        adopsjonsdato: '2024-09-01',
    },
};
