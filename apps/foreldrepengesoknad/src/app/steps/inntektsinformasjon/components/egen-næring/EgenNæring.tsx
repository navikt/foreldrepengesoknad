import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility, YesOrNo } from '@navikt/fp-formik';

import { Næring } from 'app/context/types/Næring';

import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import EgenNæringListe from './EgenNæringListe';
import HvemKanDriveMedEgenNæring from './HvemKanDriveMedEgenNæring';
import EgenNæringModal from './modal/EgenNæringModal';

interface Props {
    egenNæringInformasjon: Næring[];
    setEgenNæringInformasjon: (oppdrag: Næring[]) => void;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const EgenNæring: FunctionComponent<Props> = ({
    egenNæringInformasjon,
    setEgenNæringInformasjon,
    visibility,
    formValues,
}) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNæring, setSelectedNæring] = useState<Næring>();

    const handleOnLeggTil = () => {
        setIsModalOpen(true);
        setSelectedNæring(undefined);
    };

    const addNæring = (næring: Næring) => {
        const updatedEgenNæringInformasjon = egenNæringInformasjon.concat(næring);

        setEgenNæringInformasjon(updatedEgenNæringInformasjon);
    };

    const deleteNæring = (næring: Næring) => {
        const updatedEgenNæringInformasjon = egenNæringInformasjon.filter((nær) => nær !== næring);

        setEgenNæringInformasjon(updatedEgenNæringInformasjon);
    };

    const editNæring = (næring: Næring) => {
        const updatedEgenNæringInformasjon = egenNæringInformasjon
            .filter((nær) => nær !== selectedNæring)
            .concat(næring);

        setEgenNæringInformasjon(updatedEgenNæringInformasjon);
    };

    const selectNæring = (næring: Næring) => {
        setSelectedNæring(næring);
        setIsModalOpen(true);
    };

    return (
        <>
            <Block visible={visibility.isVisible(InntektsinformasjonFormField.hattInntektSomNæringsdrivende)}>
                <Block padBottom="l">
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.hattInntektSomNæringsdrivende}
                        legend={intlUtils(intl, 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd')}
                        validate={(hattInntektSomNæringsdrivende) => {
                            if (hattInntektSomNæringsdrivende === YesOrNo.YES) {
                                if (egenNæringInformasjon.length === 0) {
                                    return intlUtils(
                                        intl,
                                        'valideringsfeil.inntektsinformasjon.andreInntekter.måHaVirksomhet',
                                    );
                                }
                            }

                            return undefined;
                        }}
                    />
                    <HvemKanDriveMedEgenNæring />
                </Block>
            </Block>
            {formValues.hattInntektSomNæringsdrivende === YesOrNo.YES && (
                <div style={{ backgroundColor: '#f1f1f1', marginBottom: '1rem', padding: '1rem' }}>
                    <EgenNæringModal
                        isOpen={isModalOpen}
                        title="Næringsinformasjon"
                        onRequestClose={() => setIsModalOpen(false)}
                        selectedNæring={selectedNæring}
                        addNæring={addNæring}
                        editNæring={editNæring}
                    />
                    <Block padBottom="l" visible={egenNæringInformasjon.length > 0}>
                        <EgenNæringListe
                            næringsInformasjon={egenNæringInformasjon}
                            deleteNæring={deleteNæring}
                            selectNæring={selectNæring}
                        />
                    </Block>
                    <Button type="button" onClick={handleOnLeggTil}>
                        <FormattedMessage id="inntektsinformasjon.leggTilVirksomhet" />
                    </Button>
                </div>
            )}
        </>
    );
};

export default EgenNæring;
