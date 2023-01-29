import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointLocation } from 'src/app/models/api.models';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-location-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css'],
})
export class LocationDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PointLocation
  ) {}

  ngOnInit(): void {
    this.createForm(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  hasCoordsError(controlName: 'lat' | 'lng'): boolean {
    return (
      this.touched(controlName) && this.hasError(controlName, ['max', 'min'])
    );
  }

  hasRequiredError(controlName: 'lat' | 'lng' | 'name'): boolean {
    return this.touched(controlName) && this.hasError(controlName, 'required');
  }

  private hasError(
    controlName: 'lat' | 'lng' | 'name',
    errors: string[] | string
  ): boolean {
    const control = this.control(controlName);
    const errorsList = Array.isArray(errors) ? errors : [errors];
    const result = errorsList.map((error) => control.hasError(error));

    return result.some(Boolean);
  }

  private control(value: 'lat' | 'lng' | 'name'): AbstractControl {
    return this.form.get(value)!;
  }

  private touched(value: 'lat' | 'lng' | 'name'): boolean {
    return this.control(value).touched;
  }

  private createForm({ name, coordinates: [lat, lng] }: PointLocation): void {
    this.form = this.fb.group({
      name: [name.trim(), [Validators.required]],
      lat: [
        lat,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      lng: [
        lng,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
    });

    console.log(this.form);
  }

  private get value(): PointLocation {
    const { name, lat, lng } = this.form.getRawValue();

    return {
      name,
      coordinates: [lat, lng],
    };
  }
}
