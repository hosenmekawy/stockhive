import cv2
import matplotlib.pyplot as plt
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2 import model_zoo
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
from tkinter import Tk
from tkinter.filedialog import askopenfilename


# Function to load Detectron2 model
def load_detectron2_model(threshold=0.4):
    print("Loading Detectron2 model...")
    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = threshold  # Set threshold
    cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"  # Use GPU if available
    return DefaultPredictor(cfg)


# Function to detect boxes in an image
def detect_boxes(predictor, image_path, filter_classes=["box", "suitcase", "backpack"]):
    print(f"Processing image: {image_path}")
    img = cv2.imread(image_path)
    outputs = predictor(img)  # Run the model

    # Extract predictions
    instances = outputs["instances"]
    scores = instances.scores.tolist()
    classes = instances.pred_classes.tolist()
    boxes = instances.pred_boxes.tensor.tolist()

    # Map COCO classes to human-readable names
    metadata = MetadataCatalog.get(cfg.DATASETS.TRAIN[0])
    class_names = metadata.get("thing_classes", None)
    if not class_names:
        class_names = MetadataCatalog.get("coco_2017_val").thing_classes

    # Filter by specific classes
    detected_objects = []
    for score, cls, box in zip(scores, classes, boxes):
        class_name = class_names[cls]
        if class_name in filter_classes:
            detected_objects.append((class_name, score, box))

    return detected_objects


# Function to visualize detections
def visualize_detections(image_path, detections):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB for plotting

    # Draw bounding boxes
    for obj in detections:
        class_name, score, box = obj
        xmin, ymin, xmax, ymax = map(int, box)
        cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (255, 0, 0), 2)
        label = f"{class_name} {score:.2f}"
        cv2.putText(img, label, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Display the image
    plt.figure(figsize=(12, 8))
    plt.imshow(img)
    plt.axis("off")
    plt.title("Detected Boxes")
    plt.show()


# Main function
if __name__ == "__main__":
    print("Please select an image file...")
    root = Tk()
    root.withdraw()  # Hide tkinter root window
    image_path = askopenfilename(
        title="Select an Image File",
        filetypes=[("Image Files", "*.jpg *.jpeg *.png *.bmp")]
    )

    if not image_path:
        print("No image selected. Exiting.")
    else:
        # Load Detectron2 model
        predictor = load_detectron2_model(threshold=0.4)

        # Detect objects in the image
        detections = detect_boxes(predictor, image_path, filter_classes=["box", "suitcase", "backpack"])

        # Count detected objects
        num_objects = len(detections)
        print(f"Detected {num_objects} relevant objects.")
        for obj in detections:
            print(f"Class: {obj[0]}, Confidence: {obj[1]:.2f}, Box: {obj[2]}")

        # Visualize detections
        if num_objects > 0:
            visualize_detections(image_path, detections)
        else:
            print("No relevant objects detected.")
