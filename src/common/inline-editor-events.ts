import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class InlineEditorEvents {
  //   onChange = new EventEmitter<any>();
  onSave = new EventEmitter<any>();
  onEdit = new EventEmitter<any>();
  onCancel = new EventEmitter<any>();
  onError = new EventEmitter<any>();
  onEnter = new EventEmitter<any>();
  onEscape = new EventEmitter<any>();
  onKeyPress = new EventEmitter<any>();
  onFocus = new EventEmitter<any>();
  onBlur = new EventEmitter<any>();
  onClick = new EventEmitter<any>();
}
