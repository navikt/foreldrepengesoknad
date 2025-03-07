import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { isEmpty } from '@navikt/fp-validation';

import { Planperiode } from '../../../types/Planperiode';
import { getFomValidators, getTomValidators } from '../../../utils/dateValidators';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
    handleAddPeriode: (periode: Planperiode) => void;
    erBarnetFødt: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    familiehendelsedato,
    handleAddPeriode,
    erBarnetFødt,
}: Props) => {
    const intl = useIntl();
    const { fom, tom, kontoType, forelder } = modalData;
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: fom ?? '',
            tom: tom ?? '',
        },
    });

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    const onSubmit = () => {
        setModalData({
            ...modalData,
            fom: fomValue,
            tom: tomValue,
            currentStep: 'step2',
        });

        handleAddPeriode({
            fom: fomValue!,
            tom: tomValue!,
            id: `${fomValue} - ${tomValue} - ${kontoType}`,
            readOnly: false,
            kontoType: kontoType,
            forelder: forelder,
        });

        closeModal();
    };

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        validate={getFomValidators(intl, familiehendelsedato, kontoType, tomValue, erBarnetFødt)}
                        disableWeekends={true}
                        label="Fra og med dato"
                        name="fom"
                        defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
                    />
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        validate={getTomValidators(intl, familiehendelsedato, kontoType, erBarnetFødt)}
                        disableWeekends={true}
                        label="Til og med dato"
                        name="tom"
                        defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
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
                                setModalData({ ...modalData, currentStep: 'step1' });
                            }}
                        >
                            Gå tilbake
                        </Button>
                        <Button>Ferdig, legg til periode i planen</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
