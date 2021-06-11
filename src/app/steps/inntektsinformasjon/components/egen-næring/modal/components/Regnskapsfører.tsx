import React, { FunctionComponent } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';
import { Block, intlUtils } from '@navikt/fp-common';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { FormattedMessage, useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { validateNumber } from '../validation/egenNæringValidation';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const Regnskapsfører: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.harRegnskapsfører)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.harRegnskapsfører}
                    legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.harRegnskapsfører')}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.navnRegnskapsfører)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.navnRegnskapsfører}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.regnskapsførerNavn')}
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
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.egenNæringModal.regnskapsførerVeileder" />
                    </Normaltekst>
                </Veilederpanel>
            </Block>
        </>
    );
};

export default Regnskapsfører;
