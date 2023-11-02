import { useForm } from 'react-hook-form';
import { Form } from '@navikt/fp-form-hooks';

const WithReactHookForm = (Story: any) => {
    const formMethods = useForm();
    return (
        <Form formMethods={formMethods}>
            <Story />
        </Form>
    );
};

export default WithReactHookForm;
