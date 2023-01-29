import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointLocation } from 'src/app/models/api.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControlErrors,
  ReservedStringValidator,
} from 'src/app/validators/global.validators';

export interface LocationDataDialogConfig extends PointLocation {
  reservedNames: readonly string[];
}

export type LocationDialogCoordControl = 'lat' | 'lng';
export type LocationDialogControl = LocationDialogCoordControl | 'name';

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
    @Inject(MAT_DIALOG_DATA) public data: LocationDataDialogConfig
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

  hasCoordsError(controlName: LocationDialogCoordControl): boolean {
    return (
      this.touched(controlName) &&
      this.hasError(controlName, [FormControlErrors.MAX, FormControlErrors.MIN])
    );
  }

  hasRequiredError(controlName: LocationDialogControl): boolean {
    return (
      this.touched(controlName) &&
      this.hasError(controlName, FormControlErrors.REQUIRED)
    );
  }

  hasUniqueError(controlName: LocationDialogControl): boolean {
    return (
      this.touched(controlName) &&
      this.hasError(controlName, FormControlErrors.UNIQUE)
    );
  }

  private hasError(
    controlName: LocationDialogControl,
    errors: string[] | string
  ): boolean {
    const control = this.control(controlName);
    const errorsList = Array.isArray(errors) ? errors : [errors];
    const result = errorsList.map((error) => control.hasError(error));

    return result.some(Boolean);
  }

  private control(value: LocationDialogControl): AbstractControl {
    return this.form.get(value)!;
  }

  private touched(value: LocationDialogControl): boolean {
    return this.control(value).touched;
  }

  private createForm({
    name,
    coordinates: [lat, lng],
    reservedNames,
  }: LocationDataDialogConfig): void {
    const names = name
      ? reservedNames.filter((reserved) => reserved !== name)
      : reservedNames;
    this.form = this.fb.group({
      name: [
        name.trim(),
        [Validators.required, ReservedStringValidator(names)],
      ],
      lat: [
        lat,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      lng: [
        lng,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
    });
  }

  private get value(): PointLocation {
    const { name, lat, lng } = this.form.getRawValue();

    return {
      name,
      coordinates: [lat, lng],
    };
  }
}
