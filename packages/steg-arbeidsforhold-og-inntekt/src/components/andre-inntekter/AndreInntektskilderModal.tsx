import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, Dialog, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm } from '@navikt/fp-form-hooks';

import { AndreInntekterFormValues, AndreInntektskilder, erFerdigUtfylt } from '../../types/AndreInntektskilder';
import { AndreInntektskilderFieldArray } from './AndreInntektskilderFieldArray';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AndreInntektskilder[];
    onSave: (values: AndreInntektskilder[]) => void;
};

export const AndreInntektskilderModal = ({ open, onOpenChange, initialValues, onSave }: Props) => {
    const formMethods = useForm<AndreInntekterFormValues>({
        defaultValues: {
            andreInntektskilder: initialValues.length > 0 ? initialValues : [{ type: undefined }],
        },
        shouldUnregister: true,
    });

    const handleSave = formMethods.handleSubmit((values) => {
        onSave(values.andreInntektskilder.filter(erFerdigUtfylt));
        onOpenChange(false);
    });

    useEffect(() => {
        if (open) {
            formMethods.reset({
                andreInntektskilder: initialValues.length > 0 ? initialValues : [{ type: undefined }],
            });
        }
    }, [formMethods, initialValues, open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Popup style={{ maxHeight: '85vh' }}>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="AndreInntektskilderModal.Tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <RhfForm
                    formMethods={formMethods}
                    onSubmit={(values) => {
                        onSave(values.andreInntektskilder.filter(erFerdigUtfylt));
                        onOpenChange(false);
                    }}
                >
                    <Dialog.Body style={{ maxHeight: 'calc(85vh - 10rem)', overflowY: 'auto' }}>
                        <VStack gap="space-40">
                            <ErrorSummaryHookForm />
                            <AndreInntektskilderFieldArray showControls={false} />
                        </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button type="button" variant="secondary">
                                <FormattedMessage id="AndreInntektskilderModal.Knapp.Avbryt" />
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button type="button" onClick={() => void handleSave()}>
                            <FormattedMessage id="AndreInntektskilderModal.Knapp.Lagre" />
                        </Button>
                    </Dialog.Footer>
                </RhfForm>
            </Dialog.Popup>
        </Dialog>
    );
};
