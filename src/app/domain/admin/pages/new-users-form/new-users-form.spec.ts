import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersForm } from './new-users-form';

describe('NewUsersForm', () => {
  let component: NewUsersForm;
  let fixture: ComponentFixture<NewUsersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
