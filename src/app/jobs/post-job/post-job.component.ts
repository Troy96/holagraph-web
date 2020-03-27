import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  jobPostForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private jservice:JobsService) {
    this.jobPostForm = new FormGroup({
      name: new FormControl("", Validators.required),
      job_role: new FormControl("", Validators.required),
      job_title: new FormControl("", Validators.required),
      desc: new FormControl("", Validators.required),
      salary_range: new FormControl("", Validators.required),
      skills_required: new FormControl("", Validators.required),
      emp_email: new FormControl("", Validators.required),
      job_state: new FormControl("", Validators.required),
      job_district: new FormControl("", Validators.required),
    });
   }
   compamy_data:any=[];
   submit()
   {
    this.jobPostForm.controls["name"].markAsTouched();
    this.jobPostForm.controls["job_role"].markAsTouched();
    this.jobPostForm.controls["job_title"].markAsTouched();
    this.jobPostForm.controls["desc"].markAsTouched();
    this.jobPostForm.controls["salary_range"].markAsTouched();
    this.jobPostForm.controls["skills_required"].markAsTouched();
    this.jobPostForm.controls["emp_email"].markAsTouched();
    this.jobPostForm.controls["job_state"].markAsTouched();
    this.jobPostForm.controls["job_district"].markAsTouched();

    if(this.jobPostForm.valid)
    {
      let obj:any={};
      //obj.company=(this.jobPostForm.get('name').value);
      obj.job_role=(this.jobPostForm.get('job_role').value);
      obj.job_title=(this.jobPostForm.get('job_title').value);
      obj.job_desc=(this.jobPostForm.get('desc').value);
      obj.salary=(this.jobPostForm.get('salary_range').value);
      obj.skills=(this.jobPostForm.get('skills_required').value);
      obj.company_mail=(this.jobPostForm.get('emp_email').value);
      obj.location_State=this.jobPostForm.get('job_state').value;
      obj.location_District =this.jobPostForm.get('job_district').value;
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      console.log(date);
      for(let i=1;i<this.compamy_data.length;i++)
      {
        if(this.compamy_data[i].name==(this.jobPostForm.get('name').value))
        {
          obj.company = this.compamy_data[i].id;
          break;
        }
      }
      obj.date_posted = date;
      this.jservice.create_job(obj).subscribe((data:any)=>{
        console.log(data);
      })
    }
   }
  ngOnInit() {
   this.jservice.get_companies().subscribe((data:any)=>{
    
     this.compamy_data=data.results;
     console.log(this.compamy_data);
   })
  }

}
