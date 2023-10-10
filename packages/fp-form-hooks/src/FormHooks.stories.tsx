import { useForm } from 'react-hook-form';
import { Radio, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { StoryFn } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Form, Datepicker, Select, RadioGroupPanel } from '../index';

export default {
    title: 'FormHooks',
};

const Template: StoryFn = () => {
    const formMethods = useForm({
        defaultValues: {
            radiopre: true,
            testSelectFieldpre: 'value3',
            datepickerFieldPre: '2022-10-22',
        },
    });

    const stateVerdier = formMethods.watch();

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10" align="start">
                <RadioGroupPanel
                    name="radio"
                    description="Dette er en mer utfyllende tekst"
                    label="Dette er en radioknapp"
                >
                    <Radio value="verdi1">Verdi 1</Radio>
                    <Radio value="verdi2">Verdi 2</Radio>
                </RadioGroupPanel>
                <div>
                    <RadioGroupPanel
                        name="radiopre"
                        description="Dette er en radioknapp med preutfyllt verdi - beskrivelse"
                        label="Dette er en radioknapp med preutfyllt verdi"
                    >
                        <Radio value={true}>True</Radio>
                        <Radio value={false}>False</Radio>
                    </RadioGroupPanel>
                    <div>Valgt verdi: {stateVerdier.radiopre ? 'true' : 'false'}</div>
                </div>
                <Select
                    label="Dette er en dropdown"
                    name="testSelectField"
                    description="Dette er en nærmere beskrivelse"
                >
                    <option value="value1" key="1">
                        Test 1
                    </option>
                    <option value="value2" key="2">
                        Test 2
                    </option>
                </Select>
                <Select label="Dette er en dropdown der verdi er valgt" name="testSelectFieldpre">
                    <option value="value3" key="1">
                        Test 3
                    </option>
                    <option value="value4" key="2">
                        Test 4
                    </option>
                </Select>
                <Datepicker
                    label="Dette er en datepicker"
                    name="datepickerField"
                    description="Dette er en mer utfyllende tekst"
                    maxDate={dayjs().add(10, 'day').toDate()}
                    minDate={dayjs().subtract(10, 'day').toDate()}
                />
                <Datepicker label="Dette er en datepicker der verdi er valgt" name="datepickerFieldPre" />
            </VStack>
        </Form>
    );
};

export const VisFormkomponenter = Template.bind({});
