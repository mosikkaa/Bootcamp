import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
    baseURL: baseUrl
});

const toArray = (data, keys = ["data", "categories", "topics", "instructors"]) => {
    if (Array.isArray(data)) return data;
    for (const key of keys) {
        if (Array.isArray(data[key])) return data[key];
    }
    return [];
};

export const getCategories = () =>
    api.get("/categories").then(r => {
        return toArray(r.data);
    });

export const getTopics = (categoryIds) =>
    api.get("/topics", {
        params: categoryIds?.length ? { "categories[]": categoryIds } : {}
    }).then(r => toArray(r.data));

export const getInstructors = () =>
    api.get("/instructors").then(r => {
        return toArray(r.data);
    });

export const getCourses = ({ page, sort, categories, topics, instructors }) =>
    api.get("/courses", {
        params: {
            sort,
            ...(page && { page }),
            ...(categories?.length && { "categories[]": categories }),
            ...(topics?.length && { "topics[]": topics }),
            ...(instructors?.length && { "instructors[]": instructors }),
        }
    }).then(r => r.data);

export const getFeaturedCourses = () =>
    api.get("/courses/featured").then(r => toArray(r.data))

export const getCourse = (id) =>
    api.get(`/courses/${id}`).then(r => r.data.data);

export const getWeeklySchedules = (courseId) =>
    api.get(`/courses/${courseId}/weekly-schedules`).then(r => r.data.data);

export const getTimeSlots = (courseId, weeklyScheduleId) =>
    api.get(`/courses/${courseId}/time-slots`, {
        params: { weekly_schedule_id: weeklyScheduleId }
    }).then(r => r.data.data);

export const getSessionTypes = (courseId, weeklyScheduleId, timeSlotId) =>
    api.get(`/courses/${courseId}/session-types`, {
        params: {
            weekly_schedule_id: weeklyScheduleId,
            time_slot_id: timeSlotId,
        }
    }).then(r => r.data.data);

export const register = (formData) =>
    api.post("/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data.data);

export const login = ({ email, password }) =>
    api.post("/login", { email, password }).then(r => r.data.data);

api.interceptors.request.use((config) => {
    const state = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    const token = state?.state?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const logout = () =>
    api.post("/logout").then(r => r.data);

export const enroll = (data) =>
    api.post("/enrollments", data).then(r => r.data);

export const getEnrollments = () =>
    api.get("/enrollments").then(r => r.data.data);

export const completeCourse = (enrollmentId) =>
    api.patch(`/enrollments/${enrollmentId}/complete`).then(r => r.data.data);

export const retakeCourse = (enrollmentId) =>
    api.delete(`/enrollments/${enrollmentId}`).then(r => r.data);

export const reviewCourse = (courseId, rating) =>
    api.post(`/courses/${courseId}/reviews`, { rating }).then(r => r.data);

export const updateProfile = (formData) =>
    api.put("/profile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data.data);