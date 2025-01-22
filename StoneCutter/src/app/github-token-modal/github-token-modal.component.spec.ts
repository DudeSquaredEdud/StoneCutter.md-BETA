import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubTokenModalComponent } from './github-token-modal.component';

describe('GithubTokenModalComponent', () => {
  let component: GithubTokenModalComponent;
  let fixture: ComponentFixture<GithubTokenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubTokenModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
