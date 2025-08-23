// components/dashboard/EditProductWrapper.jsx
"use client";
import { useParams, useNavigate } from "react-router-dom";
import EditProductForm from "./EditProductForm";
import { useGetProductByIdQuery } from "../../redux/slices/product/productsApi";

const EditProductWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: product, isLoading } = useGetProductByIdQuery(id);

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Product...</p>
        </div>
    </div>;
    if (!product) return <p className="p-4">Product not found</p>;

    return (
        <EditProductForm
            product={product}
            onClose={() => navigate("/dashboard/products")}
        />
    );
};

export default EditProductWrapper;
