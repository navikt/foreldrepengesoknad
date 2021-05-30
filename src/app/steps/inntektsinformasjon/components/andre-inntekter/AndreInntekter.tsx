import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { InntektsinformasjonFormComponents, InntektsinformasjonFormField } from '../../inntektsinformasjonFormConfig';

interface Props {
    andreInntekterInformasjon: any;
    setAndreInntekterInformasjon: any;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
}

const AndreInntekter: FunctionComponent<Props> = ({
    andreInntekterInformasjon,
    setAndreInntekterInformasjon,
    visibility,
}) => {
    const intl = useIntl();

    return (
        <Block visible={visibility.isVisible(InntektsinformasjonFormField.hattAndreInntekter)}>
            <InntektsinformasjonFormComponents.YesOrNoQuestion
                name={InntektsinformasjonFormField.hattAndreInntekter}
                legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
            />
        </Block>
    );
};

export default AndreInntekter;
