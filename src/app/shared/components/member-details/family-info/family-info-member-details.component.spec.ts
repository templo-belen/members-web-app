import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInfoMemberDetailsComponent } from './family-info-member-details.component';

describe('FamilyInfoMemberDetailsComponent', () => {
  let component: FamilyInfoMemberDetailsComponent;
  let fixture: ComponentFixture<FamilyInfoMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyInfoMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyInfoMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
