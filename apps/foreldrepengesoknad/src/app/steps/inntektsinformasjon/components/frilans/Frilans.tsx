import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Block, date20YearsAgo, dateToday, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import { validateFrilansoppstartsDato } from '../../validation/inntektsinformasjonValidering';
import HvemKanVæreFrilanser from './HvemKanVæreFrilanser';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const Frilans: FunctionComponent<Props> = ({ visibility, formValues }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)}>
                <InntektsinformasjonFormComponents.YesOrNoQuestion
                    name={InntektsinformasjonFormField.hattInntektSomFrilans}
                    legend={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd')}
                />
                <HvemKanVæreFrilanser />
            </Block>

            {formValues.hattInntektSomFrilans === YesOrNo.YES && (
                <div style={{ backgroundColor: '#f1f1f1', marginBottom: '1rem', padding: '1rem' }}>
                    <Block
                        padBottom="l"
                        visible={visibility.isVisible(InntektsinformasjonFormField.frilansOppstartsDato)}
                    >
                        <InntektsinformasjonFormComponents.DatePicker
                            name={InntektsinformasjonFormField.frilansOppstartsDato}
                            label={intlUtils(intl, 'inntektsinformasjon.frilans.oppstart')}
                            validate={validateFrilansoppstartsDato(intl)}
                            maxDate={dateToday}
                            minDate={date20YearsAgo}
                            dropdownCaption={true}
                        />
                    </Block>
                    <Block
                        padBottom="l"
                        visible={visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)}
                    >
                        <InntektsinformasjonFormComponents.YesOrNoQuestion
                            name={InntektsinformasjonFormField.jobberFremdelesSomFrilanser}
                            legend={intlUtils(intl, 'inntektsinformasjon.frilans.jobberFremdelesSomFrilans')}
                        />
                    </Block>
                </div>
            )}
        </>
    );
};

export default Frilans;
