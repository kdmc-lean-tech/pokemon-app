import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { requiredFileType } from '../../../../shared/validators/form-validators.utils';
import { editorConfig } from '../../../../shared/constants/global.constants';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upload-pokemon-image',
  templateUrl: './upload-pokemon-image.component.html',
  styleUrls: ['./upload-pokemon-image.component.scss']
})
export class UploadPokemonImageComponent implements OnInit {
  public editorConfig: AngularEditorConfig;
  public form: FormGroup;
  public previuosFile: FileReader;
  public subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {
    const angularEditorConfig = editorConfig;
    angularEditorConfig.height = '300px';
    this.editorConfig = angularEditorConfig;
  }

  ngOnInit(): void {
    this.createForm();
    this.listenFileUpload();
  }

  public createForm() {
    this.form = this.fb.group({
      description: new FormControl(null, [Validators.required]),
      file: [null, [Validators.required, requiredFileType('png', 'jpg', 'jpeg')]],
      fileReader: [null]
    });
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  get file() {
    return this.form.get('file') as FormControl;
  }

  get fileReader() {
    return this.form.get('fileReader') as FormControl;
  }

  public showPreviousImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file.value);
    reader.onload = (event: any) => {
      this.previuosFile = event.target.result;
      this.form.get('fileReader').setValue(this.previuosFile);
    };
  }

  private listenFileUpload() {
    this.subscriptions.add(
      this.file.valueChanges.pipe(
        first()
      ).subscribe(() => {
        this.file.enable();
      })
    );
    this.subscriptions.add(
      this.file.valueChanges.subscribe(file => {
        if (file) {
          this.showPreviousImage();
        }
      })
    );
  }
}
