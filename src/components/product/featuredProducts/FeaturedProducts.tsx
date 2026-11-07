import { fetchTopProducts } from "@/utils/actions/product/products";
import ProductList from "../ProductList/ProductList";
// import SectionTitle from "@/components/sectionTitle/SectionTitle";

const FeaturedProducts = async () => {
    const products = await fetchTopProducts();

    return (
        <div className="flex flex-col mx-auto">
            {/* <SectionTitle text="Featured Product" /> */}
            <ProductList products={products} />
        </div>
    );
};

export default FeaturedProducts;
