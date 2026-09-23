import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import ky from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { useFormMedUtkast } from '@navikt/fp-form-hooks';
import { EsPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, EsDataContext, useContextComplete, useContextReset } from './EsDataContext';
import { Path } from './paths';
import { useEsMellomlagring } from './useEsMellomlagring';

const personinfo: EsPersonopplysningerDto_fpoversikt = {
    fnr: '1',
    fødselsdato: '1990-01-01',
    kjønn: 'K',
    navn: { fornavn: 'Test', etternavn: 'Testesen' },
};

afterEach(() => vi.restoreAllMocks());

it('mellomlagrer ferske skjemaverdier og vedlegg uten å gjenbruke dem i en ny søknad', async () => {
    const post = vi.spyOn(ky, 'post').mockResolvedValue(new Response());
    const client = new QueryClient();
    const lagWrapper =
        (initialState: ContextDataMap) =>
        ({ children }: { children: ReactNode }) => (
            <MemoryRouter initialEntries={[Path.OM_BARNET]}>
                <QueryClientProvider client={client}>
                    <EsDataContext initialState={initialState}>{children}</EsDataContext>
                </QueryClientProvider>
            </MemoryRouter>
        );
    const { result, unmount } = renderHook(
        () => ({
            form: useFormMedUtkast('Barnet', { defaultValues: { dato: '', vedlegg: [{ uuid: '', file: {} }] } }),
            lagre: useEsMellomlagring(personinfo, vi.fn()),
            state: useContextComplete(),
        }),
        { wrapper: lagWrapper({ [ContextDataType.CURRENT_PATH]: Path.OM_BARNET }) },
    );
    let ferdig: Promise<void> | undefined;
    act(() => {
        result.current.form.setValue('dato', '12.0');
        result.current.form.setValue('vedlegg', [{ uuid: 'nytt-vedlegg', file: new File(['innhold'], 'vedlegg.pdf') }]);
        result.current.form.lagreUtkast?.();
        ferdig = result.current.lagre({ naviger: false });
    });
    await waitFor(() => expect(post).toHaveBeenCalledOnce());
    await ferdig;
    expect(post.mock.calls[0]?.[1]?.json).toMatchObject({
        SKJEMAUTKAST: { verdier: { dato: '12.0', vedlegg: [{ uuid: 'nytt-vedlegg' }] } },
    });
    expect(result.current.state[ContextDataType.OM_BARNET]).toBeUndefined();
    const lagretJson = JSON.stringify(post.mock.calls[0]?.[1]?.json);
    const lagret = JSON.parse(lagretJson) as ContextDataMap;
    expect(lagretJson).not.toContain('innhold');
    unmount();

    const gjenåpnet = renderHook(
        () => ({
            form: useFormMedUtkast('Barnet', { defaultValues: { dato: '', vedlegg: [] } }),
            reset: useContextReset(),
            state: useContextComplete(),
        }),
        { wrapper: lagWrapper(lagret) },
    );
    expect(gjenåpnet.result.current.form.getValues()).toEqual({
        dato: '12.0',
        vedlegg: [{ uuid: 'nytt-vedlegg', file: {} }],
    });
    act(() => gjenåpnet.result.current.reset());
    const nyState = gjenåpnet.result.current.state;
    expect(nyState[ContextDataType.SKJEMAUTKAST]).toBeUndefined();
    gjenåpnet.unmount();
    const nySøknad = renderHook(() => useFormMedUtkast('Barnet', { defaultValues: { dato: '', vedlegg: [] } }), {
        wrapper: lagWrapper(nyState),
    });
    expect(nySøknad.result.current.getValues()).toEqual({ dato: '', vedlegg: [] });
});
