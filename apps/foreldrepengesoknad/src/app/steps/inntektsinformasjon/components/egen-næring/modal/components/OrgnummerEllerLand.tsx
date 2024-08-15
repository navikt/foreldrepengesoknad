import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Block, hasValue } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/fp-formik';

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
                    label={intl.formatMessage({ id: 'inntektsinformasjon.egenNæringModal.orgnr' })}
                    validate={validateEgenNæringOrgnr(intl)}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.land)}>
                <EgenNæringModalFormComponents.CountrySelect
                    name={EgenNæringModalFormField.land}
                    label={intl.formatMessage({ id: 'inntektsinformasjon.egenNæringModal.registrertILand' })}
                    useAlpha3Code={false}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.egenNæring.land' });
                        }

                        return undefined;
                    }}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
