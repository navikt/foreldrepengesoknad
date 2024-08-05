import { useFormikContext } from 'formik';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

interface Props<FormValues> {
    onChange: (values: FormValues) => void;
    delay?: number;
}

const useEffectOnce = (callback?: () => void) => {
    const [hasRun, setHasRun] = useState(false);
    useEffect(() => {
        if (callback) {
            if (!hasRun) {
                callback();
                setHasRun(true);
            }
        }
    }, [hasRun, callback]);
};

function FormikValuesObserver<FormValues>({ onChange, delay = 100 }: Props<FormValues>) {
    const { values } = useFormikContext<FormValues>();
    const prefValuesRef = useRef<any>();
    const [mounted, setMounted] = useState(false);

    const emitChanged = debounce((valuesChanged: FormValues) => {
        onChange(valuesChanged);
    }, delay);

    useEffect(() => {
        if (mounted) {
            if (!isEqual(prefValuesRef.current, values)) {
                emitChanged(values);
            }
        }
    }, [mounted, emitChanged, prefValuesRef, values]);

    useEffectOnce(() => {
        setMounted(true);
    });

    useEffect(() => {
        prefValuesRef.current = values;
    });

    return null;
}

export default FormikValuesObserver;
