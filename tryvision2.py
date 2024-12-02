import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the YOLO model
def load_yolo():
    net = cv2.dnn.readNet("yolov5s.weights", "yolov5s.cfg")  # Provide the correct paths
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    return net, output_layers

# Detect objects in the image
def detect_objects(img, net, output_layers):
    height, width, _ = img.shape
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)
    return outs, width, height

# Count objects and plot results
def count_objects(img_path):
    net, output_layers = load_yolo()
    img = cv2.imread(img_path)
    outs, width, height = detect_objects(img, net, output_layers)

    # Parsing outputs
    class_ids = []
    confidences = []
    boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:  # Confidence threshold
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Apply Non-Max Suppression
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    num_objects = len(indexes)

    # Draw bounding boxes
    for i in indexes.flatten():
        x, y, w, h = boxes[i]
        label = str(class_ids[i])
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(img, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    # Display the image with bounding boxes
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.title(f"Objects Detected: {num_objects}")
    plt.show()

# Path to the uploaded file
image_path = "/mnt/data/images (2).jpg"

# Run the object counting
count_objects(image_path)
