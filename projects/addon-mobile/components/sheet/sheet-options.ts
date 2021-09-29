import {InjectionToken} from '@angular/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export interface TuiSheetOptions<I = undefined> {
    readonly image: PolymorpheusContent<TuiSheetOptions<I>>;
    readonly imageSlide: boolean;
    readonly stops: readonly string[];
    readonly initial: number;
    readonly closeable: boolean;
    readonly overlay: boolean;
    readonly data: I;
}

export const TUI_SHEET_DEFAULT_OPTIONS: TuiSheetOptions = {
    image: '',
    imageSlide: true,
    stops: [],
    initial: 0,
    closeable: true,
    overlay: false,
    data: undefined,
};

export const TUI_SHEET_OPTIONS = new InjectionToken<TuiSheetOptions>(
    'Default parameters for sheet component',
    {
        factory: () => TUI_SHEET_DEFAULT_OPTIONS,
    },
);