export interface ComboItemResponseStub {
  simpleProductId: number;
  simpleProductName: string;
  quantity: number;
}

export interface ProductIngredientResponse {
  ingredientId: number;
  ingredientName: string;
  unitName: string;
  unitSymbol: string;
  quantity: number;
}

export interface ProductExtraResponse {
  id: number;
  name: string;
  price: number;
}

// Interfaz Principal
export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number; 
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  preparationTimeMinutes: number;
  ingredients: ProductIngredientResponse[];
  active: boolean;

  rating: number;

  extras: ProductExtraResponse[];

  isCombo: boolean;
  comboItems: ComboItemResponseStub[];
}
