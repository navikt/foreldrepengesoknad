import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { Alert, BodyShort, Checkbox as DsCheckbox, HStack, Heading, Label, Radio, VStack } from '@navikt/ds-react';

import { RhfCheckbox } from './RhfCheckbox';
import { RhfCheckboxGroup } from './RhfCheckboxGroup';
import { RhfCombobox } from './RhfCombobox';
import { RhfDateRangepicker } from './RhfDateRangepicker';
import { RhfDatepicker } from './RhfDatepicker';
import { RhfForm } from './RhfForm';
import { RhfRadioGroup } from './RhfRadioGroup';
import { RhfSelect } from './RhfSelect';
import { RhfTextField } from './RhfTextField';
import { RhfTextarea } from './RhfTextarea';

const meta = {
    title: 'FormHooks',
    render: () => {
        const formMethods = useForm({
            defaultValues: {
                radio: undefined,
                radiopre: true,
                testSelectField: undefined,
                testSelectFieldpre: 'value3',
                datepickerField: undefined,
                datepickerFieldPre: '2022-10-22',
                check: undefined,
                checkpre: true,
                textfield: undefined,
                textfieldpre: 'Har en tekst',
                textarea: undefined,
                textareapre: 'Har en tekst',
                checkpanel: undefined,
                checkpanelpre: ['test1', 'test2'],
                combobox: undefined,
                comboboxPre: 'Tekst 1',
                dateRangepickerFieldFromPre: '2024-08-01',
                dateRangepickerFieldToPre: '2024-09-22',
            },
        });

        const stateVerdier = formMethods.watch();

        return (
            <RhfForm formMethods={formMethods}>
                <HStack justify="space-between">
                    <VStack gap="space-28" align="start">
                        <RhfCheckbox name="check" control={formMethods.control} label="Dette er en checkbox" />
                        <RhfCheckbox
                            name="checkpre"
                            control={formMethods.control}
                            label="Dette er en checkbox som er valgt"
                        />
                        <RhfCheckboxGroup
                            name="checkpanel"
                            control={formMethods.control}
                            label="Dette er en gruppe med checkboxes"
                        >
                            <DsCheckbox value="test1">test1</DsCheckbox>
                            <DsCheckbox value="test2">test2</DsCheckbox>
                        </RhfCheckboxGroup>
                        <RhfCheckboxGroup
                            name="checkpanelpre"
                            control={formMethods.control}
                            label="Dette er en gruppe med checkboxes som er preutfyllt"
                        >
                            <DsCheckbox value="test1">test1</DsCheckbox>
                            <DsCheckbox value="test2">test2</DsCheckbox>
                        </RhfCheckboxGroup>
                        <RhfTextField name="textfield" control={formMethods.control} label="Dette er et tekstfelt" />
                        <RhfTextField
                            name="textfieldpre"
                            control={formMethods.control}
                            label="Dette er et tekstfelt med preutfyllt verdi"
                            description="Beskrivelse"
                        />
                        <RhfTextarea
                            name="textarea"
                            control={formMethods.control}
                            label="Dette er et tekstarea"
                            description="beskrivelse"
                        />
                        <RhfTextarea
                            name="textareapre"
                            control={formMethods.control}
                            label="Dette er et tekstarea som er preutfyllt"
                        />
                        <RhfCombobox
                            name="combobox"
                            control={formMethods.control}
                            label="Dette er en combobox"
                            options={['Valg 1', 'Valg 2', 'Tekst 1', 'Tekst 2']}
                        />
                        <RhfCombobox
                            name="comboboxPre"
                            control={formMethods.control}
                            label="Dette er en combobox der verdi er valgt"
                            options={['Valg 1', 'Valg 2', 'Tekst 1', 'Tekst 2']}
                        />
                        <RhfRadioGroup
                            name="radio"
                            control={formMethods.control}
                            description="Dette er en mer utfyllende tekst"
                            label="Dette er en radioknapp"
                        >
                            <Radio value="verdi1">Verdi 1</Radio>
                            <Radio value="verdi2">Verdi 2</Radio>
                        </RhfRadioGroup>
                        <RhfRadioGroup
                            name="radiopre"
                            control={formMethods.control}
                            description="Dette er en radioknapp med preutfyllt verdi - beskrivelse"
                            label="Dette er en radioknapp med preutfyllt verdi"
                        >
                            <Radio value={true}>True</Radio>
                            <Radio value={false}>False</Radio>
                        </RhfRadioGroup>
                        <RhfSelect
                            name="testSelectField"
                            control={formMethods.control}
                            label="Dette er en dropdown"
                            description="Dette er en nærmere beskrivelse"
                        >
                            <option value="value1" key="1">
                                Test 1
                            </option>
                            <option value="value2" key="2">
                                Test 2
                            </option>
                        </RhfSelect>
                        <RhfSelect
                            name="testSelectFieldpre"
                            control={formMethods.control}
                            label="Dette er en dropdown der verdi er valgt"
                        >
                            <option value="value3" key="1">
                                Test 3
                            </option>
                            <option value="value4" key="2">
                                Test 4
                            </option>
                        </RhfSelect>
                        <RhfDatepicker
                            name="datepickerField"
                            control={formMethods.control}
                            label="Dette er en datepicker"
                            description="Dette er en mer utfyllende tekst"
                            maxDate={dayjs().add(10, 'day').toDate()}
                            minDate={dayjs().subtract(10, 'day').toDate()}
                            showMonthAndYearDropdowns
                        />
                        <RhfDatepicker
                            name="datepickerFieldPre"
                            control={formMethods.control}
                            label="Dette er en datepicker der verdi er valgt"
                        />
                        <div>
                            <Heading size="small">dateRangepicker</Heading>
                            <RhfDateRangepicker
                                nameFrom="dateRangepickerFieldFrom"
                                nameTo="dateRangepickerFieldTo"
                                labelFrom="Fom"
                                labelTo="Tom"
                                useStrategyAbsolute
                            />
                        </div>
                        <div>
                            <Heading size="small">dateRangepicker med verdi</Heading>
                            <RhfDateRangepicker
                                nameFrom="dateRangepickerFieldFromPre"
                                nameTo="dateRangepickerFieldToPre"
                                labelFrom="Fom"
                                labelTo="Tom"
                                useStrategyAbsolute
                            />
                        </div>
                    </VStack>
                    <div>
                        <Alert variant="info">
                            <VStack gap="space-20">
                                <Label>Values in form state:</Label>
                                {Object.entries(stateVerdier).map((entry) => (
                                    <BodyShort key={entry[0]}>{entry[0] + ': ' + entry[1]?.toString()}</BodyShort>
                                ))}
                            </VStack>
                        </Alert>
                    </div>
                </HStack>
            </RhfForm>
        );
    },
} satisfies Meta;
export default meta;

export const VisFormkomponenter: StoryObj = {};
