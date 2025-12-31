import PhoneModel from "../models/PhoneModel.js";

export const getPhoneModels = async (req, res, next) => {
  try {
    const models = await PhoneModel.find().sort({ createdAt: 1 });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

export const createPhoneModel = async (req, res, next) => {
  try {
    const {
      name,
      key,
      templateImage,
      templateImages,
      mockupImage,
      cameraOverlay,
      coverArea,
      price
    } = req.body;

    if (!name || !key) {
      return res.status(400).json({ message: "name and key are required" });
    }

    const images = templateImages || (templateImage ? [templateImage] : []);

    if (images.length === 0) {
      return res.status(400).json({ message: "At least one template image is required" });
    }

    const existing = await PhoneModel.findOne({ key: key.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Model key already exists" });
    }

    const model = await PhoneModel.create({
      name,
      key: key.toLowerCase(),
      templateImages: images,
      templateImage: images[0],
      mockupImage: mockupImage || "",
      cameraOverlay: cameraOverlay || "",
      coverArea: coverArea || {
        x: 0.1,
        y: 0.15,
        width: 0.8,
        height: 0.7
      },
      coverSize: req.body.coverSize || {
        width: 300,
        height: 500
      },
      price: price || 100
    });

    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

export const updatePhoneModelMockup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mockupImage, cameraOverlay, coverArea, coverSize, price, name } = req.body;

    const model = await PhoneModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Phone model not found" });
    }

    if (name) {
      model.name = name;
    }

    if (mockupImage) {
      model.mockupImage = mockupImage;
    }

    if (cameraOverlay) {
      model.cameraOverlay = cameraOverlay;
    }

    if (coverArea) {
      model.coverArea = coverArea;
    }

    if (coverSize) {
      model.coverSize = coverSize;
    }

    // ⭐ allow updating price
    if (price !== undefined) {
      model.price = price;
    }

    await model.save();
    res.json(model);
  } catch (error) {
    next(error);
  }
};

export const addTemplateToModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { templateImage } = req.body;

    if (!templateImage) {
      return res.status(400).json({ message: "templateImage is required" });
    }

    const model = await PhoneModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Phone model not found" });
    }

    if (!model.templateImages) {
      model.templateImages = [];
    }
    model.templateImages.push(templateImage);

    if (model.templateImages.length === 1) {
      model.templateImage = templateImage;
    }

    await model.save();
    res.json(model);
  } catch (error) {
    next(error);
  }
};

export const removeTemplateFromModel = async (req, res, next) => {
  try {
    const { id, templateIndex } = req.params;

    const model = await PhoneModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Phone model not found" });
    }

    const index = parseInt(templateIndex, 10);
    if (isNaN(index) || index < 0 || index >= (model.templateImages?.length || 0)) {
      return res.status(400).json({ message: "Invalid template index" });
    }

    model.templateImages.splice(index, 1);

    if (model.templateImages.length > 0) {
      model.templateImage = model.templateImages[0];
    } else {
      model.templateImage = "";
    }

    await model.save();
    res.json(model);
  } catch (error) {
    next(error);
  }
};

export const deletePhoneModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PhoneModel.findByIdAndDelete(id);
    res.json({ message: "Phone model deleted" });
  } catch (error) {
    next(error);
  }
};
