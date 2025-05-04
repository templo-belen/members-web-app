import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoMemberDetailsComponent } from './general-info-member-details.component';

describe('GeneralInfoMemberDetailsComponent', () => {
  let component: GeneralInfoMemberDetailsComponent;
  let fixture: ComponentFixture<GeneralInfoMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInfoMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
