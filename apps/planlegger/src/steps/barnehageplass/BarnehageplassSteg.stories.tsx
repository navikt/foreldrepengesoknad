import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import BarnehageplassSteg from './BarnehageplassSteg';

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
        antallBarn: '1',
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
        termindato: '2024-09-01',
        antallBarn: '1',
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
        termindato: '2023-08-01',
        antallBarn: '1',
    },
};

export const FlereForsørgereAdoptertBarnFødtJanuarStartAugust = Template.bind({});
FlereForsørgereAdoptertBarnFødtJanuarStartAugust.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        antallBarn: '1',
        erAdoptert: true,
        erBarnetFødt: true,
        fødselsdato: '2024-02-11',
        overtakelsesdato: '2024-03-01',
        adopsjonsdato: '2024-02-10',
    },
};
