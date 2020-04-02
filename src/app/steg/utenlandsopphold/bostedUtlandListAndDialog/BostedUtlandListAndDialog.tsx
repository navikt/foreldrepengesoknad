import React from 'react';
import { FormikModalFormAndList, FormikValidateFunction, ModalFormAndListLabels } from '@navikt/sif-common-formik';
import BostedUtlandForm from './BostedUtlandForm';
import BostedUtlandListe from './BostedUtlandList';
import { BostedUtland } from './types';
import { sortItemsByFom } from 'app/util/dates/dates';

interface Props<FieldNames> {
    name: FieldNames;
    validate?: FormikValidateFunction;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
    erFremtidigOpphold: boolean;
}

function BostedUtlandListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    validate,
    labels,
    erFremtidigOpphold
}: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, BostedUtland>
            name={name}
            labels={labels}
            validate={validate}
            dialogWidth="narrow"
            sortFunc={sortItemsByFom}
            formRenderer={({ onSubmit, onCancel, item }) => (
                <BostedUtlandForm
                    bosted={item}
                    minDate={minDate}
                    maxDate={maxDate}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    erFremtidigOpphold={erFremtidigOpphold}
                />
            )}
            listRenderer={({ items, onEdit, onDelete }) => (
                <BostedUtlandListe bosteder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
        />
    );
}

export default BostedUtlandListAndDialog;
