import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringOrgnr } from '../../steps/egen-næring/egenNæringValidation';
import { EgenNæringFormComponents, EgenNæringFormField } from 'app/steps/egen-næring/egenNæringFormConfig';

interface Props {
    visibility: QuestionVisibility<EgenNæringFormField, undefined>;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringOrgnr)}>
                <EgenNæringFormComponents.NumberInput
                    style={{ width: 'var(--app-text-input-width)' }}
                    name={EgenNæringFormField.egenNæringOrgnr}
                    label={intlUtils(intl, 'egenNæring.orgnr')}
                    validate={validateEgenNæringOrgnr(intl)}
                />
            </Block>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringLand)}>
                <EgenNæringFormComponents.CountrySelect
                    style={{ width: 'var(--app-text-input-width)' }}
                    name={EgenNæringFormField.egenNæringLand}
                    label={intlUtils(intl, 'egenNæring.registrertILand')}
                    useAlpha3Code={false}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
