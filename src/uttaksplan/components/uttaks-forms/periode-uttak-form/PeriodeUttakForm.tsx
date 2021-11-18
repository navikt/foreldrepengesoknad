import { Block } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import React, { FunctionComponent, useState } from 'react';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/utsettelse-tidsperiode-spørsmål/UtsettelseTidsperiodeSpørsmål';
import { Periode } from 'uttaksplan/types/Periode';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import { PeriodeUttakFormComponents } from './periodeUttakFormConfig';

interface Props {
    periode: Periode;
    familiehendelsesdato: Date;
}

const PeriodeUttakForm: FunctionComponent<Props> = ({ familiehendelsesdato, periode }) => {
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const { tidsperiode } = periode;

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    return (
        <PeriodeUttakFormComponents.FormikWrapper
            initialValues={{
                fom: dateToISOString(tidsperiode.fom),
                tom: dateToISOString(tidsperiode.tom),
            }}
            onSubmit={() => null}
            renderForm={() => {
                return (
                    <>
                        <Block visible={!isValidTidsperiode(tidsperiode)}>
                            <TidsperiodeForm
                                tidsperiode={tidsperiode}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={() => null}
                                ugyldigeTidsperioder={undefined}
                            />
                        </Block>
                        <Block visible={isValidTidsperiode(tidsperiode)}>
                            <TidsperiodeDisplay tidsperiode={tidsperiode} toggleVisTidsperiode={toggleVisTidsperiode} />
                            <UttakEndreTidsperiodeSpørsmål
                                periode={periode}
                                familiehendelsesdato={familiehendelsesdato}
                                ugyldigeTidsperioder={[]}
                                onBekreft={() => {
                                    toggleVisTidsperiode();
                                }}
                                changeTidsperiode={() => null}
                                tidsperiode={tidsperiode}
                                onAvbryt={() => toggleVisTidsperiode()}
                                visible={tidsperiodeIsOpen}
                            />
                        </Block>
                    </>
                );
            }}
        />
    );
};

export default PeriodeUttakForm;
