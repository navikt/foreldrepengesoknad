import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import OversiktSteg from './OversiktSteg';
import { Periode, PeriodeEnum } from 'types/Periode';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { OmBarnet } from 'types/Barnet';

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

export const PeriodeFlereForsørgereHundreProsent = Template.bind({});
PeriodeFlereForsørgereHundreProsent.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    periode: {
        periode: PeriodeEnum.HUNDRE,
    },
    omBarnet: {
        termindato: '2022-10-24',
    },
};

export const PeriodeAleneforsørgerÅttiProsent = Template.bind({});
PeriodeAleneforsørgerÅttiProsent.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    periode: {
        periode: PeriodeEnum.ÅTTI,
    },
};
