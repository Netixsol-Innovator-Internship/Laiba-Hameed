// Middleware to parse JSON fields from multipart form data
export const parseJsonFields = (req, res, next) => {
    try {
        // Parse variants if it exists and is a string
        if (req.body.variants && typeof req.body.variants === "string") {
            req.body.variants = JSON.parse(req.body.variants)
        }

        // Parse attributes if it exists and is a string
        if (req.body.attributes && typeof req.body.attributes === "string") {
            req.body.attributes = JSON.parse(req.body.attributes)
        }

        // Convert boolean strings to actual booleans
        if (req.body.organic === "true") req.body.organic = true
        if (req.body.organic === "false") req.body.organic = false

        // Convert stock to number if it's a string
        if (req.body.stock && typeof req.body.stock === "string") {
            req.body.stock = Number.parseInt(req.body.stock, 10)
        }

        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format in request data",
        })
    }
}
