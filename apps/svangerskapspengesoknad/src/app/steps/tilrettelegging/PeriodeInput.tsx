import { TrashIcon } from '@navikt/aksel-icons';
import { Button, DatePicker, TextField, useDatepicker } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';
import { useRef } from 'react';
// import { useIntl } from 'react-intl';

interface Props {
    showDeleteButton: boolean;
    periode: TilretteleggingInput;
    perioder: TilretteleggingInput[];
    behovForTilretteleggingFom: string;
    setPerioder: any;
    // datoAvgrensninger: DatoAvgrensninger;
    onDelete: () => void;
}

const PeriodeInput: React.FunctionComponent<Props> = ({
    showDeleteButton,
    periode,
    perioder,
    behovForTilretteleggingFom,
    onDelete,
    setPerioder,
    // datoAvgrensninger,
}) => {
    // const intl = useIntl();

    const stillingsprosentRef = useRef(null);
    const {
        datepickerProps: datepickerFomProps,
        inputProps: inputFomProps,
        selectedDay: selectedFom,
    } = useDatepicker({
        fromDate: new Date(behovForTilretteleggingFom),
        onDateChange: () => {
            console.log('Fom date change');
        },
    });

    const {
        datepickerProps: datepickerTomProps,
        inputProps: inputTomProps,
        selectedDay: selectedTom,
    } = useDatepicker({
        fromDate: new Date(behovForTilretteleggingFom),
        onDateChange: () => console.log('Tom date change'),
    });

    const onSelectFom = () => {
        const nyeperioder = perioder.map((p) => {
            if (p !== periode) {
                return p;
            } else {
                return { ...p, fom: selectedFom };
            }
        });
        console.log('nye perioder: ', nyeperioder);
        setPerioder(nyeperioder);
        console.log('Selected!!!');
    };
    console.log('Selected fom: ', selectedFom);
    console.log('Selected tom: ', selectedTom);
    return (
        <Block padBottom="s">
            <div>
                <Block padBottom="l">
                    <DatePicker {...datepickerFomProps}>
                        <DatePicker.Input
                            {...inputFomProps}
                            label="Fra dato"
                            defaultValue={periode.fom}
                            onSelect={onSelectFom}
                        />
                    </DatePicker>
                </Block>
                <Block padBottom="l">
                    <DatePicker {...datepickerTomProps}>
                        <DatePicker.Input {...inputTomProps} label="Til dato" defaultValue={periode.fom} />
                    </DatePicker>
                </Block>

                <Block padBottom="l">
                    <TextField
                        label="Oppgi stillingsprosent"
                        ref={stillingsprosentRef}
                        defaultValue={periode.stillingsprosent}
                    />
                </Block>

                {showDeleteButton && (
                    <Block padBottom="l">
                        <Button
                            aria-label="slett periode med tilrettelegging"
                            variant="secondary"
                            // className={bem.element('slett')}
                            icon={<TrashIcon aria-hidden />}
                            onClick={onDelete}
                        />
                    </Block>
                )}
                <Block padBottom="l">
                    <hr></hr>
                </Block>
            </div>
        </Block>
    );
};

export default PeriodeInput;
