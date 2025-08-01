function resetFieldValue<FieldName extends string, FormValues>(
    fieldName: FieldName,
    setFieldValue: (field: string, value: any) => void,
    initialValues: FormValues,
) {
    setFieldValue(fieldName, (initialValues as any)[fieldName]);
}

function resetFieldValues<FieldName extends string, FormValues>(
    fieldNames: FieldName[],
    setFieldValue: (field: string, value: any) => void,
    initialValues: FormValues,
) {
    fieldNames.forEach((fieldName) => resetFieldValue(fieldName, setFieldValue, initialValues));
}
