import axios from "axios";

export const createExercise = async (token, payload) => {
  const formData = new FormData();
  formData.append("exerciseName", payload.exerciseName);
  formData.append("exercise_thumb", payload.exercise_thumb);
  formData.append("exercise_main_video", payload.exercise_main_video);
  formData.append("exercise_demo_video", payload.exercise_demo_video);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/admin/exercise/create`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
