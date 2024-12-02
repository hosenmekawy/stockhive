import cv2
import numpy as np
from tkinter import Tk, filedialog


def count_objects(image_path):
    """
    Detects and counts objects like boxes, bags, and cartons in the given image.

    Args:
        image_path (str): Path to the image.

    Returns:
        int: Count of detected objects.
    """
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Could not load the image.")
        return

    # Resize for consistent processing
    resized = cv2.resize(image, (800, 600))

    # Convert to grayscale
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Use Canny edge detection
    edges = cv2.Canny(blurred, 50, 150)

    # Dilate edges to close gaps
    dilated = cv2.dilate(edges, None, iterations=2)

    # Find contours
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Initialize object count
    object_count = 0

    for contour in contours:
        # Filter by area to remove small noise
        if cv2.contourArea(contour) > 1000:
            object_count += 1
            # Draw the contour
            cv2.drawContours(resized, [contour], -1, (0, 255, 0), 2)

    # Display the result
    cv2.imshow("Detected Objects", resized)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return object_count


def select_image():
    """
    Opens a file dialog for the user to select an image.
    Returns:
        str: Path to the selected image.
    """
    root = Tk()
    root.withdraw()  # Hide the root window
    file_path = filedialog.askopenfilename(
        title="Select an Image File",
        filetypes=[("Image Files", "*.jpg *.jpeg *.png *.bmp *.tiff")]
    )
    return file_path


# Main program
if __name__ == "__main__":
    # Browse for an image file
    image_path = select_image()
    if image_path:
        print(f"Selected Image: {image_path}")
        object_count = count_objects(image_path)
        print(f"Total Objects Detected: {object_count}")
    else:
        print("No image selected.")
