import axios from "axios";

const api = axios.create({
    baseURL: "https://api.redclass.redberryinternship.ge/api",
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