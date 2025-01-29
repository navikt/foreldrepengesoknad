import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
    familiehendelsedato: string;
}

export const EndreTidsperiodeModalStep = ({ modalData, setModalData, closeModal }: Props) => {
    const intl = useIntl();
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            fom: values.fom,
            tom: values.tom,
            currentStep: 'step4',
        });
    };

    const tomValue = formMethods.watch('tom');

    return (
        <>
            <Heading size="medium">Hva vil du gjøre med perioden?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        label="Fra og med dato"
                        name="fom"
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.påkrevd' }),
                            ),
                            isValidDate(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.gyldigDato' }),
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.førTilDato' }),
                                tomValue,
                            ),
                        ]}
                    />
                    <RhfDatepicker
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.tom.påkrevd' }),
                            ),
                            isValidDate(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.tom.gyldigDato' }),
                            ),
                        ]}
                        label="Til og med dato"
                        name="tom"
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '1rem 0',
                    }}
                >
                    <div>
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Avbryt
                        </Button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setModalData({ ...modalData, currentStep: 'step2' });
                            }}
                        >
                            Gå tilbake
                        </Button>
                        <Button>Gå videre</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
