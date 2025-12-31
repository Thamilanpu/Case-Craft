import PetProduct from "../models/PetProduct.js";

// Get all products
export const fetchPetProducts = async (req, res) => {
  try {
    const products = await PetProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Create new product
export const adminCreatePetProduct = async (req, res) => {
  try {
    const { name, category, key, price, images, templates } = req.body;

    // Allow templates to be passed, or default to empty array
    // If images are passed but no templates, maybe we should use images as templates?
    // For now, let's respect what is passed.
    const productTemplates = templates || (images ? images : []);

    const product = new PetProduct({
      name,
      category,
      key,
      price,
      images,
      templates: productTemplates
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Delete product
export const adminDeletePetProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await PetProduct.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Add template
export const adminAddTemplateToPet = async (req, res) => {
  try {
    const { id } = req.params;
    const { templateImage } = req.body;

    if (!templateImage) {
      return res.status(400).json({ message: "templateImage is required" });
    }

    const product = await PetProduct.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.templates.push(templateImage);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error adding template:", err);
    res.status(500).json({ message: "Failed to add template", error: err.message });
  }
};

// Remove template
export const adminRemoveTemplateFromPet = async (req, res) => {
  try {
    const { id, index } = req.params;
    const product = await PetProduct.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const templateIndex = parseInt(index, 10);
    if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= product.templates.length) {
      return res.status(400).json({ message: "Invalid template index" });
    }

    product.templates.splice(templateIndex, 1);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error removing template:", err);
    res.status(500).json({ message: "Failed to remove template", error: err.message });
  }
};

// Update mockup
export const adminUpdatePetMockup = async (req, res) => {
  try {
    const { id } = req.params;
    const { mockupImage, coverArea, coverSize, name, price } = req.body;
    const product = await PetProduct.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (mockupImage) product.mockupImage = mockupImage;
    if (coverArea) product.coverArea = coverArea;
    if (coverSize) product.coverSize = coverSize;
    if (name) product.name = name;
    if (price !== undefined) product.price = price;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update mockup" });
  }
};
