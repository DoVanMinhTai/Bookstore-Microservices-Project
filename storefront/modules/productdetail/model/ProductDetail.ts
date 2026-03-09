export type ProductDetail = {
    id: number;
    name: string;
    brandName: string;
    productCategories: string[];
    shorTDescription: string;
    description: string;
    specification: string;
    isPublished: boolean;
    isFeatured: boolean;
    price: number;
    thumbnailMediaUrl: string;
    productImageMediaUrl: string[];
    availability: number;
    discountPercentage: number;
    itemWeight: number;
    numPages: number;
    publishDate: Date;
    ratingsCount: number;
    stockQuantity: number;
    isbn13: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    slug: string;
    packageDimensions: string;
}