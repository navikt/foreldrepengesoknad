import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringLand, validateEgenNæringOrgnr } from '../egenNæringValidation';
import { EgenNæringFormComponents, EgenNæringFormField } from 'app/steps/egen-næring/egenNæringFormConfig';

interface Props {
    visibility: QuestionVisibility<EgenNæringFormField, undefined>;
    orgNummerErValgfritt: boolean;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility, orgNummerErValgfritt }) => {
    const intl = useIntl();
    const orgNrSpm = intlUtils(intl, 'egenNæring.orgnr');
    const orgNrLabel = orgNummerErValgfritt ? `${orgNrSpm} ${intlUtils(intl, 'valgfritt')}` : orgNrSpm;
    return (
        <>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringOrgnr)}>
                <EgenNæringFormComponents.NumberInput
                    style={{ width: 'var(--app-text-input-width)' }}
                    name={EgenNæringFormField.egenNæringOrgnr}
                    label={orgNrLabel}
                    validate={validateEgenNæringOrgnr(intl, orgNummerErValgfritt)}
                />
            </Block>
            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringLand)}>
                <EgenNæringFormComponents.CountrySelect
                    style={{ width: 'var(--app-text-input-width)' }}
                    name={EgenNæringFormField.egenNæringLand}
                    label={intlUtils(intl, 'egenNæring.registrertILand')}
                    useAlpha3Code={false}
                    validate={validateEgenNæringLand(intl)}
                />
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
