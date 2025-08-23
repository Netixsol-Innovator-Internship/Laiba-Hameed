"use client"
import { useState } from "react"
import { useUpdateProductMutation } from "../../redux/slices/product/productsApi"

const EditProductForm = ({ product, onClose }) => {
    // Prefill product data
    const [name, setName] = useState(product?.name || "")
    const [variants, setVariants] = useState(product?.variants || [])

    const [updateProduct, { isLoading }] = useUpdateProductMutation()

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants]
        updated[index] = { ...updated[index], [field]: value } 
        setVariants(updated)
    }


    const handleRemoveVariant = (variantId, index) => {
        if (variantId) {
            // Existing variant from DB
            setVariants((prev) => prev.filter((v) => v._id !== variantId))
        } else {
            // New variant (not saved yet)
            setVariants((prev) => prev.filter((_, i) => i !== index))
        }
    }

    const handleAddVariant = () => {
        setVariants((prev) => [...prev, { weight: "", price: "" }])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Separate add/update/remove for backend
        const addVariants = variants
            .filter((v) => !v._id) // new ones
            .map((v) => ({ weight: v.weight, price: Number(v.price) }))

        const updateVariants = variants
            .filter((v) => v._id) // existing ones
            .map((v) => ({
                variantId: v._id,
                weight: v.weight,
                price: Number(v.price),
            }))

        const removeVariants = product.variants.filter((v) => !variants.find((nv) => nv._id === v._id)).map((v) => v._id)

        await updateProduct({
            id: product._id,
            name,
            updateVariants,
            removeVariants,
            addVariants,
            token: localStorage.getItem("token"),
        })

        onClose?.()
    }

    return (
        <div className=" flex items-center justify-center p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-8 transform transition-all duration-300 scale-100"
            >
                <div className="text-center border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Edit Product
                    </h2>
                    <p className="text-gray-500 mt-2">Update your product details and variants</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Product Name</label>
                    <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name..."
                        required
                    />
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">Product Variants</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {variants.length} variant{variants.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {variants.map((variant, index) => (
                            <div
                                key={variant._id || index}
                                className="group bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 hover:border-blue-300 p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Weight</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 250g, 1kg"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                                            value={variant.weight}
                                            onChange={(e) => handleVariantChange(index, "weight", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Price</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                                            value={variant.price}
                                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-6 w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                                        onClick={() => handleRemoveVariant(variant._id, index)}
                                        title="Remove variant"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddVariant}
                        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-200 hover:bg-blue-50 flex items-center justify-center gap-2 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Variant
                    </button>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProductForm
