import { Test, TestingModule } from '@nestjs/testing';
import { MapboxProvider } from './mapbox.provider';

describe('MapboxProvider', () => {
  let provider: MapboxProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapboxProvider],
    }).compile();

    provider = module.get<MapboxProvider>(MapboxProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
