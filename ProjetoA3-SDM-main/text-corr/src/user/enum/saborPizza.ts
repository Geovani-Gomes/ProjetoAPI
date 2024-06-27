export enum SaborPizza {
    CALABRESA = "CALABRESA",
    PORTUGUESA = "PORTUGUESA",
    MUÇARELA = "MUÇARELA",
    FRANGO_CATUPIRY = "FRANGO_CATUPIRY",
    NUTELLA = "NUTELLA",
    ROMEU_JULIETA = "ROMEU_JULIETA"
  }
  
  export const PrecoPizza = {
    [SaborPizza.CALABRESA] : 45.00, 
    [SaborPizza.PORTUGUESA] : 50.00, 
    [SaborPizza.MUÇARELA] : 40.00,
    [SaborPizza.FRANGO_CATUPIRY] : 50.00,
    [SaborPizza.NUTELLA] : 50.00,
    [SaborPizza.ROMEU_JULIETA] : 45.00
  };