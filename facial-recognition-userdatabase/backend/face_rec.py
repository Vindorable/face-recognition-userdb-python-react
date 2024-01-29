import face_recognition


# ---------------------------------------------------------
# https://github.com/ageitgey/face_recognition/blob/master/examples/facerec_from_webcam.py
class FaceRecognition:
    def __init__(self, stored_image_file_path, match_test_image_file_path):
        self.stored_image_file_path = stored_image_file_path
        self.match_test_image_file_path = match_test_image_file_path

    def match_test(self):
        name = "Unknown"

        # Load the stored image and learn how to recognize it.
        stored_image = face_recognition.load_image_file(self.stored_image_file_path)
        stored_image_encoding = face_recognition.face_encodings(stored_image)[0]
        # Create arrays of known face encodings.
        stored_image_encodings = [stored_image_encoding]

        # Load the image to test.
        match_test_image = face_recognition.load_image_file(self.match_test_image_file_path)

        # Find all the faces and face encodings in the image to test.
        face_locations = face_recognition.face_locations(match_test_image)
        face_encodings = face_recognition.face_encodings(match_test_image, face_locations)

        # Loop through each face in this image.
        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(stored_image_encodings, face_encoding)

            if True in matches:
                name = "Matched"

        print(name)
        return name