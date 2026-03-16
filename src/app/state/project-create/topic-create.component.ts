import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TopicCreateFacade } from '../store/topic-create.facade';

@Component({
  standalone: true,
  selector: 'app-topic-create',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './topic-create.component.html'
})
export class TopicCreateComponent {

  private fb = inject(FormBuilder);
  facade = inject(TopicCreateFacade);

  form = this.fb.group({
    title: ['', Validators.required],
    emitter_type: ['', Validators.required],
    description: ['', Validators.required]
  });

  submit() {

    if (this.form.invalid) return;

    this.facade.createTopic(this.form.value as any);
  }

}