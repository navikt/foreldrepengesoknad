import { Block, ISOStringToDate, intlUtils, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    validateEgenNæringVarigEndringBeskrivelse,
    validateEgenNæringVarigEndringDato,
    validateEgenNæringVarigEndringInntekt,
} from '../egenNæringValidation';
import {
    EgenNæringFormComponents,
    EgenNæringFormData,
    EgenNæringFormField,
} from 'app/steps/egen-næring/egenNæringFormConfig';
import dayjs from 'dayjs';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH } from 'app/utils/validationUtils';
import { BodyShort, ReadMore } from '@navikt/ds-react';

interface Props {
    visibility: QuestionVisibility<EgenNæringFormField, undefined>;
    formValues: Partial<EgenNæringFormData>;
}

const VarigEndringSpørsmål: FunctionComponent<Props> = ({ visibility, formValues }) => {
    const intl = useIntl();
    const egenNæringVarigEndringBeskrivelseLabel = intlUtils(intl, 'egenNæring.varigEndringBeskrivelse.label');
    return (
        <>
            <Block
                padBottom="xxl"
                visible={visibility.isVisible(EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene)}
            >
                <EgenNæringFormComponents.YesOrNoQuestion
                    name={EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene}
                    legend={intlUtils(intl, 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene')}
                    validate={(value) =>
                        validateYesOrNoIsAnswered(
                            value,
                            intlUtils(intl, 'valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd'),
                        )
                    }
                />
                <ReadMore header={intlUtils(intl, 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel')}>
                    <BodyShort>
                        <FormattedMessage id="egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"></FormattedMessage>
                    </BodyShort>
                </ReadMore>
            </Block>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringVarigEndringDato)}>
                <EgenNæringFormComponents.DatePicker
                    name={EgenNæringFormField.egenNæringVarigEndringDato}
                    label={intlUtils(intl, 'egenNæring.egenNæringVarigEndringDato')}
                    placeholder={'dd.mm.åååå'}
                    fullscreenOverlay={true}
                    showYearSelector={true}
                    validate={validateEgenNæringVarigEndringDato(
                        intl,
                        formValues.egenNæringFom!,
                        formValues.egenNæringTom,
                    )}
                    maxDate={dayjs().toDate()}
                    minDate={ISOStringToDate(formValues.egenNæringFom)}
                />
            </Block>
            <Block
                padBottom="xxl"
                visible={visibility.isVisible(EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring)}
            >
                <EgenNæringFormComponents.TextField
                    name={EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring}
                    label={intlUtils(intl, 'egenNæring.egenNæringVarigEndringInntektEtterEndring')}
                    description={intlUtils(intl, 'egenNæring.egenNæringVarigEndringInntektEtterEndring.description')}
                    validate={validateEgenNæringVarigEndringInntekt(intl)}
                    style={{ width: 'var(--app-text-input-width)' }}
                />
            </Block>
            <Block
                padBottom="xxl"
                visible={visibility.isVisible(EgenNæringFormField.egenNæringVarigEndringBeskrivelse)}
            >
                <EgenNæringFormComponents.Textarea
                    name={EgenNæringFormField.egenNæringVarigEndringBeskrivelse}
                    label={egenNæringVarigEndringBeskrivelseLabel}
                    minLength={TEXT_INPUT_MIN_LENGTH}
                    maxLength={TEXT_INPUT_MAX_LENGTH}
                    validate={validateEgenNæringVarigEndringBeskrivelse(intl, egenNæringVarigEndringBeskrivelseLabel)}
                />
            </Block>
        </>
    );
};

export default VarigEndringSpørsmål;
