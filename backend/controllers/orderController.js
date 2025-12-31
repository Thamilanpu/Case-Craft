import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, fullName, email, phone, address, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ message: "Customer details are required" });
    }

    // Basic validation for items
    const sanitizedItems = items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      designImage: item.designImage,
      templateImage: item.templateImage || "",
      userCustomImage: item.userCustomImage || "",
      customText: item.customText || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      category: item.category || "phone_case"
    }));

    // Helper to determine if an item is a pet asset
    const isPetItem = (item) => {
      // Explicit category check
      if (item.category === "pet_asset") return true;
      if (item.category === "phone_case") return false;

      // Legacy heuristic
      return (
        (item.customText && item.customText.trim().length > 0) ||
        (item.productName && item.productName.toLowerCase().includes("pet"))
      );
    };

    const petItems = [];
    const caseItems = [];

    sanitizedItems.forEach((item) => {
      if (isPetItem(item)) {
        // Ensure category is set for future clarity
        item.category = "pet_asset";
        petItems.push(item);
      } else {
        item.category = "phone_case";
        caseItems.push(item);
      }
    });

    const ordersToCreate = [];

    if (petItems.length > 0) {
      const petTotal = petItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      ordersToCreate.push({ items: petItems, total: petTotal });
    }

    if (caseItems.length > 0) {
      const caseTotal = caseItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      ordersToCreate.push({ items: caseItems, total: caseTotal });
    }

    const createdOrders = await Promise.all(
      ordersToCreate.map((group) =>
        Order.create({
          userId: req.user.id,
          items: group.items,
          fullName,
          email,
          phone,
          address,
          total: group.total,
          status: "pending" // Default status
        })
      )
    );

    // Return all created orders so the frontend gets all IDs
    res.status(201).json(createdOrders);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
