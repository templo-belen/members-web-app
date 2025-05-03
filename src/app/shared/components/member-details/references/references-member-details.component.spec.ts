import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesMemberDetailsComponent } from './references-member-details.component';

describe('ReferencesMemberDetailsComponent', () => {
  let component: ReferencesMemberDetailsComponent;
  let fixture: ComponentFixture<ReferencesMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencesMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
