import { ProdutoDto } from './produto.dto';

describe('ProdutoDto', () => {
  it('should be defined', () => {
    expect(new ProdutoDto()).toBeDefined();
  });
});
