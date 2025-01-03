import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledisplayComponent } from './filedisplay.component';

describe('FiledisplayComponent', () => {
  let component: FiledisplayComponent;
  let fixture: ComponentFixture<FiledisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiledisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiledisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
