import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringOrgnr } from '../egenNæringValidation';
import { EgenNæringSubformComponents, EgenNæringSubformField } from 'app/steps/egen-næring/egenNæringSubformConfig';

interface Props {
    visibility: QuestionVisibility<EgenNæringSubformField, undefined>;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringSubformField.egenNæringOrgnr)}>
                <EgenNæringSubformComponents.NumberInput
                    name={EgenNæringSubformField.egenNæringOrgnr}
                    label={intlUtils(intl, 'egenNæring.orgnr')}
                    validate={validateEgenNæringOrgnr(intl)}
                />
            </Block>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringSubformField.egenNæringLand)}>
                <EgenNæringSubformComponents.CountrySelect
                    name={EgenNæringSubformField.egenNæringLand}
                    label={intlUtils(intl, 'egenNæring.registrertILand')}
                    useAlpha3Code={false}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
