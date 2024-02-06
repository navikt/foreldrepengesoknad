import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext, ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { initAmplitude } from '@navikt/fp-metrics';
import BarnehageplassSteg from './BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';

export default {
    title: 'BarnehageplassSteg',
    component: BarnehageplassSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, omBarnet, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.ARBEIDSSITUASJON]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
                onDispatch={gåTilNesteSide}
            >
                <BarnehageplassSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const FlereForsørgereBarnTerminDesemberStartAugustOmToÅr = Template.bind({});
FlereForsørgereBarnTerminDesemberStartAugustOmToÅr.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-12-01',
    },
};

export const FlereForsørgereBarnFødtSeptemberStartSeptember = Template.bind({});
FlereForsørgereBarnFødtSeptemberStartSeptember.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: true,
        fødselsdato: '2024-09-01',
    },
};

export const AleneforsørgerBarnFødtJanuarStartAugust = Template.bind({});
AleneforsørgerBarnFødtJanuarStartAugust.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: true,
        fødselsdato: '2024-01-01',
    },
};
