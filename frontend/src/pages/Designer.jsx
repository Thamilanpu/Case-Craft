import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPhoneModels } from "../api/phoneModelApi.js";
import { useCart } from "../context/CartContext.jsx";

const Designer = () => {
    const canvasEl = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState("");
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
    const [status, setStatus] = useState("");
    const [saving, setSaving] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [textColor, setTextColor] = useState("#fe7245");

    useEffect(() => {
        const init = async () => {
            try {
                const loadedModels = await fetchPhoneModels();
                setModels(loadedModels);
                if (loadedModels.length > 0) {
                    setSelectedModelId(loadedModels[0]._id);
                    setSelectedTemplateIndex(0);
                }
            } catch (error) {
                console.error(error);
                setStatus("Unable to load phone models. Please contact admin.");
            }
        };

        init();
    }, []);

    // Initialize canvas with cover size
    useEffect(() => {
        if (!canvasEl.current) return;

        const model = models.find((m) => m._id === selectedModelId);
        const coverSize = model?.coverSize || { width: 300, height: 500 };

        if (canvasRef.current) canvasRef.current.dispose();

        const canvas = new fabric.Canvas(canvasEl.current, {
            width: coverSize.width,
            height: coverSize.height,
            preserveObjectStacking: true,
            selection: false
        });

        canvasRef.current = canvas;

        if (model && models.length > 0) {
            const templates = getTemplates(model);
            if (templates.length > 0 && selectedTemplateIndex < templates.length) {
                setTimeout(() => {
                    loadTemplate(model, templates[selectedTemplateIndex]);
                }, 100);
            }
        }

        return () => {
            if (canvasRef.current) {
                canvasRef.current.dispose();
                canvasRef.current = null;
            }
        };
    }, [models, selectedModelId, selectedTemplateIndex]);

    const getTemplates = (model) => {
        if (!model) return [];
        return model.templateImages && model.templateImages.length > 0
            ? model.templateImages
            : model.templateImage
                ? [model.templateImage]
                : [];
    };

    const loadTemplate = (model, templateImage) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Remove existing selectable objects (user designs) if desired, 
        // but usually we just want to change the template behind them.
        // However, the current code clears them:
        const objects = canvas.getObjects();
        objects.forEach((obj) => {
            if (obj.selectable) canvas.remove(obj);
        });

        // 1. Set Template as Background
        if (templateImage) {
            fabric.Image.fromURL(
                templateImage,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height,
                    });
                },
                { crossOrigin: "anonymous" }
            );
        } else {
            canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));
        }

        // 2. Set Mockup as Overlay (if exists)
        if (model?.mockupImage) {
            fabric.Image.fromURL(
                model.mockupImage,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());
                    canvas.setOverlayImage(img, canvas.renderAll.bind(canvas), {
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height,
                    });
                },
                { crossOrigin: "anonymous" }
            );
        } else {
            canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
        }

        // 3. Set Camera Overlay (Hardware) on top of everything
        if (model?.cameraOverlay) {
            fabric.Image.fromURL(
                model.cameraOverlay,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.name = "cameraOverlay";
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());

                    // Remove existing camera overlay if any
                    const existing = canvas.getObjects().find(obj => obj.name === "cameraOverlay");
                    if (existing) canvas.remove(existing);

                    canvas.add(img);
                    img.bringToFront();
                    canvas.renderAll();
                },
                { crossOrigin: "anonymous" }
            );
        }
    };

    const [userCustomImage, setUserCustomImage] = useState(null);

    const addImageToCanvas = (dataUrl) => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedModelId) return;

        const model = models.find((m) => m._id === selectedModelId);
        if (!model) return;

        setUserCustomImage(dataUrl);

        fabric.Image.fromURL(
            dataUrl,
            (img) => {
                const existingObjects = canvas.getObjects().filter((obj) => obj.selectable);
                existingObjects.forEach((obj) => canvas.remove(obj));

                if (model.mockupImage && model.coverArea) {
                    const coverArea = model.coverArea;
                    const coverX = canvas.width * coverArea.x;
                    const coverY = canvas.height * coverArea.y;
                    const coverWidth = canvas.width * coverArea.width;
                    const coverHeight = canvas.height * coverArea.height;

                    const scaleX = coverWidth / img.width;
                    const scaleY = coverHeight / img.height;
                    const scale = Math.max(scaleX, scaleY);

                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    const left = coverX + (coverWidth - scaledWidth) / 2;
                    const top = coverY + (coverHeight - scaledHeight) / 2;

                    img.set({
                        left,
                        top,
                        originX: "left",
                        originY: "top",
                        cornerColor: "#ffffff",
                        cornerStyle: "circle",
                        borderColor: "#fe7245",
                        cornerStrokeColor: "#fe7245",
                        transparentCorners: false,
                        cornerSize: 14,
                        rotatingPointOffset: 30,
                        selectable: true,
                        hasControls: true,
                        hasBorders: true
                    });
                    img.scale(scale);
                } else {
                    const scaleX = canvas.width / img.width;
                    const scaleY = canvas.height / img.height;
                    const scale = Math.max(scaleX, scaleY);

                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    const left = (canvas.width - scaledWidth) / 2;
                    const top = (canvas.height - scaledHeight) / 2;

                    img.set({
                        left,
                        top,
                        originX: "left",
                        originY: "top",
                        cornerColor: "#ffffff",
                        cornerStyle: "circle",
                        borderColor: "#fe7245",
                        cornerStrokeColor: "#fe7245",
                        transparentCorners: false,
                        cornerSize: 14,
                        rotatingPointOffset: 30,
                        selectable: true,
                        hasControls: true,
                        hasBorders: true
                    });
                    img.scale(scale);
                }

                canvas.add(img);
                canvas.setActiveObject(img);

                // Ensure camera overlay stays on top
                const cameraOverlay = canvas.getObjects().find(obj => obj.name === "cameraOverlay");
                if (cameraOverlay) {
                    cameraOverlay.bringToFront();
                }

                canvas.renderAll();
            },
            { crossOrigin: "anonymous" }
        );
    };

    const handleUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => addImageToCanvas(reader.result);
        reader.readAsDataURL(file);
    };

    const handleAddText = () => {
        const canvas = canvasRef.current;
        if (!canvas || !textValue.trim()) return;

        const text = new fabric.IText(textValue, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: "center",
            originY: "center",
            fill: textColor,
            fontSize: 24,
            fontFamily: "Arial",
            selectable: true
        });
        canvas.add(text);
        canvas.setActiveObject(text);

        // Ensure camera overlay stays on top
        const cameraOverlay = canvas.getObjects().find(obj => obj.name === "cameraOverlay");
        if (cameraOverlay) {
            cameraOverlay.bringToFront();
        }

        canvas.renderAll();
        setTextValue("");
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setStatus("Please login to add your design to cart.");
            navigate("/login");
            return;
        }

        const model = models.find((m) => m._id === selectedModelId);
        if (!model) {
            setStatus("Please select a phone model.");
            return;
        }

        if (!canvasRef.current) return;
        setSaving(true);
        setStatus("");

        try {
            const designImage = canvasRef.current.toDataURL({ format: "png", quality: 1 });
            const templates = getTemplates(model);
            const selectedTemplate = templates[selectedTemplateIndex] || templates[0];

            addItem({
                productName: model.name,
                productId: model._id,
                price: model.price || 1000,
                designImage,
                templateImage: selectedTemplate,
                userCustomImage: userCustomImage || "",
                quantity: 1,
                category: "phone_case"
            });

            navigate("/checkout");
        } catch {
            setStatus("Unable to add design to cart");
        } finally {
            setSaving(false);
        }
    };

    const selectedModel = models.find((m) => m._id === selectedModelId);
    const templates = selectedModel ? getTemplates(selectedModel) : [];

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl font-semibold text-slate-800">Design your cover</h1>

                        {/* ⭐ ADDED PRICE DISPLAY */}
                        {selectedModel && (
                            <p className="text-lg font-bold text-accent">
                                Price: $ {selectedModel.price || 1000}
                            </p>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                                Product Model
                                <select
                                    value={selectedModelId}
                                    onChange={(e) => {
                                        setSelectedModelId(e.target.value);
                                        setSelectedTemplateIndex(0);
                                        setUserCustomImage(null);
                                    }}
                                    className="rounded-xl border border-slate-200 px-4 py-3"
                                >
                                    {models.map((m) => (
                                        <option key={m._id} value={m._id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                                Upload Your Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="rounded-xl border border-dashed border-slate-300 px-4 py-3"
                                />
                            </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                                Add Text
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={textValue}
                                        onChange={(e) => setTextValue(e.target.value)}
                                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3"
                                        placeholder="Enter text"
                                    />
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="h-12 w-12 rounded-xl border border-slate-200"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddText}
                                    className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
                                >
                                    Add Text
                                </button>
                            </label>
                        </div>

                        {templates.length > 0 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Select Cover Design</label>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {templates.map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTemplateIndex(index)}
                                            className={`flex-shrink-0 rounded-lg border-2 p-1 transition-all ${selectedTemplateIndex === index
                                                ? "border-accent bg-accent/10"
                                                : "border-slate-200 hover:border-slate-300"
                                                }`}
                                        >
                                            <img
                                                src={template}
                                                alt={`Cover ${index + 1}`}
                                                className="h-20 w-12 rounded object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500">
                                    {selectedTemplateIndex + 1} of {templates.length} cover designs
                                </p>
                            </div>
                        )}

                        <p className="text-sm text-slate-500">
                            Tip: Use high-resolution PNG/JPG files and avoid edges.
                        </p>
                        {status && <p className="text-sm text-red-500">{status}</p>}
                        <button
                            onClick={handleAddToCart}
                            disabled={saving}
                            className="rounded-2xl bg-accent px-6 py-3 text-white hover:bg-accent-dark disabled:opacity-60"
                        >
                            {saving ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>

                    <div className="flex flex-1 justify-center">
                        <div className="rounded-[32px] border border-slate-200 bg-slate-900/5 p-4">
                            <canvas ref={canvasEl} width={300} height={500} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Designer;
