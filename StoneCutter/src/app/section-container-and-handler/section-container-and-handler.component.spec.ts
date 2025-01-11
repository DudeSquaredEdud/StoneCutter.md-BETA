import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContainerAndHandlerComponent } from './section-container-and-handler.component';

describe('SectionContainerAndHandlerComponent', () => {
  let component: SectionContainerAndHandlerComponent;
  let fixture: ComponentFixture<SectionContainerAndHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionContainerAndHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionContainerAndHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
