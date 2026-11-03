import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';
import { useNullstillOpplastingVedUnmount } from './useNullstillOpplastingVedUnmount';

const vedlegg = [{ id: '1', filename: 'hello.png' } as Attachment];

const Wrapper = ({ children }: { children: ReactNode }) => {
    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: { [Skjemanummer.DOK_ARBEID_MOR]: vedlegg },
    });
    return <FormProvider {...formMethods}>{children}</FormProvider>;
};

describe('useNullstillOpplastingVedUnmount', () => {
    it('skal melde at ingen opplasting pågår når uploaderen avmonteres', () => {
        const updateAttachments = vi.fn();

        const { rerender, unmount } = renderHook(
            () => useNullstillOpplastingVedUnmount(Skjemanummer.DOK_ARBEID_MOR, updateAttachments),
            { wrapper: Wrapper },
        );
        rerender();

        expect(updateAttachments).not.toHaveBeenCalled();

        unmount();

        expect(updateAttachments).toHaveBeenCalledExactlyOnceWith(vedlegg, false);
    });
});
