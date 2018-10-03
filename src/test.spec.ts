import { TestBed } from '@angular/core/testing';
import { InputTextModule } from '@inputs/text';

describe('test', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: []
    }).compileComponents();
  });

  it('library', () => {
    expect(true).toBe(true);
  });
});
