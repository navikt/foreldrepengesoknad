import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringOrgnr } from './validation/egenNæringValidation';
import { getInputFeltFeil } from '../input-feilmelding/InputFeilmelding';
import {
    EgenNæringSubformComponents,
    EgenNæringSubformData,
    EgenNæringSubformField,
} from './subform/egenNæringSubformConfig';

interface Props {
    visibility: QuestionVisibility<EgenNæringSubformField, undefined>;
    orgNrFeil: string | undefined;
    submitClicked: boolean;
    formValues: Partial<EgenNæringSubformData>;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility, orgNrFeil, submitClicked, formValues }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringOrgnr)}>
                <EgenNæringSubformComponents.NumberInput
                    name={EgenNæringSubformField.egenNæringOrgnr}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæring.orgnr')}
                    validate={validateEgenNæringOrgnr(intl)}
                />
                {getInputFeltFeil(
                    submitClicked,
                    EgenNæringSubformField.egenNæringOrgnr,
                    formValues.egenNæringOrgnr,
                    intl,
                    orgNrFeil
                )}
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringLand)}>
                <EgenNæringSubformComponents.CountrySelect
                    name={EgenNæringSubformField.egenNæringLand}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæring.registrertILand')}
                    useAlpha3Code={false}
                />
                {getInputFeltFeil(
                    submitClicked,
                    EgenNæringSubformField.egenNæringLand,
                    formValues.egenNæringLand,
                    intl
                )}
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
