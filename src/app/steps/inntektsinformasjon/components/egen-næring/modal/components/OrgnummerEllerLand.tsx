import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';
import { validateEgenNæringOrgnr } from '../validation/egenNæringValidation';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.orgnr)}>
                <EgenNæringModalFormComponents.NumberInput
                    name={EgenNæringModalFormField.orgnr}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.orgnr')}
                    validate={validateEgenNæringOrgnr(intl)}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.land)}>
                <EgenNæringModalFormComponents.CountrySelect
                    name={EgenNæringModalFormField.land}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.registrertILand')}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
