import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaicInfoMemberDetailsComponent } from './baic-info-member-details.component';

describe('BaicInfoMemberDetailsComponent', () => {
  let component: BaicInfoMemberDetailsComponent;
  let fixture: ComponentFixture<BaicInfoMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaicInfoMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaicInfoMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
