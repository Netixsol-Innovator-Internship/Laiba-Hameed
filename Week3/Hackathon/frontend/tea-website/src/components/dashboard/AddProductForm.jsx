"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useCreateProductMutation } from "../../redux/slices/product/productsApi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { getUser } from "../../redux/slices/auth/authSlice"
import { useState } from "react"
import { X, Plus, Package, FileText, Zap, Leaf, Hash, Tag, Upload, Save } from "lucide-react"

// ✅ Validation schema
const schema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    caffeine: yup.string().oneOf(["Low Caffeine", "High Caffeine", "Medium Caffeine", "No Caffeine"]).required(),
    organic: yup.boolean(),
    stock: yup.number().min(0, "Stock cannot be negative"),
    image: yup.mixed().test("required", "Product image is required", (value) => value && value.length > 0),
})

const AddProductForm = () => {
    const navigate = useNavigate()
    const [createProduct, { isLoading }] = useCreateProductMutation()
    const user = useSelector(getUser)

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            variants: [{ weight: "", price: "" }],
            attributes: [{ key: "", values: [] }],
            ingredients: [],
        },
    })

    const {
        fields: variantFields,
        append: addVariant,
        remove: removeVariant,
    } = useFieldArray({
        control,
        name: "variants",
    })

    const {
        fields: attributeFields,
        append: addAttribute,
        remove: removeAttribute,
    } = useFieldArray({
        control,
        name: "attributes",
    })

    // ✅ ingredients handled as tags
    const [ingredientInput, setIngredientInput] = useState("")

    const handleIngredientKeyDown = (e) => {
        if (e.key === "Enter" && ingredientInput.trim() !== "") {
            e.preventDefault()
            const current = getValues("ingredients") || []
            setValue("ingredients", [...current, ingredientInput.trim()])
            setIngredientInput("")
        }
    }

    const removeIngredient = (ing) => {
        const current = getValues("ingredients") || []
        setValue(
            "ingredients",
            current.filter((i) => i !== ing),
        )
    }

    // ✅ attributes values as tags
    const handleAttributeTagKeyDown = (e, index) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault()
            const newTag = e.target.value.trim()
            const current = getValues(`attributes.${index}.values`) || []
            setValue(`attributes.${index}.values`, [...current, newTag])
            e.target.value = ""
        }
    }

    const removeAttributeTag = (index, tag) => {
        const current = getValues(`attributes.${index}.values`) || []
        setValue(
            `attributes.${index}.values`,
            current.filter((t) => t !== tag),
        )
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("caffeine", data.caffeine)
            formData.append("organic", data.organic ? "true" : "false")
            formData.append("stock", data.stock || 0)

            // ✅ variants
            formData.append("variants", JSON.stringify(data.variants))

            // ✅ attributes → { key: [values] }
            const attributesObj = {}
            data.attributes.forEach((attr) => {
                if (attr.key && attr.values.length > 0) {
                    attributesObj[attr.key] = attr.values
                }
            })
            formData.append("attributes", JSON.stringify(attributesObj))

            // ✅ ingredients
            formData.append("ingredients", JSON.stringify(data.ingredients))

            // ✅ single image
            formData.append("image", data.image[0])

            await createProduct({ formData, token: user.token }).unwrap()
            toast.success("Product created successfully!")
            reset()
            navigate("/dashboard/products")
        } catch (err) {
            console.error(err)
            toast.error(err?.data?.message || "Failed to create product")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 space-y-8"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Add New Product
                    </h2>
                    <p className="text-gray-500 mt-2">Create a new product for your store</p>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        <FileText className="w-4 h-4 text-blue-500" />
                        Product Name
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                        placeholder="Enter product name..."
                    />
                    {errors.name?.message && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <X className="w-4 h-4" />
                            {errors.name?.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        <FileText className="w-4 h-4 text-green-500" />
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
                        placeholder="Describe your product in detail..."
                    />
                    {errors.description?.message && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <X className="w-4 h-4" />
                            {errors.description?.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        Caffeine Level
                    </label>
                    <select
                        {...register("caffeine")}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white cursor-pointer"
                    >
                        <option value="">Select caffeine level...</option>
                        <option value="Low Caffeine">Low Caffeine</option>
                        <option value="Medium Caffeine">Medium Caffeine</option>
                        <option value="High Caffeine">High Caffeine</option>
                        <option value="No Caffeine">No Caffeine</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                            <Leaf className="w-4 h-4 text-green-500" />
                            Product Type
                        </label>
                        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all duration-200 cursor-pointer bg-gray-50/50 hover:bg-green-50">
                            <input
                                type="checkbox"
                                {...register("organic")}
                                className="w-5 h-5 text-green-500 rounded focus:ring-green-500 cursor-pointer"
                            />
                            <span className="text-gray-700 font-medium">Organic Product</span>
                        </label>
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                            <Hash className="w-4 h-4 text-purple-500" />
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            {...register("stock")}
                            placeholder="Enter stock quantity"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 text-lg">
                        <Package className="w-5 h-5 text-blue-500" />
                        Product Variants
                    </h3>
                    <div className="space-y-3">
                        {variantFields.map((field, i) => (
                            <div
                                key={field.id}
                                className="flex gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                            >
                                <input
                                    placeholder="Weight (e.g., 250g)"
                                    {...register(`variants.${i}.weight`)}
                                    className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                                />
                                <input
                                    placeholder="Price ($)"
                                    type="number"
                                    step="0.01"
                                    {...register(`variants.${i}.price`)}
                                    className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeVariant(i)}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => addVariant({ weight: "", price: "" })}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                        <Plus size={16} />
                        Add Variant
                    </button>
                </div>

                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 text-lg">
                        <Tag className="w-5 h-5 text-green-500" />
                        Product Attributes
                    </h3>
                    <div className="space-y-4">
                        {attributeFields.map((field, i) => (
                            <div
                                key={field.id}
                                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 space-y-3"
                            >
                                <input
                                    placeholder="Attribute name (e.g., Color, Size)"
                                    {...register(`attributes.${i}.key`)}
                                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none bg-white"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {(getValues(`attributes.${i}.values`) || []).map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeAttributeTag(i, tag)}
                                                className="hover:bg-green-600 rounded-full p-0.5 transition-colors cursor-pointer"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    placeholder="Type value and press Enter"
                                    onKeyDown={(e) => handleAttributeTagKeyDown(e, i)}
                                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAttribute(i)}
                                    className="text-red-500 text-sm hover:text-red-700 transition-colors cursor-pointer"
                                >
                                    Remove Attribute
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => addAttribute({ key: "", values: [] })}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                        <Plus size={16} />
                        Add Attribute
                    </button>
                </div>

                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 text-lg">
                        <Leaf className="w-5 h-5 text-orange-500" />
                        Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 min-h-[60px]">
                        {(getValues("ingredients") || []).map((ing) => (
                            <span
                                key={ing}
                                className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                            >
                                {ing}
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(ing)}
                                    className="hover:bg-orange-600 rounded-full p-0.5 transition-colors cursor-pointer"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        placeholder="Type ingredient and press Enter to add"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyDown={handleIngredientKeyDown}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    />
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        <Upload className="w-4 h-4 text-indigo-500" />
                        Product Image
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white file:cursor-pointer hover:file:bg-indigo-600"
                        />
                    </div>
                    {errors.image?.message && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                            <X className="w-4 h-4" />
                            {errors.image?.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                >
                    <Save className="w-5 h-5" />
                    {isLoading ? "Creating Product..." : "Create Product"}
                </button>
            </form>
        </div>
    )
}

export default AddProductForm
