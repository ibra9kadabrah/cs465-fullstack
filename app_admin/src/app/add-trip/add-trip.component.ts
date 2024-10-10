import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ["", Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate([''])
              .then(() => {
                window.location.reload();
              });
          },
          error: (error: any) => {
            console.error('Error:', error);
          }
        });
    }
  }

  // Getter for easy access to form fields
  get f() { 
    return this.addForm.controls; 
  }
}