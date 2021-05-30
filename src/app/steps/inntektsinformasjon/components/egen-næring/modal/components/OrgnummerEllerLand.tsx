import { Block } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import React, { FunctionComponent } from 'react';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility }) => {
    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.orgnr)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.orgnr}
                    label={'Hva er organisasjonsnummeret?'}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.land)}>
                <EgenNæringModalFormComponents.CountrySelect
                    name={EgenNæringModalFormField.land}
                    label={'I hvilket land er virksomheten din registrert i?'}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
