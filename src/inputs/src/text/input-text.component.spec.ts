import { InputTextComponent } from '@inputs/text/input-text.component';
import {
  createHostComponentFactory,
  SpectatorWithHost,
} from '@netbasal/spectator';
import {
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
} from '@qontu/ngx-inline-editor';
import { FormsModule, NgControl, NgModel } from '@angular/forms';
import { Config } from '@inputs/base/store/reducers/config.reducer';
import { InputTextConfig } from './input-text.config';

describe('InputTextComponent', () => {
  const hostConfig = {
    component: InputTextComponent,
    imports: [FormsModule],
    providers: [
      InlineEditorEvents,
      {
        provide: NgControl,
        useClass: NgModel,
      },
      {
        provide: INLINE_EDITOR_TEMPLATE_CONFIG,
        useValue: {
          max: 10,
          min: 5,
        },
      },
    ],
  };

  const createHost = createHostComponentFactory(hostConfig);

  let host: SpectatorWithHost<InputTextComponent>;

  beforeEach(() => {
    host = createHost(`<inline-editor-text></inline-editor-text>`);
    host.component.registerOnChange(jest.fn());
  });

  it('should create the component', () => {
    expect(host).toBeTruthy();
  });

  describe(`when it's initialized`, () => {
    const initState: Config = {
      dirty: '',
      isCanceled: false,
      isDisabled: false,
      isEditing: false,
      isInvalid: false,
      hasChanged: false,
      value: '',
    };

    const initStateCopy = { ...initState };

    it('should have the input native element', () => {
      expect(host.component.input).toBeTruthy();
      expect(host.component.input).toEqual(jasmine.any(HTMLInputElement));
    });

    it('should have the init state', () => {
      expect(host.component.getState()).toEqual(initState);
    });

    // TODO(Toni): each property
    it('should change the dirty value (only) when the input is modified', () => {
      host.typeInElement('test', host.component.input);

      expect(host.component.getState()).toEqual({
        ...initState,
        dirty: 'test',
      });
    });

    // Last test of this block
    it('initState should not been modified (inmutable)', () => {
      expect(initState).toEqual(initStateCopy);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      host.patchElementFocus(host.component.input);
    });

    it.each`
      event          | fn           | times
      ${'focus'}     | ${'onFocus'} | ${1}
      ${'blur'}      | ${'onBlur'}  | ${1}
      ${'mouseup'}   | ${'onClick'} | ${0}
      ${'mousedown'} | ${'onClick'} | ${0}
      ${'click'}     | ${'onClick'} | ${1}
    `(
      '($event) should call $fn function $times times',
      ({ event, fn, times }) => {
        // host.component[fn] = jest.fn();
        host.get(InlineEditorEvents)[fn].emit = jest.fn();

        if (event === 'click') {
          // host.click(host.component.input);
          host.component.input.click();
          host.detectChanges();
        } else if (/mouse/.test(event)) {
          host.dispatchMouseEvent(host.component.input, event);
        } else {
          host.component.input[event]();
        }

        // expect(host.component[fn]).toHaveBeenCalledTimes(times);
        expect(host.get(InlineEditorEvents)[fn].emit).toHaveBeenCalledTimes(
          times,
        );
      },
    );
  });

  it('if the component is disabled, the input should be disabled', () => {
    host.component.setDisabledState(true);

    expect(host.component.getState().isDisabled).toBeTruthy();
    expect(host.component.input.disabled).toBeTruthy();
  });

  it('should override the default config if one is provided', () => {
    const config: InputTextConfig = {
      max: 10,
      min: 5,
    };

    expect(host.component.config.max).toBe(config.max);
    expect(host.component.config.min).toBe(config.min);
  });
});
