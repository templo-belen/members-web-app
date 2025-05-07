import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DewInfoMemberDetailsComponent } from './dew-info-member-details.component';

describe('DewInfoMemberDetailsComponent', () => {
  let component: DewInfoMemberDetailsComponent;
  let fixture: ComponentFixture<DewInfoMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DewInfoMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DewInfoMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
