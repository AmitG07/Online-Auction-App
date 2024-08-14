export interface Product {
    productId: number;
    name: string;
    description: string;
    startingPrice: number;
    reservedPrice: number;
    auctionEndTime: string;
    category: string;
    image?: string;
  }

  export interface ProductResponse {
    $id: string;
    totalCount: number;
    page: number;
    pageSize: number;
    products: {
      $id: string;
      $values: Product[];
    };
  }