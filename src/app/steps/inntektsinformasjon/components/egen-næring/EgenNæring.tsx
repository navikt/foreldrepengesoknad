import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Næring } from 'app/context/types/Næring';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import HvemKanDriveMedEgenNæring from './HvemKanDriveMedEgenNæring';
import EgenNæringModal from './modal/EgenNæringModal';

interface Props {
    egenNæringInformasjon: Næring[];
    setEgenNæringsInformasjon: (oppdrag: Næring[]) => void;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const EgenNæring: FunctionComponent<Props> = ({
    egenNæringInformasjon,
    setEgenNæringsInformasjon,
    visibility,
    formValues,
}) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [_, setSelectedNæring] = useState<Næring>();

    const handleOnLeggTil = () => {
        setIsModalOpen(true);
        setSelectedNæring(undefined);
    };

    return (
        <>
            <Block
                padBottom="l"
                visible={visibility.isVisible(InntektsinformasjonFormField.hattInntektSomNæringsdrivende)}
            >
                <InntektsinformasjonFormComponents.YesOrNoQuestion
                    name={InntektsinformasjonFormField.hattInntektSomNæringsdrivende}
                    legend={intlUtils(intl, 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd')}
                    description={<HvemKanDriveMedEgenNæring />}
                />
            </Block>
            {formValues.hattInntektSomNæringsdrivende === YesOrNo.YES && (
                <div style={{ backgroundColor: '#e9e7e7', marginBottom: '1rem', padding: '1rem' }}>
                    <Knapp onClick={handleOnLeggTil}>
                        <FormattedMessage id="inntektsinformasjon.leggTilOppdrag" />
                    </Knapp>
                    <EgenNæringModal
                        isOpen={isModalOpen}
                        title="Næringsinformasjon"
                        onRequestClose={() => setIsModalOpen(false)}
                    />
                </div>
            )}
        </>
    );
};

export default EgenNæring;
