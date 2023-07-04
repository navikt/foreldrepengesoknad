import { FunctionComponent } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateNumber } from '../validation/egenNæringValidation';
import { validateRequiredTextInputField } from 'app/utils/validationUtil';
import { BodyShort, GuidePanel } from '@navikt/ds-react';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const Regnskapsfører: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();
    const regnskapsførerNavnLabel = intlUtils(intl, 'inntektsinformasjon.egenNæringModal.regnskapsførerNavn');

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.harRegnskapsfører)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.harRegnskapsfører}
                    legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.harRegnskapsfører')}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.navnRegnskapsfører)}>
                <EgenNæringModalFormComponents.TextField
                    name={EgenNæringModalFormField.navnRegnskapsfører}
                    maxLength={100}
                    label={regnskapsførerNavnLabel}
                    validate={validateRequiredTextInputField(regnskapsførerNavnLabel, intl)}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.telefonRegnskapsfører)}>
                <EgenNæringModalFormComponents.NumberInput
                    name={EgenNæringModalFormField.telefonRegnskapsfører}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.regnskapsførerTlf')}
                    validate={validateNumber(
                        intl,
                        'valideringsfeil.inntektsinformasjon.regnskapsførerTelefonnummer.ugyldigFormat'
                    )}
                />
            </Block>
            <Block
                padBottom="l"
                visible={visibility.isVisible(EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie)}
            >
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie}
                    legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.regnskapsførerNærVennEllerFamilie')}
                />
            </Block>
            <Block
                padBottom="l"
                visible={visibility.isVisible(EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie)}
            >
                <GuidePanel>
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.egenNæringModal.regnskapsførerVeileder" />
                    </BodyShort>
                </GuidePanel>
            </Block>
        </>
    );
};

export default Regnskapsfører;
